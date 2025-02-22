import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/schemas";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      terms: false,
      lastName: "",
      firstName: "",
      object: "",
      message: "",
    },
  });


  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    // setError("");

    
    // startTransition(() => {
    //  createCategory(values)
    //     .then((d) => {
    //       if (d?.error) {
    //         form.reset();
    //         setError(d.error);
    //       }

    //       if (d?.success) {
    //         form.reset();
    //         setClose()
    //         router.refresh()
    //         toast.success("Category created or updated successfully");
    //       }
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });

  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="border border-primaryColor/20 rounded-md p-12">
        <h3 className="text-2xl font-bold mb-8 text-white/60">
          Nous contacter
        </h3>
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
                      className={cn(
                        "rounded-full py-5 h-12 w-full md:w-[450px] bg-neutral-800 text-neutral-200 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none",

                      )}
                      disabled={form.formState.isSubmitting}
                      placeholder="Votre mail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Input type="text" placeholder="Nom" className="w-full mb-4" />
        <Input type="text" placeholder="Prénom" className="w-full mb-4" />
        <Input type="email" placeholder="Email" className="w-full mb-4" />
        <Input type="text" placeholder="Objet" className="w-full mb-4" />
        <textarea placeholder="Message" className="w-full mb-4 h-32"></textarea>
        <Button>Envoyer</Button>
      </div>
    </div>
  );
};

export default ContactForm;
