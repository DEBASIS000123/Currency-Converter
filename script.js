const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns=document.querySelectorAll(".dropdown  select");
const btn=document.querySelector(".button button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".ans p");

for(let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.id==="from" && code==="USD"){
            newOption.selected="selected";
        }
        else if(select.id==="to" && code==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let curCode=element.value;
    let countryCode=countryList[curCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amt=document.querySelector(".amount input");
    let amtval=amt.value;
   
    if(amtval=="" ||amtval<1){
        amtval=1;
    }
    
    let URL=`${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalamt=rate*amtval;

    msg.innerText=`${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;

});