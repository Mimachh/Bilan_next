"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NewsletterSchema = z.object({
  email: z.string().email(),
});

interface Props {
  inputClassNames?: string;
}
const NewsletterForm = (props: Props) => {
  const { inputClassNames } = props;
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewsletterSchema>>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewsletterSchema>) => {
    // setError("");
    // setSuccess("");

    startTransition(() => {});
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full md:w-fit h-fit"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Votre mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="mail"
                    className={cn("rounded-full py-5 h-12 w-full md:w-[450px] bg-neutral-800 text-neutral-200 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none", inputClassNames)}
                    disabled={isPending || form.formState.isSubmitting}
                    placeholder="Votre mail"
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-5 right-2" />
              </FormItem>
            )}
          />

          {/* <Button size={"sm"} className="px-5 rounded-full bg-black border border-gray-200 absolute top-1/2 -translate-y-1/2 right-0.5 h-10">
          Je m&apos;inscris
        </Button> */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0.5 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-2 text-xs h-10"
            >
              <span>Je m'inscris</span>
              <ArrowRight size={14} />
            </HoverBorderGradient>
          </div>
        </form>
      </Form>
      <p className="text-[12px] text-gray-300 tracking-tight mt-3 pl-2">
        En vous inscrivant vous acceptez les CGU
      </p>
    </>
  );
};

export default NewsletterForm;
