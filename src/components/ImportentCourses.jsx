import React from 'react';
import Container from "../shared/Container";

const courseHighlights = [
  { emoji: '🛠️', title: 'Build Real-World Skills', description: 'Our study groups help you master practical skills you can apply immediately.' },
  { emoji: '🤝', title: 'Collaborative Learning', description: 'Work together with peers to solve challenges and deepen understanding.' },
  { emoji: '🧑‍🏫', title: 'Expert Guidance', description: 'Learn directly from experienced mentors and industry professionals.' },
  { emoji: '⚡', title: 'Stay Ahead', description: 'Access up-to-date resources and stay ahead of the curve in your field.' },
  { emoji: '🗓️', title: 'Flexible Schedules', description: 'Join sessions that fit your time and pace for stress-free learning.' },
  { emoji: '🌐', title: 'Grow Your Network', description: 'Connect with like-minded learners, mentors, and industry experts.' },
  { emoji: '🏗️', title: 'Practical Projects', description: 'Build real projects that boost your portfolio and confidence.' },
  { emoji: '💬', title: 'Supportive Community', description: 'Be part of a positive community that motivates and supports your goals.' },
];

const ImportentCourses = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      {/* subtle top gradient bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400" />

      <Container>
        {/* Section header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 mb-4">
            ✨ Why Choose Studify
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base">
            Studify gives every learner the tools, community, and guidance to reach their goals.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {courseHighlights.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-indigo-200"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                {item.emoji}
              </span>
              <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ImportentCourses;
