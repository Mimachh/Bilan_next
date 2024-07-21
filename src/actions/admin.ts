"use server";

import { currentRole } from "@/lib/auth";
import { checkAdminRole, checkSuperAdminRole } from "@/lib/roles";

export const admin = async () => {
  const roles = await currentRole();

  const isAdmin = await checkAdminRole(roles) || await checkSuperAdminRole(roles);

  if (isAdmin) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
