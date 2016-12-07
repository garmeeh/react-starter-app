import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {

  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };

  }

  addFish(fish) {

    const fishes = {...this.state.fishes};

    const timestamp = Date.now();

    fishes[`fish-${timestamp}`] = fish;

    // es6 below = this.setState({ fishes:fishes });
    this.setState({ fishes });
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key){
    // copy of current state
    const order = { ...this.state.order };
    // update order or add new
    order[key] = order[key] + 1 || 1;
    this.setState({ order });

  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seefood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={ key }
                  index={ key }
                  details={ this.state.fishes[key] }
                  addToOrder={ this.addToOrder } />)
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={ this.addFish }
          loadSamples={ this.loadSamples } />
      </div>
    )
  }
}

export default App;
