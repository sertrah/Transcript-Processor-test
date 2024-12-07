import gsap from "gsap";
import React, { useRef } from "react";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

import { ITransciption } from "../types/shared";

import style from "@/app/styles/AISummary.module.css";

gsap.registerPlugin(useGSAP);

const AISummaryAndKeyPoints: React.FC<{
  transcriptionText?: ITransciption;
}> = ({ transcriptionText }) => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!transcriptionText) {
        return;
      }

      const $sumary = container.current?.children[0] as HTMLElement;
      const $keys = container.current?.children[1] as HTMLElement;
      new SplitType($sumary.querySelector("p")!);

      const time = 0.5;
      const tl = gsap.timeline();
      tl.to($sumary, { opacity: 1, duration: time });
      tl.to($sumary.querySelectorAll(".char"), {
        opacity: 1,
        stagger: 0.01,
        delay: 0.2,
      });
      tl.to($keys, { opacity: 1, duration: time });
    },
    {
      scope: container,
      dependencies: [transcriptionText],
      revertOnUpdate: true,
    }
  );

  if (!transcriptionText) {
    return <></>;
  }

  return (
    <section ref={container} className={`${style.container}`}>
      <div className={style.summary}>
        <h2>Summary</h2>
        <p className={`text`}>{transcriptionText.summary}</p>
      </div>
      <div className={style.keys}>
        <h2>Key Points</h2>
        <ul className={`text `}>
          {transcriptionText.keyPoints?.map((point, index) => (
            <li key={`keypoints-${index}`}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AISummaryAndKeyPoints;
