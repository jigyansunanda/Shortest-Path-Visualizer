const [totalRows, totalCols] = [20, 30];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const isValid = (r, c) => {
    return r >= 0 && c >= 0 && r < totalRows && c < totalCols;
};

const getIndex = (r, c) => {
    return r * totalCols + c;
};

const getRowCol = (index) => {
    let r = Math.floor(index / totalCols);
    let c = index - r * totalCols;
    return [r, c];
};

const FloydWarshall = (grid, src, dst) => {
    let w = [];
    for (let row = 0; row < totalRows; ++row) {
        let tmp = [];
        for (let col = 0; col < totalCols; ++col) {
            tmp.push(grid[row][col].weight);
        }
        w.push(tmp);
    }
    w[src.row][src.col] = w[dst.row][dst.col] = 0;
    /*
    Number of rows = number of columns = 600 (total possible vertices).

    childNode[][]: to keep track of child Node of Nodes included in the shortest path 
    from source to destination. 

    childNode[a][b]: first intermediate Node in shortest path from Node a to Node b.

    Initialize:
    childNode[a][b] = -1 (if no edge connecting from Node a to Node b)
    childNode[a][b] = b (if b is adjacent reachable Node from Node a)

    Update:
    childNode[a][b] = childNode[a][c] (if distance[a][b] > distance[a][c] + distance[c][b])
    */
    let childNode = [];
    for (let i = 0; i < totalRows * totalCols; ++i) {
        childNode.push(new Array(totalRows * totalCols));
    }
    /*
    distance[][]: number of rows = number of cols = 600 (total possible vertices)

    Initialize:
    distance[i][j] = Infinity (if no edge connecting from Node i to Node j)
    distance[i][j] = weight of edge connecting from Node i to Node j
    */
    let distance = [];
    for (let i = 0; i < totalRows * totalCols; ++i) {
        distance.push(new Array(totalRows * totalCols));
    }
    /* fill distance[][] and childNode[][] */
    for (let row = 0; row < totalRows; ++row) {
        for (let col = 0; col < totalCols; ++col) {
            let index = getIndex(row, col);
            for (let k = 0; k < totalRows * totalCols; ++k) {
                if (k === index) {
                    distance[index][k] = 0;
                } else {
                    distance[index][k] = Infinity;
                    childNode[index][k] = -1;
                }
            }
            if (grid[row][col].isWall === false) {
                for (let dir = 0; dir < 4; ++dir) {
                    let x = row + dx[dir];
                    let y = col + dy[dir];
                    if (isValid(x, y)) {
                        if (grid[x][y].isWall === false) {
                            let nextIndex = getIndex(x, y);
                            distance[index][nextIndex] = grid[x][y].weight;
                            childNode[index][nextIndex] = nextIndex;
                        }
                    }
                }
            }
        }
    }
    let visitedNodes = [];
    for (let k = 0; k < totalRows * totalCols; ++k) {
        let [x, y] = getRowCol(k);
        let middle = grid[x][y];
        if (middle.isWall === true) continue;
        visitedNodes.push([middle]);
        for (let i = 0; i < totalRows * totalCols; ++i) {
            if (distance[i][k] === Infinity) continue;
            let [startx, starty] = getRowCol(i);
            if (grid[startx][starty].isWall === true) continue;
            for (let j = 0; j < totalRows * totalCols; ++j) {
                if (distance[k][j] === Infinity) continue;
                let [endx, endy] = getRowCol(j);
                if (grid[endx][endy].isWall === true) continue;

                // dp
                if (distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j];
                    childNode[i][j] = childNode[i][k];
                }
            }
        }
    }
    let a = getIndex(src.row, src.col);
    let b = getIndex(dst.row, dst.col);
    let minPathLength = distance[a][b] - dst.weight;
    let shortestPathNodes = [];
    while (a !== b) {
        let [x, y] = getRowCol(a);
        if (
            grid[x][y].isSource === false &&
            grid[x][y].isDestination === false
        ) {
            shortestPathNodes.push(grid[x][y]);
        }
        a = childNode[a][b];
    }
    return [minPathLength, visitedNodes, shortestPathNodes];
};

export default FloydWarshall;
