/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Input } from "@heroui/react";

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