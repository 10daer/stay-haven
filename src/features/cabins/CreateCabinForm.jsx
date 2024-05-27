import { useForm } from "react-hook-form";

import { useCreateCabin, useEditCabin } from "../../hooks/Cabins/useCabin";
import FormRow from "../../ui/FormRow";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import GlobalTypes from "../../utils/GlobalType";

CreateCabinForm.propTypes = GlobalTypes;

function CreateCabinForm({ cabinData = {}, onClose }) {
  const { isEditing, editCabin } = useEditCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const isChanging = isEditing || isCreating;

  const { id: isEditId, ...editValues } = cabinData;
  const isEditSession = Boolean(isEditId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const onSuccess = () => {
      reset();
      onClose?.();
    };

    if (isEditSession) {
      editCabin({ newCabin: { ...data, image }, id: isEditId }, { onSuccess });
    } else {
      createCabin({ ...data, image }, { onSuccess });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow name="name" label="Cabin name" error={errors?.name}>
        <Input
          type="text"
          disabled={isChanging}
          id="name"
          {...register("name", { required: "The name field is required" })}
        />
      </FormRow>

      <FormRow
        name="maxCapacity"
        label="Maximum capacity"
        error={errors?.maxCapacity}
      >
        <Input
          type="number"
          disabled={isChanging}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "The maximum capacity field is required",
            min: {
              value: 1,
              message: "The cabin capacity must be greather than 0",
            },
          })}
        />
      </FormRow>

      <FormRow
        name="regularPrice"
        label="Regular price"
        error={errors?.regularPrice}
      >
        <Input
          type="number"
          disabled={isChanging}
          id="regularPrice"
          {...register("regularPrice", {
            required: "The price field is required",
            min: {
              value: 100,
              message: "The cabin price must be greather than 100",
            },
          })}
        />
      </FormRow>

      <FormRow name="discount" label="Discount" error={errors?.discount}>
        <Input
          type="number"
          id="discount"
          disabled={isChanging}
          defaultValue={0}
          {...register("discount", {
            required: "The discount field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "The discount can't be more than the cabin price",
          })}
        />
      </FormRow>

      <FormRow
        name="description"
        label="Description for website"
        error={errors?.description}
      >
        <Textarea
          type="number"
          disabled={isChanging}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "The description field is required",
          })}
        />{" "}
      </FormRow>

      <FormRow name="image" label="Cabin photo" error={errors?.image}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isChanging}
          {...register("image", {
            required: isEditSession
              ? false
              : "The description field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isChanging}>
          {isEditSession ? "Update" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
