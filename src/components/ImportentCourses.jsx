import React from 'react';
import Container from "../shared/Container";
const ImportentCourses = () => {
  const courseHighlights = [
    {
      title: 'Build Real-World Skills',
      description: 'Our study groups help you master practical skills you can apply immediately.',
    },
    {
      title: 'Collaborative Learning',
      description: 'Work together with peers to solve challenges and deepen understanding.',
    },
    {
      title: 'Expert Guidance',
      description: 'Learn directly from experienced mentors and industry professionals.',
    },
    {
      title: 'Stay Ahead',
      description: 'Access up-to-date resources and stay ahead of the curve in your field.',
    },
    {
      title: 'Flexible Schedules',
      description: 'Join sessions that fit your time and pace for stress-free learning.',
    },
    {
      title: 'Grow Your Network',
      description: 'Connect with like-minded learners, mentors, and industry experts.',
    },
    {
      title: 'Practical Projects',
      description: 'Build real projects that boost your portfolio and confidence.',
    },
    {
      title: 'Supportive Community',
      description: 'Be part of a positive community that motivates and supports your goals.',
    },
  ];

  return (
    <Container>
        <div>
      <h2 className="mt-10 mb-10 text-3xl font-bold text-center text-purple-700 sm:text-4xl">
        Why These Courses Matter
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courseHighlights.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between rounded-lg p-6 shadow-md transition-colors duration-300 ${
              index % 2 === 0
                ? 'bg-white text-purple-700'
                : 'bg-purple-700 text-white'
            }`}
          >
            <h3 className="mb-3 text-lg font-semibold md:text-xl">
              {item.title}
            </h3>
            <p className="text-sm md:text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
    </Container>
    

  );
};

export default ImportentCourses;
