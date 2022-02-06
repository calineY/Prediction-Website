let submit_btn=document.getElementById("submit");
let input=document.getElementById("name");
let result=document.getElementById("response");
let gender;
let age;
let country_codes;
const regionNames = new Intl.DisplayNames(['en'], {type: 'region'}); //used to get country name from country code


async function getDogPic(){
    const response= await fetch("https://dog.ceo/api/breeds/image/random");
    const img=await response.json();
    document.getElementById("dogImage").src=img.message; //display random dog image from api
}

getDogPic();

submit_btn.addEventListener("click",()=>{
    let name=input.value;
    if(!name){
        result.textContent="Please enter a name first.";
    }
    else{
        result.innerHTML="&#10024; Predicting &#10024;"  //emojis //this message will be displayed while getting data
        getGender(name,getAge);   //get gender then get age
    }
});

input.addEventListener("keyup", function(event) {  //to make the Enter key click submit
    if (event.key === 'Enter') {
        submit_btn.click();
    }
});

async function getGender(name, getAge){
    const response=await fetch("https://api.genderize.io?name="+name);
    gender=await response.json();
    getAge(name,getNationality); //call function get age after get gender is done
} 

async function getAge(name,getNationality){
    const response=await fetch("https://api.agify.io/?name="+name);
    age=await response.json();
    getNationality(name); //call function get nationality after get age is done
}

async function getNationality(name){
    const response=await fetch("https://api.nationalize.io/?name="+name);
    const country=await response.json();
    country_codes=country.country;
    print();  //will display data at once
}

function print(){
    result.innerHTML="Gender: "+ gender.gender;
    result.innerHTML+="<br>Age: "+ age.age;
    result.innerHTML+="<br>Country: ";
    country_codes.map(function (code){  
        result.innerHTML+=regionNames.of(code.country_id)+" "; //display country names of each country code
    });
}


