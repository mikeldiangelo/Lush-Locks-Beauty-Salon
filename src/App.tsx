import { useEffect, useRef, useState } from 'react';

const WHATSAPP_NUMBER = '2348012345678';
const WHATSAPP_MESSAGE = 'Hi! I would like to book a beauty appointment.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const INSTAGRAM_LINK = 'https://instagram.com/lushlocksbeauty';

const services = [
  {
    name: 'Hair Styling',
    description: 'Silk press, curls, wash & blowdry, trims & treatments, fixing.',
    price: '₦8,000',
    image: '/images/gallery-hair-styling.jpg',
  },
  {
    name: 'Braiding',
    description: 'Box braids, cornrows, knotless, goddess braids & more.',
    price: '₦12,000',
    image: '/images/gallery-braiding.jpg',
  },
  {
    name: 'Nails',
    description: 'Manicure, pedicure, gel polish, nail art & extensions.',
    price: '₦5,000',
    image: '/images/gallery-nails-manicure.jpg',
  },
  {
    name: 'Makeup',
    description: 'Bridal, events, glam & soft everyday looks.',
    price: '₦20,000',
    image: '/images/gallery-glam-makeup.jpg',
  },
  {
    name: 'Wig Installation',
    description: 'Lace installation, styling, customization & revamping.',
    price: '₦15,000',
    image: '/images/gallery-wig-install.jpg',
  },
];

const priceList = [
  { service: 'Hair Services', start: '₦8,000', note: 'Wash, blowdry, styling & treatments' },
  { service: 'Braiding', start: '₦12,000', note: 'Box, knotless, cornrows & goddess' },
  { service: 'Nails', start: '₦5,000', note: 'Manicure, pedicure, gel & nail art' },
  { service: 'Makeup', start: '₦20,000', note: 'Bridal, events & glam looks' },
  { service: 'Wig Installation', start: '₦15,000', note: 'Lace install, styling & revamp' },
];

const gallery = [
  { src: '/images/gallery-braiding.jpg', alt: 'Braiding transformation' },
  { src: '/images/gallery-hair-styling.jpg', alt: 'Hair styling result' },
  { src: '/images/gallery-bridal-makeup.jpg', alt: 'Bridal makeup' },
  { src: '/images/gallery-glam-makeup.jpg', alt: 'Glam makeup' },
  { src: '/images/gallery-nails-manicure.jpg', alt: 'Manicure nails' },
  { src: '/images/gallery-nail-art.jpg', alt: 'Nail art design' },
  { src: '/images/gallery-wig-install.jpg', alt: 'Wig installation' },
  { src: '/images/hero-salon.jpg', alt: 'Salon interior' },
];

