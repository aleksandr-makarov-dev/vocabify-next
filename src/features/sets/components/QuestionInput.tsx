import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { QuestionFormSchema } from "@/features/sets/types";
import { FC, useEffect, useRef } from "react";
import { Control } from "react-hook-form";
import { QuestionState } from "./SetQuizQuestion";
import { Input } from "@/components/ui/input";

interface QuestionInputProps {
  control: Control<QuestionFormSchema>;
  state: QuestionState;
}

const QuestionInput: FC<QuestionInputProps> = ({ control, state }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && state === "idle") {
      inputRef.current.focus();
    }
  }, [state]);

  return (
    <FormField
      control={control}
      name="answer"
      render={({ field: { ref, ...other } }) => {
        return (
          <FormItem className="space-y-3">
            <FormControl>
              <Input
                ref={inputRef}
                autoFocus
                disabled={state !== "idle"}
                {...other}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default QuestionInput;
