interface IQuestionProps {
    text: string;
}

const Question = (props: IQuestionProps) => {
    return (
        <p>{props.text}</p>
    );
};

export default Question;