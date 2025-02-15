import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//export const BASE_URL= "https://social-awareness-app.onrender.com"
export const BASE_URL= "http://localhost:5000"