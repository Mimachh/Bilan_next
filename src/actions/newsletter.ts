"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { NewsletterSchema } from "@/schemas";

export const optin = async (values: z.infer<typeof NewsletterSchema>) => {
    const validatedFields = NewsletterSchema.safeParse(values);


    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, terms } = validatedFields.data;

    const emailExists = await db.newsletter.findFirst({
        where: { email },
    });

    if (emailExists) {
        return { error: "Vous êtes déjà inscrit !" };
    }

    await db.newsletter.create({
        data: {
            email,
            terms
        },
    });
    return { success: "Optin!" };
};
