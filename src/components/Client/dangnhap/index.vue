<template>
  <div class="khung-dang-nhap">
    <div class="nen-dang-nhap"></div>

    <div class="bao-dang-nhap">
      <div class="vung-logo text-center mb-4">
        <div class="bieu-tuong-logo mb-3">
          <img src="https://i.pinimg.com/564x/48/e5/9e/48e59ef6ef580dad0e44420cf79f1f7a.jpg" alt="logo">
        </div>
        <h2 class="tieu-de-logo">IXTAL TOUR JOURNEYS</h2>
      </div>

      <div class="the-dang-nhap">
        <div class="noi-dung-the">
          <h3 class="tieu-de-the">ĐĂNG NHẬP</h3>
          <p class="mo-ta-the">Vui lòng nhập thông tin để truy cập.</p>

          <form @submit.prevent="dangNhap" class="bieu-mau-dang-nhap">
            <div class="nhom-nhap-lieu">
              <div class="bao-o-nhap">
                <span class="bieu-tuong-o-nhap">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input
                  v-model="user.email"
                  type="text" class="o-nhap-lieu" placeholder="Tên đăng nhập hoặc Email"
                />
              </div>
            </div>

            <div class="nhom-nhap-lieu">
              <div class="bao-o-nhap">
                <span class="bieu-tuong-o-nhap">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <input
                  v-model="user.password" 
                  :type="hien_mat_khau ? 'text' : 'password'" 
                  class="o-nhap-lieu" 
                  placeholder="Mật khẩu"
                />
                <span class="an-hien-mat-khau" @click="hien_mat_khau = !hien_mat_khau">
                  <i :class="hien_mat_khau ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                </span>
              </div>
            </div>

            <div class="nhom-ghi-nho">
              <label class="nhan-ghi-nho">
                <input type="checkbox" class="o-tich-ghi-nho" />
                <span>Ghi nhớ</span>
              </label>
              <router-link to="/client/quen-mat-khau" class="duong-dan-quen-mk">
                Quên mật khẩu?
              </router-link>
            </div>

            <button type="submit" class="nut-dang-nhap">Đăng nhập</button>
          </form>

          <div class="vach-ngan">
            <span>hoặc</span>
          </div>

          <div class="dang-nhap-mxh">
            <button type="button" class="nut-mxh nut-google">
              <i class="fa-brands fa-google"></i>
              <span>Đăng nhập với Google</span>
            </button>
            <button type="button" class="nut-mxh nut-facebook">
              <i class="fa-brands fa-facebook-f"></i>
              <span>Đăng nhập với Facebook</span>
            </button>
          </div>

          <p class="duong-dan-dang-ky">
            Chưa có tài khoản?
            <router-link to="/client/dang-ky"> Đăng ký ngay </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiUrl from "../../../utils/api";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      // THÊM: Biến kiểm soát trạng thái ẩn hiện
      hien_mat_khau: false,
    };
  },
  methods: {
    dangNhap() {
      axios.post(apiUrl("client/dang-nhap"), this.user).then((res) => {
        if (res.data.status) {
          localStorage.setItem("key_client", res.data.token);
          this.$router.push("/");
          this.$toast.success(res.data.message);
        } else {
          this.$toast.error(res.data.message);
        }
      });
    },
  },
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.khung-dang-nhap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.nen-dang-nhap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><g opacity="0.08" fill="none" stroke="currentColor"><circle cx="100" cy="100" r="80"/><path d="M300 200 L400 150 L500 200 L450 300 Z"/><path d="M900 400 L1000 350 L1050 400 L1000 450 Z"/></g></svg>');
  background-repeat: repeat;
  background-size: 400px 400px;
  opacity: 0.5;
  pointer-events: none;
}

.bao-dang-nhap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

/* Phan Logo */
.vung-logo {
  animation: truotXuong 0.6s ease-out;
}

.bieu-tuong-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90px;
  height: 90px;
}

.bieu-tuong-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tieu-de-logo {
  font-size: 24px;
  font-weight: 700;
  color: #1b7d6b;
  letter-spacing: 2px;
  margin: 0;
}

/* Card Dang Nhap */
.the-dang-nhap {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: truotLen 0.6s ease-out;
}

.noi-dung-the {
  padding: 40px 30px;
}

.tieu-de-the {
  font-size: 22px;
  font-weight: 700;
  color: #1b7d6b;
  text-align: center;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.mo-ta-the {
  font-size: 13px;
  color: #95989a;
  text-align: center;
  margin: 0 0 25px 0;
}

/* Bieu mau */
.bieu-mau-dang-nhap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nhom-nhap-lieu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bao-o-nhap {
  position: relative;
  display: flex;
  align-items: center;
}

.bieu-tuong-o-nhap {
  position: absolute;
  left: 16px;
  color: #b8bcc0;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.o-nhap-lieu {
  width: 100%;
  border: 1px solid #d4d7db;
  border-radius: 8px;
  padding: 12px 16px 12px 44px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #f8f9fb;
}

.o-nhap-lieu:focus {
  outline: none;
  border-color: #1b7d6b;
  background: white;
  box-shadow: 0 0 0 3px rgba(27, 125, 107, 0.1);
}

  
.an-hien-mat-khau {
  position: absolute;
  right: 16px;
  color: #b8bcc0;
  cursor: pointer; /* Thêm để hiện bàn tay khi rà chuột vào */
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.an-hien-mat-khau:hover {
  color: #1b7d6b;
}
/* Nhom Ghi Nho */
.nhom-ghi-nho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
}

.nhan-ghi-nho {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #565a5e;
}

.o-tich-ghi-nho {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #1b7d6b;
}

.duong-dan-quen-mk {
  font-size: 13px;
  color: #1b7d6b;
  text-decoration: none;
  white-space: nowrap;
}

.duong-dan-quen-mk:hover {
  color: #0d5a4e;
  text-decoration: underline;
}

/* Nut Dang Nhap */
.nut-dang-nhap {
  background: #1b7d6b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: capitalize;
}

.nut-dang-nhap:hover {
  background: #0d5a4e;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(27, 125, 107, 0.3);
}

/* Vach ngan */
.vach-ngan {
  display: flex;
  align-items: center;
  margin: 25px 0;
  color: #b8bcc0;
  font-size: 13px;
  gap: 12px;
}

.vach-ngan::before,
.vach-ngan::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e0e3e6;
}

/* Dang nhap MXH */
.dang-nhap-mxh {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nut-mxh {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid #d4d7db;
  border-radius: 8px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #565a5e;
}

.nut-google { color: #4285f4; }
.nut-google:hover { border-color: #4285f4; background: #f5f8ff; }
.nut-facebook { color: #1877f2; }
.nut-facebook:hover { border-color: #1877f2; background: #f5f8ff; }

/* Link dang ky */
.duong-dan-dang-ky {
  text-align: center;
  font-size: 13px;
  color: #565a5e;
  margin: 20px 0 0 0;
}

.duong-dan-dang-ky a {
  color: #1b7d6b;
  text-decoration: none;
  font-weight: 600;
}

/* Animations */
@keyframes truotXuong {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes truotLen {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile */
@media (max-width: 576px) {
  .noi-dung-the { padding: 30px 20px; }
  .nhom-ghi-nho { flex-direction: row; } /* Giu nguyen 1 hang tren mobile */
}
</style>