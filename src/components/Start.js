export default function Start() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[url('/src/assets/images/bg.png')] bg-cover">
      <span className="text-[200px] font-niconne leading-[255px] text-center text-white">
        Tale
      </span>
      <span className="text-[200px] mt-[-40px] font-niconne leading-[255px] text-center text-white">
        Adventure
      </span>
      <div
        className="w-[250px] h-[60px] text-2xl font-semibold flex justify-center items-center text-white rounded-md mt-10 cursor-pointer bg-[url('/src/assets/images/startBtn.png')] bg-cover"
        onClick={handleLogin}
      >
        START
      </div>
    </div>
  );
}
