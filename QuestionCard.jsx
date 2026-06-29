export default function QuestionCard({
  question,
  answer,
  setAnswer,
}) {

  // Toggle brands for multiselect
  const toggleOption = (option) => {

    let selected = answer || [];

    if (selected.includes(option)) {
      setAnswer(selected.filter((item) => item !== option));
    } else {
      setAnswer([...selected, option]);
    }
  };

  return (

    <div className="p-6 shadow-xl bg-zinc-900 rounded-3xl">

      <h2 className="mb-8 text-2xl font-bold">
        {question.question}
      </h2>

      {/* ---------------- SELECT ---------------- */}

      {question.type === "select" && (

        <select
          value={answer || ""}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-4 text-lg text-black rounded-xl"
        >

          <option value="">
            Select
          </option>

          {question.options.map((option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          ))}

        </select>

      )}

      {/* ---------------- NUMBER ---------------- */}

      {question.type === "number" && (

        <input
          type="number"
          value={answer || ""}
          placeholder="Enter your weight"
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-4 text-lg text-black rounded-xl"
        />

      )}

      {/* ---------------- RADIO ---------------- */}

      {question.type === "radio" && (

        <div className="space-y-4">

          {question.options.map((option) => (

            <button
              key={option}
              onClick={() => setAnswer(option)}
              className={`

              w-full
              text-left
              p-4
              rounded-xl
              border
              transition

              ${
                answer === option
                  ? "bg-white text-black border-white"
                  : "border-zinc-700 hover:border-white"
              }

              `}
            >

              {option}

            </button>

          ))}

        </div>

      )}

      {/* ---------------- MULTI SELECT ---------------- */}

      {question.type === "multiselect" && (

        <div className="flex flex-wrap gap-3">

          {question.options.map((option) => {

            const active =
              (answer || []).includes(option);

            return (

              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`

                px-4
                py-2
                rounded-full
                border
                transition

                ${
                  active
                    ? "bg-white text-black border-white"
                    : "border-zinc-600"
                }

                `}
              >

                {option}

              </button>

            );

          })}

        </div>

      )}

    </div>

  );

}