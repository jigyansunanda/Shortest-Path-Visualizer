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

const Dijkstracode = `function Dijkstra(Graph[V, E], source, destination) {
    1. create a Priority Queue (Min Heap), say 'pq'
    2. intialize distance[V] = {Infinity, Infinity, Infinity, Infinity, ........}
    3. distance[source] = 0
    4. insert all vertices with distance[vertex] to pq                      // O(|V|) time
    5. while (pq is not empty) {                                            // loop runs |V| times
            vertex u := extract vertex with minimum distance from pq        // O(log |V|) time
            if (u == destination) {
                return distance[destination]
            }
            for (all vertices v: adjacent of u) {
                if (distance[v] > distance[u] + weight(u, v)) {
                    distance[v] = distance[u] + weight(u, v)
                    insert vertex v with distance[v] to pq                  // Total time: O((|E| + |V|) log |V|)
                }
            }
        }
}`;

const DijkstraInfo = () => {
    return (
        <div>
            <p>
                Dijkstra's <strong>Shortest Path First (SPF)</strong> algorithm
                is a <strong>greedy</strong>&nbsp;
                <a
                    className="links"
                    href="https://en.wikipedia.org/wiki/Shortest_path_problem#Single-source_shortest_paths"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Single Source Shortest Path (SSSP)
                </a>
                &nbsp; algorithm, conceived by&nbsp;
                <a
                    className="links"
                    href="https://en.wikipedia.org/wiki/Edsger_W._Dijkstra"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Edsger. W Dijkstra
                </a>
                &nbsp;in 1956.
            </p>
            <ul>
                <li>
                    <strong>Idea behind the algorithm:</strong>
                    <ul>
                        <li>
                            We maintain a container of distance for all vertices
                            initialized with values Infinite.
                        </li>
                        <li>Distance of source vertex is 0.</li>
                        <li>
                            At each iteration, we pick a vertex and finalize it
                            distance. Initially none of the vertices have their
                            distance finalized.
                        </li>
                        <li>
                            <strong>How do we pick the vertex ?</strong>
                            <ul>
                                <li>
                                    We pick the vertex for which distance has
                                    not been finalized and has minimum distance.
                                    (greedy choice)
                                </li>
                            </ul>
                        </li>
                        <li>
                            Then we go to all adjacent vertices of it, and check
                            whether do we get a shorter path to those vertices,
                            through current vertex, If yes, then we update it's
                            distance.
                        </li>
                    </ul>
                </li>
            </ul>
            <Editor
                width="100%"
                height="30vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={Dijkstracode}
                value={Dijkstracode}
                options={options}
            />
            <ul>
                <li>
                    <strong>
                        Time Complexity: <code>O((|V| + |E|) log |V|)</code>
                    </strong>
                    <p>
                        Where, <code>|V|</code>&nbsp; = number of vertices
                        and&nbsp;
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
                    </ul>
                </li>
                <li>
                    <strong>Disadvantages:</strong>
                    <ul>
                        <li>
                            Does <strong>not</strong> work for graphs with&nbsp;
                            <strong>negative weighted edges</strong>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default DijkstraInfo;
