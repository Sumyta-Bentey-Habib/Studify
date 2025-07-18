import React from 'react';
import Carousel from '../components/Carousel';
import ImportentCourses from '../components/ImportentCourses';
import UserReviews from '../components/UserReviews';
import ViewAllStudySessions from '../users/admin/ViewAllStudySessions'; 

const Home = () => {
  return (
    <div>
      <Carousel />
      <ViewAllStudySessions limit={3} /> 
      <ImportentCourses />
      <UserReviews />
    </div>
  );
};

export default Home;
