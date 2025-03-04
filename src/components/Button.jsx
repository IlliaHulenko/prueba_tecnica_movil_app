import React from 'react'

const Button = ({ id, title,  leftIcon, rightIcon, containerClass, disabled, onClick }) => {
  return (
    <button 
        id={id}        
        className={containerClass}  
        disabled={disabled} 
        onClick={onClick}     
    >
        {leftIcon}        
        <span>
            <div>{title}</div>
        </span>
        {rightIcon}
    </button>
  )
}

export default Button