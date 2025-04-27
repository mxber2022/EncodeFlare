import React from "react";
import { Loader2, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { TransactionState } from "../types";

interface TransactionStatusProps {
  transaction: TransactionState;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  transaction,
}) => {
  if (!transaction.isProcessing && !transaction.error && !transaction.hash) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 max-w-sm w-full animate-slide-up">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-purple/20 rounded-xl blur-lg" />
        <div className="relative bg-dark-lighter border border-pink/10 rounded-xl p-4 backdrop-blur-xl">
          {transaction.isProcessing && (
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 text-pink animate-spin" />
              <div>
                <p className="text-sm font-medium text-pink">
                  Transaction Processing
                </p>
                <p className="text-xs text-pink/60 mt-0.5">
                  Please wait while we confirm your transaction
                </p>
              </div>
            </div>
          )}

          {transaction.error && (
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-sm font-medium text-red-400">
                  Transaction Failed
                </p>
                <p className="text-xs text-red-400/60 mt-0.5">
                  {transaction.error}
                </p>
              </div>
            </div>
          )}

          {transaction.hash &&
            !transaction.isProcessing &&
            !transaction.error && (
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-400">
                    Transaction Confirmed
                  </p>
                  <a
                    href={`https://testnet.ftmscan.com/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pink/60 hover:text-pink flex items-center space-x-1 mt-0.5"
                  >
                    <span>View on Explorer</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;
