import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "../../hooks/Authentication/useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticating } = useSignup();

  function onsubmit(data) {
    const { name, email, password } = data;

    signup({ name, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <FormRow name="name" label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isAuthenticating}
          id="fullName"
          {...register("name", {
            required: "The name field is required",
          })}
        />
      </FormRow>

      <FormRow
        name="email"
        label="Email address"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          disabled={isAuthenticating}
          id="email"
          {...register("email", {
            required: "The email field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email provided",
            },
          })}
        />
      </FormRow>

      <FormRow
        name="password"
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          disabled={isAuthenticating}
          id="password"
          {...register("password", {
            required: "The password field is required",
            minLength: {
              value: 8,
              message: "Must be more than 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        name="password"
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          disabled={isAuthenticating}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "The confirm password field is required",
            validate: (value) =>
              value === getValues().password ||
              "Must be the same with the password",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" onClick={reset} type="reset">
          Cancel
        </Button>
        <Button disabled={isAuthenticating}>Create</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
