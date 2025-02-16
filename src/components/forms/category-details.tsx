"use client";
import { useModal } from "@/providers/modal-provider";
import { CategorySchema } from "@/schemas/admin/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-button";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { createCategory } from "@/actions/dashboard/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CategoryDetails = () => {
  const { data, setClose } = useModal();
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const [error, setError] = useState<string | undefined>("");


  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      id: data.category?.id || undefined,
      name: data.category?.name || "",
      description: data.category?.description || "",
      titleSeo: data.category?.titleSeo || "",
      descriptionSeo: data.category?.descriptionSeo || "",
      keywordsSeo: data.category?.keywordsSeo || "",
      isActive: data.category?.isActive || false,
      isFeatured: data.category?.isFeatured || false,
    },
  });

  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    setError("");

    
    startTransition(() => {
     createCategory(values)
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

  useEffect(() => {
    if (data.category) {
      //   const fetchDetails = async () => {
      //     const response = await getAuthUserDetails();
      //     if (response) setAuthUserData(response);

      //   };
      //   fetchDetails();
      // console.log(data.category);
    }
  }, [data]);
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
                    placeholder="Nom de la catégorie"
                  />
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
                  <Textarea
                    placeholder="Décrivez la catégorie"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actif ?</FormLabel>
                <FormControl>
                  <Switch
                    className="ml-5"
                    disabled={form.formState.isSubmitting}
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured ?</FormLabel>
                <FormControl>
                  <Switch
                    className="ml-5"
                    disabled={form.formState.isSubmitting}
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

     

          <Accordion type="single" collapsible className="w-full bg-gray-50 rounded-md">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-3 py-2">
                <h2 className="font-semibold text-lg">Partie SEO</h2>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 px-3 py-4">
                <FormField
                  control={form.control}
                  name="titleSeo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre SEO</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Titre SEO"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywordsSeo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mots clés SEO</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Mots clés SEO"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descriptionSeo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description SEO</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description pour le référencement"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SubmitButton type="submit" disabled={form.formState.isSubmitting || isPending}>Enregistrer</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default CategoryDetails;
