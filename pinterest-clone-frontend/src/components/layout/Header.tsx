import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 text-sm py-2.5">
      <nav className=" mx-auto w-full px-4 sm:px-6 lg:px-8 flex basis-full items-center w-full mx-auto">
        <div className="me-5">
          <button
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80 cursor-pointer"
            onClick={() => router.push("/homefeed")}
            aria-label="Pinterest Clone"
          >
            <Image
              src="/Pinterest_Logo.svg"
              alt="Pinterest Logo"
              width={116}
              height={32}
              className="w-28 h-auto"
              priority
            />
          </button>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <svg
                className="shrink-0 size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              className="py-2 ps-10 pe-4 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-red-500 focus:ring-red-500 cursor-pointer"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="size-9.5 inline-flex justify-center items-center rounded-full cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <img
              className="shrink-0 size-9.5 rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
