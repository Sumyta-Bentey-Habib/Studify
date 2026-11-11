import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/LogIn";
import RegistrationPage from "../pages/RegistrationPage";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardIndex from "../components/dashboard/DashboardIndex";

import Admin from "../users/admin/Admin";
import Mentor from "../users/mentor/Mentor";
import Student from "../users/student/Student";

// Admin sub-components
import ViewAllStudyMaterials from "../users/admin/ViewAllStudyMaterials";
import ViewAllStudySessions from "../users/admin/ViewAllStudySessions";
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
import StudySessionsView from "../users/student/StudySessionsView";
import StudentMaterials from "../users/student/StudentMaterials";
import BeTutorRequest from "../users/student/BeTutorRequest";

import ProfilePage from "../pages/ProfilePage";
import SessionDetails from "../components/SessionDetails";
import PaymentSuccess from "../components/PaymentSuccess";
import About from "../components/About";
import ContactUs from "../components/ContactUs";

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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactUs />,
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
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "overview", element: <Navigate to="/dashboard/admin" replace /> },
          { path: "view-study-materials", element: <ViewAllStudyMaterials /> },
          { path: "view-study-sessions", element: <ViewAllStudySessions /> },
          { path: "view-users", element: <ViewAllUsers /> },
          { path: "upgrade-the-user", element: <AdminUpgradeRequests /> },
        ],
      },
      {
        path: "mentor",
        element: <Mentor />,
        children: [
          { path: "overview", element: <Navigate to="/dashboard/mentor" replace /> },
          { path: "create-session", element: <CreateSession /> },
          { path: "upload-materials", element: <UploadMaterials /> },
          { path: "view-sessions", element: <ViewSessions /> },
        ],
      },
      {
        path: "student",
        element: <Student />,
        children: [
          { path: "overview", element: <Navigate to="/dashboard/student" replace /> },
          { path: "create-note", element: <CreateNote /> },
          { path: "booked-session", element: <BookedSession /> },
          { path: "view-notes", element: <ViewNotes /> },
          { path: "view-materials", element: <ViewMaterials /> },
          { path: "view-sessions", element: <StudySessionsView /> },
          { path: "view-sessions/:id", element: <SessionDetails /> },
          { path: "study-materials", element: <StudentMaterials /> },
          { path: "sent-request", element: <BeTutorRequest /> },
        ],
      },
    ],
  },
  { path: "/dashboard/profile", element: <ProfilePage /> },
  { path: "payment-success", element: <PaymentSuccess /> },
]);
