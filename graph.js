/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    // console.log("SPREAD", ...vertexArray)
    for (const node of vertexArray) {
      this.nodes.add(node)
    }

  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (const neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
   }

  /** traverse graph with DFS and returns array of Node values */
  // depthFirstSearch(start) {
  //   const toVisitStack = [start];
  //   const seen = new Set(toVisitStack);
  //   const visited = [];

  //   while (toVisitStack.length) {
  //     const current = toVisitStack.pop();
  //     visited.push(current.value);

  //     for (const neighbor of current.adjacent) {
  //       if (!seen.has(neighbor)) {
  //         toVisitStack.push(neighbor);
  //         seen.add(neighbor);
  //       }
  //     }
  //   }
  //   return visited;
  //  }

  // seen = {A, B, C}
  // start =
  // visited = []


  // Call stack:








  // depthFirstSearch(C, seen = {A, B}) -- visited = [C]
  // depthFirstSearch(B, seen = {A}) --- visted = [C, B]
  // depthFirstSearch(A, seen) --- visited = [C, B, A]

     /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen = new Set()) {
    let visited = [];
    const current = start;

    seen.add(current);

    for (let neighbor of current.adjacent) {
      if (!seen.has(neighbor)) {
        visited = [...this.depthFirstSearch(neighbor, seen)];
      }
    }
    visited.push(current.value);
    return visited;
   }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const seen = new Set(toVisitQueue);
    const visited = [];

    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      visited.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }

      }
    }
    return visited;
   }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { }
}

module.exports = { Graph, Node }
