<template>
  <header class="header-vung shadow-sm">
    <nav class="navbar navbar-expand-lg py-2 thanh-header-xanh">
      <div class="container-fluid px-4">
        <router-link to="/" class="navbar-brand fw-bold fs-4 d-flex align-items-center">
          <img src="../../../assets/images/Logo1.png" alt="Logo" class="me-2 logo-chinh">
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuChinh">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menuChinh">
          <!-- VÙNG TÌM KIẾM THÔNG MINH CÓ AUTOCOMPLETE -->
          <div class="ms-4 vung-tim-kiem d-none d-lg-block position-relative" ref="searchContainer">
            <div class="input-group shadow-sm" style="border-radius: 30px; overflow: hidden; background: white;">
              <span class="input-group-text vung-nhap-lieu border-end-0 bg-white" @click="thucHienTimKiem">
                <i class="fa-solid fa-magnifying-glass text-dark"></i>
              </span>
              <!-- Thêm @input để vừa gõ vừa tìm -->
              <input type="text" class="form-control vung-nhap-lieu border-start-0 ps-0 text-dark bg-white border-end-0"
                v-model="tuKhoaTimKiem" 
                @input="goiApiGoiYTimKiem"
                @focus="hienThiGoiY = true"
                @keyup.enter="thucHienTimKiem"
                placeholder="Tìm kiếm tour, điểm đến...">
              
              <span class="input-group-text vung-nhap-lieu border-start-0 bg-white cursor-pointer" 
                v-if="tuKhoaTimKiem" @click="xoaTimKiem">
                <i class="fa-solid fa-xmark text-secondary small"></i>
              </span>
            </div>

            <!-- KHUNG DANH SÁCH GỢI Ý XỔ XUỐNG -->
            <ul class="dropdown-menu show w-100 shadow border-0 position-absolute mt-2 goiy-dropdown" 
                v-if="hienThiGoiY && danhSachGoiY.length > 0">
                <li class="px-3 py-2 text-muted small border-bottom">Tour gợi ý</li>
                <li v-for="(tour, index) in danhSachGoiY.slice(0, 5)" :key="index">
                    <a class="dropdown-item d-flex align-items-center py-2" href="javascript:void(0)" @click="chonTourTuGoiY(tour.id)">
                        <img :src="tour.hinh_anh" class="rounded me-3" style="width: 45px; height: 45px; object-fit: cover;">
                        <div class="flex-grow-1 overflow-hidden">
                            <h6 class="mb-0 text-dark text-truncate fs-6">{{ tour.ten_tour }}</h6>
                            <small class="text-danger fw-bold">{{ formatVND(tour.gia) }}</small>
                        </div>
                    </a>
                </li>
                <!-- Nút xem tất cả kết quả -->
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item text-center text-primary fw-bold py-2" href="javascript:void(0)" @click="thucHienTimKiem">
                        Xem tất cả kết quả cho "{{ tuKhoaTimKiem }}"
                    </a>
                </li>
            </ul>
          </div>

          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3">Trang Chủ</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle px-3" href="#" role="button" data-bs-toggle="dropdown">Tour</a>
              <ul class="dropdown-menu shadow border-0">
                <li><router-link class="dropdown-item" to="/client/tour/tour-trong-nuoc">Trong Nước</router-link></li>
                <li><router-link class="dropdown-item" to="/client/tour/tour-ngoai-nuoc">Nước Ngoài</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/client/huong-dan-vien" class="nav-link px-3">Hướng Dẫn Viên</router-link>
            </li>
            <li class="nav-item"><router-link to="/client/bai-viet" class="nav-link px-3">Blog</router-link></li>
            <li class="nav-item"><router-link to="/client/lien-he" class="nav-link px-3">Liên Hệ</router-link></li>

            <div class="d-flex align-items-center ms-lg-4 nhom-bieu-tuong">
              <router-link to="/client/lich-su-dat-tour" class="bieu-tuong-item me-3 position-relative">
                <i class="fa-solid fa-bag-shopping text-dark"></i>
                <span class="cham-thong-bao" v-if="isLoggedIn"></span>
              </router-link>

              <div class="dropdown border-start border-secondary-subtle ps-3">
                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret d-flex align-items-center p-0" href="#"
                  role="button" data-bs-toggle="dropdown">
                  <img :src="avatar_kh" class="anh-nguoi-dung rounded-circle" alt="User Avatar" />
                </a>

                <ul class="dropdown-menu dropdown-menu-end shadow border-0"
                  style="min-width: 220px; border-radius: 12px;">
                  <template v-if="isLoggedIn">
                    <li class="px-3 py-3 border-bottom text-center bg-light"
                      style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                      <img :src="avatar_kh" class="rounded-circle mb-2 shadow-sm" width="50" height="50"
                        style="object-fit: cover;">
                      <p class="mb-0 fw-bold text-dark">{{ ho_va_ten }}</p>
                      <small class="text-muted">{{ email_kh }}</small>
                    </li>
                    <li>
                      <router-link class="dropdown-item py-2 mt-2 fw-medium" to="/client/profile">
                        <i class="fa-solid fa-address-card text-primary me-2 w-20px text-center"></i> Thông tin cá nhân
                      </router-link>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <a class="dropdown-item py-2 fw-medium text-danger" @click="dangXuat()" href="javascript:void(0)">
                        <i class="fa-solid fa-right-from-bracket me-2 w-20px text-center"></i> Đăng xuất
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item py-2 fw-medium text-danger" @click="dangXuatAll()"
                        href="javascript:void(0)">
                        <i class="fa-solid fa-power-off me-2 w-20px text-center"></i> Đăng xuất all
                      </a>
                    </li>
                  </template>

                  <template v-else>
                    <li>
                      <router-link class="dropdown-item py-2 fw-medium" to="/client/dang-nhap">
                        <i class="fa-solid fa-arrow-right-to-bracket text-primary me-2"></i> Đăng nhập
                      </router-link>
                    </li>
                    <li>
                      <router-link class="dropdown-item py-2 fw-medium" to="/client/dang-ky">
                        <i class="fa-solid fa-user-plus text-success me-2"></i> Đăng ký
                      </router-link>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from "axios";
