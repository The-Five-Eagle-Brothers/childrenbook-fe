import { useNavigate } from "react-router-dom";
import video from "../assets/videos/take01.mp4";
import video2 from "../assets/videos/take02.mp4";
import video3 from "../assets/videos/take03.mp4";
import { useEffect, useRef, useState } from "react";

function VideoIntro() {
  const videoRef = useRef(null);
  const [next, setNext] = useState(0);
  const navigate = useNavigate();

  const sentences = [
    "옛날옛날 어느 숲속 마을에 거북이가 살았어요",
    "거북이는 남들보다 걸음이 무척 느렸지만,",
    "꾸준함과 성실함은 누구에게도 뒤쳐지지 않았답니다",
  ];

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        {next === 0 && (
          <video width={"100%"} autoPlay="autoPlay">
            <source src={video} type="video/mp4" />
          </video>
        )}
        {next === 1 && (
          <video width={"100%"} autoPlay="autoPlay">
            <source src={video2} type="video/mp4" />
          </video>
        )}
        {next === 2 && (
          <video width={"100%"} autoPlay="autoPlay">
            <source src={video3} type="video/mp4" />
          </video>
        )}
        <div
          className="text-3xl font-bold"
          style={{
            height: "60px",
            width: "100vw",
            overflow: "hidden",
            position: "absolute",
            bottom: 40,
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setNext(next + 1);
            if (next === 2) {
              navigate("/rabbitAndTurtle");
            }
          }}
        >
          {sentences[next]}
        </div>
      </div>
    </div>
  );
}
export default VideoIntro;
