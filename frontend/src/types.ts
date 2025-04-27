export interface RaffleFormData {
  twitterLink: string;
  selectionBasis: SelectionBasis;
  winnerCount: number;
}

export type SelectionBasis =
  | "random"
  | "firstComeFirstServe"
  | "weighted"
  | "engagement";

export interface Winner {
  id: string;
  handle: string;
  avatarUrl: string;
}

export interface SelectOption {
  value: string;
  label: string;
  description: string;
}

export interface TransactionState {
  isProcessing: boolean;
  error: string | null;
  hash: string | null;
}