import apiUrl from "../../../utils/api";

export default {
  data() {
    return {
      ho_va_ten: null,
      email_kh: null,
      avatar_kh: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
      // Dữ liệu tìm kiếm
      tuKhoaTimKiem: "",
      danhSachGoiY: [],
      hienThiGoiY: false,
      timKiemTimeout: null // Dùng để delay việc gọi API liên tục khi gõ nhanh
    };
  },
  computed: {
    isLoggedIn() {
      return !!(localStorage.getItem("key_client"));
    },
  },
  mounted() {
    this.checkLogin();
    window.addEventListener("profile-updated", () => {
      this.ho_va_ten = localStorage.getItem("ho_va_ten") || this.ho_va_ten;
      const storedAvatar = localStorage.getItem("avatar");
      if (storedAvatar && storedAvatar !== "null" && storedAvatar !== "") {
        this.avatar_kh = storedAvatar;
      } else {
        this.avatar_kh = `https://ui-avatars.com/api/?name=${this.ho_va_ten || 'KH'}&background=random&color=fff`;
      }
    });

    // Lắng nghe click ngoài vùng tìm kiếm để đóng gợi ý
    document.addEventListener('click', this.clickOutsideSearch);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutsideSearch);
  },
  methods: {
    // CLICK RA NGOÀI ĐÓNG KHUNG GỢI Ý
    clickOutsideSearch(event) {
        if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
            this.hienThiGoiY = false;
        }
    },
    // VỪA GÕ VỪA TÌM
    goiApiGoiYTimKiem() {
        if (!this.tuKhoaTimKiem.trim()) {
            this.danhSachGoiY = [];
            this.hienThiGoiY = false;
            return;
        }
        
        // Clear timeout cũ nếu khách đang gõ nhanh
        if (this.timKiemTimeout) clearTimeout(this.timKiemTimeout);

        // Đợi 300ms sau khi ngừng gõ mới gọi API để đỡ lag server
        this.timKiemTimeout = setTimeout(() => {
            axios.post(apiUrl("client/tour/search"), { tu_khoa: this.tuKhoaTimKiem })
                .then(res => {
                    if (res.data.status) {
                        this.danhSachGoiY = res.data.data;
                        this.hienThiGoiY = true;
                    }
                });
        }, 300);
    },
    // BẤM VÀO GỢI Ý CHUYỂN TRANG CHI TIẾT
    chonTourTuGoiY(id) {
        this.hienThiGoiY = false;
        this.tuKhoaTimKiem = "";
        this.$router.push(`/client/chi-tiet-tour/${id}`);
    },
    // BẤM ENTER HOẶC KÍNH LÚP SẼ SANG TRANG DANH SÁCH TÌM KIẾM
    thucHienTimKiem() {
      if (this.tuKhoaTimKiem.trim() !== "") {
        this.hienThiGoiY = false;
        this.$router.push({ 
            path: '/tim-kiem-tour', 
            query: { keyword: this.tuKhoaTimKiem.trim() } 
        });
      }
    },
    xoaTimKiem() {
      this.tuKhoaTimKiem = "";
      this.danhSachGoiY = [];
      this.hienThiGoiY = false;
    },
    formatVND(value) {
        if (!value) return "0 ₫";
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },

    // --- Các hàm cũ giữ nguyên ---
    checkLogin() {
      const token = localStorage.getItem("key_client");
      if (!token) return;
      axios.get(apiUrl('client/check-token'), {
        headers: { Authorization: 'Bearer ' + token }
      }).then((res) => {
        if (res.data.status) {
          this.ho_va_ten = res.data.ho_ten;
          this.email_kh = res.data.email;
          if (res.data.avatar) {
            this.avatar_kh = res.data.avatar;
            localStorage.setItem("avatar", res.data.avatar);
          } else {
            this.avatar_kh = `https://ui-avatars.com/api/?name=${this.ho_va_ten}&background=random&color=fff`;
            localStorage.removeItem("avatar");
          }
          localStorage.setItem("ho_va_ten", this.ho_va_ten);
        }
      }).catch(() => { this.clearAuthData(); });
    },
    dangXuat() {
      const token = localStorage.getItem("key_client");
      axios.post(apiUrl("client/dang-xuat"), {}, { headers: { Authorization: "Bearer " + token } }).then((res) => {
        if (res.data.status) {
          this.clearAuthData();
          this.$router.push("/client/dang-nhap");
          this.$toast.success(res.data.message);
        }
      }).catch(() => { this.clearAuthData(); this.$router.push("/client/dang-nhap"); });
    },
    dangXuatAll() {
      const token = localStorage.getItem("key_client");
      if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi tất cả các thiết bị không?")) {
        axios.post(apiUrl("client/dang-xuat-all"), {}, { headers: { Authorization: "Bearer " + token } }).then((res) => {
          if (res.data.status) {
            this.clearAuthData();
            this.$router.push("/client/dang-nhap");
            this.$toast.success(res.data.message || "Đã đăng xuất");
          }
        }).catch(() => { this.clearAuthData(); this.$router.push("/client/dang-nhap"); });
      }
    },
    clearAuthData() {
      localStorage.removeItem("key_client");
      localStorage.removeItem("ho_va_ten");
      localStorage.removeItem("avatar");
      this.ho_va_ten = null;
      this.email_kh = null;
      this.avatar_kh = 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png';
    }
  },
};
</script>

