import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/home-page";
import Dashboard from "./pages/dashboard-page";
import Login from "./pages/login-page/";
import Signup from "./pages/signup-page/";
// import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, makeStyles } from "@material-ui/core";
// import {blackOrangeTheme} from "./themes/customeThemes"
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
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
          </Switch>
          <Footer />
        </main>
      </Router>
    </>
  );
}

export default App;
