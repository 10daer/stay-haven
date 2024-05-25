import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import { UseCabins } from "../../hooks/Cabins/useCabin";
import CabinRow from "./CabinRow";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins, error } = UseCabins();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  let filteredArr;
  if (filter === "all") filteredArr = cabins;
  if (filter === "no-discount")
    filteredArr = cabins.filter((cabin) => cabin.discount === 0);
  if (filter === "with-discount")
    filteredArr = cabins.filter((cabin) => cabin.discount > 0);

  let newCabins = filteredArr.sort((a, b) => (a[field] - b[field]) * modifier);

  if (field === "name")
    newCabins = filteredArr.sort((a, b) =>
      direction === "asc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );

  if (error) toast.error(error.message);

  return (
    <Menus>
      <Table type="cabins" columns="1.2fr 1.6fr 2.0fr 1.4fr 1fr 0.6fr">
        <thead>
          <Table.Header>
            <th>Image</th>
            <Table.HeaderCell field="sortBy" header="Cabin" sort="name" />
            <Table.HeaderCell
              field="sortBy"
              header="Capacity"
              sort="maxCapacity"
            />
            <Table.HeaderCell
              field="sortBy"
              header="Price"
              sort="regularPrice"
            />
            <th>Discount</th>
            <th></th>
          </Table.Header>
        </thead>

        <Table.Body
          data={newCabins}
          render={(cabin) => (
            <CabinRow cabins={cabins} cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
