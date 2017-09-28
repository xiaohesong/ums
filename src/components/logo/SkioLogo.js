import {Link} from 'react-router-dom';
import React from 'react';

const SkioLogo = () => {
  return(
    <Link to='/' className="skio-logo-link"><img src="skio-logo.png" alt="主页" /></Link>
  )
}

export default SkioLogo
