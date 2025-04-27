import React, { createContext, useContext, useState } from "react";
import { Winner, RaffleFormData, TransactionState } from "../types";

interface RaffleContextType {
  formData: RaffleFormData;
  updateFormData: (data: Partial<RaffleFormData>) => void;
  winners: Winner[];
  setWinners: React.Dispatch<React.SetStateAction<Winner[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: TransactionState;
  setTransaction: React.Dispatch<React.SetStateAction<TransactionState>>;
  resetForm: () => void;
}

const initialFormData: RaffleFormData = {
  twitterLink: "",
  selectionBasis: "random",
  winnerCount: 1,
};

const initialTransactionState: TransactionState = {
  isProcessing: false,
  error: null,
  hash: null,
};

const RaffleContext = createContext<RaffleContextType | undefined>(undefined);

export const RaffleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<RaffleFormData>(initialFormData);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState<TransactionState>(
    initialTransactionState
  );

  const updateFormData = (data: Partial<RaffleFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setWinners([]);
    setTransaction(initialTransactionState);
  };

  return (
    <RaffleContext.Provider
      value={{
        formData,
        updateFormData,
        winners,
        setWinners,
        isLoading,
        setIsLoading,
        transaction,
        setTransaction,
        resetForm,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (context === undefined) {
    throw new Error("useRaffle must be used within a RaffleProvider");
  }
  return context;
};
