import {Doctor} from "./../js/doctor-lookup.js"
$(document).ready(function(){
 let doctorObj = new Doctor();
 doctorObj.findConditionList();
});
