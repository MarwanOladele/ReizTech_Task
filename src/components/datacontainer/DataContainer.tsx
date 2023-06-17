import { useEffect, useState } from "react";
import { Country } from "../../type";
import Loader from "../loader/Loader";
import axios from "axios";
import { motion } from "framer-motion";

type Props = {};

const DataContainer = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  if (isLoading) return <Loader />;

  return (
    <section className="h-[85vh]">
      <div className="w-5/6 mx-auto">
        <div className="h-[4vh] bg-black">filter and sort</div>
        <div className="h-[81vh] border-b-2 border-gray-500">
          {currentItems.map((item: Country, i) => {
            const { name, region, area } = item;
            return (
              <motion.div
                className="h-[9vh] text-gray-100 border-t-2 border-gray-500"
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
                  <span className="text-primary font-normal">Country Region:</span>{" "}
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
