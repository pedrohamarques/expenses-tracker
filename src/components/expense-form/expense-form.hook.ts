import { useState } from "react";

type InputValuesProps = {
  amount: string;
  date: string;
  description: string;
};

export function useExpenseForm() {
  const [inputValues, setInputValues] = useState<InputValuesProps>({
    amount: "",
    date: "",
    description: "",
  });

  function inputChangeHandler(
    inputIdentifier: keyof InputValuesProps,
    enteredValue: string,
  ) {
    setInputValues((currentValues) => ({
      ...currentValues,
      [inputIdentifier]: enteredValue,
    }));
  }
  return {
    inputChangeHandler,
    inputValues,
  };
}
