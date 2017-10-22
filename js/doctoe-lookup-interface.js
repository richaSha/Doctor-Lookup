import {Doctor} from "./../js/doctor-lookup.js"
$(document).ready(function(){
 let doctorObj = new Doctor();
 doctorObj.findConditionList();
 $(".findDoc").click(function(){
   let condition =$('.conditionList').val();
   let name = $('.name').val();
   try {
     if(condition == "non" || name == ""){
       throw("Please fill below data");
     }
     else{
       $('.searchPage').addClass('hide');
       doctorObj.findDoctorList(condition);
     }
   } catch (e) {
     $(".searchPage").prepend(`<div class="alert alert-warning alert-dismissable fade in">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    ${e}
  </div>`);
  }
 });
});
