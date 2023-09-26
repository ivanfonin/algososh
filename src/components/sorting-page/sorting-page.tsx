import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";

export enum Algorithms {
  Select = "select",
  Bubble = "bubble",
}

export const SortingPage: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>(Algorithms.Bubble);
  const [columns, setColumns] = useState([]);

  const handlealgorithmSelected = (evt: ChangeEvent<HTMLInputElement>) => {
    setAlgorithm(evt.target.value);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.grid}>
        <RadioInput
          name="sortingAlgorithm"
          value={Algorithms.Select}
          checked={algorithm === Algorithms.Select}
          onChange={handlealgorithmSelected}
          extraClass={styles.select}
          disabled={isAnimating}
          label="Выбор"
        />
        <RadioInput
          name="sortingAlgorithm"
          value={Algorithms.Bubble}
          checked={algorithm === Algorithms.Bubble}
          onChange={handlealgorithmSelected}
          extraClass={styles.bubble}
          disabled={isAnimating}
          label="Пузырёк"
        />
        <Button
          extraClass={styles.asc}
          type="button"
          text="По возрастанию"
          sorting={Direction.Ascending}
        ></Button>
        <Button
          extraClass={styles.desc}
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
        ></Button>
        <Button
          extraClass={styles.reset}
          type="button"
          text="Новый массив"
        ></Button>
      </div>
      <div className={styles.columns}>
        {columns &&
          columns.map((column, index) => <Column key={index} index={index} />)}
      </div>
    </SolutionLayout>
  );
};
