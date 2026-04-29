<template>
    <div class="customer-manager-wrapper">
        
        <!-- Header Page -->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-4">
            <div class="breadcrumb-title pe-3 fw-bold text-dark fs-4">
                <i class="fa-solid fa-users-viewfinder text-primary-custom me-2"></i> Khách Hàng Của Tôi
            </div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><router-link to="/huong-dan-vien/profile"><i class="bx bx-home-alt"></i></router-link></li>
                        <li class="breadcrumb-item active text-muted" aria-current="page">Danh sách theo Tour đã nhận</li>
                    </ol>
                </nav>
            </div>
            <div class="ms-auto">
                <button class="btn btn-light-custom" @click="loadData()">
                    <i class="fa-solid fa-rotate-right me-1"></i> Làm mới
                </button>
            </div>
        </div>

        <!-- Trạng thái Loading -->
        <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary-custom" role="status"></div>
            <p class="text-muted mt-3 fw-medium">Đang tải dữ liệu khách hàng...</p>
        </div>

        <!-- Trạng thái Trống (Chưa nhận tour nào) -->
        <div v-else-if="listData.length === 0" class="card premium-card border-0 shadow-sm text-center py-5">
            <div class="card-body">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png" width="130" class="opacity-50 mb-4" alt="Empty">
                <h4 class="text-dark fw-bold">Bạn chưa phụ trách Tour nào!</h4>
                <p class="text-muted mb-4">Hãy nhận Tour để bắt đầu xem danh sách Khách hàng của mình.</p>
                <router-link to="/huong-dan-vien/quan-ly-tour" class="btn btn-gradient-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                    <i class="fa-solid fa-briefcase me-2"></i> TỚI KHO TOUR NHẬN VIỆC
                </router-link>
            </div>
        </div>

        <!-- Danh sách Khách Hàng (Nhóm theo từng Tour) -->
        <div v-else class="row">
            <div class="col-12" v-for="(tour, index) in listData" :key="index">
                <div class="card premium-card border-0 shadow-sm mb-4 slide-in">
                    
                    <!-- Header Card: Thông tin Tour -->
                    <div class="card-header bg-white border-bottom p-4">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <div>
                                <span class="badge bg-success bg-opacity-10 text-white px-3 py-2 rounded-pill mb-2 fw-bold border border-success border-opacity-25">
                                    MÃ TOUR: #{{ tour.id }}
                                </span>
                                <h5 class="fw-bold text-dark mb-1">{{ tour.ten_tour }}</h5>
                                <p class="text-muted mb-0 small">
                                    <i class="fa-regular fa-calendar-check me-1"></i> Khởi hành: <strong>{{ formatDate(tour.ngay_bat_dau) }}</strong> 
                                </p>
                            </div>
                            <div class="text-end">
                                <div class="stat-box shadow-sm">
                                    <span class="fs-4 fw-bold text-primary-custom">{{ tour.tong_khach_da_dat }}</span>
                                    <span class="text-muted small"> / {{ tour.so_nguoi_toi_da }} khách</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Body Card: Bảng Khách Hàng -->
                    <div class="card-body p-0">
                        <div v-if="!tour.danh_sach_khach_hang || tour.danh_sach_khach_hang.length === 0" class="text-center py-4 bg-light">
                            <p class="text-muted fst-italic mb-0">Tour này hiện tại chưa có khách hàng nào đặt vé.</p>
                        </div>

                        <div v-else class="table-responsive">
                            <table class="table table-hover align-middle custom-table mb-0">
                                <thead class="bg-light text-secondary">
                                    <tr>
                                        <th class="text-center" width="5%">STT</th>
                                        <th width="25%">Người Đặt Tên</th>
                                        <th width="15%">Số Lượng Vé</th>
                                        <th width="20%">Số Điện Thoại</th>
                                        <th width="20%">Email</th>
                                        <th width="15%">CCCD / Hộ Chiếu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(kh, khIndex) in tour.danh_sach_khach_hang" :key="khIndex">
                                        <td class="text-center text-muted fw-bold">{{ khIndex + 1 }}</td>
                                        
                                        <!-- Cột Người đặt -->
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar-circle me-3 text-white fw-bold shadow-sm">
                                                    {{ getInitials(kh.ho_va_ten) }}
                                                </div>
                                                <div>
                                                    <h6 class="mb-0 fw-bold text-dark">{{ kh.ho_va_ten || 'Đang cập nhật' }}</h6>
                                                    <small class="text-muted">Mã HĐ: {{ kh.ma_hoa_don }}</small>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <!-- Cột Số Lượng -->
                                        <td>
                                            <span class="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm">
                                                {{ kh.so_luong_nguoi }} người đi
                                            </span>
                                        </td>

                                        <!-- Cột SĐT -->
                                        <td>
                                            <span class="badge bg-light text-dark border px-2 py-1">
                                                <i class="fa-solid fa-phone text-primary-custom me-1"></i> 
                                                {{ kh.so_dien_thoai || 'Chưa cung cấp' }}
                                            </span>
                                        </td>
                                        
                                        <!-- Cột Email -->
                                        <td>
                                            <span class="text-muted">{{ kh.email || 'Chưa cung cấp' }}</span>
                                        </td>

                                        <!-- Cột CCCD -->
                                        <td>
                                            <span class="fw-medium text-dark">{{ kh.cccd || 'Chưa cung cấp' }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
            listData: [], // Mảng chứa các Tour (mỗi tour chứa danh_sach_khach_hang)
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
        getInitials(name) {
            if (!name) return 'KH';
            let parts = name.trim().split(' ');
            return parts[parts.length - 1].charAt(0).toUpperCase();
        },
        
        loadData() {
            this.isLoading = true;
            axios.get(apiUrl('huong-dan-vien/quan-ly-khach-hang/get-data'), { headers: this.getHeaders() })
                .then((res) => {
                    if (res.data.status) {
                        this.listData = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    this.$toast.error("Không thể tải danh sách khách hàng. Vui lòng kiểm tra lại kết nối.");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
.customer-manager-wrapper {
    padding-bottom: 3rem;
}
.text-primary-custom { color: #1b7d6b !important; }

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
.btn-light-custom {
    background-color: #ffffff;
    color: #475569;
    border-radius: 8px;
    font-weight: 600;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
}
.btn-light-custom:hover {
    background-color: #f8fafc;
    color: #1b7d6b;
    border-color: #1b7d6b;
}

/* CARD CHÍNH */
.premium-card {
    border-radius: 16px;
    overflow: hidden;
}

.stat-box {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 10px 20px;
    border-radius: 12px;
    display: inline-block;
}

/* TABLE CUSTOM */
.custom-table th {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    padding: 1rem;
    border-bottom: 2px solid #e2e8f0;
}
.custom-table td {
    padding: 1.25rem 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #f1f5f9;
}
.custom-table tbody tr {
    transition: background-color 0.2s ease;
}
.custom-table tbody tr:hover {
    background-color: #f8fafc;
}

/* AVATAR CHỮ CÁI */
.avatar-circle {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #1b7d6b 0%, #229983 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

/* ANIMATION */
.slide-in {
    animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>