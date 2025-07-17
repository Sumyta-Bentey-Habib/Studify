import React from 'react';
import CreateSession from './CreateSession';
import UploadMaterials from './UploadMaterials';
import ViewSessions from './ViewSessions';

const Mentor = () => {
    return (
        <div>
           <CreateSession></CreateSession>
           <UploadMaterials></UploadMaterials>
           <ViewSessions></ViewSessions>
        </div>
    );
};

export default Mentor;