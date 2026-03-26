export const revalidate = 60;

//import { headers } from "next/headers";

export default async function About(){

    //simulate a delay of 3 secs
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("rendering about...");

    // const contentTypeHeader = (await headers()).get("Content-Type");
    // console.log("contentTypeHeader", contentTypeHeader)

    return(
        <div className="alert alert-info">
            <h4>Next.js Training Application</h4>
            <p>Application to demonstrate the features of React and Next.js</p>
        </div>
    )
}

//export const dynamic = 'force-dynamic';