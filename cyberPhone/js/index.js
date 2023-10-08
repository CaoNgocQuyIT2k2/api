// Button shop 
function scrollToProducts() {
  // Lấy phần tử "products" bằng cách sử dụng id hoặc class
  var productsElement = document.querySelector(".products");

  // Sử dụng phương thức scrollIntoView để cuộn trang đến phần tử "products"
  productsElement.scrollIntoView({ behavior: "smooth" });
}
var dssp = []; // Định nghĩa biến dssp ở ngoài phạm vi của hàm

function renderProductionList(productArr) {
    var productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Xóa nội dung cũ trong container trước khi thêm dữ liệu mới
  
    productArr.forEach(product => {
      var productDiv = document.createElement('div');
      productDiv.classList.add('item');
      productDiv.innerHTML = `
        <img class="image" src="${product.img}" alt="${product.name}" />
        <div class="desc">
          <div class="detail">
            <h3>${product.name}</h3>
            <p>${product.type}</p>
            <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <div class="price">
            <span>${product.price}$</span>
            <!-- Thêm nút "Add to Cart" vào sản phẩm -->
<button class="add-to-cart" onclick="addToCart">Add to Cart</button>

          </div>
        </div>
      `;
      productContainer.appendChild(productDiv);
    });
}

// gọi api lấy danh sách sản phẩm đang có từ sever 
axios({
  url: "https://6520dbe6906e276284c4beec.mockapi.io/Products",
  method: "GET",
})
.then((res) => {
  //api trả về thành công
  dssp = res.data; // Gán danh sách sản phẩm cho biến dssp

  // Gọi hàm filterProducts để hiển thị danh sách sản phẩm ban đầu
  filterProducts();

})
.catch((err) => {
  console.log(err);
});










//------------------------------Lọc sản phẩm--------------------
// Hàm lọc danh sách sản phẩm theo loại sản phẩm
function filterProducts() {
  var filterSelect = document.getElementById("filterSelect");
  var selectedOption = filterSelect.value;

  // Kiểm tra nếu người dùng đã chọn một loại sản phẩm
  if (selectedOption !== "") {
    // Lọc danh sách sản phẩm dựa trên loại sản phẩm đã chọn
    var filteredProducts = dssp.filter(function (product) {
      return product.type.toLowerCase() === selectedOption;
    });

    // Gọi hàm để hiển thị danh sách sản phẩm đã được lọc
    renderProductionList(filteredProducts);
  } else {
    // Nếu người dùng chọn "Tất cả", hiển thị danh sách sản phẩm ban đầu
    renderProductionList(dssp);
  }
}

//------------------------Giỏ hàng--------------------------

import { getDataItem } from "./cart_controller.js";
const cart = []; // Định nghĩa biến cart trong cart_controller.js


function addToCart(productElement) {
  const selectedProduct = getDataItem(productElement);
  productList.push(selectedProduct); // Thêm sản phẩm vào mảng productList
  console.log("🚀 ~ productList:", productList)
  // Cập nhật giao diện giỏ hàng và thực hiện các công việc khác nếu cần
}

// Hãy chắc chắn rằng bạn đã import hàm getDataItem từ file cart_controller.js ở file index.js.

