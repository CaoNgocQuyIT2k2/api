var dssp = [];

// Khi trang được tải lại, hiển thị spinner
document.addEventListener("DOMContentLoaded", () => {
  showSpinner();
  fetchFoodList(); // Gọi hàm để tải danh sách sản phẩm lại sau khi trang được tải lại
});

//selected Id của product chọn để edit
var selectedId = null;

function renderCart(productArr) {
  // Xóa dữ liệu hiện tại trong mảng dssp
  dssp.length = 0;

  var contentHTML = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    // Thêm sản phẩm vào mảng dssp
    dssp.push(product);
    var trString = `<tr>
    <td>${cartItem.name}</td>
    <td>${cartItem.price}</td>
    <td>${cartItem.img}</td>
    <td>${cartItem.type}</td>
    <td>${cartItem.quantity}</td>
              <td>
                <button onclick="addItem(${product.id})" class="btn btn-danger">+</button>
                <button onclick="subItem(${product.id})" class="btn btn-warning  ">-</button>
                <button onclick="deleteItem(${product.id})" class="btn btn-warning  ">X</button>
              </td>
          </tr>`;
    contentHTML += trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

  
  

// gọi api lấy danh sách sản phẩm trong giỏ hàng đang có từ sever
axios({
  url: "https://6522cecef43b17938414ed9a.mockapi.io/Cart",
  method: "GET",
})
  .then((res) => {
    //api trả về thành công
    renderProductionList(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

let productList = []; // Khai báo productList ở phạm vi toàn cục

// Hàm gọi API và lấy danh sách sản phẩm
function getProducts() {
  axios({
    url: "https://6522cecef43b17938414ed9a.mockapi.io/Cart",
    method: "GET",
  })
    .then((res) => {
      // API trả về thành công
      productList = res.data; // Gán danh sách sản phẩm cho biến productList

      // Gọi hàm filterProducts để hiển thị danh sách sản phẩm ban đầu
    //   filterProducts();
    })
    .catch((err) => {
      console.log(err);
    });
}

//------------------------------Lọc sản phẩm--------------------

// // Hàm lọc danh sách sản phẩm theo loại sản phẩm
// function filterProducts() {
//   var filterSelect = document.getElementById("filterSelect");
//   var selectedOption = filterSelect.value;

//   if (selectedOption !== "") {
//     var filteredProducts = productList.filter(function (product) {
//       return product.type.toLowerCase() === selectedOption;
//     });

//     renderProductionList(filteredProducts);
//   } else {
//     renderProductionList(productList);
//   }
// }

// // Khi sự kiện "change" xảy ra trên dropdown, gọi hàm filterProducts
// var filterSelect = document.getElementById("filterSelect");
// filterSelect.addEventListener("change", function () {
//   filterProducts();
// });

// // Gọi hàm getProducts để lấy danh sách sản phẩm từ API
// getProducts();

//---------------------Giỏ hàng----------------------------
