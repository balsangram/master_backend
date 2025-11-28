import { asyncHandler } from "./asyncHandler.js";
export const wrapAllAsync = (obj) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, fn]) => [
            key,
            typeof fn === "function" ? asyncHandler(fn) : fn,
        ])
    );
