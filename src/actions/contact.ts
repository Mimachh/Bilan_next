"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { ContactSchema } from "@/schemas";

export const contact = async (values: z.infer<typeof ContactSchema>) => {
    const validatedFields = ContactSchema.safeParse(values);


    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, firstName, lastName, terms, object, message } = validatedFields.data;


    await db.contact.create({
        data: {
            email,
            firstName,
            lastName,
            terms,
            object,
            message,
        },
    });
    return { success: "Contact form sent!" };
};
