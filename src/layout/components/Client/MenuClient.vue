<template>
  <header class="header-vung shadow-sm">
    <nav class="navbar navbar-expand-lg  py-2 thanh-header-xanh">
      <div class="container-fluid px-4">
        <router-link to="/" class="navbar-brand fw-bold fs-4 d-flex align-items-center">
          <img src="../../../assets/images/Logo1.png" alt="Logo"  class="me-2 logo-chinh">
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuChinh">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menuChinh">
          <!-- Vùng tìm kiếm với chữ đen -->
          <div class="ms-4 vung-tim-kiem d-none d-lg-block">
            <div class="input-group">
              <span class="input-group-text vung-nhap-lieu border-end-0">
                <i class="fa-solid fa-magnifying-glass text-dark"></i>
              </span>
              <input type="text" class="form-control vung-nhap-lieu border-start-0 ps-0 text-dark"
                placeholder="Tìm kiếm tour, điểm đến...">
              <span class="input-group-text vung-nhap-lieu border-start-0 cursor-pointer">
                <i class="fa-solid fa-xmark text-dark small"></i>
              </span>
            </div>
          </div>

          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3">Trang Chủ</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle px-3" href="#" role="button" data-bs-toggle="dropdown">
                Tour
              </a>
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
                    <li>
                      <hr class="dropdown-divider">
                    </li>
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
    };
  },
  computed: {
    isLoggedIn() {
      return !!(localStorage.getItem("key_client"));
    },
  },
  mounted() {
    this.checkLogin();

    // Lắng nghe sự kiện cập nhật profile để đổi Avatar và Tên ngay lập tức
    window.addEventListener("profile-updated", () => {
      this.ho_va_ten = localStorage.getItem("ho_va_ten") || this.ho_va_ten;
      const storedAvatar = localStorage.getItem("avatar");

      // KIỂM TRA: Nếu có avatar thì lấy, nếu rỗng thì tạo avatar chữ cái mặc định
      if (storedAvatar && storedAvatar !== "null" && storedAvatar !== "") {
        this.avatar_kh = storedAvatar;
      } else {
        this.avatar_kh = `https://ui-avatars.com/api/?name=${this.ho_va_ten || 'KH'}&background=random&color=fff`;
      }
    });
  },
  methods: {
    checkLogin() {
      const token = localStorage.getItem("key_client");
      if (!token) return;
      axios.get(apiUrl('client/check-token'), {
        headers: { Authorization: 'Bearer ' + token }
      }).then((res) => {
        if (res.data.status) {
          this.ho_va_ten = res.data.ho_ten;
          this.email_kh = res.data.email;

          // SỬA: Ưu tiên lấy avatar TỪ DATABASE TRẢ VỀ (res.data.avatar) thay vì localStorage cũ kỹ
          if (res.data.avatar) {
            this.avatar_kh = res.data.avatar;
            localStorage.setItem("avatar", res.data.avatar);
          } else {
            // Tự động tạo ảnh bằng chữ cái đầu nếu khách không tải ảnh lên
            this.avatar_kh = `https://ui-avatars.com/api/?name=${this.ho_va_ten}&background=random&color=fff`;
            localStorage.removeItem("avatar");
          }
          localStorage.setItem("ho_va_ten", this.ho_va_ten);
        }
      }).catch(() => {
        this.clearAuthData();
      });
    },

    dangXuat() {
      const token = localStorage.getItem("key_client");
      axios.post(apiUrl("client/dang-xuat"), {}, {
        headers: { Authorization: "Bearer " + token }
      }).then((res) => {
        if (res.data.status) {
          this.clearAuthData();
          this.$router.push("/client/dang-nhap");
          this.$toast.success(res.data.message);
        }
      }).catch(() => {
        this.clearAuthData();
        this.$router.push("/client/dang-nhap");
      });
    },

    dangXuatAll() {
      const token = localStorage.getItem("key_client");
      if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi tất cả các thiết bị không?")) {
        axios.post(apiUrl("client/dang-xuat-all"), {}, {
          headers: { Authorization: "Bearer " + token }
        }).then((res) => {
          if (res.data.status) {
            this.clearAuthData();
            this.$router.push("/client/dang-nhap");
            this.$toast.success(res.data.message || "Đã đăng xuất khỏi tất cả thiết bị");
          }
        }).catch(() => {
          this.clearAuthData();
          this.$router.push("/client/dang-nhap");
        });
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
.logo-chinh {
  width: 130px !important; 
  height: auto !important;
  /* Xóa bỏ giới hạn max-height nếu nó đang ngăn cản logo thu nhỏ */
  max-height: none !important; 
  /* Đảm bảo không có min-height nào đang giữ kích thước lớn */
  min-height: 0 !important;
  transition: all 0.3s ease;
}

.header-vung {
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-top: -5px;
  background-color: #f3ffff;
}

.thanh-header-xanh {
  background-color: #f3fffd !important;
}

.navbar {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

/* Ép màu chữ đen cho toàn bộ menu */
.nav-link {
  font-weight: 600 !important;
  font-size: 0.95rem;
  color: #212529 !important;
  padding-top: 0;
  padding-bottom: 0;
}

.nav-link:hover {
  color: #005baa !important;
  /* Đổi sang màu xanh đậm khi hover */
}

.vung-tim-kiem {
  max-width: 350px;
  width: 100%;
}

.vung-nhap-lieu {
  background-color: rgba(0, 0, 0, 0.05) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  color: #212529 !important;
  border-radius: 30px;
}

.vung-nhap-lieu::placeholder {
  color: #6c757d !important;
}

.form-control:focus {
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.08) !important;
}

.bieu-tuong-item {
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s;
}

.anh-nguoi-dung {
  width: 38px;
  height: 38px;
  object-fit: cover;
  border: 2px solid #005baa;
  background-color: #fff;
}

.cham-thong-bao {
  position: absolute;
  top: 0;
  right: -2px;
  width: 9px;
  height: 9px;
  background-color: #ff4d4d;
  border-radius: 50%;
  border: 2px solid #f3ffff;
}

.dropdown-toggle-nocaret::after {
  display: none;
}

.cursor-pointer {
  cursor: pointer;
}

.w-20px {
  width: 24px;
}

@media (max-width: 991px) {
  .vung-tim-kiem {
    max-width: 100%;
    margin: 15px 0;
  }

  .nhom-bieu-tuong {
    margin-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 15px;
  }

  .logo-chinh {
    max-height: 70px;
  }
}
</style>