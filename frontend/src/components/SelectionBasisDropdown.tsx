import React, { useState } from 'react';
import { useRaffle } from '../context/RaffleContext';
import { SelectOption } from '../types';
import { ChevronDown, Sparkles, Clock, BarChart3, Zap } from 'lucide-react';

const selectionOptions: (SelectOption & { icon: React.ReactNode })[] = [
  {
    value: 'random',
    label: 'Random Selection',
    description: 'Winners are selected randomly with equal probability',
    icon: <Sparkles className="h-4 w-4" />
  },
  {
    value: 'firstComeFirstServe',
    label: 'First Come First Serve',
    description: 'Select earliest interactions with the tweet',
    icon: <Clock className="h-4 w-4" />
  },
  {
    value: 'weighted',
    label: 'Weighted Selection',
    description: 'Give more weight to followers with higher influence',
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    value: 'engagement',
    label: 'Based on Engagement',
    description: 'Prioritize users with higher engagement (likes, retweets)',
    icon: <Zap className="h-4 w-4" />
  }
];

const SelectionBasisDropdown: React.FC = () => {
  const { formData, updateFormData } = useRaffle();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = selectionOptions.find(opt => opt.value === formData.selectionBasis);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-pink">
        Winner Selection Method
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink/5 to-purple/5 rounded-xl blur transition-opacity duration-300" />
          <div className="relative flex items-center justify-between w-full py-3 px-4 bg-dark-lighter border border-pink/10 rounded-xl transition-all duration-300 hover:border-pink/20">
            <div className="flex items-center space-x-3">
              <div className="text-pink/60">{selectedOption?.icon}</div>
              <span className="text-sm text-pink">{selectedOption?.label}</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-pink/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-dark-lighter border border-pink/10 rounded-xl overflow-hidden backdrop-blur-sm">
            {selectionOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  updateFormData({ selectionBasis: option.value as any });
                  setIsOpen(false);
                }}
                className={`w-full flex items-start space-x-3 p-3 hover:bg-pink/5 transition-colors duration-200 ${
                  formData.selectionBasis === option.value ? 'bg-pink/10' : ''
                }`}
              >
                <div className="text-pink/60 mt-0.5">{option.icon}</div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-pink">{option.label}</div>
                  <p className="text-pink/60 text-xs mt-0.5">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionBasisDropdown;