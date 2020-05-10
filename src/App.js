import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  state = {
    prod: false
  }
  render() {
    return (
      <div>
        <Layout>
          {/* <Switch>
            <Route path='/checkout' render={() => <CheckOut prod={this.state.prod} />} />
            <Route path='/' exact render={() => <BurgerBuilder prod={this.state.prod} />} />
          </Switch> */}
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/checkout' component={CheckOut} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
          {/* <BurgerBuilder prod={this.state.prod}></BurgerBuilder>
          <CheckOut></CheckOut> */}
        </Layout>
      </div>
    );
  }
}

export default App;
