// 1. Mảng lưu trữ dữ liệu gốc
let students = [];

// Truy vấn các phần tử DOM
const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

// 2. Hàm tính xếp loại dựa trên điểm
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 3. Hàm vẽ lại bảng và cập nhật thống kê (renderTable)
function renderTable() {
    tableBody.innerHTML = ''; // Xóa bảng cũ
    let totalScore = 0;

    students.forEach((student, index) => {
        totalScore += student.score;
        const rank = getRank(student.score);
        
        // Kiểm tra điều kiện tô màu nền hàng yếu (< 5)
        const rowClass = student.score < 5 ? 'highlight-weak' : '';

        const row = `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score.toFixed(1)}</td>
                <td>${rank}</td>
                <td>
                    <button class="btn-delete" data-index="${index}">Xóa</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Cập nhật dòng thống kê
    const avgScore = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    summaryArea.innerHTML = `Tổng số sinh viên: ${students.length} | Điểm trung bình: ${avgScore}`;
}

// 4. Hàm xử lý logic thêm sinh viên
function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    // Kiểm tra hợp lệ (Yêu cầu 1)
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (từ 0 đến 10)!");
        return;
    }

    // Thêm vào mảng
    students.push({ name, score });

    // Cập nhật giao diện
    renderTable();

    // Reset form (Yêu cầu 1)
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
}

// --- XỬ LÝ SỰ KIỆN ---

// Click nút Thêm
btnAdd.addEventListener('click', addStudent);

// Nhấn Enter ở ô Điểm (Yêu cầu 4)
txtScore.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Event Delegation trên <tbody> để xử lý xóa (Yêu cầu 2 & Gợi ý)
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        // Dùng data-index để biết cần xóa phần tử nào (Yêu cầu 3)
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1); 
        renderTable(); 
    }
});