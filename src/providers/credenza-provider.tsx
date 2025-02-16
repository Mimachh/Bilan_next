"use client";

import { useExtraDataCounter } from "@/store/extra-data-counter-store";
import { SourceDataTable } from "@/types/source";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface CredenzaProviderProps {
  children: React.ReactNode;
}

export type CredenzaData = {
  sources?: SourceDataTable[];
};

type CredenzaContextType = {
  data: CredenzaData;
  isOpen: boolean;
  isLoading: boolean;
  setOpen: (credenza: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const CredenzaContext = createContext<CredenzaContextType>({
  data: {},
  isOpen: false,
  isLoading: false,
  setOpen: () => {},
  setClose: () => {},
});

const CredenzaProvider: React.FC<CredenzaProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CredenzaData>({});
  const [showingCredenza, setShowingCredenza] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);

  const extraData = useExtraDataCounter.use.data();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = useCallback(
    async (credenza: React.ReactNode, fetchData?: () => Promise<any>) => {
      if (credenza) {
        if (fetchData) {
          setIsLoading(true);
          const fetchedData = await fetchData();          
          setData((prevData) => ({ ...prevData, ...fetchedData }));

          
          setIsLoading(false);
        }
        setShowingCredenza(credenza);
        setIsOpen(true);
      }
    },
    []
  );

  const setClose = useCallback(() => {
    setIsOpen(false);
    setData({});
  }, []);

  if (!isMounted) return null;

  return (
    <CredenzaContext.Provider value={{ data, isLoading, setOpen, setClose, isOpen }}>
      {children}
      {showingCredenza}
    </CredenzaContext.Provider>
  );
};

export const useCredenza = () => {
  const context = useContext(CredenzaContext);
  if (!context) {
    throw new Error("useCredenza must be used within the CredenzaProvider");
  }
  return context;
};

export default CredenzaProvider;
