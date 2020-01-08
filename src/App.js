import React from 'react';
import './App.css';
import IndividualItem from './components/IndividualItem/index';
import axios from 'axios';

class App extends React.Component {

  dataArr = [];
  helperArr = [];

  componentDidMount = () => {
    const newArr = [];
    axios.get('https://gist.githubusercontent.com/bharadwajturlapati/4e81154dbcc7d6928921b96057fc5b4a/raw/d31da32d6e5c1dd2a11968d7e94d3c60dfd50fcb/products.json')
        .then(response => {
          this.setState({ mainData : response.data }, () => {
            const { mainData } = this.state;
            for(let i in response.data){
              this.dataArr.push(i);
              newArr.push(mainData[i]);
             }
             this.helperArr = [...newArr];
             this.setState({ itemArr : [...newArr]});
          });
        });
  }

  state = {
    tab: 'ALL',
    itemArr: [],
    mainData: null,
    cartButton : false,
  }

  itemFilterHandler = (key) => {
    console.info(key);
    switch(key){
      case 'GENERAL': {
        const { itemArr } = this.state;
        if(this.helperArr.length === itemArr.length){
          const tempArr = itemArr.filter(x => x.hub === 'general');
          this.setState({ itemArr: [...tempArr], tab: 'GENERAL' });
        } else {
          this.setState({ itemArr: [...this.helperArr] }, () => {
            const { itemArr } = this.state;
            const tempArr = itemArr.filter(x => x.hub === 'general');
            this.setState({ itemArr: [...tempArr], tab: 'GENERAL' });
          });
        }
        
        break;
      }
      case 'OTHERS': {
        const { itemArr } = this.state;
        if(this.helperArr.length === itemArr.length){
          const { itemArr } = this.state;
          const tempArr = itemArr.filter(x => x.hub !== 'general');
          this.setState({ itemArr: [...tempArr], tab: 'OTHERS' });
        } else {
          this.setState({ itemArr: [...this.helperArr] }, () => {
            const { itemArr } = this.state;
            const tempArr = itemArr.filter(x => x.hub !== 'general');
            this.setState({ itemArr: [...tempArr], tab: 'OTHERS' });
          });
        }
        break;
      }
      case 'ALL': {
        const { itemArr } = this.state;
        this.setState({ itemArr : [...this.helperArr], tab: 'ALL'});
        break;
      }
      default: {
        console.info('Wrong Entry');
        break;
      }
    }
  }

  render(){
    const { tab } = this.state;
    const items = this.state.itemArr.map((x, index) => <IndividualItem keys={x.key} item={x.image} name={x.name} author={x.author} description={x.description}/>);
    return(
      <div>
          <header style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#012323'}}/>
          <div class="main">
            <div className={"buttonHolder"}>
              <button onClick={() => this.itemFilterHandler('ALL')} style={{backgroundColor: tab === 'ALL' ? '#0091cd' : null}} className="sortButtons">ALL</button>
              <div style={{ width: '10%'}} />
              <button onClick={() => this.itemFilterHandler('OTHERS')} style={{ backgroundColor: tab === 'OTHERS' ? '#0091cd' : null}} className="sortButtons">OTHERS</button>
              <div style={{ width: '10%'}} />
              <button onClick={() => this.itemFilterHandler('GENERAL')} style={{ backgroundColor: tab === 'GENERAL' ? '#0091cd' : null}} className="sortButtons">GENERAL</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <div class="right">
                <div class="item-container">{items}</div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}


export default App;
