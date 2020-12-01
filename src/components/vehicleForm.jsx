import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import {
  getVehicle,
  saveVehicle,
  getVehicleByChassisId,
} from "../services/vehicleService";
import { BYTE, VEHICLE_TYPE } from "../utils/enums";

class VehicleForm extends Form {
  state = {
    data: {
      chassisSeries: "",
      chassisNumber: "",
      type: "",
      color: "",
      numberOfPassengers: null,
      displayId: null,
    },
    types: [],
    errors: {},
    isEdit: false,
  };

  schema = {
    _id: Joi.string(),
    chassisSeries: Joi.string().required().label("Chassis Series"),
    chassisNumber: Joi.number().integer()
      .required()
      .min(0)
      .max(4294967295)
      .label("Chassis Number"),
    type: Joi.string().required().label("Type Of Vehicle"),
    color: Joi.string().required().label("Color"),
    numberOfPassengers: Joi.number().optional().allow(null),
    displayId: Joi.number().optional().allow(null),
  };

  async populateVehicle() {
    try {
      const vehicleId = this.props.match.params.id;
      if (vehicleId === "new") return;

      const vehicle = await getVehicle(vehicleId);

      this.setState({ data: this.mapToViewModel(vehicle), isEdit: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
   this.setTypes();
    await this.populateVehicle();
  }
setTypes=()=>{
  const types = [
    { _id: VEHICLE_TYPE.TRUCK, name: VEHICLE_TYPE.TRUCK },
    { _id: VEHICLE_TYPE.CAR, name: VEHICLE_TYPE.CAR },
    { _id: VEHICLE_TYPE.BUS, name: VEHICLE_TYPE.BUS },
  ];

  this.setState({ types });
}
  handleReset = (e) => {
    e.preventDefault(); 
    if(!this.state.isEdit){
      this.setState({
        data: {
          chassisSeries: "",
          chassisNumber: "",
          type: "",
          color: "",
          numberOfPassengers: null,
          displayId: null,
        },
        types: [],
        errors: {},
      });
      this.setTypes();
    }
    else
    {
        const {data}= this.state;
        data.color="";
        this.setState({data});
    }
    
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    if (input.name === "type") {
      let numberOfPassengers = null;
      if (input.name === "type" && input.value === VEHICLE_TYPE.TRUCK)
        numberOfPassengers = BYTE.TRUCKCAPACITY;
      else if (input.name === "type" && input.value === VEHICLE_TYPE.CAR)
        numberOfPassengers = BYTE.CARCAPACITY;
      else if (input.name === "type" && input.value === VEHICLE_TYPE.BUS)
        numberOfPassengers = BYTE.BUSCAPACITY;
      data["numberOfPassengers"] = numberOfPassengers;
    }

    this.setState({ data, errors });
  };
  mapToViewModel(vehicle) {
    return {
      _id: vehicle._id,
      chassisSeries: vehicle.chassisId.chassisSeries,
      chassisNumber: vehicle.chassisId.chassisNumber,
      type: vehicle.type,
      color: vehicle.color,
      numberOfPassengers: vehicle.numberOfPassengers,
      displayId: vehicle.displayId,
    };
  }

  doSubmit = async () => {
    try {
      if (!this.state.isEdit) {
        const { chassisSeries, chassisNumber } = this.state.data;
        const vehiclesFound = await getVehicleByChassisId(
          chassisSeries,
          chassisNumber
        );

        if (vehiclesFound && vehiclesFound.length > 0) {
          toast.error("Vehicle already exists with Chassis Id provided!");
          return;
        }
      }

      const saveDataObj = await saveVehicle(this.state.data);
      if (saveDataObj != null) {
        if(this.state.isEdit)
        toast.success("Vehicle details are saved");
        else{
          toast.success(
            `Vehicle with Chassis Id:${saveDataObj.chassisId.chassisSeries}${saveDataObj.chassisId.chassisNumber} added successfully`
          );
          this.props.history.push("/vehicles");
        }
      }
    } catch (ex) {
      toast.error("Erorr while saving vehicle details");
    }
  };

  render() {
    return (
      <div>
        <h1>Vehicle Form</h1>
        <h6 style={{ color: "red" }}>Note: All fields are mandatory</h6>
        <form onSubmit={this.handleSubmit} >
          {this.renderInput(
            "chassisSeries",
            "Chassis Series",
            this.state.isEdit
          )}
          {this.renderInput(
            "chassisNumber",
            "Chassis Number",
            this.state.isEdit
          )}
          {this.renderSelect(
            "type",
            "Type Of Vehicle",
            this.state.types,
            this.state.isEdit
          )}
          {
            <label>
              No. of Passengers:&nbsp;{this.state.data.numberOfPassengers}
            </label>
          }
          {this.renderInput("color", "Color")}
          {this.renderButton("Save")} &nbsp;
          <button className="btn btn-danger" onClick={this.handleReset}>
              Reset
            </button>
        </form>
      </div>
    );
  }
}

export default VehicleForm;
