    import { Pause, Play } from '@phosphor-icons/react/dist/ssr';
import React, { useState, useEffect } from 'react';

    const AudioPlayer = ({ src }) => {
    const [audio] = useState(new Audio(src));
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    setIsPlaying(!isPlaying);
    };

    useEffect(() => {
    const handleEnded = () => {
        setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
        audio.removeEventListener('ended', handleEnded);
    };
    }, [audio]);

    return (
    <div>
        <button onClick={togglePlay}>
        {isPlaying ? <Pause size={32}/> : <Play size={32}/>}
        </button>
    </div>
    );
    };

    export default AudioPlayer;
