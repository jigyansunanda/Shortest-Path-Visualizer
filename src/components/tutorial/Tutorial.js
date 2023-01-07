import "./Tutorial.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const iconImage = require("./media/icon.png");

const sourceImage = require("./media/source.png");
const destinationImage = require("./media/destination.png");
const wallImage = require("./media/wall.png");

const createWall = require("./media/createWall.gif");
const move = require("./media/move.gif");
const algoInfo = require("./media/algoinfo.gif");

const Tutorial = (props) => {
    if (props.modalID === 1) {
        return (
            <div>
                <h1 className="welcome">Welcome to Shortest Path Visualizer</h1>
                <h3>
                    This short guide is an user-manual for all the features in
                    this application.
                </h3>
                <p className="modal1">
                    It is <span>strongly</span> recommended to go thorugh this
                    tutorial. But feel free to skip.
                </p>
                <img src={iconImage} className="app-icon" alt="app icon" />
            </div>
        );
    } else if (props.modalID === 2) {
        return (
            <div>
                <h2 className="modal2">What does the images represent ?</h2>
                {/* <div className="node-icon-div">
                    <p className="modal2-p">
                        Source:
                        <img
                            src={sourceImage}
                            className="node-icons-1"
                            alt="source node icon"
                        />
                    </p>
                    <p className="modal2-p">
                        Destination:&nbsp;&nbsp;{" "}
                        <img
                            src={destinationImage}
                            className="node-icons-2"
                            alt="destination node icon"
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    </p>
                    <p className="modal2-p">
                        Walls:&nbsp;&nbsp;{" "}
                        <img
                            src={wallImage}
                            className="node-icons-3"
                            alt="wall icon"
                        />
                    </p>
                </div> */}

                <CardGroup>
                    <Card>
                        <Card.Img variant="top" src={sourceImage} />
                        <Card.Body>
                            <Card.Title>Source Node</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={wallImage} />
                        <Card.Body>
                            <Card.Title>Walls</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={destinationImage} />
                        <Card.Body>
                            <Card.Title>Destination Node</Card.Title>
                        </Card.Body>
                    </Card>
                </CardGroup>

                <div className="modal2-div2">
                    <p className="modal2-p">
                        You can move source and destination nodes around and
                        create walls to block nodes from being visited
                    </p>
                </div>
            </div>
        );
    } else if (props.modalID === 3) {
        return (
            <div>
                <h2 className="modal3">How to create walls ?</h2>
                <p className="modal3-p">
                    To create walls, click on an empty cell and drag the cursor
                    around. Finally release it to stop creating walls.
                </p>
                <img
                    src={createWall}
                    className="create-wall"
                    alt="how to create wall"
                />
            </div>
        );
    } else if (props.modalID === 4) {
        return (
            <div>
                <h2 className="modal3">How to move source and destination ?</h2>
                <p className="modal3-p">
                    To move source and destination around, click on
                    correspodning cells and drag them to desired empty cells and
                    release.
                </p>
                <img
                    src={move}
                    className="move"
                    alt="how to move source and destination"
                />
            </div>
        );
    } else {
        return (
            <div>
                <h2 className="modal3">Meet The Algorithms</h2>
                <img
                    src={algoInfo}
                    className="algo-info"
                    alt="algorithms information"
                />
            </div>
        );
    }
};

export default Tutorial;
