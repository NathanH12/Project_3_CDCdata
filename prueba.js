//url = "https://data.cdc.gov/resource/dxpw-cm5u.json?$query=SELECT%0A%20%20%60stateabbr%60%2C%0A%20%20%60placename%60%2C%0A%20%20%60placefips%60%2C%0A%20%20%60population2010%60%2C%0A%20%20%60arthritis_crudeprev%60%2C%0A%20%20%60arthritis_crude95ci%60%2C%0A%20%20%60arthritis_adjprev%60%2C%0A%20%20%60arthritis_adj95ci%60%2C%0A%20%20%60bphigh_crudeprev%60%2C%0A%20%20%60bphigh_crude95ci%60%2C%0A%20%20%60bphigh_adjprev%60%2C%0A%20%20%60bphigh_adj95ci%60%2C%0A%20%20%60cancer_crudeprev%60%2C%0A%20%20%60cancer_crude95ci%60%2C%0A%20%20%60cancer_adjprev%60%2C%0A%20%20%60cancer_adj95ci%60%2C%0A%20%20%60casthma_crudeprev%60%2C%0A%20%20%60casthma_crude95ci%60%2C%0A%20%20%60casthma_adjprev%60%2C%0A%20%20%60casthma_adj95ci%60%2C%0A%20%20%60csmoking_crude95ci%60%2C%0A%20%20%60csmoking_adjprev%60%2C%0A%20%20%60csmoking_adj95ci%60%2C%0A%20%20%60geolocation%60%2C%0A%20%20%60csmoking_crudeprev%60%0AWHERE%20caseless_one_of(%60stateabbr%60%2C%20%22CA%22%2C%20%22TX%22%2C%20%22NY%22)";
const url = "https://data.cdc.gov/resource/dxpw-cm5u.json?$query=SELECT%0A%20%20%60stateabbr%60%2C%0A%20%20%60placename%60%2C%0A%20%20%60placefips%60%2C%0A%20%20%60population2010%60%2C%0A%20%20%60arthritis_crudeprev%60%2C%0A%20%20%60arthritis_crude95ci%60%2C%0A%20%20%60bphigh_crudeprev%60%2C%0A%20%20%60bphigh_crude95ci%60%2C%0A%20%20%60cancer_crudeprev%60%2C%0A%20%20%60cancer_crude95ci%60%2C%0A%20%20%60casthma_crudeprev%60%2C%0A%20%20%60casthma_crude95ci%60%2C%0A%20%20%60csmoking_crude95ci%60%2C%0A%20%20%60geolocation%60%2C%0A%20%20%60csmoking_crudeprev%60%2C%0A%20%20%60diabetes_crudeprev%60%2C%0A%20%20%60diabetes_crude95ci%60%2C%0A%20%20%60obesity_crudeprev%60%2C%0A%20%20%60obesity_crude95ci%60%0AWHERE%20caseless_one_of(%60stateabbr%60%2C%20%22CA%22%2C%20%22TX%22%2C%20%22NY%22)";

var CA=[];
var NY=[];
var TX=[];

d3.json(url).then((data)=>{
    console.log(data)
    for (i=0;i<data.length;i++){
        if(data[i].stateabbr=="CA"){
            CA.push(data[i])
        }
        else if (data[i].stateabbr=="NY"){
            NY.push(data[i]);
        }
        else {
            TX.push(data[i])
        }
    }
    function init(){
        bubblegraph("california","arthritis");
        bargraph1("california","arthritis");
        bargraph2("arthritis");
        mapplot("arthritis");  
    }
    init();

});

d3.selectAll("#selDataset,#selDataset_des").on("change",getData)    

function getData (){
    state=d3.select("#selDataset").property("value");
    desease=d3.select("#selDataset_des").property("value");
    
    bubblegraph(state,desease)
    bargraph1(state,desease);
    bargraph2(desease);
    mapplot(desease)
    
}

