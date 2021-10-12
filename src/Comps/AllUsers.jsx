import React from 'react'
import './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import '../Comps/MediaQuery.css'
import {
    Link
} from "react-router-dom";


export default function AllUsers(props) {
    const history = useHistory();
    const [maxIndex, setMaxIndex] = React.useState(Infinity)
    let [counter, setCounter] = React.useState(1)
    let [formattedPage, setFormattedPage] = React.useState(0)
    let [shownUsers, setShownUsers] = React.useState([])
    let [wasSorted, setWasSorted] = React.useState(false)

    React.useEffect(() => {
        let tempFormattedPage = props.page.slice(props.page.lastIndexOf("/") + 1)
        setFormattedPage(tempFormattedPage)
        setCounter(tempFormattedPage)
        setShownUsers(props.allUsers.slice(tempFormattedPage + "0", (parseInt(tempFormattedPage + "0") + 10)))
    }, [props.page])

    try {
        React.useEffect(() => {
            setMaxIndex(props.allUsers.length)
            setShownUsers(props.allUsers.slice(formattedPage + "0", (parseInt(formattedPage + "0") + 10)))
        }, [props.allUsers])
    }
    catch (err) {
        console.log(`the error is ${err}`)
    }


    function paginationDec() {
        if (formattedPage == 0) {
            return
        }
        else {
            history.push("/page/" + ((formattedPage * 1) - 1))
            setFormattedPage(formattedPage - 1)
            setShownUsers(props.allUsers.slice((formattedPage - 1) + "0", (parseInt((formattedPage - 1) + "0") + 10)))
            setCounter(counter - 10)
        }
    }
    function paginationInc() {
        if (parseInt(formattedPage + "0") + 10 >= maxIndex) {
            return
        }
        else {
            history.push("/page/" + ((formattedPage * 1) + 1))
            setFormattedPage(formattedPage + 1)
            setShownUsers(props.allUsers.slice((formattedPage + 1) + "0", (parseInt((formattedPage + 1) + "0") + 10)))
            setCounter(counter + 10)
        }
    }

    function handleClickSort(ev) {
        let name = ev.target.getAttribute("name")
        let currentlyShownEntries = props.allUsers.slice(formattedPage + "0", (parseInt(formattedPage + "0") + 10))
        if (name.includes("age")) {
            currentlyShownEntries = currentlyShownEntries.sort((x, y) => {
                return parseInt(name.split(".").reduce((a, b) => a[b], x)) - name.split(".").reduce((a, b) => a[b], y)
            })
        }
        else {
            currentlyShownEntries = currentlyShownEntries.sort((x, y) => {
                return name.split(".").reduce((a, b) => a[b], x).localeCompare(name.split(".").reduce((a, b) => a[b], y))
            })
        }

        if (wasSorted) {
            setShownUsers(currentlyShownEntries.reverse())
        }
        else {

            setShownUsers(currentlyShownEntries)
        }
        setWasSorted(!wasSorted)
    }

    return (
        <div className='page-container'>
            <h1>All Users:</h1>
            <TableContainer className="container" style={{ width: "fit-content" }} component={Paper}>
                <Box sx={{ boxShadow: 20 }}>
                    <Table className="table-container" size="small" >
                        <TableHead className="table-head">
                            <TableRow >
                                <TableCell >#</TableCell>
                                <TableCell>Picture</TableCell>
                                <TableCell className='sort' name="name.first" onClick={handleClickSort}>Full Name</TableCell>
                                <TableCell className='sort' name="email" onClick={handleClickSort}>Email</TableCell>
                                <TableCell className='sort' name="gender" onClick={handleClickSort}>Gender</TableCell>
                                <TableCell className='sort' name="registered.age" onClick={handleClickSort}>Age</TableCell>
                            </TableRow>
                        </TableHead>


                        {shownUsers.map((item, index) => {
                            return (
                                <TableBody key={index}>
                                    <TableRow onClick={() => { history.push("/users/" + item.login.username) }}>
                                        <TableCell>{parseInt(formattedPage + "0") + index + 1}</TableCell>
                                        <TableCell><img className="round-pic" src={item.picture.thumbnail} /></TableCell>
                                        <TableCell>{item.name.first.charAt(0)}.{item.name.last}</TableCell>
                                        <TableCell><a href={"mailto:" + item.email}>{item.email}</a></TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.registered.age}</TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        })}

                    </Table>
                </Box>
            </TableContainer>
            <div className='pagination-controlers'>
                <Button onClick={paginationDec}><ArrowLeftOutlinedIcon />Previous Page</Button>
                {(() => {
                    if (formattedPage) {
                        return (
                            <>
                                {parseInt(formattedPage) - 1 < 0 ? "" : <Link to={`/page/${parseInt(formattedPage) - 1}`} >{parseInt(formattedPage) - 1}</Link>}
                                <Link to={`/page/${formattedPage}`}>{formattedPage}</Link>
                                {((parseInt(formattedPage) * 10) + 10) >= maxIndex ? "" : <Link to={`/page/${parseInt(formattedPage) + 1}`}>{parseInt(formattedPage) + 1}</Link>}
                            </>
                        )
                    }
                    else {
                        return (
                            <>
                                <Link to='/page/0'>{0}</Link>
                                <Link to='/page/1'>{1}</Link>
                            </>
                        )
                    }
                })()}
                <Button onClick={paginationInc}>Next Page<ArrowRightOutlinedIcon /></Button>
            </div>
        </div>
    )
}

