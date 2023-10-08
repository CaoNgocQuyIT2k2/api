
const cart = []; // Định nghĩa biến cart trong cart_controller.js

export function getDataItem(productElement) {
    // Lấy các phần tử con tương ứng trong phần tử sản phẩm
    var imgElement = productElement.querySelector('.image');
    var nameElement = productElement.querySelector('h3');
    var typeElement = productElement.querySelector('p');
    var priceElement = productElement.querySelector('.price span');

    // Trích xuất thông tin từ các phần tử HTML
    var imgItem = imgElement.src;
    var nameItem = nameElement.textContent;
    var typeItem = typeElement.textContent;
    var priceItem = priceElement.textContent;

    // Tạo đối tượng sản phẩm từ thông tin trích xuất
    return {
        name: nameItem,
        price: priceItem,
        img: imgItem,
        type: typeItem
    };
}
