//url = "https://data.cdc.gov/resource/dxpw-cm5u.json?$query=SELECT%0A%20%20%60stateabbr%60%2C%0A%20%20%60placename%60%2C%0A%20%20%60placefips%60%2C%0A%20%20%60population2010%60%2C%0A%20%20%60arthritis_crudeprev%60%2C%0A%20%20%60arthritis_crude95ci%60%2C%0A%20%20%60arthritis_adjprev%60%2C%0A%20%20%60arthritis_adj95ci%60%2C%0A%20%20%60bphigh_crudeprev%60%2C%0A%20%20%60bphigh_crude95ci%60%2C%0A%20%20%60bphigh_adjprev%60%2C%0A%20%20%60bphigh_adj95ci%60%2C%0A%20%20%60cancer_crudeprev%60%2C%0A%20%20%60cancer_crude95ci%60%2C%0A%20%20%60cancer_adjprev%60%2C%0A%20%20%60cancer_adj95ci%60%2C%0A%20%20%60casthma_crudeprev%60%2C%0A%20%20%60casthma_crude95ci%60%2C%0A%20%20%60casthma_adjprev%60%2C%0A%20%20%60casthma_adj95ci%60%2C%0A%20%20%60csmoking_crude95ci%60%2C%0A%20%20%60csmoking_adjprev%60%2C%0A%20%20%60csmoking_adj95ci%60%2C%0A%20%20%60geolocation%60%2C%0A%20%20%60csmoking_crudeprev%60%0AWHERE%20caseless_one_of(%60stateabbr%60%2C%20%22CA%22%2C%20%22TX%22%2C%20%22NY%22)";
//const url = "https://data.cdc.gov/resource/dxpw-cm5u.json?$query=SELECT%0A%20%20%60stateabbr%60%2C%0A%20%20%60placename%60%2C%0A%20%20%60placefips%60%2C%0A%20%20%60population2010%60%2C%0A%20%20%60arthritis_crudeprev%60%2C%0A%20%20%60arthritis_crude95ci%60%2C%0A%20%20%60cancer_crudeprev%60%2C%0A%20%20%60cancer_crude95ci%60%2C%0A%20%20%60casthma_crudeprev%60%2C%0A%20%20%60casthma_crude95ci%60%2C%0A%20%20%60csmoking_crudeprev%60%2C%0A%20%20%60csmoking_crude95ci%60%2C%0A%20%20%60diabetes_crudeprev%60%2C%0A%20%20%60diabetes_crude95ci%60%2C%0A%20%20%60obesity_crudeprev%60%2C%0A%20%20%60obesity_crude95ci%60%2C%0A%20%20%60geolocation%60%2C%0A%20%20%60bphigh_crudeprev%60%2C%0A%20%20%60bphigh_crude95ci%60%0AWHERE%20caseless_one_of(%60stateabbr%60%2C%20%22CA%22%2C%20%22NY%22%2C%20%22TX%22)"
const url = '/api/v1.0/diseases'

var CA=[];
var NY=[];
var TX=[];

d3.json(url).then((data)=>{
    console.log(data[0].State[0])
    for (i=0;i<data.length;i++){
        if(data[i].State[0]=="CA"){
            CA.push(data[i])
        }
        else if (data[i].State[0]=="NY"){
            NY.push(data[i]);
        }
        else {
            TX.push(data[i])
        }
    }
    console.log(CA)
    function init(){
        bubblegraph("california","arthritis");
        bargraph1("california","arthritis");
        bargraph2("arthritis");
        mapplot("arthritis");  
        panel1("california");
    }
    init();
});

d3.selectAll("#selDataset,#selDataset_des").on("change",getData)    

function getData (){
    state=d3.select("#selDataset").property("value");
    disease=d3.select("#selDataset_des").property("value");
    
    bubblegraph(state,disease);
    bargraph1(state,disease);
    bargraph2(disease);
    mapplot(disease);
    d3.selectAll(".panel-body>p").remove()
    panel1(state);
    
}

