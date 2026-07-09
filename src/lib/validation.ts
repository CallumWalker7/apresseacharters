import { z } from "zod";
import { content } from "@content";

/**
 * Shared inquiry schema + season logic.
 * Used by BOTH the browser form and the /api/inquiry route so the rules
 * can never drift apart. Season dates come from content.ts.
 */

const { seasonStart, seasonEnd, maxGuests } = content.details;

/**
 * True if an ISO date string (YYYY-MM-DD) falls inside the charter season
 * for its own year (inclusive of both endpoints). Season is defined in
 * content.ts and read here, so editing content.ts moves the window.
 */
export function isInSeason(isoDate: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return false;
  const [, m, d] = isoDate.split("-").map(Number);
  const asNum = (mm: number, dd: number) => mm * 100 + dd;
  const value = asNum(m, d);
  return (
    value >= asNum(seasonStart.month, seasonStart.day) &&
    value <= asNum(seasonEnd.month, seasonEnd.day)
  );
}

/** Human-readable season window, e.g. "May 1 – November 1". */
export const seasonLabel = content.details.seasonLabel;

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(120, "That name looks a little long."),
  email: z
    .string()
    .trim()
    .min(1, "An email lets us send your quote.")
    .email("Please check your email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please include a phone number we can reach you on.")
    .max(30, "That phone number looks a little long."),
  date: z
    .string()
    .min(1, "Choose a date for your charter.")
    .refine(isInSeason, {
      message: `We charter ${seasonLabel}. Please choose a date in season.`,
    }),
  time: z.string().min(1, "Let us know a departure time."),
  duration: z.string().min(1, "How long would you like to be out?"),
  guests: z.coerce
    .number({ invalid_type_error: "Enter a number of guests." })
    .int("Whole guests only, please.")
    .min(1, "At least one guest.")
    .max(maxGuests, `Après Sea hosts up to ${maxGuests} guests.`),
  notes: z
    .string()
    .trim()
    .max(2000, "That's a lot — could you trim it a touch?")
    .optional()
    .or(z.literal("")),
  // Honeypot: a hidden field real people never touch. We accept any value at
  // the schema level so a bot's submission validates, then the API route
  // silently drops it (returns ok) rather than revealing it's a trap.
  company: z.string().optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
