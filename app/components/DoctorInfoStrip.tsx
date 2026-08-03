export default function DoctorInfoStrip() {
  return (
    <div className="bg-mist border-b border-blue-100">
      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <p className="text-xs text-blue-600">
          <span className="font-medium text-blue-700">Dr. Sahirabanu Faruk Bhati</span>
          <span className="text-blue-600"> · B.H.M.S., C.G.O. · Reg. No. 16878</span>
        </p>
        <div className="flex gap-4 text-xs text-blue-500">
          <span>🌤️ Morning: 9:00 AM – 12:00 PM</span>
          <span>🌆 Evening: 5:00 PM – 8:00 PM</span>
        </div>
      </div>
    </div>
  );
}
