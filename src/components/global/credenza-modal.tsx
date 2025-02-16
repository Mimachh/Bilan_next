"use client";
import React from "react";

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/credenza";

import { Button } from "../ui/button";
import { useCredenza } from "@/providers/credenza-provider";

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CredenzaModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose, isLoading } = useCredenza();
  return (
    <Credenza open={isOpen || defaultOpen} onOpenChange={setClose}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
          <CredenzaDescription>{subheading}</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>{isLoading ? "Loading..." : children}</CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button>Fermer</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default CredenzaModal;

