import React from "react";
import style from "@/app/styles/AISummary.module.css";

const AISummaryAndKeyPoints: React.FC<{ transcriptionText?: string }> = ({
  transcriptionText,
}) => {
  if (!transcriptionText) {
    return <div>No data yet</div>;
  }

  return (
    <section className={style.container}>
      <div className={style.summary}>Summary</div>
      <div className={style.keys}>keys </div>
    </section>
  );
};

export default AISummaryAndKeyPoints;
