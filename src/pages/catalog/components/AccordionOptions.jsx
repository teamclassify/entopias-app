import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckboxDemo } from "./CheckboxDemo";
export default function AccordionOption({ nameFilter, options, handleSelect }) {
  return (
    <AccordionItem value={1}>
      <AccordionTrigger>{nameFilter}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3">
        {[...options].map((option) => (
          <CheckboxDemo
            option={nameFilter === "Peso" ? (option += " gr") : option}
            onChange={handleSelect}
            category={nameFilter}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
