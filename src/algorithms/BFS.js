import Queue from "../data-structures/Queue.js";

const [totalRows, totalCols] = [20, 30];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const isValid = (r, c) => {
    return r >= 0 && c >= 0 && r < totalRows && c < totalCols;
};

const BFS = (grid, src, dst) => {
    let distance = [];
    let parentNodes = [];
    for (let row = 0; row < totalRows; ++row) {
        let d = [];
        let p = [];
        for (let col = 0; col < totalCols; ++col) {
            d.push(Infinity);
            p.push(null);
        }
        distance.push(d);
        parentNodes.push(p);
    }
    distance[src.row][src.col] = 0;
    let q = new Queue();
    q.enqueue(src);
    let pathFound = false;
    let visitedNodes = [];
    while (q.empty() === false) {
        let currSize = q.size();
        let newVisitedNodes = [];
        for (let z = 0; z < currSize; ++z) {
            let curr = q.dequeue();
            if (curr.isDestination === true) {
                pathFound = true;
                break;
            }
            for (let dir = 0; dir < 4; ++dir) {
                let r = curr.row + dx[dir];
                let c = curr.col + dy[dir];
                if (isValid(r, c)) {
                    let adj = grid[r][c];
                    if (adj.isWall === false) {
                        if (distance[r][c] === Infinity) {
                            distance[r][c] = distance[curr.row][curr.col] + 1;
                            newVisitedNodes.push(adj);
                            parentNodes[r][c] = curr;
                            q.enqueue(adj);
                        }
                    }
                }
            }
        }
        if (pathFound === true) break;
        visitedNodes.push(newVisitedNodes);
    }
    let shortestPathNodes = [];
    if (pathFound === true) {
        let end = parentNodes[dst.row][dst.col];
        while (end.isSource !== true) {
            shortestPathNodes.push(end);
            end = parentNodes[end.row][end.col];
        }
    }
    return [distance[dst.row][dst.col], visitedNodes, shortestPathNodes];
};

export default BFS;
