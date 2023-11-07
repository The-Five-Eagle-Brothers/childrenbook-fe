function OnBoardingButton({ text, height, width }) {
  return (
    <div
      className="bg-gray-200 rounded-xl flex justify-center items-center"
      style={{ height: height, width: width }}
    >
      <div className="text-zinc-500 text-2xl font-bold font-NanumSquareRound">
        {text}
      </div>
    </div>
  );
}
