import React, { useState } from "react";
import BFS from "../../algorithms/BFS";
import Dijkstra from "../../algorithms/Dijkstra";
import BellmanFord from "../../algorithms/BellmanFord";
import FloydWarshall from "../../algorithms/FloydWarshall";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";

import AlgoInfo from "../algorithms-info/AlgoInfo";

import "./Grid.css";
import Tutorial from "../tutorial/Tutorial";

const generateRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const [totalRows, totalCols] = [20, 30];

const totalModalPages = 5;

var [sourceRow, sourceCol, destinationRow, destinationCol] = [10, 10, 10, 20];
var [currSourceRow, currSourceCol, currDestinationRow, currDestinationCol] = [
    10, 10, 10, 20,
];

var grid = [];
var weight = [];

class Node {
    constructor(x, y) {
        this.row = x;
        this.col = y;
        this.isWall = false;
        this.isSource = x === sourceRow && y === sourceCol;
        this.isDestination = x === destinationRow && y === destinationCol;
        this.isVisited = false;
        this.isPath = false;
        this.weight = weight[x][y];
    }
}

const initializeWeights = () => {
    weight = [];
    for (let row = 0; row < totalRows; ++row) {
        let weightOfColumns = [];
        for (let col = 0; col < totalCols; ++col) {
            let weight = generateRandomNumber(10, 30);
            weightOfColumns.push(weight);
        }
        weight.push(weightOfColumns);
    }
};

initializeWeights();

var previousSource;
var previousDestination;

const createVertices = () => {
    grid = [];
    for (let row = 0; row < totalRows; ++row) {
        let columns = [];
        for (let col = 0; col < totalCols; ++col) {
            columns.push(new Node(row, col));
        }
        grid.push(columns);
    }
    previousSource = grid[sourceRow][sourceCol];
    previousDestination = grid[destinationRow][destinationCol];
};

createVertices();

