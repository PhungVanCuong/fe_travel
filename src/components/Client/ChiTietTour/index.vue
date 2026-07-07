<template>
    <div class="container">
        <h1 class="mt-3" style="color: rgb(143, 223, 181)">{{ chi_tiet_tour.ten_tour }}</h1>

        <div class="row mb-3">
            <div class="col-lg-12">
                <span>Ngày khởi hành: {{ formatDate(chi_tiet_tour.ngay_bat_dau) }}</span>
                <span class=" ms-4">Khởi hành từ: {{ chi_tiet_tour.diem_don }}</span>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-7">
                <img style="width: 100%; height: 320px; border-radius: 15px; object-fit: cover;"
                    :src="getImageUrl(getFirstImage(chi_tiet_tour.hinh_anh))" alt="Ảnh tour" class="mb-4 shadow-sm">

                <div class="card mb-4 border-0 shadow-sm" style="border-radius: 15px;" ref="tourDescription">
                    <div class="card-body">
                        <h3 class="fw-bold mb-3">Mô tả tour</h3>

                        <!-- Bao bọc nội dung để xử lý thu gọn/mở rộng bằng max-height -->
                        <div class="position-relative" style="transition: max-height 0.5s ease; overflow: hidden;"
                            :style="{ maxHeight: is_expanded_mo_ta ? '5000px' : '260px' }">

                            <div class="text-secondary mo-ta-html"
                                v-html="(chi_tiet_tour.mo_ta || '').replace(/<img /g, '<img style=\'max-width:100%;height:auto;display:block;margin:10px auto;border-radius:8px\' ')">
                            </div>

                            <!-- Lớp phủ tạo hiệu ứng mờ dần ở dưới cùng khi nội dung bị thu gọn -->
                            <div v-if="!is_expanded_mo_ta" class="fade-overlay"></div>
                        </div>

                        <!-- Nút Xem thêm / Thu gọn -->
                        <div class="text-center mt-3">
                            <button @click="toggleMoTa" class="btn btn-sm rounded-pill px-4 fw-bold shadow-sm"
                                style="color: #198754; border: 2px solid #198754; background: white; transition: 0.3s;">
                                {{ is_expanded_mo_ta ? 'Thu gọn' : 'Đọc thêm' }}
                                <i :class="is_expanded_mo_ta ? 'fa-chevron-up' : 'fa-chevron-down'"
                                    class="fa-solid ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card border-0 shadow-sm mb-4" style="border-radius: 15px;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-bold mb-0">Chương trình tour</h3>
                            <button @click="toggleOpenAll" class="btn btn-link text-decoration-none fw-bold p-0"
                                style="color: rgb(143, 223, 181)">
                                {{ is_open_all ? 'Thu gọn' : 'Xem tất cả' }}
                            </button>
                        </div>
                        <div v-for="(item, index) in chi_tiet_tour.lich_trinh" :key="index" class="border-bottom py-3">
                            <div @click="toggleSingle(index)" class="d-flex align-items-center justify-content-between"
                                style="cursor: pointer;">
                                <div class="d-flex align-items-center">
                                    <img v-if="index_mo !== index && !is_open_all"
                                        :src="item.hinh_anh || 'https://via.placeholder.com/80x60?text=No+Image'"
                                        style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;"
                                        class="me-3">
                                    <div>
                                        <p class="text-primary mb-0 fw-bold">{{ item.thoi_gian }}</p>
                                        <h6 class="mb-0 fw-bold">{{ item.ten_diem_den }}</h6>
                                    </div>
                                </div>
                                <i :class="(index_mo === index || is_open_all) ? 'fa-chevron-up' : 'fa-chevron-down'"
                                    class="fa-solid text-secondary"></i>
                            </div>

                            <div v-if="index_mo === index || is_open_all"
                                class="mt-3 animate__animated animate__fadeIn">
                                <img :src="item.hinh_anh || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'"
                                    class="img-fluid rounded-3 mb-3"
                                    style="width: 100%; max-height: 300px; object-fit: cover;">

                                <div class="text-secondary mo-ta-html"
                                    v-html="(item.mo_ta || '').replace(/<img /g, '<img style=\'max-width:100%;height:auto;display:block;margin:10px auto;border-radius:8px\' ')">
                                </div>

                                <div v-if="item.loai_phuong_tien" class="mt-2">
                                    <span class="badge bg-light text-dark border">
                                        <i class="fa-solid fa-bus me-1"></i> {{ item.loai_phuong_tien }}
                                    </span>
                                </div>
                                <div v-else class="mt-2">
                                    <span class="badge bg-light text-dark border">
                                        <i class="fa-solid fa-person-walking me-1"></i> Tự túc / Đi bộ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm mb-4" style="border-radius: 15px; border: none; overflow: hidden;">
                    <div @click="is_policy_open = !is_policy_open"
                        style="cursor: pointer; padding: 20px; display: flex; justify-content: space-between; align-items: center; background-color: #fff;">
                        <h3 style="font-weight: 700; margin-bottom: 0; font-size: 1.5rem; color: #212529;">Điều khoản &
                            lưu ý</h3>
                        <i :class="is_policy_open ? 'fa-chevron-up' : 'fa-chevron-down'"
                            style="color: #6c757d; font-size: 1.2rem;" class="fa-solid"></i>
                    </div>

                    <div v-if="is_policy_open" style="padding: 0 20px 20px 20px; background-color: #fff;">
                        <hr style="margin-top: 0; border-top: 1px solid #eee;">

                        <div style="margin-bottom: 25px;">
                            <h5 style="font-weight: 700; color: #0d6efd; margin-bottom: 15px;">
                                <i class="fa-solid fa-child" style="margin-right: 10px;"></i>Chính sách trẻ em
                            </h5>
                            <div style="padding-left: 20px; color: #495057;">
                                <p style="font-weight: 600; margin-bottom: 8px;">1. Quy định chung:</p>
                                <ul style="padding-left: 20px; line-height: 1.8;">
                                    <li>Mỗi 02 người lớn được kèm 01 trẻ em.</li>
                                    <li>Từ trẻ thứ 02 trở đi, áp dụng mức giá theo quy định của từng nhóm tuổi.</li>
                                    <li>Trẻ em ngủ chung giường với bố mẹ.</li>
                                </ul>
                                <p style="font-weight: 600; margin-bottom: 8px; margin-top: 15px;">2. Quy định theo độ
                                    tuổi:</p>
                                <ul style="padding-left: 20px; line-height: 1.8;">
                                    <li><span style="font-weight: 600;">Dưới 2 tuổi:</span> Giá theo website. Ngủ chung
                                        giường với bố mẹ.</li>
                                    <li><span style="font-weight: 600;">Từ 2 - 10 tuổi:</span> Giá theo website. Bao gồm
                                        đầy đủ dịch vụ chương trình.</li>
                                    <li><span style="font-weight: 600;">Từ 10 tuổi trở lên:</span> Tính 100% giá người
                                        lớn.</li>
                                </ul>
                            </div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <h5 style="font-weight: 700; color: #dc3545; margin-bottom: 15px;">
                                <i class="fa-solid fa-calendar-xmark" style="margin-right: 10px;"></i>Chính sách hủy &
                                thay đổi
                            </h5>
                            <div style="padding-left: 20px; color: #495057;">
                                <div
                                    style="display: grid; grid-template-columns: 200px 1fr; gap: 10px; line-height: 2;">
                                    <span>Trước khởi hành 90 ngày:</span> <span
                                        style="font-weight: 700;">5.000.000đ/khách</span>
                                    <span>Từ 45 - 89 ngày:</span> <span
                                        style="font-weight: 700;">15.000.000đ/khách</span>
                                    <span>Từ 30 - 44 ngày:</span> <span style="font-weight: 700;">50% tổng giá
                                        tour</span>
                                    <span>Từ 15 - 19 ngày:</span> <span style="font-weight: 700;">100% tổng giá
                                        tour</span>
                                </div>
                                <p style="margin-top: 10px; font-style: italic; font-size: 0.9rem; color: #6c757d;">
                                    * Lễ, Tết không hoàn, hủy, đổi: mất 100% giá trị tour.
                                </p>
                            </div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <h5 style="font-weight: 700; color: #0dcaf0; margin-bottom: 15px;">
                                <i class="fa-solid fa-passport" style="margin-right: 10px;"></i>Thông tin Visa
                            </h5>
                            <ul style="padding-left: 40px; color: #495057; line-height: 1.8;">
                                <li>Scan mặt hộ chiếu còn hạn trên 6 tháng.</li>
                                <li>File ảnh 3,5 x 4,5 nền phông trắng, không đeo kính.</li>
                                <li>Nộp hồ sơ ít nhất 15 ngày trước khởi hành.</li>
                            </ul>
                        </div>

                        <div
                            style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 5px solid #0d6efd;">
                            <p style="margin-bottom: 0; color: #6c757d; font-size: 0.95rem;">
                                <i class="fa-solid fa-circle-info" style="margin-right: 8px;"></i>
                                HDV sẽ liên lạc khoảng 2 ngày trước khởi hành để sắp xếp giờ đón.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-lg-5">
                <div class="row">
                    <div v-for="(img, index) in list_hinh_anh" :key="index" class="col-lg-6 mb-3 position-relative"
                        @click="show_modal_anh = true" style="cursor: pointer;">
                        <img :src="img.url" class="img-fluid rounded shadow-sm hover-zoom"
                            style="width: 100%; height: 150px; object-fit: cover;">
                        <div v-if="img.is_more"
                            class="position-absolute top-0 start-0 w-100 h-100 rounded d-flex align-items-center justify-content-center hover-overlay"
                            style="background: rgba(0,0,0,0.6); margin-left: 12px; width: calc(100% - 24px) !important; transition: all 0.3s;">
                            <span class="text-white fw-bold fs-5"><i class="fa-solid fa-images me-1"></i> Khám phá
                                thêm</span>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm border-0"
                    style="border-radius: 15px; position: -webkit-sticky; position: sticky; top: 20px; z-index: 100;">
                    <div class="card-body">
                        <h4 class="fw-bold mb-3 text-dark">Đặt Tour</h4>
                        <hr>

                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-secondary">Giá tour:</span>
                            <span class="fw-bold text-danger fs-5">
                                {{ new Intl.NumberFormat('vi-VN', {
                                    style: 'currency', currency: 'VND'
                                }).format(chi_tiet_tour.gia) }}
                            </span>
                        </div>

                        <div class="mb-4">
                            <label class="form-label fw-bold mb-2 text-dark">Số lượng khách:</label>
                            <div class="d-flex align-items-center">
                                <div class="input-group custom-qty-group shadow-sm">
                                    <button class="btn btn-qty" type="button" @click="giamSoLuong">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <input type="number" 
                                        class="form-control text-center fw-bold input-qty" 
                                        v-model.number="dat_tour.so_luong_nguoi"
                                        @blur="validateSoLuong">
                                    <button class="btn btn-qty" type="button" @click="tangSoLuong">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                                
                                <span class="ms-3 text-muted fw-medium" v-if="chi_tiet_tour.so_nguoi_toi_da" style="font-size: 0.9rem;">
                                    (Còn trống <strong class="text-danger">{{ chi_tiet_tour.so_nguoi_toi_da }}</strong> chỗ)
                                </span>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="fw-bold mb-1">
                                Thông tin người đi cùng 
                                <span v-if="dat_tour.so_luong_nguoi >= 2" class="text-danger">* (Bắt buộc)</span>
                            </label>
                            <textarea class="form-control" rows="4" v-model="dat_tour.ghi_chu_danh_sach_nguoi_di"
                                placeholder="Ví dụ: &#10;Nguyễn Văn A, 0922222222, 27/05/1990 &#10;Trần Thị B, 0911111111, 10/02/1995"></textarea>
                            <div class="form-text text-muted">
                                <i class="fa-solid fa-circle-info me-1"></i>
                                Vui lòng nhập mỗi người một dòng theo định dạng: <b>Họ tên, Số điện thoại, Ngày
                                    sinh</b>.
                            </div>
                        </div>

                        <div class="p-3 mb-3" style="background-color: #f8f9fa; border-radius: 10px;">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold">Tổng cộng:</span>
                                <h4 class="fw-bold mb-0" style="color: #198754;">
                                    {{ new Intl.NumberFormat('vi-VN', {
                                        style: 'currency', currency: 'VND'
                                    }).format(chi_tiet_tour.gia * dat_tour.so_luong_nguoi) }}
                                </h4>
                            </div>
                        </div>

                        <button class="btn w-100 fw-bold py-3 text-white shadow-sm" :disabled="is_loading" :style="{
                            background: is_loading ? '#ccc' : 'linear-gradient(135deg, #8fdfb5, #5bb883)',
                            borderRadius: '10px',
                            border: 'none',
                            transition: '0.3s',
                            cursor: is_loading ? 'not-allowed' : 'pointer'
                        }"
                            @mouseover="!is_loading && ($event.target.style.background = 'linear-gradient(135deg, #78c9a0, #4da374)')"
                            @mouseleave="!is_loading && ($event.target.style.background = 'linear-gradient(135deg, #8fdfb5, #5bb883)')"
                            @click="thucHienDatTour()">
                            {{ is_loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT TOUR' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-lg-12 mt-4">
                <h3 class="fw-bold mb-3">Đánh giá từ khách hàng ({{ ds_danh_gia.length }})</h3>

                <div class="d-flex flex-wrap gap-2 mb-4">
                    <button @click="filterStar = 'all'"
                        :class="['btn btn-sm px-3 rounded-pill fw-bold', filterStar === 'all' ? 'btn-secondary text-white' : 'btn-outline-secondary']">
                        Tất cả ({{ ds_danh_gia.length }})
                    </button>

                    <button v-for="star in [5, 4, 3, 2, 1]" :key="star" @click="filterStar = star"
                        :class="['btn btn-sm px-3 rounded-pill fw-bold d-flex align-items-center gap-1', filterStar === star ? 'btn-warning text-dark' : 'btn-outline-warning']">
                        {{ star }} <i class="fa-solid fa-star small"></i> ({{ countStars(star) }})
                    </button>
                </div>

                <div v-if="filteredDanhGia.length > 0" class="list-danh-gia">
                    <div v-for="(v, k) in filteredDanhGia" :key="k" class="card border-0 shadow-sm mb-3 p-3"
                        style="border-radius: 15px;">
                        <div class="d-flex align-items-start">
                            <img :src="v.avatar || 'https://via.placeholder.com/50'" class="rounded-circle me-3"
                                style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #eee;">

                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <h6 class="fw-bold mb-0 text-dark">{{ v.ho_va_ten }}</h6>
                                    <small class="text-muted">{{ formatDate(v.created_at) }}</small>
                                </div>

                                <div class="star-rating mb-2">
                                    <i v-for="star in 5" :key="star" class="fa-star me-1"
                                        :class="star <= v.sao_danh_gia ? 'fa-solid text-warning' : 'fa-regular text-secondary'"
                                        style="font-size: 0.85rem;">
                                    </i>
                                </div>

                                <p class="text-secondary mb-0 small" style="line-height: 1.6;">
                                    {{ v.noi_dung || 'Khách hàng không để lại bình luận.' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center p-5 border border-dashed rounded-4 bg-light">
                    <i class="fa-solid fa-comments text-muted fs-1 mb-3"></i>
                    <p class="text-muted">
                        {{ filterStar === 'all' ? 'Chưa có đánh giá nào cho tour này. Hãy là người đầu tiên trải nghiệm!' : 'Không có đánh giá ' + filterStar + ' sao nào.' }}
                    </p>
                </div>
            </div>


            <div class="col-lg-12 mt-5">
                <h3 class="fw-bold mb-4">Các tour khác bạn có thể thích</h3>
                <div class="row">
                    <template v-for="(value, index) in list_tour_khac.slice(0, 3)" :key="index">
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card h-100 shadow-sm border-0 tour-card"
                                style="cursor: pointer; border-radius: 12px; transition: transform 0.3s ease;"
                                @click="$router.push('/client/chi-tiet-tour/' + value.id)">

                                <div class="position-relative">
                                    <img :src="getImageUrl(getFirstImage(value.hinh_anh))" class="card-img-top"
                                        :alt="value.ten_tour"
                                        style="height: 200px; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px;">

                                    <div class="position-absolute text-white px-2 py-1 bg-dark bg-opacity-50 rounded"
                                        style="bottom: 10px; right: 10px; font-size: 0.8rem;">
                                        <i class="fa-solid fa-users me-1"></i> Còn: {{ value.so_nguoi_toi_da }}
                                    </div>
                                </div>

                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title fw-bold text-dark mb-2"
                                        style="line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.8em;">
                                        {{ value.ten_tour }}
                                    </h5>

                                    <div class="d-flex align-items-center gap-2 mb-2 text-secondary"
                                        style="font-size: 0.9rem;">
                                        <i class="fa-solid fa-location-dot text-primary"></i>
                                        <span>{{ value.diem_don }}</span>
                                    </div>

                                    <p class="text-muted mb-3 mo-ta-html"
                                        style="font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
                                        v-html="(value.mo_ta || '').replace(/<img /g, '<img style=\'max-width:100%;height:auto;display:block;margin:10px auto;border-radius:8px\' ')">
                                    </p>

                                    <div
                                        class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                        <div>
                                            <small class="text-muted d-block" style="font-size: 0.75rem;">Giá từ</small>
                                            <h5 class="fw-bold mb-0 text-danger">
                                                {{ new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency', currency: 'VND'
                                                }).format(value.gia) }}
                                            </h5>
                                        </div>
                                        <button class="btn btn-outline-primary btn-sm rounded-pill px-3">
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <div v-if="show_modal_anh" class="modal fade show d-block" tabindex="-1"
            style="background: rgba(0,0,0,0.8); z-index: 1050;">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Khám phá hình ảnh Tour</h5>
                        <button type="button" class="btn-close" @click="show_modal_anh = false"></button>
                    </div>
                    <div class="modal-body p-4 bg-light">
                        <div class="row g-3">
                            <div class="col-12 col-md-6" v-for="(img, idx) in all_images" :key="idx">
                                <img :src="img" class="img-fluid rounded shadow-sm w-100"
                                    style="height: 250px; object-fit: cover;">
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
    props: ["id_tour"],
    data() {
        return {
            id: this.$route.params.id_tour,
            chi_tiet_tour: {},
            list_tour_khac: [],
            ds_danh_gia: [],
            list_hinh_anh: [], // Mảng 4 ảnh đổ ra Grid
            all_images: [],    // Mảng chứa toàn bộ ảnh để bung ra Modal
            show_modal_anh: false,
            index_mo: null,
            is_open_all: false,
            is_policy_open: false,
            dat_tour: {
                so_luong_nguoi: 1,
                ghi_chu_danh_sach_nguoi_di: '',
                phuong_thuc_thanh_toan: 'Chuyển khoản'
            },
            filterStar: 'all',
            is_expanded_mo_ta: false, // Biến trạng thái Mở/Đóng mô tả
            open_scroll_y: 0,
            is_loading: false,
        }

    },
    watch: {
        '$route.params.id_tour': function (newId) {
            this.id = newId;
            this.LoadTour();
            this.layDanhSachDanhGia();
            this.scrollToTop();
        }
    },
    mounted() {
        this.LoadTour();
        this.layDanhSachDanhGia();
        window.addEventListener('scroll', this.handleScrollMoTa);

    },
    unmounted() {

        window.removeEventListener('scroll', this.handleScrollMoTa);
    },
    computed: {
        filteredDanhGia() {
            if (this.filterStar === 'all') {
                return this.ds_danh_gia;
            }
            return this.ds_danh_gia.filter(item => item.sao_danh_gia === this.filterStar);
        }
    },
    methods: {
        giamSoLuong() {
            if (this.dat_tour.so_luong_nguoi > 1) {
                this.dat_tour.so_luong_nguoi--;
            }
        },
        tangSoLuong() {
            if (this.dat_tour.so_luong_nguoi < this.chi_tiet_tour.so_nguoi_toi_da) {
                this.dat_tour.so_luong_nguoi++;
            } else {
                this.$toast.warning("Tour này chỉ còn " + this.chi_tiet_tour.so_nguoi_toi_da + " chỗ trống!");
            }
        },
        validateSoLuong() {
            // Ép kiểu về số nguyên
            let val = parseInt(this.dat_tour.so_luong_nguoi);
            
            // Nếu nhập bậy (chữ) hoặc nhỏ hơn 1 -> Gán bằng 1
            if (isNaN(val) || val < 1) {
                this.dat_tour.so_luong_nguoi = 1;
            } 
            // Nếu nhập lớn hơn số chỗ trống -> Gán bằng mức tối đa
            else if (val > this.chi_tiet_tour.so_nguoi_toi_da) {
                this.dat_tour.so_luong_nguoi = this.chi_tiet_tour.so_nguoi_toi_da;
                this.$toast.warning("Tour này chỉ còn " + this.chi_tiet_tour.so_nguoi_toi_da + " chỗ trống!");
            } 
            // Nếu hợp lệ
            else {
                this.dat_tour.so_luong_nguoi = val;
            }
        },
        // Hàm lấy ảnh đầu tiên an toàn từ mảng hoặc chuỗi
        getFirstImage(hinh_anh) {
            if (!hinh_anh) return 'https://via.placeholder.com/400x300?text=No+Image';

            // Nếu là mảng
            if (Array.isArray(hinh_anh)) {
                return hinh_anh.length > 0 ? hinh_anh[0] : 'https://via.placeholder.com/400x300';
            }

            // Nếu là chuỗi JSON
            try {
                let parsed = JSON.parse(hinh_anh);
                return Array.isArray(parsed) ? parsed[0] : parsed;
            } catch (e) {
                return hinh_anh; // Trả về nguyên bản nếu là chuỗi URL thường
            }
        },
        // Hàm lấy URL ảnh sắc nét
        getImageUrl(url) {
            if (!url) return 'https://via.placeholder.com/400x300';
            return url.replace(/-\d+x\d+/g, '');
        },
        toggleMoTa() {
            this.is_expanded_mo_ta = !this.is_expanded_mo_ta;
            if (this.is_expanded_mo_ta) {
                // Khi mở, lưu lại tọa độ chuột hiện tại
                this.open_scroll_y = window.scrollY;
            } else {
                // Tùy chọn: Khi bấm Thu gọn, tự động cuộn mượt lên đầu ô mô tả
                if (this.$refs.tourDescription) {
                    const y = this.$refs.tourDescription.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        },
        handleScrollMoTa() {
            if (this.is_expanded_mo_ta) {
                // Nếu cuộn đi xa hơn 600px so với lúc mở (cả lên và xuống), tự động đóng lại
                if (Math.abs(window.scrollY - this.open_scroll_y) > 600) {
                    this.is_expanded_mo_ta = false;
                }
            }
        },
        countStars(star) {
            return this.ds_danh_gia.filter(item => item.sao_danh_gia === star).length;
        },
        formatDate(dateString) {
            if (!dateString) return "...";
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN').format(date);
        },
        layDanhSachDanhGia() {
            const id_tour = this.id;
            axios.get(apiUrl('client/danh-gia/get-danh-gia/' + id_tour))
                .then((res) => {
                    if (res.data.data) {
                        this.ds_danh_gia = res.data.data;
                    }
                })
                .catch((err) => { console.error("Lỗi khi tải đánh giá:", err); });
        },

        // Fix lỗi hiển thị Ngày Tháng
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },

        LoadTour() {
            var payload = { id: this.id };
            axios.post(apiUrl('client/chi-tiet-tour/get-data'), payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_client') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.chi_tiet_tour = res.data.data;

                        // 1. Ép kiểu ảnh cho danh sách Tour Gợi Ý
                        this.list_tour_khac = res.data.tour_khac.slice(0, 4).map(tour => {
                            if (typeof tour.hinh_anh === 'string') {
                                try { tour.hinh_anh = JSON.parse(tour.hinh_anh); }
                                catch (e) { tour.hinh_anh = [tour.hinh_anh]; }
                            }
                            return tour;
                        });

                        // 2. Ép kiểu ảnh của Tour hiện tại
                        if (typeof this.chi_tiet_tour.hinh_anh === 'string') {
                            try {
                                this.chi_tiet_tour.hinh_anh = JSON.parse(this.chi_tiet_tour.hinh_anh);
                            } catch (e) {
                                this.chi_tiet_tour.hinh_anh = [this.chi_tiet_tour.hinh_anh];
                            }
                        }
                        if (!Array.isArray(this.chi_tiet_tour.hinh_anh)) {
                            this.chi_tiet_tour.hinh_anh = [];
                        }

                        // 3. Gom TẤT CẢ các ảnh vào 1 mảng chung để làm Thư viện (Đã lọc trùng & xóa đuôi size)
                        let uniqueImages = [];

                        // - Lấy ảnh từ Tour
                        this.chi_tiet_tour.hinh_anh.forEach(img => {
                            let cleanImg = this.getImageUrl(img);
                            if (cleanImg && !uniqueImages.includes(cleanImg)) uniqueImages.push(cleanImg);
                        });

                        // - Lấy ảnh từ Lịch Trình đưa vào kho chung
                        if (this.chi_tiet_tour.lich_trinh && Array.isArray(this.chi_tiet_tour.lich_trinh)) {
                            this.chi_tiet_tour.lich_trinh.forEach(item => {
                                let cleanImg = this.getImageUrl(this.getFirstImage(item.hinh_anh));
                                if (cleanImg && !uniqueImages.includes(cleanImg)) uniqueImages.push(cleanImg);
                            });
                        }

                        // 4. Chia ảnh để đổ ra giao diện
                        this.all_images = uniqueImages.length > 0 ? [...uniqueImages] : ['https://via.placeholder.com/800x400'];

                        let defaultImages = [
                            'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
                            'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
                            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
                            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
                            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
                            'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&q=80'
                        ].sort(() => 0.5 - Math.random());

                        let finalImages = [];
                        let secondaryImages = uniqueImages.slice(1); // Lấy từ ảnh số 2 trở đi cho cột bên phải

                        for (let i = 0; i < 4; i++) {
                            if (secondaryImages[i]) {
                                finalImages.push({ url: secondaryImages[i], is_more: false });
                            } else {
                                finalImages.push({ url: defaultImages[i], is_more: false });
                                this.all_images.push(defaultImages[i]);
                            }
                        }

                        if (secondaryImages.length > 4) {
                            finalImages[3].is_more = true;
                        }

                        this.list_hinh_anh = finalImages;
                    }
                });
        },
        toggleOpenAll() {
            this.is_open_all = !this.is_open_all;
            if (this.is_open_all) {
                this.index_mo = null;
            }
        },
        toggleSingle(index) {
            if (this.is_open_all) {
                this.is_open_all = false;
                this.index_mo = index;
            } else {
                this.index_mo = (this.index_mo === index ? null : index);
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        thucHienDatTour() {
            // 1. Chặn click đúp: Đang xử lý thì ngưng luôn
            if (this.is_loading) return;

            const token = localStorage.getItem('key_client');
            if (!token) {
                this.$toast.error("Vui lòng đăng nhập để thực hiện đặt tour.");
                this.$router.push('/client/dang-nhap');
                return;
            }
            
            if (this.dat_tour.so_luong_nguoi > this.chi_tiet_tour.so_nguoi_toi_da) {
                this.$toast.warning("Rất tiếc, tour này chỉ còn " + this.chi_tiet_tour.so_nguoi_toi_da + " chỗ trống!");
                return;
            }

            // 2. LOGIC KIỂM TRA: Bắt buộc nhập thông tin nếu đi từ 2 người trở lên
            if (this.dat_tour.so_luong_nguoi >= 2 && this.dat_tour.ghi_chu_danh_sach_nguoi_di.trim() === '') {
                this.$toast.warning("Vui lòng điền thông tin người đi cùng khi đặt từ 2 vé trở lên!");
                return;
            }

            // 3. Khóa nút bấm lại (hiện ĐANG XỬ LÝ...)
            this.is_loading = true;

            var payload = {
                "id_tour": this.id,
                "so_luong_nguoi": this.dat_tour.so_luong_nguoi,
                "ghi_chu_danh_sach_nguoi_di": this.dat_tour.ghi_chu_danh_sach_nguoi_di,
                "phuong_thuc_thanh_toan": this.dat_tour.phuong_thuc_thanh_toan
            };

            axios.post(apiUrl("client/dat-tour/thanh-toan"), payload, {
                headers: { Authorization: "Bearer " + token }
            })
            .then((res) => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.chi_tiet_tour.so_nguoi_toi_da -= this.dat_tour.so_luong_nguoi;
                    const maHoaDon = res.data.data.hoa_don.ma_hoa_don;
                    
                    if (maHoaDon) {
                        this.$router.push('/client/thanh-toan/' + maHoaDon);
                        // CHÚ Ý: Không mở khóa is_loading ở đây, giữ cho nút bị mờ luôn trong lúc đợi chuyển trang!
                    } else {
                        this.dat_tour.so_luong_nguoi = 1;
                        this.dat_tour.ghi_chu_danh_sach_nguoi_di = '';
                        // Nếu không chuyển trang, mở khóa nút sau 2 giây
                        setTimeout(() => { this.is_loading = false; }, 2000);
                    }
                } else {
                    this.$toast.error(res.data.message);
                    // Mở khóa nút sau 2 giây nếu có lỗi logic (hết vé, sai dữ liệu...)
                    setTimeout(() => { this.is_loading = false; }, 2000);
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    this.$toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
                    this.$router.push('/client/dang-nhap');
                } else {
                    this.$toast.error("Hệ thống đang bận, vui lòng thử lại sau.");
                }
                // Mở khóa nút sau 2 giây nếu lỗi API/mạng
                setTimeout(() => { this.is_loading = false; }, 2000);
            });
        }
    }
}
</script>

