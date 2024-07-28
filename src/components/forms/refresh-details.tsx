"use client";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
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
import SubmitButton from "../ui/submit-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RefreshSchema } from "@/schemas/admin/refresh-schema";
import { upsertRefresh } from "@/actions/dashboard/refresh";

const RefreshDetails = () => {
  const { data, setClose } = useModal();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RefreshSchema>>({
    resolver: zodResolver(RefreshSchema),
    defaultValues: {
      id: data.refresh?.id || undefined,
      name: data.refresh?.name || "",
      value: data.refresh?.value || 0,
    },
  });

  const onSubmit = (values: z.infer<typeof RefreshSchema>) => {
    setError("");

    startTransition(() => {
        upsertRefresh(values)
          .then((d) => {
            if (d?.error) {
              form.reset();
              setError(d.error);
            }
            if (d?.success) {
              form.reset();
              setClose()
              router.refresh()
              toast.success("Category created or updated successfully");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {}, [data]);
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Nom du refresh"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valeur</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Valeur du refresh"
                    {...field}
                    value={field.value.toString()}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            type="submit"
            disabled={form.formState.isSubmitting || isPending}
          >
            Enregistrer
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RefreshDetails;
