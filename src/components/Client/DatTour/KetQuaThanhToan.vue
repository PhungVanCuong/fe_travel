<template>
    <div class="result-wrapper">
        <div class="result-container">
            <div v-if="isLoading" class="loading-box">
                <div class="loader"></div>
                <h2>Đang xử lý kết quả giao dịch...</h2>
                <p>Vui lòng không tắt trình duyệt lúc này.</p>
            </div>
            
            <div v-else-if="isSuccess" class="success-box">
                <div class="icon-circle success-icon">✓</div>
                <h2 style="color: #28a745;">Thanh toán thành công!</h2>
                <p>Cảm ơn bạn đã sử dụng dịch vụ. Hóa đơn và vé của bạn đã được cập nhật.</p>
                <div class="action-buttons">
                    <button @click="goHome" class="btn-primary">Quay về trang chủ</button>
                    <button @click="goProfile" class="btn-outline">Xem vé của tôi</button>
                </div>
            </div>

            <div v-else class="error-box">
                <div class="icon-circle error-icon">✗</div>
                <h2 style="color: #dc3545;">Thanh toán thất bại</h2>
                <p>{{ errorMessage }}</p>
                <p>Vui lòng thử lại hoặc chọn phương thức thanh toán khác.</p>
                <div class="action-buttons">
                    <button @click="goHome" class="btn-outline">Quay về trang chủ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api'; 

export default {
    name: 'KetQuaThanhToan',
    data() {
        return {
            isLoading: true,
            isSuccess: false,
            errorMessage: ''
        }
    },
    mounted() {
        // Lấy toàn bộ query string trên URL do VNPay trả về
        const queryParams = this.$route.query;

        // Nếu không có tham số nào từ VNPay, báo lỗi luôn
        if (Object.keys(queryParams).length === 0) {
            this.isLoading = false;
            this.isSuccess = false;
            this.errorMessage = 'Không tìm thấy dữ liệu giao dịch.';
            return;
        }

        // Gửi xuống API Laravel để kiểm tra chữ ký bảo mật
        // Lưu ý: Đã sửa đúng thành /client/vnpay/check-return
        axios.get(apiUrl('/client/vnpay/check-return'), { params: queryParams })
            .then(response => {
                this.isLoading = false;
                if (response.data.status) {
                    this.isSuccess = true;
                } else {
                    this.isSuccess = false;
                    this.errorMessage = response.data.message;
                }
            })
            .catch(error => {
                console.error("Lỗi xác thực VNPay:", error);
                this.isLoading = false;
                this.isSuccess = false;
                this.errorMessage = 'Lỗi hệ thống khi xác thực giao dịch với máy chủ.';
            });
    },
    methods: {
        goHome() {
            this.$router.push('/'); // Đổi URL theo router trang chủ của bạn
        },
        goProfile() {
            this.$router.push('/thong-tin-ca-nhan'); // Đổi URL theo router quản lý vé của bạn
        }
    }
}
</script>

<style scoped>
.result-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    background-color: #f4f7f6;
    padding: 20px;
}

.result-container { 
    background: white;
    text-align: center; 
    padding: 40px; 
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    max-width: 500px;
    width: 100%;
}

.icon-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: white;
    margin: 0 auto 20px;
}

.success-icon { background-color: #28a745; }
.error-icon { background-color: #dc3545; }

h2 { margin-bottom: 15px; font-size: 24px; }
p { color: #6c757d; margin-bottom: 30px; line-height: 1.6; }

.action-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
}

button { 
    padding: 12px 24px; 
    border-radius: 6px; 
    font-size: 15px; 
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.btn-primary {
    background-color: #005baa;
    color: white;
    border: none;
}
.btn-primary:hover { background-color: #004282; }

.btn-outline {
    background-color: transparent;
    color: #005baa;
    border: 1px solid #005baa;
}
.btn-outline:hover {
    background-color: #e6f0fa;
}

/* Spinner CSS */
.loader {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #005baa;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>