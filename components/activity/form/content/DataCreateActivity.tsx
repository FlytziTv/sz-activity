import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormGroupChildren } from "@/components/default/form/FormGroup";
import { Input } from "@/components/ui/input";

const distance = [
  { title: "Kilomètre", value: "km" },
  { title: "Mètre", value: "m" },
];

const time = [
  { title: "Heure", value: "h" },
  { title: "Minute", value: "min" },
];

const difficulty = [
  { title: "Facile", value: "facile" },
  { title: "Moyen", value: "moyen" },
  { title: "Difficile", value: "difficile" },
  { title: "Expert", value: "expert" },
];

export function DataCreateDistance({
  name,
  label,
  type,
  placeholder,
  onChange,
  defaultValueInput,
  requireInput,
  defaultValueSelect,
  requireSelect,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValueInput?: string | number;
  requireInput?: boolean;
  defaultValueSelect?: string;
  requireSelect?: boolean;
}) {
  return (
    <FormGroupChildren name={name} label={label}>
      <div className="grid grid-cols-3 gap-2 w-full">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValueInput}
          required={requireInput || true}
          className="col-span-2"
        />
        <Select
          name={name}
          defaultValue={defaultValueSelect}
          key={defaultValueSelect}
          required={requireSelect || true}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {distance.map((dist) => (
                <SelectItem key={dist.value} value={dist.value}>
                  {dist.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </FormGroupChildren>
  );
}

export function DataCreateTime({
  name,
  label,
  type,
  placeholder,
  onChange,
  defaultValueInput,
  requireInput,
  defaultValueSelect,
  requireSelect,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValueInput?: string | number;
  requireInput?: boolean;
  defaultValueSelect?: string;
  requireSelect?: boolean;
}) {
  return (
    <FormGroupChildren name={name} label={label}>
      <div className="grid grid-cols-3 gap-2 w-full">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValueInput}
          required={requireInput || true}
          className="col-span-2"
        />
        <Select
          name={name}
          defaultValue={defaultValueSelect}
          key={defaultValueSelect}
          required={requireSelect || true}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {time.map((dist) => (
                <SelectItem key={dist.value} value={dist.value}>
                  {dist.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </FormGroupChildren>
  );
}

export function DataCreateDificulty({
  name,
  label,
  defaultValueSelect,
  requireSelect,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValueInput?: string | number;
  requireInput?: boolean;
  defaultValueSelect?: string;
  requireSelect?: boolean;
}) {
  return (
    <FormGroupChildren name={name} label={label}>
      <Select
        name={name}
        defaultValue={defaultValueSelect}
        key={defaultValueSelect}
        required={requireSelect || true}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {difficulty.map((dist) => (
              <SelectItem key={dist.value} value={dist.value}>
                {dist.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormGroupChildren>
  );
}
