import cn from 'classnames';

const Button = ({ children, className, onClick }) => {
    return (
        <button className={cn('button', {[className]: className })} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;