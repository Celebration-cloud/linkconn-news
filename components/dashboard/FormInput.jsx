import { Input } from "@heroui/input";

const FormInput = ({ label, value, setValue, name, placeholder, error }) => (
  <Input
    isRequired
    label={label}
    name={name}
    labelPlacement="outside"
    value={value}
    placeholder={placeholder}
    onValueChange={setValue}
    validate={() => error || null}
    isInvalid={!!error}
    errorMessage={error}
  />
);

export default FormInput;