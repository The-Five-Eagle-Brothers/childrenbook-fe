import Slider from "react-slick";
import Book from "./atoms/Book";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Option from "./atoms/Option";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookSelectedState } from "../states/bookSelectedState";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-around flex-col h-screen bg-[url('/src/assets/images/bg.png')] bg-cover py-9">
      <div className="font-niconne text-white text-[60px]">Tale Adventure</div>
      <div className="h-[680px] w-5/6 flex justify-between">
        <div
          className="w-[370px] h-[525px] bg-[url('/src/assets/images/littlePrince.png')] bg-cover cursor-[url('/src/assets/images/cursor.png'),_pointer]"
          onClick={() => {
            navigate("https://love-and-gravity.web.app/intro");
          }}
        ></div>
        <div
          className="w-[370px] h-[525px] bg-[url('/src/assets/images/rabbit.png')] bg-cover cursor-[url('/src/assets/images/cursor.png'),_pointer]"
          onClick={() => {
            navigate("/rabbitAndTurtleIntro");
          }}
        ></div>
      </div>
      <div className="text-white text-[30px]">책을 선택해주세요</div>
    </div>
  );
}
