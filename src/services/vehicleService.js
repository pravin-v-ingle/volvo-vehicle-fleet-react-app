import { BYTE,VEHICLE_TYPE} from "../utils/enums";

const vehicles = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    displayId:1,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471818", chassisSeries: "TRCK", chassisNumber: 1234567 },
    type: VEHICLE_TYPE.TRUCK,
    numberOfPassengers: BYTE.TRUCKCAPACITY,
    color: "Red"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    displayId:2,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471818", chassisSeries: "TRCK", chassisNumber: 1234568 },
    type: VEHICLE_TYPE.TRUCK,
    numberOfPassengers: BYTE.TRUCKCAPACITY,
    color: "Red"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    displayId:3,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471820", chassisSeries: "CAR", chassisNumber: 2234561 },
    type: VEHICLE_TYPE.CAR,
    numberOfPassengers: BYTE.CARCAPACITY,
    color: "White"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    displayId:4,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471814", chassisSeries: "BUS", chassisNumber: 3234561 },
    type: VEHICLE_TYPE.BUS,
    numberOfPassengers: BYTE.BUSCAPACITY,
    color: "White"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    displayId:5,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471814", chassisSeries: "BUS", chassisNumber: 3234563 },
    type: VEHICLE_TYPE.BUS,
    numberOfPassengers: BYTE.BUSCAPACITY,
    color: "White"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    displayId:6,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471814", chassisSeries: "BUS", chassisNumber: 3234564 },
    type: VEHICLE_TYPE.BUS,
    numberOfPassengers: BYTE.BUSCAPACITY,
    color: "Grey"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    displayId:7,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471820", chassisSeries: "CAR", chassisNumber: 2234564 },
    type: VEHICLE_TYPE.CAR,
    numberOfPassengers: BYTE.CARCAPACITY,
    color: "Grey"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    displayId:8,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471820", chassisSeries: "CAR", chassisNumber: 2234565 },
    type: VEHICLE_TYPE.CAR,
    numberOfPassengers: BYTE.CARCAPACITY,
    color: "Blue"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    displayId:9,
    chassisId: { _id: "5b21ca3eeb7f6fbccd471818", chassisSeries: "TRCK", chassisNumber: 1234569 },
    type: VEHICLE_TYPE.TRUCK,
    numberOfPassengers: BYTE.TRUCKCAPACITY,
    color: "Blue"
  }
];

export function getVehicles() {
  return vehicles;
}

export function getVehicle(id) {
  return vehicles.find(m => m._id === id);
}

export function getVehicleByChassisId(chassisSeries, chassisNumber) {



  if(chassisSeries.trim()!=="" && chassisNumber.trim()==="")
  {
    return vehicles.filter(m => m.chassisId.chassisSeries.trim().toLowerCase() === chassisSeries.trim().toLowerCase()); 

  }
  else if(chassisSeries.trim()==="" && chassisNumber.trim()!=="")
  {
    const chassisNumberParsed = parseInt(chassisNumber.trim(),10);
   
    return vehicles.filter(m =>  m.chassisId.chassisNumber === chassisNumberParsed); 
  }
  else if(chassisSeries.trim()!=="" && chassisNumber.trim()!=="")
  {
    const chassisNumberParsed = parseInt(chassisNumber.trim(),10);
    return  vehicles.filter(m => m.chassisId.chassisSeries.trim().toLowerCase() === chassisSeries.trim().toLowerCase()
    && m.chassisId.chassisNumber === chassisNumberParsed); 
  }
 
  return null;
}

export function getVehicleByChassisIdByObj(chassisIdObj) {
  return vehicles.find(m => m.chassisId.chassisSeries === chassisIdObj.chassisSeries.trim() && m.chassisId.chassisNumber === chassisIdObj.chassisNumber.trim());
}

export function saveVehicle(vehicle) {
  let vehiclesInDb = vehicles.find(m => m._id === vehicle._id) || {};
 
  vehiclesInDb.chassisId = { _id: Date.now(), chassisSeries: vehicle.chassisSeries.trim(), chassisNumber: parseInt(vehicle.chassisNumber,10) };
  vehiclesInDb.type = vehicle.type;
  vehiclesInDb.color = vehicle.color;
  
  if(vehicle.type === VEHICLE_TYPE.TRUCK)
  vehiclesInDb.numberOfPassengers = BYTE.TRUCKCAPACITY;
  else if(vehicle.type === VEHICLE_TYPE.CAR)
  vehiclesInDb.numberOfPassengers = BYTE.CARCAPACITY;
  else if(vehicle.type === VEHICLE_TYPE.BUS)
  vehiclesInDb.numberOfPassengers = BYTE.BUSCAPACITY;

  if (!vehiclesInDb._id) {
    vehiclesInDb._id = Date.now()+"c"+vehiclesInDb.type;
    vehiclesInDb.displayId = vehicles.length+1;

    vehicles.push(vehiclesInDb);
  }

  return vehiclesInDb;
}

export function deleteVehicle(id) {
  let vehiclesInDb = vehicles.find(m => m._id === id);
  vehicles.splice(vehicles.indexOf(vehiclesInDb), 1);
  return vehiclesInDb;
}
