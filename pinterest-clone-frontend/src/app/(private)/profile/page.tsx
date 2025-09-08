import React from "react";
import Profile from "@/components/layout/Profile";
import { div } from "framer-motion/client";

export const metadata = {
  title: "Profile - Pinterest",
  description: "Your profile overview",
};

export default function page() {
  return (
    <div className="p-4">
      <Profile />
    </div>
  );
}
