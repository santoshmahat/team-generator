import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ERROR_MESSAGE, mainConfig } from "../../constants";
import Button from "../common/Button";

const Events = () => {
    const [title, setTitle] = useState('');
    const [error, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (value: string) => {
        setTitle(value)
    }

    const createEventHandler = async (title: string) => {
        if (!title) return;
        try {
            const response = await fetch(`${mainConfig.apiBaseUrl}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                setErrorMessage(DEFAULT_ERROR_MESSAGE)
                return;
            }

            const data = await response.json();
            navigate(`/team-generation/${data.id}`);
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    return (
        <div className='flex-1'>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Event</h2>
            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

            <div className="flex flex-col space-y-4">
                <input
                    className="flex-1 px-3 py-1.5 border border-[#b9b9b9] rounded-r text-sm bg-white"
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter event name"
                />

                <Button onClick={() => createEventHandler(title)} title='Generate Teams' />
            </div>
        </div>
    )
}
export default Events;
