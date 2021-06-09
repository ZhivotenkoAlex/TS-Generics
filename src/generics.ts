// Концепция "Аргумент Тип"
// дженерик-функция с одним параметром
const reverse = <T>(array: T[]): T[] => {
    return [...array].reverse();
}

console.log(reverse([1,2,3,4,5]));
console.log(reverse<string>(['dan', 'fan', 'zen', 'pen']));
//можно явно присваивать тип при вызове, но ТС почти всегда сам справляется.
console.log(reverse([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }]));

// дженерик-функция с несколькими параметрами

const isEqual = <T,Y> (a:T, b:Y) => {
    return Object.is(a,b)
}

console.log(isEqual(3,3));
console.log(isEqual(3,"3"));

const makeArray = <A,B>(a:A, b:B) => {
    return [a, b];
}
//for function declaration

function add<A, B>(a: A, b: B) {
    return `${a}+${b}`
}

console.log(add(5,"dan"));

console.log(makeArray(3,3));
console.log(makeArray(3,"3"));

const fn =<N,R> (multiply:N, ...rest:R[]) => {
    return
}

console.log(fn(2,[1,2,3]));
console.log(fn(3,[1,2,3]));

//Generic with objects

// extends-ключевое слово указывающее какое свойство должно быть у принимаемого объекта

const logLength =<T extends {length:number}> (arg:T) => {
    console.log(arg.length);   
}

// or through the interface
interface ILength{
    length:number
}


const logLength1 =<T extends ILength> (arg:T) => {
    console.log(arg.length);   
}


console.log(logLength([1,2,3,4,5,6]));
console.log(logLength("Dog"));
console.log(logLength1("5"));

interface Iname{
    firstname: string;
    lastname: string;
}

const addFullName =<T extends Iname> (person:T) => {
    return {
        ...person,
        fullname: `${person.firstname} ${person.lastname}`,
    };
};

console.log(addFullName({
    firstname: 'Eddie',
    lastname:"Murphy"
}));
console.log(addFullName({
    firstname: 'Eddie',
    lastname: "Murphy",
    age:52
}));

//generic interface

interface User<X>{
    id:X ;
}

const mango:User<number>={id:24}
const poly:User<string>={id:"fackoff"}

console.log(mango,poly);

interface Tab<X>{
    id: string;
    position: number;
    active: boolean;
    content:X
}
type TString = Tab <string>;
type TStringArr = Tab <string[]>;


const tab1:TString = {
     id: "id-1",
    position: 1,
    active: false,
    content: "Tab data"
}
const tab2:TStringArr= {
     id: "id-2",
    position: 1,
    active: true,
    content: ["Tab data","args"]
}

console.log(tab1,tab2)

type TAnimation = 'playing' | 'paused';
type THttpState = 'request' | 'success'| 'error';

const makeState = <S>(initialState:S) => {
    let state = initialState;

    const getState = () => {
        return state
    }

    const setState = (newState:S) => {
        state = newState;
    }

    return {
        getState,
        setState
    };
};

const animationState = makeState<TAnimation>('playing');
animationState.setState("paused");
// animationState.setState("request"); //ошибка



const HttpState=makeState<THttpState>('success')
// HttpState.setState("paused"); //ошибка
HttpState.setState("request");

// Classes

class State<S>{
    private state:S;
    constructor(initialState: S) {
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    setState(newState: S) {
        this.state=newState
    }
}

const animationState1 = new State<TAnimation>('playing');
const httpState1 = new State<THttpState>('success');

console.log(animationState1,httpState1);

// DOM
// уточнение типов
const link = document.querySelector("a") as HTMLAnchorElement;

console.log(link.href);

link.addEventListener('click', (evt) => {
    const target=evt.currentTarget as EventTarget
    console.log(target);
})



























































export{}