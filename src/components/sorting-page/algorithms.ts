import React, { SetStateAction } from "react";
import { swap } from "../../utils/swap";
import { pause } from "../../utils/pause";
import { DELAY_IN_MS } from "../../constants/delays";
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
      if (arr[j].index > maxEl) {
        maxInd = j;
        maxEl = arr[j].index;
      }
    }
    await pause(DELAY_IN_MS);
    swap(result, i, maxInd);
  }
  console.log(result);
  setIsAnimating(false);
};

export const bubbleSort = async (
  arr: TColumn[],
  direction: Direction,
  setArray: React.Dispatch<SetStateAction<TColumn[]>>,
  setIsAnimating: React.Dispatch<SetStateAction<boolean>>
) => {
  setIsAnimating(true);
  await pause(DELAY_IN_MS);
  await pause(DELAY_IN_MS);
  await pause(DELAY_IN_MS);
  setIsAnimating(false);
};
