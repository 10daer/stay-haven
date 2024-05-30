import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useLogin } from "../../hooks/Authentication/useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical, {
  StyledImage,
  StyledInput,
} from "../../ui/FormRowVertical";

const StyledBtnContainer = styled.div`
  padding: 0rem 1.2rem;
  width: 100%;
  display: flex;
  gap: 4rem;
  align-self: center;
  margin-top: 1rem;

  button {
    width: -webkit-fill-available !important;
    font-size: 2rem !important;
    font-weight: 500 !important;
    padding: 0.4rem 0.8rem !important;
    align-items: center imo !important;
    border-radius: var(--border-radius-md);
  }
`;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInMode, setSignInMode] = useState("");
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isAuthenticating } = useLogin();

  function onSubmit({ email, password }) {
    setSignInMode("password");
    login({ email, password }, { onSettled: reset });
  }

  function googleSignIn(e) {
    e.preventDefault();
    setSignInMode("google");
  }

  return (
    <Form type="auth" onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email" error={errors?.email}>
        <>
          <StyledInput
            type="email"
            placeholder="Your email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            {...register("email", {
              required: "The email field is required",
            })}
          />
          <StyledImage alt="email-Icon" src="/email.svg" />
        </>
      </FormRowVertical>

      <FormRowVertical label="Password" error={errors?.password}>
        <StyledInput
          type={showPassword ? "text" : "password"}
          id="password"
          title="Minimum of 8 characters"
          placeholder="Your-Password"
          autoComplete="current-password"
          {...register("password", {
            required: "The password field is required",
            minLength: {
              value: 8,
              message: "Password must be more than 8 characters",
            },
          })}
        />
        <StyledImage
          alt="password-Icon"
          imgType="password"
          src={showPassword ? "/eye-off.svg" : "/eye.svg"}
          onClick={() =>
            getValues().password && setShowPassword((show) => !show)
          }
        />
      </FormRowVertical>

      <StyledBtnContainer>
        <Button
          size="large"
          type="submit"
          disabled={isAuthenticating && signInMode === "password"}
        >
          Login
        </Button>

        <Button
          size="large"
          disabled={isAuthenticating && signInMode === "google"}
          onClick={googleSignIn}
        >
          Google
        </Button>
      </StyledBtnContainer>
    </Form>
  );
}

export default LoginForm;
