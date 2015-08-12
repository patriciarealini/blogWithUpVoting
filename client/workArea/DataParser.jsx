var DataParser = {

parseDataHost: function(dataObject){
    var dataArray = dataObject.data;
    var modifiedDataArray = [];
    function individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, email, section) {
      this.Characteristics={
        Military: military,
        Country: country,
        Citizenship: citizenship,
        Undergrad: undergrad,
        Employer: employer,
        Industry: industry,
        City: city,
        State: state,
        Gender: gender,
      };
      this.Contact={
        First: first,
        Last: last,
        Email: email
      };
      this.MatchInfo= {
        Section: section,
        1: {
          matchIndex:null,
          matchScore:-1
        },
        2: {
          matchIndex:null,
          matchScore:-1
        },
        3: {
          matchIndex:null,
          matchScore:-1
        }
      };
      
    }
//working on modifying the schema;

    for(var i=0; i<dataArray.length; i++) {
      var data = new individual(
        dataArray[i]['Veteran_Status'],
        dataArray[i]['Country'],
        dataArray[i]['Citizenship1'],
        dataArray[i]['University2'],
        dataArray[i]['Employer2'],
        dataArray[i]['Job 1 Industry'],
        dataArray[i]['City'],
        dataArray[i]['Region'],
        dataArray[i]['First'],
        dataArray[i]['Last'],
        dataArray[i]['Sex'],
        dataArray[i]['Email'],
        dataArray[i]['Section']
        );

      modifiedDataArray.push(data);
    }
    modifiedDataArray.forEach(function(object){
      if(object.Characteristics.Gender==='F') {
        object.Characteristics.Gender='Female';
      } else {
        object.Characteristics.Gender='Male';
      }
      if(object.Characteristics.Military[0]==='None') {
        object.Characteristics.Military[1]=0;
      } 
      for(var key in object) {
        if(object[key][0]==="") {
          object[key][1]=0;
        }
      }
    });

    return modifiedDataArray;
  },

  parseDataVisitor: function(dataObject) {
    // console.log('parseDataVisitors');
    // console.log('data in parseDataVisitor', dataObject);
    var dataArray = dataObject.data;
    console.log(dataArray);

    // console.log(dataArray,'dataArray');
    var modifiedDataArray = [];
    // console.log(dataArray, 'dataArray');
    function individual(military, country, citizenship, undergrad, employer, industry, city, state, first, last, gender, email, ClassVisitTime) {
      if(ClassVisitTime==='9:00 AM'){
      ClassVisitTime=1;
    } else if(ClassVisitTime ==='10:30 AM'){
      ClassVisitTime=2;
    } else if(ClassVisitTime==='11:45 AM'){
      ClassVisitTime=3;
    } else {
      ClassVisitTime=3;
    }
      this.Characteristics={
        Military: military,
        Country: country,
        Citizenship: citizenship,
        Undergrad: undergrad,
        Employer: employer,
        Industry: industry,
        City: city,
        State: state,
        Gender: gender
      };
      this.Contact={
        First: first,
        Last: last,
        Email: email
      };
      this.MatchInfo={
        classVisitTime: ClassVisitTime,
        matchScore:-1,
        matchIndex:null
      };
    }
    for(var i=0; i<dataArray.length; i++) {
      var data = new individual(
        dataArray[i]['Military Status'],
        dataArray[i]['Address Country'],
        dataArray[i]['CITIZENSHIP1'],
        dataArray[i]['School:Name'],
        dataArray[i]['Job:Employer'],
        dataArray[i]['Job:Industry'],
        dataArray[i]['Address City'],
        dataArray[i]['Address Region'],
        dataArray[i]['First'],
        dataArray[i]['Last'],
        dataArray[i]['Gender'],
        dataArray[i]['Email'],
        dataArray[i]['Class Visit Time']
        );
      modifiedDataArray.push(data);
      // console.log(modifiedDataArray,'modifiedDataArray');
    }
    return modifiedDataArray;
  },
};

module.exports=DataParser;