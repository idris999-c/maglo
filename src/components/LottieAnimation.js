import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import moneyAnimation from '../lottifiles/money.json';

export default function LottieAnimation({ 
  onComplete, 
  className = "w-32 h-32", 
  loop = false,
  autoplay = true 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loop && onComplete) {
      // Animation süresi yaklaşık 2 saniye (yarısında dursun)
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loop, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={moneyAnimation}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
