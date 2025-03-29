
"use client"
import Table from "@/src/component/table";
import TableData, { TravelResponseI } from "@/src/services/interfaces";
import { findTravels } from "@/src/services/travels";
import { ThemeProvider } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { updateTravels } from "@/src/redux/slices/travelSlice";


export default function Home() {

  const [travels, setTravels] = useState<TableData[]>();
  const travelsList = useSelector(
    (state: RootState) => state.counter.travels
  );
  const dispatch = useDispatch();

  function prepareTableData(travels: TravelResponseI[]): TableData[] {
    const result: TableData[] = [];
    for (const it of travels) {
      const travel: TableData = {
        id: it.id,
        source: it.source,
        destination: it.destination,
        departureTime: it.departure_time,
        arrivalTime: it.arrival_time,
        status: it.status
      }
      result.push(travel);
    }
    return result;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response: TravelResponseI[] | undefined = await findTravels();
      setTravels(prepareTableData(response));
      dispatch(updateTravels(response));
      console.log('travelList:', travelsList);

    };
    fetchData();
  }, []);


  
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="min-h-screen bg-blue-gray-50/50">
          <div className="p-4 xl:ml-80">
            <Table data={travels} />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}
