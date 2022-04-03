import { useEffect, useState } from "react";
import { IOptionGroup } from "../models/IOptionGroup";
import { IOverallResult } from "../models/IOverallResult";
import OptionGroup from "./OptionGroup";

interface IAnswerProps {
    optionGroups: IOptionGroup[];
    overallResult: IOverallResult;
    isNextQuestion: boolean;
    onNewResultComputed(result: IOverallResult): void
}

const AnswerPanel = (props: IAnswerProps) => {
    const [currentOptionGroups, setCurrentOptionGroups] = useState<IOptionGroup[]>(props.optionGroups);
    const [overallQuestionResult, setOverallQuestionResult] = useState<IOverallResult>(IOverallResult.Incorrect);

    useEffect(() => {
        setCurrentOptionGroups(props.optionGroups);
    }, [props.optionGroups]);

    useEffect(() => {
        setOverallQuestionResult(props.overallResult);
    }, [props.overallResult])

    const computeOverallResult = (optionGroups: IOptionGroup[]) => {
        const correctSelected = optionGroups.filter(og => og.correctOption === og.selectedOption);

        if (correctSelected.length === optionGroups.length) {
            props.onNewResultComputed(IOverallResult.Correct);
            return;
        }

        if (correctSelected.length < optionGroups.length && correctSelected.length >= optionGroups.length / 2) {
            props.onNewResultComputed(IOverallResult.PartialCorrect);
            return;
        }

        props.onNewResultComputed(IOverallResult.Incorrect);
    };

    const handleOptionSelected = (optionGroup: IOptionGroup) => {
        const optionGroupsToUpdate = [...currentOptionGroups];
        optionGroupsToUpdate.forEach((og, index) => {
            if (og.options.every(op => optionGroup.options.indexOf(op) >= 0)) {
                optionGroupsToUpdate[index] = optionGroup
            }
        });

        computeOverallResult(optionGroupsToUpdate);
        setCurrentOptionGroups(optionGroupsToUpdate);
    }

    return (
        <>
            {currentOptionGroups.map((group: IOptionGroup, index: number) => {
                return <OptionGroup overallResult={overallQuestionResult}
                    optionGroup={group} key={index}
                    isNextQuestion={props.isNextQuestion}
                    onOptionSelected={(optionGroup: IOptionGroup) => handleOptionSelected(optionGroup)} />
            })}
        </>
    );
};

export default AnswerPanel;