const trustPoints = [
  { title: 'Instant WhatsApp Booking', text: 'Book your slot in seconds — no DM delays.' },
  { title: 'Professional Stylists', text: 'Skilled hands trained in the latest beauty trends.' },
  { title: 'Clean Premium Environment', text: 'A relaxing, hygienic space for every service.' },
  { title: 'Affordable Luxury Pricing', text: 'Premium looks without breaking the bank.' },
];

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LocationIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MenuIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function WhatsAppButton({
  children,
  className = '',
  size = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white shadow-lg shadow-green-600/25 transition-all active:scale-95 hover:bg-[#128C7E] hover:shadow-xl hover:shadow-green-600/30 ${sizeClasses[size]} ${className}`}
    >
      <WhatsAppIcon className={size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
      {children}
    </a>
  );
}

function SectionHeading({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8 text-center md:mb-12">
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-400">{subtitle}</p>
      )}
      <h2 className="text-2xl font-bold leading-tight text-charcoal md:text-3xl lg:text-4xl">
        {children}
      </h2>
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="text-xl font-bold tracking-tight text-charcoal">
            Lush<span className="text-rose-400">Locks</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm font-medium text-gray-600 hover:text-rose-400 transition-colors">Services</a>
            <a href="#prices" className="text-sm font-medium text-gray-600 hover:text-rose-400 transition-colors">Prices</a>
            <a href="#gallery" className="text-sm font-medium text-gray-600 hover:text-rose-400 transition-colors">Gallery</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-rose-400 transition-colors">Contact</a>
            <WhatsAppButton size="sm">Book Now</WhatsAppButton>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-charcoal hover:bg-rose-50 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#services" onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-700">Services</a>
              <a href="#prices" onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-700">Prices</a>
              <a href="#gallery" onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-700">Gallery</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-700">Contact</a>
              <WhatsAppButton size="md" className="w-full">Book on WhatsApp</WhatsAppButton>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-salon.jpg"
            alt="Premium salon interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <div className="animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-500">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Now Booking in Lagos
          </div>
          <h1 className="animate-fade-in-up animate-delay-100 text-4xl font-extrabold leading-[1.1] tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-7xl">
            Book Your Beauty Appointment in Minutes
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mx-auto mt-5 max-w-xl text-lg text-gray-600 md:text-xl">
            Hair • Nails • Makeup — Instant WhatsApp Booking
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppButton size="lg" className="w-full sm:w-auto animate-pulse-soft">
              Book on WhatsApp
            </WhatsAppButton>
            <a
              href="#services"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-charcoal bg-white px-8 py-4 text-base font-semibold text-charcoal shadow-sm transition-all active:scale-95 hover:bg-gray-50 sm:w-auto"
            >
              View Services
            </a>
          </div>
          <p className="animate-fade-in-up animate-delay-300 mt-4 text-sm text-gray-500">
            No DMs. No waiting. Just tap and book.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-blush py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <SectionHeading subtitle="What We Offer">Our Services</SectionHeading>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.name} delay={index * 100}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-charcoal">{service.name}</h3>
                      <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-500">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                      Book this service <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Price List Section */}
      <section id="prices" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <SectionHeading subtitle="Transparent Pricing">Price List</SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="divide-y divide-gray-100">
                {priceList.map((item) => (
                  <div
                    key={item.service}
                    className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-rose-50/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-charcoal">{item.service}</h3>
                      <p className="text-sm text-gray-500">{item.note}</p>
                    </div>
                    <span className="text-lg font-bold text-rose-500">{item.start}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-5 py-3 text-center text-xs text-gray-500">
                Final price depends on style, length, and add-ons. Tap WhatsApp for a quick quote.
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 text-center">
              <WhatsAppButton size="md">Get a Free Quote on WhatsApp</WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-blush py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <SectionHeading subtitle="Real Results">Before & After Gallery</SectionHeading>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {gallery.map((image, index) => (
              <Reveal key={image.src} delay={index * 75}>
                <div className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-8 text-center">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 hover:shadow-xl"
              >
                <InstagramIcon className="w-5 h-5" />
                See More on Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <SectionHeading subtitle="Why Clients Trust Us">Why Choose LushLocks</SectionHeading>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 100}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-400">
                    {index === 0 ? (
                      <WhatsAppIcon className="w-6 h-6" />
                    ) : index === 1 ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    ) : index === 2 ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                      </svg>
                    )}
                  </div>
                  <h3 className="mb-2 text-base font-bold text-charcoal">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA Section */}
      <section className="relative overflow-hidden bg-charcoal py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-salon.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Ready to book your next beauty session?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-300 md:text-lg">
              Skip the DM back-and-forth. Send a WhatsApp message now and secure your appointment today.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhatsAppButton size="lg" className="w-full sm:w-auto">
                Chat on WhatsApp Now
              </WhatsAppButton>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-sm text-gray-400">Average reply time: under 5 minutes</p>
          </Reveal>
        </div>
      </section>

      {/* Contact / Social */}
      <section id="contact" className="bg-blush py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Reveal>
            <SectionHeading subtitle="Get In Touch">Contact & Location</SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-400">
                      <LocationIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Visit Us</h3>
                      <p className="text-sm text-gray-600">Lagos, Nigeria</p>
                      <p className="text-xs text-gray-400">Exact address shared on WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">WhatsApp Booking</h3>
                      <p className="text-sm text-gray-600">+234 801 234 5678</p>
                      <p className="text-xs text-gray-400">Fastest way to book</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-500">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Instagram</h3>
                      <p className="text-sm text-gray-600">@lushlocksbeauty</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition-all active:scale-95 hover:bg-[#128C7E]"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                    Book on WhatsApp
                  </a>
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-purple-100 bg-white py-4 text-base font-bold text-purple-600 transition-all active:scale-95 hover:bg-purple-50"
                  >
                    <InstagramIcon className="w-6 h-6" />
                    Follow on Instagram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-lg font-bold text-charcoal">
            Lush<span className="text-rose-400">Locks</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Professional beauty services in Lagos, Nigeria. Book instantly on WhatsApp.
          </p>
          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} LushLocks Beauty Salon. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-xl shadow-green-600/30 transition-transform active:scale-95 hover:bg-[#128C7E] md:hidden"
      >
        <WhatsAppIcon className="w-5 h-5" />
        Book Now
      </a>

      {/* Desktop Floating CTA */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-green-600/30 transition-all hover:-translate-y-1 hover:bg-[#128C7E] md:flex"
      >
        <WhatsAppIcon className="w-5 h-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
