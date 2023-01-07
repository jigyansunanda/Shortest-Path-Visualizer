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

const BFScode = `function BFS(Graph[V, E], source, destination) {
    1. initialize distance[V] = {Infinity, Infinity, Infinity, Infinity, .......}
    2. distance[source] = 0
    3. create an empty Queue (say 'q')
    4. add source vertex to q
    5. while (q is not empty) 
            vertex u := q.dequeue() {
            for (all vertices v: adjacent of u) {
                if (distance[v] == Infinity) {             // if vertex is not visited
                    distance[v] = distance[u] + 1
				}
            }
        }
    6. return distance[destination]
}`;

const BFSInfo = () => {
    return (
        <div>
            <p>
                Breadth First Search is a&nbsp;
                <a
                    className="links"
                    href="https://en.wikipedia.org/wiki/Shortest_path_problem#Single-source_shortest_paths"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Single Source Shortest Path (SSSP)
                </a>
                &nbsp;graph traversal algorithm&nbsp;
                <strong>for unweighted graphs</strong>, in which we visit the
                source vertex first and mark it as visited. Then we visit
                all&nbsp;
                <strong>adjacent, not-visited</strong> vertices of the source
                vertex, mark them visited and then we visit adjacent,
                not-visited vertices of these vertices and so on..
            </p>
            <p>
                Also, BFS with simple modification&nbsp;
                <a
                    className="links"
                    href="https://cp-algorithms.com/graph/01_bfs.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    (0-1 BFS)
                </a>
                &nbsp;can give shortest path from source to destination
                for&nbsp;
                <strong>binary weighted graphs</strong>.
            </p>
            <ul>
                <li>
                    <strong>Idea behind the algorithm:</strong>
                    <ul>
                        <li>
                            <p>
                                Since during BFS, total encounterd distance
                                keeps increasing by 1, <i>i.e.</i> we first
                                travel source vertex (at distance 0), then
                                travel vertices, those are at distance 1 from
                                source, then vertices at distance 2 from source
                                and so on. Hence, the first time we encounter a
                                vertex, the distance covered till now, must be
                                the shortest distance.
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
            <Editor
                width="100%"
                height="30vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={BFScode}
                value={BFScode}
                options={options}
            />
            <ul>
                <li>
                    <strong>
                        Time Complexity: <code>O(|V| + |E|)</code>
                    </strong>
                    <p>
                        Where, <code>|V|</code>&nbsp; = number of vertices
                        and&nbsp;
                        <code>|E|</code>&nbsp; = number of edges
                    </p>
                </li>
                <li>
                    <strong>
                        Space Complexity: <code>O(|V|)</code>
                    </strong>
                    <p>
                        Where, <code>|V|</code>&nbsp; = number of vertices
                    </p>
                </li>
                <li>
                    <strong>Advantages:</strong>
                    <ul>
                        <li>Gives shortest path for unweighted graph</li>
                        <li>
                            Works for both&nbsp;
                            <strong>directed & undirected</strong> graph
                        </li>
                        <li>Easy to implement</li>
                    </ul>
                </li>
                <li>
                    <strong>Disadvantages:</strong>
                    <ul>
                        <li>
                            Does <strong>not</strong> work for weighted graph
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default BFSInfo;
