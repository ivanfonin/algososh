import React, { SetStateAction } from "react";
import { swap } from "../../utils/swap";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TColumn } from "./sorting-page";

export const selectSort = async (
  arr: TColumn[],
  order: Direction,
  setArray: React.Dispatch<SetStateAction<TColumn[]>>,
  setIsAnimating: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsAnimating(true);
  const { length } = arr;
  const result = arr;
  for (let i = 0; i < length - 1; i++) {
    let targetInd = i;
    let targetEl = arr[i].index;
    for (let j = i; j < length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await pause(SHORT_DELAY_IN_MS);
      if (
        (order === Direction.Descending && arr[j].index > targetEl) ||
        (order === Direction.Ascending && arr[j].index < targetEl)
      ) {
        targetInd = j;
        targetEl = arr[j].index;
      }
      arr[i].state = ElementStates.Default;
      arr[j].state = ElementStates.Default;
    }
    swap(result, i, targetInd);
    arr[i].state = ElementStates.Modified;
  }
  arr[length - 1].state = ElementStates.Modified;
  setArray([...arr]);
  setIsAnimating(false);
};

export const bubbleSort = async (
  arr: TColumn[],
  order: Direction,
  setArray: React.Dispatch<SetStateAction<TColumn[]>>,
  setIsAnimating: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsAnimating(true);
  const { length } = arr;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);
      await pause(SHORT_DELAY_IN_MS);
      if (
        (order === Direction.Ascending && arr[j].index < arr[j + 1].index) ||
        (order === Direction.Descending && arr[j].index > arr[j + 1].index)
      ) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
    }
    arr[length - i - 1].state = ElementStates.Modified;
    setArray([...arr]);
  }
  setIsAnimating(false);
};
