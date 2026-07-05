<template>
    <div class="wrapper tour-background">
        <router-view></router-view>
    </div>
</template>

<script>
import "../../assets/js/bootstrap.bundle.min.js";
import "../../assets/js/jquery.min.js";
import "../../assets/plugins/simplebar/js/simplebar.min.js";
import "../../assets/plugins/metismenu/js/metisMenu.min.js";
import "../../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import "../../assets/js/index.js";
import "../../assets/js/app.js";
import "../../assets/js/pace.min.js";

export default {
    name: "app",
    components: {

    }
}
</script>

<!-- GIỮ NGUYÊN CÁC IMPORT CSS GLOBAL CỦA BẠN -->
<style>
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
@import "../../assets/css/dark-theme.css";
@import "../../assets/css/semi-dark.css";
@import "../../assets/css/header-colors.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
</style>

<!-- THÊM STYLE SCOPED ĐỂ XỬ LÝ BACKGROUND RIÊNG CHO FILE NÀY -->
<style scoped>
.tour-background {
    /* Set màu nền chủ đạo */
    background-color: #1b7d6b !important;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
}

/* Lớp giả chứa các icon rải rác xung quanh */
.tour-background::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    
    /* Sử dụng nhiều background-image để rải icon */
    background-image: 
        url('https://cdn-icons-png.flaticon.com/512/3163/3163194.png'), /* Máy bay */
        url('https://cdn-icons-png.flaticon.com/512/2060/2060284.png'), /* Vali */
        url('https://cdn-icons-png.flaticon.com/512/1004/1004514.png'), /* Quả địa cầu */
        url('https://cdn-icons-png.flaticon.com/512/3068/3068697.png'), /* Máy ảnh */
        url('https://cdn-icons-png.flaticon.com/512/2991/2991231.png'), /* Hộ chiếu */
        url('https://cdn-icons-png.flaticon.com/512/1946/1946770.png'); /* Bản đồ */
        
    /* Vị trí rải rác các icon trên màn hình (X Y) */
    background-position: 
        5% 15%,   /* Máy bay ở góc trên trái */
        10% 85%,  /* Vali ở góc dưới trái */
        90% 85%,  /* Địa cầu ở góc dưới phải */
        92% 12%,  /* Máy ảnh ở góc trên phải */
        50% 8%,   /* Hộ chiếu ở giữa trên */
        50% 92%;  /* Bản đồ ở giữa dưới */
        
    /* Kích thước của từng icon tương ứng */
    background-size: 
        150px, 
        140px, 
        180px, 
        120px, 
        100px, 
        160px;
        
    background-repeat: no-repeat;
    
    /* Làm cho các icon biến thành màu trắng và mờ đi để làm nền */
    filter: invert(1);
    opacity: 0.08; /* Độ mờ rất thấp để không làm rối nội dung chính */
    
    /* Đảm bảo lớp nền không che mất các thao tác click chuột của user */
    pointer-events: none;
    z-index: 0;
}

/* Đảm bảo router-view (form đăng nhập) luôn nằm nổi lên trên lớp nền */
.tour-background > :deep(*) {
    position: relative;
    z-index: 1;
}
</style>