<style scoped>
.goiy-dropdown {
    border-radius: 15px;
    top: 100%;
    left: 0;
    z-index: 1050;
    max-height: 400px;
    overflow-y: auto;
}
.goiy-dropdown::-webkit-scrollbar { width: 5px; }
.goiy-dropdown::-webkit-scrollbar-thumb { background-color: #ccc; border-radius: 10px; }
.dropdown-item:hover {
    background-color: #f8f9fa;
}

.logo-chinh { width: 130px !important; height: auto !important; max-height: none !important; min-height: 0 !important; transition: all 0.3s ease; }
.header-vung { position: sticky; top: 0; z-index: 1000; margin-top: -5px; background-color: #f3ffff; }
.thanh-header-xanh { background-color: #f3fffd !important; }
.navbar { padding-top: 5px !important; padding-bottom: 5px !important; }
.nav-link { font-weight: 600 !important; font-size: 0.95rem; color: #212529 !important; padding-top: 0; padding-bottom: 0; }
.nav-link:hover { color: #005baa !important; }
.vung-tim-kiem { max-width: 380px; width: 100%; }
.vung-nhap-lieu { background-color: transparent !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; color: #212529 !important; }
.vung-nhap-lieu::placeholder { color: #6c757d !important; }
.form-control:focus { box-shadow: none; background-color: rgba(0, 0, 0, 0.02) !important; }
.bieu-tuong-item { font-size: 1.2rem; text-decoration: none; transition: all 0.3s; }
.anh-nguoi-dung { width: 38px; height: 38px; object-fit: cover; border: 2px solid #005baa; background-color: #fff; }
.cham-thong-bao { position: absolute; top: 0; right: -2px; width: 9px; height: 9px; background-color: #ff4d4d; border-radius: 50%; border: 2px solid #f3ffff; }
.dropdown-toggle-nocaret::after { display: none; }
.cursor-pointer { cursor: pointer; }
.w-20px { width: 24px; }
@media (max-width: 991px) { .vung-tim-kiem { max-width: 100%; margin: 15px 0; } .nhom-bieu-tuong { margin-top: 15px; border-top: 1px solid rgba(0, 0, 0, 0.1); padding-top: 15px; } .logo-chinh { max-height: 70px; } }
</style>