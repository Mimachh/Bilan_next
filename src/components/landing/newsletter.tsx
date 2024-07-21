"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import FramerMagnetic from "../global/FramerMagnetic";
import { FacebookLogo, TwitterLogo } from "../svg";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

const NewsletterSchema = z.object({
  email: z.string().email(),
});

const Newsletter = () => {
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
    <section className="bg-neutral-950 h-[35rem] md:h-[40rem]">
      <div className="flex-col flex items-center justify-center h-full w-full space-y-12">
        <div className="md:px-2 px-4 mx-auto w-full  md:max-w-4xl md:space-y-4">
          <div className="mt-[-43px] md:mt-0">
            <ul className="flex justify-center items-center md:w-md md:mb-6">
              <li className="">
                <FacebookLogo
                  className=" 
            text-[#c8bdb0] hover:text-primaryColor transition-all duration-300 cursor-pointer w-[85px] h-[85px] 
            p-[30px]
            "
                />
              </li>
              <li>
                <TwitterLogo
                  className=" 
            text-[#c8bdb0] hover:text-primaryColor transition-all duration-300 cursor-pointer w-[85px] h-[85px] 
            p-[30px]
            "
                />
              </li>
            </ul>
          </div>
          <h2
            className="gradient_primary_text font-bold text-3xl md:text-6xl text-center 
    "
          >
            Restez Informé
          </h2>
          <p className="text-center text-sm text-gray-300 w-full md:max-w-lg mx-auto">
            Inscrivez-vous à notre newsletter pour être informé des dernières
            actualités et des dernières stats.
          </p>
        </div>
        <div className="px-12 md:px-2 w-full md:w-fit max-w-lg mx-auto">
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
                        className="rounded-full py-5 h-12 w-full md:w-[450px] bg-neutral-900 text-neutral-200 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none"
                        disabled={isPending || form.formState.isSubmitting}
                        placeholder="Votre mail"
                      />
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 right-2" />
                  </FormItem>
                )}
              />

                <Button size={"sm"} className="px-5 rounded-full bg-black border border-gray-200 absolute top-1/2 -translate-y-1/2 right-0.5 h-10">
                  Je m'inscris
                </Button>
           
            </form>
          </Form>
          <p className="text-[12px] text-gray-300 tracking-tight mt-3 pl-2">
            En vous inscrivant vous acceptez les CGU
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
