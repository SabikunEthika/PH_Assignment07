"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
export function AuthForm({ signup = false }: { signup?: boolean }) {
  const r = useRouter(),
    [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget),
      email = String(f.get("email")),
      password = String(f.get("password")),
      name = String(f.get("name") || "");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setBusy(true);
    const result = signup
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    setBusy(false);
    if (result.error)
      return toast.error(result.error.message || "অনুরোধটি সম্পন্ন হয়নি");
    toast.success(
      signup ? "অ্যাকাউন্ট তৈরি হয়েছে" : "সফলভাবে সাইন ইন করা হয়েছে",
    );
    r.push("/");
    r.refresh();
  };
  return (
    <main className="grid min-h-screen place-items-center bg-[#e8f5e9] p-4">
      <section className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl shadow-emerald-950/10">
        <Link href="/" className="text-lg font-bold text-[#17643c]">
          🛒 বাজার দর
        </Link>
        <h1 className="mt-6 text-3xl font-bold">
          {signup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম!"}
        </h1>
        <p className="mb-6 text-slate-500">
          {signup
            ? "সঠিক বাজারদর পেতে আজই যুক্ত হোন।"
            : "আপনার অ্যাকাউন্টে সাইন ইন করুন।"}
        </p>
        <form onSubmit={submit} className="space-y-4">
          {signup && <Field label="নাম" name="name" placeholder="আপনার নাম" />}
          <Field
            label="ইমেইল"
            name="email"
            type="email"
            placeholder="name@email.com"
          />
          <Field
            label="পাসওয়ার্ড"
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />
          <button
            disabled={busy}
            className="w-full rounded-xl bg-[#17643c] py-3 font-bold text-white disabled:opacity-60"
          >
            {busy
              ? "অপেক্ষা করুন…"
              : signup
                ? "রেজিস্টার করুন"
                : "সাইন ইন করুন"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          {signup ? "ইতোমধ্যে অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link
            className="font-bold text-[#17643c]"
            href={signup ? "/signin" : "/signup"}
          >
            {signup ? "সাইন ইন করুন" : "রেজিস্টার করুন"}
          </Link>
        </p>
      </section>
    </main>
  );
}
function Field({
  label,
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        required
        {...props}
        className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#17643c]"
      />
    </label>
  );
}
