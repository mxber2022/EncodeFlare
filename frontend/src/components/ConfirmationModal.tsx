import React from "react";
import {
  XCircle,
  AlertTriangle,
  Sparkles,
  Twitter,
  Users,
  Trophy,
  Loader2,
} from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import { RaffleFormData } from "../types";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  formData: RaffleFormData;
  isProcessing: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  formData,
  isProcessing,
}) => {
  const { address } = useAppKitAccount();

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6 backdrop-blur-xl animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="relative max-w-xl w-full animate-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink/5 to-transparent rounded-3xl blur-2xl" />
        <div className="relative bg-dark-light/30 rounded-3xl border border-pink/10 backdrop-blur-xl overflow-hidden">
          <div className="relative px-6 pt-6 pb-5 border-b border-pink/10 bg-gradient-to-br from-dark-lighter/50 to-dark-lighter/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink/40 to-purple/40 rounded-lg blur-lg transition-all duration-300 group-hover:blur-xl" />
                  <div className="relative bg-dark-lighter rounded-lg p-2.5 border border-pink/20 backdrop-blur-xl">
                    <Trophy className="h-4 w-4 text-pink" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink">
                    Confirm Details
                  </h3>
                  <p className="text-pink/60 text-xs mt-0.5">
                    Review your raffle settings
                  </p>
                </div>
              </div>
              <button
                onClick={onCancel}
                disabled={isProcessing}
                className="text-pink/40 hover:text-pink transition-colors p-2 hover:rotate-90 transform duration-300 disabled:opacity-50"
                aria-label="Close"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink/10 rounded-lg p-2">
                    <Twitter className="h-4 w-4 text-pink" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-pink/40 mb-1">Twitter Post</p>
                    <p className="text-sm text-pink truncate">
                      {formData.twitterLink}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink/10 rounded-lg p-2">
                    <Users className="h-4 w-4 text-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-pink/40 mb-1">
                      Selection Method
                    </p>
                    <p className="text-sm text-pink">
                      {formData.selectionBasis === "random" &&
                        "Random Selection"}
                      {formData.selectionBasis === "firstComeFirstServe" &&
                        "First Come First Serve"}
                      {formData.selectionBasis === "weighted" &&
                        "Weighted Selection"}
                      {formData.selectionBasis === "engagement" &&
                        "Based on Engagement"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink/10 rounded-lg p-2">
                    <Trophy className="h-4 w-4 text-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-pink/40 mb-1">
                      Number of Winners
                    </p>
                    <p className="text-sm text-pink">{formData.winnerCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink/10 rounded-lg p-2">
                    <Users className="h-4 w-4 text-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-pink/40 mb-1">
                      Connected Wallet
                    </p>
                    <p className="text-sm text-pink font-mono">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-dark-lighter/50 to-dark-lighter/30 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-pink/10 rounded-lg p-2 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-pink" />
                </div>
                <div>
                  <p className="text-xs text-pink">Important Note</p>
                  <p className="text-xs text-pink/60 mt-1">
                    Once confirmed, the winner selection process will begin
                    immediately using the smart contract. This action cannot be
                    undone and will require a transaction signature.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={onCancel}
                disabled={isProcessing}
                className="px-4 py-2.5 border border-pink/10 rounded-xl text-xs text-pink/60 
                  hover:text-pink hover:bg-dark-lighter transition-all duration-300
                  hover:border-pink/20 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isProcessing}
                className="relative group disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-50 blur rounded-xl transform transition-all duration-300 group-hover:scale-110" />
                <div className="relative bg-dark-lighter px-4 py-2.5 rounded-xl border border-pink/20 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/40">
                  <span className="flex items-center space-x-2 text-pink">
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="text-xs font-medium">
                          Processing...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium">
                          Confirm & Select
                        </span>
                        <Sparkles className="w-3.5 h-3.5 transform group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
