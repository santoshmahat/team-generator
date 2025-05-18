interface InputFieldProps {
    remove: () => void;
    value: string;
    placeholder: string;
    onChange: (value: string, index: number) => void;
    index: number;
}

export default function InputField(props: InputFieldProps) {
    return (
        <div className="flex flex-1">
            <button
                onClick={() => props.remove()}
                className="px-3 bg-[#e5e5e5] border border-[#b9b9b9] border-r-0 rounded-l text-[#b9b9b9] hover:bg-gray-200"
            >
                ×
            </button>
            <input
                onChange={(e) => props.onChange(e.target.value, props.index)}
                type="text"
                value={props.value}
                placeholder={props.placeholder}
                className="flex-1 px-3 py-1.5 border border-[#b9b9b9] rounded-r text-sm bg-white"
            />
        </div>
    )
}
