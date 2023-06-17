import Loading from "../../assets/loader.gif";

const Loader = () => {
  return (
    <section className="h-[85vh]">
      <div className="w-5/6 mx-auto h-full">
        <div className="flex justify-center items-center flex-col pt-20">
          <img src={Loading} alt="Loading" className="w-[100px] h-[100px]" />
          <h1 className="font-bold text-3xl mt-2 text-white">Loading...</h1>
        </div>
      </div>
    </section>
  );
};

export default Loader;
