import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "../algorithms-info/AlgoInfo.css";

import BFSInfo from "./info/BFSInfo";
import DijkstraInfo from "./info/DijkstraInfo";
import BellmanFordInfo from "./info/BellmanFordInfo";
import FloydWarshallInfo from "./info/FloydWarshallInfo";

const AlgoInfo = () => {
    return (
        <Tabs
            defaultActiveKey="BFS"
            id="fill-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="BFS" title="BFS (Breadth First Search)">
                <BFSInfo />
            </Tab>
            <Tab eventKey="Dijkstra" title="Edsger Dijkstra's Algorithm">
                <DijkstraInfo />
            </Tab>
            <Tab eventKey="Bellman" title="Bellman Ford Algorithm">
                <BellmanFordInfo />
            </Tab>
            <Tab eventKey="Floyd" title="Floyd Warshall Algorithm">
                <FloydWarshallInfo />
            </Tab>
        </Tabs>
    );
};

export default AlgoInfo;
