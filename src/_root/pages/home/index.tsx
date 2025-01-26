import ICard from "@/components/shared/reusable-card"
import FeedCard from "./components/FeedCard"
import TopCreatorCard from "./components/TopCreatorCard"
import { TextEffect } from "@/components/ui/text-effect"
// import FeedCard from "./components/Card
import { useUserContext } from '../../../context/AuthContext'

const Home = () => {
  const { user } = useUserContext()
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="pt-4 col-span-8">
        <TextEffect className="text-3xl mb-4 ml-12 font-semibold" per='char' preset='fade'>
          Home Feed
        </TextEffect>
        {JSON.stringify(user)}
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