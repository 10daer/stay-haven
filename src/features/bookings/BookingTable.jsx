import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";

import { UseBookings } from "../../hooks/Bookings/useBookings";
import BookingRow from "./BookingRow";

function BookingTable() {
  const { isLoading, bookings = [], error, count } = UseBookings();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let filteredArr;

  if (filter === "all") filteredArr = bookings;
  if (filter === "checked-out")
    filteredArr = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  if (filter === "checked-in")
    filteredArr = bookings.filter((booking) => booking.status === "checked-in");
  if (filter === "unconfirmed")
    filteredArr = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );

  let newCabins = filteredArr.sort((a, b) =>
    field === "startDate"
      ? (new Date(a[field]).getTime() - new Date(b[field]).getTime()) * modifier
      : (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resource="bookings" />;

  if (error) toast.error(error.message);

  return (
    <Menus>
      <Table columns="2rem 1fr 1.6fr 2.2fr 1.3fr 1fr 4rem">
        <thead>
          <Table.Header>
            <th>s/n</th>
            <th>Cabin</th>
            <th>Guest</th>
            <Table.HeaderCell field="sortBy" header="Dates" sort="startDate" />
            <th>Status</th>
            <Table.HeaderCell
              field="sortBy"
              header="Amount"
              sort="totalPrice"
            />
            <th></th>
          </Table.Header>
        </thead>

        <Table.Body
          data={newCabins}
          render={(booking, i) => (
            <BookingRow index={i + 1} key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
