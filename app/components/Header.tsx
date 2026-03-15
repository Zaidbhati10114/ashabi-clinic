'use client';

interface HeaderProps {
 ctaType?: 'phone' | 'back';
  phoneNumber?: string;
  backHref?: string;
}

export default function Header({ 
  ctaType = 'phone', 
  phoneNumber = '8856819580', 
  backHref = '/' 
}: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#faf7f2]/90 backdrop-blur-sm border-b border-sage-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-display text-xl text-sage-700 tracking-wide">
          Ashabi Clinic
        </span>
        {ctaType === 'phone' ? (
          <a
            href={`tel:+91${phoneNumber}`}
            className="text-sm font-body font-medium text-sage-600 hover:text-sage-800 transition-colors"
          >
            📞 {phoneNumber}
          </a>
        ) : (
          <a
            href={backHref}
            className="text-sm font-body font-medium text-sage-600 hover:text-sage-800 transition-colors"
          >
            ← Back to Home
          </a>
        )}
      </div>
    </nav>
  );
}
