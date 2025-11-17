import { AppBar, Container, CssBaseline, Toolbar, Typography, Button } from "@mui/material";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./components/CalenderPage";

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Personal Trainer
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Customers
            </Button>

            <Button color="inherit" component={Link} to="/trainings">
              Trainings
            </Button>

           <Button color="inherit" component={Link} to="/calendar">
              Calender
            </Button>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
