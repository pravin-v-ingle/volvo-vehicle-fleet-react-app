import React, { Component } from "react";
import { toast } from "react-toastify";
import VehiclesTable from "./vehiclesTable";
import Pagination from "./common/pagination";
import { getVehicles, deleteVehicle } from "../services/vehicleService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Vehicles extends Component {
  state = {
    vehicles: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "displayId", order: "desc" },
  };

  async componentDidMount() {
    const vehicles = await getVehicles();
    this.setState({ vehicles });
  }

  handleDelete = async (vehicle) => {
    const originalVehicles = this.state.vehicles;
    const vehicles = originalVehicles.filter((m) => m._id !== vehicle._id);
    this.setState({ vehicles });

    try {
      await deleteVehicle(vehicle._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This vehicle has already been deleted.");

      this.setState({ vehicles: originalVehicles });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      vehicles: allVehicles,
    } = this.state;

    let filtered = allVehicles;
    if (searchQuery)
      filtered = allVehicles.filter((m) =>
        m.color.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const vehicles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: vehicles };
  };

  render() {
    const { length: count } = this.state.vehicles;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no vehicles in the database.</p>;

    const { totalCount, data: vehicles } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          <p>Showing {totalCount} vehicles in the database.</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="search by color...for e.g., blue"
          />
          <VehiclesTable
            vehicles={vehicles}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            isEditable={false}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Vehicles;
