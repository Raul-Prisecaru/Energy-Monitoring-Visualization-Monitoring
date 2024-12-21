import "./styles/loginPageStyle.css"

function SignupPage() {

    return (
        <div className={"Input-Form"}>
            <form>
                <div>
                    <label>First Name</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>Last Name</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>Email</label>
                    <input type={"text"}/> <br/>
                </div>

                <div>
                    <label>password</label>
                    <input type={"text"}/>
                </div>


                <button>Signup</button>
            </form>
        </div>
    )
}

export default SignupPage