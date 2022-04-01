import { useState } from "react";
import { IOptionGroup } from "../models/IOptionGroup";
import { IOverallResult } from "../models/IOverallResult";
import OptionGroup from "./OptionGroup";

interface IAnswerProps {
    optionGroups: IOptionGroup[];
    overallResult: IOverallResult;
    onAnswerChanged(optionGroups: IOptionGroup[]): void
}
const Answer = (props: IAnswerProps) => {
    const [currentOptionGroups, setCurrentOptionGroups] = useState<IOptionGroup[]>(props.optionGroups);

    const handleOptionGroupChanged = (optionGroup: IOptionGroup) => {
        const unchangedOptionGroups = currentOptionGroups.filter(op => op.options.every(o => optionGroup.options.indexOf(o) < 0));
        const newOptionGroups = [...unchangedOptionGroups, optionGroup];
        props.onAnswerChanged(newOptionGroups);
        setCurrentOptionGroups(newOptionGroups);
    };
    return (
        <>
            {currentOptionGroups.map((group: IOptionGroup, index: number) => {
                return <OptionGroup overallResult={props.overallResult} optionGroup={group} key={index} onOptionSelected={(optionGroup: IOptionGroup) => handleOptionGroupChanged(optionGroup)} />
            })}
        </>
    );
};

export default Answer;