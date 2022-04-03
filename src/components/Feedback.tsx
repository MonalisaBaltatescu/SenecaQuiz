interface IFeedbackProps {
    optionsNo: number;
    correctNo: number
}

const Feedback = (props: IFeedbackProps) => {
    return (
        <p>{props.optionsNo === props.correctNo ? "The answer is correct!" : `The answer is incorrect! You got ${props.correctNo} out of ${props.optionsNo}. Keep going!`}</p>
    );
};

export default Feedback;