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

const FloydWarshallcode = `function FloydWarshall(Graph[V, E], source, destination) {
    1. intialize distance[V][V]
    2. for (i from 1 to V) {
            for (j from 1 to V) {
                if (Edge from i to j exists) distance[i][j] = weight(i, j)
                else if (i == j) distance[i][j] = 0
                else distance[i][j] = Infinity
            }
        }
    3. for (k from 1 to V) {
            for (i from 1 to V) {
                for (j from 1 to V) {
                    if (distance[i][k] === Infinity || distance[k][j] === Infinity) {
                        continue
                    }
                    if (distance[i][j] > distance[i][k] + distance[k][j]) {
                        distance[i][j] = distance[i][k] + distance[k][j]
                    }
                }
            }
        }
4. return distance[source][destination]
}`;

const FloydWarshallInfo = () => {
    return (
        <div>
            <p>
                Floyd Warshall <strong>All Pair Shortest Path (APSP)</strong>
                &nbsp; algorithm is a&nbsp;
                <a
                    className="links"
                    href="https://en.wikipedia.org/wiki/Dynamic_programming"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    dynamic programming
                </a>
                &nbsp;based algorithm, that computes shortest distances between
                all possible pair(source, destination) of vertices. This
                algorithm is relatively slower than even Bellman Ford algorithm.
                For slightly higher number of vertices this algorithm takes
                quite some time to compute all pair shortest paths.
            </p>
            <p>
                The crucial advantage of this algorithm is that, after
                computation, it gives shortest paths among&nbsp;
                <strong>all possible pairs of source and destination</strong>
                &nbsp; vertex, <strong>iff</strong> path exists.
            </p>
            <ul>
                <li>
                    <strong>Idea behind the algorithm:</strong>
                    <ul>
                        <li>
                            For each vertex, we update all shortest path from
                            any source to any destination vertex, that contains
                            this vertex as an intermediate vertx.
                        </li>
                        <li>
                            For all pairs of source to destination, we check
                            whether through this intermediate vertex, a shorter
                            path is possible or not.
                        </li>
                    </ul>
                </li>
            </ul>
            <Editor
                width="100%"
                height="35vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={FloydWarshallcode}
                value={FloydWarshallcode}
                options={options}
            />
            <ul>
                <li>
                    <strong>
                        Time Complexity:&nbsp;
                        <code>
                            O(|V|<sup>3</sup>)
                        </code>
                    </strong>
                    <p>
                        Where, <code>|V|</code>&nbsp; = number of vertices
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
                        <li>Very high time complexity</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default FloydWarshallInfo;
