<template>
    <div>
        <div class="container">
            <h1 class="mt-3" style="color: rgb(143, 223, 181)">{{ chi_tiet_tour.ten_tour }}</h1>
            <div class="row">
                <div class="col-lg-12">
                    <span>Ngày khởi hành: {{ chi_tiet_tour.ngay_bat_dau }}</span>
                    <span class=" ms-4">Khởi hành từ: {{ chi_tiet_tour.diem_don }}</span>
                </div>
                <div class="col-lg-7">
                    <img style="width: 100%; height: 320px; border-radius: 15px; object-fit: cover;"
                        :src="chi_tiet_tour.hinh_anh" alt="">
                </div>
                <div class="col-lg-5">
                    <div class="row ">
                        <div v-for="(img, index) in list_hinh_anh" :key="index" class="col-lg-6 mb-3">
                            <div class="image-container">
                                <img :src="img" class="img-fluid rounded"
                                    style="width: 100%; height: 150px; object-fit: cover;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="card">
                        <div class="card-body">
                            <h3>Mô tả tour</h3>
                            <div>{{ chi_tiet_tour.mo_ta }}</div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="card">
                        <h3>Đặt tour</h3>
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
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
            </div>
            <div class="col-lg-7">
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
            index_mo: 0,
            is_open_all: false,
            is_policy_open: false
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
    }
}
</script>