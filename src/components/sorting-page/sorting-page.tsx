import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectSort } from "./algorithms";
import { Algorithms, TColumn } from "../../types/sorting-page";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const isMounted = useRef(true);
  const [arr, setArr] = useState<number[]>([]);
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [order, setOrder] = useState<Direction>();
  const [algorithm, setAlgorithm] = useState<string>(Algorithms.Bubble);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const randomArr = () => {
    const arr = [];
    const cols = [];
    const n = Math.floor(Math.random() * 17 + 3);
    for (let i = 0; i < n; i++) {
      const randomNumber = Math.floor(Math.random() * 100 + 1);
      arr.push(randomNumber);
      cols.push({
        index: randomNumber,
        state: ElementStates.Default,
      });
    }
    setArr(arr);
    setColumns(cols);
  };

  useEffect(() => {
    randomArr();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const sort = async (order: Direction) => {
    setOrder(order);
    if (algorithm === Algorithms.Select) {
      setIsAnimating(true);
      const { steps } = await selectSort(arr, order);
      for (const step of steps) {
        if (isMounted.current) {
          setColumns(step);
        }
        await pause(SHORT_DELAY_IN_MS);
      }
      if (isMounted.current) {
        setIsAnimating(false);
      }
    }
    if (algorithm === Algorithms.Bubble) {
      setIsAnimating(true);
      const { steps } = await bubbleSort(arr, order);
      for (const step of steps) {
        if (isMounted.current) {
          setColumns(step);
        }
        await pause(SHORT_DELAY_IN_MS);
      }
      if (isMounted.current) {
        setIsAnimating(false);
      }
    }
  };

  const handleAlgorithmSelected = (evt: ChangeEvent<HTMLInputElement>) => {
    setAlgorithm(evt.target.value);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.grid}>
        <RadioInput
          name="sortingAlgorithm"
          value={Algorithms.Select}
          checked={algorithm === Algorithms.Select}
          onChange={handleAlgorithmSelected}
          extraClass={styles.select}
          disabled={isAnimating}
          label="Выбор"
        />
        <RadioInput
          name="sortingAlgorithm"
          value={Algorithms.Bubble}
          checked={algorithm === Algorithms.Bubble}
          onChange={handleAlgorithmSelected}
          extraClass={styles.bubble}
          disabled={isAnimating}
          label="Пузырёк"
        />
        <Button
          extraClass={styles.asc}
          type="button"
          text="По возрастанию"
          sorting={Direction.Ascending}
          onClick={() => sort(Direction.Ascending)}
          isLoader={isAnimating && order === Direction.Ascending}
          disabled={isAnimating}
        ></Button>
        <Button
          extraClass={styles.desc}
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={() => sort(Direction.Descending)}
          isLoader={isAnimating && order === Direction.Descending}
          disabled={isAnimating}
        ></Button>
        <Button
          extraClass={styles.reset}
          type="button"
          text="Новый массив"
          onClick={() => randomArr()}
          disabled={isAnimating}
        ></Button>
      </div>
      <div className={styles.columns}>
        {columns && columns.map((item, i) => <Column key={i} {...item} />)}
      </div>
    </SolutionLayout>
  );
};
