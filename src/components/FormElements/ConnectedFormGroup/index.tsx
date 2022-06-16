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
  InputLeftElement,
} from "@chakra-ui/react";
import { useField } from "formik";

export type ConnectedFormGroupProps = InputProps & {
  label?: string;
  name: string;
  icon?: React.FC;
  iconPosition?: string;
  iconColor?: string;
};

const ConnectedFormGroup: React.FC<ConnectedFormGroupProps> = ({
  label,
  icon,
  iconPosition,
  iconColor,
  ...rest
}) => {
  const [field, meta] = useField(rest.name);

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="100%"
      mr={rest.mr}
      ml={rest.ml}
      mt={rest.mt}
      mb={rest.mb}
    >
      <FormControl>
        {label && (
          <FormLabel
            style={{
              position: "absolute",
              zIndex: "1",
              backgroundColor: "white",
              top: "-1rem",
              left: "1rem",
              paddingLeft: "0.3rem",
            }}
            htmlFor={field.name}
          >
            {label}
          </FormLabel>
        )}
        <InputGroup size="md" flexDirection="row-reverse">
          <Input
            borderColor={
              meta.touched ? (meta.error ? "red" : "#f2c94c") : "#737373"
            }
            focusBorderColor="#f2c94c"
            textColor="white"
            {...field}
            id={field.name}
            {...rest}
          />
          {icon &&
            (iconPosition === "left" ? (
              <InputLeftElement>
                <Icon
                  onClick={() => {
                    return;
                  }}
                  as={icon}
                  color={iconColor ? iconColor : "#f2c94c"}
                />
              </InputLeftElement>
            ) : (
              <InputRightElement>
                <Icon
                  onClick={() => {
                    return;
                  }}
                  as={icon}
                  color={iconColor ? iconColor : "#f2c94c"}
                />
              </InputRightElement>
            ))}
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
  type: "text",
};
