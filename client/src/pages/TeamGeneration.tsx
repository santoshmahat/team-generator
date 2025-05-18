import { useEffect, useRef, useState } from "react";
import GeneratedTeam from "../components/team-generation/GeneratedTeam";
import { useParams } from "react-router-dom";
import { DEFAULT_ERROR_MESSAGE, mainConfig } from "../constants";
import type { GeneratedTeams } from "../types";

export default function TeamGeneration() {
    const hasFetchedRef = useRef(false);
    const { eventId } = useParams();
    const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeams>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setErrorMessage] = useState('');

    const fetchGeneratedTeams = async (eventId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${mainConfig.apiBaseUrl}/event-team-players`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId: Number(eventId) }),
            });
            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }

            const data = await response.json();

            setGeneratedTeams(data);
        } catch (error) {
            console.error('Submission failed:', error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!eventId || hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        fetchGeneratedTeams(eventId);
    }, [eventId]);



    const totalParticipants = generatedTeams?.teams?.reduce((total, team) => {
        return total + team.players.length;
    }, 0);

    const totalTeams = generatedTeams?.teams.length;

    return (
        <div className='p-6'>
            <div className='bg-[#32373d] px-4 py-3 mb-8'>
                <h1 className='text-white font-bold'>{generatedTeams?.title || 'N/A'}</h1>
                <p className='text-[#636466] text-sm'>{totalParticipants} participants in {totalTeams} teams</p>
            </div>

            <div className="mb-8">
                <p>
                    <span className='text-[#636466] font-md'>
                        Share Link {' '}
                    </span>
                    <span className='font-sm text-xs'>(public draw)</span>
                </p>
                <input
                    className="flex-1 px-3 py-1.5 border border-[#b9b9b9] rounded-r text-sm bg-white w-1/2"
                    value={window.location.href}
                />
            </div>

            <div className="flex flex-wrap flex-col space-y-16 sm:flex-row sm:space-x-16 sm:space-y-0 justify-between bg-[#ebebeb] py-6 px-4 mb-8">
                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                {loading && "Loading..."}

                {generatedTeams?.teams?.map((teamObj, teamIndex) => {
                    const totalSkill = teamObj.players.reduce((sum, player) => sum + player.skill, 0);

                    return (
                        <div key={teamIndex} className="flex-1">
                            <p className="mb-2">
                                <span className="font-bold">{teamObj.team} {' '}</span>
                                <span className="text-[#636466] font-xs">
                                    ({teamObj.players.length})
                                </span>
                            </p>
                            <div className="space-y-2">
                                {teamObj.players.map((player, playerIndex) => (
                                    <GeneratedTeam
                                        key={player.id + '-' + playerIndex}
                                        skill={player.skill}
                                        name={player.name}
                                        index={playerIndex + 1}
                                    />
                                ))}
                                <div className="flex justify-between items-center">
                                    <div className="flex-1"></div>
                                    <div className="text-[#b9b9b9] text-md w-8 text-center">
                                        {totalSkill}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
