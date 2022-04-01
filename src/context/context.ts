import React from "react";
import { IOverallResult } from "../models/IOverallResult";

const QuizContext = React.createContext({
    overallResult: IOverallResult.Incorrect
});

export default QuizContext;