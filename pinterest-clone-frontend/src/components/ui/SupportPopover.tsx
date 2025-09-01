import { useState, useRef, useEffect } from "react";
import { MessageCircleWarning, InfoIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SupportPopover() {
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
        aria-label="Contact Support"
        onClick={() => setOpen((v) => !v)}
        initial={false}
        animate={
          open
            ? { scale: 1.04, borderColor: "#2261ff" }
            : { scale: 1, borderColor: "#e5eaf2" }
        }
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-center justify-center w-10 cursor-pointer h-10 rounded-lg bg-white border border-[#e5eaf2] hover:bg-[#f3f6fa] hover:border-[#2261ff] transition-all duration-200"
        style={{ outline: "none" }}
      >
        <MessageCircleWarning className="text-[#2261ff] w-5 h-5 transition-colors duration-150" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-14 left-0 w-72 min-w-[220px] bg-white/80 backdrop-blur-md rounded-xl border border-[#e5eaf2] p-5 flex flex-col gap-3"
            style={{
              boxShadow: "0 4px 24px 0 rgba(34, 97, 255, 0.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <InfoIcon className="text-[#2261ff] size-4" />
              <span className="font-semibold text-base text-[#010d39]">
                Contact Support
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#7a8ca9] font-medium">
                  Phone
                </span>
                <a
                  href="tel:+37258068938"
                  className="text-[#2261ff] text-sm font-semibold hover:underline"
                >
                  +372 58068938
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#7a8ca9] font-medium">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/37258068938"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-[#2261ff] text-white text-sm font-medium hover:bg-[#1746b1] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="text-xs text-[#7a8ca9] mt-2">
              We respond quickly and help with any questions.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
