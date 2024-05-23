import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useKeyDown from "@/hooks/useKeyDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

export const defaultQuestionTypes = ["multiple-choice", "write"];

const selectTypesFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export type SelectTypesForm = z.infer<typeof selectTypesFormSchema>;

interface SetQuizStartProps {
  onSubmit: (values: SelectTypesForm) => void;
  types?: string[];
}

const SetQuizStart: FC<SetQuizStartProps> = ({ onSubmit, types }) => {
  const form = useForm<SelectTypesForm>({
    resolver: zodResolver(selectTypesFormSchema),
    defaultValues: {
      items: types ?? defaultQuestionTypes,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useKeyDown("Enter", () =>
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    )
  );

  return (
    <div className="w-full grow flex items-center justify-center">
      <Form {...form}>
        <form
          ref={formRef}
          className="w-46 space-y-5 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h5 className="font-medium text-2xl text-center">Quiz</h5>
          <FormLabel>Choose question types:</FormLabel>
          <div className="space-y-3">
            {defaultQuestionTypes.map((item) => (
              <FormField
                key={item}
                control={form.control}
                name="items"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item)}
                          onCheckedChange={(checked: boolean) => {
                            return checked
                              ? field.onChange([...field.value, item])
                              : field.onChange(
                                  field.value?.filter((value) => value !== item)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <Button className="w-full">Start test</Button>
        </form>
      </Form>
    </div>
  );
};

export default SetQuizStart;
