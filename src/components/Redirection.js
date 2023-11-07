import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirection() {
  const code = new URL(document.location.toString()).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    console.log(process.env.REACT_APP_URL);
  }, []);

  useEffect(() => {
    axios
      .post(
        "https://kauth.kakao.com/oauth/token",
        qs.stringify({
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_API_KEY,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: code,
        }),
        {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        }
      )
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_URL}auth/kakao`, {
            accessToken: res.data.access_token,
          })
          .then((res) => {
            if (res.data.statusCode === "OK") {
              console.log(res.data.data.appToken);
              localStorage.setItem("token", res.data.data.appToken);
              axios
                .get(`${process.env.REACT_APP_URL}member/valid`, {
                  headers: {
                    Authorization: `Bearer ${res.data.data.appToken}`,
                  },
                })
                .then((res) => {
                  console.log(res.data.data);
                  if (res.data.data !== null) {
                    navigate("/main");
                  } else {
                    navigate("/onBoarding");
                  }
                });
            }
          });
      });
  }, []);
  return <div></div>;
}
