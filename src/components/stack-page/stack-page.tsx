import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<any>();
  const [inputValue, setInputValue] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.grid}>
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
        <Button
          type="button"
          extraClass={styles.add}
          text="Добавить"
          disabled={!inputValue}
        />
        <Button
          type="button"
          extraClass={styles.delete}
          text="Удалить"
          disabled={!stack}
        />
        <Button
          type="button"
          extraClass={styles.clear}
          text="Очистить"
          disabled={!stack}
          onClick={() => setInputValue("")}
        />
      </form>
      <div className={styles.stack}></div>
    </SolutionLayout>
  );
};
