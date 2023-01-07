import Editor from "@monaco-editor/react";

const options = {
    readOnly: true,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: "13px",
    lineNumbers: "off",
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 5,
    renderIndentGuides: false,
};

const BellmanFordcode = `function BellmanFord(Graph[V, E], source, destination) {
    1. intialize distance[V] = {INF, INF, INF, INF, INF,........}
    2. distance[source] = 0
    3. for (count 0 to |V|-1) {
        	for (Every edge u to v) {
            	if (distance[v] > distance[u] + weight(u, v)) {
                	distance[v] = distance[u] + weight(u, v)
            	}
        	}
    	}
    /* For detection of negative weighted edge cycles,
    we run one more loop to check whether finalized 
	distances are further reducing or not. If yes,
	then report negative weighted edge cycle. */
    4. for (every edge u to v) {
            if (distance[v] > distance[u] + weight(u, v)) {
                Report (negative weighted edge cycle exists)
            }
        }
    5. return distance[detination]
}`;

const BellmanFordInfo = () => {
    return (
        <div>
            <p>
                <a
                    className="links"
                    href="https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Bellman-Ford
                </a>
                &nbsp;shortest path algorithm is a&nbsp;
                <a
                    className="links"
                    href="https://en.wikipedia.org/wiki/Dynamic_programming"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    dynamic programming
                </a>
                &nbsp;based algorithm that computes from source node to all
                reachable nodes. This algorithm was proposed by Alfonso Shimbel
                and was named after it's publishers Richard Bellman and Lester
                Ford Jr. .Even though this algorithm is&nbsp;
                <strong>relatively slower than Dijkstra's algorithm</strong>, it
                has one major advantage that, it
                <strong>can detect negative weighted edge cycles</strong>.
            </p>
            <ul>
                <li>
                    <strong>Idea behind the algorithm:</strong>
                    <ul>
                        <li>
                            The key idea of the algorithm is&nbsp;
                            <strong>
                                If there are |V| vertices in a graph (that does
                                not contain negative weighted edge cycles), then
                                any existing shortest path, between any source
                                and destination vertex can not have length more
                                than |V|-1
                            </strong>
                            .
                        </li>
                        <li>
                            We first find out the shortest path containing 1
                            edge, then shortest path containing 2 edges, then 3
                            edges and so on..
                        </li>
                    </ul>
                </li>
            </ul>
            <Editor
                width="100%"
                height="35vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={BellmanFordcode}
                value={BellmanFordcode}
                options={options}
            />
            <ul>
                <li>
                    <strong>
                        Time Complexity: <code>O(|V||E|)</code>
                    </strong>
                    <p>
                        Where, <code>|V|</code>&nbsp; = number of vertices and
                        <code>|E|</code>&nbsp; = number of edges
                    </p>
                </li>
                <li>
                    <strong>Advantages:</strong>
                    <ul>
                        <li>
                            Works for both&nbsp;
                            <strong>weighted & unweighted</strong> graph
                        </li>
                        <li>
                            Works for both <strong>cyclic & acyclic</strong>
                            &nbsp;graph
                        </li>
                        <li>
                            Works for both&nbsp;
                            <strong>directed & undirected</strong> graph
                        </li>
                        <li>
                            Works for <strong>negative weight edges</strong>
                        </li>
                        <li>Detects negative weight edge cycles, if any</li>
                    </ul>
                </li>
                <li>
                    <strong>Disadvantages:</strong>
                    <ul>
                        <li>slower than Dijkstra's algorithm</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default BellmanFordInfo;
