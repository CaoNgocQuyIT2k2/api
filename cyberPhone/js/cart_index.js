// Biến đếm cho ID của bảng
let tableIdCounter = 0;
window.tableIdCounter = tableIdCounter;
export { tableIdCounter };



import productList from './index.js';


export function updateCartCount() {
  const totalQuantity = productList.reduce((total, item) => total + item.quality, 0);
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = totalQuantity;
}

window.updateCartCount = updateCartCount;


export function renderItemList(productList) {
  var contentHTML = "";
  for (var i = 0; i < productList.length; i++) {
    var item = productList[i];

    // Tạo ID duy nhất cho bảng
    var tableId = `itemTable${tableIdCounter}`;
    tableIdCounter++; // Tăng biến đếm sau khi sử dụng
    updateCartCount()
    var trString = `<tr id="${tableId}">
        <td>${tableIdCounter}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.img}</td>
        <td>${item.type}</td>
        <td>${item.quality}</td>
        <td>
            <button onclick="addItem('${item.name}', '${tableId}')" class="btn btn-success">+</button>
            <button onclick="subItem('${item.name}', '${tableId}')" class="btn btn-danger pr-3">-</button>
        </td>
    </tr>`;
    contentHTML += trString;

  }

  // Kiểm tra xem phần tử "tblGioHang" có tồn tại hay không trước khi thay đổi nội dung
  var tblGioHang = document.getElementById("tblGioHang");
  if (tblGioHang) {
    tblGioHang.innerHTML = contentHTML;
  }
}

// Sử dụng hàm renderItemList và truyền vào productList
renderItemList(productList);