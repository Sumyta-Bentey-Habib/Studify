import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/LogIn";
import RegistrationPage from "../pages/RegistrationPage";

import DashboardLayout from "../layouts/DashboardLayout";

import Admin from "../users/admin/Admin";
import Mentor from "../users/mentor/Mentor";
import Student from "../users/student/Student";

// Admin sub-components
import ViewAllStudyMaterials from "../users/admin/ViewAllStudyMaterials";
import ViewAllStudySessions from "../users/admin/ViewAllStudySessions"
import ViewAllUsers from "../users/admin/ViewAllUsers";
import AdminUpgradeRequests from "../users/admin/AdminUpgradeRequests";

// Mentor sub-components
import CreateSession from "../users/mentor/CreateSession";
import UploadMaterials from "../users/mentor/UploadMaterials";
import ViewSessions from "../users/mentor/ViewSessions";

// Student sub-components
import CreateNote from "../users/student/CreateNote";
import BookedSession from "../users/student/BookedSession";
import ViewNotes from "../users/student/ViewNotes";
import ViewMaterials from "../users/student/ViewMaterials";
import StudentDashboard from "../users/student/StudentDashboard";
import StudentMaterials from "../users/student/StudentMaterials";
import BeTutorRequest from "../users/student/BeTutorRequest";

import ProfilePage from "../pages/ProfilePage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "view-study-materials", element: <ViewAllStudyMaterials /> },
          { path: "view-study-sessions", element: <ViewAllStudySessions /> },
          { path: "view-users", element: <ViewAllUsers /> },
          { path: "upgrade-the-user", element: <AdminUpgradeRequests></AdminUpgradeRequests> },
        ],
      },
      {
        path: "mentor",
        element: <Mentor />,
        children: [
          { path: "create-session", element: <CreateSession /> },
          { path: "upload-materials", element: <UploadMaterials /> },
          { path: "view-sessions", element: <ViewSessions /> },
        ],
      },
      {
        path: "student",
        element: <Student />,
        children: [
          { path: "create-note", element: <CreateNote /> },
          { path: "booked-session", element: <BookedSession /> },
          { path: "view-notes", element: <ViewNotes /> },
          { path: "view-materials", element:<ViewMaterials></ViewMaterials> },
          { path: "view-sessions", element:<StudentDashboard></StudentDashboard> },
          { path: "study-materials", element:<StudentMaterials></StudentMaterials> },
          { path: "sent-request", element:<BeTutorRequest></BeTutorRequest> },
         
        ],
      },
    ],
    
  },
  {
    path:"/dashboard/profile",
    element:<ProfilePage></ProfilePage>


  },
]);
