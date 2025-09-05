import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              className="py-2 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-red-500 focus:ring-red-500 cursor-pointer"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="size-9.5 inline-flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="size-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed top-16 right-4 w-screen max-w-sm sm:max-w-lg md:max-w-4xl bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg z-[60]"
                >
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                      <a
                        href="/homefeed"
                        className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-sm text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
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
                          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            Home Feed
                          </p>
                          <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                            Discover new pins and ideas
                          </p>
                        </div>
                      </a>

                      <a
                        href="/profile"
                        className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-sm text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer"
                      >
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
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
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            Profile
                          </p>
                          <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                            View and edit your profile
                          </p>
                        </div>
                      </a>

                      <a
                        href="#"
                        className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-sm text-gray-400 opacity-50 pointer-events-none rounded-lg"
                      >
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
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
                          <path d="M12 12h.01" />
                          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                          <rect width="20" height="14" x="2" y="6" rx="2" />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-400 text-sm sm:text-base">
                            My Boards
                          </p>
                          <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                            Organize your saved pins
                          </p>
                        </div>
                      </a>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <a
                        href="#"
                        className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-sm text-gray-400 opacity-50 pointer-events-none rounded-lg"
                      >
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
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
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-400 text-sm sm:text-base">
                            Notifications
                          </p>
                          <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                            Stay updated with new activity
                          </p>
                        </div>
                      </a>

                      <a
                        href="#"
                        className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-sm text-gray-400 opacity-50 pointer-events-none rounded-lg"
                      >
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
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
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-400 text-sm sm:text-base">
                            Settings
                          </p>
                          <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                            Manage your account preferences
                          </p>
                        </div>
                      </a>

                      <a
                        href="#"
                        className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-sm text-gray-400 opacity-50 pointer-events-none rounded-lg"
                      >
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
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
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-400 text-sm sm:text-base">
                            Help Center
                          </p>
                          <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                            Get help and support
                          </p>
                        </div>
                      </a>
                    </div>

                    <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
                      <button className="p-2 sm:p-3 flex items-start gap-3 sm:gap-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer w-full text-left">
                        <svg
                          className="size-4 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm sm:text-base">
                            Sign out
                          </p>
                          <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                            Sign out of your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
