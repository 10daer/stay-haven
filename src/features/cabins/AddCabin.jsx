import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open name="create-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="create-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
