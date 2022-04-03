import { IQuestion } from "../models/IQuestion";
import { IQuiz } from "../models/IQuiz";
import { IQuizStatus } from "../models/IQuizStatus";
import { utils } from "./utils";

export class Randomizer {
    private allQuestions: IQuestion[] = utils.getQuestions();
    private remainingQuestions: IQuestion[] = this.allQuestions;

    public getRandomQuiz(): IQuiz {
        if (!this.allQuestions.length) {
            return { currentQuestion: undefined, status: IQuizStatus.NoQuestionsAvailable };
        }

        if (!this.remainingQuestions.length) {
            return { currentQuestion: undefined, status: IQuizStatus.Finished };
        }

        const selectedQuestion: IQuestion = this.remainingQuestions[this.generateRandomIndex(0, this.remainingQuestions.length - 1)];
        this.remainingQuestions = this.remainingQuestions.filter(q => q.question !== selectedQuestion.question);
        return {currentQuestion : selectedQuestion, status: IQuizStatus.InProgress};
    }

    private generateRandomIndex(start: number, end: number): number {
        const random = Math.random() * (end - start) + start;
        return Math.floor(random);
    }
}