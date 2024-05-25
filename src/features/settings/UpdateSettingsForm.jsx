import styled from "styled-components";
import { HiInformationCircle } from "react-icons/hi";

import {
  UseUpdateSettingValue,
  UseSetting,
} from "../../hooks/Settings/useSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

const StyledNote = styled.p`
  font-size: 14px;
  max-width: 51rem;
  display: flex;
  background-color: var(--color-brand-500);
  padding: 0.25rem 2rem;
  border-radius: 10px;
  color: white;
  margin-bottom: 2rem;
  font-weight: 500;
  align-items: center;
  gap: 2rem;
`;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      breakfastPrice,
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
    } = {},
    error,
  } = UseSetting();
  const { isUpdating, updateSettingFn } = UseUpdateSettingValue();

  function handleUpdate(e, field) {
    const value = e.target.value;
    if (!value) return;
    updateSettingFn({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <StyledNote>
        <HiInformationCircle size={30} /> All the settings values are in per
        bookings
      </StyledNote>

      <FormRow name="Min-nights" label="Minimum Nights">
        <Input
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow name="max-nights" label="Maximum Nights">
        <Input
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
        />
      </FormRow>

      <FormRow name="max-guests" label="Maximum Guests">
        <Input
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
        />
      </FormRow>

      <FormRow name="breakfast-price" label="Breakfast price">
        <Input
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
