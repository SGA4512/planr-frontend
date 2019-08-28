import React from 'react'
import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer className="navbar navbar-dark bg-dark">
      <h3><strong>Find us on...</strong></h3>
      <div className="social">
        <a href= "twitter.com"><FontAwesomeIcon className = "twitter" icon={faTwitter}/></a>
        <a href= "facebook.com"><FontAwesomeIcon className = "facebook" icon={faFacebook}/></a>
        <a href= "instagram.com"><FontAwesomeIcon className = "instagram" icon={faInstagram} /></a>
      </div>
      <p>Copyright © 2019, EVENT, USA</p>
    </footer>
  )
}

export default Footer;
