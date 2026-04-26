<template>
    <div class="result-container">
        <h2 v-if="isLoading">Đang xử lý kết quả giao dịch...</h2>
        
        <div v-else-if="isSuccess" class="success-box">
            <h2 style="color: green;">Thanh toán thành công!</h2>
            <p>Cảm ơn bạn đã đặt tour. Chúng tôi sẽ liên hệ sớm nhất.</p>
            <button @click="goHome">Quay về trang chủ</button>
        </div>

        <div v-else class="error-box">
            <h2 style="color: red;">Thanh toán thất bại</h2>
            <p>{{ errorMessage }}</p>
            <button @click="goHome">Quay về trang chủ</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    data() {
        return {
            isLoading: true,
            isSuccess: false,
            errorMessage: ''
        }
    },
    mounted() {
        // Lấy toàn bộ query string trên URL (VD: ?vnp_Amount=...&vnp_SecureHash=...)
        const queryParams = this.$route.query;

        // Gửi xuống API Laravel để kiểm tra chữ ký bảo mật
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
                this.isLoading = false;
                this.isSuccess = false;
                this.errorMessage = 'Lỗi hệ thống khi xác thực giao dịch.';
            });
    },
    methods: {
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.result-container { text-align: center; padding: 50px; }
button { padding: 10px 20px; background-color: #005baa; color: white; border: none; cursor: pointer;}
</style>