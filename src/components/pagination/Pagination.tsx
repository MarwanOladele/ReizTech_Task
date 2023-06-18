import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: PaginationProps) => {
  return (
    <div className="min-h-[5vh] mt-2">
      <div className="w-full h-full flex justify-center">
        <div className="text-white flex gap-3 h-full w-2/6 mx-auto items-center  justify-center ">
          <button onClick={onPrevPage} disabled={currentPage === 1}>
            <BsFillArrowLeftSquareFill size={24} />
          </button>
          <span className="">{currentPage}</span>
          <button onClick={onNextPage} disabled={currentPage === totalPages}>
            <BsFillArrowRightSquareFill size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
