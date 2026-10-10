"use client";
import { Footer, Header } from "@/components/site";
import { useAuth } from "@/components/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Profile() {
  const { user } = useAuth(),
    r = useRouter();
  useEffect(() => {
    if (!user) r.replace("/signin");
  }, [user, r]);
  return (
    <>
      <Header />
      <main className="container min-h-[60vh] py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-card">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-[#dff3e7] text-2xl">
            👤
          </div>
          <h1 className="mt-4 text-3xl font-bold">{user?.name}</h1>
          <p className="text-slate-500">{user?.email}</p>
          <Link
            href="/profile/update"
            className="mt-6 inline-block rounded-lg bg-[#17643c] px-5 py-3 font-bold text-white"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
