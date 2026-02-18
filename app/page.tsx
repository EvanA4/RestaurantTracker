import HomeSearch from "@/components/forms/HomeSearch";
import StickyRestSelect from "@/components/forms/StickyRestSelect";
import Nav from "@/components/general/Nav";
import RestCard from "@/components/rest/RestCard";

export default function Home() {
  const rests = [];
  for (let i = 0; i < 11; ++i) {
    rests.push(<RestCard rating={i / 2} />);
  }

  return (
    <div className="min-h-full relative flex flex-col gap-10">
      {/* User's search parameters */}
      <HomeSearch />

      {/* Restaurants display */}
      <div className="2xl:grid 2xl:grid-cols-7">
        <div className="col-span-5">
          <p className="pl-15 mb-5 text-3xl">Popular Restaurants</p>
          <div className="flex 2xl:flex-wrap gap-5 overflow-x-scroll scrollbar-none pb-3 px-10">
            {...rests}
          </div>
        </div>

        <div className="hidden 2xl:block w-full h-full col-span-2 relative">
          <StickyRestSelect />
        </div>
      </div>

      {/* Navbar */}
      <Nav />
    </div>
  );
}
