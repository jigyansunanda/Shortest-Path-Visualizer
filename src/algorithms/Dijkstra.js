import PriorityQueue from "../data-structures/PriorityQueue";

const [totalRows, totalCols] = [20, 30];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const isValid = (r, c) => {
    return r >= 0 && c >= 0 && r < totalRows && c < totalCols;
};

const Dijkstra = (grid, src, dst) => {
    let distance = [];
    let parentNodes = [];
    let visited = [];
    for (let row = 0; row < totalRows; ++row) {
        let d = [];
        let p = [];
        let v = [];
        for (let col = 0; col < totalCols; ++col) {
            d.push(Infinity);
            p.push(null);
            v.push(false);
        }
        distance.push(d);
        parentNodes.push(p);
        visited.push(v);
    }
    distance[src.row][src.col] = 0;
    let pq = new PriorityQueue();
    pq.insert([src, distance[src.row][src.col]]);
    let visitedNodes = [];
    while (pq.empty() === false) {
        let vertex = pq.extractMin();
        let curr = vertex[0];
        let d = vertex[1];
        if (visited[curr.row][curr.col] === true) continue;
        if (curr.isDestination === true) break;
        visitedNodes.push([curr]);
        visited[curr.row][curr.col] = true;
        for (let dir = 0; dir < 4; ++dir) {
            let r = curr.row + dx[dir];
            let c = curr.col + dy[dir];
            if (isValid(r, c)) {
                if (grid[r][c].isWall === false && visited[r][c] === false) {
                    if (distance[r][c] > d + grid[r][c].weight) {
                        distance[r][c] = d + grid[r][c].weight;
                        parentNodes[r][c] = curr;
                        pq.insert([grid[r][c], distance[r][c]]);
                    }
                }
            }
        }
    }
    let minPathLength = distance[dst.row][dst.col] - dst.weight;
    let shortestPathNodes = [];
    if (minPathLength !== Infinity) {
        let end = parentNodes[dst.row][dst.col];
        while (end.isSource === false) {
            shortestPathNodes.push(end);
            end = parentNodes[end.row][end.col];
        }
    }
    return [minPathLength, visitedNodes, shortestPathNodes];
};

export default Dijkstra;
