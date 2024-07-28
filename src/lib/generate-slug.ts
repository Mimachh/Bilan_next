import { db } from "./db";


export const generateSlugFromCategoryName = async (name: string, model: string) => {
  let counter = 0;
  let uniqueSlug = "";
  const baseSlug = name
    .normalize("NFD") // Normalise les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Enlève les diacritiques
    .replace(/'/g, "") // Enlève les apostrophes
    .toLowerCase()
    .replace(/ /g, "-");

  while (true) {
    uniqueSlug = counter === 0 ? baseSlug : `${baseSlug}_${counter}`;

    const existingSlug = await getExistingSlug(uniqueSlug, model);

    if (!existingSlug) {
      break;
    }

    counter++;
  }

  return uniqueSlug;
};
const getExistingSlug = async (slug: string, model: string) => {
    // Utilisation de l'indexation dynamique pour accéder au modèle
    //@ts-ignore
    return await db[model].findFirst({
      where: {
        slug,
      },
    });
  };
