import { FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function FormGroup({
  name,
  label,
  type,
  placeholder,
  onChange,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        required
      />
    </FieldGroup>
  );
}
