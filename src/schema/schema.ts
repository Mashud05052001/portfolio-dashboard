import { z } from "zod";
export const requiredMsg = "*required";

const imageSchema = z.union([
  z
    .string({ required_error: requiredMsg })
    .url({ message: "Must be a valid URL" }),
  z.array(z.instanceof(File), { required_error: requiredMsg }).min(1, {
    message: requiredMsg,
  }),
]);

export const loginValidationSchema = z.object({
  email: z
    .string({ required_error: requiredMsg })
    .email({ message: "*Provide valid email" }),
  password: z
    .string({ required_error: requiredMsg })
    .min(6, { message: "*Password must be at least 6 characters" }),
});

export const skillValidationSchema = z.object({
  order: z.number().optional(),
  name: z.string({
    required_error: requiredMsg,
  }),
  image: z
    .array(z.instanceof(File), { required_error: requiredMsg })
    .min(1, requiredMsg),
});
export const updateSkillValidationSchema = z.object({
  order: z.number().optional(),
  name: z.string({
    required_error: requiredMsg,
  }),
  image: imageSchema,
});

const baseProjectValidationSchema = {
  order: z.number().optional(),
  title: z.string({ required_error: requiredMsg }),
  overview: z.string({ required_error: requiredMsg }),
  description: z.string({ required_error: requiredMsg }),
  tech: z.string({ required_error: requiredMsg }),
  live: z.string({ required_error: requiredMsg }).url("Must provide URL"),
  githubClient: z
    .string({ required_error: requiredMsg })
    .url("Must provide URL"),
  githubServer: z.string().url("Must provide URL").optional(),
};
export const projectValidationSchema = z.object({
  ...baseProjectValidationSchema,
  image: z
    .array(z.instanceof(File), { required_error: requiredMsg })
    .min(1, requiredMsg),
});

export const updateProjectValidationSchema = z.object({
  ...baseProjectValidationSchema,
  image: imageSchema,
});

const baseBlogValidationSchema = {
  order: z.number().optional(),
  title: z.string({ required_error: requiredMsg }),
  overview: z.string({ required_error: requiredMsg }),
  category: z.string({ required_error: requiredMsg }),
  description: z.string({ required_error: requiredMsg }),
};

export const blogValidationSchema = z.object({
  ...baseBlogValidationSchema,
  image: z
    .array(z.instanceof(File), { required_error: requiredMsg })
    .min(1, requiredMsg),
});

export const updateBlogValidationSchema = z.object({
  ...baseBlogValidationSchema,
  image: imageSchema,
});

export const experienceValidationSchema = z.object({
  order: z.number().optional(),
  company: z.string({ required_error: requiredMsg }),
  designation: z.string({ required_error: requiredMsg }),
  description: z.string({}).optional(),
  location: z.string().optional(),
  technologies: z.string({ required_error: requiredMsg }).optional(),
  startDate: z.unknown().refine((value) => value, { message: requiredMsg }),
  endDate: z.unknown().nullable().optional(),
});

export const educationValidationSchema = z.object({
  order: z.number().optional(),
  course: z.string({ required_error: requiredMsg }),
  institution: z.string({ required_error: requiredMsg }),
  location: z.string().optional(),
  startDate: z.unknown().refine((value) => value, { message: requiredMsg }),
  endDate: z.unknown().nullable().optional(),
});
