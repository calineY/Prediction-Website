let submit_btn=document.getElementById("submit");
let input=document.getElementById("name");
let result=document.getElementById("response");

submit_btn.addEventListener("click",()=>{
    let name=input.value;
    if(!name){
        result.textContent="Please enter a name first.";
    }
    else{
        getGender(name);
    }
});
async function getGender(name){
    const response=await fetch("https://api.genderize.io?name="+name);
    const gender=await response.json();
    result.textContent=gender.gender;
}


async function getDogPic(){
    const response= await fetch("https://dog.ceo/api/breeds/image/random");
    const img=await response.json();
    document.getElementById("dogImage").src=img.message;
}

getDogPic();