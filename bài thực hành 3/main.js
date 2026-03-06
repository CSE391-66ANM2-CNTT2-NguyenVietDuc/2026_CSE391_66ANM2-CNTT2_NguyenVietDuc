// Khai báo thông tin cá nhân
let name = "Nguyễn Việt Đức"; // Thay chữ trong ngoặc kép bằng tên của bạn
let yearOfBirth = 2006;    // Thay số này bằng năm sinh của bạn
let currentYear = 2026;

// Tính toán tuổi
let age = currentYear - yearOfBirth;

// Xuất kết quả ra màn hình Console
console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.");

// --- PHẦN LOGIC VÀ HÀM ---

// 1. Kiểm tra xếp loại
let score = 7.5; // Bạn có thể thử đổi thành 9 hoặc 4 để xem kết quả khác nhau

console.log("--- Kết quả xếp loại ---");
if (score >= 8) {
  console.log("Xếp loại: Giỏi");
} else if (score >= 6.5) {
  console.log("Xếp loại: Khá");
} else if (score >= 5) {
  console.log("Xếp loại: Trung bình");
} else {
  console.log("Xếp loại: Yếu");
}

// 2. Định nghĩa hàm tính điểm trung bình
function tinhDiemTrungBinh(m1, m2, m3) {
  let avg = (m1 + m2 + m3) / 3;
  return avg;
}

// Ghi chú để sinh viên thử nghiệm
console.log("Hàm tính điểm đã sẵn sàng. Hãy gõ tinhDiemTrungBinh(8, 7, 9) vào Console để thử!");

function xepLoai(avg) {
  // TODO: Dùng if/else để:
  // avg >= 8  -> "Giỏi"
  // avg >= 6.5 -> "Khá"
  // avg >= 5  -> "Trung bình"
  // còn lại   -> "Yếu"
}
let avg = tinhDiemTrungBinh(8, 7, 9);
let loai = xepLoai(avg);
console.log("Điểm TB:", avg, " - Xếp loại:", loai);
function kiemTraTuoi(age) {
  if (age >= 18) {
    console.log("Đủ 18 tuổi");
  } else {
    console.log("Chưa đủ 18 tuổi");
  }
}

// Gọi thử hàm trực tiếp trong code
console.log("--- Kiểm tra thử với hàm kiemTraTuoi ---");
kiemTraTuoi(16); // Mong đợi: "Chưa đủ 18 tuổi"
kiemTraTuoi(20); // Mong đợi: "Đủ 18 tuổi"