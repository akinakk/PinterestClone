import { useRef } from "react";
import { motion } from "framer-motion";
import { useCreateMockPins } from "../hooks/usePins";
import { ImageIcon } from "lucide-react";

export default function CreateMockPinsButton() {
  const createMockPinsMutation = useCreateMockPins();

  const handleCreateMockPins = () => {
    createMockPinsMutation.mutate();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        aria-label="Create mock pins"
        onClick={handleCreateMockPins}
        disabled={createMockPinsMutation.isPending}
        initial={false}
        animate={
          createMockPinsMutation.isPending
            ? { scale: 1.04, borderColor: "#E60023" }
            : { scale: 1, borderColor: "#e5e5e5" }
        }
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-center cursor-pointer gap-2 px-4 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-[#e5e5e5] hover:bg-[#f8f8f8] hover:border-[#E60023] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ outline: "none" }}
      >
        {createMockPinsMutation.isPending ? (
          <div className="w-5 h-5 border-2 border-[#E60023] border-t-transparent rounded-full animate-spin" />
        ) : (
          <ImageIcon className="text-[#E60023] w-5 h-5 transition-colors duration-150" />
        )}
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {createMockPinsMutation.isPending
            ? "Generating..."
            : "Click here to generate random images"}
        </span>
      </motion.button>
    </div>
  );
}
