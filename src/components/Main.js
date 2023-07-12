import Slider from "react-slick";
import Book from "./atoms/Book";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Option from "./atoms/Option";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookSelectedState } from "../states/bookSelectedState";

export default function Main() {
  const settings = {
    // className: "center",
    centerMode: true,
    dots: true,
    centerPadding: "60px",
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
  };

  const bookSelected = useRecoilValue(bookSelectedState);

  return (
    <div className="overflow-hidden">
      <div>
        <span className="text-4xl">Tale adventure</span>
        <Slider {...settings} className="z-1">
          <Book title="어린왕자" color={"bg-blue-300"} />
          <Book title="어린왕자" color={"bg-red-300"} />
          <Book title="어린왕자" color={"bg-yellow-300"} />
          <Book title="어린왕자" color={"bg-green-300"} />
        </Slider>
      </div>
      {bookSelected !== "" && <Option />}
    </div>
  );
}
