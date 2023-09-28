import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";

const QUEUE_SIZE = 7;

type TQueueItem = {
  state: ElementStates;
  letter: string;
};

const queue = new Queue<TQueueItem>(QUEUE_SIZE); // Инициализируем один раз вне компонента.

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queueItems, setQueueItems] = useState<(TQueueItem | null)[]>();

  const handleAddItem = (
    evt: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    evt.preventDefault();
    queue.enqueue({
      state: ElementStates.Default,
      letter: inputValue,
    });
    setQueueItems(queue.getItems());
    setInputValue("");
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
          disabled={!inputValue || queueItems?.length === QUEUE_SIZE}
          onClick={handleAddItem}
        />
        <Button
          type="button"
          extraClass={styles.delete}
          text="Удалить"
          disabled={!queueItems}
          onClick={handleDeleteItem}
        />
        <Button
          type="button"
          extraClass={styles.clear}
          text="Очистить"
          disabled={!queueItems}
          onClick={handleResetItems}
        />
      </form>
      <div className={styles.queue}>
        {queueItems &&
          queueItems.map(
            (item, i) => item?.letter && <Circle key={i} {...item} />
          )}
      </div>
    </SolutionLayout>
  );
};
