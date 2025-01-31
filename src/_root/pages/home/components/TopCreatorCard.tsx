import FollowButton from "@/components/shared/follow-button"

const TopCreatorCard = () => {
  return (
    <div className="border rounded-lg flex flex-col items-center gap-2 py-4">
      <img className="w-[50px] h-[50px]" src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' />
      <h4 className="text-sm text-pretty text-center">Afruzbek Risqitillayev</h4>
      <FollowButton title="Follow" />
    </div>
  )
}

export default TopCreatorCard