import ICard from "@/components/shared/reusable-card"
// import FeedCard from "./components/Card"

const Home = () => {
  return (
    <div className="pt-8">
      <div className="grid grid-cols-3 gap-4">
        <ICard isSavedCard={true} img="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*y0vJwEfN45barnQO9jiYew.jpeg" />
        <ICard isSavedCard={false} img="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*h-Y6W5VfM8lath9myNS5tQ.jpeg" />
        <ICard isSavedCard={false} img="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*JEWUztu5W6ItmeKI4wvPeg.jpeg" />
      </div>
    </div>
  )
}

export default Home