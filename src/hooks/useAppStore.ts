import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

/** Typed dispatch hook for Redux actions. */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typed selector hook for Redux state. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
