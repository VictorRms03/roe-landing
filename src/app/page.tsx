import Benefits from "@/components/Benefits";
import Booking from "@/components/Booking";
import Clinics from "@/components/Clinics";
import Digital from "@/components/Digital";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Insurers from "@/components/Insurers";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Digital />
      <Benefits />
      <Clinics />
      <Insurers />
      <Testimonials />
      <Booking />
      <Faq />
    </>
  );
}
