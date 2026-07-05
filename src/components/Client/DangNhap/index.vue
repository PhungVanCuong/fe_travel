<template>
  <div class="khung-dang-nhap">
    <div class="nen-dang-nhap"></div>

    <div class="bao-dang-nhap container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
          
          <div class="vung-logo text-center mb-4">
            <div class="bieu-tuong-logo mb-3">
              <img src="https://i.pinimg.com/564x/48/e5/9e/48e59ef6ef580dad0e44420cf79f1f7a.jpg" alt="logo" class="rounded-circle shadow-sm">
            </div>
            <h2 class="tieu-de-logo">IXTAL TOUR</h2>
          </div>

          <div class="the-dang-nhap">
            <div class="noi-dung-the">
              <h3 class="tieu-de-the">ĐĂNG NHẬP</h3>
              <p class="text-center text-muted mb-4 small">Chào mừng trở lại! Hãy đăng nhập để tiếp tục</p>

              <form @submit.prevent="dangNhap" class="bieu-mau-dang-nhap">
                <div class="d-flex flex-column gap-3">
                  
                  <div class="nhom-nhap-lieu">
                    <div class="bao-o-nhap">
                      <span class="bieu-tuong-o-nhap">
                        <i class="fa-solid fa-user"></i>
                      </span>
                      <input v-model="user.email" type="text" class="o-nhap-lieu" placeholder="Email đăng nhập" required />
                    </div>
                  </div>

                  <div class="nhom-nhap-lieu">
                    <div class="bao-o-nhap">
                      <span class="bieu-tuong-o-nhap">
                        <i class="fa-solid fa-lock"></i>
                      </span>
                      <input v-model="user.password" :type="hien_mat_khau ? 'text' : 'password'" class="o-nhap-lieu" placeholder="Mật khẩu" required />
                      <span class="an-hien-mat-khau" @click="hien_mat_khau = !hien_mat_khau">
                        <i :class="hien_mat_khau ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
                      </span>
                    </div>
                  </div>

                </div>

                <div class="d-flex justify-content-between align-items-center mt-3 mb-4">
                  <label class="nhan-ghi-nho d-flex align-items-center m-0 cursor-pointer">
                    <input type="checkbox" v-model="rememberMe" class="form-check-input o-tich-ghi-nho m-0 me-2" />
                    <span class="text-muted small fw-medium">Ghi nhớ đăng nhập</span>
                  </label>
                  <router-link to="/client/quen-mat-khau" class="duong-dan-quen-mk fw-bold">
                    Quên mật khẩu?
                  </router-link>
                </div>

                <button type="submit" class="nut-dang-nhap w-100 d-flex justify-content-center align-items-center gap-2" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
                  <span v-else>ĐĂNG NHẬP NGAY</span>
                  <i class="fa-solid fa-arrow-right-to-bracket" v-if="!isLoading"></i>
                </button>
              </form>

              <div class="vach-ngan">
                <span class="text-muted px-2 bg-white">HOẶC TIẾP TỤC VỚI</span>
              </div>

              <div class="dang-nhap-mxh d-flex flex-column gap-3">
                <button type="button" class="nut-mxh nut-google w-100" @click="googleLogin">
                  <i class="fa-brands fa-google fs-5"></i>
                  <span>Đăng nhập với Google</span>
                </button>
                <button type="button" class="nut-mxh nut-facebook w-100">
                  <i class="fa-brands fa-facebook-f fs-5"></i>
                  <span>Đăng nhập với Facebook</span>
                </button>
              </div>

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
      isLoading: false,
      rememberMe: false,
      googleClientLoaded: false,
    };
  },
  mounted() {
    this.initGoogleScript();

    // Khi trang tải lên, kiểm tra xem trước đó đã có lưu tài khoản KHÁCH HÀNG chưa
    const savedEmail = localStorage.getItem("saved_email_client");
    const savedPassword = localStorage.getItem("saved_password_client");
    
    if (savedEmail && savedPassword) {
      this.user.email = savedEmail;
      this.user.password = savedPassword;
      this.rememberMe = true;
    }
  },
  methods: {
    initGoogleScript() {
      const existingScript = document.getElementById('google-client-script');
      if (existingScript) {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          this.onGoogleScriptLoaded();
        } else {
          existingScript.addEventListener('load', () => this.onGoogleScriptLoaded());
        }
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-client-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => this.onGoogleScriptLoaded();
      document.head.appendChild(script);
    },
    onGoogleScriptLoaded() {
      this.googleClientLoaded = true;
      if (window.google && window.google.accounts && window.google.accounts.id) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
        console.log('Google Sign-In init', {
          clientId,
          origin: window.location.origin,
          href: window.location.href,
        });
        if (!clientId || clientId === 'YOUR_GOOGLE_CLIENT_ID') {
          this.$toast.warning('Vui lòng cấu hình VITE_GOOGLE_CLIENT_ID trong .env với Web OAuth Client ID hợp lệ.');
          return;
        }

        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => this.handleGoogleCredentialResponse(response),
            ux_mode: 'popup',
          });
        } catch (error) {
          console.error('Google Sign-In initialize error:', error);
          this.$toast.error('Không khởi tạo được Google Sign-In. Kiểm tra client ID và origin.');
        }
      }
    },
    googleLogin() {
      if (!this.googleClientLoaded || !window.google || !window.google.accounts || !window.google.accounts.id) {
        this.$toast.warning('Vui lòng chờ tải Google Sign-In.');
        return;
      }
      window.google.accounts.id.prompt();
    },
    handleGoogleCredentialResponse(response) {
      if (!response || !response.credential) {
        this.$toast.error('Đăng nhập Google không thành công.');
        return;
      }

      this.isLoading = true;
      axios.post(apiUrl('client/dang-nhap-google'), { credential: response.credential })
        .then((res) => {
          if (res.data.status) {
            localStorage.setItem('key_client', res.data.token);
            this.$router.push('/');
            this.$toast.success(res.data.message);
          } else {
            this.$toast.error(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.error('Hệ thống đang bận. Vui lòng thử lại sau.');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    dangNhap() {
      if(!this.user.email || !this.user.password) {
        this.$toast.warning("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      this.isLoading = true;

      axios.post(apiUrl("client/dang-nhap"), this.user)
        .then((res) => {
            if (res.data.status) {
                // Lưu token tên là key_client
                localStorage.setItem("key_client", res.data.token);
                
                // XỬ LÝ LƯU TÀI KHOẢN KHÁCH HÀNG VÀO MÁY TÍNH
                if (this.rememberMe) {
                  localStorage.setItem("saved_email_client", this.user.email);
                  localStorage.setItem("saved_password_client", this.user.password);
                } else {
                  localStorage.removeItem("saved_email_client");
                  localStorage.removeItem("saved_password_client");
                }

                this.$router.push("/");
                this.$toast.success(res.data.message);
            } else {
                this.$toast.error(res.data.message);
            }
        })
        .catch((err) => {
            this.$toast.error("Hệ thống đang bận hoặc thông tin không chính xác.");
        })
        .finally(() => {
            this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
* { box-sizing: border-box; }
.khung-dang-nhap { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%); font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; padding: 50px 0; }
.nen-dang-nhap { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><g opacity="0.08" fill="none" stroke="currentColor"><circle cx="100" cy="100" r="80"/><path d="M300 200 L400 150 L500 200 L450 300 Z"/><path d="M900 400 L1000 350 L1050 400 L1000 450 Z"/></g></svg>'); background-repeat: repeat; background-size: 400px 400px; opacity: 0.5; pointer-events: none; }
.bao-dang-nhap { position: relative; z-index: 1; }

.vung-logo { animation: truotXuong 0.6s ease-out; }
.bieu-tuong-logo { display: flex; justify-content: center; align-items: center; margin: 0 auto; width: 90px; height: 90px; }
.bieu-tuong-logo img { width: 100%; height: 100%; object-fit: cover; }
.tieu-de-logo { font-size: 26px; font-weight: 800; color: #1b7d6b; letter-spacing: 2px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }

.the-dang-nhap { background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px); border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08); overflow: hidden; animation: truotLen 0.6s ease-out; border: 1px solid rgba(255,255,255,0.8); }
.noi-dung-the { padding: 40px 35px; }

.tieu-de-the { font-size: 26px; font-weight: 900; color: #1b7d6b; text-align: center; margin: 0 0 5px 0; letter-spacing: 1px; }

.bao-o-nhap { position: relative; display: flex; align-items: center; }
.bieu-tuong-o-nhap { position: absolute; left: 18px; color: #a0a5aa; font-size: 16px; display: flex; align-items: center; z-index: 5; }
.o-nhap-lieu { width: 100%; border: 1.5px solid #e1e5eb; border-radius: 12px; padding: 14px 16px 14px 48px; font-size: 14.5px; font-family: inherit; transition: all 0.3s ease; background: #fcfcfd; color: #333; }
.o-nhap-lieu:focus { outline: none; border-color: #1b7d6b; background: #ffffff; box-shadow: 0 0 0 4px rgba(27, 125, 107, 0.15); }
.o-nhap-lieu::placeholder { color: #adb5bd; font-weight: 400; }
.an-hien-mat-khau { position: absolute; right: 18px; color: #a0a5aa; cursor: pointer; font-size: 16px; display: flex; align-items: center; transition: color 0.3s ease; z-index: 5; }
.an-hien-mat-khau:hover { color: #1b7d6b; }

.form-check-input { width: 1.2em; height: 1.2em; cursor: pointer; }
.form-check-input:checked { background-color: #1b7d6b; border-color: #1b7d6b; }
.cursor-pointer { cursor: pointer; }

.duong-dan-quen-mk { font-size: 13.5px; color: #1b7d6b; text-decoration: none; transition: color 0.3s ease; }
.duong-dan-quen-mk:hover { color: #156254; text-decoration: underline; }

.nut-dang-nhap { background: linear-gradient(135deg, #1b7d6b 0%, #229983 100%); color: #ffffff; border: none; border-radius: 12px; padding: 15px 24px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px; }
.nut-dang-nhap:hover:not(:disabled) { background: linear-gradient(135deg, #156254 0%, #1b7d6b 100%); transform: translateY(-3px); box-shadow: 0 10px 25px rgba(27, 125, 107, 0.3); }

/* Vạch ngăn cách */
.vach-ngan { position: relative; text-align: center; margin: 25px 0; }
.vach-ngan::before { content: ""; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #e0e3e6; z-index: 1; }
.vach-ngan span { position: relative; z-index: 2; font-size: 12px; font-weight: 600; color: #adb5bd; }

/* Mạng Xã Hội */
.nut-mxh { display: flex; align-items: center; justify-content: center; gap: 12px; border: 1.5px solid #e1e5eb; border-radius: 12px; padding: 12px 16px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; background: white; color: #565a5e; }
.nut-google { color: #db4437; }
.nut-google:hover { border-color: #db4437; background: #fffcfc; color: #db4437; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(219, 68, 55, 0.1); }
.nut-facebook { color: #1877f2; }
.nut-facebook:hover { border-color: #1877f2; background: #f0f7ff; color: #1877f2; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(24, 119, 242, 0.1); }

.duong-dan-dang-ky { text-align: center; font-size: 14.5px; color: #6c757d; margin: 0; }
.duong-dan-dang-ky a { color: #1b7d6b; text-decoration: none; font-weight: 700; transition: color 0.3s ease; }
.duong-dan-dang-ky a:hover { text-decoration: underline; color: #156254; }

@keyframes truotXuong { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes truotLen { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 576px) { .noi-dung-the { padding: 30px 20px; } .tieu-de-logo { font-size: 22px; } .tieu-de-the { font-size: 22px; } .o-nhap-lieu { padding: 12px 16px 12px 40px; font-size: 14px; } }
</style>