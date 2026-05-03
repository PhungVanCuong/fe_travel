<template>
    <div class="receipt-wrapper">

        <div class="action-buttons no-print">
            <button @click="veTrangChu" class="btn-action btn-home">
                <i class="fa-solid fa-house"></i> Về Trang Chủ
            </button>
            <button @click="inLai" class="btn-action btn-print">
                <i class="fa-solid fa-print"></i> In Lại
            </button>
        </div>
        <div class="receipt-container">
            <div class="receipt-paper">
                <div class="receipt-header">
                    <div class="logo-section">
                        <div class="logo-circle">
                            <img src="https://dzfullstack.com/assets/images/logo-1.png" alt="Ixtal Tour Logo"
                                class="logo-img">
                        </div>
                        <h1 class="company-name">Ixtal Tour</h1>
                        <p class="company-tagline">Tour</p>
                    </div>
                    <div class="header-divider"></div>
                    <div class="company-info">
                        <p>123 Đường ABC, Quận XYZ</p>
                        <p>TP. Đà Nẵng, Việt Nam</p>
                        <p>Tel: 0236.3888.999</p>
                    </div>
                </div>

                <div class="invoice-title">
                    <h2>HÓA ĐƠN TOUR DU LỊCH</h2>
                    <div class="title-underline"></div>
                </div>

                <div class="tour-section ms-3">
                    <h3 class="section-title">THÔNG TIN TOUR</h3>
                    <div class="tour-name">{{ tt_tour.ten_tour }}</div>
                    <table class="info-table">
                        <tr>
                            <td class="label">Ngày khởi hành:</td>
                            <td class="value">{{ formatDate(tt_tour.thoi_gian_bat_dau) }}</td>
                        </tr>
                        <tr>
                            <td class="label">Ngày kết thúc:</td>
                            <td class="value">{{ formatDate(tt_tour.thoi_gian_ket_thuc) }}</td>
                        </tr>
                        <tr>
                            <td class="label">Điểm khởi hành:</td>
                            <td class="value">{{ tt_tour.ten_phong }}</td>
                        </tr>
                        <tr>
                            <td class="label">Ngôn ngữ hướng dẫn:</td>
                            <td class="value">{{ tt_tour.ngon_ngu }}</td>
                        </tr>
                    </table>
                </div>

                <div class="tickets-section">
                    <h3 class="section-title">CHI TIẾT TOUR</h3>
                    <div v-for="(value, index) in ds_ve" :key="index" class="ticket-item">
                        <div class="ticket-header-row">
                            <span class="seat-number">Khách hàng {{ index + 1 }}</span>
                            <span class="seat-price">{{ formatVND(value.gia_ve) }}</span>
                        </div>
                        <div class="barcode-section">
                            <img :src="`https://barcode.tec-it.com/barcode.ashx?data=` + value.ma_ve + `&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`"
                                alt="Barcode" class="barcode-img">
                            <p class="barcode-code">{{ value.ma_ve }}</p>
                        </div>
                    </div>
                </div>

                <div class="services-section" v-if="ds_dv.length > 0">
                    <h3 class="section-title">DỊCH VỤ</h3>
                    <table class="services-table">
                        <tr v-for="(value, index) in ds_dv" :key="index">
                        
                            <td class="service-price">{{ formatVND(value.gia) }}</td>
                        </tr>
                    </table>
                </div>

                <div class="transaction-section">
                    <div class="trans-row">
                        <span>Thời gian:</span>
                        <span>{{ formatDate(created_at) }}</span>
                    </div>
                    <div class="trans-row">
                        <span>Mã GD:</span>
                        <span>{{ ma_hoa_don }}</span>
                    </div>
                </div>

                <div class="receipt-footer">
                    <div class="footer-divider"></div>
                    <p class="thank-you">Cảm ơn quý khách!</p>
                    <div class="footer-notes">
                        <p>◆ Vui lòng có mặt đúng giờ tại điểm tập trung</p>
                        <p>◆ Mang theo giấy tờ tùy thân và voucher này</p>
                        <p>◆ Liên hệ hotline nếu có thay đổi lịch trình</p>
                        <p>◆ Chúc quý khách có chuyến đi vui vẻ!</p>
                    </div>
                    <p class="website">www.ixtaltour.vn</p>
                </div>

                <div class="perforation"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '../../../utils/api';

