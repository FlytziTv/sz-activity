import { FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";

export function FormGroup({
  name,
  label,
  type,
  placeholder,
  onChange,
  defaultValue,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    </FieldGroup>
  );
}

export function FormGroupChildren({
  name,
  label,
  children,
}: {
  name: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <FieldGroup>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {children}
    </FieldGroup>
  );
}
