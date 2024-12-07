import React from "react";
import style from "@/app/styles/HeroContainer.module.css";

const HeroContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={style.container}>
      <h1>Discover the magic of your texts with AI.</h1>
      {children}
    </div>
  );
};

export default HeroContainer;
