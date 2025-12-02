import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//utility for merging tailwind classes
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
