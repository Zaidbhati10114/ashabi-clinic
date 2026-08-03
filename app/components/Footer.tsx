export default function Footer() {
  return (
    <footer className="border-t border-blue-100 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Row 1: Brand and Links */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-display text-base text-blue-600">Ashabi Clinic</p>
          <div className="flex items-center gap-4">
            <a
              href="/admin/login"
              className="text-xs text-blue-600 hover:text-blue-600 transition-colors"
            >
              Admin
            </a>
          </div>
        </div>

        {/* Row 2: Copyright and Registration */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-600">
          <p>
            © {new Date().getFullYear()} Dr. Sahirabanu Faruk Bhati. All rights
            reserved.
          </p>
          <p>
            Registered under Bombay Homoeopathic &amp; Biochemic
            Practitioners&apos; Act, 1959
          </p>
        </div>
      </div>
    </footer>
  );
}
