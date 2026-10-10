import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/auth";
export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজার মূল্য",
  description: "প্রয়োজনীয় পণ্যের আজকের বাজার দর",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{ style: { fontFamily: "inherit" } }}
        />
      </body>
    </html>
  );
}
