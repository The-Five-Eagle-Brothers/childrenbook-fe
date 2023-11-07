import { useState } from "react";

const useOnBoarding = () => {
  const [onBoardingStep, setOnBoardingStep] = useState(0);
  const [onBoarding, setOnBoarding] = useState({
    age: 0,
    genre: "",
    language: "",
    nickname: "",
  });

  function handleAge(age) {
    setOnBoarding({ ...onBoarding, age: age });
  }

  function handleGenre(genre) {
    setOnBoarding({ ...onBoarding, genre: genre });
  }

  function handleLanguage(language) {
    setOnBoarding({ ...onBoarding, language: language });
  }

  function handleNickname(nickname) {
    setOnBoarding({ ...onBoarding, nickname: nickname });
  }

  function nextStep() {
    setOnBoardingStep(onBoardingStep + 1);
  }

  return {
    onBoarding,
    setOnBoarding,
    handleAge,
    handleGenre,
    handleLanguage,
    handleNickname,
    onBoardingStep,
    setOnBoardingStep,
    nextStep,
  };
};

export default useOnBoarding;
