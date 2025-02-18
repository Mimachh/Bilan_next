"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { PetitionSchema } from "@/schemas";
import { headers } from "next/headers";

export const signPetition = async (values: z.infer<typeof PetitionSchema>) => {
    const validatedFields = PetitionSchema.safeParse(values);


    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, firstName, lastName, terms } = validatedFields.data;

    const ip =
        headers().get("x-forwarded-for")?.split(",")[0] ||
        headers().get("x-real-ip") ||
        "0.0.0.0";

    // 2️⃣ Hasher l'IP
    const hashedIp = await bcrypt.hash(ip, 10);
    const emailExists = await db.petition.findFirst({
        where: { email },
    });

    if (emailExists) {
        return { error: "This email has already signed the petition!" };
    }

    // Vérifier le nombre de signatures depuis cette IP
    const ipSignaturesCount = await db.petition.count({
        where: { ip: hashedIp },
    });

    if (ipSignaturesCount >= 3) {
        return { error: "This IP has reached the maximum number of signatures (3)!" };
    }

    await db.petition.create({
        data: {
            email,
            firstName,
            lastName,
            terms,
            ip: hashedIp,
        },
    });
    return { success: "Confirmation email sent!" };
};
