import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";


class VehiclesTable extends Component {
  columns = [
    {
      path: "displayId",
      label: "Id"
    },
    {
      path: "chassisId",
      label: "Chassis Id",
      content: vehicle => <label >{`${vehicle.chassisId.chassisSeries}${vehicle.chassisId.chassisNumber}`}</label>
    },
    { path: "type", label: "Type" },
    { path: "numberOfPassengers", label: "No. of Passengers" },
    { path: "color", label: "Color" },
   
  ];

  deleteColumn = {
    key: "delete",
    content: vehicle => (
      <button
        onClick={() => this.props.onDelete(vehicle)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  editColumn = {
    key: "edit",
    content: vehicle => (
      <Link
      to={`/vehicles/${vehicle._id}`}
        className="btn btn-primary btn-sm"
      >
        Edit
      </Link>
    )
  };

  

  constructor(props) {
    super(props);
    if(props.isEditable){
      this.columns.push(this.editColumn);
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { vehicles, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={vehicles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default VehiclesTable;
