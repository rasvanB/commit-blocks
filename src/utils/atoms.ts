import { atom } from "jotai";
import { Day } from "./fetch";

export const hoveredDayAtom = atom<Day | null>(null);
