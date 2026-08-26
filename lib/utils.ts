import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const carEF = 0.192;
export const bikeEF = 0;
export const busEF = 0.105;
export const trainEF = 0.041;
export const flightEF = 0.255;

export const electricityEF = 0.82;
export const lpgEF = 3.0;
export const naturalGasEF = 2.04;

export const chickenEF = 0.93;
export const vegMealsEF = 0.55;
export const dairyEF = 0.93;

export const plasticEF = 2.5;
export const paperEF = 1.0;
export const organicEF = 0.5;
export const othersEF = 1.5;
