import React, { FormEvent, useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { fibonacci } from "./algorythm";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci.module.css";

export type TNumber = {
  letter: string;
  index: number;
};

export const FibonacciPage: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [circles, setCircles] = useState<TNumber[]>([]);

  const animate = async (numbers: number[]) => {
    setIsAnimating(true);
    for (let i = 0; i < numbers.length; i++) {
      await pause(SHORT_DELAY_IN_MS);
      setCircles((prevCircles) => [
        ...prevCircles,
        { index: i, letter: numbers[i].toString() },
      ]);
    }
    setIsAnimating(false);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setInputValue("");
    setCircles([]);
    const numbers: number[] = fibonacci(parseInt(inputValue));
    animate(numbers);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="number"
          value={inputValue}
          placeholder="Введите текст"
          min={0}
          max={19}
          isLimitText={true}
          disabled={isAnimating}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button type="submit" text="Рассчитать" isLoader={isAnimating} />
      </form>
      <div className={styles.fibonacci}>
        {circles &&
          circles.map((circle, i) => (
            <Circle key={i} extraClass={styles.number} {...circle} />
          ))}
      </div>
    </SolutionLayout>
  );
};
