import { useCallback, useEffect, useState } from 'react';
import InputField from './common/InputField';
import type { Team } from '../types';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_MAX_TEAM, mainConfig } from '../constants';
import debounce from 'lodash/debounce';
import Button from './common/Button';

const defaultEmptyTeam = { name: '' }
const Teams = () => {
    const [teams, setTeams] = useState<Team[]>(
        Array.from({ length: 10 }).map(() => (defaultEmptyTeam))
    );
    const [error, setErrorMessage] = useState('');

    const handleRemove = (index: number) => {
        setTeams((prev) => prev.filter((_, i) => i !== index));
        const currentTeam = [...teams][index];
        if (currentTeam.id) {
            removeTeamHandler(currentTeam.id);
        }
    };

    const handleAddTeam = () => {
        setTeams((prev) => [
            ...prev,
            defaultEmptyTeam,
        ]);
    };

    const handleInputChange = (value: string, index: number) => {
        setTeams((prev) => prev.map((team, i) => index === i ? { ...team, name: value } : team));
        const currentTeam = [...teams][index]
        debounceSaveHandler({ ...currentTeam, name: value }, index)
    }

    const saveTeamHandler = async (team: Team, index: number) => {
        if (!team.name) return;
        try {
            let response;
            if (team.id) {
                response = await fetch(`${mainConfig.apiBaseUrl}/teams/${team.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: team.name }),
                });
            } else {
                response = await fetch(`${mainConfig.apiBaseUrl}/teams`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(team),
                });
            }
            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }

            const data = await response.json();

            setTeams((prevTeams) =>
                prevTeams.map((team, i) => (i === index ? data : team))
            );
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    const fetchTeamListHandler = async () => {
        try {
            const response = await fetch(`${mainConfig.apiBaseUrl}/teams`);
            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }

            const data = await response.json();
            const filledData = [
                ...data,
                ...Array.from({ length: DEFAULT_MAX_TEAM - data.length }).map(() => defaultEmptyTeam)
            ];

            setTeams(filledData);
        } catch (error) {
            console.error('Submission failed:', error);

        }
    }


    const removeTeamHandler = async (id: number) => {
        try {
            const response = await fetch(`${mainConfig.apiBaseUrl}/teams/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }
        } catch (error) {
            console.error('Submission failed:', error);
        }
    }

    useEffect(() => {
        fetchTeamListHandler()
    }, [])

    const debounceSaveHandler = useCallback(debounce(saveTeamHandler, 1000), []);


    return (
        <div className='flex-1'>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Teams</h2>
            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

            <div className="space-y-2">
                {teams.map((team, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <InputField
                            index={index}
                            value={team.name}
                            placeholder={`Team ${index + 1}`}
                            onChange={(value, index) => handleInputChange(value, index)}
                            remove={() => handleRemove(index)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center mt-4">
                <div className="bg-[#b9b9b9] text-white text-sm font-bold px-3 py-1.5 border border-[#b9b9b9] rounded-l">
                    {teams.length}
                </div>
                <Button onClick={handleAddTeam} title='Add Team' />
            </div>
        </div>
    );
}
export default Teams;
