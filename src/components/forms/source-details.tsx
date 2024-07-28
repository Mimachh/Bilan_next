"use client";
import { getSourcesByStatId, upsertSources } from "@/actions/dashboard/sources";
import { useModal } from "@/providers/modal-provider";
import { StatAndSourceSchema } from "@/schemas/admin/statistic-schema";
import { SourceDataTable } from "@/types/source";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import Loading from "../global/loading";

const SourceDetails = () => {
  const { data, setClose } = useModal();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sources, setSources] = useState<SourceDataTable[] | []>([]);

  
  const form = useForm<z.infer<typeof StatAndSourceSchema>>({
    resolver: zodResolver(StatAndSourceSchema),
    defaultValues: {
      id: data.stat?.id || undefined,
      sources: [
        {
          id: undefined,
          url: "",
          name: "",
          description: "",
          statistiqueId: data.stat?.id || undefined,
        },
      ],
    },
  });

  useEffect(() => {
    if (!data.stat?.id) return;
    const fetchSources = async (id: number) => {
      setLoading(true);
      const fetchedSources = await getSourcesByStatId(id);
      setSources(fetchedSources);
      form.reset({
        id: data.stat?.id || undefined,
        sources:
          fetchedSources.length > 0
            ? fetchedSources.map((s) => ({
                id: s.id || undefined,
                name: s.name || "",
                url: s.url || "",
                description: s.description || "",
                statistiqueId: data.stat?.id || undefined,
              }))
            : [
                {
                  id: undefined,
                  url: "",
                  name: "",
                  description: "",
                  statistiqueId: data.stat?.id || undefined,
                },
              ],
      });
      setLoading(false);
    };
    fetchSources(data.stat?.id);
  }, [data.stat?.id, form]);

  const onSubmit = (values: z.infer<typeof StatAndSourceSchema>) => {
    setError("");
    startTransition(() => {
      upsertSources(values)
        .then((d) => {
          if (d?.error) {
            form.reset();
            setError(d.error);
          }
          if (d?.success) {
            form.reset();
            setClose();
            router.refresh();
            toast.success("Category created or updated successfully");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sources",
  });

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center">
            <Loading />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger>Source n° {index + 1}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 px-2">
                      <FormField
                        control={form.control}
                        name={`sources.${index}.id`}
                        render={({ field }) => (
                          <FormItem className="sr-only">
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={true}
                                readOnly={true}
                                placeholder="Id"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name={`sources.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Titre</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="Titre de la source"
                                />
                              </FormControl>
                              <FormDescription>
                                Le titre apparaitra sous forme de lien
                                cliquable.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sources.${index}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="Titre de la source"
                                />
                              </FormControl>
                              <FormDescription>
                                Lien s'il y en a un, vers la source.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`sources.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Description de la source"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Informations supplémentaires concernant la source.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <Trash size={20} />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}

            <div className="w-full flex justify-end">
              <Button
                type="button"
                variant={"secondary"}
                className="flex items-center gap-2"
                onClick={() => {
                  append({
                    id: undefined,
                    url: "",
                    name: "",
                    description: "",
                    statistiqueId: data.stat?.id || 0,
                  });
                }}
              >
                <Plus size={20} /> Ajouter une nouvelle source
              </Button>
            </div>
            <Separator />
            <SubmitButton className="w-full" type="submit">
              Enregistrer
            </SubmitButton>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SourceDetails;
