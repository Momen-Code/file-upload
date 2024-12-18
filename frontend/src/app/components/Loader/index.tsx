"use client";

import { useEffect, useState } from "react";
import SquareLoader from "react-spinners/SquareLoader";
import { useAppContext } from "../../../provider";

//
import "./style.scss";

const Loader = () => {
  const { isLoading } = useAppContext();
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsVisible(false), 700);
    } else {
      setIsVisible(true);
    }
  }, [isLoading]);

  return (
    isVisible && (
      <div className={`loader-container ${isLoading ? "finished" : ""}`}>
        <SquareLoader loading color="#ffffff" size={50} />
      </div>
    )
  );
};

export default Loader;
