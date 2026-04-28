<template>
    <div class="result-wrapper">
        <div class="result-container animate__animated animate__fadeIn">
            <div v-if="isLoading" class="loading-box">
                <div class="loader"></div>
                <h2 class="fw-bold mt-3">Đang xác thực giao dịch...</h2>
                <p class="text-muted">Hệ thống đang kiểm tra kết quả từ VNPAY, vui lòng không thoát trang.</p>
            </div>

            <div v-else-if="isSuccess" class="success-box">
                <div class="icon-circle success-icon">✓</div>
                <h2 class="fw-bold text-success">Thanh toán thành công!</h2>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của <b>IxtalTour</b>. Đơn hàng của bạn đã được xác nhận và cập nhật vào
                    hệ thống.</p>

                <div class="transaction-info text-start bg-light p-3 rounded mb-4">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Số tiền:</span>
                        <b class="text-danger">{{ formatVND(orderInfo.amount) }}</b>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Mã giao dịch:</span>
                        <b>{{ orderInfo.transactionId }}</b>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>Ngân hàng:</span>
                        <b>{{ orderInfo.bank }}</b>
                    </div>
                </div>

                <div class="action-buttons">
                    <button @click="goHome" class="btn btn-primary px-4 py-2  fw-bold">Về trang chủ</button>
                    <button @click="goProfile" class="btn btn-outline-primary px-4 py-2 fw-bold">Lịch sử đặt
                        tour</button>
                </div>
            </div>

            <div v-else class="error-box">
                <div class="icon-circle error-icon">✗</div>
                <h2 class="fw-bold text-danger">Giao dịch không thành công</h2>
                <p class="mb-4">{{ errorMessage }}</p>
                <div class="action-buttons">
                    <button @click="goHome" class="btn btn-outline-secondary px-4 py-2 fw-bold">Quay về trang
                        chủ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api'; // Đường dẫn tới file config api của bạn

export default {
    name: 'KetQuaThanhToan',
    data() {
        return {
            isLoading: true,
            isSuccess: false,
            errorMessage: '',
            countdown: 10,
            orderInfo: {
                amount: 0,
                transactionId: '',
                bank: ''
            }
        }
    },
    mounted() {
        this.verifyPayment();
    },
    methods: {
        verifyPayment() {
            // 1. Lấy dữ liệu VNPAY trả về trên URL (?vnp_Amount=...&vnp_ResponseCode=...)
            const queryParams = this.$route.query;

            // 2. Kiểm tra nhanh: Nếu vnp_ResponseCode != 00 là user đã hủy hoặc lỗi thẻ
            if (queryParams.vnp_ResponseCode !== '00') {
                this.isLoading = false;
                this.isSuccess = false;
                this.errorMessage = 'Giao dịch đã bị hủy hoặc gặp lỗi trong quá trình thực hiện tại VNPAY.';
                return;
            }

            // 3. Gửi toàn bộ queryParams về BE để check chữ ký (vnp_SecureHash)
            axios.get(apiUrl("client/vnpay/check-thanh-toan"), {
                params: queryParams,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_client')
                }
            })
                .then(res => {
                    this.isLoading = false;
                    if (res.data.status) {
                        this.isSuccess = true;
                        // Gán thông tin hiển thị
                        this.orderInfo.amount = queryParams.vnp_Amount / 100;
                        this.orderInfo.transactionId = queryParams.vnp_TransactionNo;
                        this.orderInfo.bank = queryParams.vnp_BankCode;

                    } else {
                        this.isSuccess = false;
                        this.errorMessage = res.data.message || 'Xác thực chữ ký thanh toán thất bại.';
                    }
                })
                .catch(err => {
                    this.isLoading = false;
                    this.isSuccess = false;
                    this.errorMessage = 'Không thể kết nối với máy chủ để xác thực giao dịch.';
                    console.error(err);
                });
        },
        goHome() { this.$router.push('/'); },
        goProfile() { this.$router.push('/client/lich-su-dat-tour'); },
        formatVND(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        }
    }
}
</script>

<style scoped>
/* CSS giữ nguyên như của bạn, có thể bổ sung thêm animation trượt */
.action-buttons {
    display: flex;
    /* Thay đổi từ center sang space-between */
    justify-content: space-between; 
    align-items: center;
    width: 100%; /* Đảm bảo khung nút chiếm hết chiều ngang của container */
    margin-top: 20px;
}
.result-wrapper {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
}

.result-container {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    max-width: 550px;
    width: 100%;
}

.icon-circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 30px;
    color: white;
}

.success-icon {
    background: #28a745;
}

.error-icon {
    background: #dc3545;
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>