import { useSetRecoilState } from "recoil";
import Button from "./Button";
import { bookSelectedState } from "../../states/bookSelectedState";

export default function Option() {
  const setBookSelected = useSetRecoilState(bookSelectedState);

  return (
    <div
      className="w-screen h-screen bg-[#000000B3] absolute top-0 z-0 overflow-auto flex justify-center items-center"
      onClick={(e) => {
        e.stopPropagation();
        setBookSelected("");
      }}
    >
      <div className="flex justify-between flex-col items-center h-72">
        <Button name={"처음부터"} />
        <Button name={"이어보기"} />
        <Button name={"챕터보기"} />
      </div>
    </div>
  );
}
