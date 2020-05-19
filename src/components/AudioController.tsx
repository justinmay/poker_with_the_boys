import React, { useState, useEffect } from "react";
import {subscriptionData, SubscriptionPlayer} from '../interfaces';


type AudioControllerProps = { 
  subscriptionData: subscriptionData | undefined,
  me: SubscriptionPlayer | undefined,
}
export default function AudioController(props: AudioControllerProps) {
  // Set up audio
  const [checkPlaying, toggleCheck] = useAudio('/check.mp3');
  const [bellPlaying, toggleBell] = useAudio('/bell.wav');

  if(props.subscriptionData && props.me && props.subscriptionData.action !== undefined && props.subscriptionData.action === props.me.position) {
    if(!bellPlaying) {
      toggleBell();
    }
  }
  return(
    <div></div>
  )
}



export const useAudio = (url: string):[boolean,()=>void] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {console.log("playing sound");setPlaying(!playing)};

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};