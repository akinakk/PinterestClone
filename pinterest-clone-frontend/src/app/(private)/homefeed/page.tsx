import React from "react";
import PinterestGrid from "@/components/layout/PinterestGrid";

export const metadata = {
  title: "Homefeed - Pinterest",
  description: "Your homefeed overview",
};

export default function page() {
  return (
    <div>
      <PinterestGrid />
    </div>
  );
}
