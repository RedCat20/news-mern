import React, {FC} from 'react';
import styles from "./TextInput.module.scss";

interface Props {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

const TextInput:FC<Props> = ({placeholder = '',value,onChange}) => {
    return (
        <input placeholder={placeholder}
               className={styles.input}
               value={value}
               onChange={(e: any) => onChange && onChange(e.target.value)}
        />
    );
};

export default TextInput;