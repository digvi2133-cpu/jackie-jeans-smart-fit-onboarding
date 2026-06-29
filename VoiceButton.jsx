import { useState } from "react";
import { motion } from "framer-motion";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceButton({ onResult }) {
  const [listening, setListening] = useState(false);

  function startListening() {
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      onResult(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  return (
    <div className="flex flex-col items-center gap-3">

      {/* MIC BUTTON */}
      <motion.button
        onClick={startListening}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: listening ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
          listening
            ? "bg-green-500"
            : "bg-white"
        }`}
      >
        🎤
      </motion.button>

      {/* STATUS TEXT */}
      <p className="text-xs text-gray-400">
        {listening ? "Listening..." : "Tap to speak"}
      </p>

    </div>
  );
}