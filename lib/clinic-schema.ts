// lib/clinic-schema.ts
// Structured data (JSON-LD) for Ashabi Clinic — helps Google understand
// this is a local medical clinic in Sangli and can trigger rich results
// (map pack, knowledge panel, star ratings if you add reviews later).

export function getClinicSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "name": "Ashabi Clinic",
        "alternateName": "Ashabi Homeopathy & General Clinic",
        "description":
            "Ashabi Clinic offers homeopathy and general clinic consultations in Sangli, Maharashtra, under Dr. Sahirabanu Faruk Bhati.",
        "url": "https://ashabiclinic.com",
        "telephone": "+91-8856819580",
        "priceRange": "$$",
        "image": "https://ashabiclinic.com/og-image.jpg", // update to a real photo of the clinic
        "medicalSpecialty": ["Homeopathic", "GeneralPractice"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hanuman Nagar, Dattanagar",
            "addressLocality": "Sangli Miraj Kupwad",
            "addressRegion": "Maharashtra",
            "postalCode": "416416",
            "addressCountry": "IN",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 16.8410964,
            "longitude": 74.5815467,
        },
        "hasMap":
            "https://www.google.com/maps/place/Ashabi+clinic/@16.8410964,74.5789718,17z",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                "opens": "10:00",
                "closes": "13:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                "opens": "18:00",
                "closes": "22:00",
            },
        ],
        "physician": {
            "@type": "Physician",
            "name": "Dr. Sahirabanu Faruk Bhati",
            "medicalSpecialty": "Homeopathic",
        },
        "areaServed": {
            "@type": "City",
            "name": "Sangli",
        },
    };
}