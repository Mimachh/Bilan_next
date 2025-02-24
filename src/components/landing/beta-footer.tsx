import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";

const BetaFooter = () => {
  const user = "mimach.dev";
  const domain = "gmail.com";
  const email = `${user}@${domain}`;

  return (
    <div className="bg-black text-white">
      <ul className="flex justify-center space-x-6 py-4 text-[13px] tracking-tighter">
        <li>
          <Link href="/mentions-legales">Mentions légales</Link>
        </li>
        <li>
          <Link href="/politiques-de-confidentialite">
            Politiques de confidentialité
          </Link>
        </li>
        {/* <li><Link href="">Cookies</Link></li> */}
      </ul>
      <div className="container mx-auto">
        <Separator className="bg-muted-foreground" />
        <div className="flex justify-between items-center px-4 py-4 md:px-0  text-white text-xs">
          <span>
            © {new Date().getFullYear()} Tous droits réservés francechaos.fr
          </span>
          <Link href={`mailto:${email}`} className="hover:underline">
            @mimach
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetaFooter;
