
console.log(data1);

var california=[];
var newyork=[];
var texas=[];



// d3.json(url).then((data)=>{
//     console.log(data)

//     for (i=0;i<data.length;i++){
//         if(data[i].stateabbr=="CA"){
//             california.push(data[i])
//         }
//         else if (data[i].stateabbr=="NY"){
//             newyork.push(data[i]);
//         }
//         else {
//             texas.push(data[i])
//         }
//     }
//     //console.log(newyork)
//     function init(){
//         bargraph1("california","arthritis");
//         bargraph2("arthritis");
//     }

//     init();

    
    
// });

// d3.selectAll("#selDataset,#selDataset_des").on("change",getData)    
// // console.log(california)

function getData (){
    state=d3.select("#selDataset").property("value");
    desease=d3.select("#selDataset_des").property("value");

    bargraph1(state,desease);
    bargraph2(desease);
}

function bargraph1(state,desease){
    console.log(desease);
    var value=[];
    var city=[];
    if(state=="california"){
        for(i=0;i<california.length;i++){
            city.push(california[i].placename)
            if(desease=="arthritis"){
                value.push(california[i].arthritis_crudeprev)  
            }
            else if(desease=="hb pressure"){
                value.push(california[i].bphigh_crudeprev)
            }
            else if(desease=="cancer"){
                value.push(california[i].cancer_crudeprev)
            }
            else if(desease=="asthma"){
                value.push(california[i].casthma_crudeprev)
            }
            else if(desease=="smoking"){
                value.push(california[i].csmoking_crudeprev)
            }
            else if(desease=="diabetes"){
                value.push(california[i].diabetes_crudeprev)
            }
            else {
                value.push(california[i].obesity_crudeprev)
            }
        }
    }
    else if(state=="newyork"){
        for(i=0;i<newyork.length;i++){
            city.push(newyork[i].placename)
            if(desease=="arthritis"){
                value.push(newyork[i].arthritis_crudeprev)  
            }
            else if(desease=="hb pressure"){
                value.push(newyork[i].bphigh_crudeprev)
            }
            else if(desease=="cancer"){
                value.push(newyork[i].cancer_crudeprev)
            }
            else if(desease=="asthma"){
                value.push(newyork[i].casthma_crudeprev)
            }
            else if(desease=="smoking"){
                value.push(newyork[i].csmoking_crudeprev)
            }
            else if(desease=="diabetes"){
                value.push(newyork[i].diabetes_crudeprev)
            }
            else {
                value.push(newyork[i].obesity_crudeprev)
            }
        }
    }
    else if(state=="texas") {
        for(i=0;i<texas.length;i++){
            city.push(texas[i].placename)
            if(desease=="arthritis"){
                value.push(texas[i].arthritis_crudeprev)  
            }
            else if(desease=="hb pressure"){
                value.push(texas[i].bphigh_crudeprev)
            }
            else if(desease=="cancer"){
                value.push(texas[i].cancer_crudeprev)
            }
            else if(desease=="asthma"){
                value.push(texas[i].casthma_crudeprev)
            }
            else if(desease=="smoking"){
                value.push(texas[i].csmoking_crudeprev)
            }
            else if(desease=="diabetes"){
                value.push(texas[i].diabetes_crudeprev)
            }
            else {
                value.push(texas[i].obesity_crudeprev)
            }
        }
    }

    //console.log("b",math.sum(value));

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
    for(i=0;i<california.length;i++){
        if(desease=="arthritis"){
            total_cal+=Number(california[i].arthritis_crudeprev) 
        }
        else if(desease=="hb pressure"){
            total_cal+=Number(california[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_cal+=Number(california[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_cal+=Number(california[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_cal+=Number(california[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_cal+=Number(california[i].diabetes_crudeprev)
        }
        else {
            total_cal+=Number(california[i].obesity_crudeprev)
        }
    }

    for(i=0;i<newyork.length;i++){
        if(desease=="arthritis"){
            total_ny+=Number(newyork[i].arthritis_crudeprev)  
        }
        else if(desease=="hb pressure"){
            total_ny+=Number(newyork[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_ny+=Number(newyork[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_ny+=Number(newyork[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_ny+=Number(newyork[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_ny+=Number(newyork[i].diabetes_crudeprev)
        }
        else {
            total_ny+=Number(newyork[i].obesity_crudeprev)
        }
    }

    for(i=0;i<texas.length;i++){
        if(desease=="arthritis"){
            total_tx= total_tx + Number(texas[i].arthritis_crudeprev)
        }
        else if(desease=="hb pressure"){
            total_tx= total_tx + Number(texas[i].bphigh_crudeprev)
        }
        else if(desease=="cancer"){
            total_tx+=Number(texas[i].cancer_crudeprev)
        }
        else if(desease=="asthma"){
            total_tx+=Number(texas[i].casthma_crudeprev)
        }
        else if(desease=="smoking"){
            total_tx+=Number(texas[i].csmoking_crudeprev)
        }
        else if(desease=="diabetes"){
            total_tx+=Number(texas[i].diabetes_crudeprev)
        }
        else {
            total_tx+=Number(texas[i].obesity_crudeprev)
        }
    }

    console.log("a",total_tx)
    mean_state.push(total_cal/california.length,total_ny/newyork.length,total_tx/texas.length)
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




// console.log("NY:",NY);
// console.log("TX:",TX);