import type { Player } from '../../types';

interface RangeFieldProps {
    index: number;
    selectRange:(skill: number, index: number) => void;
    player: Player;
}

export default function RangeField(props: RangeFieldProps) {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((skill) => (
                <button
                    key={skill}
                    onClick={() => props.selectRange(skill, props.index)}
                    className={`w-8 h-8 text-sm hover:bg-[#f55a40] ${skill <= props.player.skill ? 'bg-[#f55a40] font-bold' : 'bg-white'
                        }`}
                >
                    {skill}
                </button>
            ))}
        </div>
    )
}
