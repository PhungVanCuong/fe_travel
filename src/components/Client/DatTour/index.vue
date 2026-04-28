<template>
    <div class="thanh-toan-container">
        <h3>Xác nhận thanh toán</h3>
        <p>Mã hóa đơn của bạn: <strong>#{{ idHoaDon }}</strong></p>

        <button @click="thanhToanVNPay" class="btn-vnpay" :disabled="isLoading">
            {{ isLoading ? 'Đang xử lý...' : 'Thanh toán bằng VNPay' }}
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    data() {
        return {
            // Giả sử ID hóa đơn vừa được tạo trả về là 15
            // Trong thực tế, bạn sẽ lấy ID này từ props hoặc từ kết quả API tạo Hóa Đơn trước đó
            idHoaDon: null,
            isLoading: false // Biến để chặn người dùng click nhiều lần
        }
    },
    mounted() {
        // Lấy id từ query trên thanh địa chỉ: ?id=xxx
        const idTuUrl = this.$route.query.id;

        if (idTuUrl) {
            this.idHoaDon = idTuUrl;
            console.log("Đã nhận ID hóa đơn:", this.idHoaDon);
        } else {
            alert("Không tìm thấy ID hóa đơn!");
            // this.$router.push('/'); // Có thể quay về trang chủ nếu không có ID
        }
    },
    methods: {
        thanhToanVNPay() {
            this.isLoading = true;
            axios.post(apiUrl('/client/vnpay/tao-thanh-toan'), {
                id_hoa_don: this.idHoaDon // Bây giờ idHoaDon đã có giá trị từ mounted
            })
                .then(response => {
                    if (response.data.status) {
                        // Thành công: Chuyển hướng người dùng sang trang của VNPay
                        window.location.href = response.data.data;
                    } else {
                        // Thất bại: Hiển thị lỗi từ backend
                        alert(response.data.message || 'Có lỗi xảy ra khi tạo link thanh toán.');
                        this.isLoading = false;
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi gọi API VNPay:", error);
                    alert('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
.thanh-toan-container {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    background-color: #f9f9f9;
}

.btn-vnpay {
    background-color: #005baa;
    /* Màu xanh nhận diện thương hiệu của VNPay */
    color: #ffffff;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 15px;
    width: 100%;
}

.btn-vnpay:hover {
    background-color: #004282;
}

.btn-vnpay:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
}
</style>