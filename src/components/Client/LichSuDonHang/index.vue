<template>
    <div class="container my-5">
        <div class="header-section mb-5">
            <h1 class="fw-bold text-dark">Lịch sử đặt tour</h1>
            <p class="text-secondary">Quản lý và xem lại những hành trình tuyệt vời bạn đã trải qua cùng Ixtal Tour.</p>
        </div>

        <div v-if="ds_hoa_don.length > 0">
            <div v-for="(item, index) in ds_hoa_don" :key="index" class="card mb-4 shadow-sm border-0 tour-card">
                <div class="card-body p-0">
                    <div class="row g-0 align-items-center">
                        <div class="col-md-3">
                            <img :src="item.tour.hinh_anh" class="img-fluid rounded-start h-100 tour-img"
                                alt="tour image">
                        </div>

                        <div class="col-md-6 p-4 border-end">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h4 class="fw-bold mb-0 text-dark">{{ item.tour.ten_tour }}</h4>
                                <span v-if="item.trang_thai == 2"
                                    class="badge rounded-pill bg-success-subtle text-success px-3">Đã thanh toán</span>
                                <span v-else-if="item.trang_thai == 1"
                                    class="badge rounded-pill bg-primary-subtle text-primary px-3">Chưa thanh
                                    toán</span>
                                <span v-else class="badge rounded-pill bg-secondary-subtle text-secondary px-3">Đã
                                    hủy</span>
                            </div>

                            <div class="tour-info mt-3">
                                <div class="mb-2 text-muted">
                                    <i class="fa-solid fa-calendar-check me-2"></i>
                                    Đặt ngày: <span class="fw-medium text-dark">{{ item.ngay_dat }}</span>
                                </div>
                                <div class="text-muted">
                                    <i class="fa-solid fa-plane-departure me-2"></i>
                                    Khởi hành: <span class="fw-medium text-dark">{{ item.tour.ngay_bat_dau }} - {{
                                        item.tour.ngay_ket_thuc }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 p-4 text-center">
                            <div class="price-section mb-3">
                                <span class="small text-muted text-uppercase d-block mb-1 fw-bold">Tổng cộng</span>
                                <h3 class="fw-bold text-primary mb-0">{{ formatVND(item.tong_tien) }}</h3>
                            </div>
                            <button @click="xemChiTiet(item)"
                                class="btn btn-primary px-4 py-2 w-100 rounded-pill shadow-sm fw-bold">
                                Xem chi tiết <i class="fa-solid fa-chevron-right ms-2 small"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-5 bg-light rounded-4 border-dashed">
            <i class="fa-solid fa-folder-open fs-1 text-muted mb-3"></i>
            <h4 class="text-secondary">Bạn chưa có chuyến đi nào.</h4>
            <router-link to="/" class="btn btn-primary mt-3 px-4">Khám phá tour ngay</router-link>
        </div>
    </div>
    <div v-if="is_show_detail" class="modal-overlay" @click.self="is_show_detail = false">
        <div class="modal-detail-content animate__animated animate__zoomIn">
            <div class="modal-header d-flex justify-content-between align-items-center border-bottom-0">
                <div>
                    <h4 class="fw-bold mb-0">Chi tiết đơn hàng #{{ chi_tiet.ma_hoa_don }}</h4>
                    <small class="text-muted">Đặt ngày: {{ chi_tiet.ngay_dat }}</small>
                </div>
                <button type="button" class="btn-close" @click="is_show_detail = false"></button>
            </div>

            <div class="modal-body">
                <div class="tour-summary-box d-flex align-items-center p-3 mb-4 rounded-3 border">
                    <img :src="chi_tiet.tour.hinh_anh" class="rounded me-3"
                        style="width: 100px; height: 70px; object-fit: cover;">
                    <div>
                        <h6 class="fw-bold mb-1">{{ chi_tiet.tour.ten_tour }}</h6>
                        <div class="small text-muted">
                            <i class="fa-solid fa-calendar-days me-1"></i> Khởi hành: <span
                                class="text-primary fw-bold">{{ chi_tiet.tour.ngay_bat_dau }}</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-6">
                        <h6 class="fw-bold mb-3"><i class="fa-solid fa-users me-2"></i>Số lượng hành khách</h6>
                        <div class="p-2 border rounded mb-2 bg-light d-flex justify-content-between">{{
                            chi_tiet.so_luong_nguoi }}</div>
                    </div>

                    <div class="col-6">
                        <h6 class="fw-bold mb-3"><i class="fa-solid fa-credit-card me-2"></i>Thông tin thanh toán</h6>
                        <div class="p-3 border rounded">
                            <div class="d-flex justify-content-between mb-2 small">
                                <span>Phương thức</span>
                                <span class="fw-bold"><i class="fa-solid fa-wallet me-1"></i>{{
                                    chi_tiet.phuong_thuc_thanh_toan || 'VNPay' }}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small">Trạng thái</span>
                                <span v-if="chi_tiet.trang_thai == 2"
                                    class="badge bg-success-subtle text-success px-3">Đã thanh toán</span>
                                <span v-else-if="chi_tiet.trang_thai == 1"
                                    class="badge bg-warning-subtle text-warning px-3">Chưa thanh toán</span>
                                <span v-else class="badge bg-danger-subtle text-danger px-3">Đã hủy</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="my-4">

                <div class="price-detail">
                    <h6 class="fw-bold mb-3"><i class="fa-solid fa-receipt me-2"></i>Chi tiết giá</h6>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Giá cơ bản</span>
                        <span>{{ formatVND(chi_tiet.tong_tien) }}</span>
                    </div>
                    <div class="d-flex justify-content-between fs-4 fw-bold mt-3 pt-3 border-top">
                        <span>Tổng cộng</span>
                        <span class="text-primary">{{ formatVND(chi_tiet.tong_tien) }}</span>
                    </div>
                </div>
            </div>

            <div class="modal-footer border-top-0 d-flex justify-content-end gap-2 p-4">
                <button v-if="chi_tiet.trang_thai == 2" class="btn btn-outline-primary px-4">
                    <i class="fa-solid fa-download me-2"></i>Tải hóa đơn
                </button>

                <button v-if="chi_tiet.trang_thai == 1" class="btn btn-danger px-4 fw-bold"
                    @click="thanhToanLai(chi_tiet.id)">
                    Thanh toán ngay
                </button>

                <button class="btn btn-dark px-4" @click="is_show_detail = false">Đóng</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import apiUrl from '../../../utils/api'

export default {
    data() {
        return {
            is_show_detail: false,
            chi_tiet: {
                tour: {},
                ve: []
            },
            ds_hoa_don: [],
            isLoading: true
        }
    },
    mounted() {
        this.getLichSu();
    },
    methods: {
        thanhToanLai(id) {
            this.$router.push({
                path: '/Dat-tour',
                query: { id: id }
            });
        },
        xemChiTiet(item) {
            this.chi_tiet = item;
            this.is_show_detail = true;
        },
        getLichSu() {
            axios.get(apiUrl('/client/hoa-don/danh-sach'), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_client')
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.ds_hoa_don = res.data.data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        formatVND(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        }
    }
}
</script>
<style scoped>
.tour-card {
    transition: transform 0.2s, box-shadow 0.2s;
    border-radius: 16px !important;
    overflow: hidden;
}

.tour-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.tour-img {
    object-fit: cover;
    min-height: 200px;
    width: 100%;
}

.badge {
    font-size: 0.85rem;
    font-weight: 600;
}

.btn-primary {
    background-color: #005baa;
    border: none;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #004a8d;
    transform: scale(1.02);
}

.border-dashed {
    border: 2px dashed #dee2e6 !important;
}

.text-primary {
    color: #005baa !important;

}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-detail-content {
    background: white;
    width: 650px;
    border-radius: 20px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 10px;
}

.tour-summary-box {
    background-color: #f8fbff;
    border-color: #e1f0ff !important;
}

.badge {
    font-weight: 800;
    letter-spacing: 1px;
}

.bg-success-subtle {
    background-color: #d1e7dd !important;
}

.bg-warning-subtle {
    background-color: #fff3cd !important;
}

.bg-danger-subtle {
    background-color: #f8d7da !important;
}
</style>