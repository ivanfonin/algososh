import { ElementStates } from "./element-states";

export enum Algorithms {
  Select = "select",
  Bubble = "bubble",
}

export type TColumn = {
  index: number;
  state: ElementStates;
};
