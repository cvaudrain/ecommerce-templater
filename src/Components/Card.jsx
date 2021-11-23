
function Card(props) {
    return (
      <div className="content-card theGoodShading cloud-gradient">
    
          <div className="centered magenta-gradient">

          </div>
          <div className="cloud-gradient">
          <div className="peach-gradient">
          <p className="header-text glowtext">{props.amount}</p>
          </div>
             
              <p className="md-text black">{props.description}</p>
          </div>
          
         
         
       
      </div>
    );
  }
  
  export default Card;