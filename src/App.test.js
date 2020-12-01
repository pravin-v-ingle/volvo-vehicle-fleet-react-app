
import { render, screen , fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import FindVehiclesByChassisId from './components/findVehiclesByChassisId';
import VehicleForm from './components/vehicleForm';

describe('App', () => {
  test('renders message', () => {
    render(<App />);
   
    const linkElement = screen.getByText(/There are no vehicles in the database/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders All Vehicles', () => {
    render(<App />);
 
    expect(screen.getByText(/All Vehicles/)).toBeInTheDocument();
  });

 

  test('renders Insert Vehicle', () => {
    render(<App />);
 
    expect(screen.getByText(/Insert Vehicle/)).toBeInTheDocument();
  });

  test('renders  Find & Edit/Delete Vehicle', () => {
    render(<App />);
 
    expect(screen.getByText(/Delete Vehicle/)).toBeInTheDocument();
  });

  test('renders  FindVehiclesByChassisId 1', () => {
    render(<FindVehiclesByChassisId/>);
    
    expect(screen.getByText(/Chassis Number/)).toBeInTheDocument();
  });
  
  test('renders  FindVehiclesByChassisId 2', () => {
    render(<FindVehiclesByChassisId/>);
    
    expect(screen.getByText(/Chassis Series/)).toBeInTheDocument();
  });

  test('renders  FindVehiclesByChassisId 3', () => {
    render(<FindVehiclesByChassisId/>);
    
    expect(screen.getByText(/Note: Search vehicle to edit/)).toBeInTheDocument();
  });

  test('check if search and reset exists FindVehiclesByChassisId component', () => {
    render(<FindVehiclesByChassisId />);
    
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('VehicleForm button text', () => {
    render(<VehicleForm />);
    screen.debug();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('VehicleForm inputs text', () => {
    render(<VehicleForm/>);
    
    expect(screen.getByText(/Note: All fields are mandatory/)).toBeInTheDocument();
    expect(screen.getByText(/Chassis Series/)).toBeInTheDocument();
    expect(screen.getByText(/Chassis Number/)).toBeInTheDocument();
    expect(screen.getByText(/Type Of Vehicle/)).toBeInTheDocument();
    expect(screen.getByText(/Truck/)).toBeInTheDocument();
    expect(screen.getByText(/Car/)).toBeInTheDocument();
    expect(screen.getByText(/Bus/)).toBeInTheDocument();
    expect(screen.getByText(/No. of Passengers:/)).toBeInTheDocument();
    expect(screen.getByText(/Color/)).toBeInTheDocument();
  });
});