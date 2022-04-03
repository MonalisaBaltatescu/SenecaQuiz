import AnswerPanel from "./AnswerPanel";
import Feedback from "./Feedback";
import Question from "./Question";
import styles from "../styles/Quiz.module.scss";
import { useEffect, useMemo, useState } from "react";
import { IOverallResult } from "../models/IOverallResult";
import { Randomizer } from "../utils/Randomizer";
import { IQuizStatus } from "../models/IQuizStatus";
import { IQuiz } from "../models/IQuiz";

const Quiz = () => {
    const random = useMemo(() => { return new Randomizer(); }, []);
    const [quizState, setQuizState] = useState<IQuiz>({ currentQuestion: undefined, status: IQuizStatus.InProgress });
    const [overallResult, setOverallResult] = useState<IOverallResult>(IOverallResult.Incorrect);
    const [isNextQuestionGenerated, setIsNextQuestionGenerated] = useState<boolean>(false);

    useEffect(() => {
        if (overallResult === IOverallResult.Correct) {
            const timer = setTimeout(() => {
                const selectedQuestion: IQuiz = random.getRandomQuiz();
                setQuizState(selectedQuestion);
                setIsNextQuestionGenerated(true);
                setOverallResult(IOverallResult.Incorrect);
            }, 1000);
            return () => { clearTimeout(timer) };
        }

    }, [overallResult, random]);

    useEffect(() => {
        setQuizState(random.getRandomQuiz());
    }, [random]);

    if (!quizState.currentQuestion) {
        return quizState.status === IQuizStatus.NoQuestionsAvailable
            ? <p>Sorry! No questions for today.</p>
            : <p>Congratulations! </p>
    } else {
        return (
            <div className={`${styles.quizContainer} ${styles[overallResult]}`}>
                <Question text={quizState.currentQuestion.question} />
                <AnswerPanel optionGroups={quizState.currentQuestion.optionGroups}
                    isNextQuestion={isNextQuestionGenerated}
                    overallResult={overallResult}
                    onNewResultComputed={(overallResult: IOverallResult) => {setOverallResult(overallResult); setIsNextQuestionGenerated(false);}} />
                <Feedback overallResult={overallResult} />
            </div>
        );
    }
};

export default Quiz;