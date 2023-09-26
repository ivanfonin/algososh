import React, { SetStateAction } from "react";
import { swap } from "../../utils/swap";
import { pause } from "../../utils/pause";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TColumn } from "./sorting-page";

export const selectSort = async (
  arr: TColumn[],
  direction: Direction,
  setArray: React.Dispatch<SetStateAction<TColumn[]>>,
  setIsAnimating: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsAnimating(true);
  const { length } = arr;
  const result = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    let maxEl = arr[i].index;
    for (let j = i; j < length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await pause(SHORT_DELAY_IN_MS);
      if (
        (direction === Direction.Descending && arr[j].index > maxEl) ||
        (direction === Direction.Ascending && arr[j].index < maxEl)
      ) {
        maxInd = j;
        maxEl = arr[j].index;
      }
      arr[i].state = ElementStates.Default;
      arr[j].state = ElementStates.Default;
    }
    swap(result, i, maxInd);
    arr[i].state = ElementStates.Modified;
  }
  arr[length - 1].state = ElementStates.Modified;
  setArray([...arr]);
  setIsAnimating(false);
};

export const bubbleSort = async (
  arr: TColumn[],
  direction: Direction,
  setArray: React.Dispatch<SetStateAction<TColumn[]>>,
  setIsAnimating: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsAnimating(true);
  await pause(SHORT_DELAY_IN_MS);
  await pause(SHORT_DELAY_IN_MS);
  setIsAnimating(false);
};
