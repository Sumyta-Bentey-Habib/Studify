import React, { useState } from 'react';
import imgf1 from "../assets/reviews/stf1.jpg";
import imgm1 from "../assets/reviews/stm1.jpg";
import imgf2 from "../assets/reviews/stf2.jpg";
import imgm2 from "../assets/reviews/stm2.jpg";
import imgf3 from "../assets/reviews/stf3.jpg";
import imgm3 from "../assets/reviews/stm3.jpg";
import imgf4 from "../assets/reviews/stf4.jpg";
import imgm4 from "../assets/reviews/stm4.jpg";

const reviews = [
  { img: imgf1, name: 'Emma Brown',    text: 'This platform transformed the way I study. The community is so supportive!' },
  { img: imgm1, name: 'Ethan Parker',  text: 'I love the live sessions and flexible groups. Highly recommended for busy students.' },
  { img: imgf2, name: 'Olivia Davis',  text: 'The study resources are top-notch and helped me pass my exams with confidence.' },
  { img: imgm2, name: 'James Wilson',  text: 'A wonderful learning community that keeps me motivated every day.' },
  { img: imgf3, name: 'Sophia Miller', text: 'The mentors are amazing! They answer all my questions and guide me through projects.' },
  { img: imgm3, name: 'Oliver Smith',  text: 'I finally feel confident tackling my studies thanks to the peer support here.' },
  { img: imgf4, name: 'Ava Taylor',    text: 'Great resources and friendly people — it makes studying so much less stressful.' },
  { img: imgm4, name: 'Liam Johnson',  text: "I've learned so much faster with group study sessions. It keeps me accountable!" },
];

const UserReviews = () => {
  const [isOpen, setIsOpen] = useState(0);

  const handleToggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <section className="bg-slate-50 py-20">
      {/* Section header */}
      <div className="text-center mb-12 px-6">
        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 mb-4">
          ⭐ Learner Stories
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          What our{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            community says
          </span>
        </h2>
        <p className="mt-4 text-slate-500 max-w-md mx-auto">
          Click on any card to read a review from a real Studify member.
        </p>
      </div>

      {/* Accordion photo strip */}
      <div className="flex flex-wrap justify-center gap-3 px-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            onClick={() => handleToggle(idx)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out ${
              isOpen === idx
                ? 'w-[240px] opacity-100 shadow-xl ring-2 ring-indigo-400'
                : 'w-[72px] opacity-50 grayscale hover:opacity-70'
            } h-[380px] ${idx % 2 === 0 ? 'translate-y-5' : ''}`}
          >
            <img
              src={review.img}
              alt={review.name}
              className="block w-full h-full object-cover"
            />
            <div
              className={`absolute bottom-0 inset-x-0 flex flex-col items-center justify-end px-4 pb-5 text-center text-white transition-all duration-500 ${
                isOpen === idx
                  ? 'h-full bg-gradient-to-t from-indigo-900/80 via-indigo-900/30 to-transparent opacity-100'
                  : 'h-1/3 bg-black/50 opacity-90'
              }`}
            >
              <h3 className="mb-1 text-sm font-bold">{review.name}</h3>
              {isOpen === idx && (
                <p className="text-xs leading-relaxed text-slate-200">{review.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
