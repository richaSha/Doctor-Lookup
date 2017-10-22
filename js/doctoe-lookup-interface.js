import {Doctor} from "./../js/doctor-lookup.js"
$(document).ready(function(){
 let doctorObj = new Doctor();
 doctorObj.findConditionList();
 $(".findDoc").click(function(){
   let condition =$('.conditionList').val();
   let name = $('.name').val();
   try {
     if(condition == "non" || name == "name"){
       throw("Please fill below data");
     }
     else{
       
     }
   } catch (e) {
     debugger;
   }
 });
});
