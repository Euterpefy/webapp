import React from 'react';
import Steps from './steps';
import CallToAction from './cta';

const HowItWorks = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="text-3xl font-bold text-center px-4 py-6 bg-secondary/50 w-full">
        How It Works
      </div>
      <Steps />
      <CallToAction />
    </section>
  );
};

export default HowItWorks;
