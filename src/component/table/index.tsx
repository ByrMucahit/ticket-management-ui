'use client'
import { Card, Typography } from "@material-tailwind/react";
import { ButtonDefault } from "../button";
import TableData from "@/src/services/interfaces";
import moment from "moment";
import { useRouter } from 'next/navigation'
import { buyTicket } from "@/src/services/ticket";
import { USER_ID } from "@/src/services/users";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateTravels } from "@/src/redux/slices/travelSlice";
import { useEffect } from "react";

const TABLE_HEAD = ["Source", "Destination", "Departure Time", "Arrival Time"];

const TABLE_ROWS = [
    {
        source: "Source",
        job: "Manager",
        date: "23/04/18",
    },
    {
        source: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
    },
    {
        source: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
    },
    {
        source: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
    },
    {
        source: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
    },
];

interface TableProps {
    data: TableData[]
}




export default function Table(props: TableProps) {
    const dispatch = useDispatch();

    const travelsList = useSelector(
        (state: RootState) => state.counter.travels
      );

    const router = useRouter()
    const { data } = props;

    async function buyAction(travelId: string, userId: string) {
        try {
            await buyTicket(travelId, userId);
        } catch(err: unknown) {
            console.log('err: ', err);
        }
    }

    useEffect(() => {
        // Create a socket connection
        const socket = io('http://localhost:3002');
    
        // Listen for incoming messages
        socket.on('sale', (message) => {
          console.log('message:', message);
          console.log('travel list: ', travelsList);
          if (!travelsList) return;
          const result: TableData[] = [];
          for (const it of travelsList) {
            if (it.id === message.travel_id) {
              result.push({
                ...it,
                status: message.status,
              })
            } else result.push(it);
          }
            dispatch(updateTravels(travelsList));
          
        });
            
        // Clean up the socket connection on unmount
        return () => {
          socket.disconnect();
        };
      }, []);

    console.log('trrr: ', travelsList);
    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(({ id, source, destination, departureTime, arrivalTime, status }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 ";

                        return (
                            <>
                                <tr key={source} className="hover:bg-sky-700" >
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {source}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {destination}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {moment(departureTime).locale('tr').format('MMMM Do YYYY, h:mm:ss a')}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {moment(arrivalTime).locale('tr').format('MMMM Do YYYY, h:mm:ss a')}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {status === 'ACTIVE' ? (<div><ButtonDefault content="satın al" onClick={() => buyAction(id, USER_ID)} /></div>) : <div><p>{status}</p></div>}
                                    </td>
                                    <td className={classes}>
                                        <div><ButtonDefault content="Detay" onClick={() => router.push(`/${id}`)} /></div>
                                    </td>
                                </tr>

                            </>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    )

}