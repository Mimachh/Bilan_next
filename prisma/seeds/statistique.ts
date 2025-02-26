import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStatistique = async () => {
  const category = await prisma.category.findFirst();
  const refresh = await prisma.refreshCounter.findFirst();
  if (!category || !refresh) {
    return;
  }

  await prisma.archived_Statistique.createMany({
    data: statistiques.map((stat) => ({
      ...stat,
      yearId: 1
    })),
  });
  await prisma.statistique.createMany({
    data: statistiques.map((stat) => ({
      ...stat,
      yearId: 2
    })),
  });

  // await prisma.statistique.create({
  //   data: {
  //     name: "Statistique 1",
  //     slug: "statistique-1",
  //     stat_reference_previous_year: 100,
  //     has_starting_stat_to_add: true,
  //     starting_stat_to_add: 10,
  //     comment: "Commentaire 1",
  //     categoryId: category?.id,
  //     refreshId: refresh?.id,
  //   },
  // });
};


const statistiques = [
  // Economie
  {
    name: "Déficit cumulé",
    slug: "deficit-cumule",
    stat_reference_previous_year: 125560000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Dette publique", // mis à jour beta
    slug: "dette-publique",
    stat_reference_previous_year: 125560000000,
    has_starting_stat_to_add: true,
    starting_stat_to_add: 3045500000000,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Fraude à la carte vitale",
    slug: "fraude-carte-vitale",
    stat_reference_previous_year: 316000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: false,
    isFeatured: false
  },
  {
    name: "Fraude à la TVA",
    slug: "fraude-tva",
    stat_reference_previous_year: 25000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Fraude à la CAF",
    slug: "fraude-caf",
    stat_reference_previous_year: 351400000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Fraude sociale",
    slug: "fraude-sociale",
    stat_reference_previous_year: 9000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Prestations sociales versées",
    slug: "prestations-sociales-versees",
    stat_reference_previous_year: 834000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Fraude fiscale",
    slug: "fraude-fiscale",
    stat_reference_previous_year: 80000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    // Stat de 2025 beta
    name: "Aide publique au développement",
    slug: "aide-publique-au-developpement",
    stat_reference_previous_year: 4400000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: false
  },
  {
    // name: "Montant de l'AME",
    // slug: "montant-ame",
    // stat_reference_previous_year: 1212300000,
    // has_starting_stat_to_add: false,
    // comment: "",
    // categoryId: 4,
    // refreshId: 1,
    // isPrice: true,
    // isActive: true,
    // isFeatured: true

    // STAT DE 2025 BETA
    name: "Montant de l'AME",
    slug: "montant-ame",
    stat_reference_previous_year: 13000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    // STAT DE 2025 BETA
    name: "Budget de l'assemblée nationale",
    slug: "budget-assemblee-nationale",
    stat_reference_previous_year: 606000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    // STAT DE 2025 BETA
    name: "Charges parlementaires",
    slug: "charges-parlementaires",
    stat_reference_previous_year: 351210000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },

  {
    // STAT DE 2025 BETA
    name: "Dépenses sociales",
    slug: "depenses-sociales",
    stat_reference_previous_year: 666000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },

  // Stat de 2025 beta
  {
    name: "Audiovisuel public",
    slug: "audiovisuel-public",
    stat_reference_previous_year: 80000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  // Stat de 2025 beta
  {
    name: "Coût de l'ARCOM",
    slug: "cout-arcom",
    stat_reference_previous_year: 50000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Intérêts de la dette", // mis à jour beta
    slug: "interets-dette",
    stat_reference_previous_year: 59000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 4,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },

  // Insécurité

  {
    name: "Viols",
    slug: "viols",
    stat_reference_previous_year: 199655,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Cambriolages",
    slug: "cambriolages",
    stat_reference_previous_year: 211800,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Violences sexuelles",
    slug: "violences-sexuelles",
    stat_reference_previous_year: 84500,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Féminicides",
    slug: "feminicides",
    stat_reference_previous_year: 112,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    // stat de 2025 beta
    name: "Coups et blessures volontaires",
    slug: "coups-et-blessures-volontaires",
    //stat_reference_previous_year: 353600, // en 2022
    stat_reference_previous_year: 480600, // en 2024 projection 2025
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Attaques au couteau",
    slug: "attaques-au-couteau",
    stat_reference_previous_year: 40880,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Homicides",
    slug: "homocides",
    stat_reference_previous_year: 948,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Vols avec armes",
    slug: "vols-avec-armes",
    stat_reference_previous_year: 8600,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Vols sans arme avec violence",
    slug: "vols-avec-arme-avec-violence",
    stat_reference_previous_year: 59700,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Vols sans violence",
    slug: "vols-sans-violence",
    stat_reference_previous_year: 663700,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Vols de véhicules",
    slug: "vols-vehicules",
    stat_reference_previous_year: 133800,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Vols dans les véhicules",
    slug: "vols-dans-vehicules",
    stat_reference_previous_year: 246400,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Vols d'accessoires de véhicules",
    slug: "vols-accessoires-vehicules",
    stat_reference_previous_year: 100700,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Destructions et dégradations volontaires",
    slug: "destructions_degradations_volontaires",
    stat_reference_previous_year: 550600,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Usage de stupéfiants",
    slug: "usage-stupefiants",
    stat_reference_previous_year: 249800,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Trafic de stupéfiants",
    slug: "traphic-stupefiants",
    stat_reference_previous_year: 48300,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Escroqueries",
    slug: "escroqueries",
    stat_reference_previous_year: 465000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Actes homophobes avec violence physique",
    slug: "actes-homophobes-violence-physique",
    stat_reference_previous_year: 144,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Actes homophobes répertoriés",
    slug: "actes-homophobes-repertories",
    stat_reference_previous_year: 7000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Nombre de fichés S",
    slug: "nombre-fiches-s",
    stat_reference_previous_year: 10500,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Nombre de policiers blessés en opération",
    slug: "nombre-policiers-blesses-en-operation",
    stat_reference_previous_year: 7300,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nombre de refus d'obtempérer",
    slug: "nombre-refus-obtemperer",
    stat_reference_previous_year: 26280,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },

  // Stats de 2025 beta
  {
    name: "Bugdet de la sécurité",
    slug: "budget-securite",
    stat_reference_previous_year: 26000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 3,
    refreshId: 1,
    isPrice: true,
    isActive: true,
    isFeatured: true
  },
  // Immigration
  {
    name: "Immigration légale",
    slug: "immigration-legale",
    stat_reference_previous_year: 320330,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Demandes d'asile déposées",
    slug: "demandes-asile-deposees",
    stat_reference_previous_year: 137046,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Immigration économique",
    slug: "immigration-economique",
    stat_reference_previous_year: 52570,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Regroupement familial",
    slug: "regroupement-familial",
    stat_reference_previous_year: 90385,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Immigration étudiante",
    slug: "immigration-etudiante",
    stat_reference_previous_year: 108340,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Immigration humanitaire",
    slug: "immigration-humanitaire",
    stat_reference_previous_year: 40490,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Immigration diverse",
    slug: "immigration-diverse",
    stat_reference_previous_year: 28545,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Immigration Britannique",
    slug: "immigration-britannique",
    stat_reference_previous_year: 10386,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Nombre d'OQTF prononcées",
    slug: "nombre-oqtf-prononcees",
    stat_reference_previous_year: 61781,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Nombre d'OQTF exécutées",
    slug: "nombre-oqtf-executees",
    stat_reference_previous_year: 3501,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 2,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: false
  },

  // DEMOGRAPHIE
  {
    name: "Population Française",
    slug: "population-francaise",
    stat_reference_previous_year: 725192.95,
    has_starting_stat_to_add: true,
    starting_stat_to_add: 68042591,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nombre de naissances",
    slug: "nombre-de-naissances",
    stat_reference_previous_year: 725192.95,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nombre de décès",
    slug: "nombre-de-deces",
    stat_reference_previous_year: 673637,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nouveaux nés avec 1 parent étranger",
    slug: "nouveaux-nes-avec-un-parent-etranger",
    stat_reference_previous_year: 110229,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nouveaux nés avec deux parents étrangers",
    slug: "nouveaux-nes-avec-deux-parents-etrangers",
    stat_reference_previous_year: 117481,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nouveaux-nés avec 1 ou 2 parents étrangers",
    slug: "nouveaux-nes-avec-un-ou-deux-parents-etrangers",
    stat_reference_previous_year: 227710,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nouveaux-nés de 2 parents français",
    slug: "nouveaux-nes-de-deux-parents-francais",
    stat_reference_previous_year: 497482.95,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Nouveaux-nés ayant la Drépanocytose",
    slug: "nouveaux-nes-ayant-la-drenapocytose",
    stat_reference_previous_year: 285653.50,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 1,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },

  // RELIGION
  {
    name: "Actes antichrétiens",
    slug: "actes-antichretiens",
    stat_reference_previous_year: 857,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 5,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Actes antisémites",
    slug: "actes-antisemites",
    stat_reference_previous_year: 589,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 5,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Actes antimusulmans",
    slug: "actes-antimusulmans",
    stat_reference_previous_year: 213,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 5,
    refreshId: 1,
    isPrice: false,
    isActive: true,
    isFeatured: true
  },

  // ECOLOGIE
  // Stats de 2025 beta
  {
    name: "Dépenses liées à l'écologie",
    slug: "depenses-liees-a-l-ecologie",
    stat_reference_previous_year: 21000000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 6,
    refreshId: 1, // FIXME: 
    isPrice: true,
    isActive: true,
    isFeatured: true
  },

  // JUSTICE
  // Stats de 2025 beta
  {
    name: "Budget de la justice",
    slug: "budget-justice",
    stat_reference_previous_year: 10500000000,
    has_starting_stat_to_add: false,
    comment: "",
    categoryId: 7,
    refreshId: 1, // FIXME:
    isPrice: true,
    isActive: true,
  }
]
