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
                                    class="badge rounded-pill bg-success-subtle text-success px-3 ms-2">Đã thanh toán</span>
                                <span v-else-if="item.trang_thai == 1"
                                    class="badge rounded-pill bg-warning-subtle text-warning px-3 ms-2">Chưa thanh toán</span>
                                <span v-else class="badge rounded-pill bg-secondary-subtle text-secondary px-3 ms-2">Đã hủy</span>
                            </div>

                            <div class="tour-info mt-3">
                                <div class="mb-2 text-muted">
                                    <i class="fa-solid fa-calendar-check me-2"></i>
                                    Đặt ngày: <span class="fw-medium text-dark">{{ item.ngay_dat }}</span>
                                </div>
                                <div class="text-muted">
                                    <i class="fa-solid fa-plane-departure me-2"></i>
                                    Khởi hành: <span class="fw-medium text-dark">{{ item.tour.ngay_bat_dau }} - {{ item.tour.ngay_ket_thuc }}</span>
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
    
    <!-- MODAL CHI TIẾT HÓA ĐƠN -->
    <div v-if="is_show_detail" class="modal-overlay" @click.self="is_show_detail = false">
        <div class="modal-detail-content animate__animated animate__zoomIn">
            <div class="modal-header d-flex justify-content-between align-items-center border-bottom-0">
                <div>
                    <h4 class="fw-bold mb-0">Chi tiết đơn hàng #<span class="text-danger">{{ chi_tiet.ma_hoa_don }}</span></h4>
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
                        <div class="p-2 border rounded mb-4 bg-light d-flex justify-content-between">
                            {{ chi_tiet.so_luong_nguoi }} người
                        </div>

                        <h6 class="fw-bold mb-3"><i class="fa-solid fa-ticket me-2"></i>Danh sách vé</h6>
                        <div v-if="chi_tiet.ve && chi_tiet.ve.length > 0">
                            <div v-for="(ve, k) in chi_tiet.ve" :key="k"
                                class="p-2 border rounded mb-2 bg-white d-flex justify-content-between align-items-center shadow-sm">
                                <div class="d-flex align-items-center">
                                    <span class="badge bg-primary me-2">{{ k + 1 }}</span>
                                </div>
                                <span class="small text-muted font-monospace">{{ ve.ma_ve }}</span>
                            </div>
                        </div>
                        <div v-else class="text-center p-3 border border-dashed rounded text-muted small">
                            Đang cập nhật thông tin vé...
                        </div>
                    </div>

                    <div class="col-6">
                        <h6 class="fw-bold mb-3"><i class="fa-solid fa-credit-card me-2"></i>Thông tin thanh toán</h6>
                        <div class="p-3 border rounded mb-4">
                            <div class="d-flex justify-content-between mb-2 small">
                                <span>Phương thức</span>
                                <span class="fw-bold">
                                    <i class="fa-solid fa-wallet me-1"></i>
                                    {{ chi_tiet.phuong_thuc_thanh_toan || 'Chuyển khoản' }}
                                </span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="small">Trạng thái</span>
                                <span v-if="chi_tiet.trang_thai == 2" class="badge bg-success-subtle text-success px-3">Đã thanh toán</span>
                                <span v-else-if="chi_tiet.trang_thai == 1" class="badge bg-warning-subtle text-warning px-3">Chưa thanh toán</span>
                                <span v-else class="badge bg-danger-subtle text-danger px-3">Đã hủy</span>
                            </div>
                        </div>

                        <h6 class="fw-bold mb-3"><i class="fa-solid fa-note-sticky me-2"></i>Ghi chú đơn hàng</h6>
                        <div class="p-3 border rounded bg-light">
                            <div v-if="chi_tiet.ghi_chu" class="small text-dark text-break" style="white-space: pre-line;">
                                {{ chi_tiet.ghi_chu }}
                            </div>
                            <div v-else class="small text-muted italic">
                                Không có ghi chú nào cho đơn hàng này.
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
            
            <div class="modal-footer border-top p-4 d-flex justify-content-between align-items-center">
                <button class="btn btn-light px-4 fw-bold shadow-sm" @click="is_show_detail = false">
                    <i class="fa-solid fa-xmark me-2"></i>Đóng
                </button>

                <div class="d-flex gap-2">
                    <button v-if="chi_tiet.trang_thai == 2" class="btn btn-rating px-4 fw-bold text-white shadow-sm"
                        @click="danhGiaTour(chi_tiet)">
                        <i class="fa-solid fa-star me-2"></i>Đánh giá tour
                    </button>

                    <button v-if="chi_tiet.trang_thai == 2" class="btn btn-outline-info px-4 fw-bold shadow-sm">
                        <i class="fa-solid fa-file-invoice-dollar me-2"></i>Tải hóa đơn
                    </button>

                    <button v-if="chi_tiet.trang_thai == 1" class="btn btn-payment px-4 fw-bold text-white shadow-sm"
                        @click="moModalThanhToan(chi_tiet)">
                        <i class="fa-solid fa-credit-card me-2"></i> Thanh toán ngay
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL ĐÁNH GIÁ -->
    <div v-if="is_show_danh_gia" class="modal-overlay" @click.self="is_show_danh_gia = false">
        <div class="modal-detail-content animate__animated animate__fadeInUp" style="width: 500px;">
            <div class="modal-header border-bottom-0">
                <h4 class="fw-bold mb-0">Đánh giá dịch vụ</h4>
                <button type="button" class="btn-close" @click="is_show_danh_gia = false"></button>
            </div>
            <div class="modal-body text-center">
                <h5 class="mb-3">{{ chi_tiet.tour.ten_tour }}</h5>
                <div class="star-rating mb-4">
                    <i v-for="star in 5" :key="star" class="fa-star fs-2 cursor-pointer px-1"
                        :class="star <= data_danh_gia.sao_danh_gia ? 'fa-solid text-warning' : 'fa-regular text-secondary'"
                        @click="data_danh_gia.sao_danh_gia = star">
                    </i>
                </div>
                <div class="text-start">
                    <label class="fw-bold mb-2">Chia sẻ trải nghiệm của bạn:</label>
                    <textarea class="form-control" rows="4" v-model="data_danh_gia.noi_dung"
                        placeholder="Tour này có gì tuyệt vời? Hãy chia sẻ cho mọi người cùng biết nhé..."></textarea>
                </div>
            </div>
            <div class="modal-footer border-top-0 p-4">
                <button class="btn btn-secondary px-4" @click="is_show_danh_gia = false">Hủy bỏ</button>
                <button class="btn btn-warning px-4 fw-bold text-white" @click="guiDanhGia()" :disabled="data_danh_gia.sao_danh_gia === 0">
                    Gửi đánh giá ngay
                </button>
            </div>
        </div>
    </div>

    <!-- BẢNG CHỌN PHƯƠNG THỨC THANH TOÁN (DRAWER MỚI) -->
    <div v-if="is_show_payment_modal" class="modal-payment-drawer" @click.self="is_show_payment_modal = false">
        <div class="drawer-content animate__animated animate__slideInRight">
            <div class="drawer-header bg-white">
                <h5 class="fw-bold mb-0 text-dark">PHƯƠNG THỨC THANH TOÁN</h5>
                <button type="button" class="btn-close" @click="is_show_payment_modal = false"></button>
            </div>

            <div class="drawer-body">
                <p class="text-muted small mb-4">Vui lòng chọn phương thức thanh toán phù hợp cho đơn hàng của bạn.</p>
                
                <!-- Phương thức 1: Ví điện tử -->
                <div class="payment-item" :class="{ 'active': method === 1 }" @click="method = 1">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="icon-box me-3"><i class="fa-solid fa-wallet"></i></div>
                            <span class="fw-bold">Ví điện tử (VNPAY / MoMo)</span>
                        </div>
                        <i v-if="method === 1" class="fa-solid fa-circle-check text-primary fs-5"></i>
                    </div>
                    
                    <div v-if="method === 1" class="method-details mt-3 pt-3 border-top">
                        <div class="d-flex gap-4 ms-4">
                            <div class="form-check d-flex align-items-center p-0 m-0">
                                <input class="form-check-input mt-0 me-2" type="radio" name="walletRadio" id="radioVnpay2" value="vnpay" v-model="selectedWallet" style="cursor: pointer;">
                                <label class="form-check-label bg-white border p-2 rounded-3 shadow-sm" for="radioVnpay2" style="cursor: pointer;" :class="{'border-primary': selectedWallet === 'vnpay'}">
                                    <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" height="30" alt="VNPAY">
                                </label>
                            </div>
                            <div class="form-check d-flex align-items-center p-0 m-0 ms-3">
                                <input class="form-check-input mt-0 me-2" type="radio" name="walletRadio" id="radioMomo2" value="momo" v-model="selectedWallet" style="cursor: pointer;">
                                <label class="form-check-label bg-white border p-2 rounded-3 shadow-sm" for="radioMomo2" style="cursor: pointer;" :class="{'border-primary': selectedWallet === 'momo'}">
                                    <img src="https://homepage.momocdn.net/img/logo-momo.png" height="30" alt="MoMo">
                                </label>
                            </div>
                        </div>
                        <div class="alert alert-info mt-3 mb-0 py-2 small">
                            <i class="fa-solid fa-circle-info me-1"></i> Bạn sẽ được chuyển hướng sang cổng thanh toán an toàn.
                        </div>
                    </div>
                </div>

                <!-- Phương thức 2: Chuyển khoản QR -->
                <div class="payment-item mt-3" :class="{ 'active': method === 2 }" @click="method = 2">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="icon-box me-3"><i class="fa-solid fa-qrcode"></i></div>
                            <span class="fw-bold">Chuyển khoản Ngân hàng</span>
                        </div>
                        <i v-if="method === 2" class="fa-solid fa-circle-check text-primary fs-5"></i>
                    </div>
                    <div v-if="method === 2" class="method-details mt-3 pt-3 border-top text-center">
                        <p class="small text-muted mb-3">Mở ứng dụng ngân hàng và quét mã QR bên dưới để thanh toán.</p>
                        <img v-if="payment_hoa_don && payment_hoa_don.thanh_toan && payment_hoa_don.thanh_toan.link_qr_code" 
                             :src="payment_hoa_don.thanh_toan.link_qr_code" alt="QR Code"
                            style="width: 220px; height: 220px; object-fit: contain; border-radius: 10px;"
                            class="shadow-sm border p-2 bg-white">
                        <p class="text-danger small mt-2" v-else>Đang tạo mã QR, vui lòng đợi...</p>
                    </div>
                </div>
            </div>

            <div class="drawer-footer">
                <div class="d-flex justify-content-between mb-3 align-items-end">
                    <span class="text-secondary fw-semibold">Tổng thanh toán:</span>
                    <span class="fw-bold text-danger fs-3">{{ formatVND(payment_hoa_don?.tong_tien) }}</span>
                </div>
                
                <button class="btn btn-primary w-100 py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center fs-6" 
                        @click="xacNhanThanhToanLai" 
                        :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN THANH TOÁN' }}
                </button>
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
            chi_tiet: { tour: {}, ve: [] },
            ds_hoa_don: [],
            isLoading: true,
            
            is_show_danh_gia: false,
            data_danh_gia: {
                id_tour: null,
                sao_danh_gia: 0,
                noi_dung: ''
            },
            
            is_show_payment_modal: false,
            method: 1, 
            selectedWallet: 'vnpay',
            payment_hoa_don: null 
        }
    },
    mounted() {
        this.getLichSu();
    },
    methods: {
        danhGiaTour(item) {
            this.is_show_detail = false; 
            this.is_show_danh_gia = true; 
            this.data_danh_gia.id_tour = item.tour.id_tour; 
            this.data_danh_gia.sao_danh_gia = 0;
            this.data_danh_gia.noi_dung = '';
        },
        guiDanhGia() {
            axios.post(apiUrl('/client/danh-gia/gui-danh-gia'), this.data_danh_gia, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_client') }
            })
            .then((res) => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.is_show_danh_gia = false;
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch((err) => {
                this.$toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
            });
        },
        
        moModalThanhToan(item) {
            this.is_show_detail = false; 
            this.payment_hoa_don = item; 
            this.method = 1;             
            this.selectedWallet = 'vnpay';
            this.is_show_payment_modal = true; 
        },

        xacNhanThanhToanLai() {
            const item = this.payment_hoa_don;
            this.isLoading = true;

            if (this.method === 1) { 
                if(this.selectedWallet === 'momo') {
                    this.$toast.info("Tính năng thanh toán MoMo đang được bảo trì. Vui lòng chọn VNPay!");
                    this.isLoading = false;
                    return;
                }

                const idGuiDi = item.id || item.id_hoa_don || item.ma_hoa_don;
                axios.post(apiUrl('/client/vnpay/tao-thanh-toan'), {
                    id_hoa_don: idGuiDi
                }, {
                    headers: { Authorization: "Bearer " + localStorage.getItem('key_client') }
                })
                .then(response => {
                    if (response.data.status) {
                        this.$toast.success("Đang kết nối cổng thanh toán VNPAY...");
                        window.location.href = response.data.data;
                    } else {
                        this.$toast.error(response.data.message || 'Không thể tạo liên kết thanh toán.');
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    this.$toast.error('Không thể kết nối cổng thanh toán. Vui lòng thử lại sau!');
                    this.isLoading = false;
                });
            } else if (this.method === 2) { 
                setTimeout(() => {
                    this.isLoading = false;
                    this.is_show_payment_modal = false;
                    this.$router.push({
                        path: '/Ket-qua-thanh-toan',
                        query: {
                            method: 'bank_transfer',
                            amount: item.tong_tien,
                            txnRef: 'HDTOUR' + item.id 
                        }
                    });
                }, 800); 
            }
        },
        xemChiTiet(item) {
            this.chi_tiet = item;
            this.is_show_detail = true;
        },
        getLichSu() {
            axios.get(apiUrl('/client/hoa-don/danh-sach'), {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_client') }
            })
            .then((res) => {
                if (res.data.status) {
                    this.ds_hoa_don = res.data.data;
                }
            })
            .catch((err) => {})
            .finally(() => { this.isLoading = false; });
        },
        formatVND(value) {
            if (!value) return "0 ₫";
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        }
    }
}
</script>

