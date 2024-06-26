import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import GlobalTypes from "../utils/GlobalType";

const StyledConfirmation = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

Confirmation.propTypes = GlobalTypes;

function Confirmation({
  resourceName,
  onConfirm,
  logoutMessage,
  disabled,
  onClose,
}) {
  return (
    <StyledConfirmation>
      <Heading as="h3">
        {logoutMessage ? "Exit the app?" : `Delete ${resourceName}`}
      </Heading>
      <p>
        Are you sure you want to{" "}
        {logoutMessage ||
          `delete this ${resourceName} permanently? This
        action cannot be undone.`}
      </p>

      <div>
        <Button variation="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          {logoutMessage ? "Logout" : "Delete"}
        </Button>
      </div>
    </StyledConfirmation>
  );
}

export default Confirmation;
