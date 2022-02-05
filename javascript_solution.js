let submit_btn=document.getElementById("submit");
let input=document.getElementById("name");
let result=document.getElementById("response");

submit_btn.addEventListener("click",()=>{
    let name=input.value;
    if(!name){
        result.textContent="Please enter a name first.";
    }
    else{
        getGender(name,getAge);
    }
});

async function getGender(name, nextFunction){
    const response=await fetch("https://api.genderize.io?name="+name);
    const gender=await response.json();
    result.innerHTML="Gender: "+ gender.gender;
    nextFunction(name,getNationality);
}
async function getAge(name,getNationality){
    const response=await fetch("https://api.agify.io/?name="+name);
    const age=await response.json();
    result.innerHTML+="<br>Age: "+ age.age;
    getNationality(name);
}
async function getNationality(name){
    const response=await fetch("https://api.nationalize.io/?name="+name);
    const country=await response.json();
    const country_codes=await country.country;
    result.innerHTML+="<br>Country: ";
    country_codes.map(function (code){
        result.innerHTML+=code.country_id+" ";
    });
}
    
async function getDogPic(){
    const response= await fetch("https://dog.ceo/api/breeds/image/random");
    const img=await response.json();
    document.getElementById("dogImage").src=img.message;
}

getDogPic();