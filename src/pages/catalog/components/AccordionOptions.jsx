import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckboxDemo } from "./CheckboxDemo";

export default function AccordionOption({ name, options, /*handleSelect*/ }) {
  console.log(options)

  return (
    <AccordionItem value={1}>
      <AccordionTrigger>{name}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3">
        {options.map((option) => (
          <CheckboxDemo
            key={option.id}
            name={option.type}
            //onChange={handleSelect}
            filter={option.name}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
