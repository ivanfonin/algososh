import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { reverseString } from "./algorythm";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";

const str = reverseString("Строка текста");

export const StringComponent: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setIsAnimating(!isAnimating);
    setTimeout(() => {
      setIsAnimating((isAnimating) => !isAnimating);
    }, 2000);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input placeholder="Введите текст" isLimitText={true} maxLength={11} />
        <Button type="submit" text="Развернуть" isLoader={isAnimating} />
      </form>
      <div className={styles.algorythm}>{str}</div>
    </SolutionLayout>
  );
};
