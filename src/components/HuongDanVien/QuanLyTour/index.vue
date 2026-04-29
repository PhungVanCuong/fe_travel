<template>
    <div class="tour-manager-wrapper">
        
        <!-- Header Page -->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-4">
            <div class="breadcrumb-title pe-3 fw-bold text-dark fs-4">
                <i class="fa-solid fa-map-location-dot text-primary-custom me-2"></i> Quản Lý Tour Dẫn
            </div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><router-link to="/huong-dan-vien/profile"><i class="bx bx-home-alt"></i></router-link></li>
                        <li class="breadcrumb-item active text-muted" aria-current="page">Kho tour công việc</li>
                    </ol>
                </nav>
            </div>
        </div>

        <!-- Custom VIP Tabs -->
        <div class="vip-tabs-container mb-4">
            <button @click="switchTab('trong')" :class="['vip-tab', activeTab === 'trong' ? 'active' : '']">
                <i class="fa-solid fa-box-open me-2"></i> KHO TOUR CHỜ NHẬN
                <span class="badge rounded-pill bg-danger ms-2 shadow-sm" v-if="listTourTrong.length > 0">{{ listTourTrong.length }}</span>
            </button>
            <button @click="switchTab('cua-toi')" :class="['vip-tab', activeTab === 'cua-toi' ? 'active' : '']">
                <i class="fa-solid fa-briefcase me-2"></i> TOUR CỦA TÔI
                <span class="badge rounded-pill bg-warning text-dark ms-2 shadow-sm" v-if="listTourCuaToi.length > 0">{{ listTourCuaToi.length }}</span>
            </button>
        </div>

        <!-- TAB 1: KHO TOUR CHỜ NHẬN -->
        <div v-if="activeTab === 'trong'" class="fade-in-up">
            <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary-custom" role="status"></div>
                <p class="text-muted mt-2">Đang tìm kiếm tour phù hợp...</p>
            </div>
            
            <div v-else-if="listTourTrong.length === 0" class="empty-state text-center py-5 bg-white rounded-4 shadow-sm border-0">
                <img src="https://cdn-icons-png.flaticon.com/512/7466/7466140.png" width="120" class="opacity-50 mb-3 mt-4" alt="Empty">
                <h5 class="text-muted fw-bold">Hiện tại chưa có tour nào đang trống</h5>
                <p class="text-muted small pb-4">Hãy quay lại sau để cập nhật các chuyến đi mới nhé.</p>
            </div>

            <div v-else class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                <div class="col" v-for="(tour, index) in listTourTrong" :key="index">
                    <div class="card premium-tour-card h-100 border-0 shadow-sm">
                        <div class="card-img-wrapper position-relative">
                            <img :src="tour.hinh_anh || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'" class="card-img-top" alt="Tour Image">
                            <div class="overlay-gradient"></div>
                            <span class="badge-status bg-warning text-dark shadow-sm">
                                <i class="fa-solid fa-clock me-1"></i> Đang chờ HDV
                            </span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold text-dark text-truncate-2" :title="tour.ten_tour">{{ tour.ten_tour }}</h5>
                            
                            <ul class="list-unstyled mt-3 mb-4 flex-grow-1 tour-details-list">
                                <li>
                                    <i class="fa-regular fa-calendar-check text-primary-custom me-2"></i> Khởi hành: 
                                    <strong class="text-danger">{{ formatDate(tour.ngay_bat_dau) }}</strong>
                                </li>
                                <li>
                                    <i class="fa-solid fa-users text-primary-custom me-2"></i> Khách tham gia: 
                                    <strong>Tối đa {{ tour.so_nguoi_toi_da }} người</strong>
                                </li>
                                <li>
                                    <i class="fa-solid fa-location-dot text-primary-custom me-2"></i> Đón khách: 
                                    <span class="text-muted fw-medium">{{ tour.diem_don }}</span>
                                </li>
                            </ul>
                            
                            <button @click="nhanTour(tour.id)" class="btn btn-gradient-vip w-100 fw-bold shadow-sm custom-hover-btn">
                                NHẬN DẪN TOUR NÀY <i class="fa-solid fa-check-circle ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 2: TOUR CỦA TÔI -->
        <div v-if="activeTab === 'cua-toi'" class="fade-in-up">
            <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-primary-custom" role="status"></div>
            </div>
            
            <div v-else-if="listTourCuaToi.length === 0" class="empty-state text-center py-5 bg-white rounded-4 shadow-sm border-0">
                <img src="https://cdn-icons-png.flaticon.com/512/4371/4371216.png" width="120" class="opacity-50 mb-3 mt-4" alt="Empty">
                <h5 class="text-muted fw-bold">Bạn chưa nhận dẫn tour nào</h5>
                <p class="text-muted small pb-4">Hãy chuyển sang tab <b>Kho Tour</b> để nhận lịch trình mới.</p>
            </div>

            <div v-else class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                <div class="col" v-for="(tour, index) in listTourCuaToi" :key="index">
                    <div class="card premium-tour-card my-tour-card h-100 border-0 shadow-sm" style="border: 2px solid #1b7d6b !important;">
                        <div class="card-img-wrapper position-relative">
                            <img :src="tour.hinh_anh || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'" class="card-img-top" alt="Tour Image">
                            <div class="overlay-gradient"></div>
                            <span class="badge-status bg-success text-white shadow-sm">
                                <i class="fa-solid fa-shield-check me-1"></i> Tour Bạn Đã Nhận
                            </span>
                        </div>
                        <div class="card-body d-flex flex-column bg-light">
                            <h5 class="card-title fw-bold text-dark text-truncate-2">{{ tour.ten_tour }}</h5>
                            
                            <ul class="list-unstyled mt-3 mb-4 flex-grow-1 tour-details-list">
                                <li>
                                    <i class="fa-solid fa-calendar-day text-success me-2"></i> Lịch trình: 
                                    <strong>{{ formatDate(tour.ngay_bat_dau) }} - {{ formatDate(tour.ngay_ket_thuc) }}</strong>
                                </li>
                                <li>
                                    <i class="fa-solid fa-people-group text-success me-2"></i> Phục vụ: 
                                    <strong>{{ tour.so_nguoi_toi_da }} khách</strong>
                                </li>
                                <li>
                                    <i class="fa-solid fa-handshake-angle text-success me-2"></i> Trạng thái: 
                                    <strong class="text-success">Đã xác nhận phân công</strong>
                                </li>
                            </ul>
                            
                            <router-link to="/huong-dan-vien/lich-trinh" class="btn btn-outline-success w-100 fw-bold custom-hover-btn">
                                XEM CHI TIẾT CÔNG VIỆC <i class="fa-solid fa-arrow-right ms-1"></i>
                            </router-link>
                        </div>
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
            activeTab: 'trong', 
            listTourTrong: [],
            listTourCuaToi: [],
            isLoading: false
        }
    },
    mounted() {
        this.loadTourTrong();
        this.loadTourCuaToi(); // Lấy số lượng badge luôn lúc đầu
    },
    methods: {
        getHeaders() {
            return {
                Authorization: "Bearer " + localStorage.getItem("key_hdv"),
            };
        },
        switchTab(tab) {
            this.activeTab = tab;
            if (tab === 'trong') this.loadTourTrong();
            if (tab === 'cua-toi') this.loadTourCuaToi();
        },
        formatDate(dateString) {
            if (!dateString) return "...";
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN').format(date);
        },
        
        loadTourTrong() {
            this.isLoading = true;
            axios.get(apiUrl('huong-dan-vien/quan-ly-tour/tour-trong'), { headers: this.getHeaders() })
                .then(res => {
                    if (res.data.status) {
                        this.listTourTrong = res.data.data;
                    }
                })
                .catch(err => { console.error(err); })
                .finally(() => { this.isLoading = false; });
        },

        loadTourCuaToi() {
            this.isLoading = true;
            axios.get(apiUrl('huong-dan-vien/quan-ly-tour/tour-cua-toi'), { headers: this.getHeaders() })
                .then(res => {
                    if (res.data.status) {
                        this.listTourCuaToi = res.data.data;
                    }
                })
                .catch(err => { console.error(err); })
                .finally(() => { this.isLoading = false; });
        },

        nhanTour(id_tour) {
            if(confirm("Bạn có chắc chắn muốn nhận dẫn Tour này? Việc này đồng nghĩa bạn cam kết lịch trình với công ty.")) {
                axios.post(apiUrl('huong-dan-vien/quan-ly-tour/nhan-tour'), { id_tour: id_tour }, { headers: this.getHeaders() })
                    .then(res => {
                        if (res.data.status) {
                            this.$toast.success(res.data.message);
                            // Tải lại 2 mảng để update giao diện & badge
                            this.loadTourTrong(); 
                            this.loadTourCuaToi();
                        } else {
                            this.$toast.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        this.$toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
                    });
            }
        }
    }
}
</script>

