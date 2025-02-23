"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/schemas";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { toast } from "sonner";
import { contact } from "@/actions/contact";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useModal } from "@/providers/modal-provider";

const ContactForm = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();
      const { setClose } = useModal();
  const [error, setError] = useState<string | undefined>("");
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

  const [loading, setLoading] = React.useState(false);
  const options = [
    { value: "1", label: "Question" },
    { value: "2", label: "Réclamation" },
    { value: "3", label: "Autre" },
  ]

  const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
    setLoading(true);
    setError("");
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
      contact(values)
        .then((d) => {
          if (d?.error) {
            form.reset();
            setError(d.error);
          }

          if (d?.success) {
            form.reset();
            toast.success("Message envoyé avec succès !");
            setClose();
          }
        })
        .catch(() => {
          toast.success("Une erreur s'est produite veuillez réessayer plus tard !");
        });
    } else {

    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <div className="md:h-[300px] flex justify-center items-center">
        <Loader2 size={48} className="text-neutral-800 animate animate-spin" />
      </div> : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-4 relative w-full md:h-fit space-y-5"
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      Votre Nom
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="py-3 h-10 w-full bg-muted text-neutral-900 border-none"
                        disabled={form.formState.isSubmitting}
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
                    <FormLabel className="sr-only">
                      Votre Prénom
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="py-3 h-10 w-full bg-muted text-neutral-900 border-none"
                        disabled={form.formState.isSubmitting}
                        placeholder="Votre prénom"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      className="py-3 h-10 w-full bg-muted text-neutral-900 border-none"
                      disabled={form.formState.isSubmitting}
                      placeholder="Votre mail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="object"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Objet de votre demande</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 h-10 w-full bg-muted text-neutral-900 border-none">
                          <SelectValue placeholder="Choisissez un objet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.label}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Votre message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Votre message"
                      className="py-3 h-10 w-full bg-muted text-neutral-900 border-none"
                      {...field}
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
                    className="text-neutral-800 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                  />
                </FormControl>
                <div className="text-neutral-800 space-y-1 leading-none font-thin font-sans">
                  <FormLabel>
                    J'accepte les{" "}
                    {/* FIXME: */}
                    <Link className="underline" href="#FIXME">
                      CGU
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
            <Button variant={"primaryColor"} className="w-full">Envoyer</Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default ContactForm;
