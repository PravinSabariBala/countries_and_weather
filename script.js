fetchcountries=async () => {
    const response = await fetch ('https://restcountries.com/v2/all')
    const myjson = await response.json();
    localStorage['jsonData']=JSON.stringify(myjson);
    for(var i=0; i<myjson.length;i++){
        const div=document.createElement('div');
        div.classList.add('card');
        div.style="width: 18rem";

        const img=document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src',myjson[i].flag);
        img.setAttribute('alt',"flag-img");

        const div1=document.createElement('div');
        div1.classList.add('card-body')

        const li_list=["Capital","Region","Country Code"]
        const li_cont=[myjson[i].capital,myjson[i].region,myjson[i].alpha3Code]

        const div2=document.createElement('div');
        div2.classList.add('card-header')

        const h3=document.createElement('h3');
        h3.textContent=myjson[i].name;
        let name=myjson[i].name;

        div2.append(h3)

        const h4=document.createElement('h4')
        h4.innerText="Capital" + " : " + myjson[i].capital;

        const h41=document.createElement('h4')
        h41.innerText=`${li_list[1]} :  ${li_cont[1]}`;

        const h42=document.createElement('h4')
        h42.textContent=li_list[2] + " : " + li_cont[2];

        const button=document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-primary')
        button.innerText="Check for Weather";


        div1.append(img);
        div1.append(h4);
        div1.append(h41);
        div1.append(h42);
        div1.append(button);
        div.append(div2);
        div.append(div1);

        button.addEventListener('click',function(e){
            
            displayweatherdetails(e,name);
        });

        var c_box=document.querySelector('#countries-box')
        c_box.appendChild(div);




    }
    console.log(c_box);
}

fetchcountries();

function displayweatherdetails(e,cont){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cont}&APPID=3e5856d4f83adc2c307999785cda8e34`)
    
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        console.log(response)
        const mine=response;
        console.log(response)
        var main=document.getElementsByClassName('main');
        var section=document.getElementsByClassName('details-section');

        main[0].style.display="none";
        section[0].style.display="block";

        setdata(mine,section);




    });
}

function setdata(mine,section){
    var textgrid = document.getElementsByClassName('text-grid');
    section[0].querySelector('.temp').innerText=mine['main']['temp'];
    section[0].querySelector('h3').innerText=mine['name'];
    section[0].querySelector('.desc').innerText=mine['weather'][0]['description'];
    section[0].querySelector('.speed').innerText=mine['wind']['speed'];
    section[0].querySelector('.sea').innerText=mine['main']['sea_level'];

}

function back() {
    const main = document.getElementsByClassName('main');
    const section = document.getElementsByClassName('details-section');

    section[0].style.display = "none";
    main[0].style.display = "block";

}