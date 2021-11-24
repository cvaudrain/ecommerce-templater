import {useNavigate} from "react-router-dom"
import axios from "axios"
function Card(props) {
const navigate = useNavigate()
    function stripeInit(ev){
        let amount = ev.target.id
        console.log(amount) //in USD, convert to cnets for stripe on server side
        
    let payloadValue = {
        item:props.title,
        price:amount,
        note:"pymt session init via function call from <Card /> Component"
    }
    console.log(payloadValue)
    axios.post("/api/stripesession",payloadValue)
    .then((res)=>{
        console.log(res.data)
        //  navigate(res.data.url,{replace:true}) //replaces useHistory() in react-router 6.0 and up
         window.location = res.data.url
    })
    .catch((err)=>console.log(err))
    }

    return (
        // contains column classes to insert accordingly into container/row
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
      <div className="content-card theGoodShading cloud-gradient">
    
          <div className="centered ">

          </div>
          <div className="cloud-gradient">
          <div className="magenta-gradient">
          <p className="header-text glowtext">{props.title}</p>
          </div>
             
              <p className="md-text black">{props.description}</p>
              <button id={props.price} onClick={stripeInit} className="save-btn br-gradient-aqua pointer" >Donate</button>
          </div>
          
         
         
       
      </div>
      </div>
    );
  }

  
  export default Card;