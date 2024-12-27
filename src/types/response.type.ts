export type TTokenUser = {
  email: string;
  role: "Admin";
  iat: number;
  exp: number;
};
export type TEducation = {
  _id: string;
  order: number;
  course: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TBlog = {
  _id: string;
  order: number;
  title: string;
  category: string;
  overview: string;
  description: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TExperience = {
  _id: string;
  order: number;
  company: string;
  designation: string;
  description?: string;
  location?: string;
  technologies?: string[];
  startDate: string;
  endDate?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProject = {
  _id: string;
  order: number;
  title: string;
  overview: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  githubClient: string;
  githubServer?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TSkillData = {
  _id: string;
  order: number;
  image: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
