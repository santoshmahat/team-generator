interface GenerateTeamProps {
    skill: number
    name: string;
    index: number;
}

export default function GeneratedTeam(props: GenerateTeamProps) {
    return (
        <div className="flex flex-1 space-y-2">
            <button
                className="px-3 bg-gray-200 border border-[#b9b9b9] border-r-0 rounded-l text-[#b9b9b9]"
            >
                {props.index}
            </button>
            <input
                type="text"
                value={props.name}
                className="flex-1 px-3 py-1.5 border border-[#b9b9b9] rounded-r text-sm bg-white"
                readOnly
            />
            <button
                className={`ml-2 w-8 h-8 text-sm text-white bg-[#f55a40] font-bold`}
            >
                {props.skill}
            </button>
        </div>
    )
}