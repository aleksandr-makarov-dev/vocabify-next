import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { QuestionFormSchema } from "@/features/sets/types";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { QuestionState } from "./SetQuizQuestion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useKeyDown from "@/hooks/useKeyDown";

interface QuestionSelectProps {
  control: Control<QuestionFormSchema>;
  options: { value: string; isCorrect: boolean }[];
  state: QuestionState;
  setValue: UseFormSetValue<QuestionFormSchema>;
}

const QuestionSelect: FC<QuestionSelectProps> = ({
  options,
  control,
  state,
  setValue,
}) => {
  useKeyDown("Digit1", () => {
    setValue("answer", options[0].value);
  });
  useKeyDown("Digit2", () => {
    setValue("answer", options[1].value);
  });
  useKeyDown("Digit3", () => {
    setValue("answer", options[2].value);
  });
  useKeyDown("Digit4", () => {
    setValue("answer", options[3].value);
  });

  return (
    <FormField
      control={control}
      name="answer"
      render={({ field }) => {
        return (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col sm:grid grid-cols-2 gap-3"
              >
                {options.map((option, i) => (
                  <FormItem
                    key={option.value}
                    className={cn("flex items-center space-x-3 space-y-0")}
                  >
                    <FormLabel
                      className={cn(
                        "font-normal cursor-pointer flex items-center gap-1.5 w-full p-5 rounded-md border border-border hover:bg-muted",
                        state !== "idle" &&
                          (option.isCorrect
                            ? "bg-green-100 border-green-600 hover:bg-green-100"
                            : "bg-red-100 border-red-600 hover:bg-red-100")
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem
                          disabled={state !== "idle"}
                          value={option.value}
                        />
                      </FormControl>
                      <span>[{i + 1}]</span>
                      <span>{option.value}</span>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default QuestionSelect;
