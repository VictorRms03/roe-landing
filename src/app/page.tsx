import Benefits from "@/components/Benefits";
import Booking from "@/components/Booking";
import Clinics from "@/components/Clinics";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Benefits />
      <Clinics />
      <Testimonials />
      <Booking />
      <Faq />
    </>
  );
}
