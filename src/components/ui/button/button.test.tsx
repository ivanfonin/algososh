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

describe("Проверка снапшота, проверка обработичка событий, состояния загрузки", () => {
  afterEach(cleanup);

  // Сравниваем со снапшотом
  it("Должна матчиться со снапшотом", () => {
    const ButtonComponent = renderer.create(<Button {...buttonProps} />);
    expect(ButtonComponent).toMatchSnapshot();
  });

  // Проверка работоспособности
  it("Должна обрабатывать клик, после клика менять состояние isLoader", async () => {
    render(<ButtonTestComponent />);

    // Находим кнопку
    const buttonElement = screen.getByTestId("button-test");
    // screen.debug(buttonElement);

    // Проверяем текст в кнопке
    expect(buttonElement).toHaveTextContent("Text");

    // Кликаем по кнопке
    fireEvent.click(buttonElement);

    // После клика на кнопке должна появиться иконка загрузки
    expect(screen.getByTestId("svg-loader")).toBeInTheDocument();
  });
});
