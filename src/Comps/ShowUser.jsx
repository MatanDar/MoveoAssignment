import React from 'react'
import './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SimpleMap from './Map'
import RoomIcon from '@mui/icons-material/Room';
import '../Comps/MediaQuery.css'


export default function ShowUser(props) {

    let [lng, setLng] = React.useState(0)
    let [lat, setLat] = React.useState(0)

    React.useEffect(() => {
        try {
            setLng(parseFloat(props.userObj[0].location.coordinates.longitude))
            setLat(parseFloat(props.userObj[0].location.coordinates.latitude))

        }
        catch (err) {
            console.log(err);
        }
    }, [props])

    return (
        <div className='page-container'>
            <h1>User Details:</h1>
            <TableContainer component={Paper}>
                <Table className="table-container" size="small" >
                    <TableHead>
                        <TableRow >
                            <TableCell >#</TableCell>
                            <TableCell>Picture</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
                        </TableRow>
                    </TableHead>


                    {props.userObj.map((item, index) => {
                        return (
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell>{1}</TableCell>
                                    <TableCell><img className="round-pic" src={item.picture.thumbnail} /></TableCell>
                                    <TableCell>{item.name.first.charAt(0)}.{item.name.last}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.gender}</TableCell>
                                    <TableCell>{item.registered.age}</TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}

                </Table>
            </TableContainer>
            <SimpleMap RoomIcon={RoomIcon} lat={lat} lng={lng} />
        </div>
    )
}
