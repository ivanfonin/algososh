import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { reverseString } from "./algorythm";

console.log(reverseString("Строка текста"));
const str = reverseString("Строка текста");

export const StringComponent: React.FC = () => {
  return <SolutionLayout title="Строка">{str}</SolutionLayout>;
};
