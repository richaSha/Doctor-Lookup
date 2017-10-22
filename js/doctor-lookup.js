let apiKey = require('./../.env').apiKey;
export class Doctor {
  constructor(name) {
    this.patientName= name;
    this.conditionApi = `https://api.betterdoctor.com/2016-03-01/conditions?user_key=${apiKey}`;

  }

  findConditionList(){
    let self = this;
    let response;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        self.conditionList(JSON.parse(this.responseText));
      }
    };
    request.open("GET", this.conditionApi, true);
    request.send();
  }

  conditionList(response){
    response.data.forEach(function(data){
      $('.conditionList').append(`<option value="${data.uid}">${data.name}</option>`);
    })
  }

  findDoctorList(condition){
    let self =this;
    let doctorApi= `https://api.betterdoctor.com/2016-03-01/doctors?location=45.5,-122.6,100&query=${condition}&skip=2&limit=10&user_key=${apiKey}`;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        self.doctorList(JSON.parse(this.responseText));
      }else if (this.readyState == 4 && this.status != 200) {
        let error = JSON.parse(this.responseText);
        $('.container-fluid').prepend(`<div class="alert alert-warning alert-dismissable fade in">
       <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
       ${error.meta.message}
     </div>`)
     $('.searchPage').removeClass('hide');
      }
    };
    request.open("GET", doctorApi, true);
    request.send();
  }

  doctorList(response){
    if(response.data.length == 0){
      $('.container-fluid').prepend(`<div class="alert alert-warning alert-dismissable fade in">
     <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
     No Doctor Available
     </div>`);
     $('.searchPage').removeClass('hide');
    }else{
      response.data.forEach(function(data) {
        $('.docList').append(`<div class="docInfo">
                              <div class="docImg"><img src="${data.profile.image_url}"/></div>
                              <div class="docDetail">
                                <h4>${data.profile.title} ${data.profile.first_name} ${data.profile.middle_name} ${data.profile.last_name}</h4>
                                <h5>${data.specialties[0].actor}</h5>
                              </div></div>`);
        data.practices.forEach(function(data) {
          if(data.within_search_area && data.visit_address.city == "Portland"){
            if(data.accepts_new_patients){
              $('.docDetail').append(`<h5>Accepts new patients</h5>`);
            }

            if(data.website){
              $('.docDetail').append(`<h5><b>Website:</b> ${data.website} </h5>`);
            }else{
              $('.docDetail').append(`<h5><b>Website:</b> N/A </h5>`);
            }

            if(data.visit_address){
              $('.docDetail').append(`<h5><b>Address:</b> ${data.visit_address.street}, ${data.visit_address.city}, ${data.visit_address.state_long} ${data.visit_address.zip}</h5>`);
            }else{
              $('.docDetail').append(`<h5><b>Address:</b> N/A</h5>`);
            }
            if(data.phones){
              data.phones.forEach(function(phone) {
                if(phone.type == "landline"){
                  $('.docDetail').append(`<h5><b>Phone:</b> ${phone.number}</h5><hr>`);
                }
              })
            }
          }

        });
      });
    }

  }

}
