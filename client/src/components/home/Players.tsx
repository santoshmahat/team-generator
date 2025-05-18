import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';
import type { Player } from '../../types';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_MAX_PLAYER, mainConfig } from '../../constants';
import RangeField from '../common/RangeField';
import InputField from '../common/InputField';
import Button from '../common/Button';

const defaultEmptyPlayer = { name: '', skill: 0 };

const Players = () => {
    const [players, setPlayers] = useState<Player[]>(
        Array.from({ length: DEFAULT_MAX_PLAYER }).map(() => (defaultEmptyPlayer))
    );
    const [error, setErrorMessage] = useState('');

    const handleRemove = (index: number) => {
        setPlayers((prev) => prev.filter((_, i) => i !== index));
        const currentPlayer = [...players][index];
        if (currentPlayer.id) {
            removePlayerHandler(currentPlayer.id);
        }
    };

    const handleSkillChange = (skill: number, index: number) => {
        setPlayers((prev) =>
            prev.map((p, i) => (i === index ? { ...p, skill } : p))
        );
        const currentPlayer = [...players][index]
        debounceSaveHandler({ ...currentPlayer, skill: skill }, index)
    };

    const handleAddParticipant = () => {
        setPlayers((prev) => [
            ...prev,
            defaultEmptyPlayer,
        ]);
    };

    const handleNameChange = (value: string, index: number) => {
        setPlayers((prev) => prev.map((player, i) => index === i ? { ...player, name: value } : player));

        const currentPlayer = [...players][index]
        debounceSaveHandler({ ...currentPlayer, name: value }, index)
    }


    const savePlayerHandler = async (player: Player, index: number) => {
        if (!player.name || player.skill < 1) return;
        try {
            let response;
            if (player.id) {
                response = await fetch(`${mainConfig.apiBaseUrl}/players/${player.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: player.name, skill: player.skill }),
                });
            } else {
                response = await fetch(`${mainConfig.apiBaseUrl}/players`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(player),
                });
            }

            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }

            const data = await response.json();

            setPlayers((prevPlayers) =>
                prevPlayers.map((player, i) => (i === index ? data : player))
            );
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    const removePlayerHandler = async (id: number) => {
        try {
            const response = await fetch(`${mainConfig.apiBaseUrl}/players/${id}`, {
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

    const fetchPlayerListHandler = async () => {
        try {
            const response = await fetch(`${mainConfig.apiBaseUrl}/players`);
            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }

            const data = await response.json();

            const filledData = [
                ...data,
                ...Array.from({ length: DEFAULT_MAX_PLAYER - data.length }).map(() => defaultEmptyPlayer)
            ];

            setPlayers(filledData);

        } catch (error) {
            console.error('Submission failed:', error);

        }
    }

    const debounceSaveHandler = useCallback(debounce(savePlayerHandler, 1000), []);

    useEffect(() => {
        fetchPlayerListHandler()
    }, [])


    return (
        <div className='flex-1'>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Players</h2>

            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

            <div className="space-y-2">
                {players.map((player, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <InputField
                            index={index}
                            value={player.name}
                            placeholder={`Player ${index + 1}`}
                            onChange={(value, index) => handleNameChange(value, index)}
                            remove={() => handleRemove(index)}
                        />
                        <RangeField
                            index={index}
                            selectRange={(skill, index) => handleSkillChange(skill, index)}
                            player={players[index]}
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center mt-4">
                <div className="bg-[#b9b9b9] text-white text-sm font-bold px-3 py-1.5 border border-[#b9b9b9] rounded-l">
                    {players.length}
                </div>
                <Button onClick={handleAddParticipant} title='Add Participant' />
            </div>
        </div>
    );
}
export default Players;
