import { useState, useEffect, useRef } from "react";
import {
  Menu, X, MapPin, MessageCircle,
  Instagram, Facebook, ChevronDown,
  Star, CheckCircle, Calendar, ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/SnapInsta.to_652543896_18060164318408301_3632406269996901800_n.jpg";
import heroBg from "@/imports/Hero-Bg.jpeg";

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why-us" },
  { label: "Trips", href: "#trips" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const PREVIOUS_TRIPS = [
  {
    title: "Castleton Village",
    description: "Beautiful historic village surrounded by stunning landscapes and walking trails.",
    image: "https://images.unsplash.com/photo-1670620800615-4225fe6ecb75?w=600&h=400&fit=crop&auto=format",
    tag: "Village",
  },
  {
    title: "Mam Tor",
    description: "One of the most scenic hiking locations in the Peak District offering panoramic views.",
    image: "https://images.unsplash.com/photo-1708958983048-8b0f629c3ce3?w=600&h=400&fit=crop&auto=format",
    tag: "Hiking",
  },
  {
    title: "Winnats Pass",
    description: "Famous limestone valley with breathtaking roads and spectacular scenery.",
    image: "https://images.unsplash.com/photo-1768232638963-7b9c7c780c60?w=600&h=400&fit=crop&auto=format",
    tag: "Scenic",
  },
  {
    title: "Speedwell Cavern",
    description: "Underground boat adventure through one of the UK's most famous caverns.",
    image: "https://images.unsplash.com/photo-1773619967135-e82d28e2bd3a?w=600&h=400&fit=crop&auto=format",
    tag: "Adventure",
  },
];

const UPCOMING_TRIPS = [
  {
    title: "New Weekend Adventure",
    destination: "Peak District",
    date: "12 Jul 2026",
    price: "£89",
    image: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Affordable Group Tours",
    destination: "Yorkshire Dales",
    date: "26 Jul 2026",
    price: "£75",
    image: "https://images.unsplash.com/photo-1627289496743-8a9a08bb228a?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Scenic Hiking Trips",
    destination: "Lake District",
    date: "9 Aug 2026",
    price: "£95",
    image: "https://images.unsplash.com/photo-1536607961765-592e80bcc19e?w=600&h=400&fit=crop&auto=format",
  },
  {
    title: "Family Weekend Packages",
    destination: "Snowdonia",
    date: "23 Aug 2026",
    price: "£120",
    image: "https://images.unsplash.com/photo-1704610077766-7a5e0535638c?w=600&h=400&fit=crop&auto=format",
  },
];

const GALLERY = [
  { url: "https://images.unsplash.com/photo-1634295504700-66a4ab287ce7?w=700&h=900&fit=crop&auto=format", alt: "Scenic UK valley", tall: true },
  { url: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=700&h=480&fit=crop&auto=format", alt: "Group on mountain", tall: false },
  { url: "https://images.unsplash.com/photo-1743618317094-49f163b5591e?w=700&h=480&fit=crop&auto=format", alt: "Rolling green hills", tall: false },
  { url: "https://images.unsplash.com/photo-1773619967135-e82d28e2bd3a?w=700&h=900&fit=crop&auto=format", alt: "Speedwell Cavern", tall: true },
  { url: "https://images.unsplash.com/photo-1627289496743-8a9a08bb228a?w=700&h=480&fit=crop&auto=format", alt: "Hiking group", tall: false },
  { url: "https://images.unsplash.com/photo-1670620800615-4225fe6ecb75?w=700&h=480&fit=crop&auto=format", alt: "English village", tall: false },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    location: "Manchester",
    text: "Wonderful experience with Travel Buddy UK. Affordable and perfectly organized. Every detail was taken care of and the group was so friendly!",
    rating: 5,
  },
  {
    name: "James Thornton",
    location: "Birmingham",
    text: "The trip to Mam Tor was amazing. Great people and excellent planning. The views were absolutely breathtaking — worth every penny.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    location: "Leeds",
    text: "Best budget travel agency for weekend trips. Travel Buddy UK made it so easy to explore places I never thought I could afford to visit.",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "How do I book a trip?",
    answer: "Simply browse our upcoming trips, choose your preferred destination and date, then click 'Book Now'. You can also contact us via WhatsApp at +44 7721893703 or fill in our contact form and we'll get back to you within 24 hours.",
  },
  {
    question: "Are trips suitable for beginners?",
    answer: "Absolutely! Our trips are designed for all fitness levels. We clearly label the difficulty of each trip, and our expert coordinators ensure everyone is comfortable and supported throughout the journey.",
  },
  {
    question: "Are transportation charges included?",
    answer: "Yes, return transportation from a central meeting point is included in all our trip prices. We use comfortable, modern coaches so you can relax and enjoy the journey.",
  },
  {
    question: "Can families join?",
    answer: "Of course! We offer special family weekend packages designed with all ages in mind. Children are welcome on many of our trips, and we always ensure routes are suitable for families before including them.",
  },
  {
    question: "What should I carry during trips?",
    answer: "We send a full packing list after booking, but essentials include: sturdy walking shoes, waterproof jacket, water bottle, snacks, sunscreen, and a small backpack. We have a tailored checklist ready for each specific destination.",
  },
];

const WHY_CARDS = [
  { icon: "💰", title: "Budget Friendly Trips", desc: "Maximum value without sacrificing the experience — great adventures at honest prices." },
  { icon: "🚌", title: "Comfortable Transportation", desc: "Modern coaches with comfortable seating for a relaxed journey to every destination." },
  { icon: "🏔️", title: "Beautiful Destinations", desc: "Carefully selected stunning locations across England, Wales, and Scotland." },
  { icon: "🧭", title: "Friendly Trip Coordinators", desc: "Experienced and enthusiastic guides who make every trip safe and memorable." },
  { icon: "🛡️", title: "Safe and Secure Travel", desc: "Your safety is our priority — every trip is risk-assessed and professionally managed." },
  { icon: "📅", title: "Weekend Special Packages", desc: "Perfect Friday-to-Sunday getaways designed around your work schedule." },
];

const TRIP_OPTIONS = [
  "4 July, Sat – Cotswolds Village Escape (£49)",
  "5 July, Sun – Brighton Pier & Seven Sisters (£49)",
  "11 July, Sat – Isle of Wight Adventure (£65)",
  "12 July, Sun – Puzzlewood & Gloucester Cathedral (£49)",
  "17–19 July – Cornwall Weekend Escape (£265)",
  "25 July, Sat – Durdle Door & Lulworth Cove (£55)",
  "26 July, Sun – Lavender Farm & Strawberry Picking (Girls Trip) (£49)",
];

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/FORM_ID/formResponse";
const GOOGLE_FORM_ENTRY_IDS = {
  travellerType: "entry.YOUR_TRAVELLER_TYPE_ID",
  trip: "entry.YOUR_TRIP_ID",
  name: "entry.YOUR_NAME_ID",
  email: "entry.YOUR_EMAIL_ID",
  dob: "entry.YOUR_DOB_ID",
  gender: "entry.YOUR_GENDER_ID",
  whatsapp: "entry.YOUR_WHATSAPP_ID",
  foodPreference: "entry.YOUR_FOOD_ID",
  allergies: "entry.YOUR_ALLERGIES_ID",
  instagram: "entry.YOUR_INSTAGRAM_ID",
  paymentScreenshot: "entry.YOUR_PAYMENT_ID",
  consent: "entry.YOUR_CONSENT_ID",
  waiver: "entry.YOUR_WAIVER_ID",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useAnimatedCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const steps = Math.ceil(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame >= steps) { setCount(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCounter({ target, label, suffix = "+" }: { target: number; label: string; suffix?: string }) {
  const { count, ref } = useAnimatedCounter(target);
  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-5xl md:text-6xl font-black text-white leading-none" style={{ fontFamily: "Outfit, sans-serif" }}>
        {count}{suffix}
      </div>
      <div className="text-orange-300 mt-3 text-xs font-semibold uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

function BookingPage({ onBackHome }: { onBackHome: () => void }) {
  const [bookingForm, setBookingForm] = useState({
    travellerType: "",
    trip: TRIP_OPTIONS[0],
    fullName: "",
    email: "",
    dob: "",
    gender: "",
    whatsapp: "",
    foodPreference: "",
    allergies: "",
    instagram: "",
    paymentScreenshot: null as File | null,
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"info" | "success" | "error" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof bookingForm, value: string | File | null) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email: string) => {
    const v = String(email || "").trim();
    // stricter but practical email validation: user@domain.tld (TLD 2+ chars)
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
  };

  const isValidWhatsApp = (phone: string) => {
    const v = String(phone || "").trim();
    if (!v) return false;
    // require international format starting with + and 9-15 digits total
    // allow spaces, dashes, parentheses which will be stripped
    const cleaned = v.replace(/[^0-9+]/g, "");
    if (!cleaned.startsWith("+")) return false;
    const digits = cleaned.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Submitting...");
    setStatusType("info");

    if (!bookingForm.travellerType || !bookingForm.trip || !bookingForm.fullName || !bookingForm.email || !bookingForm.dob || !bookingForm.gender || !bookingForm.whatsapp || !bookingForm.foodPreference || !bookingForm.paymentScreenshot || !consentAccepted || !waiverAccepted) {
      setStatusMessage("Please complete all required fields, attach a payment screenshot, and agree to both declarations before submitting.");
      setStatusType("error");
      return;
    }

    // validate email and whatsapp
    if (!isValidEmail(bookingForm.email)) {
      setStatusMessage("Invalid mail id");
      setStatusType("error");
      return;
    }

    if (!isValidWhatsApp(bookingForm.whatsapp)) {
      setStatusMessage("Invalid number");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append(GOOGLE_FORM_ENTRY_IDS.travellerType, bookingForm.travellerType);
      params.append(GOOGLE_FORM_ENTRY_IDS.trip, bookingForm.trip);
      params.append(GOOGLE_FORM_ENTRY_IDS.name, bookingForm.fullName);
      params.append(GOOGLE_FORM_ENTRY_IDS.email, bookingForm.email);
      params.append(GOOGLE_FORM_ENTRY_IDS.dob, bookingForm.dob);
      params.append(GOOGLE_FORM_ENTRY_IDS.gender, bookingForm.gender);
      params.append(GOOGLE_FORM_ENTRY_IDS.whatsapp, bookingForm.whatsapp);
      params.append(GOOGLE_FORM_ENTRY_IDS.foodPreference, bookingForm.foodPreference);
      params.append(GOOGLE_FORM_ENTRY_IDS.allergies, bookingForm.allergies || "None");
      params.append(GOOGLE_FORM_ENTRY_IDS.instagram, bookingForm.instagram || "Not provided");
      params.append(GOOGLE_FORM_ENTRY_IDS.paymentScreenshot, bookingForm.paymentScreenshot?.name || "No file attached");
      params.append(GOOGLE_FORM_ENTRY_IDS.consent, consentAccepted ? "Yes" : "No");
      params.append(GOOGLE_FORM_ENTRY_IDS.waiver, waiverAccepted ? "Yes" : "No");

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: params.toString(),
      });

      setStatusMessage("Your booking request has been submitted. The travel team will contact you.");
      setStatusType("success");
      setBookingForm({
        travellerType: "",
        trip: TRIP_OPTIONS[0],
        fullName: "",
        email: "",
        dob: "",
        gender: "",
        whatsapp: "",
        foodPreference: "",
        allergies: "",
        instagram: "",
        paymentScreenshot: null,
      });
      setConsentAccepted(false);
      setWaiverAccepted(false);
    } catch {
      setStatusMessage("Submission could not be completed. Please check the Google Form link in the app code and update it if needed.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#0a1f3c]">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        <button
          onClick={onBackHome}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0a1f3c]/10 bg-white px-4 py-2 text-sm font-semibold text-[#0a1f3c] shadow-sm transition hover:bg-orange-50"
        >
          ← Back to Home
        </button>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-[#0a1f3c]/10">
          <div className="bg-[#0a1f3c] px-8 py-10 text-white md:px-10">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">Booking Request</div>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Reserve Your Next Adventure</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
              Share your details here and your request will be sent to travel team to review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-8 md:grid-cols-2 md:p-10">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Type of Traveller</label>
              <select
                value={bookingForm.travellerType}
                onChange={(e) => updateField("travellerType", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
                required
              >
                <option value="">Select one</option>
                <option value="Solo">Solo</option>
                <option value="Group of Friends">Group of Friends</option>
                <option value="Family">Family</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Choose Your Trip</label>
              <select
                value={bookingForm.trip}
                onChange={(e) => updateField("trip", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
                required
              >
                {TRIP_OPTIONS.map((trip) => (
                  <option key={trip} value={trip}>{trip}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Full Name</label>
              <input
                type="text"
                value={bookingForm.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Email ID</label>
              <input
                type="email"
                value={bookingForm.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Date of Birth</label>
              <input
                type="date"
                value={bookingForm.dob}
                onChange={(e) => updateField("dob", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Gender</label>
              <select
                value={bookingForm.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                required
              >
                <option value="">Select one</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">WhatsApp Contact</label>
              <input
                type="tel"
                value={bookingForm.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Food Preference</label>
              <input
                type="text"
                value={bookingForm.foodPreference}
                onChange={(e) => updateField("foodPreference", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                placeholder="Vegetarian / Vegan / Non-vegetarian"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Any allergies? Please mention (optional)</label>
              <textarea
                rows={3}
                value={bookingForm.allergies}
                onChange={(e) => updateField("allergies", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Instagram Handle (optional)</label>
              <input
                type="text"
                value={bookingForm.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                placeholder="@yourhandle"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0a1f3c]">Payment Screenshot</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => updateField("paymentScreenshot", e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-400"
              />
              <p className="mt-2 text-xs text-gray-500">Please rename the file with your name before uploading.</p>
              {bookingForm.paymentScreenshot ? (
                <div className="mt-2 text-sm text-gray-700">Uploaded: {bookingForm.paymentScreenshot.name}</div>
              ) : null}
            </div>

            <div className="md:col-span-2 space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
                <p className="font-semibold text-[#0a1f3c]">Participant Consent Form</p>
                <p className="mt-2 leading-6">
                  By booking a trip with London Sundara Travels Ltd., I agree to the following: I’m happy to receive updates via email or WhatsApp, I have read the trip details, I understand the itinerary may change, I will follow organiser guidance, I take responsibility for my belongings, and I understand all bookings are final and non-refundable.
                </p>
                <label className="mt-3 flex items-start gap-2 text-sm text-[#0a1f3c]">
                  <input type="checkbox" checked={consentAccepted} onChange={(e) => setConsentAccepted(e.target.checked)} className="mt-1" />
                  <span>I understood &amp; agree to the above.</span>
                </label>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
                <p className="font-semibold text-[#0a1f3c]">Trip Safety &amp; Responsibility Agreement</p>
                <p className="mt-2 leading-6">
                  By booking and joining a trip, I confirm that I am participating voluntarily, I understand the travel may involve risks, I acknowledge that third-party providers may support the trip, and I agree that London Sundara Travels Ltd. and its partners are not liable for injury, loss, delay or accident except where required by law.
                </p>
                <label className="mt-3 flex items-start gap-2 text-sm text-[#0a1f3c]">
                  <input type="checkbox" checked={waiverAccepted} onChange={(e) => setWaiverAccepted(e.target.checked)} className="mt-1" />
                  <span>I confirm that I have read and accepted this waiver.</span>
                </label>
              </div>
            </div>

            {statusMessage ? (
              <div
                className={`md:col-span-2 rounded-xl border px-4 py-3 text-sm ${
                  statusType === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : statusType === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-orange-200 bg-orange-50 text-orange-700"
                }`}
              >
                {statusMessage}
              </div>
            ) : null}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isBookingPage, setIsBookingPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    return hash === "#/booking" || hash === "#booking";
  });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const syncBookingPage = () => {
      const hash = window.location.hash.toLowerCase();
      setIsBookingPage(hash === "#/booking" || hash === "#booking");
    };

    window.addEventListener("hashchange", syncBookingPage);
    return () => window.removeEventListener("hashchange", syncBookingPage);
  }, []);

  const openBookingPage = () => {
    window.location.hash = "#/booking";
    setIsBookingPage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    window.location.hash = "";
    setIsBookingPage(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (href: string) => {
    setNavOpen(false);
    if (href === "#booking") {
      openBookingPage();
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (isBookingPage) {
    return <BookingPage onBackHome={goHome} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroBadge {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-badge  { animation: heroBadge  0.7s ease 0.1s both; }
        .hero-h1     { animation: heroFadeUp 0.8s ease 0.25s both; }
        .hero-sub    { animation: heroFadeUp 0.8s ease 0.4s  both; }
        .hero-btns   { animation: heroFadeUp 0.8s ease 0.55s both; }
        .display     { font-family: "Outfit", sans-serif; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          scrolled ? "bg-[#0a1f3c]/96 backdrop-blur-lg shadow-xl shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="flex items-center gap-2">
            <ImageWithFallback
              src={logoImg}
              alt="Travel Buddy UK logo"
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="text-white font-black text-lg tracking-tight display">
              Travel Buddy <span className="text-orange-400">UK</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => openBookingPage()}
              className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden text-white p-1" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`md:hidden bg-[#0a1f3c]/98 backdrop-blur-xl border-t border-white/10 overflow-hidden transition-all duration-300 ${
            navOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="px-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left text-white/70 hover:text-orange-400 py-3 text-sm font-medium transition-colors border-b border-white/5 last:border-0"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden pt-32">
        {/* Background */}
        <div className="absolute inset-0 bg-[#07152a]">
          <img
            src={heroBg}
            alt="Travel Buddy UK landing background"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07152a]/55 via-[#07152a]/30 to-[#07152a]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col h-full flex-1 justify-between w-full">
          <div>
            <h1 className="hero-h1 display text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.08] tracking-tight mb-2">
              Explore the UK Without<br />
              <span className="text-orange-400">Breaking Your Budget</span>
            </h1>

            <p className="hero-sub text-sm md:text-base text-white/65 max-w-2xl mx-auto leading-snug mb-10">
              Affordable weekend adventures with Travel Buddy UK. Discover breathtaking places,
              create unforgettable memories, and travel with like-minded people.
            </p>
          </div>

          <div className="hero-btns flex flex-col sm:flex-row items-center justify-center gap-4 pb-20">
            <button
              onClick={() => openBookingPage()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/35"
            >
              Book Your Trip
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/35"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BELT
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a1f3c] py-16 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 divide-x divide-white/10">
          <StatCounter target={100} label="Happy Travelers" />
          <StatCounter target={20} label="Trips Organised" />
          <StatCounter target={10} label="Destinations" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-blue-900">
                <img
                  src="https://images.unsplash.com/photo-1708959110531-371103791600?w=760&h=560&fit=crop&auto=format"
                  alt="Hikers on a Peak District trail"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Float badge */}
              <div className="absolute -bottom-5 -right-4 md:-right-8 bg-orange-500 text-white px-6 py-4 rounded-2xl shadow-xl shadow-orange-500/30 display">
                <div className="text-3xl font-black leading-none">5★</div>
                <div className="text-orange-100 text-xs mt-1 font-medium whitespace-nowrap">Rated by Travelers</div>
              </div>
              {/* Decorative circle */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-orange-100 -z-10" />
            </div>
          </FadeIn>

          <FadeIn delay={180}>
            <div>
              <div className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Who We Are</div>
              <h2 className="display text-4xl md:text-5xl font-black text-[#0a1f3c] leading-tight mb-6">
                Travel Made Affordable,<br />
                <span className="text-orange-500">Memories Made Forever</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-[15px]">
                Travel Buddy UK specializes in organizing budget-friendly weekend trips across the UK. We believe
                travel should be affordable and enjoyable for everyone. Our carefully planned trips offer adventure,
                comfort, and memorable experiences at reasonable prices.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Affordable Packages", "Safe Travel", "Friendly Community", "Weekend Getaways", "Expert Planning", "All Ages Welcome"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-gray-700 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-24 md:py-32 bg-[#0a1f3c] relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/8 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/6 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Why Choose Us</div>
              <h2 className="display text-4xl md:text-5xl font-black text-white leading-tight">
                What Makes Us <span className="text-orange-400">Different</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {WHY_CARDS.map((card, i) => (
              <FadeIn key={card.title} delay={i * 90} className="h-full">
                <div className="group bg-white/5 hover:bg-white/9 border border-white/8 hover:border-orange-500/40 backdrop-blur-sm rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/10 h-full flex flex-col">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="display text-white font-bold text-base mb-2.5">{card.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PREVIOUS TRIPS
      ══════════════════════════════════════════════════════ */}
      <section id="trips" className="py-24 md:py-32 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Our Adventures</div>
              <h2 className="display text-4xl md:text-5xl font-black text-[#0a1f3c] leading-tight">
                Previous <span className="text-orange-500">Trips</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PREVIOUS_TRIPS.map((trip, i) => (
              <FadeIn key={trip.title} delay={i * 90} className="h-full">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#0a1f3c]/12 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-52 bg-[#0a1f3c] overflow-hidden flex-shrink-0">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3c]/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {trip.tag}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="display text-[#0a1f3c] font-bold text-base mb-2">{trip.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{trip.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Captured Moments</div>
              <h2 className="display text-4xl md:text-5xl font-black text-[#0a1f3c] leading-tight">
                Trip <span className="text-orange-500">Gallery</span>
              </h2>
            </div>
          </FadeIn>

          {/* Masonry-style grid using CSS columns */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {GALLERY.map((img, i) => (
              <FadeIn key={i} delay={i * 70} className="break-inside-avoid mb-4">
                <div className="group relative rounded-2xl overflow-hidden bg-[#0a1f3c]" style={{ aspectRatio: img.tall ? "3/4" : "4/3" }}>
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    style={{ transform: "scale(1)" }}
                  />
                  <div className="absolute inset-0 bg-[#0a1f3c]/0 group-hover:bg-[#0a1f3c]/45 transition-all duration-350 flex items-end p-4">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          UPCOMING TRIPS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Coming Soon</div>
              <h2 className="display text-4xl md:text-5xl font-black text-[#0a1f3c] leading-tight">
                Upcoming <span className="text-orange-500">Adventures</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {UPCOMING_TRIPS.map((trip, i) => (
              <FadeIn key={trip.title} delay={i * 90} className="h-full">
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#0a1f3c]/12 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative h-44 bg-[#0a1f3c] overflow-hidden flex-shrink-0">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3c]/65 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" /> {trip.destination}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="display text-[#0a1f3c] font-bold text-sm mb-3">{trip.title}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                      <Calendar className="w-3.5 h-3.5 text-orange-400" /> {trip.date}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <div className="display text-2xl font-black text-orange-500">{trip.price}</div>
                      <button
                        onClick={() => openBookingPage()}
                        className="bg-[#0a1f3c] hover:bg-orange-500 text-white text-[11px] font-bold px-4 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-orange-500/25"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#0a1f3c] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-orange-500/8 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/6 rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">What People Say</div>
              <h2 className="display text-4xl md:text-5xl font-black text-white leading-tight">
                Happy <span className="text-orange-400">Travelers</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 130} className="h-full">
                <div className="bg-white/6 hover:bg-white/10 border border-white/9 hover:border-orange-500/25 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 flex flex-col h-full">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-7 italic flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm display flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-white/40 text-xs">{t.location}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Got Questions?</div>
              <h2 className="display text-4xl md:text-5xl font-black text-[#0a1f3c] leading-tight">
                Frequently Asked <span className="text-orange-500">Questions</span>
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "border-orange-400 shadow-lg shadow-orange-100" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-orange-50/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-[#0a1f3c] font-semibold text-sm pr-4 leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openFaq === i ? "200px" : "0" }}
                  >
                    <div className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-orange-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-32 bg-[#f4f7fb]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">Get In Touch</div>
              <h2 className="display text-4xl md:text-5xl font-black text-[#0a1f3c] leading-tight">
                Plan Your <span className="text-orange-500">Trip Today</span>
              </h2>
              <p className="text-gray-500 mt-4 text-sm">Weekend Budget Travel Across the UK</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Info */}
            <FadeIn className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="display text-[#0a1f3c] font-black text-xl mb-1">Travel Buddy UK</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Affordable weekend adventures — your next journey is just a message away.
                  </p>
                </div>

                <a
                  href="https://wa.me/447721893703" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-gray-100 hover:border-green-200 transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/25 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">WhatsApp</div>
                    <div className="text-[#0a1f3c] font-bold text-sm group-hover:text-green-600 transition-colors">+44 7721893703</div>
                  </div>
                </a>

                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-4">Follow Us</div>
                  <div className="flex gap-3">
                    <a href="#" className="w-11 h-11 bg-[#0a1f3c] hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-11 h-11 bg-[#0a1f3c] hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://wa.me/447721893703" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-green-500/25" title="WhatsApp">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={180} className="md:col-span-3">
              <form
                className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0a1f3c]/8 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0a1f3c] placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0a1f3c] placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+44 xxxx xxxxxx"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0a1f3c] placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us which trip you're interested in..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0a1f3c] placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-orange-500/25 text-sm tracking-wide"
                >
                  Send Enquiry
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-[#07152a] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <ImageWithFallback
                  src={logoImg}
                  alt="Travel Buddy UK logo"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <span className="display text-white font-black text-lg">
                  Travel Buddy <span className="text-orange-400">UK</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
                Affordable Weekend Adventures Across the UK. Your trusted partner for budget-friendly travel experiences.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-white/8 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-white/8 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://wa.me/447721893703" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/8 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="display text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-white/40 hover:text-orange-400 text-[13px] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="display text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <a href="https://wa.me/447721893703" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/40 hover:text-green-400 transition-colors text-[13px]">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  +44 7721893703
                </a>
                <div className="flex items-start gap-3 text-white/40 text-[13px]">
                  <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  United Kingdom
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center text-white/25 text-xs flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>© 2026 Travel Buddy UK. All Rights Reserved.</span>
            <a
              href="https://www.bhargav-s.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              Designed by Bhargav Seelam
            </a>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════
          FLOATING WHATSAPP
      ══════════════════════════════════════════════════════ */}
      <a
        href="https://wa.me/447721893703" target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all hover:scale-110 hover:shadow-green-500/50"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
    </div>
  );
}
