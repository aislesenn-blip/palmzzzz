export function Button({ children, onClick, className, disabled, type = 'button', variant = 'primary' }: any) {
    const base = "font-bold py-3 px-6 rounded-full transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-black text-white",
        forest: "bg-forest text-white",
        outline: "bg-transparent border-2 border-gray-200 hover:border-black",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${base} ${variants[variant as keyof typeof variants] || variants.primary} ${className}`}
        >
            {children}
        </button>
    )
}
