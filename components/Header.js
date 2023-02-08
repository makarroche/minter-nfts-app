import Connect from "../components/Connect";

const Header = () => {
  return (
    <header className="bg-violet-600">
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-[#41344F] py-6 lg:border-none">
          <div className="flex items-center">
            <img className="w-auto h-10" src="dog_silouette.png" alt="" />
          </div>
          <div className="ml-10 space-x-4">
            <Connect />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
