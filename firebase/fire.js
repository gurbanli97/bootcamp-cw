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



$('.add-item').on('click',function(){
  var img = $(this).siblings('.pizza-img').find('img').attr('src')
  var name = $(this).siblings('.pizza-name').data('name')
  var price = $(this).siblings('.pizza-price').data('price')

  var selectedPizza = {
    img: '',
    name: '',
    price: '',
  }

  selectedPizza.img = img
  selectedPizza.name = name
  selectedPizza.price = price
  console.log(selectedPizza)


  db.ref().push(selectedPizza)
})
  


db.ref().on('value',function(snapshot){
  $('.cart').empty()
  for(p of Object.values(snapshot.val())) {
    $('.cart').append(`
    <div class="cart-pizza">
      <div class="cart-img">
        <img src="${p.img}"/>
      </div>
      <div class="cart-name">${p.name}</div>
      <div class="cart-price">${parseFloat(p.price)}</div>
    </div>
    `);
  }    


  updateTotal(snapshot.val())
})


function updateTotal(x) {
  for(i of Object.values(x)){
    console.log(i.name)
  }
}