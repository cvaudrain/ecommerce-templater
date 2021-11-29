
function Footer(props) {
    return (
        <div className={props.footerColor}>
        <footer className=" centered top-space">
          <p className="md-text">{props.footerText}</p>
          <p>{props.footerSubtext}</p>
          <p>{new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }
  
  export default Footer;