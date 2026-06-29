export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8">
     <h2 className="mb-2 text-sm font-medium text-gray-300">
  Question {current + 1} of {total}
</h2>
      <div className="w-full h-2 bg-gray-700 rounded-full">
        <div
          className="h-full transition-all duration-300 bg-white rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}