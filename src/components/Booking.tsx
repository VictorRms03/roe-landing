import BookingForm from "@/components/BookingForm";

export default function Booking() {
  return (
    <div id="agendar" className="scroll-mt-32 bg-roe-white px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-xl rounded-2xl bg-roe-gray p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-gray-900">Agende Seu Exame</h2>
        <BookingForm />
      </div>
    </div>
  );
}
