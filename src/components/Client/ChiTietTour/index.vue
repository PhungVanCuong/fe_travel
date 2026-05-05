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
            <!-- CỘT TRÁI (NỘI DUNG TOUR) -->
            <div class="col-lg-7">
                <img style="width: 100%; height: 320px; border-radius: 15px; object-fit: cover;"
                    :src="chi_tiet_tour.hinh_anh" alt="" class="mb-4 shadow-sm">

                <div class="card mb-4 border-0 shadow-sm" style="border-radius: 15px;">
                    <div class="card-body">
                        <h3 class="fw-bold mb-3">Mô tả tour</h3>
                        <div class="text-secondary">{{ chi_tiet_tour.mo_ta }}</div>
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
                                    <img v-if="index_mo !== index && !is_open_all" :src="item.hinh_anh || 'https://via.placeholder.com/80x60?text=No+Image'"
                                        style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;"
                                        class="me-3">
                                    <div>
                                        <p class="text-primary mb-0 fw-bold">Ngày {{ index + 1 }}</p>
                                        <h6 class="mb-0 fw-bold">{{ item.ten_diem_den }}</h6>
                                    </div>
                                </div>
                                <i :class="(index_mo === index || is_open_all) ? 'fa-chevron-up' : 'fa-chevron-down'"
                                    class="fa-solid text-secondary"></i>
                            </div>

                            <div v-if="index_mo === index || is_open_all"
                                class="mt-3 animate__animated animate__fadeIn">
                                <img :src="item.hinh_anh || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'" class="img-fluid rounded-3 mb-3"
                                    style="width: 100%; max-height: 300px; object-fit: cover;">
                                <p class="fw-bold text-dark">{{ item.tieu_de_hoat_dong }}</p>
                                <p class="text-secondary" style="white-space: pre-line;">{{ item.mo_ta }}</p>
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
                                <p style="font-weight: 600; margin-bottom: 8px; margin-top: 15px;">2. Quy định theo độ tuổi:</p>
                                <ul style="padding-left: 20px; line-height: 1.8;">
                                    <li><span style="font-weight: 600;">Dưới 2 tuổi:</span> Giá theo website. Ngủ chung giường với bố mẹ.</li>
                                    <li><span style="font-weight: 600;">Từ 2 - 10 tuổi:</span> Giá theo website. Bao gồm đầy đủ dịch vụ chương trình.</li>
                                    <li><span style="font-weight: 600;">Từ 10 tuổi trở lên:</span> Tính 100% giá người lớn.</li>
                                </ul>
                            </div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <h5 style="font-weight: 700; color: #dc3545; margin-bottom: 15px;">
                                <i class="fa-solid fa-calendar-xmark" style="margin-right: 10px;"></i>Chính sách hủy & thay đổi
                            </h5>
                            <div style="padding-left: 20px; color: #495057;">
                                <div style="display: grid; grid-template-columns: 200px 1fr; gap: 10px; line-height: 2;">
                                    <span>Trước khởi hành 90 ngày:</span> <span style="font-weight: 700;">5.000.000đ/khách</span>
                                    <span>Từ 45 - 89 ngày:</span> <span style="font-weight: 700;">15.000.000đ/khách</span>
                                    <span>Từ 30 - 44 ngày:</span> <span style="font-weight: 700;">50% tổng giá tour</span>
                                    <span>Từ 15 - 19 ngày:</span> <span style="font-weight: 700;">100% tổng giá tour</span>
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

                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; border-left: 5px solid #0d6efd;">
                            <p style="margin-bottom: 0; color: #6c757d; font-size: 0.95rem;">
                                <i class="fa-solid fa-circle-info" style="margin-right: 8px;"></i>
                                HDV sẽ liên lạc khoảng 2 ngày trước khởi hành để sắp xếp giờ đón.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            
            <!-- CỘT PHẢI (GRID ẢNH VÀ ĐẶT TOUR) -->
            <div class="col-lg-5">
                
                <!-- GRID ẢNH BÊN PHẢI -->
                <div class="row">
                    <div v-for="(img, index) in list_hinh_anh" :key="index" class="col-lg-6 mb-3 position-relative" @click="show_modal_anh = true" style="cursor: pointer;">
                        <img :src="img.url" class="img-fluid rounded shadow-sm hover-zoom" style="width: 100%; height: 150px; object-fit: cover;">
                        <!-- Lớp filter mờ khi là ảnh "Xem thêm" -->
                        <div v-if="img.is_more" class="position-absolute top-0 start-0 w-100 h-100 rounded d-flex align-items-center justify-content-center hover-overlay" style="background: rgba(0,0,0,0.6); margin-left: 12px; width: calc(100% - 24px) !important; transition: all 0.3s;">
                            <span class="text-white fw-bold fs-5"><i class="fa-solid fa-images me-1"></i> Khám phá thêm</span>
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

                        <div class="mb-3">
                            <label class="form-label fw-bold">Số lượng khách:</label>
                            <div class="input-group" style="width: 140px;">
                                <button class="btn btn-outline-secondary"
                                    @click="dat_tour.so_luong_nguoi > 1 ? dat_tour.so_luong_nguoi-- : 1">-</button>
                                <input type="number" class="form-control text-center" v-model="dat_tour.so_luong_nguoi"
                                    readonly>
                                <button class="btn btn-outline-secondary" @click="dat_tour.so_luong_nguoi++">+</button>
                            </div>
                            <small class="text-muted" v-if="chi_tiet_tour.so_nguoi_toi_da">
                                (Còn trống {{ chi_tiet_tour.so_nguoi_toi_da }} chỗ)
                            </small>
                        </div>

                        <div class="mb-3">
                            <label class="fw-bold mb-1">Thông tin người đi cùng</label>
                            <textarea class="form-control" rows="4" v-model="dat_tour.ghi_chu_danh_sach_nguoi_di"
                                placeholder="Ví dụ: &#10;Nguyễn Văn A, 0922222222, 27/05/1990 &#10;Trần Thị B, 0911111111, 10/02/1995"></textarea>
                            <div class="form-text text-muted">
                                <i class="fa-solid fa-circle-info me-1"></i>
                                Vui lòng nhập mỗi người một dòng theo định dạng: <b>Họ tên, Số điện thoại, Ngày sinh</b>.
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

                        <button class="btn w-100 fw-bold py-3 text-white shadow-sm"
                            style="background-color: #8fdfb5; border-radius: 10px; border: none; transition: 0.3s;"
                            @click="thucHienDatTour()">
                            XÁC NHẬN ĐẶT TOUR
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ĐÁNH GIÁ -->
        <div class="row mt-5">
            <div class="col-lg-12 mt-4">
                <h3 class="fw-bold mb-4">Đánh giá từ khách hàng</h3>

                <div v-if="ds_danh_gia.length > 0" class="list-danh-gia">
                    <div v-for="(v, k) in ds_danh_gia" :key="k" class="card border-0 shadow-sm mb-3 p-3"
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
                    <p class="text-muted">Chưa có đánh giá nào cho tour này. Hãy là người đầu tiên trải nghiệm!</p>
                </div>
            </div>
            
            <!-- TOUR GỢI Ý -->
            <div class="col-lg-12 mt-5">
                <h3 class="fw-bold mb-4">Các tour khác bạn có thể thích</h3>
                <div class="row">
                    <template v-for="(value, index) in list_tour_khac.slice(0, 3)" :key="index">
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card h-100 shadow-sm border-0 tour-card"
                                style="cursor: pointer; border-radius: 12px; transition: transform 0.3s ease;" @click="$router.push('/client/chi-tiet-tour/' + value.id)">

                                <div class="position-relative">
                                    <img :src="value.hinh_anh" class="card-img-top" :alt="value.ten_tour"
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

                                    <p class="text-muted mb-3"
                                        style="font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                        {{ value.mo_ta }}
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

        <!-- MODAL XEM TẤT CẢ ẢNH (LIGHTBOX) -->
        <div v-if="show_modal_anh" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.8); z-index: 1050;">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Khám phá hình ảnh Tour</h5>
                        <button type="button" class="btn-close" @click="show_modal_anh = false"></button>
                    </div>
                    <div class="modal-body p-4 bg-light">
                        <div class="row g-3">
                            <div class="col-12 col-md-6" v-for="(img, idx) in all_images" :key="idx">
                                <img :src="img" class="img-fluid rounded shadow-sm w-100" style="height: 250px; object-fit: cover;">
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
            }
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
    },
    methods: {
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
                        this.list_tour_khac = res.data.tour_khac.slice(0, 4);

                        // --- LOGIC XỬ LÝ ẢNH MỚI (Lọc Trùng + Random) ---
                        let uniqueImages = [];
                        
                        // 1. Nạp ảnh gốc của Tour vào đầu tiên
                        if (this.chi_tiet_tour.hinh_anh) {
                            uniqueImages.push(this.chi_tiet_tour.hinh_anh);
                        }

                        // 2. Lấy ảnh từ Lịch Trình, bỏ qua nếu bị trùng với ảnh đã có
                        if (this.chi_tiet_tour.lich_trinh) {
                            this.chi_tiet_tour.lich_trinh.forEach(item => {
                                if (item.hinh_anh && !uniqueImages.includes(item.hinh_anh)) {
                                    uniqueImages.push(item.hinh_anh);
                                }
                            });
                        }

                        // Danh sách ảnh dự phòng chất lượng cao
                        let defaultImages = [
                            'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
                            'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
                            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
                            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
                            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80', 
                            'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&q=80', 
                            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 
                            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', 
                            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80', 
                            'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80'
                        ];

                        // Hàm trộn mảng (Shuffle) ngẫu nhiên để các Tour không bị trùng ảnh nền
                        defaultImages = defaultImages.sort(() => 0.5 - Math.random());

                        // Lưu toàn bộ ảnh để bung ra Modal
                        this.all_images = [...uniqueImages];

                        let finalImages = [];
                        // 3. Chuẩn bị đúng 4 slot cho Grid
                        for (let i = 0; i < 4; i++) {
                            if (uniqueImages[i]) {
                                finalImages.push({ url: uniqueImages[i], is_more: false });
                            } else {
                                // Nếu kho ảnh của tour không đủ 4 tấm, mượn ảnh Random bù vào
                                finalImages.push({ url: defaultImages[i], is_more: false });
                                this.all_images.push(defaultImages[i]); // Nhét luôn vào modal
                            }
                        }

                        // 4. Nếu tổng số ảnh >= 4, ô số 4 sẽ hiển thị Lớp phủ (Overlay) "Khám phá thêm"
                        if (uniqueImages.length >= 4) {
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
                        } else {
                            this.dat_tour.so_luong_nguoi = 1;
                            this.dat_tour.ghi_chu_danh_sach_nguoi_di = '';
                        }
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        this.$toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
                        this.$router.push('/client/dang-nhap');
                    } else {
                        this.$toast.error("Hệ thống đang bận, vui lòng thử lại sau.");
                    }
                });
        },
    }
}
</script>

<style scoped>
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
    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
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
    background: rgba(0,0,0,0.7) !important;
}
</style>