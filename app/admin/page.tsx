"use client";

export default function AdminRedirect() {
  return (
    <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 bg-[#f0f5f0] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="animate-spin w-6 h-6 text-sage-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
        <p className="text-sm text-sage-600">Checking session...</p>
      </div>
    </main>
  );
}
