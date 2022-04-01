import { useState } from "react";
import { IOptionGroup } from "../models/IOptionGroup";
import { IOverallResult } from "../models/IOverallResult";
import { ISliderPosition } from "../models/ISliderPosition";
import styles from "../styles/OptionGroup.module.scss";

interface IOptionGroupProps {
    optionGroup: IOptionGroup;
    overallResult: IOverallResult;
    onOptionSelected(optionGroup: IOptionGroup): void;
}

const OptionGroup = (props: IOptionGroupProps) => {

    const [currentOptionGroup, setCurrentOptionGroup] = useState<IOptionGroup>(props.optionGroup);
    const [currentSelectedPosition, setCurrentSelectedPosition] = useState<ISliderPosition>();

    const handleOptionChange = (option: string, index: number) => {
        setCurrentOptionGroup((previousOptionGroup: IOptionGroup) => {
            const currentOptionGroup: IOptionGroup = { ...previousOptionGroup, selectedOption: option };
            setCurrentSelectedPosition(index === 0 ? ISliderPosition.First : index === 1 ? ISliderPosition.Second : ISliderPosition.Third);
            props.onOptionSelected({ ...previousOptionGroup, selectedOption: option });
            return currentOptionGroup;
        });
    };

    return (
        <div className={`${styles.optionGroup} ${styles[props.overallResult]} ${currentSelectedPosition ? styles[currentSelectedPosition] :  ""}`}>
            {currentOptionGroup.options.map((option: string, index: number) => {
                return <button key={index} className={`${styles.option} ${currentOptionGroup.selectedOption === option && styles.isSelected}`} onClick={() => handleOptionChange(option, index)}>{option}</button>
            })}
        </div>
    );
};

export default OptionGroup;