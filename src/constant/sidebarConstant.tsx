import { MenuProps } from "antd";
import {
  Baby,
  BadgePlus,
  BookOpenText,
  BookUser,
  Cog,
  Logs,
  SquareKanban,
} from "lucide-react";
import { Link } from "react-router-dom";

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const sidebarItems: MenuItem[] = [
  getItem("Experience", "experience", <BookUser size={22} />, [
    getItem(
      <Link to={"/create-experience"}>Create Experience</Link>,
      "create-experience",
      <BadgePlus size={20} />
    ),
    getItem(
      <Link to={"/all-experiences"}>All Experiences</Link>,
      "all-experiences",
      <SquareKanban size={20} />
    ),
  ]),
  getItem("Education", "Education", <BookOpenText size={22} />, [
    getItem(
      <Link to={"/create-education"}>Create Edu</Link>,
      "create-education",
      <BadgePlus size={20} />
    ),
    getItem(
      <Link to={"/all-educations"}>All Edu</Link>,
      "all-educations",
      <SquareKanban size={20} />
    ),
  ]),
  getItem("Projects", "project", <Cog size={22} />, [
    getItem(
      <Link to={"/create-project"}>Create Project</Link>,
      "create-project",
      <BadgePlus size={20} />
    ),
    getItem(
      <Link to={"/all-projects"}>All Projects</Link>,
      "all-projects",
      <SquareKanban size={20} />
    ),
  ]),
  getItem("Blogs", "blog", <Logs size={22} />, [
    getItem(
      <Link to={"/create-blog"}>Create Blog</Link>,
      "create-blog",
      <BadgePlus size={20} />
    ),
    getItem(
      <Link to={"/all-blogs"}>All Blogs</Link>,
      "all-blogs",
      <SquareKanban size={20} />
    ),
  ]),
  getItem("Skills", "skill", <Baby size={22} />, [
    getItem(
      <Link to={"/create-skill"}>Create Skill</Link>,
      "create-skill",
      <BadgePlus size={20} />
    ),
    getItem(
      <Link to={"/all-skills"}>All Skills</Link>,
      "all-skills",
      <SquareKanban size={20} />
    ),
  ]),
];
