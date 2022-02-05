async function getDogPic(){
    const response= await fetch("https://dog.ceo/api/breeds/image/random");
    const img=await response.json();
    document.getElementById("dogImage").src=img.message;
}

getDogPic();