const Grid = () => {
    const [initialGrid, setGrid] = useState(grid);
    const [isMouseDown, setMouseDown] = useState(false);
    const [isSourceSelected, setSourceSelected] = useState(false);
    const [isDestinationSelected, setDestinationSelected] = useState(false);
    const [algorithm, setAlgorithm] = useState("Select Algorithm");
    const [isAlgorithm, setIsAlgorithm] = useState(false);
    const [isAppRunning, setAppRunning] = useState(false);
    const [isPathClear, setPathClear] = useState(true);
    const [shortestPath, setShortestPath] = useState(
        `Source: (10, 10)  Destination: (10, 20)`
    );
    const [algoInfoVisibility, setAlgoInfoVisibility] = useState(false);
    const [tooltipVisibility, setTooltipVisibility] = useState(false);
    const [tutorialVisibility, setTutorialVisibility] = useState(true);
    const [modalID, setModalID] = useState(1);

    const resetSourceAndDestination = () => {
        [sourceRow, sourceCol, destinationRow, destinationCol] = [
            10, 10, 10, 20,
        ];
        previousSource = initialGrid[sourceRow][sourceCol];
        previousDestination = initialGrid[destinationRow][destinationCol];
        setGrid([...initialGrid]);
    };

    const getNodeClass = (node) => {
        let nodeType = "node";
        if (node.isSource === true) {
            nodeType += " source-node";
        } else if (node.isDestination === true) {
            nodeType += " destination-node";
        } else if (node.isWall === true) {
            nodeType += " wall-node";
        } else if (node.isPath === true) {
            nodeType += " node-shortest-path";
        } else if (node.isVisited === true) {
            nodeType += " node-visited";
        }
        return nodeType;
    };

    const handleMouseUp = () => {
        setMouseDown(false);
        if (isSourceSelected) setSourceSelected(false);
        if (isDestinationSelected) setDestinationSelected(false);
    };

    const handleMouseDown = (node) => {
        if (isAppRunning === false) {
            if (node.isWall === false) {
                node.isWall = true;
                setMouseDown(true);
                if (node.isSource) setSourceSelected(true);
                if (node.isDestination) setDestinationSelected(true);
            }
        }
    };

    const handleMouseEnter = (node) => {
        if (isAppRunning === false) {
            if (isMouseDown) {
                if (isSourceSelected) {
                    if (!node.isSource && !node.isDestination && !node.isWall) {
                        previousSource.isSource = false;
                        previousSource.isDestination = false;
                        previousSource.isWall = false;
                        node.isSource = true;
                        previousSource = node;
                        currSourceRow = node.row;
                        currSourceCol = node.col;
                    }
                } else if (isDestinationSelected) {
                    if (!node.isSource && !node.isDestination && !node.isWall) {
                        previousDestination.isSource = false;
                        previousDestination.isDestination = false;
                        previousDestination.isWall = false;
                        node.isDestination = true;
                        previousDestination = node;
                        currDestinationRow = node.row;
                        currDestinationCol = node.col;
                    }
                } else {
                    if (!node.isSource && !node.isDestination && !node.isWall) {
                        node.isWall = true;
                    }
                }
                setShortestPath(
                    `Source: (${currSourceRow}, ${currSourceCol})  Destination: (${currDestinationRow}, ${currDestinationCol})`
                );
                setGrid([...initialGrid]);
            }
        }
    };

    const clearWalls = () => {
        if (isAppRunning === false) {
            for (let row = 0; row < totalRows; ++row) {
                for (let col = 0; col < totalCols; ++col) {
                    initialGrid[row][col].isWall = false;
                    initialGrid[row][col].isVisited = false;
                }
            }
            setGrid([...initialGrid]);
            setStatusInfo(0);
            setShortestPath(
                `Source: (${currSourceRow}, ${currSourceCol})  Destination: (${currDestinationRow}, ${currDestinationCol})`
            );
        }
    };

    const clearPath = () => {
        if (isAppRunning === false) {
            for (let row = 0; row < totalRows; ++row) {
                for (let col = 0; col < totalCols; ++col) {
                    initialGrid[row][col].isPath = false;
                    initialGrid[row][col].isVisited = false;
                }
            }
            setGrid([...initialGrid]);
            setAlgorithm("Select Algorithm");
            setIsAlgorithm(false);
            showWeights();
            setStatusInfo(0);
            setShortestPath(
                `Source: (${currSourceRow}, ${currSourceCol})  Destination: (${currDestinationRow}, ${currDestinationCol})`
            );
            setPathClear(true);
        }
    };

    const resetGrid = () => {
        if (isAppRunning === false) {
            resetSourceAndDestination();
            for (let row = 0; row < totalRows; ++row) {
                for (let col = 0; col < totalCols; ++col) {
                    initialGrid[row][col].isPath = false;
                    initialGrid[row][col].isWall = false;
                    initialGrid[row][col].isVisited = false;
                    initialGrid[row][col].isSource =
                        row === sourceRow && col === sourceCol;
                    initialGrid[row][col].isDestination =
                        row === destinationRow && col === destinationCol;
                }
            }
            setGrid([...initialGrid]);
            setAlgorithm("Select Algorithm");
            setIsAlgorithm(false);
            showWeights();
            setStatusInfo(0);
            // console.log(currSourceRow, currSourceCol);
            [
                currSourceRow,
                currSourceCol,
                currDestinationRow,
                currDestinationCol,
            ] = [10, 10, 10, 20];
            setShortestPath(
                `Source: (${currSourceRow}, ${currSourceCol})  Destination: (${currDestinationRow}, ${currDestinationCol})`
            );
            setPathClear(true);
        }
    };

    const reconfigureWeights = () => {
        if (isAppRunning === false) {
            for (let row = 0; row < totalRows; ++row) {
                for (let col = 0; col < totalCols; ++col) {
                    weight[row][col] = generateRandomNumber(10, 30);
                    initialGrid[row][col].weight = weight[row][col];
                    initialGrid[row][col].isVisited = false;
                }
            }
            setGrid([...initialGrid]);
            setAlgorithm("Select Algorithm");
            showWeights();
            console.log(currSourceRow, currSourceCol);
            setShortestPath(
                `Source: (${currSourceRow}, ${currSourceCol})  Destination: (${currDestinationRow}, ${currDestinationCol})`
            );
            setStatusInfo(0);
            setPathClear(true);
        }
    };

    const getCurrentSource = () => {
        for (let row = 0; row < totalRows; ++row) {
            for (let col = 0; col < totalCols; ++col) {
                if (initialGrid[row][col].isSource === true) {
                    return initialGrid[row][col];
                }
            }
        }
        return initialGrid[sourceRow][sourceCol]; // Ideally would never reach here.
    };

    const getCurrentDestination = () => {
        for (let row = 0; row < totalRows; ++row) {
            for (let col = 0; col < totalCols; ++col) {
                if (initialGrid[row][col].isDestination === true) {
                    return initialGrid[row][col];
                }
            }
        }
        return initialGrid[destinationRow][destinationCol]; // Ideally would never reach here.
    };

    const nullifyWeights = () => {
        let weights = document.getElementsByClassName("weight-value");
        for (let i = 0; i < weights.length; ++i) {
            weights[i].className = "not-selectable weight-value hidden";
        }
        setGrid([...initialGrid]);
    };

    const showWeights = () => {
        let weights = document.getElementsByClassName("weight-value");
        for (let i = 0; i < weights.length; ++i) {
            weights[i].className = "not-selectable weight-value";
        }
        setGrid([...initialGrid]);
    };

    const setStatusInfo = (statusID) => {
        let status = "";
        if (statusID === 1) status = "shortest-path-result spfv";
        else if (statusID === 2) status = "shortest-path-result spff";
        else status = "shortest-path-result";
        let statusInfo = document.getElementById("spf");
        statusInfo.className = status;
    };

    const setAnimationInfo = () => {
        let animationInfo = "";
        if (algorithm === "BFS (Breadth First Search)") {
            animationInfo =
                "Visited Nodes are being animated.  In BFS, visited nodes are discovered first through shortest path.";
        } else if (algorithm === "Bellman Ford Algorithm") {
            animationInfo =
                "Each animation step indicates new nodes that are being relaxed. The upward trajectory of animation is specific to loops running in Algorithmic Implementation.";
        } else if (algorithm === "Floyd Warshall Algorithm") {
            animationInfo =
                "Animated nodes are the intermediate nodes through which, shortest distance between each pair of source and destination is being calculated.";
        } else {
            // algorithm === "Dijkstra's Algorithm"
            animationInfo =
                "Animated nodes are being picked greedily according to their distance (in increasing order) from the source node.";
        }
        setShortestPath(animationInfo);
        setStatusInfo(1);
    };

    const setNotFound = () => {
        setStatusInfo(2);
        setShortestPath("Destination is not reachable from Source");
        setAppRunning(false);
        setIsAlgorithm(false);
        setAlgorithm("Select Algorithm");
    };

    const animateNodes = (nodes, timer, nodeType, minPathLength) => {
        setTimeout(() => {
            if (nodeType === "visited") {
                for (let i = 0; i < nodes.length; ++i) {
                    nodes[i].isVisited = true;
                }
                setGrid([...initialGrid]);
            } else {
                for (let i = 0; i < nodes.length; ++i) {
                    nodes[i].isPath = true;
                }
                setGrid([...initialGrid]);
                setStatusInfo(2);
                if (minPathLength === Infinity) {
                    setShortestPath("Destination is not reachable from source");
                } else {
                    setShortestPath(
                        `Shortest distance from Source: (${currSourceRow}, ${currSourceCol}) to Destination: (${currDestinationRow}, ${currDestinationCol}) is ${minPathLength}`
                    );
                }
                setAppRunning(false);
                setIsAlgorithm(false);
                setAlgorithm("Select Algorithm");
            }
        }, timer);
    };

    const visualize = () => {
        if (isAppRunning === false) {
            if (algorithm === "Select Algorithm") {
                alert("Select Algorithm to visualize");
            } else {
                setAppRunning(true);
                setPathClear(false);
                let src = getCurrentSource();
                let dst = getCurrentDestination();
                if (algorithm === "BFS (Breadth First Search)") {
                    let results = BFS(initialGrid, src, dst);
                    let [minPathLength, visitedNodes, shortestPathNodes] =
                        results;
                    if (visitedNodes.length !== 0) setAnimationInfo();
                    let timer = 500;
                    for (let i = 0; i < visitedNodes.length; ++i) {
                        animateNodes(
                            visitedNodes[i],
                            timer,
                            "visited",
                            minPathLength
                        );
                        timer += 400;
                    }
                    if (shortestPathNodes.length > 0) {
                        shortestPathNodes.reverse();
                        for (let k = 0; k < shortestPathNodes.length; ++k) {
                            animateNodes(
                                [shortestPathNodes[k]],
                                timer,
                                "path",
                                minPathLength
                            );
                            timer += 100;
                        }
                    } else {
                        setTimeout(setNotFound, timer);
                    }
                } else if (algorithm === "Bellman Ford Algorithm") {
                    let results = BellmanFord(initialGrid, src, dst);
                    let [minPathLength, visitedNodes, shortestPathNodes] =
                        results;
                    if (visitedNodes.length !== 0) setAnimationInfo();
                    let timer = 500;
                    for (let i = 0; i < visitedNodes.length; ++i) {
                        animateNodes(
                            visitedNodes[i],
                            timer,
                            "visited",
                            minPathLength
                        );
                        timer += 500;
                    }
                    if (shortestPathNodes.length > 0) {
                        shortestPathNodes.reverse();
                        for (let k = 0; k < shortestPathNodes.length; ++k) {
                            animateNodes(
                                [shortestPathNodes[k]],
                                timer,
                                "path",
                                minPathLength
                            );
                            timer += 100;
                        }
                    } else {
                        setTimeout(setNotFound, timer);
                    }
                } else if (algorithm === "Floyd Warshall Algorithm") {
                    let results = FloydWarshall(initialGrid, src, dst);
                    let [minPathLength, visitedNodes, shortestPathNodes] =
                        results;
                    if (visitedNodes.length !== 0) setAnimationInfo();
                    let timer = 500;
                    for (let i = 0; i < visitedNodes.length; ++i) {
                        animateNodes(
                            visitedNodes[i],
                            timer,
                            "visited",
                            minPathLength
                        );
                        timer += 25;
                    }
                    if (shortestPathNodes.length > 0) {
                        for (let k = 0; k < shortestPathNodes.length; ++k) {
                            animateNodes(
                                [shortestPathNodes[k]],
                                timer,
                                "path",
                                minPathLength
                            );
                            timer += 100;
                        }
                    } else {
                        setTimeout(setNotFound, timer);
                    }
                } else {
                    let results = Dijkstra(grid, src, dst);
                    let [minPathLength, visitedNodes, shortestPathNodes] =
                        results;
                    if (visitedNodes.length !== 0) setAnimationInfo();
                    let timer = 200;
                    for (let i = 0; i < visitedNodes.length; ++i) {
                        animateNodes(
                            visitedNodes[i],
                            timer,
                            "visited",
                            minPathLength
                        );
                        timer += 50;
                    }
                    if (shortestPathNodes.length > 0) {
                        shortestPathNodes.reverse();
                        for (let k = 0; k < shortestPathNodes.length; ++k) {
                            animateNodes(
                                [shortestPathNodes[k]],
                                timer,
                                "path",
                                minPathLength
                            );
                            timer += 100;
                        }
                    } else {
                        setTimeout(setNotFound, timer);
                    }
                }
            }
        }
    };

    const toggleBackgroundBlur = () => {
        let blur = document.getElementById("blur");
        blur.classList.toggle("active");
    };

    return (
        <div>
            <div className="board" id="blur">
                {/* Navbar */}
                <div className="complete-navbar">
                    <div className="navbar justify-content-center app-header">
                        <p className="app-name">Shortest Path Visualizer</p>
                    </div>

                    <div className="navbar justify-content-center">
                        <ul className="nav justify-content-center navbar-content">
                            <li
                                className="dropdown nav-item"
                                data-bs-toggle="dropdown"
                            >
                                <a
                                    className="nav-link dropdown-toggle not-selectable"
                                    disabled={isAppRunning}
                                >
                                    {algorithm}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-light">
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                nullifyWeights();
                                                setIsAlgorithm(true);
                                                setAlgorithm(
                                                    "BFS (Breadth First Search)"
                                                );
                                            }}
                                        >
                                            BFS (Breadth First Search)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                showWeights();
                                                setIsAlgorithm(true);
                                                setAlgorithm(
                                                    "Dijkstra's Algorithm"
                                                );
                                            }}
                                        >
                                            Dijkstra's Algorithm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                showWeights();
                                                setIsAlgorithm(true);
                                                setAlgorithm(
                                                    "Bellman Ford Algorithm"
                                                );
                                            }}
                                        >
                                            Bellman Ford Algorithm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                showWeights();
                                                setIsAlgorithm(true);
                                                setAlgorithm(
                                                    "Floyd Warshall Algorithm"
                                                );
                                            }}
                                        >
                                            Floyd Warshall Algorithm
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn grad-text v-btn"
                                    onClick={visualize}
                                    disabled={
                                        isAppRunning ||
                                        !isAlgorithm ||
                                        !isPathClear
                                    }
                                >
                                    &nbsp; Visualize &nbsp;
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn grad-text"
                                    onClick={clearPath}
                                    disabled={isAppRunning}
                                >
                                    &nbsp; Clear Path &nbsp;
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn grad-text"
                                    onClick={clearWalls}
                                    disabled={isAppRunning}
                                >
                                    &nbsp; Clear Walls &nbsp;
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn grad-text"
                                    onClick={resetGrid}
                                    disabled={isAppRunning}
                                >
                                    &nbsp; Reset Grid &nbsp;
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="btn grad-text"
                                    onClick={reconfigureWeights}
                                    disabled={isAppRunning}
                                >
                                    &nbsp; Reconfigure Weights &nbsp;
                                </button>
                            </li>
                            <li className="nav-item">
                                <OverlayTrigger
                                    key="top"
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            <strong>Meet the Algorithms</strong>
                                        </Tooltip>
                                    }
                                    show={tooltipVisibility}
                                >
                                    <button
                                        type="button"
                                        className="btn grad-text"
                                        disabled={isAppRunning}
                                        onClick={() => {
                                            setTooltipVisibility(false);
                                            toggleBackgroundBlur();
                                            setAlgoInfoVisibility(true);
                                        }}
                                        onMouseEnter={() => {
                                            setTooltipVisibility(true);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipVisibility(false);
                                        }}
                                    >
                                        <i className="fas fa-solid fa-laptop-code fa-lg"></i>
                                    </button>
                                </OverlayTrigger>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="full-grid">
                    <div className="path-length not-selectable">
                        <p id="spf" className="shortest-path-result">
                            {shortestPath}
                        </p>
                    </div>
                    {initialGrid.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex} className="rows">
                                {row.map((column, columnIndex) => {
                                    return (
                                        <div
                                            className={getNodeClass(column)}
                                            id={`${rowIndex}-${columnIndex}`}
                                            key={columnIndex}
                                            onMouseUp={() => {
                                                handleMouseUp();
                                            }}
                                            onMouseDown={() => {
                                                handleMouseDown(column);
                                            }}
                                            onMouseEnter={() => {
                                                handleMouseEnter(column);
                                            }}
                                        >
                                            <p className="not-selectable weight-value">
                                                {column.weight}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Algorithm Info Modal */}
            <Modal
                show={algoInfoVisibility}
                onHide={() => {
                    setAlgoInfoVisibility(false);
                }}
                backdrop="static"
                size="xl"
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Meet The Algorithms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlgoInfo />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            toggleBackgroundBlur();
                            setAlgoInfoVisibility(false);
                        }}
                        className="close-btn"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Tutorial Modal */}
            <Modal
                show={tutorialVisibility}
                onHide={() => {
                    setTutorialVisibility(false);
                }}
                backdrop="static"
                size="lg"
                scrollable={true}
                id="tut-modal"
            >
                <Modal.Body>
                    <Tutorial modalID={modalID}></Tutorial>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button
                        variant="primary"
                        onClick={() => {
                            setTutorialVisibility(false);
                        }}
                        className="skip-btn float-left"
                    >
                        {`${
                            modalID === totalModalPages
                                ? "Close"
                                : "Skip Tutorial"
                        }`}
                    </Button>
                    <p className="modal-page-id">{`${modalID} / ${totalModalPages}`}</p>
                    <div>
                        <Button
                            className="tut-nav-btn"
                            variant="primary"
                            onClick={() => {
                                setModalID(modalID - 1);
                            }}
                            disabled={modalID === 1}
                        >
                            Prev
                        </Button>
                        <Button
                            className="tut-nav-btn"
                            variant="primary"
                            onClick={() => {
                                setModalID(modalID + 1);
                            }}
                            disabled={modalID === totalModalPages}
                        >
                            Next
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Grid;
