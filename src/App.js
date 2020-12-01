import React, { Component } from "react";
import { Route, Redirect, Switch, BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";


import NotFound from "./components/notFound";
import NavBar from "./components/navBar";


import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Vehicles from './components/vehicles';
import VehicleForm from './components/vehicleForm';
import FindVehiclesByChassisId from './components/findVehiclesByChassisId';

class App extends Component {
  state = {};

  componentDidMount() {
   
  }

  render() {
    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar  />
        <main className="container">
          <Switch>
            
            <Route path="/vehicles/:id" component={VehicleForm} />
            <Route
              path="/vehicles"
              render={props => <Vehicles {...props}  />}
            />
            <Route
              path="/findVehiclesByChassisId"
              render={props => <FindVehiclesByChassisId {...props}  />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/vehicles" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
