import { currentRole } from "@/lib/auth";
import { checkAdminRole, checkSuperAdminRole } from "@/lib/roles";
import { NextResponse } from "next/server";

export async function GET() {
  const roles = await currentRole();

  const isAdmin = await checkAdminRole(roles) || await checkSuperAdminRole(roles);
  if (roles && isAdmin) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
