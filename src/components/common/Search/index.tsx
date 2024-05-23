import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search as SearchIcon } from "lucide-react";

const searchFormSchema = z.object({
  search: z.string().min(2),
});

export type SearchFormSchema = z.infer<typeof searchFormSchema>;

interface SearchProps {
  onSubmit: (values: SearchFormSchema) => void;
  onReset?: () => void;
  value?: string;
  placeholder?: string;
}

const Search: FC<SearchProps> = ({
  value,
  onSubmit,
  onReset,
  placeholder = "Search",
}) => {
  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: "",
    },
    values: {
      search: value ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Search</Button>
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
            onReset?.();
          }}
        >
          Clear
        </Button>
      </form>
    </Form>
  );
};

export default Search;
