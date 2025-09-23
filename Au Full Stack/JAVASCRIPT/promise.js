let h1 = document.querySelector("#head1");
let h2 = document.querySelector("#head2");
let h3 = document.querySelector("#head3");
let h4 = document.querySelector("#head4");
let h5 = document.querySelector("#head5");
let h6 = document.querySelector("#head6");

function change(ele, text, color, time){
    return new Promise((resolve, reject) => {
        if (ele){
            setTimeout(() => {
                ele.textContent = text;
                ele.style.color = color;
                resolve();
            })
        }
    })
}