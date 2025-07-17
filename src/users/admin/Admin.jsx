import React from 'react';
import ViewAllStudyMaterials from './ViewAllStudyMaterials';
import ViewAllStudySessions from './ViewAllStudySessions';
import ViewAllUsers from './ViewAllUsers';

const Admin = () => {
    return (
        <div>
            <ViewAllStudyMaterials></ViewAllStudyMaterials>
            <ViewAllStudySessions></ViewAllStudySessions>
            <ViewAllUsers></ViewAllUsers>
        </div>
    );
};

export default Admin;