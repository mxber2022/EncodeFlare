import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Download, Share2, ArrowLeft, Sparkles, Twitter, ExternalLink } from 'lucide-react';
import Confetti from '../components/Confetti';
import { useRaffle } from '../context/RaffleContext';

const RaffleResults: React.FC = () => {
  const navigate = useNavigate();
  const { winners, formData, isLoading, resetForm } = useRaffle();

  useEffect(() => {
    if (!winners.length && !isLoading) {
      navigate('/');
    }
  }, [winners, isLoading, navigate]);

  const handleStartNew = () => {
    resetForm();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-pink/5 to-transparent rounded-3xl blur-2xl" />
          <div className="bg-dark-light/30 rounded-3xl shadow-glow border border-pink/10 backdrop-blur-xl p-12 relative">
            <div className="animate-spin-slow rounded-full h-16 w-16 border-t-2 border-b-2 border-pink mx-auto" />
            <h2 className="text-lg font-semibold mt-8 text-pink animate-pulse">Selecting Winners...</h2>
            <p className="text-sm text-pink/60 mt-2">
              Calling smart contract to randomly select winners based on your criteria
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Confetti />
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-pink/5 to-transparent rounded-3xl blur-2xl" />
          <div className="relative bg-dark-light/30 rounded-3xl border border-pink/10 backdrop-blur-xl overflow-hidden">
            <div className="relative px-6 pt-8 pb-6 text-center border-b border-pink/10 bg-gradient-to-br from-dark-lighter/50 to-dark-lighter/30">
              <div className="absolute inset-0 bg-gradient-radial from-pink/5 via-transparent to-transparent animate-pulse" />
              <div className="relative">
                <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink/40 to-purple/40 rounded-xl blur-lg transition-all duration-300 group-hover:blur-xl" />
                    <div className="relative bg-dark-lighter rounded-xl p-3 border border-pink/20 backdrop-blur-xl">
                      <Trophy className="h-8 w-8 text-pink" />
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-pink mb-2">Winners Selected!</h2>
                <p className="text-sm text-pink/60">
                  {formData.winnerCount} winner{formData.winnerCount > 1 ? 's' : ''} selected from your raffle
                </p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-pink mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-pink/40" />
                  Selection Details
                </h3>
                <div className="space-y-3">
                  <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                    <p className="text-xs text-pink/40 mb-1">Selection Method</p>
                    <p className="text-sm font-medium text-pink">
                      {formData.selectionBasis === 'random' && 'Random Selection'}
                      {formData.selectionBasis === 'firstComeFirstServe' && 'First Come First Serve'}
                      {formData.selectionBasis === 'weighted' && 'Weighted Selection'}
                      {formData.selectionBasis === 'engagement' && 'Based on Engagement'}
                    </p>
                  </div>
                  <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                    <p className="text-xs text-pink/40 mb-1">Number of Winners</p>
                    <p className="text-sm font-medium text-pink">{formData.winnerCount}</p>
                  </div>
                  <div className="bg-dark-lighter/50 rounded-xl p-4 border border-pink/10 backdrop-blur-sm">
                    <p className="text-xs text-pink/40 mb-1">Twitter Link</p>
                    <a 
                      href={formData.twitterLink}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-sm font-medium text-pink hover:text-pink-light break-all flex items-center gap-2 group"
                    >
                      <span>{formData.twitterLink}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-pink mb-3 flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-pink" />
                  Winners
                </h3>
                <div className="space-y-2">
                  {winners.map((winner, index) => (
                    <div 
                      key={winner.id} 
                      className="flex items-center p-3 bg-dark-lighter/30 border border-pink/10 
                        rounded-xl hover:bg-dark-lighter/50 transition-all hover:scale-[1.02] 
                        hover:shadow-glow group"
                      style={{ 
                        animationDelay: `${index * 150}ms`,
                        opacity: 0,
                        animation: 'fadeIn 0.5s ease-out forwards'
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink/10 to-transparent rounded-full blur-sm" />
                        <img 
                          src={winner.avatarUrl} 
                          alt={winner.handle}
                          className="w-10 h-10 rounded-full object-cover border-2 border-pink/10 
                            group-hover:border-pink/20 transition-colors relative"
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="text-sm font-medium text-pink group-hover:text-pink-light transition-colors">
                          @{winner.handle}
                        </p>
                      </div>
                      <a
                        href={`https://twitter.com/${winner.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink/40 hover:text-pink transition-colors p-2"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <button 
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink/5 to-purple/5 rounded-xl blur transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                    <div className="relative bg-dark-lighter px-4 py-2.5 rounded-xl border border-pink/10 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/20">
                      <span className="flex items-center space-x-2 text-pink">
                        <Download className="w-3.5 h-3.5 group-hover:transform group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-xs font-medium">Export</span>
                      </span>
                    </div>
                  </button>
                  <button 
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink/5 to-purple/5 rounded-xl blur transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                    <div className="relative bg-dark-lighter px-4 py-2.5 rounded-xl border border-pink/10 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/20">
                      <span className="flex items-center space-x-2 text-pink">
                        <Share2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-medium">Share</span>
                      </span>
                    </div>
                  </button>
                </div>
                <button
                  onClick={handleStartNew}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-50 blur rounded-xl transform transition-all duration-300 group-hover:scale-110" />
                  <div className="relative bg-dark-lighter px-4 py-2.5 rounded-xl border border-pink/20 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/40">
                    <span className="flex items-center space-x-2 text-pink">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="text-xs font-medium">Create New Raffle</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaffleResults;