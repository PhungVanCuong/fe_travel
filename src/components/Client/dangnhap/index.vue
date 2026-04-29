<template>
  <div class="khung-dang-nhap">
    <div class="nen-dang-nhap"></div>

    <div class="bao-dang-nhap container">
      <div class="row justify-content-center">
        <!-- Khống chế độ rộng cột y hệt trang Đăng Ký để form thon gọn, cao cấp -->
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          
          <!-- Phần Logo -->
          <div class="vung-logo text-center mb-4">
            <div class="bieu-tuong-logo mb-3">
              <img src="https://i.pinimg.com/564x/48/e5/9e/48e59ef6ef580dad0e44420cf79f1f7a.jpg" alt="logo" class="rounded-circle shadow-sm">
            </div>
            <h2 class="tieu-de-logo">IXTAL TOUR</h2>
          </div>

          <!-- Thẻ Form Đăng Nhập -->
          <div class="the-dang-nhap">
            <div class="noi-dung-the">
              <h3 class="tieu-de-the">CHÀO MỪNG TRỞ LẠI</h3>
              <p class="text-center text-muted mb-4 small">Vui lòng đăng nhập để tiếp tục hành trình của bạn.</p>

              <form @submit.prevent="dangNhap" class="bieu-mau-dang-nhap">
                <!-- Xếp dọc các ô nhập liệu -->
                <div class="d-flex flex-column gap-3">
                  
                  <!-- Email / Tên đăng nhập -->
                  <div class="nhom-nhap-lieu">
                    <div class="bao-o-nhap">
                      <span class="bieu-tuong-o-nhap">
                        <i class="fa-solid fa-user"></i>
                      </span>
                      <input v-model="user.email" type="text" class="o-nhap-lieu" placeholder="Tên đăng nhập hoặc Email" />
                    </div>
                  </div>

                  <!-- Mật khẩu -->
                  <div class="nhom-nhap-lieu">
                    <div class="bao-o-nhap">
                      <span class="bieu-tuong-o-nhap">
                        <i class="fa-solid fa-lock"></i>
                      </span>
                      <input v-model="user.password" :type="hien_mat_khau ? 'text' : 'password'" class="o-nhap-lieu" placeholder="Mật khẩu" />
                      <span class="an-hien-mat-khau" @click="hien_mat_khau = !hien_mat_khau">
                        <i :class="hien_mat_khau ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                      </span>
                    </div>
                  </div>

                </div>

                <!-- Ghi nhớ & Quên mật khẩu -->
                <div class="d-flex justify-content-between align-items-center mt-3 mb-4">
                  <label class="nhan-ghi-nho d-flex align-items-center m-0 cursor-pointer">
                    <input type="checkbox" class="form-check-input o-tich-ghi-nho m-0 me-2" />
                    <span class="text-muted small">Ghi nhớ đăng nhập</span>
                  </label>
                  <router-link to="/client/quen-mat-khau" class="duong-dan-quen-mk fw-bold">
                    Quên mật khẩu?
                  </router-link>
                </div>

                <!-- Nút Đăng Nhập -->
                <button type="submit" class="nut-dang-nhap w-100 d-flex justify-content-center align-items-center gap-2">
                  <span>ĐĂNG NHẬP</span>
                  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                </button>
              </form>

              <!-- Vạch ngăn cách -->
              <div class="vach-ngan">
                <span class="text-muted px-2 bg-white">HOẶC TIẾP TỤC VỚI</span>
              </div>

              <!-- Nút Mạng Xã Hội xếp dọc -->
              <div class="dang-nhap-mxh d-flex flex-column gap-3">
                <button type="button" class="nut-mxh nut-google w-100">
                  <i class="fa-brands fa-google fs-5"></i>
                  <span>Đăng nhập với Google</span>
                </button>
                <button type="button" class="nut-mxh nut-facebook w-100">
                  <i class="fa-brands fa-facebook-f fs-5"></i>
                  <span>Đăng nhập với Facebook</span>
                </button>
              </div>

              <!-- Chuyển sang Đăng Ký -->
              <p class="duong-dan-dang-ky mt-4">
                Chưa có tài khoản?
                <router-link to="/client/dang-ky">Đăng ký ngay</router-link>
              </p>
              
            </div>
          </div>

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
  padding: 50px 0;
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
}

