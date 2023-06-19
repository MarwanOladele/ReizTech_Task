import { SortOrder } from "../../type";

type Props = {
  showOnlyOceaniaCountries: boolean;
  showOnlySmallerThanLithuania: boolean;
  setShowOnlyOceaniaCountries: (value: boolean) => void;
  setShowOnlySmallerThanLithuania: (value: boolean) => void;
  handleSort: () => void;
  sortOrder: SortOrder;
};
const FilterAndSort = ({
  showOnlyOceaniaCountries,
  showOnlySmallerThanLithuania,
  setShowOnlyOceaniaCountries,
  setShowOnlySmallerThanLithuania,
  handleSort,
  sortOrder,
}: Props) => {
  return (
    <div className="min-h-[4vh] text-gray-100 flex justify-between items-center text-[12px] sm:flex-row flex-col gap-2 sm:p-0 p-2">
      <div className=" flex gap-2 sm:flex-row flex-col sm:py-1 py-0 ">
        <span
          onClick={() => setShowOnlyOceaniaCountries(!showOnlyOceaniaCountries)}
          className="cursor-pointer border-2 border-gray-500 px-2 rounded-md hover:bg-gray-100 hover:text-black text-center"
        >
          {showOnlyOceaniaCountries
            ? "Show All"
            : "Show Only Oceania Countries"}
        </span>
        <span
          onClick={() =>
            setShowOnlySmallerThanLithuania(!showOnlySmallerThanLithuania)
          }
          className="cursor-pointer border-2 border-gray-500 px-2 rounded-md hover:bg-gray-100 hover:text-black text-center"
        >
          {showOnlySmallerThanLithuania
            ? "Show All"
            : "Show Only Smaller Than Lithuania"}
        </span>
      </div>
      <div className="">
        <span
          onClick={handleSort}
          className="cursor-pointer border-2 border-gray-500 px-2 rounded-md hover:bg-gray-100 hover:text-black text-center"
        >
          Sort by Name - {sortOrder === "asc" ? "Ascending" : "Descending"}
        </span>
      </div>
    </div>
  );
};

export default FilterAndSort;
