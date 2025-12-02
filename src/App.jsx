/** biome-ignore-all lint/correctness/useUniqueElementIds: id attribute in path is defining the movement */
import "./index.css";
import { useState } from "react";
import {
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaPinterest,
} from "react-icons/fa6";
import { MorphButton1, MorphButton2 } from "./components/buttons";
import { ClientForm } from "./components/client-form";

function App() {
	const [isFormOpen, setIsFormOpen] = useState(false);

	return (
		<div className="fixed flex flex-col items-center justify-center h-dvh w-dvw space-y-5 md:space-y-10 bg-[url(/images/gradient-1.png)] bg-cover bg-center overflow-hidden">
			{/* Spinning text header */}
			<div className="relative w-54 h-54 mb-4">
				{/* Rotating text */}
				<div className="absolute inset-0 animate-spin-slow">
					<svg
						aria-hidden="true"
						className="w-full h-full"
						viewBox="0 0 200 200"
					>
						<defs>
							<path
								id="circlePath"
								d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
							/>
						</defs>
						<text className="fill-deepText/70 text-[13px] tracking-widest uppercase font-light">
							<textPath href="#circlePath">
								Crafting Digital Experiences from Design to Motion
							</textPath>
						</text>
					</svg>
				</div>

				{/* Static center text */}
				<div className="absolute inset-0 flex items-center justify-center">
					<h1 className="text-2xl font-bold text-deepText tracking-tight uppercase text-center">
						joana
						<br />
						creates
					</h1>
				</div>
			</div>

			<p className="text-md text-deepText/90 font-medium tracking-wide uppercase text-center">
				Designer • Developer • Video Editor
			</p>

			{/* Decorative line */}
			<div className="h-1.5 w-24 bg-linear-to-r from-pastelPink via-pastelPurple to-pastelBlue rounded-full" />

			{/* Buttons */}
			<div className="flex flex-col md:flex-row items-center justify-center gap-3 w-[80%]">
				<MorphButton1
					text="Let's Work Together"
					onClick={() => setIsFormOpen(true)}
				/>

				<MorphButton2
					text="See my latest creations"
					href="https://joanamarques.tudu.dev/"
				/>
			</div>

			{/* Socials */}
			<div className="flex flex-row justify-center items-center gap-5">
				<a
					href="https://github.com/joanamarquees"
					target="_blank"
					rel="noopener noreferrer"
					className="text-deepText/70 hover:text-pastelPurple hover:scale-110 active:text-pastelPurple active:scale-110 transition-all duration-300"
				>
					<FaGithub size={28} />
				</a>

				<a
					href="https://instagram.com/joana.marquees"
					target="_blank"
					rel="noopener noreferrer"
					className="text-deepText/70 hover:text-pastelPink hover:scale-110 active:text-pastelPurple active:scale-110 transition-all duration-300"
				>
					<FaInstagram size={28} />
				</a>

				<a
					href="https://www.pinterest.com/joanaa_marquees/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-deepText/70 hover:text-pastelBlue hover:scale-110 active:text-pastelPurple active:scale-110 transition-all duration-300"
				>
					<FaPinterest size={28} />
				</a>

				<a
					href="https://www.linkedin.com/in/joana-marques-33a170220/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-deepText/70 hover:text-pastelMint hover:scale-110 active:text-pastelPurple active:scale-110 transition-all duration-300"
				>
					<FaLinkedinIn size={28} />
				</a>
			</div>

			{/* Footer */}
			<footer className="text-sm text-deepText/60">
				Made with ♡ by Joana M
			</footer>

			{/* Client Form Modal */}
			<ClientForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
		</div>
	);
}

export default App;
