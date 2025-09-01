"use client";
import "../globals.css";
import Header from "@/components/layout/Header";
import InfoPopover from "@/components/ui/InfoPopover";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = false;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        {children}
        <InfoPopover />
      </main>
    </div>
  );
}
