import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Import } from "lucide-react";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { MAX_FILE_SIZE, setImportFormSchema } from "../schemas";
import { SetImportFormSchema } from "../types";

interface SetImportFormProps {
  onSubmit: (values: SetImportFormSchema) => void;
  isLoading?: boolean;
}

const SetImportForm: FC<SetImportFormProps> = ({ onSubmit, isLoading }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<SetImportFormSchema>({
    resolver: zodResolver(setImportFormSchema),
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem className="w-full">
              <FormLabel>Import from file</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={".html"}
                  size={MAX_FILE_SIZE}
                  onChange={(event) => {
                    if (event.target.files) {
                      onChange(event.target.files[0]);
                      formRef.current?.dispatchEvent(
                        new Event("submit", {
                          cancelable: true,
                          bubbles: true,
                        })
                      );
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SetImportForm;
