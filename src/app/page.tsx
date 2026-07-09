import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Boat } from "@/components/Boat";
import { Availability } from "@/components/Availability";
import { Location } from "@/components/Location";
import { InquiryForm } from "@/components/InquiryForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Experience />
        <Boat />
        <Availability />
        <Location />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
