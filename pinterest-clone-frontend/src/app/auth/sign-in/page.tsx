import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Sign In - Pinterest",
  description: "Welcome back to Pinterest! Discover new ideas and inspiration.",
};

export default function Page() {
  return (
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center relative">
      {/* <Image
        src="/illustration.jpg"
        alt="Background cats"
        fill
        style={{ objectFit: "cover", objectPosition: "top", zIndex: 0 }}
        className="pointer-events-none select-none"
        priority
      /> */}
      <div className="absolute inset-0 bg-white/10 z-10"></div>
      <div className="w-full max-w-md p-6 relative z-20">
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-8 relative overflow-hidden">
          <div className="relative z-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
