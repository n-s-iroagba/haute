import React from 'react'
import { companyName } from '../../constants/constants';
import'../styles/styles.css'

const MiniFooter: React.FC<{ primaryVariant?: boolean }> = ({ primaryVariant }) => {
    const baseClassName = 'border-0 border-top text-center w-100 mini-footer';
    const lightClassName = 'text-light';
    const darkClassName = 'text-dark border-black';
  
    const classNames = `${baseClassName} ${primaryVariant ? lightClassName : darkClassName}`;
  
    return (
      <>
        <footer className={classNames}><p>{companyName} &copy;2024</p></footer>
      </>
    );
 };
export default MiniFooter