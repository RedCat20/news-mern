import React, {FC, ReactNode} from 'react';

import styles from "./ButtonPrimary.module.scss"

interface Props {
    children: string | ReactNode;
    width?: number;
    fullWidth?: boolean;
    onClickHandler?: any;
    noPadding?: boolean;
}

const ButtonPrimary:FC<Props> = ({children, fullWidth,width,noPadding,onClickHandler}) => {
    return (
        <button
            onClick={onClickHandler}
            className={styles.button} style={{width: fullWidth ? '100%' : `${width ? width + 'px' : '200px'}`, padding: noPadding ? '10px 0px' : 'padding: 10px 20px'}}>
            {children}
        </button>
    );
};

export default ButtonPrimary;