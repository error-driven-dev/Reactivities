let data = 42;
data = 'beth'


//workaround -- assign it to the any/object type
let anyData: any = 42; //this is efficitively turning it into javascript
anyData = 'beth'


//setting multiple types -- the | pipe means union
let multiData: number | string = 42;
multiData = 'beth'

//uses duck typing meaning equality is based on type and methods of an object


//creating a type
export interface Duck{ 
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
//layeggs is made options by the '?'; avoid useingd
    layEggs?: (batch: number) => void;
}

//creating an instance of object that conforms to the Duck interface and sets the values, implements the function-- can be used anywhere that a Duck type is required
const duck1: Duck = {
    name: 'beth',
    numLegs: 2,
    makeSound: (sound: string) => console.log( sound + ' ' + sound)


}

const duck2: Duck = {
    name: 'beth',
    numLegs: 2,
    makeSound: (sound: string) => console.log( sound + ' ' + sound)


}
//calling functions of the instance
duck1.makeSound('bark');
duck1.name = 'huey';
duck1.layEggs(5); // intellisence should flag this
duck2.layEggs!(5); // using bang operator should resolve type safety flag; avoid using

export const ducks = [duck1, duck2]


