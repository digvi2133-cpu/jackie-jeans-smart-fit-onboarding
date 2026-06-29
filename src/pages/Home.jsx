import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-6 text-white bg-gradient-to-b from-black via-zinc-900 to-black">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center"
      >

        <h1 className="mb-4 text-3xl font-bold">
          Jackie Jeans Fit Finder
        </h1>

        <p className="mb-8 text-gray-400">
          Find your perfect denim fit using AI-powered onboarding.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/manual")}
          className="w-full py-3 mb-3 font-semibold text-black bg-white rounded-xl"
        >
          Start Manual Quiz
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/voice")}
          className="w-full py-3 text-white bg-zinc-800 rounded-xl"
        >
          Try Voice AI
        </motion.button>

      </motion.div>

    </div>
  );
}