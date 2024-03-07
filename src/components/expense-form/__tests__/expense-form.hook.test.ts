import { act, renderHook } from "@testing-library/react-native";
import { useExpenseForm } from "../expense-form.hook";
import { returnInputValuesFormatted } from "./fixture";

const mockHookValue = {
  onSubmit: jest.fn(),
  defaultValues: {
    amount: 10,
    date: new Date('2020-10-10 03:00'),
    description: 'Some description'
  }
}

describe('components/expense-form/useExpenseForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('returns default values formatted when hook is called', () => {
    const { result } = renderHook(() => useExpenseForm(mockHookValue));

    expect(result.current.inputValues).toEqual(returnInputValuesFormatted)
  })

  it('submits the data when submitHandler is called and the data is correct', () => {
    const { result } = renderHook(() => useExpenseForm(mockHookValue));

    act(() => result.current.submitHandler())

    expect(mockHookValue.onSubmit).toHaveBeenCalledTimes(1);
  })

  it('does not submit the data when submitHandler is called and the amount is invalid', () => {
    const mockAmountInvalid = {
      ...mockHookValue, defaultValues: {
        ...mockHookValue.defaultValues,
        amount: 'Not a number'

      }
    }
    //@ts-expect-error to prevent typing error
    const { result } = renderHook(() => useExpenseForm(mockAmountInvalid));

    act(() => result.current.submitHandler())

    expect(mockHookValue.onSubmit).not.toHaveBeenCalledTimes(1);

    expect(result.current.inputValues).toEqual({
      amount: {
        value: "Not a number",
        isValid: false,
      },
      date: {
        value: '2020-10-10',
        isValid: true
      },
      description: {
        value: 'Some description',
        isValid: true,
      }
    })
  })

  it('does not submit the data when submitHandler is called and the date is invalid', () => {
    const mockDateInvalid = {
      ...mockHookValue, defaultValues: {
        amount: 10,
        description: 'Some description'
      }
    }

    //@ts-expect-error to prevent typing error
    const { result } = renderHook(() => useExpenseForm(mockDateInvalid));

    act(() => result.current.submitHandler())

    expect(mockHookValue.onSubmit).not.toHaveBeenCalledTimes(1);

    expect(result.current.inputValues).toEqual({
      amount: {
        value: "10",
        isValid: true,
      },
      date: {
        value: '',
        isValid: false
      },
      description: {
        value: 'Some description',
        isValid: true,
      }
    })
  })

  it('does not submit the data when submitHandler is called and description is invalid', () => {
    const mockInvalidDescription = {
      ...mockHookValue, defaultValues: {
        ...mockHookValue.defaultValues,
        description: ''
      }
    }

    const { result } = renderHook(() => useExpenseForm(mockInvalidDescription));

    act(() => result.current.submitHandler())

    expect(mockHookValue.onSubmit).not.toHaveBeenCalledTimes(1);

    expect(result.current.inputValues).toEqual({
      amount: {
        value: "10",
        isValid: true,
      },
      date: {
        value: '2020-10-10',
        isValid: true
      },
      description: {
        value: '',
        isValid: false,
      }
    })
  })

  it('does not submit the data when submitHandler is called and there is no data', () => {
    const mockEmptyData = {
      onSubmit: jest.fn(),
    }

    const { result } = renderHook(() => useExpenseForm(mockEmptyData));

    act(() => result.current.submitHandler())

    expect(mockHookValue.onSubmit).not.toHaveBeenCalledTimes(1);

    expect(result.current.inputValues).toEqual({
      amount: {
        value: "",
        isValid: false,
      },
      date: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false,
      }
    })
  })

  it('changes inputValues when inputChangeHandler is called with a new value', () => {
    const { result } = renderHook(() => useExpenseForm(mockHookValue))

    expect(result.current.inputValues).toEqual(returnInputValuesFormatted)

    act(() => result.current.inputChangeHandler('amount', '15'))

    expect(result.current.inputValues).toEqual({
      amount: {
        value: '15',
        isValid: true,
      },
      date: {
        value: '2020-10-10',
        isValid: true
      },
      description: {
        value: 'Some description',
        isValid: true,
      }
    })
  })
})
