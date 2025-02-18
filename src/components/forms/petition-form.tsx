"use client";

import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { PetitionSchema } from "@/schemas";
import { signPetition } from "@/actions/petition";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PetitionForm = () => {
  const [isPending, startTransition] = useTransition();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof PetitionSchema>>({
    resolver: zodResolver(PetitionSchema),
    defaultValues: {
      email: "",
      lastName: "",
      firstName: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof PetitionSchema>) => {
    if (!executeRecaptcha) {
      console.log("not available to execute recaptcha");
      return;
    }
    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");
    // startTransition(() => {});
    const response = await axios({
      method: "post",
      url: "/api/recaptcha",
      data: {
        gRecaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.success === true) {
      console.log(`Success with score: ${response?.data?.score}`);
      startTransition(() => {
        signPetition(values)
          .then((d) => {
            if (d?.error) {
              form.reset();
              console.log(d.error);
              setError(d.error);
            }

            if (d?.success) {
              form.reset();
              router.refresh();
              toast.success("Merci de votre signature");
            }
          })
          .catch(() => {
            console.log('erreur')
            setError("Something went wrong")
          });
      });
    } else {
      console.log(`Failure with score: ${response?.data?.score}`);
    }
  };
  return (
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                  <FormLabel>J'accepte les conditions d'utilisation</FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-6">
            <Button variant={"primaryColor"} size={"xl"} className="text-md">
              Je signe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PetitionForm;
