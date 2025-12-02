// Button 1: The "MorphButton" (The Organic Puddle)
// Uses extreme border-radius values to create a "puddle" or "stone" shape.
// Represents fluidity, adaptability, and organic creativity.

interface MorphButton1Props {
	text: string;
	onClick?: () => void;
}

export const MorphButton1: React.FC<MorphButton1Props> = ({
	text,
	onClick,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="relative group w-full h-20 flex items-center justify-center focus:outline-none"
		>
			{/* Primary Blob */}
			<div
				className="absolute inset-0 bg-deepText transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 opacity-90 shadow-xl"
				style={{
					borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
					animation: "blob 6s infinite alternate",
				}}
			/>

			{/* Secondary Moving Blob (Animation) */}
			<div
				className="absolute inset-0 bg-linear-to-r from-pastelPurple to-pastelPink opacity-80 mix-blend-overlay animate-blob"
				style={{
					borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
					animation: "blob 9s infinite alternate-reverse",
				}}
			/>

			{/* Third Decorative Blob (Stroke) */}
			<div
				className="absolute -inset-1 border-2 border-deepText/20 rounded-full animate-flow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				style={{
					borderRadius: "50% 50% 50% 50% / 40% 60% 50% 50%",
					animationDuration: "4s",
				}}
			/>

			{/* Text Content */}
			<span className="relative z-10 flex items-center gap-2 text-pastelMint font-bold uppercase tracking-wider text-sm group-hover:text-white transition-colors duration-300">
				{text}
			</span>
		</button>
	);
};

// Features: A vibrant, energetic gradient shape that ripples.
// Uses two opposing animations to create a complex, non-repetitive wavy form.

interface MorphButton2Props {
	text: string;
	href: string;
}

export const MorphButton2: React.FC<MorphButton2Props> = ({ text, href }) => {
	return (
		<a
			href={href}
			className="relative group w-full h-24 flex items-center justify-center focus:outline-none bg-transparent border-none"
		>
			{/* Layer 1: The Main Gradient Body */}
			<div
				className="absolute inset-0 bg-linear-to-br from-pastelPink via-pastelPurple to-pastelBlue transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg blur-[0.5px]"
				style={{
					borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
					animation: "blob 6s infinite alternate",
				}}
			/>

			{/* Layer 2: The Liquid Overlay (Morphs differently for irregularity) */}
			<div
				className="absolute inset-0 bg-linear-to-tl from-pastelBlue/50 via-pastelPurple/50 to-pastelPink/50 mix-blend-overlay"
				style={{
					borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
					animation: "blob 9s infinite alternate-reverse",
				}}
			/>

			{/* Text Content */}
			<span className="relative z-10 font-bold uppercase tracking-wider text-sm text-deepText drop-shadow-md group-hover:tracking-widest transition-all duration-300">
				{text}
			</span>
		</a>
	);
};
