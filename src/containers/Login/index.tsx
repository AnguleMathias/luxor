import * as React from "react";
import * as Yup from "yup";

import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import {
  ConnectedFormGroup,
  ConnectedPasswordGroup,
} from "../../components/FormElements";

import CardBase from "../../components/Card/CardBase";
import MotionFlex from "../../components/MotionFlex";
import SideSlider from "../../components/SideSlider";

const LoginFormValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("An email address is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters")
    .required("A password is required"),
});

type LoginProps = {};

type InitialValues = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: InitialValues) => {
    console.log("Login values: ", values.email, values.password);
    navigate("/pokemons");
  };

  return (
    <Flex width="100%">
      <Flex>
        <SideSlider>
          <CardBase width="100%" pb={12} pt={12} pl={8} pr={8}>
            <Formik
              validationSchema={LoginFormValidation}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (
                { email, password },
                { setStatus, setSubmitting }
              ) => {
                setStatus(null);
                try {
                  setSubmitting(true);
                  await handleSubmit({ email, password });
                  setSubmitting(false);
                } catch (error) {
                  console.log("error", error);
                }
              }}
            >
              {({ isSubmitting, status }: FormikProps<InitialValues>) => (
                <Form style={{ width: "100%" }}>
                  <ConnectedFormGroup name="email" placeholder="Email" />
                  <ConnectedPasswordGroup
                    name="password"
                    placeholder="Password"
                  />
                  {status && (
                    <MotionFlex
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      justify="center"
                      mb={2}
                      width="100%"
                    >
                      <p>{status}</p>
                    </MotionFlex>
                  )}
                  <Flex
                    mt={10}
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      width="100%"
                      borderRadius="6px"
                      background="#f2c94c"
                      textColor="white"
                      _hover={{ background: "white", textColor: "#f2c94c" }}
                    >
                      LOGIN
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </CardBase>
        </SideSlider>
      </Flex>
    </Flex>
  );
};

export default Login;
