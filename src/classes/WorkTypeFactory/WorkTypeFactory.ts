import { WorkTypes } from "../../interfaces/WorkTypes";
import { Pomodoro } from "./Pomodoro";

export class WorkTypeFactory {
	public static get(type: WorkTypes) {
		switch (type) {
			case WorkTypes.Pomodoro:
			default:
				return new Pomodoro();
		}
	}
}