<style scoped>
.btn-light { background-color: #f8f9fa; border: 1px solid #dee2e6; color: #6c757d; }
.btn-light:hover { background-color: #e2e6ea; color: #343a40; }
.btn-rating { background: linear-gradient(45deg, #ff9800, #ffc107); border: none; transition: all 0.3s ease; }
.btn-rating:hover { background: linear-gradient(45deg, #f57c00, #ff9800); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3) !important; }
.btn-payment { background: linear-gradient(45deg, #d32f2f, #f44336); border: none; transition: all 0.3s ease; }
.btn-payment:hover { background: linear-gradient(45deg, #b71c1c, #d32f2f); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3) !important; }
.btn-outline-info { border: 2px solid #0dcaf0; color: #0dcaf0; background-color: transparent; }
.btn-outline-info:hover { background-color: #0dcaf0; color: white; }
.modal-footer button { border-radius: 12px; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; }
.tour-card { transition: transform 0.2s, box-shadow 0.2s; border-radius: 16px !important; overflow: hidden; }
.tour-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important; }
.tour-img { object-fit: cover; min-height: 200px; width: 100%; }
.badge { font-size: 0.85rem; font-weight: 600; letter-spacing: 1px;}
.btn-primary { background-color: #005baa; border: none; transition: all 0.3s ease; }
.btn-primary:hover { background-color: #004a8d; transform: scale(1.02); }
.cursor-pointer { cursor: pointer; }
.star-rating i { transition: transform 0.2s ease-in-out; }
.star-rating i:hover { transform: scale(1.2); }
.border-dashed { border: 2px dashed #dee2e6 !important; }
.text-primary { color: #005baa !important; }

.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
    align-items: center; z-index: 1050;
}
.modal-detail-content {
    background: white; width: 650px; border-radius: 20px;
    max-height: 90vh; overflow-y: auto; padding: 10px; animation-duration: 0.4s;
}
.tour-summary-box { background-color: #f8fbff; border-color: #e1f0ff !important; }
.bg-success-subtle { background-color: #d1e7dd !important; }
.bg-warning-subtle { background-color: #fff3cd !important; }
.bg-danger-subtle { background-color: #f8d7da !important; }

/* DRAWER STYLE */
.modal-payment-drawer {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.5); z-index: 9999; display: flex; justify-content: flex-end;
}
.drawer-content { background: white; width: 450px; height: 100%; display: flex; flex-direction: column; box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2); }
.drawer-header { padding: 20px 25px; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; }
.drawer-body { padding: 25px; flex: 1; overflow-y: auto; background-color: #fdfdfd; }
.drawer-footer { padding: 20px 25px; border-top: 1px solid #f0f0f0; background: #ffffff; box-shadow: 0 -4px 15px rgba(0,0,0,0.03); }
.payment-item { border: 2px solid #eef0f2; border-radius: 12px; padding: 18px; cursor: pointer; background-color: #fff; transition: all 0.2s ease; }
.payment-item:hover { border-color: #d1d5db; }
.payment-item.active { border-color: #005baa; background-color: #f8fbff; box-shadow: 0 4px 15px rgba(0, 91, 186, 0.1); }
.icon-box { width: 45px; height: 45px; background: #f0f2f5; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #6c757d; transition: all 0.2s ease; }
.payment-item.active .icon-box { background: #005baa; color: white; }
.form-check-input { width: 1.3em; height: 1.3em; }
.form-check-input:checked { background-color: #005baa; border-color: #005baa; }
</style>