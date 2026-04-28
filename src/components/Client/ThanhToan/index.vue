<template>
    <div v-if="hoa_don">
        <div class="container my-4">
            <div class="row">
                <div class="col-lg-7">
                    <div class="card shadow-sm border-0 mb-4" style="border-radius: 15px;">
                        <div class="card-header bg-white py-3">
                            <h3 class="fw-bold mb-0">Thông tin liên lạc</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <p><strong>Họ tên:</strong> {{ khach_hang.ho_va_ten }}</p>
                                </div>
                                <div class="col-lg-4">
                                    <p><strong>Email:</strong> {{ khach_hang.email }}</p>
                                </div>
                                <div class="col-lg-4">
                                    <p><strong>Số điện thoại:</strong> {{ khach_hang.so_dien_thoai }}</p>
                                </div>
                                <div class="col-lg-6">
                                    <p><strong>CCCD:</strong> {{ khach_hang.cccd }} </p>
                                </div>
                                <div class="col-lg-6">
                                    <p><strong>Ngày sinh:</strong> {{ khach_hang.ngay_sinh }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card shadow-sm border-0" style="border-radius: 15px;">
                        <div class="card-body">
                            <h3 class="fw-bold mb-3">Chi tiết hoá đơn</h3>
                            <p><strong>Mã hóa đơn:</strong> <span class="text-primary fw-bold">{{ hoa_don.ma_hoa_don
                                    }}</span></p>
                            <p><strong>Ngày đặt:</strong> {{ hoa_don.ngay_dat }}</p>
                            <p><strong>Số lượng người đi:</strong> {{ hoa_don.so_luong_nguoi }}</p>
                            <p><strong>Tổng tiền:</strong> <span class="text-danger fw-bold">{{
                                formatVND(hoa_don.tong_tien) }}</span></p>
                            <p>
                                <strong>Trạng thái:</strong>
                                <span v-if="hoa_don.trang_thai == 0" class="badge bg-danger">
                                    <i class="fa-solid fa-circle-xmark me-1"></i> Đã hủy
                                </span>

                                <span v-else-if="hoa_don.trang_thai == 1" class="badge bg-warning text-dark">
                                    <i class="fa-solid fa-clock me-1"></i> Chờ thanh toán
                                </span>

                                <span v-else-if="hoa_don.trang_thai == 2" class="badge bg-success">
                                    <i class="fa-solid fa-circle-check me-1"></i> Đã thanh toán
                                </span>

                                <span v-else class="badge bg-secondary">
                                    Không xác định
                                </span>
                            </p>
                            <p><strong>Ghi chú:</strong> {{ hoa_don.ghi_chu }}</p>
                        </div>
                    </div>
                    <div class="card shadow-sm border-0" style="border-radius: 15px; overflow: hidden;">
                        <div class="card-header bg-white py-3">
                            <h3 class="fw-bold mb-0"><i class="fa-solid fa-ticket me-2 text-primary"></i>Danh sách vé
                            </h3>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead class="bg-light">
                                        <tr class="text-secondary">
                                            <th class="ps-4 py-3">Mã vé</th>
                                            <th class="py-3">Giá vé</th>
                                            <th class="py-3 text-center">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in ds_ve" :key="index">
                                            <td class="ps-4 py-3 fw-bold text-primary">{{ item.ma_ve }}</td>
                                            <td class="py-3">{{ formatVND(item.gia_ve) }}</td>
                                            <td class="py-3 text-center">
                                                <span v-if="item.tinh_trang == '1'" class="badge bg-info">
                                                    Đã đặt (Chờ thanh toán)
                                                </span>
                                                <span v-else-if="item.tinh_trang == '2'" class="badge bg-success">
                                                    Đã thanh toán
                                                </span>
                                                <span v-else class="badge bg-secondary">
                                                    Hủy vé
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="card shadow-sm border-0" style="border-radius: 15px; overflow: hidden;">
                        <div class="card-header bg-white py-3 border-bottom-0">
                            <h3 class="fw-bold mb-0 text-primary text-uppercase" style="letter-spacing: 1px;">Phiếu xác
                                nhận Booking</h3>
                        </div>
                        <div class="card-body">
                            <div class="d-flex mb-4">
                                <img :src="tour.hinh_anh" alt="Tour Image"
                                    style="width: 150px; height: 100px; object-fit: cover; border-radius: 10px;"
                                    class="me-3 shadow-sm">
                                <div class="flex-grow-1">
                                    <h5 class="fw-bold text-dark mb-0" style="line-height: 1.4;">{{ tour.ten_tour }}
                                    </h5>
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-ticket me-2 text-secondary"></i>
                                    <span class="me-2">Số booking:</span>
                                    <span class="fw-bold text-danger fs-5">{{ hoa_don.ma_hoa_don }}</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="fa-solid fa-users me-2 text-secondary"></i>
                                    <span class="me-2">Số lượng người đi:</span>
                                    <span class="fw-bold text-dark">{{ hoa_don.so_luong_nguoi }}</span>
                                </div>
                            </div>

                            <hr class="text-secondary opacity-25">
                            <div class="mt-4">
                                <h6 class="fw-bold mb-3"><i class="fa-solid fa-bus me-2"></i>THÔNG TIN CHUYẾN XE</h6>
                                <div class="row g-0">
                                    <div class="col-6 border-end pe-3">
                                        <div class="small text-secondary mb-1">Ngày đi - {{ tour.ngay_bat_dau }}</div>
                                        <div class="d-flex justify-content-between small text-dark">
                                            <span>{{ tour.diem_don }}</span>
                                        </div>
                                    </div>

                                    <div class="col-6 ps-3">
                                        <div class="small text-secondary mb-1">Ngày về - {{ tour.ngay_ket_thuc }}</div>
                                        <div class="d-flex justify-content-between small text-dark">
                                            <span>{{ tour.diem_tra }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-danger w-100 py-3 fw-bold mt-3" @click="is_show_modal = true">
                        THANH TOÁN NGAY
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center mt-5">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="mt-2">Đang tải thông tin hóa đơn...</p>
    </div>
    <div v-if="is_show_modal" class="modal-payment-drawer" @click.self="is_show_modal = false">
        <div class="drawer-content animate__animated animate__slideInRight">
            <div class="drawer-header">
                <h5 class="fw-bold mb-0">PHƯƠNG THỨC THANH TOÁN</h5>
                <button type="button" class="btn-close" @click="is_show_modal = false"></button>
            </div>

            <div class="drawer-body">
                <p class="text-muted small mb-4">Vui lòng chọn phương thức thanh toán phù hợp cho đơn hàng của bạn.</p>
                <div class="payment-item" :class="{ 'active': method === 1 }" @click="method = 1">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="icon-box me-3"><i class="fa-solid fa-wallet"></i></div>
                            <span class="fw-bold">Ví điện tử (MoMo / VNPAY / ZaloPay)</span>
                        </div>
                        <i v-if="method === 1" class="fa-solid fa-circle-check text-primary"></i>
                    </div>
                    <div v-if="method === 1" class="method-details mt-3 pt-3 border-top">
                        <div class="d-flex gap-3">

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1">
                                <label class="form-check-label" for="radioDefault1">
                                    <img src="https://imgs.search.brave.com/F2acMnb6pT5tjysAZx9fZvle-NAaltyGlqtmeUuUfgY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZHJ1cGFsLm9yZy9m/aWxlcy9zdHlsZXMv/Z3JpZC0zLTJ4L3B1/YmxpYy9wcm9qZWN0/LWltYWdlcy92bnBh/eS5wbmc_aXRvaz1B/OWRsN1JPSw "
                                        width="35">
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault2"
                                    checked>
                                <label class="form-check-label" for="radioDefault2">
                                    <img src="https://imgs.search.brave.com/LXSuPTwgJ2iLkneZnI2auDSCujZedr-yGSmNfYefB4U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aGFpdHJpZXUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzEwL0xvZ28tTW9N/by1DaXJjbGUucG5n"
                                        width="35">
                                </label>
                            </div>

                        </div>
                        <p class="small text-muted mt-2 mb-0">* Bạn sẽ được điều hướng sang cổng thanh toán tương ứng.
                        </p>
                    </div>
                </div>

                <div class="payment-item mt-3" :class="{ 'active': method === 2 }" @click="method = 2">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="icon-box me-3"><i class="fa-solid fa-building-columns"></i></div>
                            <span class="fw-bold">Chuyển khoản Ngân hàng (QR)</span>
                        </div>
                        <i v-if="method === 2" class="fa-solid fa-circle-check text-primary"></i>
                    </div>
                    <div v-if="method === 2" class="method-details mt-3 pt-3 border-top text-center">
                        <p class="small text-muted">Quét mã QR để thực hiện chuyển khoản nhanh 24/7.</p>
                        <img :src="thanh_toan.link_qr_code" alt="Tour Image"
                            style="width: 250px; height: 300px; object-fit: cover; border-radius: 10px;"
                            class="me-3 shadow-sm">
                    </div>
                </div>
            </div>

            <div class="drawer-footer">
                <div class="d-flex justify-content-between mb-3">
                    <span>Tổng cộng:</span>
                    <span class="fw-bold text-danger fs-5">{{ formatVND(hoa_don.tong_tien) }}</span>
                </div>
                <button class="btn btn-primary w-100 py-3 fw-bold shadow-sm" @click="xacNhanThanhToan">
                    XÁC NHẬN THANH TOÁN
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    name: 'ThanhToan',
    props: ['ma_hoa_don'],
    data() {
        return {
            hoa_don: null,
            khach_hang: {},
            tour: {},
            ds_ve: [],
            thanh_toan: {},
            is_show_modal: false,
            method: null,
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            // LƯU Ý: Kiểm tra lại chính xác đường dẫn này trong file routes/api.php của Laravel
            axios
                .get(apiUrl("client/hoa-don/chi-tiet-thanh-toan/" + this.ma_hoa_don), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_client')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        const data = res.data.data;
                        this.hoa_don = data.hoa_don;
                        this.khach_hang = data.khach_hang;
                        this.tour = data.tour;
                        this.ds_ve = data.ve;
                        this.thanh_toan = data.thanh_toan;
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
                .catch((err) => {
                    // Log lỗi ra console để bạn dễ dàng debug xem API trả về lỗi gì (404, 500 hay 401)
                    console.error("Lỗi API:", err);
                    this.$toast.error("Không thể lấy thông tin hóa đơn.");
                });
        },
        formatVND(value) {
            if (!value) return "0 ₫";
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        xacNhanThanhToan() {
            // Giả sử method = 1 là phương thức Ví điện tử/VNPAY (tương ứng radioDefault1 của bạn)
            if (this.method === 1) {
                this.is_show_modal = false; // Đóng modal trước khi chuyển trang

                // Điều hướng sang link VNPAY kèm theo mã hóa đơn để Backend xử lý
                this.$router.push({
                    path: '/Dat-tour',
                    query: { id: this.hoa_don.id_hoa_don } // Truyền id_hoa_don qua query string
                });

                this.$toast.success("Đang kết nối đến cổng thanh toán VNPAY...");
            }
            else if (this.method === 2) {
                // Xử lý cho phương thức Chuyển khoản ngân hàng (nếu có)
                this.is_show_modal = false;
                this.$toast.info("Vui lòng thực hiện chuyển khoản theo hướng dẫn.");
            }
            else {
                this.$toast.warning("Vui lòng chọn một phương thức thanh toán!");
            }
        }
    }
}

</script>
<style scoped>
/* Lớp phủ mờ toàn màn hình */
.modal-payment-drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    display: flex;
    justify-content: flex-end;
    /* Đẩy nội dung sang bên phải */
}

/* Nội dung Modal dài hết chiều cao */
.drawer-content {
    background: white;
    width: 450px;
    /* Độ rộng của bảng chọn */
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.drawer-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.drawer-body {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
}

.drawer-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    background: #fcfcfc;
}

/* Định dạng từng mục phương thức */
.payment-item {
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.payment-item.active {
    border-color: #005294;
    background-color: #f0f7ff;
    box-shadow: 0 4px 10px rgba(0, 82, 148, 0.1);
}

.icon-box {
    width: 40px;
    height: 40px;
    background: #f0f2f5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.payment-item.active .icon-box {
    background: #005294;
    color: white;
}
</style>