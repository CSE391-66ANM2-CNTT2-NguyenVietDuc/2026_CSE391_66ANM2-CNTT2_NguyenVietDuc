let students = [];
let sortDirection = 0; // 0: none, 1: asc, 2: desc

// DOM Elements
const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const txtSearch = document.getElementById('txtSearch');
const selRank = document.getElementById('selRank');
const sortScore = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

// Logic xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Hiển thị dữ liệu lên bảng
function renderTable(dataToRender) {
    tableBody.innerHTML = '';
    
    if (dataToRender.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="no-result">Không có kết quả</td></tr>';
    }

    dataToRender.forEach((student, index) => {
        const rank = getRank(student.score);
        const rowClass = student.score < 5 ? 'highlight-weak' : '';

        const row = `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score.toFixed(1)}</td>
                <td>${rank}</td>
                <td>
                    <button class="btn-delete" data-id="${student.id}">Xóa</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    const total = students.length;
    const avg = total > 0 ? (students.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2) : 0;
    summaryArea.innerHTML = `<span>Tổng số sinh viên: ${total}</span> <span>Điểm trung bình: ${avg}</span>`;
}

// Hàm xử lý chung (Lọc + Tìm kiếm + Sắp xếp)
function applyFilters() {
    let keyword = txtSearch.value.toLowerCase().trim();
    let rankFilter = selRank.value;

    let filtered = students.filter(s => {
        let matchName = s.name.toLowerCase().includes(keyword);
        let matchRank = (rankFilter === "All" || getRank(s.score) === rankFilter);
        return matchName && matchRank;
    });

    if (sortDirection === 1) {
        filtered.sort((a, b) => a.score - b.score);
        sortIcon.innerText = "▲";
    } else if (sortDirection === 2) {
        filtered.sort((a, b) => b.score - a.score);
        sortIcon.innerText = "▼";
    } else {
        sortIcon.innerText = "↕";
    }

    renderTable(filtered);
}

// Thêm sinh viên mới
function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Thông tin không hợp lệ!");
        return;
    }

    students.push({ id: Date.now(), name, score });
    applyFilters();

    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
}

// Gán sự kiện
btnAdd.addEventListener('click', addStudent);
txtSearch.addEventListener('input', applyFilters);
selRank.addEventListener('change', applyFilters);

sortScore.addEventListener('click', () => {
    sortDirection = (sortDirection + 1) % 3;
    applyFilters();
});

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(s => s.id !== idToDelete);
        applyFilters();
    }
});