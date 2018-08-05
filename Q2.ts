
import { map } from 'ramda'
import * as assert from 'assert'

//Q2.1 BinTree
//BinTree
interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

//Q2.1.1 - TreePreArray
const TreePreArray = (t: BinTree):number[] =>
{
    let toreturn = new Array<number>();
    if(t!=undefined){
        toreturn.push(t.root);
        toreturn=toreturn.concat(TreePreArray(t.left));
        toreturn=toreturn.concat(TreePreArray(t.right));
    }
    return toreturn;
}  

//Q2.1.2 - TreeInArray
const TreeInArray = (t: BinTree):number[] =>
{
    let toreturn = new Array<number>();
    if(t!=undefined){
        toreturn=toreturn.concat(TreeInArray(t.left));
        toreturn.push(t.root);
        toreturn=toreturn.concat(TreeInArray(t.right));
    }
    return toreturn;
}  

//Q2.1.3 - TreePostArray
const TreePostArray = (t: BinTree):number[] =>
{
    let toreturn = new Array<number>();
    if(t!=undefined){
        toreturn=toreturn.concat(TreePostArray(t.left));
        toreturn=toreturn.concat(TreePostArray(t.right));
        toreturn.push(t.root);
    }
    return toreturn;
}

//Tests
let t1 = {root: 1,left: { root:2, left: {root:4} },right: { root:3 }};
let t2 = {root: 5,left: { root:6, left: t1 },right: { root:7 }};
let t3 = {root: 8,left: t2,right: { root:9, left:{root:10}, right:{root:11}}};

assert.deepEqual(TreePreArray(t1), [ 1, 2, 4, 3 ], 'failed')
assert.deepEqual(TreePreArray(t2), [ 5, 6, 1, 2, 4, 3, 7 ], 'failed')
assert.deepEqual(TreePreArray(t3), [ 8, 5, 6, 1, 2, 4, 3, 7, 9, 10, 11 ], 'failed')

assert.deepEqual(TreeInArray(t1), [ 4, 2, 1, 3 ], 'failed')
assert.deepEqual(TreeInArray(t2), [ 4, 2, 1, 3, 6, 5, 7 ], 'failed')
assert.deepEqual(TreeInArray(t3), [ 4, 2, 1, 3, 6, 5, 7, 8, 10 ,9 , 11 ], 'failed')

assert.deepEqual(TreePostArray(t1), [ 4, 2, 3, 1 ], 'failed')
assert.deepEqual(TreePostArray(t2), [ 4, 2, 3, 1, 6, 7, 5 ], 'failed')
assert.deepEqual(TreePostArray(t3), [ 4, 2, 3, 1, 6, 7, 5, 10, 11, 9, 8 ], 'failed')

//GBinTree<T>
interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

//Q2.1.4 - GBinTreePreArray
const GBinTreePreArray = <T>(t: GBinTree<T>):Array<T> =>
{
    let toreturn = new Array<T>();
    if(t==undefined) return toreturn;
    else {
        toreturn.push(t.root);
        toreturn=toreturn.concat(GBinTreePreArray(t.left));
        toreturn=toreturn.concat(GBinTreePreArray(t.right));
    }
    return toreturn;
}  

//Q2.1.5 - GBinTreeInArray
const GBinTreeInArray = <T>(t: GBinTree<T>):Array<T> =>
{
    let toreturn = new Array<T>();
    if(t==undefined) return toreturn;
    else {
        toreturn=toreturn.concat(GBinTreeInArray(t.left));
        toreturn.push(t.root);
        toreturn=toreturn.concat(GBinTreeInArray(t.right));
    }
    return toreturn;
}  

//Q2.1.6 - GBinTreePostArray
const GBinTreePostArray = <T>(t: GBinTree<T>):Array<T> =>
{
    let toreturn = new Array<T>();
    if(t==undefined) return toreturn;
    else {
        toreturn=toreturn.concat(GBinTreePostArray(t.left));
        toreturn=toreturn.concat(GBinTreePostArray(t.right));
        toreturn.push(t.root);
    }
    return toreturn;
}

