import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, RotateCcw, Play, Trophy, Sparkles } from 'lucide-react';
import Confetti from '../components/Confetti';
import { getRandomNumber } from '../utils/contract';

interface Prize {
  id: string;
  text: string;
  color: string;
}

const SpinnerGame: React.FC = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [newPrize, setNewPrize] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animationRef = useRef<number>();

  // Solid colors matching the UI theme
  const colors = [
    '#FF4D94', // pink
    '#9F7AEA', // purple
    '#FF80B5', // pink-light
    '#B794F4', // purple-light
    '#FF1A75', // pink-dark
    '#805AD5', // purple-dark
    '#FF4D94', // pink
    '#9F7AEA'  // purple
  ];

  const addPrize = () => {
    if (newPrize.trim() && prizes.length < 8) {
      setPrizes([...prizes, {
        id: Math.random().toString(36).substr(2, 9),
        text: newPrize.trim(),
        color: colors[prizes.length % colors.length]
      }]);
      setNewPrize('');
    }
  };

  const removePrize = (id: string) => {
    setPrizes(prizes.filter(prize => prize.id !== id));
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || prizes.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationRef.current);

    const sliceAngle = (2 * Math.PI) / prizes.length;

    prizes.forEach((prize, index) => {
      // Draw solid color slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, index * sliceAngle, (index + 1) * sliceAngle);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();
      
      // Draw slice border
      ctx.strokeStyle = '#0A0A0A';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate(index * sliceAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Inter';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(prize.text, radius - 20, 6);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#0A0A0A';
    ctx.fill();
    ctx.strokeStyle = '#FF4D94';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  const spinWheel = async () => {
    if (isSpinning || prizes.length < 2) return;

    setIsSpinning(true);
    setWinner(null);
    setShowWinnerAnimation(false);

    try {
      const randomValue = await getRandomNumber();
      const totalRotation = 4 * Math.PI + (randomValue * 2 * Math.PI);
      const duration = 4000;
      const startTime = performance.now();
      const startRotation = rotationRef.current;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        
        rotationRef.current = startRotation + totalRotation * easeOut(progress);
        drawWheel();

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsSpinning(false);
          const winningIndex = Math.floor(
            ((-rotationRef.current % (2 * Math.PI)) / (2 * Math.PI)) * prizes.length
          );
          setWinner(prizes[winningIndex]);
          setShowWinnerAnimation(true);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error spinning wheel:', error);
      setIsSpinning(false);
    }
  };

  const resetWheel = () => {
    if (isSpinning) return;
    rotationRef.current = 0;
    setWinner(null);
    setShowWinnerAnimation(false);
    drawWheel();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 400;
      canvas.height = 400;
      drawWheel();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prizes]);

  return (
    <>
      {showWinnerAnimation && <Confetti />}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-pink/5 to-transparent rounded-3xl blur-2xl" />
          <div className="relative bg-dark-light/30 rounded-3xl border border-pink/10 backdrop-blur-xl overflow-hidden">
            <div className="relative px-6 pt-6 pb-5 border-b border-pink/10 bg-gradient-to-br from-dark-lighter/50 to-dark-lighter/30">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink/40 to-purple/40 rounded-lg blur-lg transition-all duration-300 group-hover:blur-xl" />
                  <div className="relative bg-dark-lighter rounded-lg p-2.5 border border-pink/20 backdrop-blur-xl">
                    <RotateCcw className="h-4 w-4 text-pink" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-pink">Prize Spinner</h2>
                  <p className="text-pink/60 text-xs mt-0.5">Add prizes and spin to select a winner</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-pink">Add Prizes</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newPrize}
                        onChange={(e) => setNewPrize(e.target.value)}
                        placeholder="Enter prize..."
                        className="flex-1 bg-dark-lighter border border-pink/10 rounded-xl px-4 py-2 text-sm text-pink placeholder-pink/30"
                        maxLength={30}
                        onKeyPress={(e) => e.key === 'Enter' && addPrize()}
                      />
                      <button
                        onClick={addPrize}
                        disabled={!newPrize.trim() || prizes.length >= 8}
                        className="bg-dark-lighter border border-pink/10 rounded-xl p-2 text-pink hover:border-pink/20 disabled:opacity-50"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-pink">Prize List</h3>
                    <div className="space-y-2">
                      {prizes.map((prize) => (
                        <div
                          key={prize.id}
                          className="flex items-center justify-between bg-dark-lighter border border-pink/10 rounded-xl px-4 py-2"
                        >
                          <span className="text-sm text-pink">{prize.text}</span>
                          <button
                            onClick={() => removePrize(prize.id)}
                            className="text-pink/40 hover:text-pink"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {prizes.length === 0 && (
                        <p className="text-pink/40 text-sm text-center py-4">
                          Add some prizes to get started
                        </p>
                      )}
                    </div>
                  </div>

                  {winner && showWinnerAnimation && (
                    <div className="relative animate-bounce-slow">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-50 blur rounded-xl" />
                      <div className="relative bg-dark-lighter border border-pink/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                          <div className="bg-pink/10 rounded-lg p-2">
                            <Trophy className="h-5 w-5 text-pink animate-pulse" />
                          </div>
                          <div>
                            <p className="text-sm text-pink/60">Winner</p>
                            <div className="flex items-center space-x-2">
                              <p className="text-lg font-bold text-pink">{winner.text}</p>
                              <Sparkles className="h-4 w-4 text-pink animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full max-w-[400px] mx-auto"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-pink rotate-180" />
                  </div>
                  
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={resetWheel}
                      disabled={isSpinning}
                      className="relative group disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink/5 to-purple/5 rounded-xl blur transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                      <div className="relative bg-dark-lighter px-4 py-2.5 rounded-xl border border-pink/10 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/20">
                        <span className="flex items-center space-x-2 text-pink">
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Reset</span>
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={spinWheel}
                      disabled={isSpinning || prizes.length < 2}
                      className="relative group disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink to-purple opacity-50 blur rounded-xl transform transition-all duration-300 group-hover:scale-110" />
                      <div className="relative bg-dark-lighter px-4 py-2.5 rounded-xl border border-pink/20 backdrop-blur-sm transition-all duration-300 group-hover:border-pink/40">
                        <span className="flex items-center space-x-2 text-pink">
                          <Play className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Spin</span>
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpinnerGame;