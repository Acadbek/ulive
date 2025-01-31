import { Home, Inbox, MessageCircle, PersonStanding, SaveAll } from "lucide-react"
import { SidebarProvider as Parent } from "@/components/ui/sidebar"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"
import { ThemeProvider } from "@/components/shared/theme/theme-provider"
import { ModeToggle } from "@/components/shared/theme/mode-toggle"
import { account } from "@/lib/appwrite/config"
import { useUserContext } from '../context/AuthContext'
import React from "react"
import { useMedia } from 'react-use';


const items = [
	{
		title: "Home",
		url: "/home",
		icon: Home,
	},
	{
		title: "Explore",
		url: "/explore",
		icon: Inbox,
	},
	{
		title: "People",
		url: "/people",
		icon: PersonStanding,
	},
	{
		title: "Saved",
		url: "/saved",
		icon: SaveAll,
	},
	{
		title: "Create post",
		url: "/create-post",
		icon: MessageCircle,
	},
]

const RootLayout = () => {
	const size = useMedia('(min-width: 960px)')

	const location = useLocation();
	const [isLinkActive, setIsLinkActive] = React.useState(location.pathname)
	const [count, setCount] = React.useState(1)
	const [mode, setMode] = React.useState(localStorage.getItem('vite-ui-theme'))
	const navigate = useNavigate()

	const logout = async () => {
		try {
			await account.deleteSession('current')
			navigate('/sign-in')

		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		setMode(localStorage.getItem('vite-ui-theme'))
	}, [count])


	const handleActive = (item: { url: string }) => {
		setIsLinkActive(item.url)
		setCount((prev) => prev + 1)
	}

	const goToHome = () => {
		navigate('/home')
		setIsLinkActive('/home')
	}

	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<Parent>
				<main className='grid grid-cols-12 w-full'>
					<div className={`${size === false ? 'col-span-1' : 'col-span-2'}  border`}>
						<span onClick={goToHome} className="!pl-4 cursor-pointer py-4 inline-block">
							<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 128 128"><g fill="#1791cf"><path fill-rule="evenodd" d="M61.113 4.886C55.82 17.79 52.63 26.23 46.738 38.75c3.614 3.804 8.047 8.242 15.246 13.25c-7.742-3.168-13.02-6.348-16.968-9.649c-7.54 15.645-19.352 37.934-43.325 80.77c18.844-10.817 33.45-17.485 47.059-20.031a34 34 0 0 1-.895-8.024l.024-.602c.297-12.003 6.578-21.238 14.016-20.609c7.437.625 13.222 10.871 12.921 22.875c-.054 2.262-.312 4.434-.761 6.45c13.465 2.62 27.914 9.273 46.5 19.94c-3.664-6.706-6.934-12.757-10.059-18.519c-4.922-3.793-10.055-8.726-20.523-14.074c7.195 1.863 12.347 4.008 16.363 6.406C74.578 38.121 72.004 30.308 61.113 4.886m0 0" /><path d="M121.14 112.57v-3.242h-1.214v-.434h2.93v.434h-1.223v3.242zm2.223 0v-3.676h.735l.875 2.602c.082.242.14.426.175.543q.065-.2.2-.586l.882-2.559h.66v3.676h-.472v-3.078l-1.074 3.078h-.442l-1.066-3.129v3.129z" /></g></svg>
						</span>
						<ul>
							{items.map((item) => (
								<li title={item.title} onClick={() => handleActive(item)}
									style={{
										backgroundColor: item.url === isLinkActive ? mode === 'light' ? '#cbd5e1' : '#475569' : ''
									}}
									className="hover:bg-slate-300 dark:hover:bg-slate-600" key={item.url}>
									<Link className="py-4 px-4 flex items-center gap-3" to={item.url}>
										<item.icon />
										<span className={`${!size && 'hidden'}`} >{item.title}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='col-span-10'>
						<div className="absolute right-0">
							<ModeToggle />
							Screen is wide: {size ? 'Yes' : 'No'}
						</div>
						<div>

						</div>
						<section className="px-4 w-full">
							<Outlet />
						</section>
					</div>
				</main>
			</Parent>
		</ThemeProvider>
	)
}

export default RootLayout