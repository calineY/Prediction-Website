let submit_btn=$("#submit");
let input=$("#name");
let result=$("#response");
let gender="";
let age="";
let country_codes;
const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

getDogPic();
function getDogPic(){
    $.ajax({
        type: 'GET',
        url: 'https://dog.ceo/api/breeds/image/random',
        success: function(img){
            $("#dogImage").attr('src',img.message);
        } 
    });
}
submit_btn.on("click",()=>{
    let name=input.val();
    if(!name){
        result.text("Please enter a name first.");
    }
    else{
        result.html("&#10024; Predicting &#10024;");
        getGender(name,getAge);
    }
});
input.keyup(function(event) {
    if (event.key === 'Enter') {
        submit_btn.click();
    }
});
function print(){
    result.html("Gender: "+ gender);
    result.append("<br>Age: "+ age);
    result.append("<br>Country: ");
    country_codes.map(function (country){
        result.append(regionNames.of(country.country_id)+" ");
    });
}
function getGender(name,getAge){
    $.ajax({
        type: 'GET',
        url: 'https://api.genderize.io?name='+name,
        success: function(name_gender){
            gender=name_gender.gender;
            getAge(name,getNationality);
        } 
    });
}

function getAge(name,getNationality){
    $.ajax({
        type: 'GET',
        url: 'https://api.agify.io/?name='+name,
        success: function(name_age){
            age=name_age.age;
            getNationality(name);
        } 
    });
}

function getNationality(name){
    $.ajax({
        type: 'GET',
        url: 'https://api.nationalize.io/?name='+name,
        success: function(name_countries){
            country_codes=name_countries.country;
            print();
        } 
    });
}
