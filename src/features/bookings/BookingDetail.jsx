import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import Confirmation from "../../ui/Confirmation";

import { useMoveBack } from "../../hooks/useMoveBack";
import { UseBooking, useDeleteBooking } from "../../hooks/Bookings/useBooking";
import useCheckOut from "../../hooks/Bookings/useCheckOut";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking, error } = UseBooking();
  const { status, id: bookingId } = booking;
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBookingFn } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (error) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Open name="delete-booking">
            <Button variation="danger" disabled={isDeleting} onClick={moveBack}>
              Delete
            </Button>
          </Modal.Open>

          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
              Check In
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              onClick={() => checkOut(bookingId)}
              disabled={isCheckingOut}
            >
              Check Out
            </Button>
          )}
        </ButtonGroup>

        <Modal.Window>
          <Confirmation
            resourceName="delete-booking"
            onConfirm={() =>
              deleteBookingFn(bookingId, { onSettled: () => navigate(-1) })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
