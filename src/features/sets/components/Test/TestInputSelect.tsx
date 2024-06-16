import {
  FormItem,
  FormControl,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { FC, ReactNode } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { QuestionFormSchema } from "../../types";
import useKeyDown from "@/hooks/useKeyDown";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionState } from "../../providers/TestProvider";
import { Check, X } from "lucide-react";
import { clearText } from "@/lib/utils";

interface TestInputSelectProps {
  control: Control<QuestionFormSchema>;
  setValue: UseFormSetValue<QuestionFormSchema>;
  options: { value: string; isCorrect: boolean }[];
  state: QuestionState;
  givenAnswer?: string;
}

interface InputResultIconProps {
  state: QuestionState;
  value: string;
  givenAnswer?: string;
  isCorrect: boolean;
  idle: ReactNode;
  correct: ReactNode;
  error: ReactNode;
}

const InputResultIcon: FC<InputResultIconProps> = ({
  state,
  value,
  givenAnswer,
  isCorrect,
  idle,
  correct,
  error,
}) => {
  if (state === "idle") return idle;

  const isMatch =
    clearText(value).toLowerCase() === clearText(givenAnswer).toLowerCase();

  if (!isMatch && !isCorrect) {
    return idle;
  }

  return isMatch ? (isCorrect ? correct : error) : isCorrect ? correct : null;
};

const TestInputSelect: FC<TestInputSelectProps> = ({
  control,
  setValue,
  options,
  state,
  givenAnswer,
}) => {
  const changeValue = (index: number) => {
    if (state === "idle") {
      setValue("answer", options[index].value);
    }
  };

  useKeyDown("Digit1", () => changeValue(0));
  useKeyDown("Digit2", () => changeValue(1));
  useKeyDown("Digit3", () => changeValue(2));
  useKeyDown("Digit4", () => changeValue(3));

  return (
    <FormField
      control={control}
      name="answer"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {options.map((option, i) => (
                <FormItem key={option.value}>
                  <FormControl>
                    <RadioGroupItem
                      className="peer hidden"
                      value={option.value}
                      disabled={state !== "idle"}
                    />
                  </FormControl>
                  <FormLabel className="border border-border p-3 rounded-sm flex items-center gap-2 h-full transition-colors cursor-pointer hover:bg-gray-50 peer-aria-checked:bg-muted dark:border-slate-600 dark:hover:bg-slate-700 dark:peer-aria-checked:bg-slate-800">
                    <InputResultIcon
                      state={state}
                      value={option.value}
                      givenAnswer={givenAnswer}
                      isCorrect={option.isCorrect}
                      idle={
                        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 dark:bg-gray-700 peer-disabled:opacity-100">
                          <span>{i + 1}</span>
                        </span>
                      }
                      correct={
                        <span className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                          <Check className="w-6 h-6 text-white" />
                        </span>
                      }
                      error={
                        <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                          <X className="w-6 h-6 text-white" />
                        </span>
                      }
                    />
                    {option.value}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TestInputSelect;
