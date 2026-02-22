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
  { title: "Privé", value: "private" },
  { title: "Public", value: "public" },
];

export default function VisibilityLists({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor="category">Visibilité</FieldLabel>
      <Select
        name="category"
        defaultValue={defaultValue}
        key={defaultValue}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir une visibilité" />
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
