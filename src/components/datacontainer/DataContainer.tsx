import { useEffect, useState } from "react";
import { Country, SortOrder } from "../../type";
import Loader from "../loader/Loader";
import axios from "axios";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

const DataContainer = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [showOnlySmallerThanLithuania, setShowOnlySmallerThanLithuania] =
    useState(false);
  const [showOnlyOceaniaCountries, setShowOnlyOceaniaCountries] =
    useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  const handleSort = () => {
    const sortedCountries = countries.sort((a, b) => {
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

    if (showOnlyOceaniaCountries) {
      filteredItems = filteredItems.filter(
        (country) => country.region === "Oceania"
      );
    }

    setFilteredCountries(filteredItems);
  };

  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    } else {
      const maxPage = Math.ceil(filteredCountries.length / itemsPerPage);
      setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section className="min-h-[90vh]">
      <div className="min-h-[85vh]">
        <div className="w-5/6 mx-auto">
          <div className="min-h-[4vh] text-gray-100 flex justify-between items-center text-[12px] sm:flex-row flex-col gap-2 sm:p-0 p-2">
            <div className=" flex gap-2 sm:flex-row flex-col sm:py-1 py-0 ">
              <span
                onClick={() =>
                  setShowOnlyOceaniaCountries(!showOnlyOceaniaCountries)
                }
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
                Sort by Name -{" "}
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </span>
            </div>
          </div>
          <div className="min-h-[81vh] border-b-2 border-gray-500">
            {currentItems.map((item: Country, i) => {
              const { name, region, area } = item;
              return (
                <motion.div
                  className="min-h-[9vh] text-gray-100 border-t-2 border-gray-500"
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <div className="text-[16px] font-bold">
                    <span className="text-primary ">Country Name:</span>{" "}
                    <span>{name}</span>
                  </div>
                  <div className="text-[15px]">
                    <span className="text-primary font-normal">
                      Country Region:
                    </span>{" "}
                    <span>{region}</span>
                  </div>
                  <div className="text-[13px] font-extralight">
                    <span className="text-primary ">Country Area:</span>{" "}
                    <span>{area}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="min-h-[5vh] mt-2">
        <div className="w-full h-full flex justify-center">
          <div className="text-white flex gap-3 h-full w-2/6 mx-auto items-center  justify-center ">
            <button
              onClick={() => handlePagination("prev")}
              disabled={currentPage === 1}
            >
              <BsFillArrowLeftSquareFill size={24} />
            </button>
            <span className="">{currentPage}</span>
            <button
              onClick={() => handlePagination("next")}
              disabled={
                currentPage ===
                Math.ceil(filteredCountries.length / itemsPerPage)
              }
            >
              <BsFillArrowRightSquareFill size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataContainer;
