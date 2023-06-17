type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="h-[10vh] bg-[#edf0ed] ">
      <div className=" w-5/6 mx-auto h-full flex items-center justify-start xs:text-[32px] text-[20px] font-extrabold uppercase">
        Reiz Tech <span className="text-primary ml-2">Task</span>
      </div>
    </nav>
  );
};

export default Navbar;
