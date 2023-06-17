import { useEffect, useState } from "react";
import { Country, SortOrder } from "../../type";
import Loader from "../loader/Loader";
import axios from "axios";
import { motion } from "framer-motion";

type Props = {};

const DataContainer = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Country[]>(
          "https://restcountries.com/v2/all?fields=name,region,area"
        );
        console.log(response.data);

        setCountries(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const filterByOceaniaRegion = () => {
    const newCountry = countries.filter(
      (country) => country.region === "Oceania"
    );
    setCountries(newCountry);
  };

  const filterSmallerThanLithuania = () => {
    const newCountry = countries.filter((country) => country.area <= 65300);
    setCountries(newCountry);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="h-[85vh]">
      <div className="w-5/6 mx-auto">
        <div className="min-h-[4vh] text-gray-100 flex justify-between items-center text-[12px]">
          <div className=" flex gap-2">
            <span className="text-[15px]">Filter by:</span>
            <span
              onClick={filterByOceaniaRegion}
              className="cursor-pointer border-2 border-gray-500 px-2 rounded-md hover:bg-gray-100 hover:text-black"
            >
              Oceania region
            </span>
            <span
              onClick={filterSmallerThanLithuania}
              className="cursor-pointer border-2 border-gray-500 px-2 rounded-md hover:bg-gray-100 hover:text-black"
            >
              Area smaller than Lithuania
            </span>
          </div>
          <div className="">
            <span
              onClick={handleSort}
              className="cursor-pointer border-2 border-gray-500 px-2 rounded-md hover:bg-gray-100 hover:text-black"
            >
              Sort by Name - {sortOrder === "asc" ? "Ascending" : "Descending"}
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
    </section>
  );
};

export default DataContainer;
