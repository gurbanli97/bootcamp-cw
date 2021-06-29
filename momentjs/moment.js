  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAoKq5fPuTFALrj92cA1XYQOLeIB5ah7vE",
    authDomain: "bootcamp-43732.firebaseapp.com",
    projectId: "bootcamp-43732",
    storageBucket: "bootcamp-43732.appspot.com",
    messagingSenderId: "525194065732",
    appId: "1:525194065732:web:43aaa242f352afdf084911"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.database();



  $('#add-employee-btn').on('click',function(e){
    e.preventDefault();

    var nameInput = $('#employee-name-input').val();
    var roleInput = $('#role-input').val();
  
    var startDateInput = $('#start-input').val()
  
    var monthlyRateInput = $('#rate-input').val()
    


    var milliDate  = moment(startDateInput, "DD/MM/YY").format("X");

    
    var monthWorked = moment().diff(moment.unix(milliDate, "X"), "months");
    
    var totalBilled = monthWorked * monthlyRateInput




  var person = {
    name: '',
    role: '',
    startDate: '',
    monthWorked: '',
    monthlyRate: '',
    total: ''
}
      person.name = nameInput
      person.role = roleInput
      person.startDate = startDateInput
      person.monthWorked = monthWorked
      person.monthlyRate = monthlyRateInput
      person.total = totalBilled


   
    db.ref('/staff').push(person)
  })


  db.ref('/staff').on('value',function(snapshot){
      console.log(Object.values(snapshot.val()))
      $('.table tbody').empty()
      for(p of Object.values(snapshot.val())) {
        $('.table tbody').append(`
            <tr>
                <td>${p.name}</td>
                <td>${p.role }</td>
                <td>${p.startDate}</td>
                <td>${p.monthWorked}</td>
                <td>${p.monthlyRate}</td>
                <td>${p .total}</td>

            </tr>
        `);
      }    
  })