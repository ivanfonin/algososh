import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  return (
    <SolutionLayout title="Стек">
      <div className={styles.grid}>
        <Input
          extraClass={styles.input}
          value={inputValue}
          placeholder="Введите текст"
          maxLength={4}
          isLimitText={true}
          disabled={isAnimating}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button extraClass={styles.add} text="Добавить" />
        <Button extraClass={styles.delete} text="Удалить" />
        <Button extraClass={styles.clear} text="Очистить" />
      </div>
      <div className={styles.stack}></div>
    </SolutionLayout>
  );
};
