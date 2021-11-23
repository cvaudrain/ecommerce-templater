
function Footer(props) {
    return (
        <div className="">
        <footer className="br-gradient-aqua centered">
          <p className="md-text">{props.footerText}</p>
          <p>{props.footerSubtext}</p>
          <p>{new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }
  
  export default Footer;