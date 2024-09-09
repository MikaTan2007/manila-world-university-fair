import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { studentSignUp } from "./pages/studentSignUp";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <studentSignUp />
        </Route>
      </Switch>
    </Router>
  );
};
