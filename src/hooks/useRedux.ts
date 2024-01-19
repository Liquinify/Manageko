import { AppDispatch } from "@/store/store";
import { RootState } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
