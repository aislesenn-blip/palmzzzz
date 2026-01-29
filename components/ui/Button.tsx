export function Button({ children, onClick, className, disabled, type = 'button' }: any) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`bg-black text-white font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    )
}
