interface ButtonProps {
    onClick: () => void;
    title: string;
}

export default function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className="bg-[#878787] text-white text-sm font-semibold px-4 py-1.5 rounded-r hover:bg-gray-600"
        >
            {props.title}
        </button>
    )
}
