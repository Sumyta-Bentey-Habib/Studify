import React, { useEffect } from 'react';
import Carousel from '../components/Carousel';
import ImportentCourses from '../components/ImportentCourses';
import UserReviews from '../components/UserReviews';
import ViewAllStudySessions from '../users/admin/ViewAllStudySessions'; 
import FAQ from '../components/FAQ';
const Home = () => {
  useEffect(()=>{
    document.title="Studify";
  },[]);

  return (
    <div>
      <Carousel />
      <ViewAllStudySessions limit={3} /> 
      <ImportentCourses />
      <FAQ></FAQ>
      <UserReviews />
    </div>
  );
};

export default Home;
