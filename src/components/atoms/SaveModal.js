import axios from "axios";
import { useNavigate } from "react-router-dom";

function SaveModal({ setModal, taleBookName, status }) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-[1024px] h-[460px] pl-[127.50px] pr-[128.50px] pt-[123px] pb-[60px] bg-white rounded-3xl flex-col justify-end items-center gap-[154px] inline-flex absolute top-1/2 right-1/2 mt-[-230px] mr-[-512px]`}
    >
      <div className="text-center text-black text-4xl font-bold font-['NanumSquareRound'] leading-[46.80px]">
        저장하고 나가시겠습니까?
      </div>
      <div className="self-stretch justify-center items-start gap-10 inline-flex">
        <div
          className="w-[364px] h-[76px] cursor-pointer bg-gray-200 rounded-[63px] justify-center items-center flex"
          onClick={() => {
            setModal(false);
          }}
        >
          <div className="text-zinc-500 text-[28px] font-bold font-['NanumSquareRound']">
            계속 읽기
          </div>
        </div>
        <div
          className="w-[364px] h-[76px] cursor-pointer bg-violet-400 rounded-[63px] justify-center items-center flex"
          onClick={() => {
            axios
              .post(
                `${process.env.REACT_APP_URL}member/update/status`,
                {
                  taleBookName,
                  status,
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
          }}
        >
          <div className="text-white text-[28px] font-bold font-['NanumSquareRound']">
            나가기
          </div>
        </div>
      </div>
    </div>
  );
}
export default SaveModal;
