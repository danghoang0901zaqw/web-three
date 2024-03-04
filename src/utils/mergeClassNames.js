import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClassNames = (...classes) => twMerge(clsx(...classes));

export default mergeClassNames;