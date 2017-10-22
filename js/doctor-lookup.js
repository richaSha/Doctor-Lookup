

export class Doctor {
  constructor(name) {
    this.patientName= name;
    this.conditionApi = `https://api.betterdoctor.com/2016-03-01/conditions?user_key=582938f24498f577e99318e6356c972d`;
    this.DoctorApi= `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&query=&skip=2&limit=10&user_key=`;
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

}
