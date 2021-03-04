import cn from 'classnames';

const Button = ({ children, className, onClick, role }) => {
    return (
        <button className={cn('button', {[className]: className })} role={role} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;