export default {
    props: ['ma_hoa_don'],
    data() {
        return {
            ma_hoa_don: this.$route.params.ma_hoa_don,
            tt_tour: {},
            ds_ve: [],
            ds_dv: [],
            so_luong_ve: 0,
            tong_tien: 0,
            created_at: null,
        }
    },
    computed: {
        so_luong_ve() {
            return this.ds_ve.length;
        },
        tong_tien() {
            if (this.ds_ve.length === 0) return 0;
            this.tong_tien = this.ds_ve.reduce((total, ve) => total + ve.gia_ve, 0);
            return this.tong_tien;
        }
    },
    mounted() {
        this.getTour();
    },
    methods: {
        getTour() {
            axios.post(apiUrl("admin/hoa-don/in-ve/in-ve"), { ma_hoa_don: this.ma_hoa_don }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_admin"),
                },
            })
                .then((res) => {
                    if (res.data.status) {
                        this.tt_tour = res.data.data;
                        this.ds_ve = res.data.ds_ve;
                        this.ds_dv = res.data.ds_dv;
                        this.created_at = res.data.data.created_at;
                    }
                })
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", { style: "currency", currency: "VND" }).format(number,);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes} - ${day}/${month}/${year}`;
        },

        // === [MỚI] 2 HÀM XỬ LÝ NÚT BẤM ===
        veTrangChu() {
            this.$router.push('/'); // Đổi đường dẫn về trang chủ của bạn
        },
        inLai() {
            window.print();
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.receipt-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 40px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', -apple-system, sans-serif;
}

/* === [MỚI] CSS CHO NÚT BẤM === */
.action-buttons {
    position: fixed;
    /* Ghim cố định */
    top: 20px;
    right: 20px;
    display: flex;
    gap: 12px;
    z-index: 9999;
    /* Đảm bảo nằm trên cùng */
}

.btn-action {
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.btn-home {
    background-color: #6c757d;
    /* Màu xám */
}

.btn-print {
    background-color: #0d6efd;
    /* Màu xanh */
}

.btn-action:hover {
    transform: translateY(-2px);
    opacity: 0.9;
}

/* ============================= */


.receipt-container {
    max-width: 420px;
    width: 100%;
    perspective: 1000px;
}

.receipt-paper {
    background: #ffffff;
    box-shadow:
        0 10px 40px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    overflow: hidden;
    animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-30px) rotateX(10deg);
    }

    to {
        opacity: 1;
        transform: translateY(0) rotateX(0);
    }
}

/* Header */
.receipt-header {
    padding: 32px 24px;
    text-align: center;
    border-bottom: 2px solid #000;
}

.logo-section {
    margin-bottom: 16px;
}

.logo-circle {
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    padding: 10px;
    border: 2px solid #e0e0e0;
}

.logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.company-name {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 4px;
    color: #000;
    margin: 0 0 4px 0;
}

.company-tagline {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    color: #666;
    text-transform: uppercase;
    margin: 0;
}

.header-divider {
    height: 1px;
    background: #ddd;
    margin: 16px 0;
}

.company-info {
    font-size: 12px;
    line-height: 1.6;
    color: #555;
}

.company-info p {
    margin: 0;
}

/* Invoice Title */
.invoice-title {
    padding: 24px;
    text-align: center;
}

.invoice-title h2 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 3px;
    color: #000;
    margin: 0 0 8px 0;
}

.title-underline {
    width: 60px;
    height: 3px;
    background: #000;
    margin: 0 auto;
}

