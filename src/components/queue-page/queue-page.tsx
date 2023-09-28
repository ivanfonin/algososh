import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./queue-page.module.css";

type TQueueItem = {
  state: ElementStates;
  letter: string;
};

const QUEUE_SIZE = 7;

const QUEUE_ITEM: TQueueItem = {
  state: ElementStates.Default,
  letter: "",
};

const queue = new Queue<TQueueItem>(QUEUE_SIZE, QUEUE_ITEM); // Инициализируем один раз вне компонента.

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queueItems, setQueueItems] = useState<TQueueItem[]>();

  useEffect(() => {
    setQueueItems(queue.getItems());
  }, [queueItems]);

  const handleAddItem = async (
    evt: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    evt.preventDefault();
    // Сначала добавлем статус 'Changing' хвосту.
    queue.setItemState(queue.getTail(), ElementStates.Changing);
    setQueueItems([...queue.getItems()]);
    await pause(SHORT_DELAY_IN_MS);
    // После возвращаем хвосту статус 'Default'.
    queue.setItemState(queue.getTail(), ElementStates.Default);
    setQueueItems([...queue.getItems()]);
    // И добавляем элемент в очередь.
    queue.enqueue({
      state: ElementStates.Default,
      letter: inputValue,
    });
    setQueueItems([...queue.getItems()]);
    setInputValue("");
  };

  const handleDeleteItem = async () => {
    // Сначала добавлем статус 'Changing' голове.
    queue.setItemState(queue.getHead(), ElementStates.Changing);
    setQueueItems([...queue.getItems()]);
    await pause(SHORT_DELAY_IN_MS);
    // После возвращаем хвосту статус 'Default'.
    queue.setItemState(queue.getHead(), ElementStates.Default);
    setQueueItems([...queue.getItems()]);
    // И удалеям из очереди.
    queue.dequeue();
    setQueueItems([...queue.getItems()]);
  };

  const handleResetItems = () => {
    queue.clear();
    setQueueItems([...queue.getItems()]);
  };

  const getHead = (i: number) =>
    i === queue.getHead() && queue.getLength() ? "head" : "";

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
          disabled={!inputValue || queue.getLength() === QUEUE_SIZE}
          onClick={handleAddItem}
        />
        <Button
          type="button"
          extraClass={styles.delete}
          text="Удалить"
          disabled={!queue.getLength()}
          onClick={handleDeleteItem}
        />
        <Button
          type="button"
          extraClass={styles.clear}
          text="Очистить"
          disabled={!queue.getLength()}
          onClick={handleResetItems}
        />
      </form>
      <div className={styles.queue}>
        {queueItems &&
          queueItems.map((item, i) => (
            <Circle
              key={i}
              head={getHead(i)}
              tail={
                i === queue.getTail() - 1 && queue.getLength() ? "tail" : ""
              }
              index={i}
              {...item}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
