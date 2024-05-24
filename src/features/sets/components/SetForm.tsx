import { FC } from "react";
import { SetFormSchema } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setFormSchema } from "../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import List from "@/components/common/List";
import TermContent from "@/features/terms/components/TermContent";
import Card from "@/components/common/Card";

interface SetFormProps {
  set?: SetFormSchema;
  isLoading?: boolean;
  edit?: boolean;
  onSubmit: (values: SetFormSchema) => void;
  onCancel: () => void;
}

const SetForm: FC<SetFormProps> = ({
  set,
  isLoading,
  edit,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<SetFormSchema>({
    resolver: zodResolver(setFormSchema),
    defaultValues: {
      title: "",
      description: "",
      textLang: "",
      definitionLang: "",
    },
    values: set,
  });

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:grid md:grid-cols-2 space-x-0 md:space-x-3 space-y-3 md:space-y-0">
          <FormField
            control={form.control}
            name="textLang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text Language</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    placeholder="Choose text language"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="definitionLang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Definition Language</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    placeholder="Choose definition language"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms</FormLabel>
              <FormControl>
                <List
                  className="flex flex-col gap-3"
                  items={field.value}
                  render={(field) => (
                    <Card key={field.text}>
                      <TermContent {...field} />
                    </Card>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Button disabled={isLoading || form.formState.isDirty}>
            {edit ? "Save changes" : "Create"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SetForm;
