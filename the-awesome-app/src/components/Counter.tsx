"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

// <Counter count={5} />

type CounterProps = {
  count: number;
};

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.count);
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log("count updated", count);
  }, [count]);

  function inc() {
    console.log("incrementing counter...");
    // setCount(count + 1);
    // setCount(count + 1);

    setCount((prevCount) => prevCount + 1);
    //setCount((prevCount) => prevCount + 1);

    //console.log("count", count);
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
