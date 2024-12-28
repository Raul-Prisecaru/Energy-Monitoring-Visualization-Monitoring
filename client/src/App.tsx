import HomePage from "./pages/homePage.tsx";
import NavBar from "./components/navBar.tsx";
import LoginPage from "./pages/loginPage.tsx";
import SignupPage from "./pages/signupPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DeviceManagementPage from "./pages/deviceManagementPage.tsx";
import ProfileManagementPage from "./pages/profileManagementPage.tsx";
import UsageAreaChart from "./components/usageAreaChart.tsx";
import TopDevicesBarChart from "./components/topDevicesBarChart.tsx";
function App() {

  return (
      <>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<HomePage />}></Route>
                <Route path={"login"} element={<LoginPage />}></Route>
                <Route path={"sign-up"} element={<SignupPage />}></Route>
                <Route path={"devices"} element={<DeviceManagementPage />}></Route>
                <Route path={"dashboard"} element={<TopDevicesBarChart width={500} height={500} />}></Route>
                <Route path={"ProfileManagement"} element={<ProfileManagementPage />}> </Route>
            </Routes>


        </BrowserRouter>


      </>
  )
}

export default App
