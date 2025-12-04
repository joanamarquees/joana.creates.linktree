/** biome-ignore-all lint/a11y/noStaticElementInteractions: This is a modal div */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: This is a modal div */
import { useEffect, useState } from "react";
import {
	FaArrowLeft,
	FaArrowRight,
	FaCheck,
	FaLaptopCode,
	FaPalette,
	FaVideo,
	FaCircleExclamation,
} from "react-icons/fa6";
import { cn } from "../utils/cn";
import { RiLoader4Fill } from "react-icons/ri";

interface ClientFormProps {
	isOpen: boolean;
	onClose: () => void;
}

// 10-Step Configuration
const FORM_STEPS = [
	{
		id: 1,
		title: "Welcome",
		subtitle: "Let's create something unique",
		label: "Intro",
	},
	{
		id: 2,
		title: "The Basics",
		subtitle: "Let's get introduced",
		label: "Contact",
	},
	{
		id: 3,
		title: "Your needs",
		subtitle: "What kind of project are you looking for?",
		label: "Service",
	},
	{
		id: 4,
		title: "Brand Identity",
		subtitle: "Who are you?",
		label: "Identity",
	},
	{
		id: 5,
		title: "Visual Vision",
		subtitle: "Inspiration & Ideas",
		label: "Visuals",
	},
	{ id: 6, title: "The Vibe", subtitle: "Tone & Style", label: "Style" },
	{
		id: 7,
		title: "Mood board",
		subtitle: "Show me your inspirations",
		label: "Inspiration",
	},
	{ id: 8, title: "Timeline", subtitle: "Mark the calendar", label: "Dates" },
	{ id: 9, title: "Investment", subtitle: "Project Budget", label: "Budget" },
	{
		id: 10,
		title: "Consent & Agreement",
		subtitle: "One last detail",
		label: "Consent",
	},
];