function bargraph1(state,desease){
    var value=[];
    var city=[];
    var data=[];
    if(state=="california"){
        data=CA;
        if(desease=="arthritis"){
            let sorted_data = data.sort((a,b)=> b.arthritis_crudeprev - a.arthritis_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.arthritis_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="hb pressure"){
            let sorted_data = data.sort((a,b)=> b.bphigh_crudeprev - a.bphigh_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.bphigh_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="cancer"){
            let sorted_data = data.sort((a,b)=> b.cancer_crudeprev - a.cancer_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.cancer_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="asthma"){
            let sorted_data = data.sort((a,b)=> b.casthma_crudeprev - a.casthma_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.casthma_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="smoking"){
            let sorted_data = data.sort((a,b)=> b.csmoking_crudeprev - a.csmoking_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.csmoking_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="diabetes"){
            let sorted_data = data.sort((a,b)=> b.diabetes_crudeprev - a.diabetes_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.diabetes_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else {
            let sorted_data= data.sort((a,b)=> b.obesity_crudeprev - a.obesity_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.obesity_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
    }
    
    else if(state=="newyork"){
        data=NY;
        if(desease=="arthritis"){
            let sorted_data = data.sort((a,b)=> b.arthritis_crudeprev - a.arthritis_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.arthritis_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="hb pressure"){
            let sorted_data = data.sort((a,b)=> b.bphigh_crudeprev - a.bphigh_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.bphigh_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="cancer"){
            let sorted_data = data.sort((a,b)=> b.cancer_crudeprev - a.cancer_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.cancer_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="asthma"){
            let sorted_data = data.sort((a,b)=> b.casthma_crudeprev - a.casthma_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.casthma_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="smoking"){
            let sorted_data = data.sort((a,b)=> b.csmoking_crudeprev - a.csmoking_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.csmoking_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="diabetes"){
            let sorted_data = data.sort((a,b)=> b.diabetes_crudeprev - a.diabetes_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.diabetes_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else {
            let sorted_data= data.sort((a,b)=> b.obesity_crudeprev - a.obesity_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.obesity_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
    }
    else if(state=="texas") {
        data=TX;
        if(desease=="arthritis"){
            let sorted_data = data.sort((a,b)=> b.arthritis_crudeprev - a.arthritis_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.arthritis_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="hb pressure"){
            let sorted_data = data.sort((a,b)=> b.bphigh_crudeprev - a.bphigh_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.bphigh_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="cancer"){
            let sorted_data = data.sort((a,b)=> b.cancer_crudeprev - a.cancer_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.cancer_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="asthma"){
            let sorted_data = data.sort((a,b)=> b.casthma_crudeprev - a.casthma_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.casthma_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="smoking"){
            let sorted_data = data.sort((a,b)=> b.csmoking_crudeprev - a.csmoking_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.csmoking_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else if(desease=="diabetes"){
            let sorted_data = data.sort((a,b)=> b.diabetes_crudeprev - a.diabetes_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.diabetes_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
        else {
            let sorted_data= data.sort((a,b)=> b.obesity_crudeprev - a.obesity_crudeprev);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.obesity_crudeprev)
            city=slice_data.map(object=>object.placename)
        }
    }

    let tracebar={
        y:value,
        x:city,
        type:"bar"
    }

    let data1= [tracebar];
    let layout={
        height:400,
        width:610
    }
    Plotly.newPlot("bar1",data1,layout);
}

function bargraph2(desease){
    var total_cal=0;
    var total_ny=0;
    var total_tx=0;
    var mean_state=[];
    for(i=0;i<CA.length;i++){
        if(desease=="arthritis"){
            total_cal+=Number(CA[i].arthritis_crudeprev) 
        }
        else if(desease=="hb pressure"){
            total_cal+=Number(CA[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_cal+=Number(CA[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_cal+=Number(CA[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_cal+=Number(CA[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_cal+=Number(CA[i].diabetes_crudeprev)
        }
        else {
            total_cal+=Number(CA[i].obesity_crudeprev)
        }
    }

    for(i=0;i<NY.length;i++){
        if(desease=="arthritis"){
            total_ny+=Number(NY[i].arthritis_crudeprev)  
        }
        else if(desease=="hb pressure"){
            total_ny+=Number(NY[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_ny+=Number(NY[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_ny+=Number(NY[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_ny+=Number(NY[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_ny+=Number(NY[i].diabetes_crudeprev)
        }
        else {
            total_ny+=Number(NY[i].obesity_crudeprev)
        }
    }

    for(i=0;i<TX.length;i++){
        if(desease=="arthritis"){
            total_tx= total_tx + Number(TX[i].arthritis_crudeprev)
        }
        else if(desease=="hb pressure"){
            total_tx= total_tx + Number(TX[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_tx+=Number(TX[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_tx+=Number(TX[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_tx+=Number(TX[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_tx+=Number(TX[i].diabetes_crudeprev)
        }
        else {
            total_tx+=Number(TX[i].obesity_crudeprev)
        }
    }

    console.log("a",total_tx)
    mean_state.push(total_cal/CA.length,total_ny/NY.length,total_tx/TX.length)
    name_sate=["California","New York","Texas"];
    
    let tracebar={
        y:mean_state,
        x:name_sate,
        type:"bar"
    }

    let data2= [tracebar];
    let layout2={
        height:400,
        width:610
    }
    Plotly.newPlot("bar2",data2,layout2);
}

function bubblegraph(state,desease){
    let values =[];
    let cities =[];
    let data = []
    if(state=="california"){
        data=CA;
        if(desease=="arthritis"){
            values=data.map(object=>object.arthritis_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="hb pressure"){
            values=data.map(object=>object.bphigh_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="cancer"){
            values=data.map(object=>object.cancer_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="asthma"){
            values=data.map(object=>object.casthma_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="smoking"){
            values=data.map(object=>object.csmoking_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="diabetes"){
            values=slice_data.map(object=>object.diabetes_crudeprev)
            cities=slice_data.map(object=>object.placename)
        }
        else {
            values=data.map(object=>object.obesity_crudeprev)
            cities=data.map(object=>object.placename)
        }
    }

    else if(state=="newyork"){
        data=NY;
        if(desease=="arthritis"){
            values=data.map(object=>object.arthritis_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="hb pressure"){
            values=data.map(object=>object.bphigh_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="cancer"){
            values=data.map(object=>object.cancer_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="asthma"){
            values=data.map(object=>object.casthma_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="smoking"){
            values=data.map(object=>object.csmoking_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="diabetes"){
            values=slice_data.map(object=>object.diabetes_crudeprev)
            cities=slice_data.map(object=>object.placename)
        }
        else {
            values=data.map(object=>object.obesity_crudeprev)
            cities=data.map(object=>object.placename)
        }
    }

    else if(state=="texas") {
        data=TX;
        if(desease=="arthritis"){
            values=data.map(object=>object.arthritis_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="hb pressure"){
            values=data.map(object=>object.bphigh_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="cancer"){
            values=data.map(object=>object.cancer_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="asthma"){
            values=data.map(object=>object.casthma_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="smoking"){
            values=data.map(object=>object.csmoking_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else if(desease=="diabetes"){
            values=data.map(object=>object.diabetes_crudeprev)
            cities=data.map(object=>object.placename)
        }
        else {
            values=data.map(object=>object.obesity_crudeprev)
            cities=data.map(object=>object.placename)
        }
    }

    let trace3={
        y: values,
        x: cities,
        text:cities,
        mode: "markers",
        marker:{
            size: values,
            color:values
        }
    }

    let data3=[trace3];

    let layout3={
        title:{text:`State ${state} - Desease ${desease}`},
        showlegend:false,
        height:500,
        width:1200
    }
    Plotly.newPlot("bubble", data3,layout3)
}
function mapplot(desease){

    var total_cal=0;
    var total_ny=0;
    var total_tx=0;
    var mean_state=[];
    for(i=0;i<CA.length;i++){
        if(desease=="arthritis"){
            total_cal+=Number(CA[i].arthritis_crudeprev) 
        }
        else if(desease=="hb pressure"){
            total_cal+=Number(CA[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_cal+=Number(CA[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_cal+=Number(CA[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_cal+=Number(CA[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_cal+=Number(CA[i].diabetes_crudeprev)
        }
        else {
            total_cal+=Number(CA[i].obesity_crudeprev)
        }
    }

    for(i=0;i<NY.length;i++){
        if(desease=="arthritis"){
            total_ny+=Number(NY[i].arthritis_crudeprev)  
        }
        else if(desease=="hb pressure"){
            total_ny+=Number(NY[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_ny+=Number(NY[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_ny+=Number(NY[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_ny+=Number(NY[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_ny+=Number(NY[i].diabetes_crudeprev)
        }
        else {
            total_ny+=Number(NY[i].obesity_crudeprev)
        }
    }

    for(i=0;i<TX.length;i++){
        if(desease=="arthritis"){
            total_tx= total_tx + Number(TX[i].arthritis_crudeprev)
        }
        else if(desease=="hb pressure"){
            total_tx= total_tx + Number(TX[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_tx+=Number(TX[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_tx+=Number(TX[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_tx+=Number(TX[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_tx+=Number(TX[i].diabetes_crudeprev)
        }
        else {
            total_tx+=Number(TX[i].obesity_crudeprev)
        }
    }


    google.charts.load('current', {
        'packages':['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
      
        ['State', '% mean of desease'],
        ['US-CA', total_cal/CA.length],
        ['US-TX', total_ny/NY.length],
        ['US-NY', total_tx/TX.length],


    ]);

    var options = {
        region:'US',
        dataMode:'markers',
        resolution:'provinces'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('map'));

    chart.draw(data, options);
    }
}


// let myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 13
//   });
  
// // Adding a tile layer (the background map image) to our map:
// // We use the addTo() method to add objects to our map.
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);
