<template>
    <div style="padding: 20px; background: #f5f7fa; min-height: 100vh;">
        <!-- Header -->
        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #333; margin: 0;">📅 Quản Lý Lịch Trình Tour</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Quản lý hoạt động và lịch trình chi tiết cho từng tour du lịch.
            </p>
        </div>

        <!-- Search & Filter Bar -->
        <div
            style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 15px; align-items: flex-end;">
                <!-- Search -->
                <div style="position: relative;">
                    <input v-model="searchQuery" type="text" placeholder="Tìm kiếm theo tên tour..." @input="filterData"
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    <i class="fa-solid fa-search"
                        style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999;"></i>
                </div>

                <!-- Reset Button -->
                <button @click="resetFilter" class="btn-primary-reset">
                    <i class="fa-solid fa-rotate-right me-2"></i>Làm Mới
                </button>

                <!-- Add Button -->
                <button @click="openAddModal" class="btn-primary-gradient">
                    <i class="fa-solid fa-plus me-2"></i>Thêm Hoạt Động
                </button>
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading"
            style="background: white; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: #667eea;"></i>
            <p style="margin: 15px 0 0 0; color: #666;">Đang tải dữ liệu...</p>
        </div>

        <!-- Tours grouped by ID -->
        <div v-else>
            <div v-if="filteredSchedules.length === 0"
                style="background: white; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <i class="fa-solid fa-inbox" style="font-size: 2rem; color: #ccc;"></i>
                <p style="margin: 15px 0 0 0; color: #999;">Không có lịch trình nào</p>
            </div>

            <div v-for="tour in filteredSchedules" :key="tour.id_tour"
                style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <!-- Tour Header -->
                <div
                    style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e2e8f0;">
                    <div>
                        <h2 style="margin: 0; color: #333; font-size: 1.2rem; font-weight: 700;">{{ tour.ten_tour }}
                        </h2>
                        <p style="margin: 5px 0 0 0; color: #999; font-size: 0.85rem;">Mã Tour: {{ tour.id_tour }} • {{
                            tour.danh_sach_lich_trinh.length }} hoạt động</p>
                    </div>
                    <button @click="openAddModalForTour(tour.id_tour)" class="btn-primary-gradient">
                        <i class="fa-solid fa-plus me-1"></i>Thêm Hoạt Động
                    </button>
                </div>

                <!-- Table -->
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                                <th
                                    style="padding: 12px 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem; width: 80px;">
                                    Ảnh</th>
                                <th
                                    style="padding: 12px 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">
                                    Nội Dung Hoạt Động</th>
                                <th
                                    style="padding: 12px 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">
                                    Điểm Đến</th>
                                <th
                                    style="padding: 12px 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">
                                    Phương Tiện</th>
                                <th
                                    style="padding: 12px 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">
                                    Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="tour.danh_sach_lich_trinh.length === 0">
                                <td colspan="4" style="padding: 20px; text-align: center; color: #999;">
                                    <i class="fa-solid fa-inbox me-2"></i>Chưa có hoạt động nào được thiết lập
                                </td>
                            </tr>
                            <tr v-for="lich_trinh in tour.danh_sach_lich_trinh" :key="lich_trinh.id"
                                style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;"
                                @mouseenter="(e) => e.currentTarget.style.background = '#f9fafb'"
                                @mouseleave="(e) => e.currentTarget.style.background = ''">
                                <td style="padding: 12px 15px;">
                                    <img v-if="lich_trinh.anh_diem_den" :src="lich_trinh.anh_diem_den"
                                        alt="Điểm đến"
                                        style="width: 60px; height: 45px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <div v-else
                                        style="width: 60px; height: 45px; background: #f1f5f9; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #cbd5e1;">
                                        <i class="fa-solid fa-map-location-dot"></i>
                                    </div>
                                </td>
                                <td style="padding: 12px 15px; color: #333;">{{ lich_trinh.tieu_de_hoat_dong }}</td>
                                <td style="padding: 12px 15px; color: #667eea; font-weight: 500;">{{
                                    lich_trinh.ten_diem_den || 'Không xác định' }}</td>
                                <td style="padding: 12px 15px; color: #666;">
                                    <span v-if="lich_trinh.loai_phuong_tien"
                                        style="display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0369a1; border-radius: 6px; font-size: 0.85rem; font-weight: 500;">
                                        {{ lich_trinh.loai_phuong_tien }} {{ lich_trinh.so_hieu ? '(' +
                                        lich_trinh.so_hieu + ')' : '' }}
                                    </span>
                                    <span v-else style="color: #999; font-size: 0.9rem;">Tự do / Đi bộ</span>
                                </td>
                                <td style="padding: 12px 15px; text-align: center;">
                                    <div style="display: flex; gap: 8px; justify-content: center;">
                                        <button @click="editSchedule(lich_trinh, tour.id_tour)"
                                            class="action-btn btn-edit" title="Chỉnh sửa">
                                            <i class="fa-solid fa-pen-nib"></i>
                                        </button>
                                        <button @click="deleteSchedule(lich_trinh.id)" class="action-btn btn-delete"
                                            title="Xóa">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showFormModal"
            style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div
                style="background: white; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 1.5rem;">{{ isEditing ? 'Chỉnh Sửa Hoạt Động' : 'Thêm Hoạt Động Mới' }}</h2>
                    <button @click="closeFormModal"
                        style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer;">×</button>
                </div>

                <form @submit.prevent="saveSchedule" style="color: #333;">
                    <!-- Tour Select -->
                    <div style="margin-bottom: 20px;">
                        <label
                            style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 8px; display: block;">Tour
                            *</label>
                        <select v-model="formData.id_tour" :disabled="isEditing"
                            style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; background: white; cursor: pointer;"
                            required>
                            <option value="">-- Chọn Tour --</option>
                            <option v-for="tour in tours" :key="tour.id" :value="tour.id">
                                {{ tour.ten_tour }}
                            </option>
                        </select>
                    </div>

                    <!-- Điểm Đến -->
                    <div style="margin-bottom: 20px;">
                        <label
                            style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 8px; display: block;">Điểm
                            Đến</label>
                        <select v-model="formData.id_diem_den"
                            style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; background: white; cursor: pointer;">
                            <option value="">-- Không chọn --</option>
                            <option v-for="diem in diemDens" :key="diem.id" :value="diem.id">
                                {{ diem.ten_diem_den }}
                            </option>
                        </select>
                    </div>

                    <!-- Phương Tiện -->
                    <div style="margin-bottom: 20px;">
                        <label
                            style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 8px; display: block;">Phương
                            Tiện</label>
                        <select v-model="formData.id_phuong_tien"
                            style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; background: white; cursor: pointer;">
                            <option value="">-- Không chọn / Đi bộ --</option>
                            <option v-for="phuong_tien in phuongTiens" :key="phuong_tien.id" :value="phuong_tien.id">
                                {{ phuong_tien.loai_phuong_tien }} {{ phuong_tien.so_hieu ? '(' + phuong_tien.so_hieu +
                                ')' : '' }}
                            </option>
                        </select>
                    </div>

                    <!-- Hoạt Động (Tiêu Đề) -->
                    <div style="margin-bottom: 20px;">
                        <label
                            style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 8px; display: block;">Nội
                            Dung Hoạt Động *</label>
                        <textarea v-model="formData.tieu_de_hoat_dong" placeholder="Nhập mô tả hoạt động..." rows="4"
                            maxlength="500"
                            style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; resize: vertical;"
                            required></textarea>
                        <p style="margin: 5px 0 0 0; color: #999; font-size: 0.85rem;">{{
                            formData.tieu_de_hoat_dong.length }}/500 ký tự</p>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" class="btn-primary-gradient" style="flex: 1;">
                            <i class="fa-solid fa-save me-2"></i>{{ isEditing ? 'Cập Nhật' : 'Lưu Hoạt Động' }}
                        </button>
                        <button type="button" @click="closeFormModal" class="btn-primary-reset" style="flex: 1;">
                            <i class="fa-solid fa-times me-2"></i>Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    name: 'LichTrinh',
    data() {
        return {
            schedules: [], // Đã được xử lý nhóm theo Tour
            filteredSchedules: [],
            searchQuery: '',
            loading: false,

            showFormModal: false,
            isEditing: false,

            // Dữ liệu mảng dành cho Select Box Options
            tours: [],
            diemDens: [],
            phuongTiens: [],

            // Biến chứa Data để gửi lên Backend
            formData: {
                id: '',
                id_tour: '',
                id_diem_den: '',
                id_phuong_tien: '',
                tieu_de_hoat_dong: ''
            }
        }
    },
    methods: {
        // 1. GỌI API LẤY DANH SÁCH LỊCH TRÌNH
        loadSchedules() {
            this.loading = true;
            axios.get(apiUrl('admin/lich-trinh/get-data'), {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then(res => {
                    if (res.data && res.data.status) {
                        const rawData = res.data.data;

                        // THUẬT TOÁN NHÓM (GROUP) DỮ LIỆU THEO id_tour ĐỂ VẼ GIAO DIỆN
                        const grouped = {};
                        rawData.forEach(item => {
                            if (!grouped[item.id_tour]) {
                                grouped[item.id_tour] = {
                                    id_tour: item.id_tour,
                                    ten_tour: item.ten_tour,
                                    danh_sach_lich_trinh: []
                                };
                            }
                            // Đẩy hoạt động chi tiết vào mảng của Tour đó
                            grouped[item.id_tour].danh_sach_lich_trinh.push(item);
                        });

                        this.schedules = Object.values(grouped);
                        this.filterData();
                    } else {
                        this.$toast.error(res.data?.message || 'Lỗi lấy dữ liệu');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.$toast.error('Lỗi kết nối máy chủ');
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 2. GỌI API LẤY DROPDOWN LIST CHO FORM
        loadDropdownData() {
            const config = { headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') } };

            // Lấy danh sách Tours
            axios.get(apiUrl('admin/tour/get-data'), config)
                .then(res => { if (res.data.status) this.tours = res.data.data; });

            // Lấy danh sách Phương tiện
            axios.get(apiUrl('admin/phuong-tien/get-data'), config)
                .then(res => { if (res.data.status) this.phuongTiens = res.data.data; });

            // Lưu ý: Đảm bảo bạn có sẵn Route API này dưới Backend, nếu chưa có thì cmt tạm đoạn này lại
            axios.get(apiUrl('admin/diem-den/get-data'), config)
                .then(res => { if (res.data.status) this.diemDens = res.data.data; }).catch(() => { });
        },

        // TÌM KIẾM THEO TÊN TOUR
        filterData() {
            this.filteredSchedules = this.schedules.filter(tour => {
                return tour.ten_tour && tour.ten_tour.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        resetFilter() {
            this.searchQuery = '';
            this.filterData();
            this.loadSchedules();
        },

        // HIỂN THỊ FORM
        openAddModal() {
            this.formData = { id: '', id_tour: '', id_diem_den: '', id_phuong_tien: '', tieu_de_hoat_dong: '' };
            this.isEditing = false;
            this.showFormModal = true;
        },
        openAddModalForTour(id_tour) {
            this.openAddModal();
            this.formData.id_tour = id_tour;
        },
        editSchedule(lich_trinh, id_tour) {
            this.formData = {
                id: lich_trinh.id,
                id_tour: id_tour,
                id_diem_den: lich_trinh.id_diem_den || '',
                id_phuong_tien: lich_trinh.id_phuong_tien || '',
                tieu_de_hoat_dong: lich_trinh.tieu_de_hoat_dong
            };
            this.isEditing = true;
            this.showFormModal = true;
        },
        closeFormModal() {
            this.showFormModal = false;
        },

        // LƯU HOẠT ĐỘNG (THÊM HOẶC CẬP NHẬT)
        saveSchedule() {
            const url = this.isEditing ? 'admin/lich-trinh/update' : 'admin/lich-trinh/add-data';
            axios.post(apiUrl(url), this.formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then(res => {
                    if (res.data && res.data.status) {
                        this.$toast.success(res.data.message);
                        this.closeFormModal();
                        this.loadSchedules(); // Tải lại dữ liệu sau khi lưu
                    } else {
                        this.$toast.error(res.data?.message || 'Lỗi thao tác');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.$toast.error('Có lỗi xảy ra khi lưu');
                });
        },

        // XÓA HOẠT ĐỘNG
        deleteSchedule(id) {
            if (confirm('Bạn chắc chắn muốn xóa hoạt động này? Hành động này không thể hoàn tác.')) {
                axios.post(apiUrl('admin/lich-trinh/delete'), { id: id }, {
                    headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
                })
                    .then(res => {
                        if (res.data && res.data.status) {
                            this.$toast.success(res.data.message);
                            this.loadSchedules();
                        } else {
                            this.$toast.error(res.data?.message || 'Lỗi khi xóa');
                        }
                    })
                    .catch(err => this.$toast.error('Lỗi máy chủ'));
            }
        }
    },
    mounted() {
        this.loadSchedules();
        this.loadDropdownData();
    }
}
</script>

<style scoped>
/* Giữ nguyên toàn bộ phần CSS cũ của bạn */
.btn-primary-gradient {
    padding: 12px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: inherit;
    font-size: 0.9rem;
}

.btn-primary-gradient:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary-reset {
    padding: 12px 20px;
    background: #e2e8f0;
    color: #333;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    font-family: inherit;
    font-size: 0.9rem;
}

.btn-primary-reset:hover {
    background: #cbd5e1;
}

.action-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    transition: all 0.2s;
}

.btn-edit {
    background: #fef3c7;
    color: #d97706;
}

.btn-edit:hover {
    background: #fcd34d;
    transform: scale(1.05);
}

.btn-delete {
    background: #fee2e2;
    color: #dc2626;
}

.btn-delete:hover {
    background: #fecaca;
    transform: scale(1.05);
}

.me-2 {
    margin-right: 8px;
}

.me-1 {
    margin-right: 4px;
}
</style>