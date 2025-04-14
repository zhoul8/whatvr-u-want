
function Stuff(props){

    return(
        <div className='myCard'>
            <img className="cardPic" src="https://placehold.co/100x100"></img>
            <h3>{props.name}</h3>
            <p>{props.title}</p>
        </div>
    );
}

Stuff.defaultProps = {
    name: "idiot name",
    title: "idiot professionality level"
}

export default Stuff