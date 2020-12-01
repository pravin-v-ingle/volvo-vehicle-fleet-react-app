import React, { Component } from "react";
import { toast } from "react-toastify";
import VehiclesTable from "./vehiclesTable";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  deleteVehicle,
  getVehicleByChassisId,
} from "../services/vehicleService";

class FindVehiclesByChassisId extends Component {
  state = {
    vehicles: [],
    currentPage: 1,
    pageSize: 4,
    searchQueryChassisSeries: "",
    searchQueryChassisNumber: "",
    totalCount: 0,
    sortColumn: { path: "color", order: "asc" },
  };

  handleDelete = async (vehicle) => {
    confirmAlert({
      title: `Confirm`,
      message: `Are you sure to delete:${vehicle.chassisId.chassisSeries}${vehicle.chassisId.chassisNumber}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const originalVehicles = this.state.vehicles;
            const vehicles = originalVehicles.filter(
              (m) => m._id !== vehicle._id
            );
            this.setState({ vehicles });

            try {
              await deleteVehicle(vehicle._id);
            } catch (ex) {
              if (ex.response && ex.response.status === 404)
                toast.error("This vehicle has already been deleted.");

              this.setState({ vehicles: originalVehicles });
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  handlePageChange = async (page) => {
    this.setState({ currentPage: page });
  };
  handleReset = () => {
    this.setState({
      searchQueryChassisSeries: "",
      searchQueryChassisNumber: "",
      vehicles: [],
    });
  };

  handleSearchChassisSeries = ({ currentTarget: input }) => {
    this.setState({ searchQueryChassisSeries: input.value, currentPage: 1 });
  };
  handleSearchChassisNumber = ({ currentTarget: input }) => {
    this.setState({ searchQueryChassisNumber: input.value, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = async () => {
    this.setState({ totalCount: 0, vehicles: [] });
    const { searchQueryChassisSeries, searchQueryChassisNumber } = this.state;

    if (!(searchQueryChassisSeries || searchQueryChassisNumber)) {
      toast.error("Please enter at least on input field");
      return;
    } else {

      if(searchQueryChassisNumber){
      let isnum = /^\d+$/.test(searchQueryChassisNumber);
      if(!isnum)
        {
          toast.error("Chassis Number field can have only number values");
        return;
        }
      }
      const vehiclesFound = await getVehicleByChassisId(
        searchQueryChassisSeries,
        searchQueryChassisNumber
      );

      if (vehiclesFound && vehiclesFound.length > 0) {
        this.setState({
          totalCount: vehiclesFound.length,
          vehicles: vehiclesFound,
        });
      } else {
        this.setState({ totalCount: 0, vehicles: [] });
        toast.error("Vehicle not found with provided Chassis Id details");
        return;
      }
    }
  };

  handleKeyEnter = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      await this.getPagedData();
    }
  };

  render() {
    const {
      sortColumn,
      searchQueryChassisSeries,
      searchQueryChassisNumber,
      vehicles,
    } = this.state;

    return (
      <div className="row">
        <div className="col">
        <h6 style={{ color: "blue" }}>Note: Search vehicle to edit/delete</h6>
          <div className="form-group">
            <label htmlFor="">Chassis Series</label>
            <input
              name="chassisSeries"
              id="chassisSeries"
              value={searchQueryChassisSeries}
              className="form-control"
              type="text"
              onKeyPress={this.handleKeyEnter}
              onChange={this.handleSearchChassisSeries}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Chassis Number</label>
            <input
              name="chassisNumber"
              id="chassisNumber"
              value={searchQueryChassisNumber}
              className="form-control"
              type="text"
              onKeyPress={this.handleKeyEnter}
              onChange={this.handleSearchChassisNumber}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              onClick={this.getPagedData}
              
            >
              Search
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={this.handleReset}>
              Reset
            </button>
          </div>
          {vehicles && vehicles.length > 0 && (
            <VehiclesTable
              vehicles={vehicles}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              isEditable={true}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FindVehiclesByChassisId;
