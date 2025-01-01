import "./styles/settingsPageStyle.css"
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className={"buttonsManagement"}>
            <div>
                <button onClick={() => navigate("/ProfileManagement")}> Profile Management </button>

            </div>
            <div>
                <button> Notification management </button>
            </div>
        </div>
    )

}


export default SettingsPage