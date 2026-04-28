<template>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0" style="min-height: 100vh;">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto">
                    
                    <div class="text-center mb-4">
                        <div class="mx-auto d-flex align-items-center justify-content-center">
                            <img src="../../../assets/images/2-removebg-preview.png" alt="Tr0ondCinema Logo" class="img-fluid" style="max-width: 250px; height: auto;">
                        </div>
                        <h2 class="fw-bold text-white mt-3 text-uppercase letter-spacing-2">Cổng Quản Trị</h2>
                        <p class="text-light-50">Hệ thống quản lý chuyên dụng <span class="fw-bold text-gradient-admin">Tr0ondCinema</span></p>
                    </div>

                    <div class="card glass-card border-0 shadow-lg">
                        <div class="card-body p-4 p-sm-5">
                            <div class="form-body">
                                <div class="row g-4">
                                    
                                    <div class="col-12">
                                        <label class="form-label text-white-50 small fw-bold mb-1">Email Quản Trị</label>
                                        <div class="input-group input-group-lg">
                                            <span class="input-group-text custom-input-bg border-end-0 text-white-50">
                                                <i class="fa-solid fa-user-shield"></i>
                                            </span>
                                            <input v-model="user.email" type="email" 
                                                class="form-control custom-input-bg border-start-0 text-white shadow-none" 
                                                placeholder="admin@tr0ondcinema.com"
                                                @keyup.enter="dangNhap">
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label class="form-label text-white-50 small fw-bold mb-1">Mật khẩu</label>
                                        <div class="input-group input-group-lg">
                                            <span class="input-group-text custom-input-bg border-end-0 text-white-50">
                                                <i class="fa-solid fa-lock"></i>
                                            </span>
                                            <input v-model="user.password" :type="passwordVisible ? 'text' : 'password'" 
                                                class="form-control custom-input-bg border-start-0 border-end-0 text-white shadow-none" 
                                                placeholder="••••••••"
                                                @keyup.enter="dangNhap">
                                            <span class="input-group-text custom-input-bg border-start-0 text-white-50" style="cursor: pointer;" @click="passwordVisible = !passwordVisible">
                                                <i :class="passwordVisible ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="col-12 mt-5">
                                        <button @click="dangNhap" :disabled="isLoading" 
                                            class="btn btn-gradient-admin w-100 py-3 fw-bold text-white d-flex justify-content-center align-items-center gap-2">
                                            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span v-else>Đăng Nhập Hệ Thống <i class="fa-solid fa-right-to-bracket"></i></span>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-4 text-white-50">
                        <small>&copy; 2026 Tr0ondCinema Team. Bảo mật đa lớp.</small>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            passwordVisible: false,
            isLoading: false,
        }
    },
    methods: {
        dangNhap() {
            if (!this.user.email || !this.user.password) {
                this.$toast.warning("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            this.isLoading = true;
            axios.post(apiUrl('admin/dang-nhap'), this.user)
                .then((res) => {
                    if (res.data.status) {
                        localStorage.setItem('key_admin', res.data.token);
                        this.$toast.success(res.data.message);
                        this.$router.push('/admin/quan-ly-tour');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    // Xử lý lỗi validation từ Laravel hoặc lỗi Server
                    if (err.response && err.response.data && err.response.data.errors) {
                        const list = Object.values(err.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error("Hệ thống đang bận, vui lòng thử lại sau!");
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 20px;
}

.custom-input-bg {
    background: rgba(0, 0, 0, 0.3) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.btn-gradient-admin {
    background: linear-gradient(45deg, #00c6ff, #0072ff);
    border: none;
    border-radius: 10px;
    transition: all 0.3s;
}

.btn-gradient-admin:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 114, 255, 0.4);
}

.text-gradient-admin {
    background: linear-gradient(45deg, #00c6ff, #0072ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.letter-spacing-2 {
    letter-spacing: 2px;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.3) !important;
}

/* Hiệu ứng focus cho input */
.form-control:focus {
    border-color: #00c6ff !important;
    background: rgba(0, 0, 0, 0.5) !important;
}
</style>