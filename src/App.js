import React from 'react';
import './App.css';
import IndividualItem from './components/IndividualItem/index';
import axios from 'axios';

class App extends React.Component {

  dataArr = [];
  helperArr = [];

  componentDidMount = () => {
    const newArr = [];
    axios.get('http://starlord.hackerearth.com/TopRamen')
        .then(response => {
          console.info('response', response);
          this.setState({ mainData : response.data }, () => {
            const { mainData } = this.state;
            for(let i in response.data){
              this.dataArr.push(i);
              newArr.push(mainData[i]);
             }
             this.helperArr = [...newArr];
             this.setState({ itemArr : [...newArr]}, () => this.manipulateData());
          });
        });
  }

  state = {
    tab: 'ALL',
    itemArr: [],
    mainData: null,
    cartButton : false,
    yearArray : null,
    countryArray: null,
  }

  manipulateData = () => {
    const { itemArr } = this.state;
    // for(let i=0; i< itemArr.length; i++){
    //   itemArr
    // }
    const tempArr = itemArr.map(im  => {
      return {
        ...im,
        year: im['Top Ten'].split(' ')[0],
        rank: im['Top Ten'].split(' ')[1] && im['Top Ten'].split(' ')[1].substring(1,3),
      };
    });
    this.helperArr = [...tempArr];
    this.setState({ itemArr: [...tempArr] }, () => {
      this.setYearList();
      this.setCountryList();
    });

  }

  setYearList = () => {
    const array = [...this.state.itemArr];
    const outputArray = [];
    var count = 0;
    var start = false; 
    for (let j = 0; j < array.length; j++) { 
      for (let k = 0; k < outputArray.length; k++) { 
          if ( array[j].year === outputArray[k].year ) { 
              start = true; 
          } 
      } 
      count++; 
      if (count === 1 && start === false) { 
          outputArray.push(array[j]); 
      } 
      start = false; 
      count = 0; 
  }
  const sortedArray = outputArray.sort((a, b) => Number(a) - Number(b));
  this.setState({ yearArray: sortedArray});
  }

  setCountryList = () => {
    const array = [...this.state.itemArr];
    const outputArray = [];
    var count = 0;
    var start = false; 
    for (let j = 0; j < array.length; j++) { 
      for (let k = 0; k < outputArray.length; k++) { 
          if ( array[j].Country === outputArray[k].Country ) { 
              start = true; 
          } 
      } 
      count++; 
      if (count === 1 && start === false) { 
          outputArray.push(array[j]); 
      } 
      start = false; 
      count = 0; 
  }
  const sortedArray = outputArray.sort((a, b) => Number(a) - Number(b));
  this.setState({ countryArray: sortedArray});
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

  sortHandler = year => {
    const { itemArr } = this.state;
    if(this.helperArr.length === itemArr.length){
      const tempArray = itemArr.filter(im => im.year === year);
      const sortedArray = tempArray.sort((a, b) => Number(a.rank)-Number(b.rank));
      this.setState({itemArr: [...sortedArray]});
    } else {
      this.setState({ itemArr: [...this.helperArr]}, () => {
        const { itemArr } = this.state;
        const tempArray = itemArr.filter(im => im.year === year);
        const sortedArray = tempArray.sort((a, b) => Number(a.rank)-Number(b.rank));
        this.setState({itemArr: [...sortedArray]});
      })
    }
  }

  countrySelectorHandler = e => {
    const { itemArr } = this.state;
    if(this.helperArr.length === itemArr.length){
      const tempArray = itemArr && itemArr.filter(im => im.Country === e.target.value);
      this.setState({itemArr: [...tempArray]});
    } else {
      this.setState({ itemArr: [...this.helperArr]}, () => {
        const { itemArr } = this.state;
        const tempArray = itemArr && itemArr.filter(im => im.Country === e.target.value);
        this.setState({itemArr: [...tempArray]});
      })
    }
  } 
    

  render(){
    const { tab, yearArray, countryArray } = this.state;
    const items = this.state.itemArr.map((x, index) => <IndividualItem year={x.year} rank={x.rank} starRating={x.Stars} style={x.Style} keys={x.key} item={x.image} name={x.Brand} author={x.Country} description={x.Variety}/>);
    const yearList = yearArray && yearArray.map(ya => 
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => this.sortHandler(ya.year)} style={{ backgroundColor: tab === 'GENERAL' ? '#0091cd' : null}} className="sortButtons">{ya.year}</button>
    </div>);
    return(
      <div>
          <header style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#012323'}}/>
          <div class="main">
            <div className={"buttonHolder"}>
              <h6>Sort by Ranking in the Year: </h6>
              {yearList}
            </div>
            <div className={"buttonHolder"}>
              <h6>Sort by Country: </h6>
              <select onChange={(e) => this.countrySelectorHandler(e)} style={{ height: '30px', width: '50%', marginLeft: '20px' }}>
                {countryArray && countryArray.map(ca => <option>{ca.Country}</option>)}
              </select>
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
