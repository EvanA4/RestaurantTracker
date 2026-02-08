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
    <div className="h-full relative flex flex-col gap-10">
      {/* User's search parameters */}
      <HomeSearch />

      {/* Reviews display */}
      <div className="scrollbar-none px-10 overflow-x-scroll flex gap-5 pb-3">
        {...reviews}
      </div>

      {/* Restaurants display */}
      <div>
        <p className="pl-10">
          <b className="text-3xl">Restaurants</b>
        </p>
        <div className="flex gap-5 overflow-x-scroll scrollbar-none pb-3 px-10">
          {...rests}
        </div>
      </div>

      {/* Navbar */}
      <Nav />
    </div>
  );
}
