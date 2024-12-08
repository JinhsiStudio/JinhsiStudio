import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./base/select";
export interface SelectOption {
  value: string;
  label: React.ReactNode;
}

export interface SingleSelectProps {
  defaultValue: string;
  options: SelectOption[] | undefined;
  className?: string | undefined;
  onValueChange(value: string): void;
}

function getLabel(
  value: string,
  options: SelectOption[],
): React.ReactNode | null {
  const option = options.find((option) => option.value === value);
  return option?.label;
}

export function SingleSelect(props: SingleSelectProps) {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger className={props.className}>
        <SelectValue
          placeholder={
            props.options && getLabel(props.defaultValue, props.options)
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options &&
            props.options?.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
