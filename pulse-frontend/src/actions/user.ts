"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

async function getUser() {
  const session = await getServerSession(authOptions);
  if (session) {
    return session;
  }
  return null;
}
export { getUser };
