const [totalRows, totalCols] = [20, 30];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const isValid = (r, c) => {
    return r >= 0 && c >= 0 && r < totalRows && c < totalCols;
};

const BellmanFord = (grid, src, dst) => {
    let distance = [];
    let parentNodes = [];
    let w = [];
    for (let row = 0; row < totalRows; ++row) {
        let d = [];
        let p = [];
        let tmp = [];
        for (let col = 0; col < totalCols; ++col) {
            d.push(Infinity);
            p.push(null);
            tmp.push(grid[row][col].weight);
        }
        distance.push(d);
        parentNodes.push(p);
        w.push(tmp);
    }
    w[src.row][src.col] = w[dst.row][dst.col] = 0;
    distance[src.row][src.col] = 0;
    let relaxedNodes = [];
    for (let count = 0; count < totalRows * totalCols; ++count) {
        let flag = false;
        let relaxed = [];
        for (let i = 0; i < totalRows; ++i) {
            for (let j = 0; j < totalCols; ++j) {
                let curr = grid[i][j];
                let x = curr.row,
                    y = curr.col;
                if (curr.isWall === false && distance[x][y] !== Infinity) {
                    for (let dir = 0; dir < 4; ++dir) {
                        let r = x + dx[dir];
                        let c = y + dy[dir];
                        if (isValid(r, c)) {
                            if (grid[r][c].isWall === false) {
                                if (distance[r][c] > distance[x][y] + w[r][c]) {
                                    distance[r][c] = distance[x][y] + w[r][c];
                                    flag = true;
                                    relaxed.push(grid[r][c]);
                                    parentNodes[r][c] = curr;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (flag === false) break;
        relaxedNodes.push(relaxed);
    }
    let shortestPathNodes = [];
    if (distance[dst.row][dst.col] !== Infinity) {
        let end = parentNodes[dst.row][dst.col];
        while (end.isSource !== true) {
            shortestPathNodes.push(end);
            end = parentNodes[end.row][end.col];
        }
    }
    return [distance[dst.row][dst.col], relaxedNodes, shortestPathNodes];
};

export default BellmanFord;
