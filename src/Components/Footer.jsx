
function Footer(props) {
    return (
        <div className={props.footerColor}>
        <footer className=" centered">
          <p className="md-text">{props.footerText}</p>
          <p>{props.footerSubtext}</p>
          <p>{new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }
  
  export default Footer;