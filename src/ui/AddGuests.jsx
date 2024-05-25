import { Controller, useForm } from "react-hook-form";

import { useCreateGuest } from "../hooks/Guests/useGuests";
import { nations } from "../utils/constants";

import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import Button from "./Button";
import Heading from "./Heading";
import { StyledSelect } from "./Select";

function AddGuests({ onClose }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isCreating, createGuest } = useCreateGuest();

  function onsubmit(data) {
    const { name, email, nationalId } = data;
    const nationality = data.nationality.value;
    const flag = nations.filter(
      (nation) => nation.nationality === nationality
    )[0].flag;
    createGuest(
      { name, email, nationality, nationalId, flag },
      {
        onSettled: () => {
          reset();
          onClose?.();
        },
      }
    );
  }
  return (
    <>
      <Heading style={{ marginBottom: "1rem" }} as="h2">
        Add New Guest
      </Heading>
      <Form onSubmit={handleSubmit(onsubmit)}>
        <FormRow
          type="modal"
          name="name"
          label="Guest's Fullname"
          error={errors?.name?.message}
        >
          <Input
            type="text"
            disabled={isCreating}
            id="fullName"
            {...register("name", {
              required: "The name field is required",
            })}
          />
        </FormRow>

        <FormRow
          type="modal"
          name="email"
          label="Guest's Email Address"
          error={errors?.email?.message}
        >
          <Input
            type="email"
            disabled={isCreating}
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
          as="div"
          type="modal"
          name="nationality"
          label="Guest's Nationality"
          error={errors?.nationality?.message}
        >
          <Controller
            name="nationality"
            control={control}
            rules={{
              required: "The nationality field is required",
            }}
            render={({ field }) => (
              <StyledSelect
                type="add-guest"
                {...field}
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
                disabled={isCreating}
                options={nations.map((nation) => ({
                  value: nation.nationality,
                  label: nation.nationality,
                }))}
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
                placeholder="Select Your Nationality"
              />
            )}
          />
        </FormRow>

        <FormRow
          type="modal"
          name="nationalId"
          label="Guest's NationalId"
          error={errors?.nationalId?.message}
        >
          <Input
            type="number"
            disabled={isCreating}
            id="nationalId"
            {...register("nationalId", {
              required: "The ID field is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            onClick={() => {
              reset();
              onClose?.();
            }}
            type="reset"
          >
            Cancel
          </Button>
          <Button disabled={isCreating}>Add Guest</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default AddGuests;
