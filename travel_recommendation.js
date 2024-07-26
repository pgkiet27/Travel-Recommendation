//get data from the json
var fetchApi = "travel_recommendation_api.json"
fetch(fetchApi)
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        //do some actions when you type the keyword and click the "search" button
        getSearchKeyword(response)
        //clear the result (beaches, countries, and temples) when you click "clear" button
        clearTheResults()
    })
    .catch((err) => {
        console.log("There is an " + err)
    })

//some methods
//clear results function
function clearTheResults(){
    var clearBtn = document.getElementById("clear-btn")
    clearBtn.addEventListener('click', () => {
        var informationElement = document.getElementsByClassName("information")
        console.log(informationElement)
        informationElement[0].innerHTML = ''
    })
}

//This function will catch the event when you click on "Search" button
//Then it will check the keyword to see if it satisfies the condition. If it does, it will call a function to retrieve the data.
function getSearchKeyword(response){
    var searchBtn = document.getElementById("search-btn")
    searchBtn.addEventListener('click', () => {
        var searchKeyword = document.querySelector(".input > input").value.toLowerCase()
        
        if(searchKeyword == 'country' || searchKeyword == 'countries'){
            returnCountriesValues(response)
            insertStyleForResult()
        }
        else if(searchKeyword == 'temple' || searchKeyword == 'temples'){
            returnTemplesValues(response)
            insertStyleForResult()
        }
        else if(searchKeyword == 'beach' || searchKeyword == 'beaches'){
            returnBeachesValues(response)
            insertStyleForResult()
        }
        else{
            //if it not satisifies, display a message to the user
            insertNoResultNotification()
            insertStyleForResult()
        }
    })
}

//get data about countries
function returnCountriesValues(response){
    var countries = response.countries
    //hàm map trả về danh sách mảng, mỗi lần return là 1 phần tử trong mảng 
    var result = countries.map((country) => {
        var cities = country.cities
        var cities_result = []
        for(let i=0; i<cities.length; i++){
            var content = `
            <div class="dest-result">
                <img src="${cities[i].imageUrl}" alt="">
                <div class="info">
                    <h4>${cities[i].name}</h4>
                    <p>${cities[i].description}</p>
                </div>
                <div class="button"><button>Visit</button></div>
            </div>
            `
            cities_result.push(content)
        }
        return cities_result
    })
    var result1 = result.join("")
    //Call this function to insert to DOM element.
    insertDestinationInformation(result1)
}

//get data about temples
function returnTemplesValues(response){
    var temples = response.temples
    var result = temples.map((temple) => {
        return `
        <div class="dest-result">
            <img src="${temple.imageUrl}" alt="">
            <div class="info">
                <h4>${temple.name}</h4>
                <p>${temple.description}</p>
            </div>
            <div class="button"><button>Visit</button></div>
        </div>
        `
    })
    var result1 = result.join("")
    //Call this function to insert to DOM element.
    insertDestinationInformation(result1)
}

//get data about beaches
function returnBeachesValues(response){
    var beaches = response.beaches
    var result = beaches.map((beach) => {
        return `
        <div class="dest-result">
            <img src="${beach.imageUrl}" alt="">
            <div class="info">
                <h4>${beach.name}</h4>
                <p>${beach.description}</p>
            </div>
            <div class="button"><button>Visit</button></div>
        </div>
        ` 
    })
    var result1 = result.join("")
    //Call this function to insert to DOM element.
    insertDestinationInformation(result1)
}

//insert DOM element
function insertDestinationInformation(dest){
    var informationElement = document.getElementsByClassName("information")
    var noti = `<div class="noti">We find some result...</div>`
    var content = noti + dest
    informationElement[0].innerHTML = content
}


//Insert styles to the data
function insertStyleForResult(){
    var cssStyle = document.querySelector("style")
    var content = `
    .noti{
        background-color: rgb(26, 94, 104);
        color: white;
        padding: 10px;
        font-family: "Roboto";
        font-weight: 600;
        margin-bottom: 10px;
        border-radius: 10px;
    }
    .information{
        margin-top: 50px;
        margin-left: 200px;
        margin-bottom: 40px;
    }
    .dest-result > img{
        width: 500px;
        height: auto;
        border-radius: 10px 10px 0 0;
    }
    .dest-result{
        width: 500px;
        background-color: rgb(255, 255, 255);
        border-radius: 20px;
        font-family: "Roboto";
        margin-bottom: 20px;
    }
    .info{
        margin-left: 15px;
    }
    .info > h4{
        font-size:x-large;
        margin: 20px 0 10px 0;
    }
    .button > button{
        background-color: rgb(26, 94, 104);
        border-width: 0px;
        border-radius: 10px;
        color: white;
        padding: 8px;
        width: 80px;
        margin: 0 0 15px 15px;
    }
    `
    cssStyle.innerHTML = content
}

function insertNoResultNotification(){
    var informationElement = document.getElementsByClassName("information")
    var noti = `<div class="noti">We can't find results relative to the keyword...</div>`
    informationElement[0].innerHTML = noti
}





