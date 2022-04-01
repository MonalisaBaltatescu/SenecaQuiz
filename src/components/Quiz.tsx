import { IQuestion } from "../models/IQuestion";
import Answer from "./Answer";
import Feedback from "./Feedback";
import Question from "./Question";
import styles from "../styles/Quiz.module.scss";
import { useState } from "react";
import { IOverallResult } from "../models/IOverallResult";
import { IOptionGroup } from "../models/IOptionGroup";

const Quiz = () => {
    const questions: IQuestion[] = [
        {
            question: "An animal cell contains:", optionGroups: [
                { options: ["Op1", "Op2"], correctOption: "Op1", selectedOption: "" },
                { options: ["Op3", "Op4"], correctOption: "Op3", selectedOption: "" },
                { options: ["Op5", "Op6"], correctOption: "Op5", selectedOption: "" },
                { options: ["Op7", "Op8"], correctOption: "Op7", selectedOption: "" }
            ]
        }
    ];

    const [overallResult, setOverallResult] = useState<IOverallResult>(IOverallResult.Incorrect);

    const computeOverallResult = (optionGroups: IOptionGroup[]) => {
        const correctSelected = optionGroups.filter(og => og.correctOption === og.selectedOption);

        if (correctSelected.length === optionGroups.length) {
            setOverallResult(IOverallResult.Correct);
            return;
        }

        if (correctSelected.length < optionGroups.length && correctSelected.length > optionGroups.length / 2) {
            setOverallResult(IOverallResult.PartialCorrect);
            return;
        }

        setOverallResult(IOverallResult.Incorrect);

    };

    const handleAnswerChange = (optionGroups: IOptionGroup[]) => {
        computeOverallResult(optionGroups);
    };

    return (
        <div className={`${styles.quizContainer} ${styles[overallResult]}`}>
            <Question />
            <Answer optionGroups={questions[0].optionGroups} onAnswerChanged={handleAnswerChange} overallResult={overallResult} />
            <Feedback />
        </div>
    );
};

export default Quiz;