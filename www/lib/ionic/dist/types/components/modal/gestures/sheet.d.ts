import { Animation } from '../../../interface';
export declare const createSheetGesture: (baseEl: HTMLIonModalElement, backdropEl: HTMLIonBackdropElement, wrapperEl: HTMLElement, initialBreakpoint: number, backdropBreakpoint: number, animation: Animation, breakpoints: number[] | undefined, onDismiss: () => void, onBreakpointChange: (breakpoint: number) => void) => import("../../../interface").Gesture;