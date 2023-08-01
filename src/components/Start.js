import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[url('/src/assets/images/bg.png')] bg-cover">
      <span className="text-[200px] font-niconne leading-[255px] text-center text-white">
        Tale
      </span>
      <span className="text-[200px] mt-[-40px] font-niconne leading-[255px] text-center text-white">
        Adventure
      </span>
      <div
        className="w-[250px] h-[56px] text-2xl font-semibold flex justify-center items-center text-white rounded-md mt-10 cursor-pointer bg-[url('/src/assets/images/startBtn.png')] bg-cover"
        onClick={() => {
          navigate("/main");
        }}
      >
        START
      </div>
    </div>
  );
}
