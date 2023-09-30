import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list";
import { ElementStates } from "../../types/element-states";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./linked-list.module.css";

const INITIAL_LIST_ITEMS = ["0", "34", "8", "1"];

type TListItem = {
  letter?: string;
  index?: number;
};

export const ListPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [inputValue, setInputValue] = useState<string>("");
  const [indexValue, setIndexValue] = useState<string>("");
  const [listItems, setListItems] = useState<TListItem[]>();
  const list = useMemo(() => new LinkedList<string>(), []);

  // При генерации элементов можем указать индекс и стейт элемента для подсветки.
  const getListItems = useCallback(
    (i?: number, status?: ElementStates) => {
      return list.getItems().map((item, index) => ({
        letter: item,
        state: i === index ? status : ElementStates.Default,
      }));
    },
    [list]
  );

  useEffect(() => {
    INITIAL_LIST_ITEMS.forEach((item) => list.append(item));
    setListItems(getListItems());
  }, [list, getListItems]);

  const handleAddToHead = async () => {
    if (!inputValue) return;
    // Начинаем анимацию
    setIsAnimating(true);
    // Подсвечиваем 1-й элемент, устанвливаем статус "adding", делаем паузу
    setIsAdding(true);
    setActiveIndex(0);
    await pause(SHORT_DELAY_IN_MS);
    // После паузы убираем подсветку
    setIsAdding(false);
    setActiveIndex(undefined);
    // Обновляем список и подсвечиваем измененный элемент, делаем паузу
    list.prepend(inputValue);
    setListItems(getListItems(0, ElementStates.Modified));
    await pause(SHORT_DELAY_IN_MS);
    // После паузы ставим всем элементам стейт "Default"
    setListItems(getListItems());
    // Выключаем анимацию и очищаем инпут
    setIsAnimating(false);
    setInputValue("");
  };

  const handleAddToTail = async () => {
    if (!inputValue) return;
    console.log("appending to tail", inputValue);
    // Начинаем анимацию
    setIsAnimating(true);
    // Подсвечиваем последний элемент, устанвливаем статус "adding", делаем паузу
    setIsAdding(true);
    setActiveIndex(list.getSize() - 1);
    await pause(SHORT_DELAY_IN_MS);
    // После паузы убираем подсветку
    setIsAdding(false);
    setActiveIndex(undefined);
    // Обновляем список и подсвечиваем измененный элемент, делаем паузу
    list.append(inputValue);
    setListItems(getListItems(list.getSize() - 1, ElementStates.Modified));
    await pause(SHORT_DELAY_IN_MS);
    // После паузы ставим всем элементам стейт "Default"
    setListItems(getListItems());
    // Выключаем анимацию и очищаем инпут
    setIsAnimating(false);
    setInputValue("");
  };

  const handleDeleteFromHead = () => {
    setIsAnimating(true);
    setIsDeleting(true);
    console.log("delete from head");
    list.deleteAt(0);
    setListItems(getListItems());
  };

  const handleDeleteFromTail = () => {
    console.log("delete from tail");
    list.deleteAt(list.getSize() - 1);
    setListItems(getListItems());
  };

  const handleAddByIndex = () => {
    if (!indexValue) return;
    console.log("insert at", indexValue, inputValue);
    list.insertAt(inputValue, parseInt(indexValue));
    setListItems(getListItems());
  };

  const handleDeleteByIndexl = () => {
    if (!indexValue) return;
    console.log("delete at", indexValue);
    list.deleteAt(parseInt(indexValue));
    setListItems(getListItems());
  };

  const isValidIndex = () => {
    const index = parseInt(indexValue);
    return index >= 0 && index < list.getSize();
  };

  const isValidAddIndex = () => {
    const index = parseInt(indexValue);
    return index >= 0 && index < list.getSize() + 1;
  };

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
          disabled={!inputValue}
        />
        <Button
          extraClass={`${styles.addtail} ${styles.btn}`}
          text="Добавить в tail"
          onClick={handleAddToTail}
          disabled={!inputValue}
        />
        <Button
          extraClass={`${styles.deletehead} ${styles.btn}`}
          text="Удалить из head"
          onClick={handleDeleteFromHead}
          disabled={!list.getSize()}
        />
        <Button
          extraClass={`${styles.deletetail} ${styles.btn}`}
          text="Удалить из tail"
          onClick={handleDeleteFromTail}
          disabled={!list.getSize()}
        />
        <Input
          type="number"
          min={0}
          step={1}
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
          disabled={!inputValue || !isValidAddIndex()}
        />
        <Button
          extraClass={`${styles.deleteindex} ${styles.btn}`}
          text="Удалить по индексу"
          onClick={handleDeleteByIndexl}
          disabled={!list.getSize() || !isValidIndex()}
        />
      </form>
      <ul className={styles.list}>
        {listItems &&
          listItems.map((item, i) => {
            return (
              <li key={i} className={styles.listitem}>
                {i === activeIndex && isAdding && isAnimating && (
                  <Circle
                    isSmall={true}
                    extraClass={styles.top}
                    letter={inputValue}
                    state={ElementStates.Changing}
                  />
                )}

                <Circle
                  index={i}
                  head={i === 0 && activeIndex !== 0 ? "head" : ""}
                  tail={
                    i === list.getSize() - 1 &&
                    activeIndex !== list.getSize() - 1
                      ? "tail"
                      : ""
                  }
                  {...item}
                />

                {i === activeIndex && isDeleting && isAnimating && (
                  <Circle
                    isSmall={true}
                    extraClass={styles.bottom}
                    letter={inputValue}
                    state={ElementStates.Changing}
                  />
                )}
                {i < list.getSize() - 1 && <ArrowIcon />}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
