import React from 'react'
import Header from "../Components/Myheader/Header";
import Pastrideslist from "../Components/Googlemaps/PastridesList"
const Pastride = () => {
    return (
      <div>
        <Header location="pastride" />
        
        <Pastrideslist/>
      </div>
    );
}

export default Pastride
