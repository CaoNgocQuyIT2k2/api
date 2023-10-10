// Khi trang được tải lại, hiển thị spinner
document.addEventListener('DOMContentLoaded', () => {
  showSpinner();
  renderProductionList(); // Gọi hàm để tải danh sách sản phẩm lại sau khi trang được tải lại
});

// Button shop
function scrollToProducts() {
  // Lấy phần tử "products" bằng cách sử dụng class
  var productsElement = document.querySelector(".products");

  // Sử dụng phương thức scrollIntoView để cuộn trang đến phần tử "products"
  if (productsElement) {
    productsElement.scrollIntoView({ behavior: "smooth" });
  }
}
window.scrollToProducts = scrollToProducts
window.filterProducts = filterProducts
var dssp = []; // Định nghĩa biến dssp ở ngoài phạm vi của hàm

function renderProductionList(productArr) {
  var productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Xóa nội dung cũ trong container trước khi thêm dữ liệu mới

  productArr.forEach((product) => {
    var productDiv = document.createElement("div");
    productDiv.classList.add("item");
    productDiv.innerHTML = `
      <div class="item">
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
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    `;

    productContainer.appendChild(productDiv);

    // Thêm sự kiện click vào nút "Add to Cart"
    const addToCartButton = productDiv.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      addToCart(productDiv);
    });
  });
}



//------------------------------Lọc sản phẩm--------------------
// Hàm lọc danh sách sản phẩm theo loại sản phẩm
function filterProducts() {
  var filterSelect = document.getElementById("filterSelect");

  // Kiểm tra xem filterSelect có tồn tại không
  if (filterSelect) {
    var selectedOption = filterSelect.value;

    // Lọc danh sách sản phẩm dựa trên loại sản phẩm đã chọn
    var filteredProducts;

    if (selectedOption === "") {
      // Nếu chọn "Tất cả", trả về tất cả sản phẩm
      filteredProducts = dssp;
    } else {
      // Ngược lại, lọc theo loại sản phẩm đã chọn
      filteredProducts = dssp.filter(function (product) {
        return product.type.toLowerCase() === selectedOption;
      });
    }

    // Gọi hàm để hiển thị danh sách sản phẩm đã được lọc
    renderProductionList(filteredProducts);
  }
}


// Gọi api lấy danh sách sản phẩm đang có từ server
axios({
  url: "https://6520dbe6906e276284c4beec.mockapi.io/Products",
  method: "GET",
})
  .then((res) => {
    // Api trả về thành công
    dssp = res.data; // Gán danh sách sản phẩm cho biến dssp

    // Gọi hàm filterProducts để hiển thị danh sách sản phẩm ban đầu
    filterProducts();
  })
  .catch((err) => {
    console.log(err);
  }); 
//------------------------Giỏ hàng--------------------------

// Khai báo mảng để lưu trữ các sản phẩm trong giỏ hàng
const cart = [];


// Hàm để lấy thông tin sản phẩm từ phần tử sản phẩm
function getDataItem(productElement) {
  // Lấy các phần tử con tương ứng trong phần tử sản phẩm
  var nameElement = productElement.querySelector("h3");
  var priceElement = productElement.querySelector(".price span");
  var imgElement = productElement.querySelector(".image");
  var typeElement = productElement.querySelector("p");

  // Trích xuất thông tin từ các phần tử HTML
  var nameItem = nameElement.textContent;
  var priceItem = priceElement.textContent;
  var imgItem = imgElement.src;
  var typeItem = typeElement.textContent;

  // Tạo đối tượng sản phẩm từ thông tin trích xuất
  return {
    name: nameItem,
    price: priceItem,
    img: imgItem,
    type: typeItem,
  };
}

 let productList = [];

let productList_localStorage = "productList_localStorage";

// Render lại data từ local storage khi user reload 
var dataJson = localStorage.getItem(productList_localStorage);

  //
  import { tableIdCounter } from "./cart_index.js";
  // Import và sử dụng hàm renderItemList
  import { renderItemList } from "./cart_index.js";

  // Sử dụng hàm renderItemList ở đây
  if (dataJson != null) {
    // Kiểm tra dữ liệu dưới local storage có tồn tại hay không trước khi render
    productList = JSON.parse(dataJson); // Gán dữ liệu từ localStorage vào productList
    // Export biến productList
    // renderItemList(productList);
  }

// Export biến productList
export default productList;
window.productList = productList;


function calculateTotalQuality() {
  const totalQuality = productList.reduce((total, item) => total + item.quality, 0);
  return totalQuality;
}

// Gọi hàm để tính tổng quality
const totalQuality = calculateTotalQuality();

// Hiển thị giá trị tổng quality trong thẻ cart-count
const cartCountElement = document.getElementById("cart-count");
cartCountElement.textContent = totalQuality;



function calculateTotalQuantityInCart() {
  const totalQuantity = cart.reduce((total, item) => total + item.quality, 0);
  console.log("🚀 ~ totalQuantity:", totalQuantity)
  return totalQuantity;
}

import { updateCartCount } from "./cart_index.js";


// Hàm để thêm sản phẩm vào mảng productList
function addToProductList(product) {
  // Kiểm tra xem sản phẩm đã có trong danh sách sản phẩm chưa
  const existingProductIndex = productList.findIndex(
    (item) => item.name === product.name
  );

  if (existingProductIndex !== -1) {
    // Nếu sản phẩm đã tồn tại trong danh sách, tăng quality lên 1 đơn vị
    productList[existingProductIndex].quality += 1;
  } else {
    // Nếu sản phẩm chưa tồn tại trong danh sách, thêm vào với quality là 1
    product.quality = 1;
    productList.push(product);
  }

  // Log thông báo vào console
  console.log("Sản phẩm đã được thêm vào danh sách sản phẩm:", product.name);

  // Log danh sách sản phẩm vào console
  console.log("Danh sách sản phẩm:", productList);

  // Convert array to json để lưu xuống local storage
  var dataJson = JSON.stringify(productList); // Sửa thành productList
  // Lưu json vào local storage
  localStorage.setItem(productList_localStorage, dataJson);
  // Lưu số lượng sản phẩm trong giỏ hàng vào local storage
  const totalQuantityInCart = calculateTotalQuantityInCart();
  localStorage.setItem("totalQuantityInCart", totalQuantityInCart);

}



// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(productElement) {
  // Lấy thông tin sản phẩm từ hàm getDataItem
  const selectedProduct = getDataItem(productElement);
  updateCartCount();
  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingCartItem = cart.find(
    (item) => item.name === selectedProduct.name
  );

  if (existingCartItem) {
    // Nếu sản phẩm đã có trong giỏ hàng, tăng quality lên 1 đơn vị
    existingCartItem.quality += 1;
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng với quality là 1
    selectedProduct.quality = 1;
    cart.push(selectedProduct);
  }



  // Gọi hàm để thêm sản phẩm vào danh sách sản phẩm
  addToProductList(selectedProduct);
}

