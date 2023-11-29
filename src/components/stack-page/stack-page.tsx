import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TStackItem } from "../../types/stack-page";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [stackItems, setStackItems] = useState<TStackItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const stack = new Stack<TStackItem>(stackItems);

  const handleAddItem = async (
    evt: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    evt.preventDefault();
    // Если в инпуте нет числа, метод .push() по ТЗ не вызывается.
    if (!/^\d+$/.test(inputValue)) return false;
    stack.push({
      letter: inputValue,
      state: ElementStates.Changing,
    });
    setInputValue("");
    setStackItems([...stack.getItems()]);
    await pause(SHORT_DELAY_IN_MS);
    const item = stack.peak();
    if (item) {
      item.state = ElementStates.Default;
      setStackItems([...stack.getItems()]);
    }
  };

  const handleDeleteItem = async () => {
    const item = stack.peak();
    if (item) {
      item.state = ElementStates.Changing;
      setStackItems([...stack.getItems()]);
      await pause(SHORT_DELAY_IN_MS);
      stack.pop();
      setStackItems([...stack.getItems()]);
    }
  };

  const handleResetItems = () => {
    stack.clear();
    setStackItems([...stack.getItems()]);
  };

  return (
    <SolutionLayout title="Стек">
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
          disabled={!stackItems.length}
          onClick={handleDeleteItem}
        />
        <Button
          type="button"
          extraClass={styles.clear}
          text="Очистить"
          disabled={!stackItems.length}
          onClick={handleResetItems}
        />
      </form>
      <div className={styles.stack}>
        {stackItems &&
          stack.getItems().map((item, i) => {
            const head = i === stack.getSize() - 1 ? "top" : "";
            return <Circle key={i} head={head} tail={i.toString()} {...item} />;
          })}
      </div>
    </SolutionLayout>
  );
};
