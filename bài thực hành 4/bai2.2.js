// 1. Cấu hình giá sản phẩm
const PRODUCT_PRICES = {
    "laptop": 25000000,
    "mouse": 500000,
    "keyboard": 1200000
};

// 2. Truy vấn các phần tử DOM
const form = document.getElementById('orderForm');
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const totalPriceLabel = document.getElementById('totalPrice');
const noteInput = document.getElementById('note');
const noteCount = document.getElementById('noteCount');
const deliveryDateInput = document.getElementById('deliveryDate');

// 3. Hàm hiển thị/ẩn lỗi
const toggleError = (id, show) => {
    document.getElementById(`err-${id}`).style.display = show ? 'block' : 'none';
};

// 4. Tính tổng tiền tự động
const updateTotalPrice = () => {
    const price = PRODUCT_PRICES[productSelect.value] || 0;
    const qty = parseInt(quantityInput.value) || 0;
    const total = price * qty;
    totalPriceLabel.textContent = total.toLocaleString('vi-VN') + 'đ';
};

productSelect.addEventListener('change', updateTotalPrice);
quantityInput.addEventListener('input', updateTotalPrice);

// 5. Đếm ký tự realtime cho Ghi chú
noteInput.addEventListener('input', () => {
    const currentLength = noteInput.value.length;
    noteCount.textContent = `${currentLength}/200`;
    
    if (currentLength > 200) {
        noteCount.classList.add('red');
        toggleError('note', true);
    } else {
        noteCount.classList.remove('red');
        toggleError('note', false);
    }
});

// 6. Xử lý xóa lỗi khi người dùng bắt đầu nhập lại (Blur/Input)
[productSelect, quantityInput, deliveryDateInput, document.getElementById('address')].forEach(el => {
    el.addEventListener('blur', () => validateField(el.id));
    el.addEventListener('input', () => toggleError(el.id, false));
});

// 7. Hàm kiểm tra từng trường cụ thể
const validateField = (id) => {
    const val = document.getElementById(id).value.trim();
    switch(id) {
        case 'product': 
            toggleError('product', !val); return !!val;
        case 'quantity':
            const q = parseInt(val);
            const isQValid = q >= 1 && q <= 99;
            toggleError('quantity', !isQValid); return isQValid;
        case 'deliveryDate':
            const date = new Date(val);
            const today = new Date(); today.setHours(0,0,0,0);
            const maxDate = new Date(); maxDate.setDate(today.getDate() + 30);
            const isDateValid = val && date >= today && date <= maxDate;
            toggleError('date', !isDateValid); return isDateValid;
        case 'address':
            const isAddrValid = val.length >= 10;
            toggleError('address', !isAddrValid); return isAddrValid;
        default: return true;
    }
};

// 8. Xử lý Submit Form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isProductOk = validateField('product');
    const isQtyOk = validateField('quantity');
    const isDateOk = validateField('deliveryDate');
    const isAddrOk = validateField('address');
    const isNoteOk = noteInput.value.length <= 200;
    
    const paymentCheck = document.querySelector('input[name="payment"]:checked');
    toggleError('payment', !paymentCheck);

    if (isProductOk && isQtyOk && isDateOk && isAddrOk && isNoteOk && paymentCheck) {
        // Hiển thị tóm tắt trong Modal
        const summaryHtml = `
            <p>📦 <b>Sản phẩm:</b> ${productSelect.options[productSelect.selectedIndex].text}</p>
            <p>🔢 <b>Số lượng:</b> ${quantityInput.value}</p>
            <p>💰 <b>Tổng tiền:</b> <span style="color:blue">${totalPriceLabel.textContent}</span></p>
            <p>📅 <b>Ngày giao:</b> ${deliveryDateInput.value}</p>
        `;
        document.getElementById('summary').innerHTML = summaryHtml;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('confirmModal').style.display = 'block';
    }
});

// 9. Nút điều khiển Modal
document.getElementById('closeModal').onclick = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('confirmModal').style.display = 'none';
};

document.getElementById('finalSubmit').onclick = () => {
    alert("🚀 Đơn hàng đã được hệ thống ghi nhận thành công!");
    form.reset();
    updateTotalPrice();
    document.getElementById('closeModal').click();
};