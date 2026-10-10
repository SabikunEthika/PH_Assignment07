"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Cards, Footer, Header, useProducts } from "@/components/site";
import { useState } from "react";
export default function Category() {
  const { slug } = useParams<{ slug: string }>(),
    { items, loading } = useProducts();
  const [sort, setSort] = useState("default");
  const products = items.filter((x) => x.category === slug);
  const ordered = [...products].sort((a, b) =>
    sort === "low"
      ? a.today - b.today
      : sort === "high"
        ? b.today - a.today
        : 0,
  );
  const name = products[0]?.categoryNameBn;
  return (
    <>
      <Header />
      <main className="container min-h-[65vh] py-12">
        {!loading && !products.length ? (
          <div className="mx-auto max-w-lg py-20 text-center">
            <div className="text-6xl">🔎</div>
            <h1 className="mt-4 text-3xl font-bold">
              বিভাগটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="mt-2 text-slate-500">
              আপনার খোঁজা বিভাগে কোনো পণ্য নেই।
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-[#17643c] px-5 py-3 font-bold text-white"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-bold">{name || "পণ্য"} বাজারদর</h1>
                <p className="text-slate-500">আজকের হালনাগাদ মূল্য তালিকা</p>
              </div>
              <label className="text-sm font-semibold">
                সাজান:{" "}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low">দাম: কম থেকে বেশি</option>
                  <option value="high">দাম: বেশি থেকে কম</option>
                </select>
              </label>
            </div>
            <Cards items={ordered} loading={loading} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
