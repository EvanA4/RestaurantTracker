import Nav from "@/components/general/DemoNav";

export default function Home() {
  return (
    <div className="h-full">
      <Nav />
      <div className="flex flex-col items-center justify-center gap-5 h-full">
        <div>
          <p className="text-3xl text-center">Restaurant Tracker</p>
          <p className="text-neutral-400 text-center">
            This is just a proof of concept. Explore the demos in the nav bar!
          </p>
        </div>
      </div>
    </div>
  );
}
