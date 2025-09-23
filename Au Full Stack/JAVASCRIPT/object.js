let name = prompt("Enter Key")
let nameValue = prompt("Enter your name")


let  obj = {
    name: "john",
    age:21,
    email:"john@gmail.com"
}
let {firstname,age,email} = obj

// for(let key in obj){
//     console.log(key,obj[key])
// }

for(let vlaue of Object.keys(obj)){
    console.log(obj[key]);
}
console.log(obj);
console.log(obj["name"]);
console.log(obj["age"]);
