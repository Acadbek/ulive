import ICard from "@/components/shared/reusable-card"
import FeedCard from "./components/FeedCard"
import TopCreatorCard from "./components/TopCreatorCard"
// import FeedCard from "./components/Card"

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="pt-8 col-span-8">
        <div className="flex flex-col gap-3">
          <FeedCard />
          <FeedCard />
        </div>
      </div>
      <div className="col-span-4 mt-8">
        <div className="grid grid-cols-2 gap-2">
          <TopCreatorCard />
          <TopCreatorCard />
          <TopCreatorCard />
          <TopCreatorCard />
        </div>
      </div>
    </div>
  )
}

export default Home