export const ClientForm: React.FC<ClientFormProps> = ({ isOpen, onClose }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	//form data
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		serviceType: "", // Web Design, Site (with design), Site (with existing design), Video
		brandName: "",
		brandDescription: "", // Mission, values, audience
		visualInspiration: "", // Colors, style, refs
		toneStyle: "", // Modern, playful, etc
		pinterestUrl: "",
		deadline: "",
		budget: "",
		consent: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.consent || isSubmitting) return;

		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// Replace with your Google Apps Script web app URL
			const scriptURL =
				"https://script.google.com/macros/s/AKfycbwYPyjAXZIdebot_7PZH6EYegLbcN37yzhidSGw_zFYX3jdwGFOhu3xdz8f3C8z4016/exec";

			await fetch(scriptURL, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			setSubmitStatus("success");
			// REMOVED: The setTimeout and onClose here.
			// We want the user to see the success screen.
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
			// REMOVED: onClose here.
		}
	};

	// Optional: Add a helper to reset the form when the user manually closes the success screen
	const handleCloseAndReset = () => {
		onClose();
		setTimeout(() => {
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				serviceType: "",
				brandName: "",
				brandDescription: "",
				visualInspiration: "",
				toneStyle: "",
				pinterestUrl: "",
				deadline: "",
				budget: "",
				consent: false,
			});
			setSubmitStatus("idle");
			setStep(1);
		}, 300);
	};

	//handle visibility for animations
	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		} else {
			const timer = setTimeout(() => setIsVisible(false), 300);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	//reset step when closed
	useEffect(() => {
		if (!isVisible && !isOpen) {
			setStep(1);
		}
	}, [isVisible, isOpen]);

	//validation Logic
	const isStepValid = () => {
		switch (step) {
			case 2:
				return formData.firstName && formData.lastName && formData.email;
			case 3:
				return formData.serviceType;
			case 4:
				return formData.brandName && formData.brandDescription;
			case 9:
				return formData.budget;
			case 10:
				return formData.consent;
			default:
				return true;
		}
	};

	const handleNext = () => {
		if (step < FORM_STEPS.length && isStepValid()) setStep(step + 1);
	};

	const handlePrev = () => {
		if (step > 1) setStep(step - 1);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleServiceSelect = (value: string) => {
		setFormData((prev) => ({ ...prev, serviceType: value }));
	};

	const handleConsentToggle = () => {
		setFormData((prev) => ({ ...prev, consent: !prev.consent }));
	};

	if (!isOpen && !isVisible) return null;

	const currentStepConfig = FORM_STEPS[step - 1];

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out max-h-dvh",
				isOpen
					? "bg-deepText/20 backdrop-blur-md"
					: "bg-transparent pointer-events-none opacity-0",
			)}
			onClick={handleCloseAndReset}
		>
			<div
				className={cn(
					"relative w-full max-w-xl bg-white/80 border border-white/50 shadow-2xl rounded-4xl p-8 md:p-10 overflow-hidden flex flex-col",
					"transition-all duration-500 ease-out transform min-h-[600px]",
					isOpen
						? "translate-y-0 scale-100 opacity-100"
						: "translate-y-12 scale-95 opacity-0",
				)}
				style={{
					boxShadow:
						"0 25px 50px -12px rgba(0, 0, 0, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.5)",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{submitStatus === "success" ? (
					//SUCCESS SCREEN
					<div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 h-full">
						<div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
							<FaCheck className="text-green-600 text-4xl" />
						</div>
						<h2 className="text-4xl font-serif text-deepText font-bold mb-3">
							Submission sent :)
						</h2>
						<p className="text-deepText/60 font-sans uppercase tracking-widest text-xs mb-8 max-w-xs mx-auto">
							I've received your details and will be in touch shortly to discuss
							your project!
						</p>
						<button
							type="button"
							onClick={handleCloseAndReset}
							className="px-8 py-3 rounded-full bg-deepText text-white font-bold uppercase tracking-widest text-[12px] hover:scale-105 active:scale-95 transition-all shadow-lg"
						>
							Close
						</button>
					</div>
				) : submitStatus === "error" ? (
					//ERROR SCREEN
					<div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 h-full">
						<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
							<FaCircleExclamation className="text-red-500 text-4xl" />
						</div>
						<h2 className="text-4xl font-serif text-deepText font-bold mb-3">
							Something went wrong
						</h2>
						<p className="text-deepText/60 font-sans uppercase tracking-widest text-xs mb-8 max-w-xs mx-auto">
							We couldn't send your details. Please try again later or email me
							directly.
						</p>
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => setSubmitStatus("idle")} // Go back to form to try again
								className="px-6 py-3 rounded-full border-2 border-deepText/10 text-deepText font-bold uppercase tracking-widest text-[12px] hover:bg-white transition-all"
							>
								Try Again
							</button>
							<button
								type="button"
								onClick={handleCloseAndReset}
								className="px-6 py-3 rounded-full bg-deepText text-white font-bold uppercase tracking-widest text-[12px] hover:scale-105 active:scale-95 transition-all shadow-lg"
							>
								Close
							</button>
						</div>
					</div>
				) : (
					//STANDARD FORM
					<>
						{/* Header Section */}
						<div className="relative z-10 mb-6">
							{/* Progress Bar */}
							<div className="flex items-center gap-2 mb-4">
								<div className="h-1.5 flex-1 bg-deepText/5 rounded-full overflow-hidden">
									<div
										className="h-full bg-linear-to-r from-pastelPink to-pastelPurple transition-all duration-500 ease-out"
										style={{ width: `${(step / FORM_STEPS.length) * 100}%` }}
									/>
								</div>
								<span className="text-[10px] font-bold text-deepText/40 uppercase tracking-widest min-w-[30px] text-right">
									{step}/{FORM_STEPS.length}
								</span>
							</div>

							<h2 className="text-3xl font-serif text-deepText font-bold mb-1 transition-all duration-300">
								{currentStepConfig.title}
							</h2>
							<p className="text-sm font-sans text-deepText/60 uppercase tracking-widest transition-all duration-300">
								{currentStepConfig.subtitle}
							</p>
						</div>

						{/* Dynamic Form Content */}
						<div className="flex-1 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
							<form onSubmit={handleSubmit} className="h-full flex flex-col">
								<div className="flex-1 py-2">
									{/* 1. Mini Presentation */}
									{step === 1 && (
										<div className="h-full flex flex-col justify-center items-center text-left space-y-4 animate-in fade-in zoom-in-95 duration-500">
											<p className="text-lg text-deepText/80 font-medium leading-relaxed max-w-sm">
												Hey, I'm Joana! Designer, developer, and video editor
												helping brands create digital experiences. Based in
												Portugal & working worldwide 🌍
											</p>
											<p className="text-sm text-deepText/60">
												Ready to start? This quick form helps me understand your
												project.
											</p>
										</div>
									)}

									{/* 2. Basic Information */}
									{step === 2 && (
										<div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<div className="grid grid-cols-2 gap-4">
												<InputField
													label="First Name"
													name="firstName"
													placeholder="Jane"
													value={formData.firstName}
													onChange={handleChange}
													autoFocus
												/>
												<InputField
													label="Last Name"
													name="lastName"
													placeholder="Doe"
													value={formData.lastName}
													onChange={handleChange}
												/>
											</div>
											<InputField
												label="Email Address"
												name="email"
												type="email"
												placeholder="youremail@example.com"
												value={formData.email}
												onChange={handleChange}
											/>
										</div>
									)}

									{/* 3. Type of Project */}
									{step === 3 && (
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-8 duration-500">
											<ServiceCard
												icon={FaPalette}
												label="Web Design"
												selected={formData.serviceType === "Web Design"}
												onClick={() => handleServiceSelect("Web Design")}
											/>
											<ServiceCard
												icon={FaLaptopCode}
												label="Web Development"
												selected={formData.serviceType === "Site from scratch"}
												onClick={() => handleServiceSelect("Site from scratch")}
											/>
											<ServiceCard
												icon={FaVideo}
												label="Video Editing"
												selected={formData.serviceType === "Video Editing"}
												onClick={() => handleServiceSelect("Video Editing")}
											/>
										</div>
									)}

									{/* 4. Brand Identity */}
									{step === 4 && (
										<div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<InputField
												label="Brand Name"
												name="brandName"
												placeholder="My Awesome Brand"
												value={formData.brandName}
												onChange={handleChange}
												autoFocus
											/>
											<TextAreaField
												label="Describe the brand"
												name="brandDescription"
												placeholder="Tell me about your mission, values, and target audience..."
												value={formData.brandDescription}
												onChange={handleChange}
												rows={5}
											/>
										</div>
									)}

									{/* 5. Specific Ideas / Visuals */}
									{step === 5 && (
										<div className="h-full animate-in fade-in slide-in-from-right-8 duration-500">
											<TextAreaField
												label="Visual Inspiration"
												name="visualInspiration"
												placeholder="Any specific ideas? Colors, existing styles, brand references? Tell me everything!"
												value={formData.visualInspiration}
												onChange={handleChange}
												rows={8}
												autoFocus
											/>
										</div>
									)}

									{/* 6. Tone and Style */}
									{step === 6 && (
										<div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<InputField
												label="My brand is..."
												name="toneStyle"
												placeholder="e.g., Modern, Playful, Professional, Minimalist..."
												value={formData.toneStyle}
												onChange={handleChange}
												autoFocus
											/>
										</div>
									)}

									{/* 7. Pinterest Board */}
									{step === 7 && (
										<div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<InputField
												label="If you have a pinterest board you would like to share!"
												name="pinterestUrl"
												placeholder="https://pinterest.com/..."
												value={formData.pinterestUrl}
												onChange={handleChange}
												autoFocus
											/>
										</div>
									)}

									{/* 8. Deadlines */}
									{step === 8 && (
										<div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<InputField
												label="Target Deadline"
												name="deadline"
												type="text"
												placeholder="e.g., End of next month, ASAP, Flexible..."
												value={formData.deadline}
												onChange={handleChange}
												autoFocus
											/>
											<p className="text-xs text-deepText/50">
												*This helps me schedule my availability to give your
												project the attention it deserves.
											</p>
										</div>
									)}

									{/* 9. Estimated Budget */}
									{step === 9 && (
										<div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<InputField
												label="estimated budget"
												name="budget"
												type="digital"
												placeholder="Add your project budget..."
												value={formData.budget}
												onChange={handleChange}
												autoFocus
											/>
										</div>
									)}

									{/* 10. Consent */}
									{step === 10 && (
										<div className="flex flex-row items-center justify-center h-full space-x-5 animate-in fade-in slide-in-from-right-8 duration-500">
											<button
												type="button"
												className={cn(
													"w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors border-deepText/30",
													formData.consent &&
														"bg-pastelBlue border-pastelBlue text-deepText",
												)}
												onClick={handleConsentToggle}
											>
												{formData.consent && <FaCheck size={14} />}
											</button>

											<span className="text-sm font-semibold text-deepText/80 text-left flex-1">
												I consent to this project being shared for promotional
												purposes
											</span>
										</div>
									)}
								</div>
							</form>
						</div>

						{/* Footer / Navigation */}
						<div className="pt-6 mt-auto flex justify-between items-center relative z-10 border-t border-deepText/5">
							<button
								type="button"
								onClick={handlePrev}
								disabled={step === 1}
								className={cn(
									"flex items-center gap-2 px-4 py-2 rounded-full text-deepText/60 font-bold uppercase text-[12px] tracking-widest transition-all duration-300 hover:bg-white/50",
									step === 1 ? "opacity-0 pointer-events-none" : "opacity-100",
								)}
							>
								<FaArrowLeft /> Back
							</button>

							{step < FORM_STEPS.length ? (
								<button
									type="button"
									onClick={handleNext}
									disabled={!isStepValid()}
									className={cn(
										"group relative px-6 py-3 rounded-full overflow-hidden shadow-lg transition-all duration-300",
										isStepValid()
											? "bg-deepText text-white hover:scale-105 active:scale-95 cursor-pointer"
											: "bg-deepText/20 text-deepText/40 cursor-not-allowed",
									)}
								>
									<div
										className={cn(
											"absolute inset-0 bg-linear-to-r from-pastelPink via-pastelPurple to-pastelBlue transition-opacity duration-300",
											isStepValid()
												? "opacity-0 group-hover:opacity-100"
												: "opacity-0",
										)}
									/>
									<span className="relative z-10 flex items-center gap-2 font-bold tracking-widest uppercase text-[12px]">
										Next <FaArrowRight />
									</span>
								</button>
							) : (
								<button
									type="button"
									onClick={handleSubmit}
									disabled={!formData.consent}
									className={cn(
										"group relative px-8 py-3 rounded-full overflow-hidden shadow-lg transition-all duration-300",
										formData.consent
											? "bg-deepText text-white hover:scale-105 active:scale-95 cursor-pointer"
											: "bg-deepText/20 text-deepText/40 cursor-not-allowed",
										isSubmitting &&
											"bg-linear-to-r from-pastelMint to-pastelBlue",
									)}
								>
									<span className="relative z-10 flex items-center gap-2 font-bold tracking-widest uppercase text-[12px]">
										Send Request
										{isSubmitting ? (
											<RiLoader4Fill
												className="ml-2 animate-spin text-white"
												size={20}
											/>
										) : (
											<FaCheck />
										)}
									</span>
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

// --- Reusable Components ---

const InputField = ({
	label,
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
	<div className={cn("group", className)}>
		<label className="block text-[12px] font-bold text-deepText/50 uppercase tracking-wider mb-1.5 ml-1">
			{label}
			<input
				{...props}
				className="w-full bg-white/40 border-b-2 border-deepText/10 px-4 py-3 rounded-t-lg text-deepText text-[16px] font-medium placeholder-deepText/30 focus:outline-none focus:border-pastelPink focus:bg-white/60 transition-all duration-300"
			/>
		</label>
	</div>
);

const TextAreaField = ({
	label,
	className,
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
	<div className={cn("group h-full flex flex-col", className)}>
		<label className="block text-[12px] font-bold text-deepText/50 uppercase tracking-wider mb-1.5 ml-1">
			{label}
			<textarea
				{...props}
				className="w-full flex-1 bg-white/40 border-b-2 border-deepText/10 px-4 py-3 rounded-t-lg text-deepText text-[16px] font-medium placeholder-deepText/30 focus:outline-none focus:border-pastelPurple focus:bg-white/60 transition-all duration-300 resize-none"
			/>
		</label>
	</div>
);

const ServiceCard = ({
	icon: Icon,
	label,
	selected,
	onClick,
}: {
	icon: React.ElementType;
	label: string;
	selected: boolean;
	onClick: () => void;
}) => (
	<button
		type="button"
		onClick={onClick}
		className={cn(
			"cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 group active:scale-105",
			selected
				? "bg-pastelPurple/20 border-pastelPurple"
				: "bg-white/40 border-transparent hover:border-deepText/10 hover:bg-white/60",
		)}
	>
		<Icon
			size={24}
			className={cn(
				"mb-2 transition-colors",
				selected
					? "text-deepText"
					: "text-deepText/50 group-hover:text-deepText/70",
			)}
		/>
		<span className="text-xs font-bold uppercase text-center tracking-wide transition-colors text-deepText">
			{label}
		</span>
	</button>
);
