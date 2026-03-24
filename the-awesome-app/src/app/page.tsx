import Counter from "@/components/Counter";
import Hello from "@/components/Hello";
//import Hello from '../components/Hello';
export default function Home() {
  return (
    <div>
        <h2>React Next.js Application</h2>
        <Hello message="Hello" color="blue"/>
        {/* <Hello message="Hello Next.js" color="red"/> */}

        <Counter count={5}/>
        {/* <Counter count={12}/> */}
        
    </div>
  );
}
