console.log("START")
setTimeout(() => {
    console.log("inside timer") 
},0);
new Promise((resolve,reject)=>{
    if(true){
        resolve("resolved");

    }
    else{
        reject("rejected");
    }
})
.then((data)=>{console.log(data)})
.catch((err)=>{console.log(err)})
console.log("end")