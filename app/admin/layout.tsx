import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Rediriger vers login si pas authentifié
  if (!session) {
    redirect("/auth/login");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}