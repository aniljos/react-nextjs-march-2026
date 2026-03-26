export default async function About(){

    //simulate a delay of 3 secs
    await new Promise(resolve => setTimeout(resolve, 3000));
    return(
        <div className="alert alert-info">
            <h4>Next.js Training Application</h4>
            <p>Application to demonstrate the features of React and Next.js</p>
        </div>
    )
}