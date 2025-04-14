import React, { useState, useEffect} from "react";

function Clock(){

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setTime(new Date()), 1000
        })
    }
    )

    function formatTime(){
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let amPm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;

        return `${h}:${padZero(m)}:${padZero(s)} ${amPm}`

    }
    function padZero(num){
        return (num<10 ? "0" : "") + num;
    }

    return(<>
    <h3>{formatTime()}</h3>
    </>);
}
export default Clock