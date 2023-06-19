import { useEffect, useState } from "react";
import { Country, SortOrder } from "../../type";
import axios from "axios";
import Loader from "../loader/Loader";
import Data from "./Data";
import Pagination from "../pagination/Pagination";
import FilterAndSort from "./FilterAndSort";

const DataContainer = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [showOnlySmallerThanLithuania, setShowOnlySmallerThanLithuania] =
    useState(false);
  const [showOnlyOceaniaCountries, setShowOnlyOceaniaCountries] =
    useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // number of items per page
  const itemsPerPage = 15;

  // Calculate the index of the first and last items of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items for the current page
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // calculate total number of pages
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>(
          "https://restcountries.com/v2/all?fields=name,region,area"
        );
        setCountries(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [countries, showOnlySmallerThanLithuania, showOnlyOceaniaCountries]);

  // sort by ascending and descending
  const handleSort = () => {
    const sortedCountries = filteredCountries.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setCountries(sortedCountries);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filterCountries = () => {
    let filteredItems = countries;

    // Filter by smaller than Lithuania
    if (showOnlySmallerThanLithuania) {
      const lithuania = countries.find(
        (country) => country.name === "Lithuania"
      );
      if (lithuania) {
        filteredItems = filteredItems.filter(
          (country) => country.area < lithuania.area
        );
      }
    }

    // Filter by Oceania region
    if (showOnlyOceaniaCountries) {
      filteredItems = filteredItems.filter(
        (country) => country.region === "Oceania"
      );
    }

    setFilteredCountries(filteredItems);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination prev page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Loader
  if (isLoading) return <Loader />;

  return (
    <section className="min-h-[90vh]">
      <div className="min-h-[85vh]">
        <div className="w-5/6 mx-auto">
          <FilterAndSort
            showOnlyOceaniaCountries={showOnlyOceaniaCountries}
            showOnlySmallerThanLithuania={showOnlySmallerThanLithuania}
            setShowOnlyOceaniaCountries={setShowOnlyOceaniaCountries}
            setShowOnlySmallerThanLithuania={setShowOnlySmallerThanLithuania}
            handleSort={handleSort}
            sortOrder={sortOrder}
          />
          <div className="min-h-[81vh] border-b-2 border-gray-500">
            {currentItems.map((item: Country, i) => (
              <Data key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </section>
  );
};

export default DataContainer;
