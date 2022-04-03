import { IQuestion } from "./IQuestion";
import { IQuizStatus } from "./IQuizStatus";

export interface IQuiz {
    currentQuestion: IQuestion |undefined;
    status: IQuizStatus;
}