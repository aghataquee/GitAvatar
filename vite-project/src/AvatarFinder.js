import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce'; // Custom hook for debouncing

function AvatarFinder() {
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const debouncedUsername = useDebounce(username, 500); // 500ms debounce delay

    useEffect(() => {
        if (debouncedUsername) {
            fetch(`https://api.github.com/users/${debouncedUsername}`)
                .then(response => response.json())
                .then(data => {
                    if (data.avatar_url) {
                        setAvatarUrl(data.avatar_url);
                    } else {
                        setAvatarUrl('');
                    }
                })
                .catch(error => {
                    console.error('Error fetching avatar:', error);
                    setAvatarUrl('');
                });
        } else {
            setAvatarUrl('');
        }
    }, [debouncedUsername]);

    return (
        <div>
            <input 
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {avatarUrl && <img src={avatarUrl} alt={`${debouncedUsername}'s avatar`} />}
        </div>
    );
}

export default AvatarFinder;
