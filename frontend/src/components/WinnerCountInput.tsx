import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useRaffle } from '../context/RaffleContext';

interface WinnerCountInputProps {
  error?: string;
}

const WinnerCountInput: React.FC<WinnerCountInputProps> = ({ error }) => {
  const { formData, updateFormData } = useRaffle();

  const decrementCount = () => {
    if (formData.winnerCount > 1) {
      updateFormData({ winnerCount: formData.winnerCount - 1 });
    }
  };

  const incrementCount = () => {
    if (formData.winnerCount < 100) {
      updateFormData({ winnerCount: formData.winnerCount + 1 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      updateFormData({ winnerCount: value });
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="winnerCount" className="block text-sm font-medium text-pink">
        Number of Winners
      </label>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={decrementCount}
          className="bg-dark-lighter border border-pink/10 rounded-xl p-2.5
            hover:bg-dark-light transition-all duration-300 flex items-center justify-center
            disabled:opacity-50 disabled:cursor-not-allowed hover:border-pink/20
            disabled:hover:border-pink/10 disabled:hover:bg-dark-lighter"
          disabled={formData.winnerCount <= 1}
        >
          <Minus className="h-4 w-4 text-pink" />
        </button>
        <input
          type="number"
          id="winnerCount"
          min="1"
          max="100"
          value={formData.winnerCount}
          onChange={handleInputChange}
          className={`block w-20 text-center py-2.5 bg-dark-lighter ${
            error ? 'border-red-500/50' : 'border-pink/10'
          } border rounded-xl text-pink text-sm font-medium
          focus:border-pink/30 transition-all duration-300`}
        />
        <button
          type="button"
          onClick={incrementCount}
          className="bg-dark-lighter border border-pink/10 rounded-xl p-2.5
            hover:bg-dark-light transition-all duration-300 flex items-center justify-center
            disabled:opacity-50 disabled:cursor-not-allowed hover:border-pink/20
            disabled:hover:border-pink/10 disabled:hover:bg-dark-lighter"
          disabled={formData.winnerCount >= 100}
        >
          <Plus className="h-4 w-4 text-pink" />
        </button>
      </div>
      {error ? (
        <p className="text-red-400 text-xs">{error}</p>
      ) : (
        <p className="text-pink/40 text-xs">
          Select between 1 and 100 winners
        </p>
      )}
    </div>
  );
};

export default WinnerCountInput