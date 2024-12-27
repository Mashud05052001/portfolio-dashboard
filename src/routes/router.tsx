import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import CreateExperience from "../pages/experiences/CreateExperience";
import AllExperiencesTable from "../pages/experiences/AllExperiencesTable";
import CreateEducation from "../pages/education/CreateEducation";
import AllEducationTable from "../pages/education/AllEducationTable";
import CreateProjects from "../pages/projects/CreateProjects";
import AllProjectsTable from "../pages/projects/AllProjectsTable";
import CreateBlogs from "../pages/blogs/CreateBlogs";
import AllBlogsTable from "../pages/blogs/AllBlogsTable";
import CreateSkill from "../pages/skills/CreateSkill";
import AllSkillTable from "../pages/skills/AllSkillTable";
import InitialPage from "../pages/InitialPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <InitialPage /> },
      { path: "/create-experience", element: <CreateExperience /> },
      { path: "/all-experiences", element: <AllExperiencesTable /> },

      { path: "/create-education", element: <CreateEducation /> },
      { path: "/all-educations", element: <AllEducationTable /> },

      { path: "/create-project", element: <CreateProjects /> },
      { path: "/all-projects", element: <AllProjectsTable /> },

      { path: "/create-blog", element: <CreateBlogs /> },
      { path: "/all-blogs", element: <AllBlogsTable /> },

      { path: "/create-skill", element: <CreateSkill /> },
      { path: "/all-skills", element: <AllSkillTable /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
