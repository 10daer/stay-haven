import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "../../hooks/Authentication/useLogout";
import ButtonIcon from "../../ui/ButtonIcon";
import Confirmation from "../../ui/Confirmation";
import Modal from "../../ui/Modal";

function Logout() {
  const { logout, signingOut } = useLogout();

  return (
    <Modal>
      <Modal.Open name="logout">
        <ButtonIcon>
          <HiArrowRightOnRectangle />
        </ButtonIcon>
      </Modal.Open>

      <Modal.Window name="logout">
        <Confirmation
          logoutMessage="log out of the application."
          disabled={signingOut}
          onConfirm={() => logout()}
        />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
