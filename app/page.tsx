import HomeSearch from "@/components/forms/HomeSearch";
import Nav from "@/components/general/Nav";
import RestCard from "@/components/rest/RestCard";
import ReviewCard from "@/components/rest/ReviewCard";

export default function Home() {
  const reviews = [];
  const rests = [];
  for (let i = 0; i < 11; ++i) {
    reviews.push(<ReviewCard rating={i / 2} />);
    rests.push(<RestCard rating={i / 2} />);
  }

  return (
    <div className="h-full relative p-10 flex flex-col gap-10">
      {/* User's search parameters */}
      <HomeSearch />

      {/* Reviews display */}
      <div className="flex gap-5 overflow-x-scroll scrollbar-none">
        {...reviews}
      </div>

      {/* Restaurants display */}
      <div>
        <p className="mb-3">
          <b className="text-3xl">Restaurants</b>
        </p>
        <div className="flex gap-5 overflow-x-scroll scrollbar-none">
          {...rests}
        </div>
      </div>

      {/* Navbar */}
      <Nav />
    </div>
  );
}
