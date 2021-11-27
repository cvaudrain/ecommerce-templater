
export default function AdminCardForm(props){

return(
    <div className="top-space-sm">
     <p className="md-text ">Card #{props.cardNum} </p>
    <div className=" template-section">
   
    </div>
<input onChange={props.handleForm} id={`card${props.cardNum}Title`} type="text" placeholder={`card ${props.cardNum} title`} />
    <input onChange={props.handleForm} id={`card${props.cardNum}Text`} type="text" placeholder={`card ${props.cardNum} description`} />
    <input onChange={props.handleForm} id={`card${props.cardNum}Price`} type="number" placeholder={`card ${props.cardNum} price (required)`} />
    </div>
)
}