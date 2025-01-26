import { Home, Inbox, MessageCircle, PersonStanding, SaveAll } from "lucide-react"
import { SidebarProvider as Parent, SidebarTrigger } from "@/components/ui/sidebar"
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "@/components/shared/Logo"
import { Link, Outlet } from "react-router-dom"
import { TextEffect } from "@/components/ui/text-effect"
import { ThemeProvider } from "@/components/shared/theme/theme-provider"
import { ModeToggle } from "@/components/shared/theme/mode-toggle"

const items = [
	{
		title: "Home",
		url: "/",
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
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Parent>
				<main className='grid grid-cols-12'>
					<div className="col-span-2">
						<Sidebar>
							<SidebarContent>
								<div className="pl-4">
									<Logo />
								</div>
								<SidebarGroup>
									<SidebarGroupContent>
										<SidebarMenu>
											{items.map((item) => (
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton asChild>
														<Link to={item.url}>
															<item.icon />
															<span>{item.title}</span>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
						</Sidebar>
					</div>
					<div className='col-span-10'>
						<div className="flex items-center gap-2">
							<ModeToggle />
						</div>
						<section className="px-4">
							<Outlet />
						</section>
					</div>
				</main>
			</Parent>
		</ThemeProvider>
	)
}

export default RootLayout