//Tests
let g1  = {root: 'this',left: { root:'is', left: {root:'a'} },right: { root:'string', right:{root:'array'}}};
let g2  = {root: 1,left: { root:2, left: {root:3} },right: { root:4, right:{root:5, left:{root:6}, right:{root:7}}}};
let g3  = {root: 'a',left: { root:'b', left: {root:'c'} },right: { root:'d', right:{root:'e'}}};

assert.deepEqual(GBinTreePreArray(g1), [ 'this', 'is', 'a', 'string', 'array' ], 'failed')
assert.deepEqual(GBinTreePreArray(g2), [ 1, 2, 3, 4, 5, 6, 7 ], 'failed')
assert.deepEqual(GBinTreePreArray(g3), [ 'a', 'b', 'c', 'd', 'e' ], 'failed')

assert.deepEqual(GBinTreeInArray(g1), [ 'a', 'is', 'this', 'string', 'array' ], 'failed')
assert.deepEqual(GBinTreeInArray(g2), [ 3, 2, 1, 4, 6, 5, 7 ], 'failed')
assert.deepEqual(GBinTreeInArray(g3), [ 'c', 'b', 'a', 'd', 'e' ], 'failed')

assert.deepEqual(GBinTreePostArray(g1), [ 'a', 'is', 'array', 'string', 'this' ], 'failed')
assert.deepEqual(GBinTreePostArray(g2), [ 3, 2, 6, 7, 5, 4, 1 ], 'failed')
assert.deepEqual(GBinTreePostArray(g3), [ 'c', 'b', 'e', 'd', 'a' ], 'failed')

//Q2.2 Subsets
//Q2.2.1 KSubsets
const KSubsetshelper = <T>(arr:T[],k:number,i:number,subarr:T[],toreturn:Array<T[]>):
Array<T[]> =>{
    if(k==0) {
        toreturn.push(subarr);
    } 
    else if(i<arr.length && k>0 && k<arr.length) {
        KSubsetshelper(arr,k-1,i+1,subarr.concat(arr[i]),toreturn);
        KSubsetshelper(arr,k,i+1,subarr,toreturn);
    }
    return toreturn; 
}

const KSubsets = <T>(arr:T[],k:number):Array<T[]> =>{
        if(k>=arr.length)
            return [];

        if(k==0) 
            return [[]];

        if(k==arr.length) 
            return [arr];

        return KSubsetshelper(arr,k,0,new Array<T>(),new Array<T[]>());
}

//Q2.2.2 AllSubsets
const AllSubsets = <T>(arr: T[]):Array<T[]> =>{
    let toreturn = [[]];
    for(let i=1;i<=arr.length;i++)
        toreturn = toreturn.concat(KSubsets(arr,i));
    return toreturn;
}

//Tests
let s1 = [1,2,3];
let s2 = ['a','b','c','d'];
let s3 = ['sunflower','rose','hibiscus','viola'];

assert.deepEqual(KSubsets(s1,0), [ [] ], 'failed')
assert.deepEqual(KSubsets(s1,2), [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ], 'failed')
assert.deepEqual(KSubsets(s2,4), [], 'failed')
assert.deepEqual(KSubsets(s2,1), [ [ 'a' ], [ 'b' ], [ 'c' ], [ 'd' ] ], 'failed')

