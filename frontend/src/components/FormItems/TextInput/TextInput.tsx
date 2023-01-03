import React, {FC} from 'react';
import styles from "./TextInput.module.scss";

interface Props {
    placeholder?: string;
    onChange?: (value: string) => void;
}

const TextInput:FC<Props> = ({placeholder = '',onChange}) => {
    return (
        <input placeholder={placeholder} className={styles.input} onChange={(e: any) => onChange && onChange(e.target.value)}/>
    );
};

export default TextInput;