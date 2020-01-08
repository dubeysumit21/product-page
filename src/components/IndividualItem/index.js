import React from 'react';
import './styles.css';
import keys from '../../assets/key.png';

class IndividualItem extends React.Component {
  
    render(){
     return (
      <div className="outerMain">
        <div className="item">
          <div style={{ width: '100%', height: '34%' }}>
            <img className="img" src={this.props.item} alt="unloadedImage"></img>
          </div>
          <div style={{ height: '9%' }}><p class="p1">{this.props.name}</p></div>
          <hr></hr>
          <div style={{ height: '9%' }}><p class='p1'>{this.props.author}</p></div>
          <div style={{ display: 'flex', height: '20%', overflow: 'auto', justifyContent: 'center' }}>
            <p className="sizesAvailable-container">{this.props.description}</p>
          </div>
          <div class="btn" onClick={this.props.clicked1}>
            <img src={keys} alt="unloaded" style={{width: '30px', height: '30px', marginRight: '10px'}}/>
            <p>{this.props.keys}</p>
          </div>
        </div>
      </div>
    )
    }
  }

  export default IndividualItem;