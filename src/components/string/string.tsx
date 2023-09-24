import React, { FormEvent, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { reverseString } from "./algorythm";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [str, setStr] = useState("");

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // В момент отправки формы создаем кружки из букв
    // Отправляем их на сортировку
    // Передаем в функцию сортировки setIsAnimating
    // Передаем в функцию сортировки состояние кружков
    console.log(inputValue);
    setIsAnimating(!isAnimating);
    setStr(reverseString(inputValue));
    setTimeout(() => {
      setIsAnimating((isAnimating) => !isAnimating);
      setStr(() => "");
    }, 2000);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
          placeholder="Введите текст"
          isLimitText={true}
          maxLength={11}
        />
        <Button type="submit" text="Развернуть" isLoader={isAnimating} />
      </form>
      <div className={styles.algorythm}>{str}</div>
    </SolutionLayout>
  );
};
