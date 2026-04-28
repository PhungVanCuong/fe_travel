<template>
    <div class="container">
        <h1 class="mt-3" style="color: rgb(143, 223, 181)">{{ chi_tiet_tour.ten_tour }}</h1>

        <div class="row mb-3">
            <div class="col-lg-12">
                <span>Ngày khởi hành: {{ chi_tiet_tour.ngay_bat_dau }}</span>
                <span class=" ms-4">Khởi hành từ: {{ chi_tiet_tour.diem_don }}</span>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-7">
                <img style="width: 100%; height: 320px; border-radius: 15px; object-fit: cover;"
                    :src="chi_tiet_tour.hinh_anh" alt="" class="mb-4">

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
                                    <img v-if="index_mo !== index && !is_open_all" :src="item.hinh_anh"
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
                                <img :src="item.hinh_anh" class="img-fluid rounded-3 mb-3"
                                    style="width: 100%; max-height: 300px; object-fit: cover;">
                                <p class="fw-bold text-dark">{{ item.tieu_de_hoat_dong }}</p>
                                <p class="text-secondary" style="white-space: pre-line;">{{ item.mo_ta }}</p>
                                <div v-if="item.loai_phuong_tien" class="mt-2">
                                    <span class="badge bg-light text-dark border">
                                        <i class="fa-solid fa-bus me-1"></i> {{ item.loai_phuong_tien }}
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
                    <div v-for="(img, index) in list_hinh_anh" :key="index" class="col-lg-6 mb-3">
                        <img :src="img" class="img-fluid rounded shadow-sm"
                            style="width: 100%; height: 150px; object-fit: cover;">
                    </div>
                </div>

                <div class="card shadow-sm border-0"
                    style="border-radius: 15px; position: -webkit-sticky; position: sticky; top: 20px; z-index: 100;">
                    <div class="card-body">
                        <h4 class="fw-bold mb-3 text-dark">Đặt Tour</h4>
                        <hr>

                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-secondary">Giá tour:</span>
                            <span class="fw-bold text-danger">
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
                            <label class="form-label fw-bold">Ghi chú:</label>
                            <textarea class="form-control" rows="3" v-model="dat_tour.ghi_chu_danh_sach_nguoi_di"
                                placeholder="Tên người đi, yêu cầu đặc biệt..."></textarea>
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

                        <button class="btn w-100 fw-bold py-3 text-white"
                            style="background-color: #8fdfb5; border-radius: 10px; border: none;"
                            @click="thucHienDatTour()">
                            XÁC NHẬN ĐẶT TOUR
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-lg-12">
                <h3 class="fw-bold mb-4">Các tour khác bạn có thể thích</h3>
                <div class="row">
                    <template v-for="(value, index) in list_tour_khac.slice(0, 3)" :key="index">
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card h-100 shadow-sm border-0 tour-card"
                                style="cursor: pointer; border-radius: 12px; transition: transform 0.3s ease;">

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
                                        <router-link :to="'/chi-tiet-tour/' + value.id"
                                            class="btn btn-outline-primary btn-sm rounded-pill px-3">
                                            Chi tiết
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    props: [
        "id_tour"
    ],
    data() {
        return {
            // Lấy ID từ params của router
            id: this.$route.params.id_tour,
            // Khai báo các biến để lưu trữ dữ liệu từ API
            chi_tiet_tour: {},
            list_tour_khac: [],
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
            this.id = newId; // Cập nhật lại ID mới
            this.LoadTour(); // Gọi lại hàm lấy dữ liệu
            this.scrollToTop(); // Cuộn trang lên đầu
        }
    },
    mounted() {
        this.LoadTour();
    },
    methods: {
        LoadTour() {
            var payload = { id: this.id };
            axios.post(apiUrl('client/chi-tiet-tour/get-data'), payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_client') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.chi_tiet_tour = res.data.data;
                        this.list_tour_khac = res.data.tour_khac.slice(0, 4);

                        // --- LOGIC XỬ LÝ ẢNH ---
                        let images = [];

                        // 1. Lấy ảnh từ các điểm đến trong lịch trình
                        if (this.chi_tiet_tour.lich_trinh) {
                            images = this.chi_tiet_tour.lich_trinh
                                .map(item => item.hinh_anh)
                                .filter(img => img != null); // Loại bỏ ảnh rỗng
                        }

                        // 2. Nếu chưa đủ 4 ảnh, thêm ảnh chính của tour vào cho đến khi đủ 4 hoặc hết chỗ
                        while (images.length < 4) {
                            images.push(this.chi_tiet_tour.hinh_anh);
                        }

                        // 3. Cắt lấy đúng 4 cái đầu tiên
                        this.list_hinh_anh = images.slice(0, 4);

                    }
                });
        },
        toggleOpenAll() {
            this.is_open_all = !this.is_open_all;
            if (this.is_open_all) {
                this.index_mo = null; // Reset mở lẻ khi đã mở tất cả
            }
        },
        // Logic khi bấm vào từng header lẻ
        toggleSingle(index) {
            if (this.is_open_all) {
                // Nếu đang mở tất cả mà bấm vào 1 cái, thì tắt mở tất cả và coi như chỉ mở cái đó
                this.is_open_all = false;
                this.index_mo = index;
            } else {
                // Logic đóng mở bình thường
                this.index_mo = (this.index_mo === index ? null : index);
            }
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        thucHienDatTour() {
            // 1. Kiểm tra Token ngay tại Client
            const token = localStorage.getItem('key_client');
            if (!token) {
                this.$toast.error("Vui lòng đăng nhập để thực hiện đặt tour.");
                this.$router.push('/client/dang-nhap'); // Điều hướng người dùng đến trang đăng nhập
                return;
            }

            // 2. Kiểm tra số lượng người còn trống tại Client để tối ưu trải nghiệm
            if (this.dat_tour.so_luong_nguoi > this.chi_tiet_tour.so_nguoi_toi_da) {
                this.$toast.warning("Rất tiếc, tour này chỉ còn " + this.chi_tiet_tour.so_nguoi_toi_da + " chỗ trống!");
                return;
            }

            // 3. Chuẩn bị dữ liệu gửi đi (Payload)
            var payload = {
                "id_tour": this.id,
                "so_luong_nguoi": this.dat_tour.so_luong_nguoi,
                "ghi_chu_danh_sach_nguoi_di": this.dat_tour.ghi_chu_danh_sach_nguoi_di,
                "phuong_thuc_thanh_toan": this.dat_tour.phuong_thuc_thanh_toan
            };

            // 4. Gọi API đặt tour
            axios
                .post(apiUrl("client/dat-tour/thanh-toan"), payload, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        // Thành công
                        this.$toast.success(res.data.message);

                        // Cập nhật lại số chỗ còn trống hiển thị trên giao diện
                        this.chi_tiet_tour.so_nguoi_toi_da -= this.dat_tour.so_luong_nguoi;

                        // Reset lại form đặt tour
                        this.dat_tour.so_luong_nguoi = 1;
                        this.dat_tour.ghi_chu_danh_sach_nguoi_di = '';

                        // Nếu có link QR code thanh toán từ backend, có thể mở nó tại đây
                        if (res.data.data && res.data.data.link_qr_code) {
                            // window.open(res.data.data.link_qr_code, '_blank');
                        }

                    } else {
                        // Thất bại (Lỗi logic từ Backend như hết chỗ, tour đóng...)
                        this.$toast.error(res.data.message);

                        // Nếu lỗi nghiêm trọng có thể đẩy về trang chủ
                        // this.$router.push('/');
                    }
                })
                .catch((err) => {
                    // Xử lý lỗi hệ thống hoặc lỗi 401/403/500
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
    /* Đảm bảo khoảng cách top phù hợp với độ cao của Header website bạn */
    top: 100px !important;
    transition: all 0.3s ease;
}

/* Hiệu ứng khi hover vào nút đặt tour cho giống iVIVU */
button:hover {
    filter: brightness(90%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>