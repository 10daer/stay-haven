import useCheckOut from "../../hooks/Bookings/useCheckOut";
import Button from "../../ui/Button";
import GlobalTypes from "../../utils/GlobalType";

CheckoutButton.propTypes = GlobalTypes;

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
