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
import { NewsletterSchema } from "@/schemas";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { optin } from "@/actions/newsletter";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";

interface Props {
  inputClassNames?: string;
}
const NewsletterForm = (props: Props) => {
  const { inputClassNames } = props;
  const [isPending, startTransition] = useTransition();
const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm<z.infer<typeof NewsletterSchema>>({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: "",
      terms: false,
    },
  });

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof NewsletterSchema>) => {
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
      startTransition(() => {
        optin(values)
          .then((d) => {
            if (d?.error) {
              form.reset();
              console.log(d.error);
              toast.error(
                "Une erreur est survenue, veuillez réessayer plus tard."
              );
            }

            if (d?.success) {
              form.reset();
              router.refresh();
              toast.success("Vous êtes bien inscrit !");
            }
          })
          .catch(() => {
            console.log("erreur");
          });
      });
    } else {
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full md:w-fit h-fit"
        >
          <div className="relative w-full md:w-fit h-fit">
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
                        inputClassNames
                      )}
                      disabled={isPending || form.formState.isSubmitting}
                      placeholder="Votre mail"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 right-2" />
                </FormItem>
              )}
            />
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
          </div>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="pt-3 flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-neutral-800 text-neutral-200 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                  />
                </FormControl>
                <div className="text-muted/60 space-y-1 leading-none font-thin font-sans">
                  <FormLabel>
                    J'accepte les{" "}
                    <Link className="underline" href="#FIXME">
                      CGU
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default NewsletterForm;
