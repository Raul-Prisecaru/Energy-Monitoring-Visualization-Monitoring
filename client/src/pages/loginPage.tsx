import "./styles/loginPageStyle.css"

function LoginPage() {

    return (
        <div className={"Input-Form"}>
            <form>
                <div>
                    <label>Email</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>password</label>
                    <input type={"text"}/>
                </div>

            </form>
        </div>
    )
}

export default LoginPage