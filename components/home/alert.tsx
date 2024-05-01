import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Icons } from "../icons";

const HomePageAlert = (): JSX.Element => {
  return (
    <section className="px-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Icons.spotify /> Spotify Login Limitations
                </div>
              </AccordionTrigger>
              <AccordionContent>
                We apologize for the inconvenience, but the Euterpefy project is
                currently limited by the Spotify API&apos;s development mode
                restrictions. This means that users are unable to log in with
                their Spotify accounts at the moment. We are actively working on
                requesting the necessary permissions from Spotify to extend the
                API usage for our application. Once we have obtained the
                required quota, the app will be fully functional and available
                for everyone to use. In the meantime, if you would like to test
                out the Euterpefy app, please send an email to
                <span className="text-info ml-2">
                  jack.dev.blue.euterpefy@gmail.com
                </span>
                . We will be happy to provide you with access and assist you in
                evaluating the current state of the project. We apologize for
                any inconvenience and appreciate your understanding as we work
                to overcome these limitations and make Euterpefy accessible to
                all music lovers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AlertDescription>
      </Alert>
    </section>
  );
};

export default HomePageAlert;
