import HomeSearch from "@/components/forms/HomeSearch";
import Nav from "@/components/general/Nav";

export default function Home() {
  return (
    <div className="h-full relative p-10">
      {/* User's search parameters */}
      <HomeSearch />

      {/* Actual site content */}

      {/* Navbar */}
      <Nav />
    </div>
  );
}
