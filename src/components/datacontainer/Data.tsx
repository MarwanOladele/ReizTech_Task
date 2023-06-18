import { motion } from "framer-motion";

type Props = {
  name: string;
  region: string;
  area: number;
};

const Data = ({ name, region, area }: Props) => {
  return (
    <motion.div
      className="min-h-[9vh] text-gray-100 border-t-2 border-gray-500"
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
        <span className="text-primary ">Country Name:</span> <span>{name}</span>
      </div>
      <div className="text-[15px]">
        <span className="text-primary font-normal">Country Region:</span>{" "}
        <span>{region}</span>
      </div>
      <div className="text-[13px] font-extralight">
        <span className="text-primary ">Country Area:</span> <span>{area}</span>
      </div>
    </motion.div>
  );
};

export default Data;
