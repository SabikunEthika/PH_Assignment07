export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: { market: string; division: string; min: number; max: number }[];
};
export const API = "https://openapi.programming-hero.com/api/bazardor";
const markets = (n: number) => [
  { market: "কারওয়ান বাজার", division: "ঢাকা", min: n - 3, max: n + 12 },
  { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: n - 5, max: n + 8 },
  { market: "চৌদগ্রাম বাজার", division: "চট্টগ্রাম", min: n - 7, max: n + 10 },
  { market: "সদর বাজার", division: "রাজশাহী", min: n - 10, max: n },
  { market: "বাজারহাট", division: "খুলনা", min: n - 8, max: n + 5 },
  { market: "আমবাজার", division: "সিলেট", min: n - 4, max: n + 14 },
];
const p = (
  id: number,
  slug: string,
  nameBn: string,
  category: string,
  categoryNameBn: string,
  icon: string,
  today: number,
  dir: "up" | "down" | "flat",
  pct: number,
): Product => ({
  id,
  slug,
  nameBn,
  category,
  categoryNameBn,
  categoryIcon: icon,
  unit: "kg",
  image: icon,
  today,
  yesterday: dir === "up" ? today - 3 : today + 3,
  change: { dir, pct },
  markets: markets(today),
});
export const fallback: Product[] = [
  p(
    1,
    "sorno-machi-chal",
    "স্বর্ণমাছি চাল",
    "chal",
    "চাল",
    "🍚",
    148,
    "up",
    2.1,
  ),
  p(2, "miniket-chal", "মিনিকেট চাল", "chal", "চাল", "🍚", 99, "down", -2.9),
  p(3, "nazir-chal", "নাজির চাল", "chal", "চাল", "🍚", 74, "flat", 0),
  p(5, "mosur-dal", "মসুর ডাল", "dal", "ডাল", "🫘", 145, "up", 1.8),
  p(8, "soybean-oil", "সয়াবিন তেল", "tel", "তেল", "🫙", 195, "down", -1.2),
  p(14, "alu", "আলু", "sobji", "সবজি", "🥔", 42, "down", -4.5),
  p(15, "peyaj", "পেঁয়াজ", "sobji", "সবজি", "🧅", 75, "up", 3.2),
  p(18, "ilish", "ইলিশ মাছ", "mach", "মাছ", "🐟", 1850, "up", 5.1),
  p(
    23,
    "broiler-murgi",
    "ব্রয়লার মুরগি",
    "mangsho",
    "মাংস",
    "🍗",
    210,
    "flat",
    0,
  ),
  p(26, "dim", "ফার্মের ডিম", "dim", "ডিম", "🥚", 145, "down", 2.5),
  p(31, "roshun", "রসুন", "mosla", "মসলা", "🧄", 125, "down", -7.4),
];
export const bn = (n: number) =>
  new Intl.NumberFormat("bn-BD").format(Math.round(n));
export const unit = (u: string) =>
  ({
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  })[u] || "প্রতি কেজি";