function bargraph1(state,disease){
    var value=[];
    var city=[];
    var data=[];
    if(state=="california"){
        data=CA;
        if(disease=="arthritis"){
            let sorted_data = data.sort((a,b)=> b.Arthritis[0] - a.Arthritis[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Arthritis[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="hb pressure"){
            let sorted_data = data.sort((a,b)=> b.BPHigh[0] - a.BPHigh[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.BPHigh[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="cancer"){
            let sorted_data = data.sort((a,b)=> b.Cancer[0] - a.Cancer[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Cancer[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="asthma"){
            let sorted_data = data.sort((a,b)=> b.Asthma[0] - a.Asthma[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Asthma[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="smoking"){
            let sorted_data = data.sort((a,b)=> b.Smoking[0]- a.Smoking[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Smoking[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="diabetes"){
            let sorted_data = data.sort((a,b)=> b.Diabetes[0] - a.Diabetes[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Diabetes[0])
            city=slice_data.map(object=>object.City[0])
        }
        else {
            let sorted_data= data.sort((a,b)=> b.Obesity[0] - a.Obesity[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Obesity[0])
            city=slice_data.map(object=>object.City[0])
        }
    }
    
    else if(state=="newyork"){
        data=NY;
        if(disease=="arthritis"){
            let sorted_data = data.sort((a,b)=> b.Arthritis[0] - a.Arthritis[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Arthritis[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="hb pressure"){
            let sorted_data = data.sort((a,b)=> b.BPHigh[0] - a.BPHigh[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.BPHigh[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="cancer"){
            let sorted_data = data.sort((a,b)=> b.Cancer[0] - a.Cancer[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Cancer[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="asthma"){
            let sorted_data = data.sort((a,b)=> b.Asthma[0] - a.Asthma[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Asthma[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="smoking"){
            let sorted_data = data.sort((a,b)=> b.Smoking[0]- a.Smoking[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Smoking[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="diabetes"){
            let sorted_data = data.sort((a,b)=> b.Diabetes[0] - a.Diabetes[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Diabetes[0])
            city=slice_data.map(object=>object.City[0])
        }
        else {
            let sorted_data= data.sort((a,b)=> b.Obesity[0] - a.Obesity[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Obesity[0])
            city=slice_data.map(object=>object.City[0])
        }
    }
    else if(state=="texas") {
        data=TX;
        if(disease=="arthritis"){
            let sorted_data = data.sort((a,b)=> b.Arthritis[0] - a.Arthritis[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Arthritis[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="hb pressure"){
            let sorted_data = data.sort((a,b)=> b.BPHigh[0] - a.BPHigh[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.BPHigh[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="cancer"){
            let sorted_data = data.sort((a,b)=> b.Cancer[0] - a.Cancer[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Cancer[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="asthma"){
            let sorted_data = data.sort((a,b)=> b.Asthma[0] - a.Asthma[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Asthma[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="smoking"){
            let sorted_data = data.sort((a,b)=> b.Smoking[0]- a.Smoking[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Smoking[0])
            city=slice_data.map(object=>object.City[0])
        }
        else if(disease=="diabetes"){
            let sorted_data = data.sort((a,b)=> b.Diabetes[0] - a.Diabetes[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Diabetes[0])
            city=slice_data.map(object=>object.City[0])
        }
        else {
            let sorted_data= data.sort((a,b)=> b.Obesity[0] - a.Obesity[0]);
            let slice_data = sorted_data.slice(0,5);
            slice_data.reverse();
            value=slice_data.map(object=>object.Obesity[0])
            city=slice_data.map(object=>object.City[0])
        }
    }

    let tracebar={
        y:value,
        x:city,
        type:"bar"
    }

    let data1= [tracebar];
    let layout={
        yaxis:{title:"% of Population"},
        height:400,
        width:555
    }
    Plotly.newPlot("bar1",data1,layout);
}

function bargraph2(disease){
    var total_cal=0;
    var total_ny=0;
    var total_tx=0;
    var mean_state=[];
    for(i=0;i<CA.length;i++){
        if(disease=="arthritis"){
            total_cal+=Number(CA[i].Arthritis[0]) 
        }
        else if(disease=="hb pressure"){
            total_cal+=Number(CA[i].BPHigh[0])
        }
        else if(disease=="cancer"){
            total_cal+=Number(CA[i].Cancer[0])
        }
        else if(disease=="asthma"){
            total_cal+=Number(CA[i].Asthma[0])
        }
        else if(disease=="smoking"){
            total_cal+=Number(CA[i].Smoking[0])
        }
        else if(disease=="diabetes"){
            total_cal+=Number(CA[i].Diabetes[0])
        }
        else {
            total_cal+=Number(CA[i].Obesity[0])
        }
    }

    for(i=0;i<NY.length;i++){
        if(disease=="arthritis"){
            total_ny+=Number(NY[i].Arthritis[0])  
        }
        else if(disease=="hb pressure"){
            total_ny+=Number(NY[i].BPHigh[0])
        }
        else if(disease=="cancer"){
            total_ny+=Number(NY[i].Cancer[0])
        }
        else if(disease=="asthma"){
            total_ny+=Number(NY[i].Asthma[0])
        }
        else if(disease=="smoking"){
            total_ny+=Number(NY[i].Smoking[0])
        }
        else if(disease=="diabetes"){
            total_ny+=Number(NY[i].Diabetes[0])
        }
        else {
            total_ny+=Number(NY[i].Obesity[0])
        }
    }

    for(i=0;i<TX.length;i++){
        if(disease=="arthritis"){
            total_tx= total_tx + Number(TX[i].Arthritis[0])
        }
        else if(disease=="hb pressure"){
            total_tx= total_tx + Number(TX[i].BPHigh[0])
        }
        else if(disease=="cancer"){
            total_tx+=Number(TX[i].Cancer[0])
        }
        else if(disease=="asthma"){
            total_tx+=Number(TX[i].Asthma[0])
        }
        else if(disease=="smoking"){
            total_tx+=Number(TX[i].Smoking[0])
        }
        else if(disease=="diabetes"){
            total_tx+=Number(TX[i].Diabetes[0])
        }
        else {
            total_tx+=Number(TX[i].Obesity[0])
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
        yaxis:{title:"% of Population"},
        height:400,
        width:555,
        
    }
    Plotly.newPlot("bar2",data2,layout2);
}

function bubblegraph(state,disease){
    let values =[];
    let cities =[];
    let data = []
    if(state=="california"){
        data=CA;
        if(disease=="arthritis"){
            values=data.map(object=>object.Arthritis[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="hb pressure"){
            values=data.map(object=>object.BPHigh[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="cancer"){
            values=data.map(object=>object.Cancer[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="asthma"){
            values=data.map(object=>object.Asthma[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="smoking"){
            values=data.map(object=>object.Smoking[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="diabetes"){
            values=slice_data.map(object=>object.Diabetes[0])
            cities=slice_data.map(object=>object.City[0])
        }
        else {
            values=data.map(object=>object.Obesity[0])
            cities=data.map(object=>object.City[0])
        }
    }

    else if(state=="newyork"){
        data=NY;
        if(disease=="arthritis"){
            values=data.map(object=>object.Arthritis[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="hb pressure"){
            values=data.map(object=>object.BPHigh[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="cancer"){
            values=data.map(object=>object.Cancer[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="asthma"){
            values=data.map(object=>object.Asthma[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="smoking"){
            values=data.map(object=>object.Smoking[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="diabetes"){
            values=slice_data.map(object=>object.Diabetes[0])
            cities=slice_data.map(object=>object.City[0])
        }
        else {
            values=data.map(object=>object.Obesity[0])
            cities=data.map(object=>object.City[0])
        }
    }

    else if(state=="texas") {
        data=TX;
        if(disease=="arthritis"){
            values=data.map(object=>object.Arthritis[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="hb pressure"){
            values=data.map(object=>object.BPHigh[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="cancer"){
            values=data.map(object=>object.Cancer[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="asthma"){
            values=data.map(object=>object.Asthma[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="smoking"){
            values=data.map(object=>object.Smoking[0])
            cities=data.map(object=>object.City[0])
        }
        else if(disease=="diabetes"){
            values=slice_data.map(object=>object.Diabetes[0])
            cities=slice_data.map(object=>object.City[0])
        }
        else {
            values=data.map(object=>object.Obesity[0])
            cities=data.map(object=>object.City[0])
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
        title:{text:`State ${state} - Disease ${disease}`},
        yaxis:{title:"% of Population"},
        showlegend:false,
        height:500,
        width:1140
    }
    Plotly.newPlot("bubble", data3,layout3)
}

function mapplot(disease){

    var total_cal=0;
    var total_ny=0;
    var total_tx=0;
    for(i=0;i<CA.length;i++){
        if(disease=="arthritis"){
            total_cal+=Number(CA[i].Arthritis[0]) 
        }
        else if(disease=="hb pressure"){
            total_cal+=Number(CA[i].BPHigh[0])
        }
        else if(disease=="cancer"){
            total_cal+=Number(CA[i].Cancer[0])
        }
        else if(disease=="asthma"){
            total_cal+=Number(CA[i].Asthma[0])
        }
        else if(disease=="smoking"){
            total_cal+=Number(CA[i].Smoking[0])
        }
        else if(disease=="diabetes"){
            total_cal+=Number(CA[i].Diabetes[0])
        }
        else {
            total_cal+=Number(CA[i].Obesity[0])
        }
    }

    for(i=0;i<NY.length;i++){
        if(disease=="arthritis"){
            total_ny+=Number(NY[i].Arthritis[0])  
        }
        else if(disease=="hb pressure"){
            total_ny+=Number(NY[i].BPHigh[0])
        }
        else if(disease=="cancer"){
            total_ny+=Number(NY[i].Cancer[0])
        }
        else if(disease=="asthma"){
            total_ny+=Number(NY[i].Asthma[0])
        }
        else if(disease=="smoking"){
            total_ny+=Number(NY[i].Smoking[0])
        }
        else if(disease=="diabetes"){
            total_ny+=Number(NY[i].Diabetes[0])
        }
        else {
            total_ny+=Number(NY[i].Obesity[0])
        }
    }

    for(i=0;i<TX.length;i++){
        if(disease=="arthritis"){
            total_tx= total_tx + Number(TX[i].Arthritis[0])
        }
        else if(disease=="hb pressure"){
            total_tx= total_tx + Number(TX[i].BPHigh[0])
        }
        else if(disease=="cancer"){
            total_tx+=Number(TX[i].Cancer[0])
        }
        else if(disease=="asthma"){
            total_tx+=Number(TX[i].Asthma[0])
        }
        else if(disease=="smoking"){
            total_tx+=Number(TX[i].Smoking[0])
        }
        else if(disease=="diabetes"){
            total_tx+=Number(TX[i].Diabetes[0])
        }
        else {
            total_tx+=Number(TX[i].Obesity[0])
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

function panel1(state){
    var total_art =0;
    var total_bp=0;
    var total_can=0;
    var total_asth=0;
    var total_smok=0;
    var total_diab=0;
    var total_obes=0;
    var total_cities=0;

    if(state=="california"){
        for(i=0;i<CA.length;i++){
            total_art+=Number(CA[i].Arthritis[0])  
            total_bp+=Number(CA[i].BPHigh[0])
            total_can+=Number(CA[i].Cancer[0])
            total_asth+=Number(CA[i].Asthma[0])
            total_smok+=Number(CA[i].Smoking[0])
            total_diab+=Number(CA[i].Diabetes[0])
            total_obes+=Number(CA[i].Obesity[0])
        }
        total_cities=CA.length;
    }
    else if(state=="newyork"){
        for(i=0;i<NY.length;i++){
            total_art+=Number(NY[i].Arthritis[0])  
            total_bp+=Number(NY[i].BPHigh[0])
            total_can+=Number(NY[i].Cancer[0])
            total_asth+=Number(NY[i].Asthma[0])
            total_smok+=Number(NY[i].Smoking[0])
            total_diab+=Number(NY[i].Diabetes[0])
            total_obes+=Number(NY[i].Obesity[0])
        }
        total_cities=NY.length
    }
    else {
        for(i=0;i<TX.length;i++){
            total_art+=Number(TX[i].Arthritis[0])  
            total_bp+=Number(TX[i].BPHigh[0])
            total_can+=Number(TX[i].Cancer[0])
            total_asth+=Number(TX[i].Asthma[0])
            total_smok+=Number(TX[i].Smoking[0])
            total_diab+=Number(TX[i].Diabetes[0])
            total_obes+=Number(TX[i].Obesity[0])
        }
        total_cities=TX.length
    }
    d3.select(".panel-body").append("p").text(`This information shows the mean of the % of people with the disease in the state that is selected`);
    d3.select(".panel-body").append("p").text(`Arthritis: ${(total_art/total_cities).toFixed(3)}`);
    d3.select(".panel-body").append("p").text(`High Blood Pressure: ${(total_bp/total_cities).toFixed(3)}`);
    d3.select(".panel-body").append("p").text(`Cancer: ${(total_can/total_cities).toFixed(3)}`);
    d3.select(".panel-body").append("p").text(`Asthma: ${(total_asth/total_cities).toFixed(3)}`);
    d3.select(".panel-body").append("p").text(`Smoking: ${(total_smok/total_cities).toFixed(3)}`);
    d3.select(".panel-body").append("p").text(`Diabetes: ${(total_diab/total_cities).toFixed(3)}`);
    d3.select(".panel-body").append("p").text(`Obesity: ${(total_obes/total_cities).toFixed(3)}`);
}

document.body.style.backgroundColor = "white";
