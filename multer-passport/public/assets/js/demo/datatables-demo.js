$(document).ready(function () {
  var table;
  function reCreate() {
    table = $("#dataTable").DataTable({
      ajax: {
        type: "GET",
        url: "/admin/api",
        dataSrc: function (array) {
          for (let item of array) {
            if(item.profileImg != null){
              item.image = `<img src="${item.profileImg}" style="width: 70px; height: 60px" alt="profile-photo">`
            }else{
              item.image = `No image`
            }
            item.edit = `<a href="admin/edit/${item.id}" class="editBtn btn btn-secondary">edit</a>`;
            item.delete = `<button class="deleteBtn btn btn-secondary" data-value="${item.id}">delete</button>`;
          }
          return array;
        },
      },
      columns: [
        { data: "image" },
        { data: "firstname" },
        { data: "lastname" },
        { data: "username" },
        { data: "role" },
        { data: "edit" },
        { data: "delete" },
      ],
    });
  }
  reCreate();

  $(document).on("click", ".deleteBtn", function(){
    let askedIDForDelete = $(this).data('value');

    $.ajax({
        method: "DELETE",
        url: "admin/delete",
        data: {askedIDForDelete}
      }).then(function (data) {
        table.ajax.reload();
      })

  })

});
