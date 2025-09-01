"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function meta() {
  return [
    { title: "Page Not Found - Xollo" },
    { name: "description", content: "404 Page Not Found" },
  ];
}

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white/90 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm">
          <div className="border-b border-gray-100/80 bg-gray-50/30 px-6 py-5">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 p-1">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Page Not Found
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              The requested page could not be located
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6 flex flex-col items-center justify-center text-center">
              <Image
                src="/images/general/undraw_taken_mshk.svg"
                alt="Page not found"
                width={256}
                height={256}
                className="mb-4 w-64 max-w-full"
              />
              <p className="leading-relaxed text-gray-600">
                Sorry, the page you are looking for does not exist or is under
                development.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center rounded-lg cursor-pointer bg-blue-600 px-6 py-2.5 font-medium text-white transition-all duration-200 hover:bg-blue-700"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
