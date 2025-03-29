export interface MultiResponseI {
    status: number;
    data?: TravelResponseI[];
  }

  export interface ResponseI {
    status: number;
    data?: TravelResponseI;
  }



export interface TravelResponseI {
    id: string;
    source: string;
    destination: string;
    departure_time: Date;
    arrival_time: Date;
    status: string;
}

export default interface TableData {
  id: string;
  source: string; 
  destination: string;
  departureTime: Date; 
  arrivalTime: Date;
  status: string;
}
