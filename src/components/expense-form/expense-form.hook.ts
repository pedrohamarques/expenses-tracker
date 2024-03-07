import { useState } from "react";

import type { ExpenseDataProps } from "@typings/data";

type InputFieldProps = {
  value: string;
  isValid: boolean;
};

type InputValuesProps = {
  amount: InputFieldProps;
  date: InputFieldProps;
  description: InputFieldProps;
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
    date: defaultValues?.date ? defaultValues?.date.toISOString().slice(0, 10) : '',
    description: defaultValues?.description,
  };

  const [inputValues, setInputValues] = useState<InputValuesProps>({
    amount: {
      value: defaultValues ? formattedDefaultValues.amount! : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? formattedDefaultValues.date! : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? formattedDefaultValues.description! : "",
      isValid: true,
    },
  });

  function inputChangeHandler(
    inputIdentifier: keyof InputValuesProps,
    enteredValue: string,
  ) {
    setInputValues((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: Number(inputValues.amount.value),
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((currentInputs) => ({
        amount: { value: currentInputs.amount.value, isValid: amountIsValid },
        date: { value: currentInputs.date.value, isValid: dateIsValid },
        description: {
          value: currentInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));

      return;
    }
    onSubmit(expenseData);
  }
  return {
    inputChangeHandler,
    inputValues,
    submitHandler,
  };
}
