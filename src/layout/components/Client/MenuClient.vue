<template>
  <header class="header-vung shadow-sm bg-white">
    <nav class="navbar navbar-expand-lg py-2">
      <div class="container px-3">
        
        <router-link to="/" class="navbar-brand fw-bold fs-4 d-flex align-items-center me-4">
          <img src="../../../assets/images/Logo1.png" alt="Ixtal Tour" class="logo-chinh">
        </router-link>

        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#menuChinh">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex justify-content-between" id="menuChinh">
          
          <div class="vung-tim-kiem d-none d-lg-block position-relative" ref="searchContainer">
            <div class="input-group search-box-premium shadow-sm">
              <input type="text" class="form-control vung-nhap-lieu border-0 ps-4 text-dark shadow-none"
                v-model="tuKhoaTimKiem" 
                @input="goiApiGoiYTimKiem"
                @focus="hienThiGoiY = true"
                @keyup.enter="thucHienTimKiem"
                placeholder="Tìm kiếm tour, điểm đến...">
              
              <span class="input-group-text bg-white border-0 cursor-pointer px-2" 
                v-if="tuKhoaTimKiem" @click="xoaTimKiem">
                <i class="fa-solid fa-xmark text-secondary small"></i>
              </span>

              <button class="btn btn-tim-kiem px-3 border-0" @click="thucHienTimKiem">
                <i class="fa-solid fa-magnifying-glass text-white"></i>
              </button>
            </div>

            <ul class="dropdown-menu show w-100 shadow-lg border-0 position-absolute mt-2 goiy-dropdown" 
                v-if="hienThiGoiY && danhSachGoiY.length > 0">
                <li class="px-3 py-2 text-muted small border-bottom fw-bold text-uppercase">Tour gợi ý</li>
                <li v-for="(tour, index) in danhSachGoiY.slice(0, 5)" :key="index">
                    <a class="dropdown-item d-flex align-items-center py-2 hover-glow" href="javascript:void(0)" @click="chonTourTuGoiY(tour.id)">
                        <img :src="tour.hinh_anh" class="rounded-3 me-3 shadow-sm" style="width: 45px; height: 45px; object-fit: cover;">
                        <div class="flex-grow-1 overflow-hidden">
                            <h6 class="mb-0 text-dark text-truncate fs-6 fw-bold">{{ tour.ten_tour }}</h6>
                            <small class="text-danger fw-bold">{{ formatVND(tour.gia) }}</small>
                        </div>
                    </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item text-center text-primary fw-bold py-2 hover-glow" href="javascript:void(0)" @click="thucHienTimKiem">
                        Xem tất cả kết quả <i class="fa-solid fa-arrow-right ms-1"></i>
                    </a>
                </li>
            </ul>
          </div>

          <ul class="navbar-nav mx-auto align-items-center gap-1">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle px-3 btn-hover-effect fw-semibold text-dark" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fa-solid fa-earth-americas text-primary me-1"></i> Tour
              </a>
              <ul class="dropdown-menu shadow-lg border-0 rounded-3 mt-2">
                <li><router-link class="dropdown-item py-2 hover-glow fw-medium" to="/client/tour/tour-trong-nuoc">Trong Nước</router-link></li>
                <li><router-link class="dropdown-item py-2 hover-glow fw-medium" to="/client/tour/tour-ngoai-nuoc">Nước Ngoài</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/client/huong-dan-vien" class="nav-link px-3 btn-hover-effect fw-semibold text-dark">
                <i class="fa-solid fa-users text-success me-1"></i> Hướng Dẫn Viên
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/client/bai-viet" class="nav-link px-3 btn-hover-effect fw-semibold text-dark">
                <i class="fa-solid fa-newspaper text-warning me-1"></i> Blog
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/client/lien-he" class="nav-link px-3 btn-hover-effect fw-semibold text-dark">
                <i class="fa-solid fa-headset text-info me-1"></i> Liên Hệ
              </router-link>
            </li>
          </ul>

          <div class="d-flex align-items-center ms-lg-2 gap-3 nhom-bieu-tuong">
            
            <router-link to="/client/lich-su-dat-tour" class="nav-link position-relative btn-hover-effect p-2 rounded-3 d-flex align-items-center">
              <i class="fa-solid fa-file-invoice fs-5 text-primary"></i>
              <span class="fw-bold text-dark ms-2 d-none d-xl-inline">Hóa đơn</span>
              <span class="cham-thong-bao" v-if="isLoggedIn"></span>
            </router-link>

            <template v-if="!isLoggedIn">
              <div class="dropdown">
                <button class="btn btn-outline-primary rounded-pill px-3 fw-bold dropdown-toggle border-2 btn-sm-custom" type="button" data-bs-toggle="dropdown">
                  <i class="fa-solid fa-right-to-bracket me-1"></i> Đăng nhập
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2">
                  <li class="mb-1">
                    <router-link class="dropdown-item py-2 hover-glow rounded-2 d-flex align-items-center fw-medium" to="/client/dang-nhap">
                      <i class="fa-solid fa-user text-primary me-2 w-20px text-center"></i> Khách hàng
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item py-2 hover-glow rounded-2 d-flex align-items-center fw-medium" to="/huong-dan-vien/dang-nhap">
                      <i class="fa-solid fa-id-badge text-warning me-2 w-20px text-center"></i> Hướng dẫn viên
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="dropdown">
                <button class="btn btn-primary rounded-pill px-3 fw-bold dropdown-toggle btn-gradient border-0 btn-sm-custom text-white" type="button" data-bs-toggle="dropdown">
                  <i class="fa-solid fa-user-plus me-1"></i> Đăng ký
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2">
                  <li class="mb-1">
                    <router-link class="dropdown-item py-2 hover-glow rounded-2 d-flex align-items-center fw-medium" to="/client/dang-ky">
                      <i class="fa-solid fa-user text-primary me-2 w-20px text-center"></i> Khách hàng
                    </router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item py-2 hover-glow rounded-2 d-flex align-items-center fw-medium" to="/huong-dan-vien/dang-ky">
                      <i class="fa-solid fa-id-badge text-warning me-2 w-20px text-center"></i> Hướng dẫn viên
                    </router-link>
                  </li>
                </ul>
              </div>
            </template>

            <template v-else>
              <div class="dropdown border-start border-secondary-subtle ps-3">
                <a class="nav-link d-flex align-items-center gap-2 p-1 btn-hover-effect rounded-pill pe-3" href="#" role="button" data-bs-toggle="dropdown" style="border: 1px solid #e2e8f0;">
                  <img :src="avatar_kh" class="anh-nguoi-dung rounded-circle shadow-sm" alt="User Avatar" />
                  <span class="fw-bold text-dark text-truncate d-none d-sm-block" style="max-width: 120px; font-size: 0.9rem;">
                    {{ ho_va_ten || 'Tài khoản' }}
                  </span>
                  <i class="fa-solid fa-chevron-down text-secondary" style="font-size: 0.7rem;"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3" style="min-width: 250px; border-radius: 12px; padding: 0;">
                  <li class="px-4 py-3 border-bottom text-center bg-light" style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                    <img :src="avatar_kh" class="rounded-circle mb-2 shadow-sm border border-2 border-white" width="64" height="64" style="object-fit: cover;">
                    <p class="mb-0 fw-bold text-dark fs-6">{{ ho_va_ten }}</p>
                    <small class="text-muted">{{ email_kh }}</small>
                  </li>
                  
                  <div class="p-2">
                    <li>
                      <router-link class="dropdown-item py-2 fw-medium hover-glow rounded-2" to="/client/profile">
                        <i class="fa-solid fa-address-card text-primary me-2 w-20px text-center"></i> Thông tin cá nhân
                      </router-link>
                    </li>
                    <li>
                      <router-link class="dropdown-item py-2 fw-medium hover-glow rounded-2" to="/client/lich-su-dat-tour">
                        <i class="fa-solid fa-clock-rotate-left text-success me-2 w-20px text-center"></i> Lịch sử đặt tour
                      </router-link>
                    </li>
                    <li>
                      <router-link class="dropdown-item py-2 fw-medium hover-glow rounded-2" to="/client/tour-yeu-thich">
                        <i class="fa-solid fa-heart text-danger me-2 w-20px text-center"></i> Tour yêu thích
                      </router-link>
                    </li>
                  </div>
                  
                  <div class="border-top p-2 bg-light" style="border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                    <li>
                      <a class="dropdown-item py-2 fw-bold text-danger hover-glow rounded-2" @click="dangXuat()" href="javascript:void(0)">
                        <i class="fa-solid fa-right-from-bracket me-2 w-20px text-center"></i> Đăng xuất
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item py-2 fw-bold text-danger hover-glow rounded-2" @click="dangXuatAll()" href="javascript:void(0)">
                        <i class="fa-solid fa-power-off me-2 w-20px text-center"></i> Đăng xuất tất cả
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </template>

          </div>
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
      tuKhoaTimKiem: "",
      danhSachGoiY: [],
      hienThiGoiY: false,
      timKiemTimeout: null
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
    document.addEventListener('click', this.clickOutsideSearch);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutsideSearch);
  },
  methods: {
    clickOutsideSearch(event) {
        if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
            this.hienThiGoiY = false;
        }
    },
    goiApiGoiYTimKiem() {
        if (!this.tuKhoaTimKiem.trim()) {
            this.danhSachGoiY = [];
            this.hienThiGoiY = false;
            return;
        }
        if (this.timKiemTimeout) clearTimeout(this.timKiemTimeout);
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
    chonTourTuGoiY(id) {
        this.hienThiGoiY = false;
        this.tuKhoaTimKiem = "";
        this.$router.push(`/client/chi-tiet-tour/${id}`);
    },
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
/* ================= CSS CƠ BẢN VÀ MENU ================= */
.logo-chinh { max-height: 50px; width: auto; transition: all 0.3s ease; }
.header-vung { position: sticky; top: 0; z-index: 1050; border-bottom: 1px solid #f1f5f9; }

/* Giữ chữ trên một dòng, không bị bẻ (wrap) */
.nav-link { 
    white-space: nowrap; 
    font-size: 0.95rem; 
    transition: color 0.3s;
}

/* ================= THANH TÌM KIẾM (Đẹp & Ngắn gọn) ================= */
.vung-tim-kiem { 
    width: 280px; /* Làm ngắn lại */
    transition: all 0.3s ease;
}
.search-box-premium {
    border-radius: 50px; /* Bo tròn mượt mà */
    overflow: hidden;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    transition: all 0.3s ease;
}
.search-box-premium:focus-within {
    border-color: #005baa;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(0, 91, 170, 0.1) !important;
}
.vung-nhap-lieu { 
    background-color: transparent !important; 
}
.btn-tim-kiem {
    background: linear-gradient(135deg, #005baa, #0088cc); /* Xanh gradient sang trọng */
    border-radius: 0 50px 50px 0;
}
.btn-tim-kiem:hover {
    background: linear-gradient(135deg, #004488, #0077bb);
}

/* ================= NÚT BẤM ĐĂNG NHẬP/ĐĂNG KÝ ================= */
.btn-sm-custom {
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
}
.btn-gradient {
    background: linear-gradient(135deg, #f7931e, #ff6b35); /* Style nút đăng ký rực rỡ */
    box-shadow: 0 4px 10px rgba(255, 107, 53, 0.2);
}
.btn-gradient:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(255, 107, 53, 0.3);
}

/* ================= HIỆU ỨNG HOVER CHO MENU ================= */
.btn-hover-effect {
    position: relative;
    transition: all 0.3s ease;
    border-radius: 8px;
    z-index: 1;
}
.btn-hover-effect::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 91, 170, 0.08);
    border-radius: 8px;
    z-index: -1;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.btn-hover-effect:hover::before {
    opacity: 1;
    transform: scale(1);
}

/* Hover dropdown item */
.hover-glow { transition: all 0.2s ease; white-space: nowrap; }
.hover-glow:hover {
    background-color: #f0f7ff !important;
    color: #005baa !important;
    transform: translateX(4px);
}

/* ================= DROPDOWN GỢI Ý & TÀI KHOẢN ================= */
.goiy-dropdown {
    border-radius: 12px;
    max-height: 400px;
    overflow-y: auto;
}
.goiy-dropdown::-webkit-scrollbar { width: 5px; }
.goiy-dropdown::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }

.anh-nguoi-dung { 
    width: 36px; height: 36px; 
    object-fit: cover; 
    border: 2px solid #fff; 
}
.cham-thong-bao { 
    position: absolute; top: 2px; right: 2px; 
    width: 10px; height: 10px; 
    background-color: #ff4d4d; 
    border-radius: 50%; border: 2px solid #fff; 
}

/* Loại bỏ mũi tên mặc định của Bootstrap dropdown */
.dropdown-toggle::after { display: none; }
.w-20px { width: 24px; }
.cursor-pointer { cursor: pointer; }

/* Responsive */
@media (max-width: 991px) { 
    .vung-tim-kiem { width: 100%; margin: 15px 0; } 
    .nhom-bieu-tuong { margin-top: 15px; border-top: 1px solid rgba(0, 0, 0, 0.1); padding-top: 15px; justify-content: flex-start; }
}
</style>