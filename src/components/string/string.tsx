import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { reverseArray } from "./algorythm";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./string.module.css";

export type TLetter = {
  state: ElementStates;
  letter: string;
};

export const StringComponent: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [circles, setCircles] = useState<TLetter[]>([]);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const letters = inputValue.split("").map((letter) => ({
      state: ElementStates.Default,
      letter,
    }));
    setInputValue("");
    reverseArray(letters, setCircles, setIsAnimating);
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
