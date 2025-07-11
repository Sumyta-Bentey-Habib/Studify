import { useState, useEffect } from 'react';
import slide1 from "../assets/slider/slide1.jpg";
import slide2 from "../assets/slider/slide2.jpg";
import slide3 from "../assets/slider/slide3.jpg";
import slide4 from "../assets/slider/slide4.jpg";
import slide5 from "../assets/slider/slide5.jpg";

export default function Carousel() {
  const [currentSlider, setCurrentSlider] = useState(0);

  const sliders = [
    {
      img: slide1,
      title: 'Empower Your Learning',
      des: 'Join a vibrant community to collaborate, share knowledge, and grow together.'
    },
    {
      img: slide2,
      title: 'Study Smarter, Together',
      des: 'Connect with peers and mentors to unlock your full academic potential.'
    },
    {
      img: slide3,
      title: 'Your Group, Your Way',
      des: 'Create study groups, share resources, and track your progress easily.'
    },
    {
      img: slide4,
      title: 'Learn. Share. Succeed.',
      des: 'Turn studying into a collaborative journey that makes learning fun.'
    },
    {
      img: slide5,
      title: 'Study Without Limits',
      des: 'Access groups, courses, and tools anytime, anywhere.'
    }
  ];

  const prevSlider = () =>
    setCurrentSlider((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));

  const nextSlider = () =>
    setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));

  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlider();
    }, 2000); 

    return () => clearInterval(interval); 
  }, [currentSlider]); 

  return (
    <section
      className="relative flex h-[60vh] min-h-[300px] w-full items-center justify-center overflow-hidden bg-center bg-cover sm:h-[70vh] md:h-[85vh]"
      style={{ backgroundImage: `url(${sliders[currentSlider].img})` }}
    >
    
      <div className="absolute inset-0 bg-black/50"></div>

   
      <div className="relative z-10 mx-4 max-w-full px-4 text-center text-white sm:max-w-[90%] md:max-w-[60%] lg:text-left">
        <h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {sliders[currentSlider].title.split(' ').map((word, i) =>
            i === 0 ? (
              <span key={i} className="text-purple-400">{word} </span>
            ) : (
              word + ' '
            )
          )}
        </h1>
        <p className="mb-6 text-sm leading-relaxed sm:text-base md:text-lg">
          {sliders[currentSlider].des}
        </p>
        <button className="px-6 py-3 text-sm font-semibold text-white bg-purple-600 rounded hover:bg-purple-700 sm:text-base">
          Join Now
        </button>
      </div>

 
      <div className="absolute flex gap-4 -translate-x-1/2 bottom-8 left-1/2 sm:bottom-12">
        <button
          onClick={prevSlider}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              fill="#ffffff"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>
        <button
          onClick={nextSlider}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-5 h-5 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              fill="#ffffff"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>
      </div>

      {/* Thumbnails — hidden on mobile */}
      <div className="absolute bottom-0 right-0 z-10 hidden w-full px-4 pb-4 overflow-x-auto sm:flex sm:justify-end md:pr-10">
        <div className="flex gap-3">
          {sliders.map((slide, index) => (
            <img
              key={index}
              src={slide.img}
              alt={slide.title}
              className={`h-20 w-32 rounded object-cover transition-transform duration-300 cursor-pointer ${
                currentSlider === index ? 'ring-2 ring-purple-400' : 'opacity-80'
              }`}
              onClick={() => setCurrentSlider(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
