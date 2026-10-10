"use client";
import { Footer, Header } from "@/components/site";
import { useAuth } from "@/components/auth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
export default function Update() {
  const { user, loading } = useAuth(),
    r = useRouter();
  useEffect(() => {
    if (!loading && !user) r.replace("/signin");
  }, [user, loading, r]);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name"));
    const result = await authClient.updateUser({ name });
    if (result.error)
      return toast.error(result.error.message || "তথ্য আপডেট হয়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    r.push("/profile");
    r.refresh();
  };
  return (
    <>
      <Header />
      <main className="container min-h-[60vh] py-16">
        <form
          onSubmit={submit}
          className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-card"
        >
          <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
          <label className="mt-5 block font-semibold">
            নাম
            <input
              required
              name="name"
              defaultValue={user?.name}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </label>
          <button className="mt-5 rounded-xl bg-[#17643c] px-5 py-3 font-bold text-white">
            তথ্য আপডেট করুন
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
