import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Import } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { MAX_FILE_SIZE, setImportFormSchema } from "../schemas";
import { SetImportFormSchema } from "../types";

interface SetImportFormProps {
  onSubmit: (values: SetImportFormSchema) => void;
  isLoading?: boolean;
}

const SetImportForm: FC<SetImportFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<SetImportFormSchema>({
    resolver: zodResolver(setImportFormSchema),
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  type="file"
                  placeholder="Choose file"
                  accept={".html"}
                  size={MAX_FILE_SIZE}
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>Import</Button>
      </form>
    </Form>
  );
};

export default SetImportForm;
