import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQProps {
  id: string;
  q: React.ReactNode;
  a: React.ReactNode;
}

const FAQ: React.FC<FAQProps> = ({ id, q, a }) => {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{q}</AccordionTrigger>
      <AccordionContent>{a}</AccordionContent>
    </AccordionItem>
  );
};

export default FAQ;
