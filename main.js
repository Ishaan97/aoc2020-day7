const readFile = require('fs').readFileSync;
const {Graph} = require("./graph");

const g = new Graph();
let inputs = []

const file = readFile('input.txt', 'utf-8').split("\n").forEach(data=>{
    inputs.push(data.trim())
})

const map = new Map();

function preprocessData(rule){
    // Single data 
    // plaid indigo bags contain 1 pale violet bag, 4 mirrored violet bags.
    // {
    //     mainKey: 'plaid indigo',
    //     allValues: [
    //       { key: 'pale violet', value: '1' },
    //       { key: 'mirrored violet', value: '4' }
    //     ]
    //  }
    //
    // Returns Main Key and the list of values

    let [mainKey, mainValue] = rule.split("bags contain").map(data=> data.trim())

    values = mainValue.split(",")
    allValues = []
    for(let v of values)
    {
        v = v.trim();
        if(Number.isInteger(parseInt(v[0])))
        {
            v = v.split("bag")[0];
            v = v.split(" ")
            let key = v.slice(1).join(" ").trim()
            let value = v[0]
            allValues.push({key, value})
        }
    }
    return {mainKey, allValues}
}

function processData(rules){
    for(let i=0;i<rules.length;i++){
        data = preprocessData(rules[i]);
        let key = data.mainKey;
        let values = data.allValues;

        let array = [];
        for(let value of values){
            array.push(value);
        }
        map.set(key, array)
    }
}

function createGraph(){
    for(let key of map.keys()){
        g.addVertex(key)
    }

    map.forEach((arrayValue, key)=>{
        for(let value of arrayValue){
            g.addEdge(key, value.key, value.value);
        }
    })
}
function solve1(){
    let totalCount = 0
    // for(let key of g.getVertices()){
    //     console.log(g.getVertex(key));
    // }
    for(let key of g.getVertices()){
        let visited = g.DFS(key);
        if(visited.includes("shiny gold")){
            totalCount+=1
        }
    }
    console.log(totalCount-1) // subtracting 1 for when shiny gold is the start

}

function solve2(){
    let start = "shiny gold";
    let visited = g.DFS(start)
    console.log(g.DFS2(start)-1)
}

processData(inputs);
createGraph();
solve1();
solve2()

