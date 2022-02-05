let submit_btn=document.getElementById("submit");
let input=document.getElementById("name");
let result=document.getElementById("response");
let gender;
let age;
let country_codes;
const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

getDogPic();
submit_btn.addEventListener("click",()=>{
    let name=input.value;
    if(!name){
        result.textContent="Please enter a name first.";
    }
    else{
        result.innerHTML="Processing..."
        getGender(name,getAge);
    }
});
function print(){
    result.innerHTML="Gender: "+ gender.gender;
    result.innerHTML+="<br>Age: "+ age.age;
    result.innerHTML+="<br>Country: ";
    country_codes.map(function (code){
        result.innerHTML+=regionNames.of(code.country_id)+" ";
    });
}
async function getGender(name, getAge){
    const response=await fetch("https://api.genderize.io?name="+name);
    gender=await response.json();
    //result.innerHTML="Gender: "+ gender.gender;
    getAge(name,getNationality);
}
async function getAge(name,getNationality){
    const response=await fetch("https://api.agify.io/?name="+name);
    age=await response.json();
    //result.innerHTML+="<br>Age: "+ age.age;
    getNationality(name);
}
async function getNationality(name){
    const response=await fetch("https://api.nationalize.io/?name="+name);
    const country=await response.json();
    country_codes=country.country;
    print();
}
async function getDogPic(){
    const response= await fetch("https://dog.ceo/api/breeds/image/random");
    const img=await response.json();
    document.getElementById("dogImage").src=img.message;
}

