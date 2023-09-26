import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectSort } from "./algorithms";
import styles from "./sorting-page.module.css";

export enum Algorithms {
  Select = "select",
  Bubble = "bubble",
}

export type TColumn = {
  index: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TColumn[]>([]);
  const [direction, setDirection] = useState<Direction>();
  const [algorithm, setAlgorithm] = useState<string>(Algorithms.Bubble);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const randomArr = () => {
    const arr = [];
    const n = Math.floor(Math.random() * 17 + 3);
    for (let i = 0; i < n; i++) {
      arr.push({
        index: Math.floor(Math.random() * 100 + 1),
        state: ElementStates.Default,
      });
    }
    setArray(arr);
  };

  useEffect(() => {
    randomArr();
  }, []);

  const sort = (direction: Direction) => {
    setDirection(direction);
    if (algorithm === Algorithms.Select) {
      selectSort(array, direction, setArray, setIsAnimating);
    }
    if (algorithm === Algorithms.Bubble) {
      bubbleSort(array, direction, setArray, setIsAnimating);
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
          isLoader={isAnimating && direction === Direction.Ascending}
          disabled={isAnimating}
        ></Button>
        <Button
          extraClass={styles.desc}
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={() => sort(Direction.Descending)}
          isLoader={isAnimating && direction === Direction.Descending}
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
        {array && array.map((item, i) => <Column key={i} {...item} />)}
      </div>
    </SolutionLayout>
  );
};
