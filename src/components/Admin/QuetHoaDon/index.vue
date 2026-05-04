<template>
    <div class="container-fluid bg-light min-vh-100" style="font-family: 'Inter', sans-serif;">
        <div class="container-xl py-4 py-md-5">
            <div class="row g-4">
                
                <!-- BÊN TRÁI: Ô QUÉT MÃ -->
                <div class="col-12 col-lg-4">
                    <div class="card border-0 shadow-sm h-100 rounded-4">
                        <div class="card-body p-4 p-md-5 d-flex flex-column">
                            <div class="mb-4">
                                <h2 class="fw-bold mb-3 text-dark">
                                    <i class="fa-solid fa-barcode text-primary me-2"></i>Tra Cứu Hóa Đơn
                                </h2>
                                <p class="text-muted mb-0">Nhập mã hóa đơn (VD: HDXXXXX) hoặc dùng súng quét mã vạch để tra cứu.</p>
                            </div>
                            
                            <div class="mb-4 mt-auto">
                                <label class="form-label fw-semibold mb-2 text-dark">Mã Hóa Đơn</label>
                                <div class="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                                    <span class="input-group-text bg-white border-0 text-primary">
                                        <i class="fa-solid fa-qrcode"></i>
                                    </span>
                                    <input ref="scannerInput" type="text" 
                                        class="form-control border-0 bg-white shadow-none" 
                                        placeholder="Nhập mã hóa đơn..." 
                                        v-model="ma_hoa_don_input" @keyup.enter="scanInvoice" autofocus>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-lg w-100 mb-3 fw-bold shadow-sm" style="background: linear-gradient(135deg, #4e54c8, #8f94fb); border: none;" @click="scanInvoice" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                <i v-else class="fa-solid fa-search me-2"></i> Tra Cứu Ngay
                            </button>
                            
                            <div v-if="invoice_info">
                                <button class="btn btn-light border w-100 fw-bold text-secondary" @click="resetScan">
                                    <i class="fa-solid fa-rotate-right me-2"></i> Quét mã khác
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BÊN PHẢI: KẾT QUẢ HIỂN THỊ -->
                <div class="col-12 col-lg-8">
                    <!-- NẾU CÓ DỮ LIỆU -->
                    <div v-if="invoice_info">
                        <div class="mb-4 d-flex justify-content-between align-items-center">
                            <h3 class="fw-bold mb-0 text-dark">
                                <i class="fa-solid fa-file-invoice-dollar text-success me-2"></i> Chi Tiết Hóa Đơn
                            </h3>
                            <span class="badge bg-dark px-3 py-2 fs-6 rounded-pill">#{{ invoice_info.ma_hoa_don }}</span>
                        </div>
                        
                        <div class="row g-4">
                            <!-- Ảnh và Tên Tour -->
                            <div class="col-12 col-md-5">
                                <div class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                    <div class="card-body p-0 d-flex flex-column h-100">
                                        <div class="p-3 bg-white border-bottom">
                                            <small class="text-primary fw-bold mb-1 d-block">CHUYẾN ĐI</small>
                                            <h5 class="mb-0 fw-bold text-dark lh-base" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                                {{ invoice_info.ten_tour }}
                                            </h5>
                                        </div>
                                        <div class="flex-grow-1" style="min-height: 200px;">
                                            <img v-if="invoice_info.hinh_anh_tour" :src="invoice_info.hinh_anh_tour" class="object-fit-cover h-100 w-100">
                                            <div v-else class="h-100 w-100 d-flex align-items-center justify-content-center bg-light text-muted">
                                                <i class="fa-solid fa-image fs-1"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Thông tin chi tiết -->
                            <div class="col-12 col-md-7">
                                <div class="card border-0 shadow-sm h-100 rounded-4">
                                    <div class="card-body p-4">
                                        
                                        <!-- TRẠNG THÁI THANH TOÁN -->
                                        <div class="mb-4 pb-3 border-bottom">
                                            <div class="d-flex align-items-center gap-3">
                                                <!-- Đã thanh toán -->
                                                <i v-if="invoice_info.trang_thai == 2" class="fa-solid fa-circle-check text-success" style="font-size: 3rem;"></i>
                                                <!-- Chưa thanh toán -->
                                                <i v-else-if="invoice_info.trang_thai == 1" class="fa-solid fa-circle-exclamation text-warning" style="font-size: 3rem;"></i>
                                                <!-- Đã Hủy -->
                                                <i v-else class="fa-solid fa-circle-xmark text-danger" style="font-size: 3rem;"></i>
                                                
                                                <div>
                                                    <small class="text-muted d-block mb-1 text-uppercase fw-semibold">Trạng thái thanh toán</small>
                                                    <h3 v-if="invoice_info.trang_thai == 2" class="mb-0 fw-bold text-success">Đã Thanh Toán</h3>
                                                    <h3 v-else-if="invoice_info.trang_thai == 1" class="mb-0 fw-bold text-warning">Chưa Thanh Toán</h3>
                                                    <h3 v-else class="mb-0 fw-bold text-danger">Đã Hủy Đơn</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- CÁC THÔNG SỐ CHI TIẾT -->
                                        <div class="mb-4">
                                            <div class="row g-3">
                                                <div class="col-6">
                                                    <div class="p-3 bg-light rounded-3 h-100 border">
                                                        <small class="text-muted d-block mb-1"><i class="fa-solid fa-users me-1"></i> Số lượng khách</small>
                                                        <h5 class="mb-0 fw-bold text-dark">{{ invoice_info.so_luong_nguoi }} Người</h5>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="p-3 bg-light rounded-3 h-100 border">
                                                        <small class="text-muted d-block mb-1"><i class="fa-solid fa-ticket me-1"></i> Số vé đã xuất</small>
                                                        <h5 class="mb-0 fw-bold text-dark">{{ invoice_info.so_ve_da_xuat }} Vé</h5>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-6">
                                                    <div class="p-3 bg-light rounded-3 h-100 border">
                                                        <small class="text-muted d-block mb-1"><i class="fa-solid fa-money-bill-wave me-1"></i> Tổng tiền</small>
                                                        <h4 class="mb-0 fw-bold text-danger">{{ formatVND(invoice_info.tong_tien) }}</h4>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="p-3 bg-light rounded-3 h-100 border">
                                                        <small class="text-muted d-block mb-1"><i class="fa-solid fa-credit-card me-1"></i> Phương thức TT</small>
                                                        <h6 class="mb-0 fw-bold text-dark mt-2">{{ invoice_info.phuong_thuc_thanh_toan }}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- THÔNG TIN KHÁCH HÀNG & GHI CHÚ -->
                                        <div class="p-3 bg-light rounded-3 border">
                                            <div class="d-flex justify-content-between align-items-center mb-2">
                                                <small class="text-muted"><i class="fa-solid fa-user-tag me-1"></i> Thông tin người đặt</small>
                                                <span class="badge bg-secondary">{{ formatDate(invoice_info.ngay_tao) }}</span>
                                            </div>
                                            <h5 class="mb-1 fw-bold text-primary">{{ invoice_info.ten_khach_hang }}</h5>
                                            <p class="mb-2 text-dark"><i class="fa-solid fa-phone fa-sm me-2 text-muted"></i>{{ invoice_info.so_dien_thoai }}</p>
                                            
                                            <hr class="my-2">
                                            
                                            <small class="text-muted d-block mb-1"><i class="fa-solid fa-note-sticky me-1"></i> Ghi chú đơn hàng:</small>
                                            <p class="mb-0 text-dark fst-italic" style="font-size: 0.9rem;">
                                                {{ invoice_info.ghi_chu || 'Không có ghi chú nào từ khách hàng.' }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- NẾU CHƯA CÓ DỮ LIỆU (TRẠNG THÁI CHỜ) -->
                    <div v-else class="h-100">
                        <div class="card border-0 shadow-sm h-100 rounded-4" style="background: rgba(255,255,255,0.8); border: 2px dashed #dee2e6 !important;">
                            <div class="card-body p-5 text-center d-flex flex-column justify-content-center align-items-center h-100">
                                <div style="width: 120px; height: 120px; background: #f8f9fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                    <i class="fa-solid fa-file-invoice text-secondary opacity-50" style="font-size: 4rem;"></i>
                                </div>
                                <h4 class="text-dark fw-bold mb-2">Chưa có thông tin hóa đơn</h4>
                                <p class="text-muted mb-0">Vui lòng nhập mã hóa đơn ở cột bên trái hoặc dùng máy quét mã vạch để bắt đầu tra cứu.</p>
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
            ma_hoa_don_input: '',
            invoice_info: null,
            isLoading: false,
        }
    },
    methods: {
        scanInvoice() {
            if (!this.ma_hoa_don_input.trim()) {
                this.$toast.warning("Vui lòng nhập mã hóa đơn!");
                this.$refs.scannerInput.focus();
                return;
            }

            this.isLoading = true;
            axios.post(apiUrl("admin/hoa-don/quet-ma"), { ma_hoa_don: this.ma_hoa_don_input }, {
                    headers: { 
                        Authorization: "Bearer " + localStorage.getItem("key_admin") 
                    }
                })
                .then((res) => {
                    if(res.data.status) {
                        this.$toast.success(res.data.message);
                        this.invoice_info = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                        this.invoice_info = null;
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        const list = Object.values(err.response.data.errors);
                        list.forEach((v) => { this.$toast.error(v[0]); });
                    } else if (err.response && err.response.data && err.response.data.message) {
                        this.$toast.error(err.response.data.message);
                    } else {
                        this.$toast.error("Có lỗi máy chủ xảy ra!");
                    }
                    this.invoice_info = null;
                })
                .finally(() => {
                    this.isLoading = false;
                    setTimeout(() => {
                        this.ma_hoa_don_input = '';
                        this.$refs.scannerInput.focus();
                    }, 200);
                });
        },
        
        resetScan() {
            this.invoice_info = null;
            this.ma_hoa_don_input = '';
            this.$refs.scannerInput.focus();
        },

        formatVND(number) {
            if (!number) return "0 ₫";
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(number);
        },

        formatDate(dateStr) {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes} - ${day}/${month}/${year}`;
        }
    },
    mounted() {
        // Tự động focus vào ô nhập mã khi vừa vào trang (rất tiện cho máy quét mã vạch)
        this.$refs.scannerInput.focus();
    },
}
</script>

<style scoped>
.form-control:focus {
    box-shadow: none;
}
.input-group:focus-within {
    box-shadow: 0 0 0 0.25rem rgba(78, 84, 200, 0.25) !important;
    border-color: #4e54c8;
}
</style>