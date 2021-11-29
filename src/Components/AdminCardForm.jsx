
export default function AdminCardForm(props){

return(
    <div className="top-space-sm content-card  black-border-sm padding-sm indigo-gradient">
     <p className="md-text ">Card #{props.cardNum} </p>
    <div className=" template-section">
   
    </div>
<p className="white md-text rm-mg-row pt-sans-font">Title</p>
<input className="sm-text black-border-sm" onChange={props.handleForm} id={`card${props.cardNum}Title`} type="text" placeholder={`card ${props.cardNum} title`} value={props.initTitleValue} />
    <p className="white md-text rm-mg-row pt-sans-font">Description</p>
    <input className="sm-text  black-border-sm" onChange={props.handleForm} id={`card${props.cardNum}Text`} type="text" placeholder={`card ${props.cardNum} description`} value={props.initTextValue} />
    <p className="white md-text rm-mg-row pt-sans-font">Price</p>
    <input className="sm-text  black-border-sm" onChange={props.handleForm} id={`card${props.cardNum}Price`} type="number" placeholder={`card ${props.cardNum} price (required)`} value={props.initPriceValue} />
    </div>
)
}