import HomeSearch from "@/components/forms/HomeSearch";
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
      <div>
        <p className="pl-15 mb-5 text-3xl">Popular Restaurants</p>
        <div className="flex gap-5 overflow-x-scroll scrollbar-none pb-3 px-10">
          {...rests}
        </div>
      </div>

      {/* Navbar */}
      <Nav />
    </div>
  );
}
