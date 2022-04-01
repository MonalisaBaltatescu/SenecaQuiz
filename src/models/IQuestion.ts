import { IOptionGroup } from "./IOptionGroup";

export interface IQuestion {
    question: string;
    optionGroups: IOptionGroup[];
}