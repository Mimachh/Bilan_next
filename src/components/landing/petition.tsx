"use client";
import React, { useTransition } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const PetitionSchema = z.object({
  email: z.string().email(),
  lastName: z.string(),
  firstName: z.string(),
  terms: z.boolean(),
});

const Petition = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof PetitionSchema>>({
    resolver: zodResolver(PetitionSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PetitionSchema>) => {
    // setError("");
    // setSuccess("");

    startTransition(() => {});
  };

  return (
    <div className="bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 ">
        <h4 className="mb-24 text-center text-white text-2xl font-normal">
          Face au déclassement, face à l'insécurité, face à l'effondrement de
          notre économie... <br />
          <span className="uppercase font-5xl font-extrabold">
            FACE AU CHAOS
          </span>
        </h4>

        <div className="flex gap-2 my-8">
          <div className="">
            <div className="w-full h-[580px] relative">
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <Image
                className="w-full h-full object-cover"
                src={"/assets/hanouna.png"}
                width={650}
                priority
                height={900}
                alt="Macron"
              />
            </div>
          </div>
          <div className="h-uto flex items-center">
            <div className="py-12 bg-white rounded-2xl p-5 flex flex-col items-center">
              <h4 className="mb-8 text-3xl font-bold font-madeTommy  gradient_primary_text">
                Signez notre pétition :{" "}
              </h4>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="relative w-full md:w-fit h-fit space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Votre nom</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className={cn(
                              "rounded-full py-5 h-12 w-full md:w-[450px] bg-muted  border-none"
                            )}
                            disabled={isPending || form.formState.isSubmitting}
                            placeholder="Votre nom"
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 right-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Votre prénom</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className={cn(
                              "rounded-full py-5 h-12 w-full md:w-[450px] bg-muted  border-none"
                            )}
                            disabled={isPending || form.formState.isSubmitting}
                            placeholder="Votre prénom"
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 right-2" />
                      </FormItem>
                    )}
                  />
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
                              "rounded-full py-5 h-12 w-full md:w-[450px] bg-muted  border-none"
                            )}
                            disabled={isPending || form.formState.isSubmitting}
                            placeholder="Votre mail"
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-5 right-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="pt-3 flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            J'accepte les conditions d'utilisation
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-6">
                    <Button
                      variant={"primaryColor"}
                      size={"xl"}
                      className="text-md"
                    >
                      Je signe
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petition;
