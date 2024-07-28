"use client";
import { useModal } from "@/providers/modal-provider";
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

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatisticSchema } from "@/schemas/admin/statistic-schema";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { upsertStat } from "@/actions/dashboard/stats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CategoryDataTable } from "@/types/category";
import { getCategoriesFromAdmin } from "@/actions/dashboard/categories";
import { getRefreshesFromAdmin } from "@/actions/dashboard/refresh";
import { RefreshDataTable } from "@/types/refresh";

const StatDetails = () => {
  const { data, setClose } = useModal();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");

  const [categories, setCategories] = useState<CategoryDataTable[] | []>([]);
  const [refreshes, setRefreshes] = useState<RefreshDataTable[] | []>([]);
  useEffect(() => {
    const fetchCat = async () => {
      await getCategoriesFromAdmin().then((d) => {
        setCategories(d);
      });
    };

    fetchCat();

    const fetchRefresh = async () => {
        await getRefreshesFromAdmin().then((d) => {
            setRefreshes(d);
        })
    }

    fetchRefresh(); 
  }, []);

  const form = useForm<z.infer<typeof StatisticSchema>>({
    resolver: zodResolver(StatisticSchema),
    defaultValues: {
      id: data.stat?.id || undefined,
      name: data.stat?.name || "",
      stat_reference_previous_year:
        data.stat?.stat_reference_previous_year || undefined,
      has_starting_stat_to_add: data.stat?.has_starting_stat_to_add || false,
      starting_stat_to_add: data.stat?.starting_stat_to_add || undefined,
      comment: data.stat?.comment || "",
      //   sources Source[]
      isActive: data.stat?.isActive || true,
      isPrice: data.stat?.isPrice || false,
      isStatic: data.stat?.isStatic || false,
      isFeatured: data.stat?.isFeatured || false,
      categoryId: data.stat?.categoryId || "",
      refreshId: data.stat?.refreshId || "",
    },
  });

  const onSubmit = (values: z.infer<typeof StatisticSchema>) => {
    setError("");
    startTransition(() => {
      upsertStat(values)
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

  const watchHasStartingStatToAdd = form.watch("has_starting_stat_to_add");
  const watchStatic = form.watch("isStatic");
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
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Titre de la statistique"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="isPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>C'est un prix ?</FormLabel>
                <FormControl>
                  <Switch
                    className="ml-5"
                    disabled={form.formState.isSubmitting}
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e);
                      if (e === false) {
                        form.setValue("isPrice", false);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Est ce que ce compteur est un prix ? Cela influera sur la façon de l'afficher sur le site.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />

          <FormField
            control={form.control}
            name="isStatic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compteur statique ?</FormLabel>
                <FormControl>
                  <Switch
                    className="ml-5"
                    disabled={form.formState.isSubmitting}
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e);
                      if (e === false) {
                        form.setValue("has_starting_stat_to_add", false);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Si ce compteur n'est pas dynamique et qu'il s'agit d'un simple
                  chiffre à afficher cochez oui.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />

          <FormField
            control={form.control}
            name="stat_reference_previous_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valeur de l'année précédente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Valeur de l'année précédente"
                    {...field}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  Cette valeur sert de base de calcul pour savoir de quelle
                  manière incrémenter les compteurs. Il doit s'agir de la valeur
                  totale sur l'année précédente. <br /> Exemple en 2022 il y a
                  eu 120 attaques au couteau par jour. Je fais donc 120*365 pour
                  obtenir la valeur totale de l'année précédente. Et je
                  l'indique ici.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          {!watchStatic && (
            <>
              <FormField
                control={form.control}
                name="has_starting_stat_to_add"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stat de départ ?</FormLabel>
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
                    <FormDescription>
                      Si ce compteur doit cumuler un chiffre précédent répondre
                      oui.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchHasStartingStatToAdd && (
                <FormField
                  control={form.control}
                  name="starting_stat_to_add"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valeur du chiffre de départ ?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Valeur de départ"
                          {...field}
                          value={field.value?.toString() || ""}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription>
                        Cette valeur sert de base de calcul pour savoir de
                        quelle manière incrémenter les compteurs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Separator />
            </>
          )}

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

          <Separator />

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
          <Separator />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commentaire</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ajouter une description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Si vous souhaitez ajouter un élément pour préciser ce
                  compteur.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

         <div className="flex items-center gap-3 w-full">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Catégorie</FormLabel>
                <Select
                  disabled={isPending || form.formState.isSubmitting}
                  // onValueChange={(value) => field.onChange(Number(value))}
                  onValueChange={(value) =>
                    field.onChange(value === "0" ? null : value)
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Choisir une catégorie"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectItem value="0">-</SelectItem> */}
                    {categories?.map((cat) => (
                      <SelectItem className="hover:bg-gray-50 transition-all cursor-pointer" key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="refreshId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Rafraichisseur</FormLabel>
                <Select
                  disabled={isPending || form.formState.isSubmitting}
                  // onValueChange={(value) => field.onChange(Number(value))}
                  onValueChange={(value) =>
                    field.onChange(value === "0" ? null : value)
                  }
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Choisir un rafraichisseur"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectItem value="0">-</SelectItem> */}
                    {refreshes?.map((refresh) => (
                      <SelectItem className="hover:bg-gray-50 transition-all cursor-pointer" key={refresh.id} value={refresh.id}>
                        {refresh.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
         </div>
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

export default StatDetails;
