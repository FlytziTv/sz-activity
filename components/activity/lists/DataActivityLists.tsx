import { FieldGroup, FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const type = [
  { title: "Simple", value: "simple" },
  { title: "Détaillée", value: "detailed" },
];

export default function DataActivityLists({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor="category">Type de formualire</FieldLabel>
      <Select
        name="category"
        defaultValue={defaultValue}
        key={defaultValue}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir un type de formulaire" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {type.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldGroup>
  );
}
