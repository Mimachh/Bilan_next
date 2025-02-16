import { getCategoryBySlug } from "@/actions/root/category";
import { getActiveCountersByCategorySlug } from "@/actions/root/stat";
import { getCurrentYear } from "@/actions/root/year";
import Counter from "@/components/compteur/counter";
import { Metadata, ResolvingMetadata } from "next";

import React from "react";

type Props = {
  params: { categorySlug: string };
};

export async function generateMetadata(
  { params, 
    // searchParams 
  }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.categorySlug

 const category = await getCategoryBySlug(slug);
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: category ? category.name : 'Erreur',
    description: category ? category.descriptionSeo : 'Une erreur est survenue',
    keywords: category ? category.keywordsSeo : '',
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

const Page = async (props: Props) => {
  const { categorySlug } = props.params;
  const category = await getCategoryBySlug(categorySlug);
  const stats = await getActiveCountersByCategorySlug(categorySlug);
  const year = await getCurrentYear()
  const startOfYear = year?.value ? parseInt(year?.value) : 1672527600000
  const now = new Date().getTime();

  // WIP 
  // mettre en place un système de pagination inter categorie
  // peut être aussi une page index de catégories
  return (
    <div className="">
 
      {category ? (
        <>
        <div className="p-24 pb-10 bg-neutral-950 min-h-48 flex items-center justify-center">
          <h2 className="gradient_primary_text font-bold text-3xl md:text-6xl py-5">{category.name}</h2>
        </div>

        <div className="md:px-8 px-4 max-w-lg mx-auto space-y-12 py-24  bg-white">
        {stats && stats.map((stat, index) => {
                return (
                  <div key={index}>
                    <Counter now={now} startOfYear={startOfYear} stat={stat} />
                  </div>
                );
              })}
        </div>
        </>
      ) : (
        <div className="py-12">
          <p className="text-base tracking-tight font-medium">
            Une erreur est survenue
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
