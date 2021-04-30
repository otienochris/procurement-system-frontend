import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/home-page";
import Dashboard from "./pages/dashboard-page";
import Login from "./pages/login-page/";
import Signup from "./pages/signup-page/";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";

const useStyles = makeStyles({
  appStyle: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Router>
        <NavBar />
        <main className={classes.appStyle}>
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
            <Route component={Signup} path="/signup" exact />
            <ProtectedRoute component={Dashboard} path="/dashboard" exact />
            <ProtectedRoute component={Profile} path="/profile" exact />
          </Switch>
          <Footer />
        </main>
      </Router>
    </>
  );
}

export default App;
