import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#e8f5e9] p-5 text-center">
      <div>
        <div className="text-7xl">🧭</div>
        <h1 className="mt-5 text-5xl font-bold text-[#153f29]">৪০৪</h1>
        <p className="mt-2 text-xl text-slate-600">
          এই পেজটি খুঁজে পাওয়া যায়নি
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-[#17643c] px-6 py-3 font-bold text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
