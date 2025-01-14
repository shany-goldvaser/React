import { useEffect, useState } from "react";

const useTypingEffect = (text: string, speed: number, delay: number) => {
    const [val, setValue] = useState('');
    let flag = false;
    let index = -1;
    useEffect(() => {
        const timetType=setTimeout(() => {
            const intervalType = setInterval(() => {
                if (index < text.length) {
                    index++;
                    setValue(text.slice(0,index+1)); 
                } else {
                    clearInterval(intervalType); 
                }}, speed);

        }, delay);
        return () =>{ clearTimeout(timetType);
            setValue("");
        }
    }, [text])
    return [val, flag]
}
export default useTypingEffect


