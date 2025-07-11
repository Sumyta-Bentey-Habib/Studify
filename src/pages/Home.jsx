import React from 'react';
import Carousel from '../components/Carousel';
import ImportentCourses from '../components/ImportentCourses';
import UserReviews from '../components/UserReviews';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <ImportentCourses></ImportentCourses>
            <UserReviews></UserReviews>
          
        </div>
    );
};

export default Home;