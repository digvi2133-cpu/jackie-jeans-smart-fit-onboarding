import { useEffect, useRef, useState } from "react";
import questions from "../data/questions";
import VoiceButton from "../components/VoiceButton";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);

  const recognitionRef = useRef(null);

  const currentQuestion = questions[current];

  // =========================
  // AI PERSONALITY
  // =========================
  const ai = {
    ack: ["Got it", "Perfect", "Nice", "Understood", "Great"],
  };

  // =========================
  // SPEAK
  // =========================
  function speak(text) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }

  // =========================
  // SMART PARSER
  // =========================
  function parseAnswer(text, question) {
    const input = text.toLowerCase().trim();

    if (input.includes("skip") && question.optional) return null;

    // height
    if (question.id === "height") {
      const match = input.match(/(\d)\s*(foot|ft)?\s*(\d{1,2})?/);
      if (match) {
        const feet = match[1];
        const inches = match[3] || "0";
        return `${feet}'${inches}"`;
      }
    }

    // number
    if (question.type === "number") {
      const num = input.match(/\d+/);
      return num ? Number(num[0]) : null;
    }

    // multiselect
    if (question.type === "multiselect") {
      return question.options.filter((opt) =>
        input.includes(opt.toLowerCase())
      );
    }

    return text;
  }

  // =========================
  // HANDLE ANSWER
  // =========================
  function handleAnswer(value) {
    const cleaned = parseAnswer(value, currentQuestion);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: cleaned,
    }));

    const randomAck =
      ai.ack[Math.floor(Math.random() * ai.ack.length)];

    speak(`${randomAck}. ${value}.`);

    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      nextQuestion();
    }, 1200);
  }

  // =========================
  // NEXT QUESTION
  // =========================
  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      speak("Perfect. I’ve built your fit profile. Redirecting you now.");

      setTimeout(() => {
        window.location.href =
          "https://jackie-jeans.vercel.app/";
      }, 2500);
    }
  }

  // =========================
  // START LISTENING
  // =========================
  function startListening() {
    if (!SpeechRecognition) {
      alert("Speech not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setListening(false);
      handleAnswer(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  // =========================
  // AUTO SPEAK QUESTIONS
  // =========================
  useEffect(() => {
    if (!currentQuestion) return;

    let text = "";

    switch (currentQuestion.type) {
      case "select":
        text = `${currentQuestion.question}. Choose one option.`;
        break;
      case "multiselect":
        text = `${currentQuestion.question}. You can choose multiple options.`;
        break;
      case "number":
        text = `${currentQuestion.question}. Please say a number.`;
        break;
      default:
        text = currentQuestion.question;
    }

    setTimeout(() => {
      speak(text);

      // auto start voice after short delay
      setTimeout(() => {
        startListening();
      }, 1800);
    }, 500);
  }, [current]);

  // =========================
  // UI
  // =========================
  return (
    <div className="flex items-center justify-center min-h-screen px-6 text-white bg-gradient-to-b from-black via-zinc-900 to-black">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-wide">
            Jackie Jeans AI Fit Assistant
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Voice-powered onboarding
          </p>
        </div>

        {/* CARD */}
        <div className="p-6 border shadow-xl bg-zinc-900/60 backdrop-blur-md border-zinc-800 rounded-2xl">

          {/* STATUS */}
          <p className="mb-3 text-xs text-gray-400">
            {listening
              ? "🎤 Listening..."
              : thinking
              ? "🧠 Processing..."
              : "Ready"}
          </p>

          {/* QUESTION */}
          <h2 className="mb-6 text-lg font-medium">
            {currentQuestion.question}
          </h2>

          {/* MIC BUTTON */}
          <button
            onClick={startListening}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              listening
                ? "bg-green-500 text-black"
                : "bg-white text-black"
            }`}
          >
            {listening ? "Listening..." : "Tap & Speak"}
          </button>

          {/* ANSWER PREVIEW */}
          {answers[currentQuestion.id] && (
            <p className="mt-4 text-xs text-gray-400">
              You said:{" "}
              {Array.isArray(answers[currentQuestion.id])
                ? answers[currentQuestion.id].join(", ")
                : String(answers[currentQuestion.id])}
            </p>
          )}
        </div>

        {/* FOOTER HINT */}
        <p className="mt-6 text-xs text-center text-gray-500">
          Speak naturally — e.g. “five foot six”, “Levi’s and Zara”
        </p>
      </div>
    </div>
  );
}