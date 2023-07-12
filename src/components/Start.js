import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <span className="text-4xl">Tale adventure</span>
      <div
        className="w-40 h-10 bg-gray-600 flex justify-center items-center text-white rounded-3xl mt-10 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        START
      </div>
    </div>
  );
}
