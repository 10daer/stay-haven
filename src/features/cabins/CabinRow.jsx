import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";

import { useCreateCabin, useDeleteCabin } from "../../hooks/Cabins/useCabin";
import CreateCabinForm from "./CreateCabinForm";

import Modal from "../../ui/Modal";
import Confirmation from "../../ui/Confirmation";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { formatCurrency } from "../../utils/helpers";
import GlobalTypes from "../../utils/GlobalType";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  margin-left: 1rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.td`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.td`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.td`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = GlobalTypes;

function CabinRow({ cabins, cabin }) {
  const {
    name,
    discount,
    maxCapacity,
    regularPrice,
    image,
    description,
    id: cabinId,
  } = cabin;

  const { isDeleting, deleteCabinFn } = useDeleteCabin();
  const { isCreating: isDuplicating, createCabin: duplicateCabin } =
    useCreateCabin();

  function duplicateCabinFn() {
    const originalName = name.split("-")[0];
    const regex = new RegExp(`${originalName}-copy(\\d+)?$`);
    let maxCopyNumber = -1;

    cabins.forEach((cabin) => {
      const match = cabin.name.match(regex);
      if (match) {
        const copyNumber = parseInt(match[1] || 0);
        maxCopyNumber = Math.max(maxCopyNumber, copyNumber);
      }
    });

    const newCopyNumber = maxCopyNumber === -1 ? 0 : maxCopyNumber + 1;

    const data = {
      name: `${originalName}-copy${newCopyNumber}`,
      discount,
      maxCapacity,
      regularPrice,
      image,
      description,
    };
    duplicateCabin({ ...data });
  }

  return (
    <Table.Row>
      <td>
        <Img src={image} alt={name} />
      </td>
      <Cabin>{name}</Cabin>
      <td>{`Fits up to ${maxCapacity} guests`}</td>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <td>&mdash;</td>
      )}
      <td>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                disabled={isDuplicating}
                onClick={duplicateCabinFn}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open name="edit-cabin">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open name="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinData={cabin} />
            </Modal.Window>
            <Modal.Window name="delete-cabin">
              <Confirmation
                resourceName="delete-cabin"
                onConfirm={() => deleteCabinFn(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </td>
    </Table.Row>
  );
}

export default CabinRow;
