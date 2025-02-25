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
        {/* TODO: Fix Tailwind's CSS styles */}
        <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
            <div>{title}</div>
        </span>
        {rightIcon}
    </button>
  )
}

export default Button