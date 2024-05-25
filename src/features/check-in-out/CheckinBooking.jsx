import { useEffect, useState } from "react";
import styled from "styled-components";

import { UseBooking } from "../../hooks/Bookings/useBooking";
import useCheckin from "../../hooks/Bookings/useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { UseSetting } from "../../hooks/Settings/useSetting";
import { formatCurrency } from "../../utils/helpers";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { isLoading: isLoadingSettingVals, settings = {} } = UseSetting();
  const { booking, isLoading: isChecking } = UseBooking();
  const { checkIn, isCheckingIn } = useCheckin();
  const [hasPaid, setHasPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const cummBreakfastprice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!hasBreakfast) {
      checkIn?.({
        bookingId,
        breakfast: {
          extrasPrice: cummBreakfastprice,
          totalPrice: cummBreakfastprice + totalPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkIn?.({ bookingId, breakfast: {} });
    }
  }

  useEffect(() => {
    setHasPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isChecking || isLoadingSettingVals) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="breakfast"
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setHasPaid(false);
            }}
          >
            Would like to add breakfasts {formatCurrency(cummBreakfastprice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={hasPaid}
          disabled={hasPaid || isCheckingIn}
          id={bookingId}
          onChange={() => setHasPaid((hasPaid) => !hasPaid)}
        >
          I confirm that {guests.fullName} has paid a total amount of{" "}
          {!hasBreakfast
            ? `${formatCurrency(totalPrice)}`
            : `${formatCurrency(
                totalPrice + cummBreakfastprice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                cummBreakfastprice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        <Button disabled={!hasPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
