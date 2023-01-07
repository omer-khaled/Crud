var inputs=Array.from(document.querySelectorAll(".section1>form>.input>input"));
var labels=Array.from(document.querySelectorAll(".section1>form>.input>label"));
for(var x=0;x<inputs.length;x++){
  // curs.push(inputs[x],inputs.indexOf(inputs[x]));
  inputs[x].addEventListener("focus",(e)=>{
    e.target.style.borderColor="rgb(33, 33, 199)";
    var cur=inputs.indexOf(e.target);
    labels[cur].style.left="10px";
    labels[cur].style.top="-9px";
    // labels[cur].style.width="36%";
    labels[cur].style.background="#dfdfdf";
    labels[cur].style.transform="scale(80%)";
  });
  inputs[x].addEventListener("blur",(e)=>{
    if(e.target.value==''){
      e.target.style.borderColor="unset";
      var cur=inputs.indexOf(e.target);
      labels[cur].style.left="10px";
      labels[cur].style.top="50%";
      labels[cur].style.width="unset";
      labels[cur].style.background="#dfdfdf";
      labels[cur].style.transform="translateY(-50%) scale(100%)";
    }
  });
}
var data=new Array();
var check=localStorage.getItem("data_storage");
if(check){
  console.log(check);
  data=JSON.parse(localStorage.getItem("data_storage"));
}
else{
  data=new Array();
  localStorage.setItem("data_storage", JSON.stringify(data));
  data=JSON.parse(localStorage.getItem("data_storage"));
}
show();
document.getElementById("send").addEventListener("click",function(){
    var cur=new Array();
    for(var x=0;x<inputs.length;x++){
      cur.push(inputs[x].value);
    }
    data.push(cur);
    show();
    for(var x=0;x<inputs.length;x++){
      inputs[x].value='';
      labels[x].style.left="10px";
      labels[x].style.top="50%";
      labels[x].style.width="unset";
      labels[x].style.background="#dfdfdf";
      labels[x].style.transform="translateY(-50%) scale(100%)";
    }
})
document.getElementById("form_da").onsubmit=()=>{
  return false;
}
function deletee(x){
  data.splice(x,1); 
  show();
}
function show(){
  document.getElementById("table_data").innerHTML='';
  document.getElementById("table_data").innerHTML='<tr class="textAl_tr"><th class="head">product Name</th><th class="head">product price</th><th class="head">product category</th><th class="head">product code</th><th class="head">product Descs</th><th class="head">options</th></tr>';
  for(var i=0;i<data.length;i++){
    var code='<tr class="textAl_tr"><td class="textAl">'+data[i][0]+'</td><td class="textAl">'+data[i][1]+'</td><td class="textAl">'+data[i][2]+'</td><td class="textAl">'+data[i][3]+'</td><td  class="textAl">'+data[i][4]+'</td><td class="center"><button style="border:none; background: transparent;" onclick="updatee('+i+')"><i class="fa-solid fa-pen-to-square upd"></i></button><button style="border:none;   background: transparent;" onclick="deletee('+i+')"><i class="fa-solid fa-trash del"></i></button></td></tr>';
    document.getElementById("table_data").innerHTML+=code;
  }
  localStorage.setItem("data_storage", JSON.stringify(data));
}
function updatee(i){
  var form=document.querySelector(".section1>form");
  var sen=document.getElementById("send");
  sen.style.display="none";
  var upddd=document.createElement("input");
  upddd.id="uupdate";
  upddd.type="submit";
  upddd.value="update";
  upddd.onclick=function (){
      var cur=new Array();
      for(var x=0;x<inputs.length;x++){
        cur.push(inputs[x].value);
      }
      data[i]=cur;
      show();
      for(var x=0;x<inputs.length;x++){
        inputs[x].value='';
        labels[x].style.left="10px";
        labels[x].style.top="50%";
        labels[x].style.width="unset";
        labels[x].style.background="#dfdfdf";
        labels[x].style.transform="translateY(-50%) scale(100%)";
      }
      var sen=document.getElementById("uupdate");
      form.removeChild(sen);
      var sen_input=document.getElementById("send");
      sen_input.style.display="block";
  };
  form.appendChild(upddd);
  for(var x=0;x<inputs.length;x++){
        inputs[x].value=data[i][x];
        if(inputs[x].value==''){
          inputs[x].style.borderColor="unset";
          var cur=inputs.indexOf(inputs[x]);
          labels[cur].style.left="10px";
          labels[cur].style.top="50%";
          labels[cur].style.width="unset";
          labels[cur].style.background="#dfdfdf";
          labels[cur].style.transform="translateY(-50%) scale(100%)";
        }
        else{
          inputs[x].style.borderColor="rgb(33, 33, 199)";
          var cur=inputs.indexOf(inputs[x]);
          labels[cur].style.left="10px";
          labels[cur].style.top="-9px";
          labels[cur].style.background="#dfdfdf";
          labels[cur].style.transform="scale(80%)";
        }
  } 
}