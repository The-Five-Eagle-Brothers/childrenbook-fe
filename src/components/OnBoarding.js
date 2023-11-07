import { useState } from "react";
import useOnBoarding from "../hooks/useOnBoarding";
import NextButton from "./atoms/NextButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OnBoarding() {
  const navigate = useNavigate();
  const {
    onBoarding,
    handleAge,
    handleGenre,
    handleLanguage,
    handleNickname,
    onBoardingStep,
    nextStep,
  } = useOnBoarding();

  const submitOnBoarding = () => {
    axios
      .patch(
        `${process.env.REACT_APP_URL}member/set/nickname`,
        {
          nickname: onBoarding.nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === "OK") {
          axios
            .patch(
              `${process.env.REACT_APP_URL}member/set/age`,
              {
                age: onBoarding.age,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              if (res.data.statusCode === "OK") {
                navigate("/main");
              }
            });
        }
      });
  };

  return (
    <div className="flex items-center justify-around flex-col h-screen w-screen bg-[url('/src/assets/images/bg_nologo.png')] bg-cover py-9 font-NanumSquareRound">
      <div className="w-[900px] h-[98%] bg-white rounded-3xl shadow flex justify-center py-[50px]">
        {onBoardingStep === 0 && (
          <div className="flex flex-col justify-between items-center ">
            <div className="h-[196px] w-[275px] bg-[url('/src/assets/images/onBoarding1.png')] bg-cover"></div>
            <div className="w-[440px] text-center text-zinc-900 text-[28px] font-bold font-['NanumSquareRound'] leading-[41.60px]">
              환영합니다 :)
              <br />
              아이의 나이대를 골라주세요.
            </div>
            <div className="w-[680px] h-40 justify-start items-start gap-4 flex flex-wrap">
              <div
                className={`w-[332px] h-20 text-zinc-500  px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                  onBoarding.age === 2 &&
                  "bg-purple-100 border-violet-500 text-violet-500"
                }`}
                onClick={() => {
                  handleAge(2);
                }}
              >
                <div className="text-2xl font-bold font-['NanumSquareRound']">
                  2세 이하
                </div>
              </div>
              <div
                className={`w-[332px] h-20 text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                  onBoarding.age === 5 &&
                  "bg-purple-100 border-violet-500 text-violet-500"
                }`}
                onClick={() => {
                  handleAge(5);
                }}
              >
                <div className="text-2xl font-bold font-['NanumSquareRound']">
                  3~5세
                </div>
              </div>
              <div
                className={`w-[332px] h-20 text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                  onBoarding.age === 8 &&
                  "bg-purple-100 border-violet-500 text-violet-500"
                }`}
                onClick={() => {
                  handleAge(8);
                }}
              >
                <div className="text-2xl font-bold font-['NanumSquareRound']">
                  6~8세
                </div>
              </div>
              <div
                className={`w-[332px] h-20 text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                  onBoarding.age === 9 &&
                  "bg-purple-100 border-violet-500 text-violet-500"
                }`}
                onClick={() => {
                  handleAge(9);
                }}
              >
                <div className="text-2xl font-bold font-['NanumSquareRound']">
                  9세 이상
                </div>
              </div>
            </div>
            <button
              className="w-[354px] h-[60px] text-zinc-500 cursor-pointer bg-zinc-200 rounded-[63px] justify-center items-center inline-flex hover:bg-violet-400 hover:text-white"
              onClick={() => {
                if (onBoarding.age > 0) {
                  nextStep();
                } else {
                  alert("나이대를 선택해주세요");
                }
              }}
            >
              <div className="text-[26px] font-bold font-['NanumSquareRound']">
                다음
              </div>
            </button>
          </div>
        )}
        {onBoardingStep === 1 && (
          <div className="flex flex-col justify-between items-center">
            <div className="h-[226px] w-[412px] bg-[url('/src/assets/images/onBoarding2.png')] bg-cover"></div>
            <div className="flex flex-col items-center">
              <div className="w-[440px] text-center text-zinc-900 text-[28px] font-bold font-['NanumSquareRound'] leading-[45px]">
                좋아하는 장르를 골라주세요.
              </div>
              <div className="h-[3px]"></div>
              <div className="w-80 text-center text-zinc-400 text-[22px] font-bold font-['NanumSquareRound']">
                중복선택 가능
              </div>
            </div>

            <div className="w-[624px] h-[188px] justify-start items-start gap-6 inline-flex">
              <div
                className={`w-[300px] h-[188px] text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                  onBoarding.genre === "local" &&
                  "bg-purple-100 border-violet-500 text-violet-500"
                }`}
                onClick={() => {
                  handleGenre("local");
                }}
              >
                <div className="text-2xl font-bold font-['NanumSquareRound']">
                  국내 동화
                </div>
              </div>
              <div
                className={`w-[300px] h-[188px] text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                  onBoarding.genre === "foreign" &&
                  "bg-purple-100 border-violet-500 text-violet-500"
                }`}
                onClick={() => {
                  handleGenre("foreign");
                }}
              >
                <div className="text-2xl font-bold font-['NanumSquareRound']">
                  서양 동화
                </div>
              </div>
            </div>
            <button
              className="w-[354px] h-[60px] text-zinc-500 cursor-pointer bg-zinc-200 rounded-[63px] justify-center items-center inline-flex hover:bg-violet-400 hover:text-white"
              onClick={() => {
                if (onBoarding.genre !== "") {
                  nextStep();
                } else {
                  alert("좋아하는 장르를 선택해주세요");
                }
              }}
            >
              <div className="text-[26px] font-bold font-['NanumSquareRound']">
                다음
              </div>
            </button>
          </div>
        )}
        {onBoardingStep === 2 && (
          <div className="flex flex-col justify-between items-center">
            <div className="w-[216px] h-[236px] bg-[url('/src/assets/images/onBoarding3.png')] bg-cover"></div>
            <div className="w-[460px] text-center text-zinc-900 text-[28px] font-bold font-['NanumSquareRound'] leading-[45px]">
              희망하는 언어를 선택해주세요.
            </div>
            <div className="w-[648px] h-[188px] justify-start items-start gap-6 inline-flex">
              <div className="justify-start items-start gap-6 flex">
                <div
                  className={`w-[200px] h-[188px] text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                    onBoarding.language === "Korean" &&
                    "bg-purple-100 border-violet-500 text-violet-500"
                  }`}
                  onClick={() => {
                    handleLanguage("Korean");
                  }}
                >
                  <div className="text-2xl font-bold font-['NanumSquareRound']">
                    한국어
                  </div>
                </div>
                <div
                  className={`w-[200px] h-[188px] text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                    onBoarding.language === "English" &&
                    "bg-purple-100 border-violet-500 text-violet-500"
                  }`}
                  onClick={() => {
                    handleLanguage("English");
                  }}
                >
                  <div className="text-2xl font-bold font-['NanumSquareRound']">
                    영어
                  </div>
                </div>
                <div
                  className={`w-[200px] h-[188px] text-zinc-500 px-[49px] py-2.5 bg-gray-200 rounded-xl justify-center items-center gap-2 flex border-2 hover:border-violet-500 ${
                    onBoarding.language === "Japanese" &&
                    "bg-purple-100 border-violet-500 text-violet-500"
                  }`}
                  onClick={() => {
                    handleLanguage("Japanese");
                  }}
                >
                  <div className="text-2xl font-bold font-['NanumSquareRound']">
                    일본어
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-[354px] h-[60px] text-zinc-500 cursor-pointer bg-zinc-200 rounded-[63px] justify-center items-center inline-flex hover:bg-violet-400 hover:text-white"
              onClick={() => {
                if (onBoarding.language !== "") {
                  nextStep();
                } else {
                  alert("희망하는 언어를 선택해주세요");
                }
              }}
            >
              <div className="text-[26px] font-bold font-['NanumSquareRound']">
                다음
              </div>
            </button>
          </div>
        )}
        {onBoardingStep === 3 && (
          <div className="flex flex-col justify-between items-center">
            <div className="h-[220px] w-[220px] bg-[url('/src/assets/images/onBoarding4.png')] bg-cover"></div>
            <div className="flex flex-col items-center">
              <div className="w-[440px] text-center text-zinc-900 text-[28px] font-bold font-['NanumSquareRound'] leading-[45px]">
                아이의 닉네임을 설정해주세요
              </div>
              <div className="h-[3px]"></div>
              <div className="w-80 text-center text-zinc-400 text-[22px] font-bold font-['NanumSquareRound']">
                나중에 바꿀 수 있어요
              </div>
            </div>
            <input
              type="text"
              value={onBoarding.nickname}
              onChange={(e) => handleNickname(e.target.value)}
              className="w-[444px] h-[52px] py-[9px] px-[9px] text-center relative rounded-2xl border-2 border-violet-300 outline-none active:border-violet-800 focus:border-violet-800"
            ></input>
            <button
              className="w-[354px] h-[60px] cursor-pointer bg-zinc-200 rounded-[63px] justify-center items-center inline-flex"
              onClick={() => {
                if (
                  onBoarding.nickname.length < 2 ||
                  onBoarding.nickname.length > 8
                ) {
                  alert("닉네임을 2 ~ 8 글자로 설정해주세요");
                } else {
                  submitOnBoarding();
                }
              }}
            >
              <div className="text-zinc-500 text-[26px] font-bold font-['NanumSquareRound']">
                완료
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnBoarding;
