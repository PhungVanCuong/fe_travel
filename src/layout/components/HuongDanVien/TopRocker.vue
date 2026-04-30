<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand">
                <div class="topbar-logo-header">
                    <div class="">
                        <router-link class="logo-text" to="/huong-dan-vien/profile">Hướng Dẫn Viên</router-link>
                    </div>
                </div>
                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
                
                <div class="top-menu ms-auto">
                    <ul class="navbar-nav align-items-center">
                        <li class="nav-item dropdown dropdown-large">
                            <a class="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
                                <span class="alert-count">0</span>
                                <i class='bx bx-bell'></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a href="javascript:;">
                                    <div class="msg-header">
                                        <p class="msg-header-title">Thông báo</p>
                                    </div>
                                </a>
                                <div class="header-notifications-list">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div class="user-box dropdown">
                    <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <!-- ĐÃ SỬA LẠI THÀNH USERPROFILE.AVATAR ĐỂ LẤY ĐÚNG ẢNH -->
                        <img :src="userProfile.avatar || 'https://ui-avatars.com/api/?name=' + userProfile.ho_va_ten + '&background=random'" class="user-img" alt="user avatar">
                        <div class="user-info ps-3">
                            <p class="user-name mb-0">{{ userProfile.ho_va_ten || 'Đang tải...' }}</p>
                            <small class="text-muted">{{ userProfile.email || 'HDV IXTAL TOUR' }}</small>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <router-link class="dropdown-item" to="/huong-dan-vien/profile">
                                <i class="bx bx-user"></i><span>Thông tin cá nhân</span>
                            </router-link>
                        </li>
                        <li>
                            <div class="dropdown-divider mb-0"></div>
                        </li>
                        <li>
                            <a class="dropdown-item text-danger" href="javascript:;" @click="dangXuat()">
                                <i class='bx bx-log-out'></i><span>Đăng xuất</span>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item text-danger" href="javascript:;" @click="dangXuatAll()">
                                <i class='bx bx-power-off'></i><span>Đăng xuất tất cả thiết bị</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    name: 'TopHeader',
    data() {
        return {
            userProfile: {
                ho_va_ten: '',
                email: '',
                avatar: '' // Đổi thành avatar
            }
        }
    },
    mounted() {
        this.loadUserProfile();
        // Lắng nghe sự kiện khi Profile cập nhật thì tải lại avatar ngay lập tức
        window.addEventListener('profile-updated', this.loadUserProfile);
    },
    beforeUnmount() {
        window.removeEventListener('profile-updated', this.loadUserProfile);
    },
    methods: {
        getHeaders() {
            return {
                Authorization: "Bearer " + localStorage.getItem("key_hdv"),
            };
        },
        
        loadUserProfile() {
            axios.get(apiUrl('huong-dan-vien/profile/get-data'), { headers: this.getHeaders() })
                .then(res => {
                    if (res.data.status) {
                        this.userProfile = res.data.data;
                    }
                })
                .catch((err) => {
                    console.error("Lỗi lấy thông tin HDV:", err);
                    if(err.response && err.response.status === 401) {
                        localStorage.removeItem('key_hdv');
                        this.$router.push('/huong-dan-vien/dang-nhap');
                    }
                });
        },
        
        dangXuat() {
            axios.post(apiUrl('huong-dan-vien/dang-xuat'), {}, { headers: this.getHeaders() })
                .then(res => {
                    if (res.data.status) {
                        localStorage.removeItem('key_hdv');
                        this.$toast.success(res.data.message);
                        this.$router.push('/huong-dan-vien/dang-nhap');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    this.$toast.error("Đã có lỗi xảy ra khi đăng xuất.");
                });
        },

        dangXuatAll() {
            if(confirm("Bạn có chắc chắn muốn đăng xuất khỏi tất cả các thiết bị?")) {
                axios.post(apiUrl('huong-dan-vien/dang-xuat-all'), {}, { headers: this.getHeaders() })
                    .then(res => {
                        if (res.data.status) {
                            localStorage.removeItem('key_hdv');
                            this.$toast.success(res.data.message);
                            this.$router.push('/huong-dan-vien/dang-nhap');
                        }
                    })
                    .catch((err) => {
                        this.$toast.error("Đã có lỗi xảy ra.");
                    });
            }
        }
    },
    watch: {
        '$route'() {
            this.loadUserProfile();
        }
    }
}
</script>
<style scoped>
.text-danger i {
    color: #dc3545 !important;
}
</style>