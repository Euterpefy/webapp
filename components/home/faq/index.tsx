import { Accordion } from '@/components/ui/accordion';
import React from 'react';
import { faqList } from './faqs';
import FAQ from './faq';

const FAQSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="text-3xl font-bold text-center px-4 py-6 bg-secondary/50 w-full">
        FAQ
      </div>
      <Accordion type="single" collapsible className="px-4 w-full">
        {faqList.map((faq, index) => (
          <FAQ key={index} {...faq} />
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
