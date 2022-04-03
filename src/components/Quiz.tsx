import Answer from "./Answer";
import Feedback from "./Feedback";
import Question from "./Question";
import styles from "../styles/Quiz.module.scss";
import { useEffect, useMemo, useState } from "react";
import { IOverallResult } from "../models/IOverallResult";
import { IOptionGroup } from "../models/IOptionGroup";
import { Randomizer } from "../utils/Randomizer";
import { IQuizStatus } from "../models/IQuizStatus";
import { IQuiz } from "../models/IQuiz";

interface IOverallResultState {
    overallResult: IOverallResult;
    correctAnswers: number;
}

const Quiz = () => {
    const random = useMemo(() => { return new Randomizer(); }, []);
    const [overallResultState, setOverallResultState] = useState<IOverallResultState>({ overallResult: IOverallResult.Incorrect, correctAnswers: 0 });
    const [quizState, setQuizState] = useState<IQuiz>({ currentQuestion: undefined, status: IQuizStatus.InProgress });

    useEffect(() => {
        if (overallResultState.overallResult === IOverallResult.Correct) {
            const selectedQuestion: IQuiz = random.getRandomQuiz();
            setQuizState(selectedQuestion);
            setOverallResultState({ overallResult: IOverallResult.Incorrect, correctAnswers: 0 });
        }
    }, [overallResultState.overallResult, random]);

    useEffect(() => {
        setQuizState(random.getRandomQuiz());
    }, [random]);

    const computeOverallResult = (optionGroups: IOptionGroup[]) => {
        const correctSelected = optionGroups.filter(og => og.correctOption === og.selectedOption);

        if (correctSelected.length === optionGroups.length) {
            setOverallResultState({ overallResult: IOverallResult.Correct, correctAnswers: correctSelected.length });
            return;
        }

        if (correctSelected.length < optionGroups.length && correctSelected.length >= optionGroups.length / 2) {
            setOverallResultState({ overallResult: IOverallResult.PartialCorrect, correctAnswers: correctSelected.length });
            return;
        }

        setOverallResultState({ overallResult: IOverallResult.Incorrect, correctAnswers: correctSelected.length });

    };

    const handleAnswerChange = (optionGroups: IOptionGroup[]) => {
        computeOverallResult(optionGroups);
    };

    if (!quizState.currentQuestion) {
        return quizState.status === IQuizStatus.NoQuestionsAvailable
            ? <p>Sorry! No questions for today.</p>
            : <p>Congratulations! </p>
    } else {

        return (
            <div className={`${styles.quizContainer} ${styles[overallResultState.overallResult]}`}>
                <Question text={quizState.currentQuestion.question} />
                <Answer optionGroups={quizState.currentQuestion.optionGroups} onAnswerChanged={handleAnswerChange} overallResult={overallResultState.overallResult} />
                <Feedback correctNo={overallResultState.correctAnswers} optionsNo={quizState.currentQuestion.optionGroups.length} />
            </div>
        );
    }

};

export default Quiz;