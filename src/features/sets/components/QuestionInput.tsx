import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { QuestionFormSchema } from "@/features/sets/types";
import { FC } from "react";
import { Control } from "react-hook-form";
import { QuestionState } from "./SetQuizQuestion";
import { Input } from "@/components/ui/input";

interface QuestionInputProps {
  control: Control<QuestionFormSchema>;
  state: QuestionState;
}

const QuestionInput: FC<QuestionInputProps> = ({ control, state }) => {
  return (
    <FormField
      control={control}
      name="answer"
      render={({ field }) => {
        return (
          <FormItem className="space-y-3">
            <FormControl>
              <Input autoFocus disabled={state !== "idle"} {...field} />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default QuestionInput;
