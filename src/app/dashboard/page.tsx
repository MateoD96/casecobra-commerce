import { db } from "@/db";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getSession();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  if (!isAdmin) {
    return <h1 className=" text-center py-2">Usuario no autorizado</h1>;
  }

  return (
    <div>
      <h1>Welcome Admin: {session.user.email}</h1>
    </div>
  );
}
