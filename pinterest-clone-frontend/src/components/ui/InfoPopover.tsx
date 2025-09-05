import { useState, useRef, useEffect } from "react";
import { MessageCircleWarning, InfoIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InfoPopover() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        ref={buttonRef}
        aria-label="About this app"
        onClick={() => setOpen((v) => !v)}
        initial={false}
        animate={
          open
            ? { scale: 1.04, borderColor: "#E60023" }
            : { scale: 1, borderColor: "#e5e5e5" }
        }
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-center justify-center w-10 cursor-pointer h-10 rounded-full bg-white/80 backdrop-blur-xl border border-[#e5e5e5] hover:bg-[#f8f8f8] hover:border-[#E60023] transition-all duration-200"
        style={{ outline: "none" }}
      >
        <InfoIcon className="text-[#E60023] w-5 h-5 transition-colors duration-150" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-14 left-0 w-80 min-w-[280px] bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-50 rounded-full">
                <InfoIcon className="text-[#E60023] size-5" />
              </div>
              <span className="font-bold text-lg text-gray-900">
                About this app
              </span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              This is a simple Pinterest clone with registration, illustration
              browsing, tag-based sorting, and collection features.
              <br />
              <br />
              The goal was not to replicate the original in every detail - just
              to demonstrate a similar idea and logic. This project does not aim
              to be a full copy of Pinterest, only a basic demo version. (I am
              too lazy for copying all the details)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