/* Movie Section */
.movie-section {
    padding: 0 24px 24px 24px;
}

.section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #000;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
}

.tour-name {
    font-size: 18px;
    font-weight: 700;
    color: #000;
    margin-bottom: 16px;
    line-height: 1.4;
}

.info-table {
    width: 100%;
    border-collapse: collapse;
}

.info-table tr {
    border-bottom: 1px solid #f0f0f0;
}

.info-table tr:last-child {
    border-bottom: none;
}

.info-table td {
    padding: 8px 0;
    font-size: 13px;
}

.info-table .label {
    color: #666;
    font-weight: 500;
    width: 35%;
}

.info-table .value {
    color: #000;
    font-weight: 600;
}

/* Tickets */
.tickets-section {
    padding: 0 24px 24px 24px;
}

.ticket-item {
    background: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 12px;
}

.ticket-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px dashed #ccc;
}

.seat-number {
    font-size: 15px;
    font-weight: 700;
    color: #000;
}

.seat-price {
    font-size: 16px;
    font-weight: 800;
    color: #000;
}

.barcode-section {
    text-align: center;
}

.barcode-img {
    width: 100%;
    max-width: 280px;
    height: auto;
    margin-bottom: 8px;
}

.barcode-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    color: #666;
    letter-spacing: 1px;
    margin: 0;
}

/* Services */
.services-section {
    padding: 0 24px 24px 24px;
}

.services-table {
    width: 100%;
    border-collapse: collapse;
}

.services-table tr {
    border-bottom: 1px solid #f0f0f0;
}

.services-table tr:last-child {
    border-bottom: none;
}

.services-table td {
    padding: 10px 0;
    font-size: 13px;
}

.service-name {
    color: #000;
    font-weight: 600;
}

.service-price {
    text-align: right;
    color: #000;
    font-weight: 700;
}

/* QR Section */
.qr-section {
    padding: 0 24px 24px 24px;
    text-align: center;
}

.qr-box {
    display: inline-block;
    padding: 12px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 4px;
    margin-bottom: 12px;
}

.qr-code {
    display: block;
    width: 120px;
    height: 120px;
}

.qr-text {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    margin: 0;
}

/* Transaction */
.transaction-section {
    padding: 0 24px 24px 24px;
    background: #fafafa;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}

.trans-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 12px;
    color: #666;
}

.trans-row span:last-child {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    color: #000;
}

/* Footer */
.receipt-footer {
    padding: 24px;
    text-align: center;
}

.footer-divider {
    height: 1px;
    background: repeating-linear-gradient(90deg,
            #000 0px,
            #000 4px,
            transparent 4px,
            transparent 8px);
    margin-bottom: 16px;
}

.thank-you {
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin: 0 0 16px 0;
}

.footer-notes {
    font-size: 11px;
    line-height: 1.8;
    color: #666;
    margin-bottom: 16px;
}

.footer-notes p {
    margin: 0;
}

.website {
    font-size: 13px;
    font-weight: 700;
    color: #000;
    letter-spacing: 1px;
    margin: 0;
}

/* Perforation */
.perforation {
    height: 16px;
    background: repeating-linear-gradient(90deg,
            #f0f0f0 0px,
            #f0f0f0 8px,
            #fff 8px,
            #fff 12px);
}

/* Print Styles */
@media print {

    /* === [MỚI] ẨN NÚT KHI IN === */
    .no-print {
        display: none !important;
    }

    /* =========================== */

    .receipt-wrapper {
        background: #fff;
        padding: 0;
    }

    .receipt-paper {
        box-shadow: none;
        border-radius: 0;
    }
}

/* Responsive */
@media (max-width: 500px) {
    .receipt-wrapper {
        padding: 20px 12px;
    }

    .company-name {
        font-size: 24px;
    }

    .tour-name {
        font-size: 16px;
    }
}
</style>