<style scoped>
.fade-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 90%);
    pointer-events: none;
    /* Để người dùng vẫn có thể copy chữ bên dưới lớp mờ */
}

.sticky-card {
    top: 100px !important;
    transition: all 0.3s ease;
}

button:hover {
    filter: brightness(90%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tour-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.list-danh-gia .card {
    transition: all 0.3s ease;
}

.list-danh-gia .card:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
}

.border-dashed {
    border: 2px dashed #dee2e6 !important;
}

.fa-solid.text-warning {
    color: #ffc107 !important;
}

/* Hiệu ứng hover cho Grid ảnh */
.hover-zoom {
    transition: transform 0.4s ease;
}

.col-lg-6.position-relative:hover .hover-zoom {
    transform: scale(1.05);
}

.col-lg-6.position-relative {
    overflow: hidden;
    border-radius: 5px;
}

.hover-overlay:hover {
    background: rgba(0, 0, 0, 0.7) !important;
}

/* Các custom style trước đó (nếu bạn cần có thể giữ lại đoạn :deep dưới đây để css bullet point) */
:deep(.mo-ta-html ul) {
    padding-left: 20px;
    margin-bottom: 15px;
}
/* ================= KHỐI SỐ LƯỢNG KHÁCH ================= */
.custom-qty-group {
    width: 150px; /* Tăng chiều rộng tổng thể */
    height: 45px; /* Tăng chiều cao để dễ bấm */
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
}

.btn-qty {
    background: transparent;
    border: none;
    color: #125633;
    font-size: 1rem;
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.btn-qty:hover {
    background: #8fdfb5;
    color: white;
}

.btn-qty:active {
    background: #6dca96;
    transform: scale(0.95);
}

.input-qty {
    border: none !important;
    background: transparent !important;
    padding: 0;
    font-size: 1.2rem;
    color: #212529;
}

.input-qty:focus {
    box-shadow: none !important;
}

/* Ẩn mũi tên mặc định của input number trên Chrome, Safari, Edge */
.input-qty::-webkit-outer-spin-button,
.input-qty::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
/* Ẩn mũi tên trên Firefox */
.input-qty[type=number] {
    -moz-appearance: textfield;
}
</style>