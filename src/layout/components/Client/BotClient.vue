<template>
  <footer class="modern-footer-grid">
    <div class="footer-container">
      <div class="footer-content">
        
        <div class="link-group">
          <h3>VỀ IXTALTOUR</h3>
          <a href="#">Giới thiệu</a>
          <a href="#">Câu hỏi thường gặp</a>
          <a href="#">Điều khoản dịch vụ</a>
        </div>

        <div class="link-group">
          <h3>HỖ TRỢ</h3>
          <a href="#">Đăng ký giảng viên</a>
          <a href="#">Chính sách hoa hồng</a>
          <a href="#">Điều khoản hợp tác</a>
        </div>

        <div class="link-group">
          <h3>LIÊN HỆ</h3>
          <p>836 Nguyễn Hữu Thọ<br>Thanh Khê, Đà Nẵng</p>
          <p>Hotline: 0236 365 0403</p>
        </div>

        <div class="map-side">
          <div id="map" class="map-container"></div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2026 IxtalTour. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

onMounted(() => {
  // Tọa độ ĐH Duy Tân
  const map = L.map('map').setView([16.0583, 108.2120], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([16.0583, 108.2120]).addTo(map)
    .bindPopup('Đại học Duy Tân');
});
</script>

<style scoped>
/* CSS cho Footer */
.modern-footer-grid { 
  background-color: #f4fdf8; 
  color: #1a3326; 
  padding: 4rem 24px 2rem; 
  border-top: 1px solid rgba(143, 223, 181, 0.4);
}

.footer-container { max-width: 1400px; margin: 0 auto; }

/* Grid 4 cột */
.footer-content { 
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 30px; 
  padding-bottom: 3rem;
}

.link-group h3 { font-size: 0.75rem; letter-spacing: 0.2em; color: #6a9a80; margin-bottom: 1.5rem; }
.link-group a, .link-group p { display: block; color: #1a3326; text-decoration: none; margin-bottom: 10px; font-size: 0.9rem; }

/* Cấu hình bản đồ */
.map-container { 
  width: 100%; 
  height: 200px; /* Chiều cao khớp với các cột chữ */
  border-radius: 12px; 
  overflow: hidden;
  border: 1px solid rgba(143, 223, 181, 0.5);
}

.footer-bottom { 
  text-align: center; padding-top: 2rem; border-top: 1px solid rgba(143, 223, 181, 0.3); 
  font-size: 0.85rem; color: #6a9a80;
}

@media (max-width: 1024px) {
  .footer-content { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .footer-content { grid-template-columns: 1fr; }
}
</style>