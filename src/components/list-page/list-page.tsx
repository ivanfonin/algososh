import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./linked-list.module.css";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [indexValue, setIndexValue] = useState<string>("");

  const handleAddToHead = () => {};

  const handleAddToTail = () => {};

  const handleDeleteFromHead = () => {};

  const handleDeleteFromTail = () => {};

  const handleAddByIndex = () => {};

  const handleDeleteByIndexl = () => {};

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.grid}>
        <Input
          extraClass={`${styles.input}`}
          placeholder="Введите текст"
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button
          extraClass={`${styles.addhead} ${styles.btn}`}
          text="Добавить в head"
          onClick={handleAddToHead}
        />
        <Button
          extraClass={`${styles.addtail} ${styles.btn}`}
          text="Добавить в tail"
          onClick={handleAddToTail}
        />
        <Button
          extraClass={`${styles.deletehead} ${styles.btn}`}
          text="Удалить из head"
          onClick={handleDeleteFromHead}
        />
        <Button
          extraClass={`${styles.deletetail} ${styles.btn}`}
          text="Удалить из tail"
          onClick={handleDeleteFromTail}
        />
        <Input
          extraClass={styles.index}
          placeholder="Введите индекс"
          value={indexValue}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setIndexValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button
          extraClass={`${styles.addindex} ${styles.btn}`}
          text="Добавить по индексу"
          onClick={handleAddByIndex}
        />
        <Button
          extraClass={`${styles.deleteindex} ${styles.btn}`}
          text="Удалить по индексу"
          onClick={handleDeleteByIndexl}
        />
      </form>
      <div className={styles.list}></div>
    </SolutionLayout>
  );
};
