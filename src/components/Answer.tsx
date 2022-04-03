import { useEffect, useState } from "react";
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

    useEffect(() => {
        setCurrentOptionGroups(props.optionGroups);
    }, [props.optionGroups]);

    const handleOptionGroupChanged = (optionGroup: IOptionGroup) => {
        const optionGroupsToUpdate = [...currentOptionGroups];
        optionGroupsToUpdate.forEach((op, index) => {
            if(op.options.every(o => optionGroup.options.indexOf(o) >= 0)){
                optionGroupsToUpdate[index] = optionGroup
            }
        });
        
        props.onAnswerChanged(optionGroupsToUpdate);
        setCurrentOptionGroups(optionGroupsToUpdate);
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