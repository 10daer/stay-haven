import { addDays, differenceInDays, formatISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiUserPlus } from "react-icons/hi2";
import styled from "styled-components";

import { useCreateBooking } from "../hooks/Bookings/useBookings";
import { UseCabins } from "../hooks/Cabins/useCabin";
import { useGuests } from "../hooks/Guests/useGuests";
import { UseSetting } from "../hooks/Settings/useSetting";
import useStopLoading from "../hooks/useStopLoading";
import { formatCurrency } from "../utils/helpers";

import AddGuests from "../ui/AddGuests";
import Button from "../ui/Button";
import ButtonIcon from "../ui/ButtonIcon";
import Checkbox from "../ui/Checkbox";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { StyledSelect } from "../ui/Select";
import { SpinnerMini } from "../ui/Spinner";
import Textarea from "../ui/Textarea";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border-top: 1px solid var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 2.4rem 0rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 0.4rem;

  & > div {
    width: -webkit-fill-available;
  }
`;

function CreateBooking() {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const {
    control,
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const { cabins, isLoading: isLoading1 } = UseCabins();
  const { guests, isLoading: isLoading2 } = useGuests();
  const { settings } = UseSetting();
  const { isCreating, createBooking } = useCreateBooking();
  const isLoadingCabins = useStopLoading(isLoading1);
  const isLoadingGuests = useStopLoading(isLoading2);
  const [endDateVar, setEndDateVar] = useState(
    addDays(new Date(Date.now()), 1)
  );

  let newBooking = useRef({}).current;

  const handleGuestChange = (selectedOptions) => {
    const selectedGuests = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    newBooking.guestsName = selectedGuests;
  };

  function createBookingFn() {
    const {
      cabinId,
      cabinPrice,
      extrasPrice,
      numGuests,
      status,
      startDate,
      endDate,
      observation,
      guestsName,
      numNights,
    } = newBooking;

    const guestId = guests.map(
      (guest) => guestsName.includes(guest) && guest.id
    );

    const bookingData = {
      cabinId,
      cabinPrice,
      extrasPrice,
      totalPrice: cabinPrice + extrasPrice,
      numGuests,
      status,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      observation,
      guestId,
      numNights,
      isPaid: hasPaid,
      hasBreakfast: addBreakfast,
    };

    createBooking(bookingData, { onSuccess: reset });
  }

  useEffect(() => {
    if (newBooking.cabin) {
      newBooking.cabinId = newBooking.cabin.id;
      newBooking.cabinPrice = newBooking.cabin.regularPrice;
    }
    if (addBreakfast && newBooking.numNights && newBooking.numGuests) {
      newBooking.extrasPrice =
        settings?.breakfastPrice *
        newBooking.numNights *
        Number(newBooking.numGuests);
    } else {
      newBooking.extrasPrice = 0;
    }

    if (hasPaid) {
      newBooking.status = "checked-in";
    } else {
      newBooking.status = "unconfirmed";
    }

    if (newBooking.startDate && newBooking.endDate)
      newBooking.numNights = differenceInDays(
        newBooking.endDate,
        newBooking.startDate
      );
  }, [addBreakfast, hasPaid, newBooking, settings]);

  return (
    <>
      <Heading as="h2">Create a booking</Heading>
      <Form type="create-booking" onSubmit={handleSubmit(createBookingFn)}>
        <FormRow
          name="cabinName"
          as="div"
          label="Select Cabin"
          error={
            (isLoadingCabins && !cabins.length ? (
              <SpinnerMini />
            ) : (
              !cabins.length && "Unable to fetch cabins"
            )) || errors?.cabinName
          }
        >
          <select
            id="cabinName"
            value={newBooking.cabinName}
            disabled={isLoadingCabins && !cabins.length}
            {...register("cabinName", {
              required: "You are required to select a cabin",
              onChange: () => {
                newBooking.cabin = cabins.filter(
                  (el) => el.name === getValues().cabinName
                )[0];
              },
            })}
          >
            {!cabins.length ? (
              <option value="nil"></option>
            ) : (
              cabins.map((cabin) => (
                <option value={cabin.name} key={cabin.id}>
                  Cabin-{cabin.name}
                </option>
              ))
            )}
          </select>
        </FormRow>
        <FormRow name="numGuests" label="Number of guests" error="">
          <Input
            type="number"
            id="numGuest"
            {...register("numGuests", {
              required: "The number of guests field is required",
              onBlur: () => {
                newBooking.numGuests = +getValues().numGuests;
              },
              validate: (value) =>
                +value <= +settings.maxGuestsPerBooking ||
                `Number of guests is grether than ${settings.maxGuestsPerBooking}`,
            })}
          />
        </FormRow>
        <FormRow
          as="div"
          name="guestsName"
          label="Name of guests"
          error={
            (isLoadingGuests && !guests.length ? (
              <SpinnerMini />
            ) : (
              !guests.length && "Unable to fetch Guests"
            )) || errors?.guestsName
          }
        >
          <StyledContainer>
            <Modal>
              <Controller
                name="guestsName"
                control={control}
                rules={{
                  required: "You are required to select a guest",
                  validate: (value) =>
                    value?.length <= newBooking.cabin.maxCapacity ||
                    "This cabin has reached maximum capacity",
                }}
                render={({ field }) => (
                  <StyledSelect
                    {...field}
                    classNamePrefix="react-select"
                    isMulti
                    closeMenuOnSelect={false}
                    isDisabled={isLoadingGuests && !guests.length}
                    options={guests.map((guest) => ({
                      value: guest.fullName,
                      label: guest.fullName,
                    }))}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions);
                      handleGuestChange(selectedOptions);
                    }}
                    placeholder="Select the guest(s)    "
                  />
                )}
              />
              <Modal.Open name="add-guest">
                <ButtonIcon type="button" name="add-guest">
                  <HiUserPlus />
                </ButtonIcon>
              </Modal.Open>
              <Modal.Window name="add-guest">
                <AddGuests />
              </Modal.Window>
            </Modal>
          </StyledContainer>
        </FormRow>
        <FormRow name="start-date" label="Start date" error={errors?.startDate}>
          <Input
            min={formatISO(Date.now(), { representation: "date" })}
            max="2050-12-31"
            type="date"
            disabled=""
            id="startDate"
            {...register("startDate", {
              required: "The booking start date is required",
              onBlur: () => {
                newBooking.startDate = getValues().startDate;
                setEndDateVar(addDays(new Date(getValues().startDate), 1));
              },
              validate: (value) =>
                value !== getValues().endDate ||
                "Start date must not be equal to end date",
            })}
          />
        </FormRow>
        <FormRow name="end-date" label="End date" error={errors?.endDate}>
          <Input
            min={formatISO(endDateVar, {
              representation: "date",
            })}
            max="2050-12-31"
            type="date"
            disabled=""
            id="endDate"
            {...register("endDate", {
              required: "The booking end date is required",
              onBlur: () => {
                newBooking.endDate = getValues().endDate;
              },
              validate: (value) =>
                value !== getValues().startDate ||
                "End date must not be equal to start date",
            })}
          />
        </FormRow>
        <FormRow name="observation" label="Observation" error="">
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            placeholder="If you have no description input 'Nil'"
            disabled=""
            {...register("observation", {
              onBlur: () => {
                newBooking.observation = getValues().observation;
              },
            })}
          />
        </FormRow>
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => setAddBreakfast((val) => !val)}
            disabled={false}
          >
            Guest(s) would like to have breakfasts during their stay
          </Checkbox>
        </Box>
        <Box>
          <Checkbox
            checked={hasPaid}
            id="hasPaid"
            disabled={Object.keys(newBooking).length < 6}
            onChange={() => setHasPaid((hasPaid) => !hasPaid)}
          >
            I confirm that {newBooking.guestsName?.at(0)} have paid a total
            amount of {formatCurrency(newBooking.totalPrice)}{" "}
            {!addBreakfast
              ? "without the breakfast option at the cabin."
              : "with the breakafast option for all their guests at the cabin."}
          </Checkbox>
        </Box>
        {/* comment with all the details filled */}
        {hasPaid && Object.keys(newBooking).length > 5 && (
          <Box>
            Booking Summary: {newBooking.guestsName?.at(0)} have chosen to stay
            at Cabin-{newBooking.cabin.name} for {newBooking.numNights}{" "}
            {+newBooking.numNights === 1 ? "night" : "nights"} with{" "}
            {newBooking.numGuests}{" "}
            {+newBooking.numGuests === 1 ? "guest" : "guests"}.
            {addBreakfast &&
              " They also would be having breakfast through out their stay."}{" "}
            The total price for their stay is{" "}
            {formatCurrency(newBooking.extrasPrice + newBooking.cabinPrice)} (
            {formatCurrency(newBooking.cabinPrice)}
            {" + "}
            {formatCurrency(newBooking.extrasPrice)}).
          </Box>
        )}
        <ButtonsContainer>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => {
              reset();
              newBooking = {};
              setAddBreakfast(false);
              setHasPaid(false);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isCreating}>Add Booking</Button>
        </ButtonsContainer>{" "}
      </Form>
    </>
  );
}

export default CreateBooking;
