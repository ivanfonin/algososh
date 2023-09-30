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
import { DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import styles from "./linked-list.module.css";

const INITIAL_LIST_ITEMS = ["0", "34", "8", "1"];

type TListItem = {
  letter?: string;
  index?: number;
};

type TGetListItemsProps = {
  index?: number | number[];
  state?: ElementStates;
  text?: string;
};

enum Buttons {
  addhead = "addhead",
  deletehead = "deletehead",
  addtail = "addtail",
  deletetail = "deletetail",
  addindex = "addindex",
  deleteindex = "deleteindex",
}

export const ListPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [activeValue, setActiveValue] = useState<string | undefined>("");
  const [loadingButton, setLoadingButton] = useState<Buttons | "">("");
  const [inputValue, setInputValue] = useState<string>("");
  const [indexValue, setIndexValue] = useState<string>("");
  const [listItems, setListItems] = useState<TListItem[]>();
  const list = useMemo(() => new LinkedList<string>(), []);

  // При генерации элементов можем указать индекс/индексы, стейт/стейты, текст элемента/элементов для подсветки.
  const getListItems = useCallback(
    (props?: TGetListItemsProps) => {
      const atts = props
        ? props
        : { index: undefined, state: undefined, text: undefined };
      const { index, state, text } = atts;
      const indexes =
        typeof index === "number" ? [index] : Array.isArray(index) ? index : [];
      return list.getItems().map((item, i) => {
        return {
          letter: indexes.includes(i) && text !== undefined ? text : item,
          state: indexes.includes(i) && state ? state : ElementStates.Default,
        };
      });
    },
    [list]
  );

  useEffect(() => {
    INITIAL_LIST_ITEMS.forEach((item) => list.append(item));
    setListItems(getListItems());
  }, [list, getListItems]);

  const handleAddToHead = async () => {
    if (!inputValue) return;
    // Включаем анимацию
    setIsAnimating(true);
    setLoadingButton(Buttons.addhead);
    // Подсвечиваем 1-й элемент, устанвливаем статус "adding", делаем паузу
    setIsAdding(true);
    setActiveIndex(0);
    await pause(DELAY_IN_MS);
    // После паузы убираем подсветку
    setIsAdding(false);
    setActiveIndex(undefined);
    // Обновляем список и подсвечиваем измененный элемент, делаем паузу
    list.prepend(inputValue);
    setListItems(getListItems({ index: 0, state: ElementStates.Modified }));
    await pause(DELAY_IN_MS);
    // После паузы ставим всем элементам стейт "Default"
    setListItems(getListItems());
    // Выключаем анимацию и очищаем инпут
    setLoadingButton("");
    setIsAnimating(false);
    setInputValue("");
  };

  const handleAddToTail = async () => {
    if (!inputValue) return;
    // Включаем анимацию
    setIsAnimating(true);
    setLoadingButton(Buttons.addtail);
    // Устанвливаем статус "adding", выводим активный элемент в конце, делаем паузу
    setIsAdding(true);
    setActiveIndex(list.getSize() - 1);
    await pause(DELAY_IN_MS);
    // После паузы убираем статус "adding", убираем активный элемент
    setIsAdding(false);
    setActiveIndex(undefined);
    // Обновляем список и подсвечиваем измененный элемент, делаем паузу
    list.append(inputValue);
    setListItems(
      getListItems({
        index: list.getSize() - 1,
        state: ElementStates.Modified,
      })
    );
    await pause(DELAY_IN_MS);
    // После паузы ставим всем элементам стейт "Default"
    setListItems(getListItems());
    // Выключаем анимацию и очищаем инпут
    setLoadingButton("");
    setIsAnimating(false);
    setInputValue("");
  };

  const handleDeleteFromHead = async () => {
    // Включаем анимацию
    setIsAnimating(true);
    setLoadingButton(Buttons.deletehead);
    // Устанвливаем статус "deleting", в активном элементе выводим значение удаляемого элемента
    setIsDeleting(true);
    setActiveValue(list.getItem(0));
    setActiveIndex(0);
    // Убираем текст из удалеяемого элемента, обновляем список и делаем паузу
    setListItems(getListItems({ index: 0, text: "" }));
    await pause(DELAY_IN_MS);
    // После паузы убираем статус "deleting" и активный элемент
    setIsDeleting(false);
    setActiveIndex(undefined);
    // Удалеям элемент, выводим новый список, выключаем анимацию
    list.deleteAt(0);
    setListItems(getListItems());
    setLoadingButton("");
    setIsAnimating(false);
  };

  const handleDeleteFromTail = async () => {
    // Включаем анимацию
    setIsAnimating(true);
    setLoadingButton(Buttons.deletetail);
    // Устанвливаем статус "deleting", в активном элементе выводим значение удаляемого элемента
    setIsDeleting(true);
    setActiveValue(list.getItem(list.getSize() - 1));
    setActiveIndex(list.getSize() - 1);
    // Убираем текст из удалеяемого элемента, обновляем список и делаем паузу
    setListItems(getListItems({ index: list.getSize() - 1, text: "" }));
    await pause(DELAY_IN_MS);
    // После паузы убираем статус "deleting" и активный элемент
    setIsDeleting(false);
    setActiveIndex(undefined);
    // Удалеям элемент, выводим новый список, выключаем анимацию
    list.deleteAt(list.getSize() - 1);
    setListItems(getListItems());
    setLoadingButton("");
    setIsAnimating(false);
  };

  const handleAddByIndex = async () => {
    if (!indexValue) return;
    const index = parseInt(indexValue);
    // Включаем анимацию
    setIsAnimating(true);
    setLoadingButton(Buttons.deletetail);
    // Устанавливаем статус "adding", в активном элементе выводим добавляемое значение
    setIsAdding(true);
    setActiveValue(inputValue);
    // Сначала ставим активный элемент в самом начале, запоминаем элементы до нужного индекса
    const changingElements = [];
    let activeIndex = 0;
    setActiveIndex(activeIndex);
    // Потом идем до индекса и переносим активный элемент, а также подсвечиваем элементы до индекса
    for (let i = 0; i <= index; i++) {
      await pause(DELAY_IN_MS);
      activeIndex++;
      changingElements.push(i);
      setActiveIndex(activeIndex);
      setListItems(
        getListItems({ index: changingElements, state: ElementStates.Changing })
      );
    }
    // Убираем активный элемент, добавляем новый элемент и подсвечиваем его как "Modified"
    setActiveIndex(undefined);
    list.insertAt(inputValue, index);
    setListItems(getListItems({ index, state: ElementStates.Modified }));
    // Делаем паузу и отображаем новый список элементов со статусом "Default"
    await pause(DELAY_IN_MS);
    setListItems(getListItems());
    // Выключаем анимацию
    setLoadingButton("");
    setIsAnimating(false);
  };

  const handleDeleteByIndex = () => {
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

  const getHead = (i: number) => {
    const addingFirst = activeIndex === 0 && isAdding;
    return addingFirst || i !== 0 ? "" : HEAD;
  };

  const getTail = (i: number) => {
    const deletingLast = activeIndex === list.getSize() - 1 && isDeleting;
    return deletingLast || i !== list.getSize() - 1 ? "" : TAIL;
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
          disabled={isAnimating}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button
          extraClass={`${styles.addhead} ${styles.btn}`}
          text="Добавить в head"
          onClick={handleAddToHead}
          isLoader={loadingButton === Buttons.addhead}
          disabled={!inputValue || isAnimating}
        />
        <Button
          extraClass={`${styles.addtail} ${styles.btn}`}
          text="Добавить в tail"
          onClick={handleAddToTail}
          isLoader={loadingButton === "addtail"}
          disabled={!inputValue || isAnimating}
        />
        <Button
          extraClass={`${styles.deletehead} ${styles.btn}`}
          text="Удалить из head"
          onClick={handleDeleteFromHead}
          isLoader={loadingButton === Buttons.deletehead}
          disabled={!list.getSize() || isAnimating}
        />
        <Button
          extraClass={`${styles.deletetail} ${styles.btn}`}
          text="Удалить из tail"
          onClick={handleDeleteFromTail}
          isLoader={loadingButton === Buttons.deletetail}
          disabled={!list.getSize() || isAnimating}
        />
        <Input
          type="number"
          min={0}
          step={1}
          extraClass={styles.index}
          placeholder="Введите индекс"
          value={indexValue}
          disabled={isAnimating}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setIndexValue((evt.target as HTMLInputElement).value)
          }
        />
        <Button
          extraClass={`${styles.addindex} ${styles.btn}`}
          text="Добавить по индексу"
          onClick={handleAddByIndex}
          isLoader={loadingButton === Buttons.addindex}
          disabled={!inputValue || !isValidAddIndex() || isAnimating}
        />
        <Button
          extraClass={`${styles.deleteindex} ${styles.btn}`}
          text="Удалить по индексу"
          onClick={handleDeleteByIndex}
          isLoader={loadingButton === Buttons.deleteindex}
          disabled={!list.getSize() || !isValidIndex() || isAnimating}
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
                    letter={inputValue || activeValue}
                    state={ElementStates.Changing}
                  />
                )}

                <Circle
                  index={i}
                  head={getHead(i)}
                  tail={getTail(i)}
                  {...item}
                />

                {i === activeIndex && isDeleting && isAnimating && (
                  <Circle
                    isSmall={true}
                    extraClass={styles.bottom}
                    letter={inputValue || activeValue}
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
