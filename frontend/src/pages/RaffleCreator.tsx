import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  AlertCircle,
  Sparkles,
  Trophy,
  Star,
  Loader2,
} from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";
import TwitterLinkInput from "../components/TwitterLinkInput";
import SelectionBasisDropdown from "../components/SelectionBasisDropdown";
import WinnerCountInput from "../components/WinnerCountInput";
import ConfirmationModal from "../components/ConfirmationModal";
import { useRaffle } from "../context/RaffleContext";
import { mockWinnerSelection } from "../utils/mockContract";

const RaffleCreator: React.FC = () => {
  const navigate = useNavigate();
  const { formData, setWinners, setIsLoading } = useRaffle();
  const { isConnected } = useAppKitAccount();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isConnected) {
      newErrors.wallet = "Please connect your wallet first";
    }

    if (!formData.twitterLink) {
      newErrors.twitterLink = "Twitter link is required";
    } else if (
      !formData.twitterLink.includes("twitter.com") &&
      !formData.twitterLink.includes("x.com")
    ) {
      newErrors.twitterLink = "Please enter a valid Twitter/X link";
    }

    if (formData.winnerCount < 1) {
      newErrors.winnerCount = "At least 1 winner is required";
    } else if (formData.winnerCount > 100) {
      newErrors.winnerCount = "Maximum 100 winners allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setIsLoading(true);
    setIsProcessing(true);
    setErrors({});

    try {
      const selectedWinners = await mockWinnerSelection(
        formData.twitterLink,
        formData.selectionBasis,
        formData.winnerCount
      );

      setWinners(selectedWinners);
      navigate("/results");
    } catch (error) {
      console.error("Error selecting winners:", error);
      setErrors({
        contract:
          "Failed to select winners. Please make sure you have enough funds and try again.",
      });
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink/5 to-transparent rounded-3xl blur-2xl" />
        <div className="relative bg-dark-light/30 rounded-3xl border border-pink/10 backdrop-blur-xl overflow-hidden">
          {/* Premium Header */}
          <div className="relative bg-gradient-to-br from-dark-lighter/50 to-dark-lighter/30 px-6 pt-6 pb-5 border-b border-pink/10">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-pink/20 to-purple/20 px-3 py-0.5 transform rotate-45 translate-x-8 translate-y-4">
              <span className="text-[10px] font-semibold tracking-wider text-light/90 flex items-center gap-1">
                <Star className="w-3 h-3" />
                PREMIUM
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink/40 to-purple/40 rounded-lg blur-lg transition-all duration-300 group-hover:blur-xl" />
                <div className="relative bg-dark-lighter rounded-lg p-2.5 border border-pink/20 backdrop-blur-xl transform transition-all duration-300 group-hover:scale-105">
                  <Trophy className="h-4 w-4 text-pink" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  <span className="bg-gradient-to-r from-pink via-purple to-pink bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
                    Premium Raffle
                  </span>
                </h2>
                <p className="text-pink/60 mt-0.5 text-xs">
                  Create exclusive giveaways for your community
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <TwitterLinkInput error={errors.twitterLink} />
            <SelectionBasisDropdown />
            <WinnerCountInput error={errors.winnerCount} />

            <div className="bg-gradient-to-br from-dark-lighter/50 to-dark-lighter/30 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="bg-pink/10 rounded-lg p-2 flex-shrink-0">
                  <Info className="text-pink w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-pink">
                    Premium Features
                  </h3>
                  <ul className="text-pink/60 text-xs mt-1.5 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-pink/40" />
                      Advanced selection algorithms
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-pink/40" />
                      Detailed analytics dashboard
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-pink/40" />
                      Blockchain-powered fair distribution
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 backdrop-blur-sm animate-shake">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-500/10 rounded-lg p-2 flex-shrink-0">
                    <AlertCircle className="text-red-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-red-400 text-xs font-medium">
                      Please fix the following errors:
                    </p>
                    <ul className="list-disc text-red-300/80 pl-4 mt-1.5 space-y-1 text-xs">
                      {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="relative group disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-50 blur rounded-xl transform transition-all duration-300 group-hover:scale-110" />
                <div className="relative bg-dark-lighter px-5 py-2.5 rounded-xl border border-pink/20 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/40">
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
                          Select Winners
                        </span>
                        <Sparkles className="w-3.5 h-3.5 transform group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmation(false)}
          formData={formData}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default RaffleCreator;