<style scoped>
.tour-manager-wrapper {
    padding-bottom: 3rem;
}
.text-primary-custom { color: #1b7d6b !important; }

/* VIP TABS */
.vip-tabs-container {
    display: flex;
    background: #ffffff;
    padding: 8px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    gap: 10px;
}
.vip-tab {
    flex: 1;
    border: none;
    background: transparent;
    padding: 14px 20px;
    border-radius: 10px;
    font-weight: 700;
    color: #64748b;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.vip-tab.active {
    background: #1b7d6b;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(27, 125, 107, 0.3);
}

/* CARDS PREMIUM */
.premium-tour-card {
    border-radius: 18px;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;
}
.premium-tour-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
}

.card-img-wrapper {
    height: 220px;
    overflow: hidden;
}
.card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}
.premium-tour-card:hover .card-img-top {
    transform: scale(1.08);
}
.overlay-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%);
}

.badge-status {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 6px 15px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 0.85rem;
    z-index: 2;
}

.text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 48px;
}

.tour-details-list li {
    font-size: 0.95rem;
    color: #475569;
    margin-bottom: 10px;
}

/* BUTTONS */
.btn-gradient-vip {
    background: linear-gradient(135deg, #1b7d6b 0%, #229983 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 12px;
}
.btn-outline-success {
    border: 2px solid #1b7d6b;
    color: #1b7d6b;
    border-radius: 12px;
    padding: 10px;
}
.btn-outline-success:hover {
    background-color: #1b7d6b;
    color: #fff;
}

.custom-hover-btn {
    transition: all 0.3s ease;
}
.custom-hover-btn:hover {
    box-shadow: 0 8px 20px rgba(27, 125, 107, 0.3) !important;
    transform: translateY(-2px);
}

/* ANIMATION */
.fade-in-up {
    animation: fadeInUp 0.4s ease-out;
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 576px) {
    .vip-tabs-container {
        flex-direction: column;
    }
}
</style>