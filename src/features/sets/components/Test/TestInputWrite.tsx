import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, useEffect, useRef } from "react";
import { QuestionState } from "../../providers/TestProvider";
import { Control } from "react-hook-form";
import { QuestionFormSchema } from "../../types";

interface TestInputWriteProps {
  control: Control<QuestionFormSchema>;
  state: QuestionState;
}

const TestInputWrite: FC<TestInputWriteProps> = ({ state, control }) => {
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

export default TestInputWrite;
