import Link from "next/link"
import FeaturedEvents from "../components/featured-events";
import ExploreCategories from "../components/explore-categories";
export default function Home() {
  return (
    <>
      <section className="relative w-full m-auto bg-cover bg-center h-[calc(100vh-80px)]" style={{ backgroundImage: 'url("./hero-bg.jpg")' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative w-full max-w-[1440px] m-auto flex flex-col justify-center items-center z-10 h-full text-center text-white">
          <h1 className="text-[40px] lg:text-[70px] font-bold">Find & Create Events Near You</h1>
          <p>Discover concerts, tech events, and shows happening around you</p>
          <div className="w-[350px] max-w-full h-[110px] md:h-[50px] flex flex-col md:flex-row justify-between items-center mt-7">
            <Link href={'/'} className="w-[150px] bg-purple rounded-md px-5 py-3 font-bold">Create Event</Link>
            <Link href={'/'} className="w-[150px] bg-gray-400/20 rounded-md px-5 py-3 font-bold backdrop-blur-sm">Buy Tickets</Link>
          </div>
        </div>
      </section>
      <FeaturedEvents />
      <ExploreCategories />
    </>
  );
}
