import React, { FormEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/string";
import { reverseArr } from "./algorythm";
import { DELAY_IN_MS } from "../../constants/delays";
import { pause } from "../../utils/pause";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const isMounted = useRef(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [circles, setCircles] = useState<TLetter[]>([]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const letters = inputValue.split("").map((letter) => ({
      state: ElementStates.Default,
      letter,
    }));
    setInputValue("");
    const steps = reverseArr(letters);
    animate(steps, setCircles, setIsAnimating);
  };

  const animate = async (
    steps: TLetter[][],
    setCircles: React.Dispatch<React.SetStateAction<TLetter[]>>,
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsAnimating(true);
    for (const step of steps) {
      if (isMounted.current) {
        setCircles(step);
      }
      await pause(DELAY_IN_MS);
    }
    if (isMounted.current) {
      setIsAnimating(false);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          value={inputValue}
          placeholder="Введите текст"
          maxLength={11}
          isLimitText={true}
          disabled={isAnimating}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button type="submit" text="Развернуть" isLoader={isAnimating} />
      </form>
      <div className={styles.string}>
        {circles && circles.map((letter, i) => <Circle key={i} {...letter} />)}
      </div>
    </SolutionLayout>
  );
};
