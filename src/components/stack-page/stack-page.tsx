import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { IStack } from "./stack";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<IStack<string>>(new Stack<string>());
  const [inputValue, setInputValue] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleAddBtnClick = () => {
    stack.push("test");
    stack.push("av");
    console.log(stack.peak());
  };

  const handleDeleteBtnClick = () => "";

  const handleResetBtnClick = () => setInputValue("");

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
          onClick={handleAddBtnClick}
        />
        <Button
          type="button"
          extraClass={styles.delete}
          text="Удалить"
          disabled={!stack}
          onClick={handleDeleteBtnClick}
        />
        <Button
          type="button"
          extraClass={styles.clear}
          text="Очистить"
          disabled={!stack}
          onClick={handleResetBtnClick}
        />
      </form>
      <div className={styles.stack}>{stack && <div>{stack.peak()}</div>}</div>
    </SolutionLayout>
  );
};
