const form = document.getElementById('registerForm');
const successDiv = document.getElementById('success-msg');

// --- Các hàm tiện ích ---
function showError(id, message) {
    const errorSpan = document.getElementById(`error-${id}`);
    errorSpan.innerText = message;
    document.getElementById(id)?.classList.add('invalid');
}

function clearError(id) {
    const errorSpan = document.getElementById(`error-${id}`);
    errorSpan.innerText = "";
    document.getElementById(id)?.classList.remove('invalid');
}

// --- Các hàm Validate riêng biệt ---
function validateFullname() {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/; // Chữ cái, khoảng trắng, ít nhất 3 ký tự
    if (!val) { showError('fullname', 'Họ tên không được để trống'); return false; }
    if (!regex.test(val)) { showError('fullname', 'Tên ít nhất 3 ký tự và chỉ chứa chữ cái'); return false; }
    clearError('fullname'); return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) { showError('email', 'Email không được để trống'); return false; }
    if (!regex.test(val)) { showError('email', 'Email không đúng định dạng'); return false; }
    clearError('email'); return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!regex.test(val)) { showError('phone', 'SĐT phải có 10 số và bắt đầu bằng số 0'); return false; }
    clearError('phone'); return true;
}

function validatePassword() {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) { showError('password', 'Mật khẩu ≥ 8 ký tự, gồm chữ hoa, chữ thường và số'); return false; }
    clearError('password'); return true;
}

function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || !confirm) { showError('confirmPassword', 'Mật khẩu xác nhận không khớp'); return false; }
    clearError('confirmPassword'); return true;
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) { showError('gender', 'Vui lòng chọn giới tính'); return false; }
    clearError('gender'); return true;
}

function validateTerms() {
    const checked = document.getElementById('terms').checked;
    if (!checked) { showError('terms', 'Bạn phải đồng ý với điều khoản'); return false; }
    clearError('terms'); return true;
}

// --- Gán sự kiện Realtime (Blur & Input) ---
const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
fields.forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirm();
    });
    
    element.addEventListener('input', () => clearError(id));
});

// Riêng radio và checkbox dùng 'change'
document.getElementsByName('gender').forEach(r => r.addEventListener('change', () => clearError('gender')));
document.getElementById('terms').addEventListener('change', () => clearError('terms'));

// --- Xử lý Submit ---
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Sử dụng toán tử bitwise & để ép tất cả các hàm phải chạy (không dừng sớm)
    // Nhưng lưu ý: kết quả của & là số, nên ta so sánh với 1 (true)
    const isValid = validateFullname() & 
                    validateEmail() & 
                    validatePhone() & 
                    validatePassword() & 
                    validateConfirm() & 
                    validateGender() & 
                    validateTerms();

    if (isValid) {
        const name = document.getElementById('fullname').value;
        form.style.display = 'none';
        successDiv.innerHTML = `<h3>Đăng ký thành công! 🎉</h3><p>Chào mừng, <b>${name}</b>!</p>`;
        successDiv.style.display = 'block';
    }
});