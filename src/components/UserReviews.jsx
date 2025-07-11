import React, { useState } from 'react';
import imgf1 from "../assets/reviews/stf1.jpg";
import imgm1 from "../assets/reviews/stm1.jpg";
import imgf2 from "../assets/reviews/stf2.jpg";
import imgm2 from "../assets/reviews/stm2.jpg";
import imgf3 from "../assets/reviews/stf3.jpg";
import imgm3 from "../assets/reviews/stm3.jpg";
import imgf4 from "../assets/reviews/stf4.jpg";
import imgm4 from "../assets/reviews/stm4.jpg";



const UserReviews = () => {
  const reviews = [
    {
      img: imgf1,
      name: 'Emma Brown',
      text: 'This platform transformed the way I study. The community is so supportive!',
    },
    {
      img:imgm1,
      name: 'Ethan Parker',
      text: 'I love the live sessions and flexible groups. Highly recommended for busy students.',
    },
    {
      img:imgf2,
      name: 'Olivia Davis',
      text: 'The study resources are top-notch and helped me pass my exams with confidence.',
    },
    {
      img: imgm2,
      name: 'James Wilson',
      text: 'A wonderful learning community that keeps me motivated every day.',
    },
    {
      img: imgf3,
      name: 'Sophia Miller',
      text: 'The mentors are amazing! They answer all my questions and guide me through projects.',
    },
    {
      img:imgm3,
      name: 'Oliver Smith',
      text: 'I finally feel confident tackling my studies thanks to the peer support here.',
    },
    {
      img: imgf4,
      name: 'Ava Taylor',
      text: 'Great resources and friendly people — it makes studying so much less stressful.',
    },
    {
      img: imgm4,
      name: 'Liam Johnson',
      text: 'I’ve learned so much faster with group study sessions. It keeps me accountable!',
    },
  ];

  const [isOpen, setIsOpen] = useState(0);

  const handleToggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {reviews.map((review, idx) => (
        <div
          key={idx}
          onClick={() => handleToggle(idx)}
          className={`relative h-[400px] cursor-pointer overflow-hidden rounded-md transition-all duration-500 ease-in-out ${
            isOpen === idx ? 'w-[250px] opacity-100 shadow-xl' : 'w-[80px] opacity-60 grayscale'
          } ${idx % 2 === 0 ? 'translate-y-6' : ''}`}
        >
          <img
            src={review.img}
            alt={review.name}
            className="block object-cover w-full h-full"
          />
          <div
            className={`absolute bottom-0 flex flex-col items-center justify-end px-4 pb-4 text-center text-white transition-all duration-500 ${
              isOpen === idx
                ? 'h-full bg-gradient-to-t from-black/80 to-transparent opacity-100'
                : 'h-1/3 bg-black/50 opacity-90'
            }`}
          >
            <h3 className="mb-1 text-base font-semibold">{review.name}</h3>
            {isOpen === idx && (
              <p className="text-xs leading-snug">{review.text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;
