import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";
import { useState } from "react";

const buttonProps = {
  extraClass: "extra-class",
  text: "Text",
  isLoader: false,
  disabled: false,
};

const ButtonTestComponent = () => {
  const [loader, setLoader] = useState(false);
  const combinedProps = {
    ...buttonProps,
    isLoader: loader,
    onClick: () => setLoader((prevLoader) => !prevLoader),
  };
  return <Button {...combinedProps} />;
};

describe("Тестируем компонент Button", () => {
  afterEach(cleanup);

  it("Кнопка с пропсами рендерится без ошибок", () => {
    const tree = renderer.create(<Button {...buttonProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка без текста и в состоянии disabled рендерится без ошибок", () => {
    const tree = renderer.create(<Button text={""} disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Тестируем обработчик onClick, при клике меняется состояние и появляется индикация загрузки", () => {
    render(<ButtonTestComponent />);

    // Находим и проверяем кнопку
    const buttonElement = screen.getByTestId("button-test");
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.tagName).toBe("BUTTON");
    expect(buttonElement).toHaveTextContent("Text");

    // Кликаем по кнопке
    fireEvent.click(buttonElement);

    // После клика на кнопке должна появиться иконка загрузки
    const loaderIcon = screen.getByTestId("svg-loader");
    expect(loaderIcon).toBeTruthy();
    expect(loaderIcon.tagName).toBe("IMG");
  });
});
