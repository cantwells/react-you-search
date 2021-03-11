import React from 'react'
import cn from 'classnames';

const Button = React.memo(({ children, className, onClick, role, type }) => {
    return (
        <button className={cn('button', {[className]: className })} 
                role={role} 
                onClick={onClick}
                type={type}
            >
            {children}
        </button>
    )
});

export default Button;