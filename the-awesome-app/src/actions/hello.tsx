'use server'

//server action
export async function sayHello(message: string){

    // access the DB, message queue...
    console.log("invoking sayHello: " + message);
    return (
        <div style={{color: 'blue'}}>Hello {message}</div>
    )
}