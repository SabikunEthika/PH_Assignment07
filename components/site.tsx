"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";
import { fallback, Product, bn, unit, API } from "@/lib/products";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const cats = [
  ["chal", "চাল"],
  ["dal", "ডাল"],
  ["tel", "তেল"],
  ["sobji", "সবজি"],
  ["mach", "মাছ"],
  ["mangsho", "মাংস"],
  ["dim", "ডিম"],
  ["mosla", "মসলা"],
];
export function Header() {
  const path = usePathname(),
    { user, logout } = useAuth(),
    r = useRouter();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date()),
    );
  }, []);
  const out = () => {
    logout();
    toast.success("সফলভাবে সাইন আউট করা হয়েছে");
    r.push("/");
  };
  return (
    <>
      <header className="border-b border-emerald-950/8 bg-white">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2 text-xl font-bold text-[#175c38]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#17643c]">
                <Image
                  src="/logo-icon.png"
                  alt=""
                  width={18}
                  height={18}
                  className="brightness-0 invert"
                />
              </span>
              <span>বাজার দর</span>
            </div>
            <div className="text-xs text-slate-500">
              {date ? `আজ, ${date}` : "আজ"}
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {cats.map(([s, n]) => (
              <Link
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${path === "/category/" + s ? "bg-[#dff3e7] text-[#17643c]" : "text-slate-600 hover:bg-slate-50"}`}
                href={"/category/" + s}
                key={s}
              >
                {n}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm font-semibold">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-lg px-3 py-2 text-[#17643c]"
                >
                  প্রোফাইল
                </Link>
                <button
                  onClick={out}
                  className="rounded-lg border border-[#17643c] px-3 py-2 text-[#17643c]"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="px-3 py-2 text-[#17643c]">
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-[#17643c] px-3 py-2 text-white"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="overflow-hidden border-t border-slate-100 bg-[#f0f8f2]">
          <div className="ticker-track flex gap-8 py-2 text-sm text-slate-700">
            {[...fallback, ...fallback].map((p, i) => (
              <span key={i} className="whitespace-nowrap">
                {p.image} {p.nameBn} <b>{bn(p.today)} টাকা</b>/
                <small>{unit(p.unit).replace("প্রতি ", "")}</small>{" "}
                <em
                  className={
                    p.change.dir === "up" ? "text-emerald-600" : "text-rose-500"
                  }
                >
                  {p.change.dir === "up" ? "▲" : "▼"}{" "}
                  {bn(Math.abs(p.change.pct))}%
                </em>
              </span>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="mt-16 bg-[#123d2b] py-10 text-white">
      <div className="container flex flex-col justify-between gap-5 text-sm md:flex-row">
        <p className="text-lg font-semibold">
          বাজার দর{" "}
          <span className="font-normal text-emerald-100">
            — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </p>
        <p className="max-w-md text-emerald-100">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
export function useProducts() {
  const [items, setItems] = useState<Product[]>([]),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(API + "/products")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((x) => setItems(Array.isArray(x) ? x : x.data || fallback))
      .catch(() => setItems(fallback))
      .finally(() => setLoading(false));
  }, []);
  return { items, loading };
}
export function ProductCard({ p }: { p: Product }) {
  const d = p.change.dir;
  return (
    <Link
      href={"/product/" + p.slug}
      className="shadow-card group rounded-2xl border border-[#e5ece6] bg-white p-5 transition hover:-translate-y-1 hover:border-[#91c8a5]"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="grid h-13 w-13 place-items-center rounded-2xl bg-[#f0f8f2] text-3xl">
          {p.image}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${d === "up" ? "bg-emerald-50 text-emerald-600" : d === "down" ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500"}`}
        >
          {d === "up" ? "▲" : d === "down" ? "▼" : "—"}{" "}
          {bn(Math.abs(p.change.pct))}%
        </span>
      </div>
      <h3 className="text-lg font-bold">{p.nameBn}</h3>
      <p className="mb-4 text-sm text-slate-500">{unit(p.unit)}</p>
      <div className="flex items-end justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-500">আজকের দাম</span>
        <b className="text-xl text-[#17643c]">
          {bn(p.today)} <small className="text-sm">টাকা</small>
        </b>
      </div>
    </Link>
  );
}
export function Cards({
  items,
  loading,
}: {
  items: Product[];
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-56 rounded-2xl" />
        ))}
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
