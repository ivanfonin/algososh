import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
// import { reverseString } from "./algorythm";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./string.module.css";

type CircleArray = Array<React.ReactElement<CircleProps>>;

export const StringComponent: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [circles, setCircles] = useState<CircleArray>([]);

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    // В момент отправки формы создаем кружки из букв
    setCircles(
      inputValue
        .split("")
        .map((letter, i) => (
          <Circle key={i} state={ElementStates.Default} letter={letter} />
        ))
    );

    // Отправляем их на сортировку
    // Передаем в функцию сортировки setIsAnimating
    // Передаем в функцию сортировки состояние кружков circles, setCircles
    console.log(inputValue);
    setIsAnimating(!isAnimating);
    setTimeout(() => {
      setIsAnimating((isAnimating) => !isAnimating);
    }, 2000);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          name="reverse"
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
      <div className={styles.algorythm}>{circles}</div>
    </SolutionLayout>
  );
};
