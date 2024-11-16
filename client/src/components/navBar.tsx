import "./styles/navBarStyle.css"

function NavBar() {

    return (

        <div className={"NavBar"}>
            <div className={"TopNavBar"}>
                <div className={"TopNavOptions"}>
                    <li>
                        <ul>Login</ul>
                        <ul>SignUp</ul>
                    </li>
                </div>

            </div>

            <div className={"SideNavBar"}>

            </div>
        </div>
    )

}

export default NavBar