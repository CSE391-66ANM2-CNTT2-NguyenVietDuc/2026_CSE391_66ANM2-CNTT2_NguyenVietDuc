// --- 1. KHỞI TẠO DỮ LIỆU ---
let localData = JSON.parse(localStorage.getItem('students')) || [];
let students = [];

// So sánh để lấy dữ liệu mặc định nếu local trống (giả định có biến defaultStudents từ file data.js)
if (typeof defaultStudents !== 'undefined' && localData.length < defaultStudents.length) {
    students = defaultStudents;
    localStorage.setItem('students', JSON.stringify(students));
} else {
    students = localData;
}

let editId = null;

// --- 2. HÀM HIỂN THỊ DANH SÁCH (RENDER) ---
function renderStudents() {
    const listDiv = document.getElementById('student-list'); 
    if (!listDiv) return;
    listDiv.innerHTML = ""; 

    if (students.length === 0) {
        listDiv.innerHTML = "<tr><td colspan='8' class='text-center'>Danh sách trống</td></tr>";
        return;
    }

    students.forEach((s, index) => {
        listDiv.innerHTML += `
            <tr>
                <th scope="row" class="text-center">${index + 1}</th>
                <td>${s.fullname}</td>
                <td>${s.email}</td>
                <td>${s.date}</td>
                <td>${s.major}</td>
                <td>${s.studentId}</td
                
               
            </tr>`;
    });
}

// --- 3. HÀM XÓA ---
function deleteStudent(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên mã " + id + " không?")) {
        students = students.filter(s => s.studentId !== id);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }
}

// --- 4. XỬ LÝ KHI NHẤN NÚT "LƯU THÔNG TIN" (VALIDATE & SUBMIT) ---
const studentForm = document.getElementById('student-form');
if (studentForm) {
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // Lấy dữ liệu từ các input
        const fullname = document.getElementById('fullname').value.trim();
        const studentId = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value.trim();
        const major = document.getElementById('major').value;
   

        // --- BẮT ĐẦU VALIDATE THEO YÊU CẦU ---

        // 4.1. Không được để trống bất kỳ trường nào
        if (!fullname || !studentId || !email || !date || !major ) {
            alert("Vui lòng không để trống bất kỳ trường thông tin nào!");
            return;
        }

        // 4.2. Họ tên: Tối đa 30 ký tự
        if (fullname.length > 60) {
            alert("Họ tên không được vượt quá 60 ký tự!");
            return;
        }

        // 4.3. Email: Đúng định dạng chuẩn
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng chuẩn!");
            return;
        }
         if (major.length > 60) {
            alert("hội thảo  không được vượt quá 60 ký tự!");
            return;
        }

        // 4.4. date: Đúng 10 chữ số
        const dateRegex = /^\d{10}$/; 
        if (!dateRegex.test(date)) {
            alert("Số điện thoại phải đúng 10 chữ số!");
            return;
        }

        // --- KẾT THÚC VALIDATE ---

        const studentData = { 
            fullname, studentId, email, date, major, 
           
        };

        if (editId) {
            // Chế độ Sửa: Tìm theo mã cũ và cập nhật
            const index = students.findIndex(s => s.studentId === editId);
            if (index !== -1) {
                students[index] = studentData;
                alert("Cập nhật thông tin thành công!");
            }
        } else {
            // Chế độ Thêm mới: Check trùng mã SV
            if (students.some(s => s.studentId === studentId)) {
                alert("Mã sinh viên này đã tồn tại trên hệ thống!");
                return;
            }
            students.push(studentData);
            alert("Thêm mới sinh viên thành công!");
        }

        // Lưu vào LocalStorage và quay lại danh sách
        localStorage.setItem('students', JSON.stringify(students));
        editId = null; 
        showList(); 
    });
}

// --- 5. CÁC HÀM ĐIỀU HƯỚNG GIAO DIỆN ---
function showForm(id = null) {
    document.getElementById('list-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
    
    studentForm.reset();
    
    if (id) {
        // Chế độ Sửa
        editId = id;
        document.getElementById('form-title').innerText = "Sửa thông tin Sinh viên";
        const s = students.find(item => item.studentId === id);
        if (s) {
            document.getElementById('fullname').value = s.fullname;
            document.getElementById('studentId').value = s.studentId;
            document.getElementById('studentId').readOnly = true; 
            document.getElementById('email').value = s.email;
            document.getElementById('date').value = s.date;
            document.getElementById('major').value = s.major;
            
            if (rd) rd.checked = true;
        }
    } else {
        // Chế độ Thêm mới
        editId = null;
        document.getElementById('form-title').innerText = "Thêm hội thảo mới ";
        document.getElementById('studentId').readOnly = false;
    }
}

function showList() {
    document.getElementById('list-section').style.display = 'block';
    document.getElementById('form-section').style.display = 'none';
    renderStudents();
}

// Gọi render lần đầu khi load trang
document.addEventListener('DOMContentLoaded', renderStudents);