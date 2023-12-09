import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

const circleProps = {
  state: ElementStates.Default,
  letter: "test",
  head: "str",
  index: 1,
  tail: "str",
  extraClass: "extra-class",
  isSmall: true,
};

describe("Тестируем компонент Circle", () => {
  afterEach(cleanup);

  it("Кружок с пропсами рендерится без ошибок", () => {
    const tree = renderer.create(<Circle {...circleProps} />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок без буквы рендерится без ошибок", () => {
    const tree = renderer.create(<Circle />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок с буквами рендерится без ошибок", () => {
    const tree = renderer.create(<Circle letter="Abc" />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок с head рендерится без ошибок", () => {
    const tree = renderer.create(<Circle head="Abc" />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок с react-элементом в head рендерится без ошибок", () => {
    const tree = renderer.create(<Circle head={<Circle letter="head" />} />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок с tail рендерится без ошибок", () => {
    const tree = renderer.create(<Circle tail="Abc" />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок с react-элементом в tail рендерится без ошибок", () => {
    const tree = renderer.create(<Circle tail={<Circle letter="tail" />} />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок с пропсом isSmall === true рендерится без ошибок", () => {
    const tree = renderer.create(<Circle isSmall={true} />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок в состоянии default рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок в состоянии changing рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  it("Кружок в состоянии modified рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});
