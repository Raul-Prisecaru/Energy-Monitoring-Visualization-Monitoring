import HomePage from "./pages/homePage.tsx";
import LoginNavBar from "./dashboardComponents/loginNavBar.tsx";
import LoginPage from "./pages/loginPage.tsx";
import SignupPage from "./pages/signupPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DeviceManagementPage from "./pages/deviceManagementPage.tsx";
import ProfileManagementPage from "./pages/profileManagementPage.tsx";
import DashboardPage from "./pages/dashboardPage.tsx";
import SettingsPage from "./pages/settingsPage.tsx";
import {useState} from "react";
import DashboardNavBar from "./pages/dashboardNavBar.tsx";
import CostGoalsPage from "./pages/costGoalsPage.tsx";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  return (
      <>
        <BrowserRouter>

            {isLoggedIn ? (
                <DashboardNavBar />
            ) : (
                <LoginNavBar />
            )}

            <Routes>
                <Route path={"/"} element={<HomePage />}></Route>
                <Route path={"login"} element={<LoginPage />}></Route>
                <Route path={"sign-up"} element={<SignupPage />}></Route>
                <Route path={"devices"} element={<DeviceManagementPage />}></Route>
                <Route path={"dashboard"} element={<DashboardPage  />}></Route>
                <Route path={"ProfileManagement"} element={<ProfileManagementPage />}> </Route>
                <Route path={"Settings"} element={<SettingsPage />}> </Route>
                <Route path={"costGoalsPage"} element={<CostGoalsPage />}> </Route>
            </Routes>


        </BrowserRouter>


      </>
  )
}

export default App
