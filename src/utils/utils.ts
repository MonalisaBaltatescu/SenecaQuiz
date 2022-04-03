import { IQuestion } from "../models/IQuestion";
import { ISliderPosition } from "../models/ISliderPosition";

export class Utils {
    public static getSliderPosition(index: number): ISliderPosition {
        switch (index) {
            case 0: return ISliderPosition.First;
            case 1: return ISliderPosition.Second;
            case 2: return ISliderPosition.Third;
            default: return ISliderPosition.First;
        }
    }

    public static getQuestions(): IQuestion[] {
        const questions: IQuestion[] = [
            {
                question: "Built-in React hooks:", optionGroups: [
                    { options: ["setState", "useState", "isState"], correctOption: "useState", selectedOption: "" },
                    { options: ["useEffect", "useProps", "setEffect"], correctOption: "useEffect", selectedOption: "" },
                    { options: ["useFunction", "useComponent", "useCallback"], correctOption: "useCallback", selectedOption: "" },
                    { options: ["useMemo", "useReduce", "setVariable"], correctOption: "useMemo", selectedOption: "" }
                ]
            },
            {
                question: "What is true about React?", optionGroups: [
                    { options: ["Doesn't support TypeScript", "Builds Single Page Applications"], correctOption: "Builds Single Page Applications", selectedOption: "" },
                    { options: ["Uses props to control childen", "A component state could be changed only when fetching data from the server"], correctOption: "Uses props to control childen", selectedOption: "" },
                    { options: ["A component can return multiple HTML elements", ".tsx files support writing css"], correctOption: ".tsx files support writing css", selectedOption: "" },
                ]
            },
            {
                question: "Select React key concepts:", optionGroups: [
                    { options: ["Virtual DOM", "Running JavaScript in the browser"], correctOption: "Virtual DOM", selectedOption: "" },
                    { options: ["It is all about components", "Bundles .js files for performance"], correctOption: "It is all about components", selectedOption: "" },
                    { options: ["Stateful and Stateless components", "HTML is written in dedicated files"], correctOption: "Stateful and Stateless components", selectedOption: "" },
                ]
            }
        ];
        return questions;
    }
}