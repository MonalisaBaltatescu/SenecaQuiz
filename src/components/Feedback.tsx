import { IOverallResult } from "../models/IOverallResult";

interface IFeedbackProps {
    overallResult: IOverallResult;
}

const Feedback = (props: IFeedbackProps) => {
    return (
        <p>{(props.overallResult === IOverallResult.Incorrect || props.overallResult === IOverallResult.PartialCorrect) ? "The answer is incorrect!" : `The answer is correct!`}</p>
    );
};

export default Feedback;