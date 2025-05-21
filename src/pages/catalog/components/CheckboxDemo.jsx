import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo({ category, onChange, option }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        onCheckedChange={(checked) => {
          onChange(category, option, checked);
        }}
      />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
        {option}
      </label>
    </div>
  );
}
