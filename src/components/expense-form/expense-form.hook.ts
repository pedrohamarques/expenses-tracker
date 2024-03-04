import { useState } from "react";

type InputValuesProps = {
  amount: string;
  date: string;
  description: string;
};

export type ExpenseDataProps = {
  amount: number;
  date: Date;
  description: string;
};

type UseExpenseFormProps = {
  onSubmit: ({ amount, date, description }: ExpenseDataProps) => void;
};

export function useExpenseForm({ onSubmit }: UseExpenseFormProps) {
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

  function submitHandler() {
    const expenseData = {
      amount: Number(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }
  return {
    inputChangeHandler,
    inputValues,
    submitHandler,
  };
}
