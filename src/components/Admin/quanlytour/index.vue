<template>
    <div style="padding: 20px; background: #f5f7fa; min-height: 100vh;">
        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #333; margin: 0;">Quản lý Tour Du Lịch</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Quản lý, theo dõi danh sách và thông tin chi tiết các tour du
                lịch.</p>
        </div>

        <div
            style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div
                style="display: grid; grid-template-columns: 1fr 1fr 2fr 120px 150px; gap: 15px; align-items: flex-end;">
                <div>
                    <label
                        style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 5px; display: block;">Từ
                        ngày</label>
                    <input type="date" v-model="filter.tu_ngay"
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
                </div>
                <div>
                    <label
                        style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 5px; display: block;">Đến
                        ngày</label>
                    <input type="date" v-model="filter.den_ngay"
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
                </div>
                <div style="position: relative;">
                    <label
                        style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 5px; display: block;">Tìm
                        kiếm theo tên</label>
                    <input type="text" v-model="filter.keyword" placeholder="Nhập tên tour..." @input="applyFilters"
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
                    <i class="fa-solid fa-search"
                        style="position: absolute; right: 12px; bottom: 15px; color: #999;"></i>
                </div>
                <button @click="resetFilter" class="btn-reset">
                    <i class="fa-solid fa-rotate-right me-1"></i> Đặt Lại
                </button>
                <button @click="openAddModal" class="btn-add">
                    <i class="fa-solid fa-plus me-2"></i>Thêm Mới
                </button>
            </div>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                            <th
                                style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem; width: 60px;">
                                ID</th>
                            <th
                                style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem; width: 80px;">
                                Ảnh</th>
                            <th
                                style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem; width: 25%;">
                                Tên Tour</th>
                            <th
                                style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">
                                Lộ Trình</th>
                            <th
                                style="padding: 15px; text-align: right; font-weight: 600; color: #333; font-size: 0.9rem;">
                                Giá Vé</th>
                            <th
                                style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">
                                Lịch Trình</th>
                            <th
                                style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">
                                Trạng Thái</th>
                            <th
                                style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">
                                Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredTours.length === 0">
                            <td colspan="8" style="padding: 40px; text-align: center; color: #999;">
                                <i class="fa-solid fa-box-open me-2"
                                    style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                                Không tìm thấy dữ liệu tour nào
                            </td>
                        </tr>
                        <tr v-for="value in filteredTours" :key="value.id" class="data-row">
                            <td style="padding: 15px; text-align: center; color: #333; font-weight: 600;">{{ value.id }}
                            </td>
                            <td style="padding: 15px;">
                                <img v-if="value.hinh_anh" :src="value.hinh_anh" alt="Tour"
                                    style="width: 60px; height: 45px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <div v-else
                                    style="width: 60px; height: 45px; background: #f1f5f9; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #cbd5e1;">
                                    <i class="fa-solid fa-image"></i>
                                </div>
                            </td>
                            <td style="padding: 15px; color: #333; font-weight: 600;">{{ value.ten_tour }}</td>
                            <td style="padding: 15px; color: #555; font-size: 0.85rem; line-height: 1.6;">
                                <div style="color: #64748b;"><i class="fa-solid fa-location-dot me-1"
                                        style="color: #10b981;"></i> {{ value.diem_don }}</div>
                                <div style="color: #64748b; margin-top: 4px;"><i class="fa-solid fa-flag-checkered me-1"
                                        style="color: #ef4444;"></i> {{ value.diem_tra }}</div>
                            </td>
                            <td style="padding: 15px; text-align: right; color: #667eea; font-weight: 700;">{{
                                formatVND(value.gia) }}</td>
                            <td style="padding: 15px; text-align: center; font-size: 0.85rem; color: #666;">
                                <div>{{ formatDate(value.ngay_bat_dau) }}</div>
                                <i class="fa-solid fa-arrow-down"
                                    style="font-size: 0.7rem; color: #cbd5e1; margin: 2px 0;"></i>
                                <div>{{ formatDate(value.ngay_ket_thuc) }}</div>
                            </td>
                            <td style="padding: 15px; text-align: center;">
                                <button @click="changeStatus(value.id, value.tinh_trang == 1 ? 0 : 1)" :style="{
                                    border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                                    background: value.tinh_trang == 1 ? '#dcfce7' : '#fee2e2',
                                    color: value.tinh_trang == 1 ? '#16a34a' : '#dc2626'
                                }">
                                    {{ value.tinh_trang == 1 ? 'Hiển Thị' : 'Tạm Tắt' }}
                                </button>
                            </td>
                            <td style="padding: 15px; text-align: center;">
                                <div style="display: flex; gap: 8px; justify-content: center;">
                                    <button @click="openViewModal(value)" class="action-btn btn-view"
                                        title="Xem chi tiết">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <button @click="openEditModal(value)" class="action-btn btn-edit" title="Cập nhật">
                                        <i class="fa-solid fa-pen-nib"></i>
                                    </button>
                                    <button @click="openDeleteModal(value)" class="action-btn btn-delete"
                                        title="Xóa tour">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="showFormModal"
            style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div
                style="background: white; border-radius: 12px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div
                    :style="{ background: isEdit ? '#10b981' : 'linear-gradient(135deg, #667eea, #764ba2)', padding: '20px', color: 'white', position: 'sticky', top: '0', zIndex: '10', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
                    <h2 style="margin: 0; font-size: 1.3rem;">{{ isEdit ? 'Cập Nhật Tour' : 'Thêm Tour Mới' }}</h2>
                    <button @click="showFormModal = false"
                        style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
                </div>

                <div style="padding: 20px; color: #333;">
                    <div style="margin-bottom: 15px;">
                        <label class="form-label">Tên Tour <span style="color: red;">*</span></label>
                        <input type="text" class="custom-input" v-model="form.ten_tour" placeholder="Nhập tên tour...">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label class="form-label">Mô Tả</label>
                        <textarea class="custom-input" rows="3" v-model="form.mo_ta"
                            placeholder="Mô tả ngắn gọn về tour..."></textarea>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <div>
                            <label class="form-label">Điểm Đón</label>
                            <input type="text" class="custom-input" v-model="form.diem_don">
                        </div>
                        <div>
                            <label class="form-label">Điểm Trả</label>
                            <input type="text" class="custom-input" v-model="form.diem_tra">
                        </div>
                        <div>
                            <label class="form-label">Quốc Gia <span style="color: red;">*</span></label>
                            <select class="custom-input" v-model="form.id_quoc_gia">
                                <option value="" disabled>--- Chọn Quốc Gia ---</option>
                                <option v-for="qg in list_quoc_gia" :key="qg.id" :value="qg.id">
                                    {{ qg.ten_quoc_gia }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <div>
                            <label class="form-label">Giá Vé (VNĐ) <span style="color: red;">*</span></label>
                            <input type="number" class="custom-input" v-model.number="form.gia" min="0">
                        </div>
                        <div>
                            <label class="form-label">Ngày Khởi Hành</label>
                            <input type="date" class="custom-input" v-model="form.ngay_bat_dau">
                        </div>
                        <div>
                            <label class="form-label">Ngày Kết Thúc</label>
                            <input type="date" class="custom-input" v-model="form.ngay_ket_thuc">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                        <div>
                            <label class="form-label">Số Khách Tối Đa</label>
                            <input type="number" class="custom-input" v-model.number="form.so_nguoi_toi_da" min="1">
                        </div>
                        <div>
                            <label class="form-label">Trạng Thái</label>
                            <select class="custom-input" v-model.number="form.tinh_trang">
                                <option value="1">Hiển thị</option>
                                <option value="0">Tạm tắt</option>
                            </select>
                        </div>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label class="form-label">Đường dẫn Hình Ảnh (URL)</label>
                        <input type="text" class="custom-input" v-model="form.hinh_anh" placeholder="https://...">
                    </div>

                    <div
                        style="display: flex; gap: 15px; justify-content: flex-end; padding-top: 20px; border-top: 1px solid #eee;">
                        <button @click="showFormModal = false"
                            style="padding: 12px 20px; background: #f1f5f9; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Hủy
                            Bỏ</button>
                        <button @click="saveTour"
                            :style="{ background: isEdit ? '#10b981' : 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }">
                            {{ isEdit ? 'Lưu Cập Nhật' : 'Thêm Mới Dữ Liệu' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showViewModal"
            style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div
                style="background: white; border-radius: 12px; width: 90%; max-width: 900px; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div
                    style="background: #0ea5e9; padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 1.3rem;">Chi Tiết Tour</h2>
                    <button @click="showViewModal = false"
                        style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
                </div>

                <div style="padding: 30px; display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
                    <div>
                        <img v-if="view_tour.hinh_anh" :src="view_tour.hinh_anh"
                            style="width: 100%; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div v-else
                            style="width: 100%; height: 200px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #cbd5e1;">
                            <i class="fa-solid fa-image"></i>
                        </div>
                    </div>
                    <div>
                        <h3 style="color: #0ea5e9; margin: 0 0 20px 0;">{{ view_tour.ten_tour }}</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                            <div>
                                <span style="color: #64748b; font-size: 0.85rem; display: block;">Điểm Đón</span>
                                <strong style="color: #333;">{{ view_tour.diem_don }}</strong>
                            </div>
                            <div>
                                <span style="color: #64748b; font-size: 0.85rem; display: block;">Điểm Trả</span>
                                <strong style="color: #333;">{{ view_tour.diem_tra }}</strong>
                            </div>
                            <div>
                                <span style="color: #64748b; font-size: 0.85rem; display: block;">Khởi Hành</span>
                                <strong style="color: #333;">{{ formatDate(view_tour.ngay_bat_dau) }}</strong>
                            </div>
                            <div>
                                <span style="color: #64748b; font-size: 0.85rem; display: block;">Kết Thúc</span>
                                <strong style="color: #333;">{{ formatDate(view_tour.ngay_ket_thuc) }}</strong>
                            </div>
                            <div>
                                <span style="color: #64748b; font-size: 0.85rem; display: block;">Giá Vé</span>
                                <strong style="color: #ef4444; font-size: 1.1rem;">{{ formatVND(view_tour.gia)
                                }}</strong>
                            </div>
                            <div>
                                <span style="color: #64748b; font-size: 0.85rem; display: block;">Khách Tối Đa</span>
                                <strong style="color: #333;">{{ view_tour.so_nguoi_toi_da }} Người</strong>
                            </div>
                        </div>

                        <div v-if="view_tour.mo_ta" style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                            <h5 style="margin: 0 0 10px 0; color: #333; font-size: 0.95rem;">Mô Tả Chi Tiết:</h5>
                            <p
                                style="margin: 0; color: #555; white-space: pre-line; font-size: 0.9rem; line-height: 1.6;">
                                {{ view_tour.mo_ta }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showDeleteModal"
            style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div
                style="background: white; border-radius: 12px; width: 90%; max-width: 400px; padding: 30px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="font-size: 3.5rem; color: #ef4444; margin-bottom: 15px;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <h3 style="margin: 0 0 10px 0; color: #333;">Xác Nhận Xóa</h3>
                <p style="color: #666; margin: 0 0 25px 0;">
                    Bạn có chắc chắn muốn xóa tour <br><strong>{{ del_tour.ten_tour }}</strong>? <br>
                    <span style="font-size: 0.85rem; color: #999;">Hành động này không thể hoàn tác!</span>
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button @click="showDeleteModal = false"
                        style="padding: 12px; background: #f1f5f9; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Hủy
                        Bỏ</button>
                    <button @click="confirmDelete"
                        style="padding: 12px; background: #ef4444; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Xóa
                        Ngay</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    data() {
        return {
            list_tour: [],
            list_quoc_gia: [],
            filteredTours: [],
            filter: {
                tu_ngay: '',
                den_ngay: '',
                keyword: ''
            },

            showFormModal: false,
            showViewModal: false,
            showDeleteModal: false,
            isEdit: false,

            form: {
                id: null, ten_tour: '', mo_ta: '', gia: 0, ngay_bat_dau: '', ngay_ket_thuc: '', so_nguoi_toi_da: 1, diem_don: '', diem_tra: '', tinh_trang: 1, hinh_anh: '', id_quoc_gia: 1
            },
            view_tour: {},
            del_tour: {},
        }
    },
    mounted() {
        this.getTour();
        this.getQuocGia();
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(number || 0);
        },
        getQuocGia() {
            axios.get(apiUrl('admin/quoc-gia/get-data'), { // Thay đổi đường dẫn này theo API thực tế của bạn
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_quoc_gia = res.data.data;
                    }
                })
                .catch((error) => {
                    console.error('Lỗi lấy danh mục quốc gia:', error);
                });
        },
        getTour() {
            axios.get(apiUrl('admin/tour/get-data'), {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_tour = res.data.data;
                        this.applyFilters();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi lấy dữ liệu:', error);
                    this.$toast.error('Lỗi khi tải dữ liệu');
                });
        },

        applyFilters() {
            let result = this.list_tour.filter((tour) => {
                const matchKeyword = !this.filter.keyword || tour.ten_tour.toLowerCase().includes(this.filter.keyword.toLowerCase());
                const matchTuNgay = !this.filter.tu_ngay || new Date(tour.ngay_bat_dau) >= new Date(this.filter.tu_ngay);
                const matchDenNgay = !this.filter.den_ngay || new Date(tour.ngay_bat_dau) <= new Date(this.filter.den_ngay);
                return matchKeyword && matchTuNgay && matchDenNgay;
            });

            // Yêu cầu: Sắp xếp ID theo thứ tự tăng dần (1 -> 7)
            this.filteredTours = result.sort((a, b) => a.id - b.id);
        },

        resetFilter() {
            this.filter = { tu_ngay: '', den_ngay: '', keyword: '' };
            this.applyFilters();
        },

        openAddModal() {
            this.isEdit = false;
            this.form = { id: null, ten_tour: '', mo_ta: '', gia: 0, ngay_bat_dau: '', ngay_ket_thuc: '', so_nguoi_toi_da: 1, diem_don: '', diem_tra: '', tinh_trang: 1, hinh_anh: '', id_quoc_gia: 1 };
            this.showFormModal = true;
        },

        openEditModal(item) {
            this.isEdit = true;
            this.form = { ...item };
            this.showFormModal = true;
        },

        openViewModal(item) {
            this.view_tour = { ...item };
            this.showViewModal = true;
        },

        openDeleteModal(item) {
            this.del_tour = { ...item };
            this.showDeleteModal = true;
        },

        saveTour() {
            const url = this.isEdit ? 'admin/tour/update' : 'admin/tour/add-data';

            axios.post(apiUrl(url), this.form, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.showFormModal = false;
                        this.getTour();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.errors) {
                        const list = Object.values(error.response.data.errors);
                        list.forEach((v) => { this.$toast.error(v[0]); });
                    } else {
                        this.$toast.error('Lỗi hệ thống');
                    }
                });
        },

        confirmDelete() {
            axios.post(apiUrl('admin/tour/destroy'), { id: this.del_tour.id }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.showDeleteModal = false;
                        this.getTour();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(() => this.$toast.error('Lỗi khi xóa tour'));
        },

        changeStatus(id, newStatus) {
            axios.post(apiUrl('admin/tour/change-status'), { id: id, tinh_trang: newStatus }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.getTour();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(() => this.$toast.error('Lỗi khi đổi trạng thái'));
        }
    }
}
</script>

<style scoped>
.btn-reset {
    padding: 12px 15px;
    background: #f1f5f9;
    color: #64748b;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-reset:hover {
    background: #e2e8f0;
    color: #333;
}

.btn-add {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-add:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.data-row {
    border-bottom: 1px solid #e2e8f0;
    transition: background 0.2s;
}

.data-row:hover {
    background: #f8fafc !important;
}

.action-btn {
    width: 35px;
    height: 35px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border: none;
}

.btn-view {
    background: #e0f2fe;
    color: #0ea5e9;
}

.btn-view:hover {
    background: #0ea5e9;
    color: white;
}

.btn-edit {
    background: #f0f4f8;
    color: #764ba2;
}

.btn-edit:hover {
    background: #764ba2;
    color: white;
}

.btn-delete {
    background: #fee2e2;
    color: #ef4444;
}

.btn-delete:hover {
    background: #ef4444;
    color: white;
}

.form-label {
    display: block;
    font-weight: 600;
    color: #475569;
    margin-bottom: 6px;
    font-size: 0.9rem;
}

.custom-input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    font-family: inherit;
    transition: border-color 0.2s;
    background: #fff;
}

.custom-input:focus {
    outline: none;
    border-color: #667eea;
}
</style>