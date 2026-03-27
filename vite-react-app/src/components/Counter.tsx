"use client";

import { type ChangeEvent, useEffect, useEffectEvent, useRef, useState } from "react";

// <Counter count={5} />

type CounterProps = {
  count: number;
};

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.count);
  const inputRef = useRef<HTMLInputElement>(null)
  const clickCount = useRef(0);

  useEffect(() => {
    console.log("count updated", count);
  }, [count]);

  const logHandler = useEffectEvent(() => {
    console.log("count", count);
  })

   useEffect(() => {

      const handler = setInterval(() => {
        logHandler();
      }, 15000)

      return () => {
        clearInterval(handler);
      }

  }, []);

  function inc() {
    console.log("incrementing counter...");
    // setCount(count + 1);
    // setCount(count + 1);

    setCount((prevCount) => prevCount + 1);
    //setCount((prevCount) => prevCount + 1);
    clickCount.current++;
    console.log("clickCount", clickCount.current);
    
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>){

    setCount(evt.target.valueAsNumber)
  }

  return (
    <div>
      <h4>Count : {count}</h4>
      <div>
        <button onClick={inc}>++</button> &nbsp;
        <button onClick={() => setCount(count - 1)}>--</button>
      </div>
      <br />  
      <div>
        <input type="number" value={count}  onChange={handleChange}/>
      </div>
      <div>
        <input ref={inputRef} type="number" placeholder="Enter the new count" />&nbsp;
        <button onClick={() => setCount(inputRef.current?.valueAsNumber || 0)}>Update Count</button>
      </div>
    </div>
  );
}
