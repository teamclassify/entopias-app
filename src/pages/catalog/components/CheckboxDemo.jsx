import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo({ name, onChange, filter }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" onCheckedChange={() => onChange(name, filter)} />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
        {name}
      </label>
    </div>
  );
}