assert.deepEqual(AllSubsets(s1), [ [], [ 1 ], [ 2 ], [ 3 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ], 'failed')
assert.deepEqual(AllSubsets(s2), [ [],[ 'a' ],[ 'b' ],[ 'c' ],[ 'd' ],[ 'a', 'b' ],[ 'a', 'c' ],[ 'a', 'd' ],
    [ 'b', 'c' ],[ 'b', 'd' ],[ 'c', 'd' ],[ 'a', 'b', 'c' ],[ 'a', 'b', 'd' ],[ 'a', 'c', 'd' ],[ 'b', 'c', 'd' ] ], 'failed')
assert.deepEqual(AllSubsets(s3), [ [],[ 'sunflower' ],[ 'rose' ],[ 'hibiscus' ],[ 'viola' ],[ 'sunflower', 'rose' ],
    [ 'sunflower', 'hibiscus' ],[ 'sunflower', 'viola' ],[ 'rose', 'hibiscus' ],[ 'rose', 'viola' ],[ 'hibiscus', 'viola' ],
    [ 'sunflower', 'rose', 'hibiscus' ],[ 'sunflower', 'rose', 'viola' ],[ 'sunflower', 'hibiscus', 'viola' ],[ 'rose', 'hibiscus', 'viola' ] ], 'failed')

//Q2.3 Flatmap
//Q2.3.1 Flatmap Definition
const flatmap = <T>(func,arr):Array<T> => {
    let toreturn = new Array<T>();
    for(let i=0;i<arr.length;i++){
        toreturn=toreturn.concat(func(arr[i]));  
    }
    return toreturn;
}

//Tests
assert.deepEqual(flatmap((x)=>x[0], [[[1,2], [3,4]], [[5,6], [7,8]]]), [ 1, 2, 5, 6 ], 'failed')
assert.deepEqual(flatmap((x)=>x-1, [1,2,3,4,5,6,7,8,9,10]), [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 'failed')
assert.deepEqual(flatmap((x)=>['->'].concat(x), [['a'],['b','b'],['c','c','c'],['d','d','d','d']]),
    [ '->', 'a', '->', 'b', 'b', '->', 'c', 'c', 'c', '->', 'd', 'd', 'd', 'd' ], 'failed')

//Q2.3.2 Using Flatmap
interface movie{
    name:string;
    videos:Array<video>;
}

interface video{
    id:number;
    title:string;
    boxarts:Array<boxart>;
    url:string;
    rating:number;
    bookmark:Array<{id:number,time:number}>;
}

interface boxart{
    width: number;
    height: number;
    url: string;
}

interface boxartToreturn{
    id:number;
    title:string;
    boxart:string;
};

//getBoxArts() implementation
const getBoxArts = (movielist:Array<movie>):Array<boxartToreturn> => {
    let toreturn: boxartToreturn[] = flatmap((x)=>x.videos.map((video)=>({id: video.id, title: video.title,
         boxart: (video.boxarts.filter((boxart)=>boxart.width === 150 && boxart.height === 200)).map((a)=>a.url)})), movielist);

    return toreturn;

}

//Tests
let movieLists1 = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];

let movieLists2 = [
    {
        name: "Marvel",
        videos : [
            {
                "id": 100001,
                "title": "Guardians of the Galaxy",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Guardians of the Galaxy200.jpg" },
                    { width: 250, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Guardians of the Galaxy250.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 100002,
                "title": "The Avengers",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheAvengers200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheAvengers150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "Disney",
        videos: [
            {
                "id": 100003,
                "title": "Tangled",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Tangled150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 100004,
                "title": "Moana",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Moana200.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Moana150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Moana300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            },
            {
                "id": 100005,
                "title": "Frozen",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Frozen200.jpg" },
                    { width: 250, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Frozen250.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Frozen300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];

let movieLists3 = [
    {
        name: "Drama",
        videos : []
    },
    {
        name: "Comedy",
        videos: [
            {
                "id": 1111111,
                "title": "The Hangover",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheHangover150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheHangover200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            }
        ]
    }
];


assert.deepEqual(getBoxArts(movieLists1), [ { id: 70111470,
    title: 'Die Hard',
    boxart: [ 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' ] },
  { id: 654356453,
    title: 'Bad Boys',
    boxart: [ 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' ] },
  { id: 65432445,
    title: 'The Chamber',
    boxart: [ 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' ] },
  { id: 675465,
    title: 'Fracture',
    boxart: [ 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' ] } ], 'failed')

assert.deepEqual(getBoxArts(movieLists2), [ { id: 100001, title: 'Guardians of the Galaxy', boxart: [] },
{ id: 100002,
  title: 'The Avengers',
  boxart: [ 'http://cdn-0.nflximg.com/images/2891/TheAvengers150.jpg' ] },
{ id: 100003,
  title: 'Tangled',
  boxart: [ 'http://cdn-0.nflximg.com/images/2891/Tangled150.jpg' ] },
{ id: 100004, title: 'Moana', boxart: [] },
{ id: 100005, title: 'Frozen', boxart: [] } ], 'failed')

assert.deepEqual(getBoxArts(movieLists3), [ { id: 1111111,
    title: 'The Hangover',
    boxart: [ 'http://cdn-0.nflximg.com/images/2891/TheHangover150.jpg' ] } ], 'failed')





