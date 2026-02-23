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

const activityType = [
  { title: "Randonnée", value: "randonnee" },
  { title: "Ski de randonnée", value: "ski-randonnee" },
  { title: "Via ferrata", value: "via-ferrata" },
  { title: "Raquettes", value: "raquettes" },
  { title: "Marche", value: "marche" },
  { title: "Trail", value: "trail" },
  { title: "VTT", value: "vtt" },
  { title: "Alpinisme", value: "alpinisme" },
  { title: "Escalade", value: "escalade" },
  { title: "Canyoning", value: "canyoning" },
  { title: "Autre", value: "autre" },
];

export function DataCreateDistance({
  name,
  label,
  type,
  placeholder,
  onChange,
  onSelectChange,
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
  onSelectChange?: (value: string) => void;
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
          name={`${name}Unit`}
          defaultValue={defaultValueSelect}
          onValueChange={onSelectChange}
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
  onSelectChange,
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
  onSelectChange?: (value: string) => void;
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
          name={`${name}Unit`}
          defaultValue={defaultValueSelect}
          key={defaultValueSelect}
          onValueChange={onSelectChange}
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
  onSelectChange,
  requireSelect,
}: {
  name: string;
  label: string;
  onSelectChange?: (value: string) => void;
  defaultValueSelect?: string;
  requireSelect?: boolean;
}) {
  return (
    <FormGroupChildren name={name} label={label}>
      <Select
        name={name}
        defaultValue={defaultValueSelect}
        key={defaultValueSelect}
        onValueChange={onSelectChange}
        required={requireSelect || true}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisissez une difficulté" />
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

export function ActivityType({
  name,
  label,
  defaultValueSelect,
  onSelectChange,
  requireSelect,
}: {
  name: string;
  label: string;
  onSelectChange?: (value: string) => void;
  defaultValueSelect?: string;
  requireSelect?: boolean;
}) {
  return (
    <FormGroupChildren name={name} label={label}>
      <Select
        name={name}
        defaultValue={defaultValueSelect}
        key={defaultValueSelect}
        onValueChange={onSelectChange}
        required={requireSelect || true}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisissez un type d'activité" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {activityType.map((dist) => (
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

export function Multipos({
  name,
  label,
  type,
  placeholder1,
  placeholder2,
  onChange1,
  onChange2,
  defaultValueInput1,
  defaultValueInput2,
  requireInput,
}: {
  name: string;
  label: string;
  type: string;
  placeholder1?: string;
  placeholder2?: string;
  onChange1?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange2?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValueInput1?: string | number;
  defaultValueInput2?: string | number;
  requireInput?: boolean;
}) {
  return (
    <FormGroupChildren name={name} label={label}>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder1}
          onChange={onChange1}
          defaultValue={defaultValueInput1}
          required={requireInput || true}
        />
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder2}
          onChange={onChange2}
          defaultValue={defaultValueInput2}
          required={requireInput || true}
        />
      </div>
    </FormGroupChildren>
  );
}
