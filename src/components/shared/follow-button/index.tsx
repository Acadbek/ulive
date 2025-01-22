type FollowButtonProps = {
  title: string
}

const FollowButton = ({ title }: FollowButtonProps) => {
  return (
    <button className='w-[100px] border dark:border-none h-[34px] bg-white dark:text-black hover:bg-white/70 transition rounded-sm text-[12px]'>{title}</button>
  )
}

export default FollowButton