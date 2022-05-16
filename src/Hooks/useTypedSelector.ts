import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../Redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector