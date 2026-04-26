<template>
  <header class="header-vung">
    <nav class="navbar navbar-expand-lg navbar-dark py-2 thanh-header-xanh">
      <div class="container-fluid px-4">
        <router-link to="/" class="navbar-brand fw-bold fs-4 d-flex align-items-center">
          <span class="text-white">IXTAL</span>
          <span class="text-warning ms-1">TOUR</span>
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuChinh">
          <span class="navbar-toggler-icon"></span>   
        </button>

        <div class="collapse navbar-collapse" id="menuChinh">
          <div class="ms-4 vung-tim-kiem d-none d-lg-block">
            <div class="input-group">
              <span class="input-group-text vung-nhap-lieu border-end-0">
                <i class="fa-solid fa-magnifying-glass text-light-50"></i>
              </span>
              <input type="text" class="form-control vung-nhap-lieu border-start-0 ps-0 text-white" placeholder="Tìm kiếm tour, điểm đến...">
              <span class="input-group-text vung-nhap-lieu border-start-0 cursor-pointer">
                <i class="fa-solid fa-xmark text-light-50 small"></i>
              </span>
            </div>
          </div>

          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3">Trang chủ</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle px-3" href="#" role="button" data-bs-toggle="dropdown">
                Tour
              </a>
              <ul class="dropdown-menu dropdown-menu-dark shadow">
                <li><router-link class="dropdown-item" to="/client/tour/trong-nuoc">Trong nước</router-link></li>
                <li><router-link class="dropdown-item" to="/client/tour/nuoc-ngoai">Nước ngoài</router-link></li>
              </ul>
            </li>
            <li class="nav-item"><router-link to="#" class="nav-link px-3">Ưu đãi</router-link></li>
            <li class="nav-item"><router-link to="#" class="nav-link px-3">Đánh giá</router-link></li>
            <li class="nav-item"><router-link to="#" class="nav-link px-3">Blog</router-link></li>

            <div class="d-flex align-items-center ms-lg-4 nhom-bieu-tuong">
              <a href="#" class="bieu-tuong-item me-3"><i class="fa-regular fa-heart"></i></a>
              <a href="#" class="bieu-tuong-item me-3 position-relative">
                <i class="fa-solid fa-bag-shopping"></i>
                <span class="cham-thong-bao"></span>
              </a>
              <a href="#" class="bieu-tuong-item me-3 position-relative">
                <i class="fa-regular fa-bell"></i>
                <span class="cham-thong-bao"></span>
              </a>

              <div class="dropdown border-start border-secondary ps-3">
                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret d-flex align-items-center p-0" href="#" role="button" data-bs-toggle="dropdown">
                  <img :src="isLoggedIn ? 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-58.jpg' : 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'" 
                       class="anh-nguoi-dung rounded-circle" />
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow">
                  <template v-if="isLoggedIn">
                    <li class="px-3 py-2 border-bottom">
                      <p class="mb-0 small fw-bold text-dark">{{ ho_va_ten }}</p>
                    </li>
                    <li><router-link class="dropdown-item" to="/client/profile">Thông tin cá nhân</router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" @click="dangXuat()" href="javascript:void(0)">Đăng xuất</a></li>
                  </template>
                  <template v-else>
                    <li><router-link class="dropdown-item" to="/client/dang-nhap">Đăng nhập</router-link></li>
                    <li><router-link class="dropdown-item" to="/client/dang-ky">Đăng ký</router-link></li>
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
    };
  },
  computed: {
    isLoggedIn() {
      // Kiem tra trang thai dang nhap tu localStorage
      return !!(localStorage.getItem("key_client"));
    },
  },
  mounted() {
    this.checkLogin();
    this.ho_va_ten = localStorage.getItem("ho_va_ten");
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
        }
      }).catch(() => {
        localStorage.removeItem("key_client");
        this.ho_va_ten = null;
      });
    },
    dangXuat() {
      const token = localStorage.getItem("key_client");
      axios.post(apiUrl("client/dang-xuat"), {}, {
        headers: { Authorization: "Bearer " + token }
      }).then((res) => {
        if (res.data.status) {
          localStorage.removeItem("key_client");
          localStorage.removeItem("ho_va_ten");
          this.ho_va_ten = null;
          this.$router.push("/client/dang-nhap");
          this.$toast.success(res.data.message);
        }
      });
    }
  },
};
</script>

<style scoped>
.header-vung {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.thanh-header-xanh {
  background-color: #00004d !important; /* Mau xanh dam kieu navy */
}

.vung-tim-kiem {
  max-width: 350px;     
  width: 100%;
}

.vung-nhap-lieu {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border: none !important;
  color: white !important;
   border-radius: 30px;
}

.vung-nhap-lieu::placeholder {
  color: rgba(255, 255, 255, 0.6) !important;
    
}

.form-control:focus {
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.bieu-tuong-item {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9) !important;
  text-decoration: none;
  transition: all 0.3s;
}

.bieu-tuong-item:hover {
  color: #ffc107 !important;  
}

.anh-nguoi-dung {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.cham-thong-bao {
  position: absolute;
  top: 0;
  right: -2px;
  width: 9px;
  height: 9px;
  background-color: #ff4d4d; 
  border-radius: 50%;
  border: 2px solid #00004d;
}

.nav-link {
  font-weight: 500;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85) !important;
}

.nav-link:hover {
  color: #ffc107 !important;
}

.dropdown-toggle-nocaret::after {
  display: none;
}

.cursor-pointer {
  cursor: pointer;
}

.text-light-50 {
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 991px) {
  .vung-tim-kiem {
    max-width: 100%;
    margin: 15px 0;
  }
  .nhom-bieu-tuong {
    margin-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 15px;
  }
}
</style>