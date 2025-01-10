import "./styles/homePageStyle.css"
import "./styles/background.css"
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import {Typography} from "@mui/joy";
import Divider from '@mui/joy/Divider';
import forestLoopGIF from './assets/Forest_Loop_GIF.webp';



function HomePage() {
    return (
        <div>
            <div className={"Title"}>
                <h1>Welcome to Your One-Stop Shop<br/> In Managing Your Energy Consumption Usage</h1>
            </div>
            <div className={"forestLoopGif"}>
                <img src={forestLoopGIF}  />
            </div>
            <div className={"getStartedButton"}>
                <button>Get Started</button>

            </div>


            <div className={"featureSection"}>
                <div className={"featureTitle"}>
                    <h1>Features</h1>
                </div>
                <Divider orientation="horizontal"/>

                <div className={"featureSets"}>
                    <Card>
                        <CardContent>
                            <Typography level="title-md">Feature 1</Typography>
                            <Typography>Description of the Feature 1</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography level="title-md">Feature 2</Typography>
                            <Typography>Description of the Feature 2</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography level="title-md">Feature 3</Typography>
                            <Typography>Description of the Feature 3</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography level="title-md">Feature 4</Typography>
                            <Typography>Description of the Feature 4</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography level="title-md">Feature 5</Typography>
                            <Typography>Description of the Feature 5</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography level="title-md">Feature 6</Typography>
                            <Typography>Description of the Feature 6</Typography>
                        </CardContent>
                    </Card>
                </div>


            </div>

        </div>
    )

}

export default HomePage