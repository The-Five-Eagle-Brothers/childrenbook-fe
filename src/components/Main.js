import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-around flex-col h-screen w-screen bg-[url('/src/assets/images/bg_nologo.png')] bg-cover py-9 font-NanumSquareRound">
      <div className="w-[320px] h-[150px] text-white text-[60px] bg-[url('/src/assets/images/logo.png')] bg-cover"></div>
      <div className="h-[680px] w-5/6 flex justify-between">
        <div
          className="w-[370px] h-[525px] bg-[url('/src/assets/images/littlePrince.png')] bg-cover cursor-[url('/src/assets/images/cursor.png'),_pointer]"
          onClick={() => {
            axios
              .get(`${process.env.REACT_APP_URL}member/retrieve/status`, {
                params: {
                  // 수정 필요
                  taleBookName: "어린왕자",
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.statusCode === "OK" && res.data.data !== null) {
                  navigate(`/${res.data.data}`);
                } else if (
                  res.data.statusCode === "OK" &&
                  res.data.data == null
                ) {
                  navigate("/princeIntro");
                }
              });
          }}
        ></div>
        <div
          className="w-[370px] h-[525px] bg-[url('/src/assets/images/rabbit.png')] bg-cover cursor-[url('/src/assets/images/cursor.png'),_pointer]"
          onClick={() => {
            axios
              .get(`${process.env.REACT_APP_URL}member/retrieve/status`, {
                params: {
                  taleBookName: "토끼와 거북이",
                },
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                console.log(res);
                if (res.data.statusCode === "OK" && res.data.data !== null) {
                  console.log(res.data);
                  navigate(`/${res.data.data}`);
                } else if (
                  res.data.statusCode === "OK" &&
                  res.data.data == null
                ) {
                  navigate("/rabbitAndTurtleIntro");
                }
              });
          }}
        ></div>
      </div>
      <div className="text-white text-[40px] font-semibold">
        책을 선택해주세요
      </div>
    </div>
  );
}
