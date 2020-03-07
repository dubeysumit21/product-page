import React from 'react';
import './styles.css';
import star from '../../assets/star.png';

class IndividualItem extends React.Component {
  
    render(){
     const { starRating } = this.props;
     const tempArr=[];
     for(let i=0; i<starRating; i++){
        tempArr.push(i);
      } 
     let starValue = tempArr.map(st => <div><img src={star} alt="unloaded" style={{width: '30px', height: '30px', marginRight: '10px'}}/></div>);
     if(tempArr.length === 0){
       starValue = 
       <div>
         <p style={{ marginTop: '6px', fontSize: '20px'}}>No Rating Found</p>;
       </div>
     }
     return (
      <div className="outerMain">
        <div className="item">
          {/* <div style={{ width: '100%', height: '34%' }}>
            <img className="img" src={this.props.item} alt="unloadedImage"></img>
          </div> */}
          <div style={{ height: '12%', backgroundColor: '#7c0303', width: '100%' }}><p class="p1" style={{ marginTop: '12px', color: 'white' }}>{this.props.name.toUpperCase()}</p></div>
          <hr></hr>
          <div style={{ height: '20%', backgroundColor: '#ce282815', width: '90%', border: '1px solid #ce282820', borderRadius: '5px' }}><p class='p1' style={{ marginTop: '28px'}}>{this.props.author}</p></div>
          <div style={{ width: '90%', display: 'flex', height: '20%', justifyContent: 'center', backgroundColor: '#ce282805', marginTop: '20px', border: '1px solid #ce282820', borderRadius: '5px' }}>
            <p className="sizesAvailable-container" style={{ marginTop: '20px'}}>{this.props.description}</p>
          </div>
          <div style={{ display: 'flex', height: '20%', overflow: 'auto', justifyContent: 'space-around', width: '90%', backgroundColor: '#ce282805', border: '1px solid #ce282820', borderRadius: '5px',  marginTop: '20px', marginBottom: '20px' }}>
            <p className="sizesAvailable-container" style={{ marginTop: '23px' }}>{this.props.style}</p>
            <p className="sizesAvailable-container" style={{ marginTop: '23px' }}>{this.props.year}</p>
            <p className="sizesAvailable-container" style={{ marginTop: '23px' }}>{this.props.rank}</p>
          </div>
          <div style={{ display: 'flex', height: '20%', justifyContent: 'center' }} onClick={this.props.clicked1}>
            {starValue}
            <p>{this.props.keys}</p>
          </div>
        </div>
      </div>
    )
    }
  }

  export default IndividualItem;