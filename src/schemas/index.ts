import * as z from "zod";
import { Role } from "@prisma/client";


const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  roles: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const PetitionSchema = z.object({
  email: z.string().email().min(1, {
    message: "L'email est requis et doit être valide",
  }),
  lastName: z.string().min(2, {
    message: "Le nom est requis et doit contenir au moins 2 caractères",
  }),
  firstName: z.string().min(2, {
    message: "Le prénom est requis et doit contenir au moins 2 caractères",
  }),
  terms: z.boolean({
    required_error: "Vous devez accepter les conditions d'utilisation",
  }),
});
