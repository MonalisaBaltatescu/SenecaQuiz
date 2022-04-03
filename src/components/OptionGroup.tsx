import { useEffect, useState } from "react";
import { IOptionGroup } from "../models/IOptionGroup";
import { IOverallResult } from "../models/IOverallResult";
import { ISliderPosition } from "../models/ISliderPosition";
import styles from "../styles/OptionGroup.module.scss";
import { utils } from "../utils/utils";

interface IOptionGroupProps {
    optionGroup: IOptionGroup;
    overallResult: IOverallResult;
    isNextQuestion: boolean;
    onOptionSelected(optionGroup: IOptionGroup): void;
}

const OptionGroup = (props: IOptionGroupProps) => {

    const [currentOptionGroup, setCurrentOptionGroup] = useState<IOptionGroup>({options: [], selectedOption: "", correctOption: ""});
    const [currentSelectedPosition, setCurrentSelectedPosition] = useState<ISliderPosition>();

    useEffect(() => {
        setCurrentOptionGroup(props.optionGroup);
        if (props.isNextQuestion) {
            setCurrentSelectedPosition(undefined);
        }
    }, [props.optionGroup, props.isNextQuestion]);

    const handleOptionChange = (option: string, index: number) => {
        const optionGroup: IOptionGroup = { ...currentOptionGroup, selectedOption: option };
        setCurrentSelectedPosition(utils.getSliderPosition(index));
        props.onOptionSelected({ ...optionGroup, selectedOption: option });
    };

    const hasTwoOptions = () => {
        return currentOptionGroup.options.length === 2;
    };

    return (
        <div className={`${styles.optionGroup} ${styles[props.overallResult]} ${currentSelectedPosition ? styles[currentSelectedPosition] : ""} ${hasTwoOptions() ? styles.twoOptions : styles.threeOptions}`}>
            {currentOptionGroup.options.map((option: string, index: number) => {
                return <button key={index}
                    className={`${styles.option} ${currentOptionGroup.selectedOption === option && styles.isSelected}`}
                    disabled={props.overallResult === IOverallResult.Correct}
                    onClick={() => handleOptionChange(option, index)}>{option}
                </button>
            })}
        </div>
    );
};

export default OptionGroup;