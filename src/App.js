import './App.css';
import AllUsers from './Comps/AllUsers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import React from 'react';
import ShowUser from './Comps/ShowUser';
import './Comps/MediaQuery.css'


function App() {
  const [allUsers, setAllUsers] = React.useState([])
  React.useEffect(() => {
    async function fetchAllUsers() {
      try {
        const res = await fetch('https://randomuser.me/api/?results=5000&seed=matan')
        const data = await res.json()
        console.log(data.results.length);
        if (data.results) {
          setAllUsers(data.results)
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAllUsers()
    // zoomOutMobile();
  }, [])

  let location = useLocation().pathname

  function zoomOutMobile() {
    var viewport = document.querySelector('meta[name="viewport"]');

    if (viewport) {
      viewport.content = "initial-scale=0.1";
      viewport.content = "width=1200";
    }
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/users/">
          <ShowUser
            username={location}
            userObj={allUsers.filter(item => item.login.username == location.slice(location.lastIndexOf("/") + 1))} />
        </Route>
        <Route path="/">
          <AllUsers page={location} allUsers={allUsers} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
