<template>
    <div class="schedule-page-wrapper">
        
        <!-- Header Page -->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-4">
            <div class="breadcrumb-title pe-3 fw-bold text-dark fs-4">
                <i class="fa-solid fa-route text-primary-custom me-2"></i> Lịch Trình Của Tôi
            </div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><router-link to="/huong-dan-vien/profile"><i class="bx bx-home-alt"></i></router-link></li>
                        <li class="breadcrumb-item active text-muted" aria-current="page">Chi tiết công việc</li>
                    </ol>
                </nav>
            </div>
        </div>

        <!-- Trạng thái Loading -->
        <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary-custom" role="status"></div>
            <p class="text-muted mt-3 fw-medium">Đang tải dữ liệu lịch trình...</p>
        </div>

        <!-- Trạng thái Trống (Chưa nhận tour nào) -->
        <div v-else-if="listData.length === 0" class="card premium-card border-0 shadow-sm text-center py-5">
            <div class="card-body">
                <img src="https://cdn-icons-png.flaticon.com/512/7466/7466140.png" width="130" class="opacity-50 mb-4" alt="Empty">
                <h4 class="text-dark fw-bold">Bạn chưa có lịch trình nào!</h4>
                <p class="text-muted mb-4">Hiện tại bạn chưa nhận dẫn tour nào. Hãy vào Kho Tour để nhận việc ngay.</p>
                <router-link to="/huong-dan-vien/quan-ly-tour" class="btn btn-gradient-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                    <i class="fa-solid fa-briefcase me-2"></i> ĐI ĐẾN KHO TOUR
                </router-link>
            </div>
        </div>

        <!-- Danh sách Tour và Lịch trình Timeline -->
        <div v-else class="row justify-content-center">
            <div class="col-12 col-xl-10">
                
                <div v-for="(tour, index) in listData" :key="index" class="card premium-card border-0 shadow-sm mb-5 slide-in">
                    
                    <!-- Header của 1 Tour -->
                    <div class="card-header bg-white border-bottom p-4">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <div>
                                <span class="badge bg-danger bg-opacity-10 text-white px-3 py-2 rounded-pill mb-2 fw-bold">
                                    MÃ TOUR: #{{ tour.id_tour }}
                                </span>
                                <h4 class="fw-bold text-dark mb-1">{{ tour.ten_tour }}</h4>
                                <p class="text-muted mb-0">
                                    <i class="fa-regular fa-calendar me-1"></i> Khởi hành: <strong>{{ formatDate(tour.ngay_bat_dau) }}</strong> 
                                    <i class="fa-solid fa-arrow-right mx-2 text-secondary"></i> Kết thúc: <strong>{{ formatDate(tour.ngay_ket_thuc) }}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Body chứa Timeline Lịch trình -->
                    <div class="card-body p-4 p-md-5 bg-light-custom">
                        
                        <div v-if="!tour.danh_sach_lich_trinh || tour.danh_sach_lich_trinh.length === 0" class="text-center text-muted fst-italic">
                            Tour này chưa được cập nhật chi tiết lịch trình.
                        </div>

                        <!-- Khung Timeline -->
                        <div v-else class="timeline-container">
                            
                            <div v-for="(step, stepIndex) in tour.danh_sach_lich_trinh" :key="stepIndex" class="timeline-item">
                                <!-- Chấm tròn timeline -->
                                <div class="timeline-dot"></div>
                                
                                <!-- Nội dung của 1 bước lịch trình -->
                                <div class="timeline-content card border-0 shadow-sm rounded-4">
                                    <div class="card-body p-3 p-md-4 d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                                        
                                        <!-- Cột 1: Ảnh điểm đến -->
                                        <div class="step-image-box shrink-0">
                                            <img :src="step.anh_diem_den || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=80'" 
                                                 class="rounded-3 object-fit-cover shadow-sm" alt="Điểm đến">
                                        </div>

                                        <!-- Cột 2: Thông tin chi tiết -->
                                        <div class="step-info flex-grow-1 w-100">
                                            <div class="d-flex flex-wrap gap-2 mb-2">
                                                <!-- Badge Điểm Đến -->
                                                <span class="badge badge-location shadow-sm border border-success border-opacity-25">
                                                    <i class="fa-solid fa-location-dot me-1"></i> 
                                                    {{ step.ten_diem_den || 'Chưa rõ điểm đến' }} 
                                                    <small class="opacity-75 ms-1">(ID: {{ step.id_diem_den }})</small>
                                                </span>

                                                <!-- Badge Phương Tiện -->
                                                <span v-if="step.loai_phuong_tien" class="badge badge-transport shadow-sm border border-primary border-opacity-25">
                                                    <i class="fa-solid fa-car-side me-1"></i> 
                                                    {{ step.loai_phuong_tien }} <span v-if="step.so_hieu">({{ step.so_hieu }})</span>
                                                    <small class="opacity-75 ms-1">(ID: {{ step.id_phuong_tien }})</small>
                                                </span>
                                                <span v-else class="badge bg-white text-secondary border shadow-sm">
                                                    <i class="fa-solid fa-person-walking me-1"></i> Tự túc / Đi bộ
                                                </span>
                                            </div>

                                            <h6 class="fw-bold text-dark mt-2 mb-0 title-activity" style="line-height: 1.5;">
                                                {{ step.tieu_de_hoat_dong }}
                                            </h6>
                                        </div>

                                    </div>
                                </div>
                            </div>

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
            listData: [], // Mảng chứa các Tour (mỗi tour chứa danh_sach_lich_trinh)
            isLoading: true
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getHeaders() {
            return {
                Authorization: "Bearer " + localStorage.getItem("key_hdv"),
            };
        },
        formatDate(dateString) {
            if (!dateString) return "...";
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN').format(date);
        },
        loadData() {
            this.isLoading = true;
            axios.get(apiUrl('huong-dan-vien/lich-trinh/get-data'), { headers: this.getHeaders() })
                .then((res) => {
                    if (res.data.status) {
                        this.listData = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    this.$toast.error("Không thể tải danh sách lịch trình.");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
.schedule-page-wrapper {
    padding-bottom: 3rem;
}
.text-primary-custom { color: #1b7d6b !important; }
.bg-light-custom { background-color: #f8fafc; }

/* NÚT BẤM */
.btn-gradient-primary {
    background: linear-gradient(135deg, #1b7d6b 0%, #229983 100%);
    border: none;
    color: #fff;
    transition: all 0.3s ease;
}
.btn-gradient-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(27, 125, 107, 0.3) !important;
    color: #fff;
}

/* CARD CHÍNH */
.premium-card {
    border-radius: 20px;
}

/* ================================
   THIẾT KẾ TIMELINE (DÒNG THỜI GIAN)
   ================================ */
.timeline-container {
    position: relative;
    padding-left: 15px;
}

/* Đường kẻ dọc nối các chấm */
.timeline-container::before {
    content: '';
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 23px; /* Căn giữa chấm tròn */
    width: 2px;
    background: #e2e8f0;
    border-radius: 2px;
}

.timeline-item {
    position: relative;
    margin-bottom: 1.5rem;
    padding-left: 35px; /* Đẩy nội dung ra xa đường kẻ */
}

/* Ẩn margin bottom của item cuối cùng */
.timeline-item:last-child {
    margin-bottom: 0;
}

/* Chấm tròn mốc thời gian */
.timeline-dot {
    position: absolute;
    left: -2px; /* Căn tọa độ để đè lên đường kẻ */
    top: 35px;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 4px solid #1b7d6b;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 0 0 4px rgba(27, 125, 107, 0.1);
}

/* Card chứa nội dung 1 bước */
.timeline-content {
    transition: all 0.3s ease;
    border: 1px solid #f1f5f9 !important;
}
.timeline-content:hover {
    transform: translateX(5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08) !important;
    border-color: rgba(27, 125, 107, 0.2) !important;
}

/* Ảnh của điểm đến */
.step-image-box img {
    width: 120px;
    height: 90px;
}
.shrink-0 {
    flex-shrink: 0;
}

/* Badges */
.badge {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
}
.badge-location {
    background-color: rgba(16, 185, 129, 0.1);
    color: #059669;
}
.badge-transport {
    background-color: rgba(59, 130, 246, 0.1);
    color: #2563eb;
}

.title-activity {
    font-size: 1.05rem;
}

/* ANIMATION */
.slide-in {
    animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsive cho mobile */
@media (max-width: 768px) {
    .step-image-box img {
        width: 100%;
        height: 150px;
    }
}
</style>