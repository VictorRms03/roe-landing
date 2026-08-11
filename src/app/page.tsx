import Benefits from "@/components/Benefits";
import Booking from "@/components/Booking";
import Clinics from "@/components/Clinics";
import Digital from "@/components/Digital";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      {/* Order is load-bearing here: Digital's background washes from
          Services' roe-white down to Benefits' roe-sand, so it only joins
          seamlessly between these two. */}
      <Digital />
      <Benefits />
      <Clinics />
      <Testimonials />
      <Booking />
      <Faq />
    </>
  );
}
