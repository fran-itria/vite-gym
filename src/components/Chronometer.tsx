import { useEffect, useState } from "react";

export default function Chronometer() {
  const [play, setPlay] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  useEffect(() => {
    const time = setInterval(() => {
      let second: number = 0;
      setSeconds((seconds) => {
        second = seconds;
        return seconds + 1;
      });
      setMinutes((minutes) => Math.floor(minutes + ((second % 60) + 1) / 60));
      setHours((hours) => Math.floor(hours + ((second % 3600) + 1) / 3600));
    }, 10);
    if (!play) clearInterval(time);
    return () => clearInterval(time);
  }, [play]);
  return (
    <>
      <p>
        {hours < 10 ? ` 0${hours}` : ` ${hours % 60}`}h :
        {minutes < 10 ? ` 0${minutes}` : ` ${minutes % 60}`}m :
        {seconds < 10 ? ` 0${seconds}` : ` ${seconds % 60}`}s
      </p>
      <button onClick={() => setPlay(true)}>Play</button>
      <button onClick={() => setPlay(false)}>Pause</button>
      <button onClick={() => reset()}>Reset</button>
    </>
  );
}
