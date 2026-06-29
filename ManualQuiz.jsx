import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions";
import ProgressBar from "../components/ProgressBar";

export default function ManualQuiz() {
  const [step, setStep] = useState("quiz"); // quiz | brand | finish
  const [current, setCurrent] = useState(0);

  const [answers, setAnswers] = useState({});
  const [brandSizes, setBrandSizes] = useState({});

  const currentQuestion = questions[current];
  const selectedBrands = answers.brands || [];

  // ======================
  // ANSWER HANDLER
  // ======================
  function handleAnswer(value) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    if (currentQuestion.id === "brands") {
      setBrandSizes({});
    }
  }

  // ======================
  // NEXT QUESTION
  // ======================
  function nextQuestion() {
    const answer = answers[currentQuestion.id];

    if (currentQuestion.optional !== true && !answer) {
      alert("Please answer this question");
      return;
    }

    if (currentQuestion.id === "brands") {
      setStep("brand");
      return;
    }

    if (current >= questions.length - 1) {
      setStep("finish");
      return;
    }

    setCurrent((prev) => prev + 1);
  }

  // ======================
  // PREV QUESTION
  // ======================
  function prevQuestion() {
    if (step === "brand") {
      setStep("quiz");
      return;
    }

    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  }

  // ======================
  // FINISH SCREEN
  // ======================
  if (step === "finish") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-white bg-gradient-to-b from-black via-zinc-900 to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-4 text-3xl font-bold">
            Your Perfect Fit is Ready 🎉
          </h1>

          <p className="mb-8 text-gray-400">
            We’ve built your personalized denim profile.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              (window.location.href =
                "https://jackie-jeans.vercel.app/")
            }
            className="px-6 py-3 font-semibold text-black bg-white rounded-xl"
          >
            Continue to Store
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ======================
  // BRAND STEP
  // ======================
  if (step === "brand") {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 text-white bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h2 className="mb-6 text-xl font-semibold">
            Enter sizes for each brand
          </h2>

          {selectedBrands.length === 0 ? (
            <p className="text-gray-400">No brands selected.</p>
          ) : (
            selectedBrands.map((brand) => (
              <div key={brand} className="mb-4">
                <label className="text-sm text-gray-300">
                  {brand}
                </label>

                <input
                  className="w-full p-3 mt-2 text-white outline-none bg-zinc-800 rounded-xl focus:ring-2 focus:ring-white"
                  value={brandSizes[brand] || ""}
                  onChange={(e) =>
                    setBrandSizes({
                      ...brandSizes,
                      [brand]: e.target.value,
                    })
                  }
                  placeholder="e.g. 32"
                />
              </div>
            ))
          )}

          <button
            onClick={() => {
              setAnswers((prev) => ({
                ...prev,
                brandSizes,
              }));
              setStep("finish");
            }}
            className="w-full py-3 mt-6 font-semibold text-black bg-white rounded-xl"
          >
            Continue
          </button>
        </motion.div>
      </div>
    );
  }

  // ======================
  // MAIN QUIZ FLOW
  // ======================
  return (
    <div className="flex items-center justify-center min-h-screen px-6 text-white bg-gradient-to-b from-black via-zinc-900 to-black">

      <div className="w-full max-w-lg">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl font-bold">
            Jackie Jeans Fit Quiz
          </h1>
          <p className="text-sm text-gray-400">
            Smart onboarding experience
          </p>
        </motion.div>

        {/* PROGRESS */}
        <ProgressBar
          current={current}
          total={questions.length}
        />

        {/* QUESTION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              setAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>

        {/* BUTTONS */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevQuestion}
            className="px-6 py-3 transition bg-zinc-800 rounded-xl hover:bg-zinc-700"
          >
            Back
          </button>

          <button
            onClick={nextQuestion}
            className="px-6 py-3 font-semibold text-black transition bg-white rounded-xl hover:scale-105"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}