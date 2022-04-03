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

interface IOverallResultState {
    overallResult: IOverallResult;
    correctAnswers: number;
}

const AnswerPanel = (props: IAnswerProps) => {
    const [currentOptionGroups, setCurrentOptionGroups] = useState<IOptionGroup[]>(props.optionGroups);
    const [overallQuestionResultState, setOverallQuestionResultState] = useState<IOverallResultState>({ overallResult: IOverallResult.Incorrect, correctAnswers: 0 });

    useEffect(() => {
        setCurrentOptionGroups(props.optionGroups);
        setOverallQuestionResultState({ overallResult: IOverallResult.Incorrect, correctAnswers: 0 });
    }, [props.optionGroups]);

    const computeOverallResult = (optionGroups: IOptionGroup[]) => {
        const correctSelected = optionGroups.filter(og => og.correctOption === og.selectedOption);

        if (correctSelected.length === optionGroups.length) {
            setOverallQuestionResultState({ overallResult: IOverallResult.Correct, correctAnswers: correctSelected.length });
            props.onNewResultComputed(IOverallResult.Correct);
            return;
        }

        if (correctSelected.length < optionGroups.length && correctSelected.length >= optionGroups.length / 2) {
            setOverallQuestionResultState({ overallResult: IOverallResult.PartialCorrect, correctAnswers: correctSelected.length });
            props.onNewResultComputed(IOverallResult.PartialCorrect);
            return;
        }

        setOverallQuestionResultState({ overallResult: IOverallResult.Incorrect, correctAnswers: correctSelected.length });
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
            {props.optionGroups.map((group: IOptionGroup, index: number) => {
                return <OptionGroup overallResult={overallQuestionResultState.overallResult}
                    optionGroup={group} key={index}
                    isNextQuestion={props.isNextQuestion}
                    onOptionSelected={(optionGroup: IOptionGroup) => handleOptionSelected(optionGroup)} />
            })}
        </>
    );
};

export default AnswerPanel;