import React from 'react';
import star from '../../assets/star.png';

class Star extends React.Component {
    render(){
        return(
            <img src={star} alt="unloaded" style={{width: '30px', height: '30px', marginRight: '10px'}}/>
        );
    }
}

export default Star;