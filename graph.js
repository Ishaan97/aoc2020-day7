class Vertex{
    data;
    connectedTo;
    count;
    constructor(key){
        this.data = key;
        this.connectedTo = new Map();
        this.count = -1;
    }

    addNeighbor(nerighbor, weight=0){
        this.connectedTo.set(nerighbor, weight);
    }

    getConnections(){
        return this.connectedTo.keys();
    }

    getData(){
        return this.data;
    }

    getWeight(neighbor){
        return this.connectedTo[neighbor]
    }
}

class Graph{
    static totalV = 0;
    vertexList;
    constructor(){
        this.vertexList = new Map();
    }

    addVertex(key){
        if(this.vertexList.has(key)){
            return null;
        }

        Graph.totalV += 1;
        let node = new Vertex(key)
        this.vertexList.set(key, node);
        return node;
    }

    addEdge(src, dst, wt =0){
        this.vertexList.get(src).addNeighbor(this.vertexList.get(dst), wt)
    }

    getEdges(){
        for(let key of this.vertexList.keys()){
            for (let con of this.vertexList.get(key).getConnections()){
                console.log(this.vertexList.get(key).getData()+"-->"+con.getData());                
            }
        }
    }

    getVertex(key){
        if(this.vertexList.has(key)){
            return this.vertexList.get(key)
        }
        return null;
    }

    getVertices(){
        return this.vertexList.keys();
    }

    DFS(start){
        let visited = []
        if(this.vertexList.has(start)){
            visited = this.DFSUtility(start, visited)
            return visited;
        }
        console.log("Start Node Not Found");
        return null;
    }
    DFSUtility(vertex, visited=[]){
        visited.push(vertex);

        for(let i of this.vertexList.get(vertex).getConnections()){
            if(!visited.includes(i.getData()))
            {
                this.DFSUtility(i.getData(), visited )
            }
            
        }
        return visited;
    }
    DFS2(start){
        if(this.vertexList.has(start)){
            let count = this.DFSUtility2(start)
            return count;
        }
        console.log("Start Node Not Found");
        return null;
    }

    DFSUtility2(vertex){
        const node = this.vertexList.get(vertex);
        if (vertex.count > -1){
            return vertex.count;
        }
        let count = 1;
        for(let i of this.vertexList.get(vertex).getConnections()){
            let wt = this.vertexList.get(vertex).connectedTo.get(i)
            count = count + wt*this.DFSUtility2(i.getData())
        }
        node.count = count;
        return count
    }
}

module.exports = {Graph}