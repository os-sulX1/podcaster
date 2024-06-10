import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className=" flex flex-col relative">
			<main className="bg-black-3  flex  relative">
				<LeftSidebar />
				<section className=" min-h-screen flex-1 px-4 sm:px-4">
					<div className="mx-auto w-full flex max-w-5xl flex-col max-sm:px-40">
						<div className="flex h-16 items-center justify-between md:hidden">
							<Image src={'/icons/logo.svg'} alt="menu items" width={30} height={30} />
							<MobileNav />
						</div>
						<div className="flex flex-col md:pb-14">
							Tooster(notifictions poup)
							{children}
						</div>
					</div>
				</section>
        <RightSidebar />
			</main>
		</div>
	);
}
