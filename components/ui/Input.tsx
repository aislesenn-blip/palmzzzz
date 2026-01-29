export function Input({ label, ...props }: any) {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{label}</label>}
            <input
                className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-colors font-medium text-lg placeholder-gray-300"
                {...props}
            />
        </div>
    )
}
