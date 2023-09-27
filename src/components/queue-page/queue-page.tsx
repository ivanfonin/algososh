import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";

type TQueueItem = {
  state: ElementStates;
  letter: string;
};

export const QueuePage: React.FC = () => {
  const [queueItems, setQueueItems] = useState<TQueueItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddItem = async (
    evt: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    evt.preventDefault();
  };

  const handleDeleteItem = async () => {};

  const handleResetItems = () => {};

  return (
    <SolutionLayout title="Очередь">
      <form onSubmit={handleAddItem} className={styles.grid}>
        <Input
          extraClass={styles.input}
          value={inputValue}
          placeholder="Введите текст"
          maxLength={4}
          isLimitText={true}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button
          type="submit"
          extraClass={styles.add}
          text="Добавить"
          disabled={!inputValue}
          onClick={handleAddItem}
        />
        <Button
          type="button"
          extraClass={styles.delete}
          text="Удалить"
          disabled={!queueItems.length}
          onClick={handleDeleteItem}
        />
        <Button
          type="button"
          extraClass={styles.clear}
          text="Очистить"
          disabled={!queueItems.length}
          onClick={handleResetItems}
        />
      </form>
      <div className={styles.stack}></div>
    </SolutionLayout>
  );
};
