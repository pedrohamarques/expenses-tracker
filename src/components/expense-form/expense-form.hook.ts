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
  defaultValues?: ExpenseDataProps;
};

export function useExpenseForm({
  onSubmit,
  defaultValues,
}: UseExpenseFormProps) {
  const formattedDefaultValues = {
    amount: defaultValues?.amount.toString(),
    date: defaultValues?.date.toISOString().slice(0, 10),
    description: defaultValues?.description,
  };

  const [inputValues, setInputValues] = useState<InputValuesProps>({
    amount: defaultValues ? formattedDefaultValues.amount! : "",
    date: defaultValues ? formattedDefaultValues.date! : "",
    description: defaultValues ? formattedDefaultValues.description! : "",
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
