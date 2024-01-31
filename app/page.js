import Model from "./model";
import SceneTrial from "./scene";

function Page() {
  return (
    <div className="flex w-screen h-screen min-h-screen flex-col items-center justify-center relative">
      <nav className="w-full px-6 z-50 fixed inset-x-0 top-2 flex justify-center items-center">
        <div className="w-full md:w-800 p-4 rounded-2xl flex items-center">
          <p className="text-lg text-slate-200">NOT_TEAM</p>
          <div className="hidden md:flex items-center gap-6 ml-6 flex-1">
            <a
              href="#home"
              className="text-base text-slate-400 font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-base text-slate-400 font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      <div className="relative" id="home">
        <Model />
      </div>
    </div>
  );
}

export default Page;
