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
import { Outlet } from "react-router-dom"
import { TextEffect } from "@/components/ui/text-effect"
import { ThemeProvider } from "@/components/shared/theme/theme-provider"
import { ModeToggle } from "@/components/shared/theme/mode-toggle"

const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Explore",
		url: "#",
		icon: Inbox,
	},
	{
		title: "People",
		url: "#",
		icon: PersonStanding,
	},
	{
		title: "Saved",
		url: "#",
		icon: SaveAll,
	},
	{
		title: "Create post",
		url: "#",
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
														<a href={item.url}>
															<item.icon />
															<span>{item.title}</span>
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</SidebarGroup>
							</SidebarContent>
						</Sidebar>
					</div>
					<div className='col-span-7'>
						<div className="flex items-center gap-2">
							<SidebarTrigger />
							<ModeToggle />
						</div>
						<TextEffect className="text-3xl ml-12 font-semibold" per='char' preset='fade'>
							Home Feed
						</TextEffect>
						<section className="px-4">
							<Outlet />
						</section>
					</div>
					<div style={{ border: 'solid 2px red' }} className='col-span-3'>1</div>
				</main>
			</Parent>
		</ThemeProvider>
	)
}

export default RootLayout