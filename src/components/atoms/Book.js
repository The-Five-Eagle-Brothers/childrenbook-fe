import { useSetRecoilState } from "recoil";
import book from "../../assets/images/book.png";
import { bookSelectedState } from "../../states/bookSelectedState";

export default function Book({ title, color }) {
  const setBookSelected = useSetRecoilState(bookSelectedState);
  return (
    <div
      className={`w-[420px] text-white flex-col flex justify-center items-center ${color}`}
      onClick={() => {
        setBookSelected("littlePrince");
      }}
    >
      <img src={book} alt="book" />
      <span>{title}</span>
    </div>
  );
}
