import * as React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import { FaEye, FaEyeDropper } from "react-icons/fa";

export type ConnectedFormGroupProps = InputProps & {
  label?: string;
  name: string;
};

const ConnectedFormGroup: React.FC<ConnectedFormGroupProps> = ({
  label,
  type,
  ...rest
}) => {
  const [field, meta] = useField(rest.name);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      flexDirection="column"
      width="100%"
      mr={rest.mr}
      ml={rest.ml}
      mt={rest.mt}
      mb={rest.mb}
    >
      <FormControl>
        {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
        <InputGroup size="md">
          <Input
            focusBorderColor="#f2c94c"
            borderColor={
              meta.touched ? (meta.error ? "red" : "#f2c94c") : "#737373"
            }
            type={show ? "text" : type}
            textColor="white"
            {...field}
            {...rest}
            id={field.name}
            {...rest}
          />
          <InputRightElement>
            <Icon
              size="20px"
              onClick={handleClick}
              as={show ? FaEyeDropper : FaEye}
              color={show ? "#f2c94c" : "#f2c94c"}
            />
          </InputRightElement>
        </InputGroup>
        {meta.touched && meta.error ? (
          <p style={{ color: "red" }}>{meta.error}</p>
        ) : null}
      </FormControl>
    </Flex>
  );
};

export default ConnectedFormGroup;

ConnectedFormGroup.defaultProps = {
  mb: 2,
  type: "password",
};
