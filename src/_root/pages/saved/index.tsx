import ICard from "@/components/shared/reusable-card"
import { TextEffect } from "@/components/ui/text-effect"

const SavedPage = () => {
  return (
    <div>
      <TextEffect className="text-3xl mb-4 ml-12 font-semibold" per='char' preset='fade'>
        Saved
      </TextEffect>

      <div className="grid grid-cols-4 gap-2">
        <ICard isSavedCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
        <ICard isSavedCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
        <ICard isSavedCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
        <ICard isSavedCard={true} img="https://miro.medium.com/v2/resize:fit:875/0*_qQTh3Khqho-FDUf" />
      </div>
    </div>
  )
}

export default SavedPage