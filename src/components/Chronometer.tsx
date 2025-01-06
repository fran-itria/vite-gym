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
    }, 1000);
    if (!play) clearInterval(time);
    return () => clearInterval(time);
  }, [play]);
  return (
    <div className="
        w-1/4 
        flex 
        flex-col
        items-center 
        ll:w-full 
        mt-3
        bg-gray-300 
        dark:bg-gray-950 
        rounded 
        p-2 
        border-2 
        border-gray-950
     ">
      <p className="font-bold text-xl dark:text-white text-gray-800">
        {hours < 10 ? ` 0${hours}` : ` ${hours % 60}`}h :
        {minutes < 10 ? ` 0${minutes}` : ` ${minutes % 60}`}m :
        {seconds < 10 ? ` 0${seconds}` : ` ${seconds % 60}`}s
      </p>
      <div className="w-full flex justify-around mt-3">
        <button onClick={() => reset()} className="buttonCancel w-24 h-7">Resetear</button>
        <button onClick={() => setPlay(true)} className="buttonConfirm w-24 h-7">Iniciar</button>
        <button onClick={() => setPlay(false)} className="button w-24 h-7">Pausar</button>
      </div>
    </div>
  );
}
