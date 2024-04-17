import React from 'react';
import Steps from './steps';
import CallToAction from './cta';

const HowItWorks = () => {
  return (
    <div className="text-foreground flex flex-col items-center">
      <div className="text-3xl font-bold text-center px-4 py-6 bg-secondary w-full">
        How It Works
      </div>
      <Steps />
      <CallToAction />
    </div>
  );
};

export default HowItWorks;
