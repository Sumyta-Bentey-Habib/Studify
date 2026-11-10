import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import slide1 from "../assets/slider/slide1.jpg";
import slide2 from "../assets/slider/slide2.jpg";
import slide3 from "../assets/slider/slide3.jpg";
import slide4 from "../assets/slider/slide4.jpg";
import slide5 from "../assets/slider/slide5.jpg";

const stats = [
  { value: '10K+', label: 'Active Learners' },
  { value: '500+', label: 'Study Sessions' },
  { value: '4.9★', label: 'Avg. Rating' },
];

export default function Carousel() {
  const [currentSlider, setCurrentSlider] = useState(0);

  const sliders = [
    { img: slide1, badge: '🚀 New Sessions Added', title: 'Empower Your', accent: 'Learning Journey', des: 'Join a vibrant community to collaborate, share knowledge, and grow together.' },
    { img: slide2, badge: '👥 100+ Study Groups', title: 'Study Smarter,', accent: 'Together', des: 'Connect with peers and mentors to unlock your full academic potential.' },
    { img: slide3, badge: '🗂️ Organised Resources', title: 'Your Group,', accent: 'Your Way', des: 'Create study groups, share resources, and track your progress easily.' },
    { img: slide4, badge: '🏆 Top-Rated Platform', title: 'Learn. Share.', accent: 'Succeed.', des: 'Turn studying into a collaborative journey that makes learning fun.' },
    { img: slide5, badge: '🌍 Access Anywhere', title: 'Study Without', accent: 'Limits', des: 'Access groups, courses, and tools anytime, anywhere.' },
  ];

  const nextSlider = () =>
    setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  const prevSlider = () =>
    setCurrentSlider((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlider, 4000);
    return () => clearInterval(interval);
  }, [currentSlider]);

  const slide = sliders[currentSlider];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #818cf8 0%, #c7d2fe 100%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #34d399 0%, #6ee7b7 100%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full opacity-10 blur-2xl"
        style={{ background: '#6366f1' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* ── Left: Text content ── */}
        <div className="flex-1 text-center md:text-left">

          {/* Badge */}
          <span className="inline-block mb-5 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100">
            {slide.badge}
          </span>

          {/* Heading */}
          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {slide.title}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              {slide.accent}
            </span>
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-500 md:text-lg mx-auto md:mx-0">
            {slide.des}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-12">
            <NavLink
              to="/register"
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg"
            >
              Get Started Free
            </NavLink>
            <NavLink
              to="/about"
              className="rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Learn More →
            </NavLink>
          </div>

          {/* Stats row */}
          <div className="flex justify-center md:justify-start gap-8 border-t border-slate-100 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Blob image ── */}
        <div className="flex-1 flex justify-center relative">
          {/* Outer blob shape */}
          <div
            className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] overflow-hidden shadow-2xl"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            {/* subtle dark overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent" />
          </div>

          {/* Floating card — top-left */}
          <div className="absolute top-4 -left-4 hidden md:flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-xs font-bold text-slate-800">New Session</p>
              <p className="text-xs text-slate-500">Just published!</p>
            </div>
          </div>

          {/* Floating card — bottom-right */}
          <div className="absolute bottom-6 -right-4 hidden md:flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg">
            <span className="text-2xl">📚</span>
            <div>
              <p className="text-xs font-bold text-slate-800">500+ Resources</p>
              <p className="text-xs text-slate-500">Free for members</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="relative z-10 flex justify-center gap-2 pb-10">
        {sliders.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlider(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlider
                ? 'w-8 h-2.5 bg-indigo-600'
                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-indigo-300'
            }`}
          />
        ))}
      </div>

      {/* ── Prev / Next arrow buttons ── */}
      <button
        onClick={prevSlider}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur hover:bg-indigo-50 transition"
      >
        <svg viewBox="0 0 1024 1024" className="w-4 h-4 text-slate-700" fill="currentColor">
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" />
        </svg>
      </button>
      <button
        onClick={nextSlider}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur hover:bg-indigo-50 transition"
      >
        <svg viewBox="0 0 1024 1024" className="w-4 h-4 rotate-180 text-slate-700" fill="currentColor">
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" />
        </svg>
      </button>
    </section>
  );
}
