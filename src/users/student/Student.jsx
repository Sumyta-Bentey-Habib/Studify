import React from 'react';
import CreateNote from './CreateNote';
import ManageNotes from './ManageNotes';
import ViewNotes from './ViewNotes';

const Student = () => {
    return (
        <div>
            <CreateNote></CreateNote>
            <BookedSession></BookedSession>
            <ManageNotes></ManageNotes>
            <ViewNotes></ViewNotes>
        </div>
    );
};

export default Student;