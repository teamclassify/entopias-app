import { Accordion } from "@/components/ui/accordion";
import Filters from "./Filters";

export default function AccordionFilter() {
  return (
    <Accordion type="single" defaultValue={1} className="w-full">
      <Filters />
    </Accordion>
  );
}
