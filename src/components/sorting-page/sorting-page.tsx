import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [columns, setColumns] = useState([]);
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.grid}>
        <RadioInput extraClass={styles.select} label="Выбор" />
        <RadioInput extraClass={styles.bubble} label="Пузырёк" />
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
