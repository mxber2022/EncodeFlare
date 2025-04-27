import React, { useState } from 'react';
import { Twitter, CheckCircle2, XCircle } from 'lucide-react';
import { useRaffle } from '../context/RaffleContext';

interface TwitterLinkInputProps {
  error?: string;
}

const TwitterLinkInput: React.FC<TwitterLinkInputProps> = ({ error }) => {
  const { formData, updateFormData } = useRaffle();
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateUrl = (url: string) => {
    const isValidUrl = url.includes('twitter.com') || url.includes('x.com');
    setIsValid(url.length > 0 ? isValidUrl : null);
    return isValidUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ twitterLink: value });
    validateUrl(value);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="twitterLink" className="block text-sm font-medium text-pink">
        Twitter/X Post Link
      </label>
      <div className="relative group">
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-pink/20 to-purple/20 rounded-xl blur transition-opacity duration-300 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`} 
        />
        <div className="relative flex items-center">
          <div className={`absolute left-0 pl-4 flex items-center pointer-events-none transition-transform duration-300 ${
            isFocused ? 'scale-110' : ''
          }`}>
            <Twitter className={`h-4 w-4 transition-colors duration-300 ${
              isFocused ? 'text-pink' : 'text-pink/40'
            }`} />
          </div>
          <input
            type="text"
            id="twitterLink"
            value={formData.twitterLink}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="https://twitter.com/username/status/123456789"
            className={`block w-full pl-10 pr-10 py-3 bg-dark-lighter ${
              error ? 'border-red-500/50' : isValid === true ? 'border-green-500/50' : 'border-pink/10'
            } border rounded-xl focus:border-pink/30 text-sm text-pink placeholder-pink/30 
            transition-all duration-300 backdrop-blur-sm`}
          />
          {formData.twitterLink && (
            <div className="absolute right-4 transition-transform duration-300">
              {isValid ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
            </div>
          )}
        </div>
      </div>
      {error ? (
        <p className="text-red-400 text-xs flex items-center space-x-1">
          <XCircle className="h-3 w-3" />
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-pink/40 text-xs pl-4 transition-opacity duration-300">
          Enter the URL of the Twitter post from which you want to select winners
        </p>
      )}
    </div>
  );
};

export default TwitterLinkInput