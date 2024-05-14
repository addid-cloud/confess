    import { Pause, Play } from '@phosphor-icons/react/dist/ssr';
    import React, { useState, useEffect } from 'react';

    const AudioPlayer = ({ src }) => {
        const [audio, setAudio] = useState(null);
        const [isPlaying, setIsPlaying] = useState(false);

        useEffect(() => {
        const audioElement = new Audio(src);
        setAudio(audioElement);

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audioElement.addEventListener('ended', handleEnded);

        return () => {
            audioElement.removeEventListener('ended', handleEnded);
        };
        }, [src]);

        const togglePlay = () => {
        if (audio) {
            if (isPlaying) {
            audio.pause();
            } else {
            audio.play();
            }
            setIsPlaying(!isPlaying);
        }
        };

    return (
    <div>
        <button onClick={togglePlay}>
        {isPlaying ? <Pause size={32}/> : <Play size={32}/>}
        </button>
    </div>
    );
    };

    export default AudioPlayer;
