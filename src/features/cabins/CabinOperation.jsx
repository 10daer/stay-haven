import FilterTable from "../../ui/Filter";

function CabinOperation() {
  return (
    <div>
      <FilterTable
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
    </div>
  );
}

export default CabinOperation;
