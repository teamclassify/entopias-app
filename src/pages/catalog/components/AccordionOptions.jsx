import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckboxDemo } from "./CheckboxDemo";

export default function AccordionOption({ name, options }) {
  return (
    <AccordionItem value={1}>
      <AccordionTrigger>{name}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3">
        {[...options].map((option) => (
          <CheckboxDemo
            name={option}
            //onChange={handleSelect}
            filter={option}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
