import Link from "next/link";
import React from "react";
import { CategoryRootWithStats } from "@/types/category";
import { getActiveCountersGroupedByCategory } from "@/actions/root/stat";
import Counter from "../compteur/counter";
import { getStartOfYear } from "@/lib/const";

const FeatureStats = async () => {
  const stats: CategoryRootWithStats[] =
    await getActiveCountersGroupedByCategory();
  
  // const startOfYear = year?.value ? parseInt(year?.value) : 1672527600000
  const startOfYear = getStartOfYear;
  // const startOfYear = 1672527600000; // 1er janvier 2023
  const now = new Date().getTime();

  return (
    <section className="max-w-lg mx-auto space-y-8 my-12 px-4">
      <h2 className="text-4xl text-center font-bold">Le bilan de Jupiter</h2>

   
      <div className="space-y-10">
        {stats.map((category, index) => {
          return (
            <div key={index} >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-neutral-800">{category.name}</h3>
                <Link
                  href={`/statistiques/${category.slug}`}
                  className="text-primaryColor transition-all hover:text-primaryColor/90 underline"
                >
                  Voir la liste complète
                </Link>
              </div>

              {category.statistics.map((stat, index) => {
                return (
                  <div key={index}>
                    <Counter now={now} startOfYear={startOfYear} stat={stat} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureStats;
