<template>
  <div class="khung-dang-ky">
    <div class="nen-dang-ky"></div>

    <div class="bao-dang-ky">
      <div class="vung-logo text-center mb-4">
        <div class="bieu-tuong-logo mb-3">
          <img src="https://i.pinimg.com/564x/48/e5/9e/48e59ef6ef580dad0e44420cf79f1f7a.jpg" alt="logo">
        </div>
        <h2 class="tieu-de-logo">IXTAL TOUR JOURNEYS</h2>
      </div>

      <div class="the-dang-ky">
        <div class="noi-dung-the">
          <h3 class="tieu-de-the">ĐĂNG KÝ</h3>

          <form @submit.prevent="dangKy" class="bieu-mau-dang-ky">
            <div class="nhom-nhap-lieu">
              <div class="bao-o-nhap">
                <span class="bieu-tuong-o-nhap">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input
                  v-model="user.username"
                  type="text"
                  class="o-nhap-lieu"
                  placeholder="Tên đăng nhập"
                />
              </div>
            </div>

            <div class="nhom-nhap-lieu">
              <div class="bao-o-nhap">
                <span class="bieu-tuong-o-nhap">
                  <i class="fa-solid fa-envelope"></i>
                </span>
                <input
                  v-model="user.email"
                  type="email"
                  class="o-nhap-lieu"
                  placeholder="Email"
                />
              </div>
            </div>

            <div class="nhom-nhap-lieu">
              <div class="bao-o-nhap">
                <span class="bieu-tuong-o-nhap">
                  <i class="fa-solid fa-phone"></i>
                </span>
                <input
                  v-model="user.phone"
                  type="text"
                  class="o-nhap-lieu"
                  placeholder="Số điện thoại"
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
                  :type="showPassword ? 'text' : 'password'"
                  class="o-nhap-lieu"
                  placeholder="Mật khẩu"
                />
                <span class="an-hien-mat-khau" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                </span>
              </div>
            </div>

            <div class="nhom-nhap-lieu">
              <div class="bao-o-nhap">
                <span class="bieu-tuong-o-nhap">
                  <i class="fa-solid fa-lock"></i>
                </span>
                <input
                  v-model="user.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="o-nhap-lieu"
                  placeholder="Nhập lại mật khẩu"
                />
                <span class="an-hien-mat-khau" @click="showConfirmPassword = !showConfirmPassword">
                  <i :class="showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                </span>
              </div>
            </div>

            <button type="submit" class="nut-dang-ky">
              ĐĂNG KÝ
            </button>
          </form>

          <p class="duong-dan-dang-nhap">
            Bạn đã có tài khoản?
            <router-link to="/dang-nhap">Đăng nhập</router-link>
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
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    dangKy() {
      if (!this.user.username || !this.user.email || !this.user.phone || !this.user.password || !this.user.confirmPassword) {
        this.$toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      }

      if (this.user.password !== this.user.confirmPassword) {
        this.$toast.error("Mật khẩu không khớp");
        return;
      }

      const data = {
        username: this.user.username,
        email: this.user.email,
        phone: this.user.phone,
        password: this.user.password,
      };

      axios.post(apiUrl("client/dang-ky"), data).then((res) => {
        if (res.data.status) {
          this.$toast.success(res.data.message);
          this.$router.push("/dang-nhap");
        } else {
          this.$toast.error(res.data.message);
        }
      }).catch((err) => {
        this.$toast.error("Đăng ký thất bại");
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.khung-dang-ky {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.nen-dang-ky {
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

.bao-dang-ky {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
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

/* Card Dang Ky */
.the-dang-ky {
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
  font-size: 28px;
  font-weight: 700;
  color: #1b7d6b;
  text-align: center;
  margin: 0 0 30px 0;
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* Bieu mau */
.bieu-mau-dang-ky {
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
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.an-hien-mat-khau:hover {
  color: #1b7d6b;
}

/* Nut Dang Ky */
.nut-dang-ky {
  background: #1b7d6b;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.nut-dang-ky:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Link Dang Nhap */
.duong-dan-dang-nhap {
  text-align: center;
  font-size: 14px;
  color: #565a5e;
  margin: 25px 0 0 0;
}

.duong-dan-dang-nhap a {
  color: #1b7d6b;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
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

/* Responsive */
@media (max-width: 576px) {
  .noi-dung-the { padding: 30px 20px; }
  .tieu-de-logo { font-size: 20px; }
  .tieu-de-the { font-size: 22px; }
  .o-nhap-lieu { padding: 10px 16px 10px 40px; font-size: 13px; }
  .bao-dang-ky { max-width: 100%; }
}
</style>