function LoginPage() {

    return (
        <div className={"Input Form"}>
            <form>
                <label>First Name</label>
                <input type={"text"}/> <br />

                <label>Last Name</label>
                <input type={"text"}/> <br />

                <label>Email</label>
                <input type={"text"}/> <br />

                <label>password</label>
                <input type={"text"}/>
            </form>
        </div>
    )
}

export default LoginPage