import ICard from "@/components/shared/reusable-card"
import { Input } from "@/components/ui/input"
import { TextEffect } from "@/components/ui/text-effect"

const PeoplePage = () => {
  return (
    <div>
      <TextEffect className="text-3xl mt-4 mb-4 ml-12 font-semibold" per='char' preset='fade'>
        All users
      </TextEffect>
      <section>
        <div className="grid grid-cols-4 gap-2">
          <ICard isFollowCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
          <ICard isFollowCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
          <ICard isFollowCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
          <ICard isFollowCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
        </div>
      </section>
    </div>
  )
}

export default PeoplePage