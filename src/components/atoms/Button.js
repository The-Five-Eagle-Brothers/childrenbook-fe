import { useNavigate } from "react-router-dom";

export default function Button({ name }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="h-16 w-56 rounded-md bg-white"
      onClick={(e) => {
        e.preventDefault();
        navigate("/story");
      }}
    >
      {name}
    </button>
  );
}
