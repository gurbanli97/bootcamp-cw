// $.ajax({
//   method: "GET",
//   url: "admin/api",
// }).then(function (data) {
//   for (let item of data) {
//     var a = new Date(item.createdAt);
//     var month = a.getUTCMonth() + 1;
//     var day = a.getUTCDate();
//     var year = a.getUTCFullYear();

//     var newdate = year + "/" + month + "/" + day;

//     item.createdAt;
//     $("#holder").prepend(`
//         <tr>
//         <td>${item.name}</td>
//         <td>${item.job}</td>
//         <td>${item.email}</td>
//         <td>${item.dob}</td>
//         <td>${newdate}</td>
//         <td>${item.role}</td>
//         <td><a href="edit/${item.id}">edit</a></td>
//         <td><a href="delete/${item.id}">delete</a></td>
//       </tr>`);
//   }
// });
