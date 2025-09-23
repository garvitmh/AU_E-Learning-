//default parmiterized function

//normal function
// function greet(){ //function declaration
//     console.log("Good morning");
// }
// greet(); //function call ,function invoc
// greet();

//function expression ,Anonymous function
// let greet = function(){
//     console.log("Good morning");
// }
// greet();

// function sumOfTwoNumbers (a,b){
//     console.log(a+b);
// }
// sumOfTwoNumbers(10,20);
// sumOfTwoNumbers(1,9)

//default parametrized function
// function sumOfTwoNumbers (a = 0,b = 0,c = 0,d = 0){
//     console.log(a+b);//30
//     console.log(c,d) // c =  undefined, d = undefined
//     console.log(a+b+c+d); //NaN (30)
// }
// sumOfTwoNumbers(10,20,90);

// Rest parametrized function
// (...c ==> rest parameter)
// function sumOfTwoNumbers (a,b,...c){
//   console.log(a+b);
//   console.log(c); //[90,11,80]
// //   console.log(c[1]);
// }
// sumOfTwoNumbers(10,20,90,11,80);

//return keyword
//return type function
// function square(num){
// let res = num*num;
// return res;
// }

// console.log(square(10));
// let data = square(10);
// console.log(data)

// let greet = ()=>{
//     console.log("Good morning");
// }
// greet();

// let greet = name =>console.log(name +" Good morning");

// greet("Dinga");

// let greet = name =>{
//     return (name +" Good morning");
// }

// console.log(greet("Dinga"));

// let greet = name =>(name +" Good morning");
// console.log(greet("Dinga"));

// let a = [10, 20, 30, 40, 50];
// let sum = 0;
// function sumOfArray(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     sum = sum + arr[i];
//   }
//   return sum;
// }
// console.log(sumOfArray(a));

// let users = [
//   {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   },
//   {
//     "userId": 1,
//     "id": 2,
//     "title": "qui est esse",
//     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//   },
//   {
//     "userId": 1,
//     "id": 3,
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
//   },
//   {
//     "userId": 1,
//     "id": 4,
//     "title": "eum et est occaecati",
//     "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
//   },
//   {
//     "userId": 1,
//     "id": 5,
//     "title": "nesciunt quas odio",
//     "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
//   },
//   {
//     "userId": 1,
//     "id": 6,
//     "title": "dolorem eum magni eos aperiam quia",
//     "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
//   },
//   {
//     "userId": 1,
//     "id": 7,
//     "title": "magnam facilis autem",
//     "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
//   },
//   {
//     "userId": 1,
//     "id": 8,
//     "title": "dolorem dolore est ipsam",
//     "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
//   },
//   {
//     "userId": 1,
//     "id": 9,
//     "title": "nesciunt iure omnis dolorem tempora et accusantium",
//     "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
//   },
//   {
//     "userId": 1,
//     "id": 10,
//     "title": "optio molestias id quia eum",
//     "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
//   }
// ]
// function user(person) {
//   for (let i = 0; i < person.length; i++) {
    // console.log(person[i].id)
//    console.log(person[i].title)
//   }
// }
// user(users)



// let myFunc = ()=>{
//     console.log("this is myFunc");
// }
// let hello = (callback)=>{ 
//     console.log("this is hello function");
//     callback();
// }
// hello(myFunc);


// let myFunc = ()=>{
//     console.log("this is myFunc");
//     return 100000;
// }
// let hello = (callback)=>{ 
//     console.log("this is hello function");
//    console.log( callback());
//     let newFunc = ()=>{
//         console.log("this is newFunc")
//         return "helo............."
//     }
//     return newFunc;
// } 
// let HOF = hello(myFunc);
// console.log(HOF());



// IIFE (Immediate invoke function expression)

// (function greet(){
//     console.log("Good morning");
// })();


// function inside function


// function outer(){
//    let a = 500; 
//     console.log("this is outer function");
//     function inner(){
//         console.log("this is inner function");
//         console.log(a);
//     }; 
//     inner();  
// };
// outer();