/* Phần Logo */
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
  object-fit: cover;
}

.tieu-de-logo {
  font-size: 26px;
  font-weight: 800;
  color: #1b7d6b;
  letter-spacing: 2px;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* Card Đăng Nhập */
.the-dang-nhap {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: truotLen 0.6s ease-out;
  border: 1px solid rgba(255,255,255,0.8);
}

.noi-dung-the {
  padding: 40px 35px;
}

.tieu-de-the {
  font-size: 24px;
  font-weight: 800;
  color: #1b7d6b;
  text-align: center;
  margin: 0 0 5px 0;
  letter-spacing: 1px;
}

/* Biểu mẫu */
.bao-o-nhap {
  position: relative;
  display: flex;
  align-items: center;
}

.bieu-tuong-o-nhap {
  position: absolute;
  left: 18px;
  color: #a0a5aa;
  font-size: 16px;
  display: flex;
  align-items: center;
  z-index: 5;
}

.o-nhap-lieu {
  width: 100%;
  border: 1.5px solid #e1e5eb;
  border-radius: 12px;
  padding: 14px 16px 14px 48px;
  font-size: 14.5px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #fcfcfd;
  color: #333;
}

.o-nhap-lieu:focus {
  outline: none;
  border-color: #1b7d6b;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(27, 125, 107, 0.15);
}

.o-nhap-lieu::placeholder {
  color: #adb5bd;
  font-weight: 400;
}

.an-hien-mat-khau {
  position: absolute;
  right: 18px;
  color: #a0a5aa;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  z-index: 5;
}

.an-hien-mat-khau:hover {
  color: #1b7d6b;
}

/* Form check checkbox màu đồng bộ */
.form-check-input {
  width: 1.2em;
  height: 1.2em;
  cursor: pointer;
}
.form-check-input:checked {
  background-color: #1b7d6b;
  border-color: #1b7d6b;
}
.cursor-pointer {
  cursor: pointer;
}

.duong-dan-quen-mk {
  font-size: 13.5px;
  color: #1b7d6b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.duong-dan-quen-mk:hover {
  color: #156254;
  text-decoration: underline;
}

/* Nút Đăng Nhập */
.nut-dang-nhap {
  background: linear-gradient(135deg, #1b7d6b 0%, #229983 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 15px 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nut-dang-nhap:hover {
  background: linear-gradient(135deg, #156254 0%, #1b7d6b 100%);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(27, 125, 107, 0.3);
}

/* Vạch ngăn cách */
.vach-ngan {
  position: relative;
  text-align: center;
  margin: 25px 0;
}
.vach-ngan::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e0e3e6;
  z-index: 1;
}
.vach-ngan span {
  position: relative;
  z-index: 2;
  font-size: 12px;
  font-weight: 600;
  color: #adb5bd;
}

/* Mạng Xã Hội */
.nut-mxh {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1.5px solid #e1e5eb;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #565a5e;
}

.nut-google {
  color: #db4437;
}
.nut-google:hover {
  border-color: #db4437;
  background: #fffcfc;
  color: #db4437;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(219, 68, 55, 0.1);
}

.nut-facebook {
  color: #1877f2;
}
.nut-facebook:hover {
  border-color: #1877f2;
  background: #f0f7ff;
  color: #1877f2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(24, 119, 242, 0.1);
}

/* Link Đăng Ký */
.duong-dan-dang-ky {
  text-align: center;
  font-size: 14.5px;
  color: #6c757d;
  margin: 0;
}

.duong-dan-dang-ky a {
  color: #1b7d6b;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.duong-dan-dang-ky a:hover {
  text-decoration: underline;
  color: #156254;
}

/* Animations */
@keyframes truotXuong {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes truotLen {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 576px) {
  .noi-dung-the { padding: 30px 20px; }
  .tieu-de-logo { font-size: 22px; }
  .tieu-de-the { font-size: 20px; }
  .o-nhap-lieu { padding: 12px 16px 12px 40px; font-size: 14px; }
}
</style>