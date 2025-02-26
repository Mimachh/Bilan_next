"use client";

import {
  Box,
  Euro,
  HandHelping,
  Lock,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Trash,
  Tv,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import SingleCounter from "../compteur/single-counter";

interface Props {
  startOfYear: number;
  now: number;
}

export function GlowingEffectDemo(props: Props) {
  const { startOfYear, now } = props;

  const stats = {
    justice: {
      name: "Budget de la justice",
      slug: "budget-de-la-justice",
      stat_reference_previous_year: 10500000000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 10,
      },
      isPrice: true,
      isActive: true,
      isFeatured: true,
      isStatic: false,
      id: 0,
    },
    parlementaire: {
      name: "Charges parlementaires",
      slug: "charges-parlementaires",
      stat_reference_previous_year: 351210000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 100,
      },
      isPrice: true,
      isActive: true,
      isFeatured: true,
      isStatic: false,
      id: 1,
    },
    assemblee: {
      name: "Budget de l'assemblée nationale",
      slug: "budget-assemblee-nationale",
      stat_reference_previous_year: 606000000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 100,
      },
      isPrice: true,
      isActive: true,
      isFeatured: true,
      isStatic: false,
      id: 2,
    },
    audiovisuel: {
      name: "Audiovisuel public",
      slug: "audiovisuel-public",
      stat_reference_previous_year: 80000000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 100,
      },
      isPrice: true,
      isActive: true,
      isFeatured: true,
      isStatic: false,
      id: 3,
    },
    arcom: {
      name: "Coût de l'ARCOM",
      slug: "cout-arcom",
      stat_reference_previous_year: 50000000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 10,
      },
      isPrice: true,
      isActive: true,
      isFeatured: true,
      isStatic: false,
      id: 4,
    },
    ame: {
      name: "Montant de l'AME",
      slug: "montant-ame",
      stat_reference_previous_year: 13000000000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 100,
      },
      isPrice: true,
      isActive: true,
      isFeatured: true,
      isStatic: false,
      id: 5,
    },
    development: {
      name: "Aide publique au développement",
      slug: "aide-publique-au-developpement",
      stat_reference_previous_year: 4400000000,
      has_starting_stat_to_add: false,
      comment: "",
      categoryId: 4,
      refresh: {
        value: 100,
      },
      isPrice: true,
      isActive: true,
      isFeatured: false,
      isStatic: false,
      id: 6,
    },
    homicide: {
        name: "Homicides",
        slug: "homicides",
        stat_reference_previous_year: 980,
        has_starting_stat_to_add: false,
        comment: "",
      categoryId: 4,
      refresh: {
        value: 100,
      },
      isPrice: false,
      isActive: true,
      isFeatured: false,
      isStatic: false,
      id: 7,
    },
    violence: {
        name: "Coups et blessures volontaires",
        slug: "coups-et-blessures-volontaires",
        stat_reference_previous_year: 480600, // en 2024 projection 2025
        has_starting_stat_to_add: false,
        comment: "",
        categoryId: 3,
        refresh: {
            value: 1000
        },
        isPrice: false,
        isActive: true,
        isFeatured: true,
        isStatic: false,
        id: 8,
    },
    vol_vehicule: {
            name: "Vols de véhicules",
            slug: "vols-de-vehicules",
            stat_reference_previous_year: 138100, // en 2024 projection 2025
            has_starting_stat_to_add: false,
            comment: "",
            categoryId: 3,
            refresh: {
                value: 1000
            },
            isPrice: false,
            isActive: true,
            isFeatured: true,
            isStatic: false,
            id: 9,
    },
    policier_blesse: {
        name: "Policiers blessés",
        slug: "policiers-blesses",
        stat_reference_previous_year: 10000, // en 2024 projection 2025
        has_starting_stat_to_add: false,
        comment: "",
        categoryId: 3,
        refresh: {
            value: 1000
        },
        isPrice: false,
        isActive: true,
        isFeatured: true,
        isStatic: false,
        id: 10,
}
  };
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 px-4 md:px-0">
      <GridItem
        area="md:[grid-area:1/1/2/13] xl:[grid-area:1/1/2/8]"
        icon={<Euro className="h-4 w-4 text-neutral-400" />}
        title="Economie"
        description={
          <div>
            <ul className="space-y-2">
              <li className="flex-col flex md:flex-row  md:items-end gap-2">
                Budget de la justice :
                <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.justice}
                />
              </li>
              <li className="flex-col flex md:flex-row  md:items-end gap-2">
                Charges parlementaires :
                <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.parlementaire}
                />
              </li>
              <li className="flex-col flex md:flex-row  md:items-end gap-2">
                Assemblée Nationale :
                <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.assemblee}
                />
              </li>
            </ul>
          </div>
        }
      />
      {/*
    // audiovisuel public, ame, arcom
    // aide au développement
    // insécurité */}
      <GridItem
        area="md:[grid-area:2/1/3/13] xl:[grid-area:2/1/3/6]"
        icon={<HandHelping className="h-4 w-4 text-neutral-400" />}
        title="Aide étrangère"
        description={
          <div>
            <ul>
              <li className="flex-col flex items-start">Aide au développement :
              <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.development}
                />
              </li>
              <li className="flex-col flex items-start">
                AME: 
                <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.ame}
                />
              </li>
            </ul>
          </div>
        }
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:1/8/2/13]"
        icon={<ShieldAlert className="h-4 w-4 text-neutral-400" />}
        title="Insécurité"
        description={
          <div>
            <ul>
              <li className="flex items-end gap-2">Violences aux personnes :
              <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.violence}
                />
              </li>
              <li className="flex items-end gap-2">Homicides :
              <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.homicide}
                />
              </li>
              <li className="flex items-end gap-2">Vol de véhicules :
              <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.vol_vehicule}
                />
              </li>
              <li className="flex items-end gap-2">Policiers blessé :
              <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.policier_blesse}
                />
              </li>
            </ul>
          </div>
        }
      />

      <GridItem
        area="md:[grid-area:4/1/5/13] xl:[grid-area:2/6/3/13]"
        icon={<Trash className="h-4 w-4 text-neutral-400" />}
        title="Dépenses inutiles"
        description={
          <div>
            <ul>
              <li className="flex-col flex md:flex-row  md:items-end gap-2">
                Audiovisuel public :
                <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.audiovisuel}
                />
              </li>
              <li className="flex-col flex md:flex-row  md:items-end gap-2">
                ARCOM :
                <SingleCounter
                  className="text-sm md:text-sm text-white/95 tracking-wider"
                  now={now}
                  startOfYear={startOfYear}
                  stat={stats.arcom}
                />
              </li>
            </ul>
          </div>
        }
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          variant="default"
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-primaryColor p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
