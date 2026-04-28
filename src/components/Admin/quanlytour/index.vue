<template>
    <div class="card border-top border-0 border-4 border-info">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-lg-3 col-md-6">
                    <label for="">Từ ngày (Khởi hành)</label>
                    <input type="date" class="form-control mt-2 mb-2 w-100" v-model="filter.tu_ngay">
                </div>
                <div class="col-lg-3 col-md-6">
                    <label for="">Đến ngày (Khởi hành)</label>
                    <input type="date" class="form-control mt-2 mb-2" v-model="filter.den_ngay">
                </div>
                <div class="col-lg-4 col-md-12">
                    <label for="">Từ khóa tìm kiếm</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Nhập tên tour..." v-model="filter.keyword">
                </div>
                <div class="col-lg-1 col-md-6">
                    <label for="">&nbsp;</label>
                    <button class="btn btn-primary w-100" @click="applyFilters">Lọc</button>
                </div>
                <div class="col-lg-1 col-md-6">
                    <label for="">&nbsp;</label>
                    <button class="btn btn-secondary w-100" @click="resetFilter">Đặt Lại</button>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-top border-0 border-4 border-info">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mt-2">DANH SÁCH TOUR</h5>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal" @click="resetCreateForm()">
                <i class="fas fa-plus me-1"></i> Thêm Tour Mới
            </button>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="align-middle">
                        <tr class="text-center table-info">
                            <th class="align-middle">#</th>
                            <th style="width: 80px;">Hình Ảnh</th>
                            <th>Tên Tour</th>
                            <th>Lộ Trình</th>
                            <th>Giá Vé</th>
                            <th>Thời Gian</th>
                            <th>Tối Đa</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredTours.length === 0">
                            <td colspan="9" class="text-center py-4 text-muted">Không có dữ liệu tour nào</td>
                        </tr>
                        <template v-for="(value, index) in filteredTours" :key="index">
                            <tr class="align-middle">
                                <td class="align-middle text-center">{{ index + 1 }}</td>
                                <td class="align-middle text-center">
                                    <img v-if="value.hinh_anh" :src="value.hinh_anh" alt="img" style="width: 60px; height: 45px; object-fit: cover; border-radius: 4px;">
                                    <i v-else class="fas fa-image text-muted fs-3"></i>
                                </td>
                                <td class="align-middle fw-bold">{{ value.ten_tour }}</td>
                                <td class="align-middle">
                                    <small><b>Đón:</b> {{ value.diem_don }}</small><br>
                                    <small><b>Trả:</b> {{ value.diem_tra }}</small>
                                </td>
                                <td class="align-middle text-end text-danger fw-bold">{{ formatVND(value.gia) }}</td>
                                <td class="align-middle text-center">
                                    <small>{{ formatDate(value.ngay_bat_dau) }}<br>đến<br>{{ formatDate(value.ngay_ket_thuc) }}</small>
                                </td>
                                <td class="align-middle text-center">{{ value.so_nguoi_toi_da }} khách</td>
                                <td class="align-middle text-center" style="width: 120px;">
                                    <button v-if="value.tinh_trang == 0" @click="changeStatus(value.id, 1)"
                                        class="btn btn-warning btn-sm w-100 text-dark fw-bold">Tạm Tắt</button>
                                    <button v-else @click="changeStatus(value.id, 0)" 
                                        class="btn btn-success btn-sm w-100 fw-bold">Hiển Thị</button>
                                </td>
                                <td class="align-middle text-center" style="min-width: 140px;">
                                    <button v-on:click="Object.assign(view_tour, value)"
                                        class="btn btn-info btn-sm me-1" data-bs-toggle='modal'
                                        data-bs-target='#chiTietModal' style="color: white;" title="Xem chi tiết">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn-success btn-sm me-1" data-bs-toggle='modal'
                                        data-bs-target='#updateModal'
                                        v-on:click="Object.assign(edit_tour, value)" title="Cập nhật">
                                        <i class="fa-solid fa-pen-nib"></i>
                                    </button>
                                    <button v-on:click="Object.assign(del_tour, value)"
                                        class="btn btn-danger btn-sm" data-bs-toggle='modal'
                                        data-bs-target='#huyModal' title="Xóa tour">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="modal-title text-white">Thêm Tour Mới</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="fw-bold">Tên Tour <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" v-model="create_tour.ten_tour" placeholder="Nhập tên tour" />
                    </div>
                    <div class="mb-3">
                        <label class="fw-bold">Mô tả <span class="text-danger">*</span></label>
                        <textarea class="form-control" rows="3" v-model="create_tour.mo_ta" placeholder="Mô tả ngắn gọn về tour..."></textarea>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Điểm Đón</label>
                            <input type="text" class="form-control" v-model="create_tour.diem_don" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Điểm Trả</label>
                            <input type="text" class="form-control" v-model="create_tour.diem_tra" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">ID Quốc Gia</label>
                            <input type="number" class="form-control" v-model.number="create_tour.id_quoc_gia" min="1" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Giá Vé (VNĐ) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control" v-model.number="create_tour.gia" min="0" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Ngày Khởi Hành</label>
                            <input type="date" class="form-control" v-model="create_tour.ngay_bat_dau" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Ngày Kết Thúc</label>
                            <input type="date" class="form-control" v-model="create_tour.ngay_ket_thuc" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 mb-3">
                            <label class="fw-bold">Số Khách Tối Đa</label>
                            <input type="number" class="form-control" v-model.number="create_tour.so_nguoi_toi_da" min="1" />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label class="fw-bold">Trạng Thái</label>
                            <select class="form-select" v-model.number="create_tour.tinh_trang">
                                <option value="1">Hiển thị</option>
                                <option value="0">Tạm tắt</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="fw-bold">Đường dẫn Hình Ảnh (URL)</label>
                        <input type="text" class="form-control" v-model="create_tour.hinh_anh" placeholder="https://..." />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="themTour()">Thêm Mới</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-success">
                    <h5 class="modal-title text-white">Cập Nhật Tour</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="fw-bold">Tên Tour</label>
                        <input type="text" class="form-control border-success" v-model="edit_tour.ten_tour" />
                    </div>
                    <div class="mb-3">
                        <label class="fw-bold">Mô tả</label>
                        <textarea class="form-control border-success" rows="3" v-model="edit_tour.mo_ta"></textarea>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Điểm Đón</label>
                            <input type="text" class="form-control border-success" v-model="edit_tour.diem_don" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Điểm Trả</label>
                            <input type="text" class="form-control border-success" v-model="edit_tour.diem_tra" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">ID Quốc Gia</label>
                            <input type="number" class="form-control border-success" v-model.number="edit_tour.id_quoc_gia" min="1" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Giá Vé (VNĐ)</label>
                            <input type="number" class="form-control border-success" v-model.number="edit_tour.gia" min="0" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Ngày Khởi Hành</label>
                            <input type="date" class="form-control border-success" v-model="edit_tour.ngay_bat_dau" />
                        </div>
                        <div class="col-lg-4 mb-3">
                            <label class="fw-bold">Ngày Kết Thúc</label>
                            <input type="date" class="form-control border-success" v-model="edit_tour.ngay_ket_thuc" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 mb-3">
                            <label class="fw-bold">Số Khách Tối Đa</label>
                            <input type="number" class="form-control border-success" v-model.number="edit_tour.so_nguoi_toi_da" min="1" />
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label class="fw-bold">Trạng Thái</label>
                            <select class="form-select border-success" v-model.number="edit_tour.tinh_trang">
                                <option value="1">Hiển thị</option>
                                <option value="0">Tạm tắt</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="fw-bold">Hình Ảnh (URL)</label>
                        <input type="text" class="form-control border-success" v-model="edit_tour.hinh_anh" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="capNhatTour()">Lưu Thay Đổi</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="chiTietModal" tabindex="-1" aria-labelledby="chiTietModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h5 class="modal-title text-white" id="chiTietModalLabel">Chi Tiết Tour</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-4 text-center">
                            <img v-if="view_tour.hinh_anh" :src="view_tour.hinh_anh" class="img-fluid rounded border shadow-sm" style="max-height: 300px; object-fit: cover;">
                            <div v-else class="bg-light d-flex align-items-center justify-content-center rounded border" style="height: 300px;">
                                <i class="fas fa-image text-muted" style="font-size: 64px;"></i>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <h4 class="text-primary mb-3">{{ view_tour.ten_tour }}</h4>
                            <table class="table table-bordered table-striped">
                                <tbody>
                                    <tr>
                                        <th style="width: 30%;">Điểm Đón</th>
                                        <td>{{ view_tour.diem_don }}</td>
                                    </tr>
                                    <tr>
                                        <th>Điểm Trả</th>
                                        <td>{{ view_tour.diem_tra }}</td>
                                    </tr>
                                    <tr>
                                        <th>Giá Vé</th>
                                        <td class="text-danger fw-bold">{{ formatVND(view_tour.gia) }}</td>
                                    </tr>
                                    <tr>
                                        <th>Khởi Hành</th>
                                        <td>{{ formatDate(view_tour.ngay_bat_dau) }}</td>
                                    </tr>
                                    <tr>
                                        <th>Kết Thúc</th>
                                        <td>{{ formatDate(view_tour.ngay_ket_thuc) }}</td>
                                    </tr>
                                    <tr>
                                        <th>Khách Tối Đa</th>
                                        <td>{{ view_tour.so_nguoi_toi_da }} Người</td>
                                    </tr>
                                    <tr>
                                        <th>Trạng Thái</th>
                                        <td>
                                            <span v-if="view_tour.tinh_trang == 1" class="badge bg-success">Hiển thị</span>
                                            <span v-else class="badge bg-warning text-dark">Tạm tắt</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="view_tour.mo_ta" class="mt-3">
                                <h6 class="fw-bold border-bottom pb-2">Mô Tả Chi Tiết:</h6>
                                <p style="white-space: pre-line;">{{ view_tour.mo_ta }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="huyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Xóa Tour</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fas fa-exclamation-triangle"></i></div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-dark">Cảnh Báo</h6>
                                <div class="text-dark mt-1">
                                    <span>Bạn muốn xóa tour <b>{{ del_tour.ten_tour }}</b> này?</span> <br>
                                    <span><b>Lưu ý:</b> Điều này không thể hoàn tác!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-danger" v-on:click="xoaTour()" data-bs-dismiss="modal">Xác Nhận Xóa</button>
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
            filteredTours: [],
            filter: {
                tu_ngay: '',
                den_ngay: '',
                keyword: ''
            },
            create_tour: {
                ten_tour: '', mo_ta: '', gia: 0, ngay_bat_dau: '', ngay_ket_thuc: '', so_nguoi_toi_da: 1, diem_don: '', diem_tra: '', tinh_trang: 1, hinh_anh: '', id_quoc_gia: 1
            },
            edit_tour: {},
            view_tour: {},
            del_tour: {},
        }
    },
    mounted() {
        this.getTour();
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
        getTour() {
            axios.get(apiUrl('admin/tour/get-data'), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then((res) => {
                if (res.data.status) {
                    this.list_tour = res.data.data;
                    this.filteredTours = this.list_tour;
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching tours:', error);
                if(error.response && error.response.data && error.response.data.errors) {
                    const list = Object.values(error.response.data.errors);
                    list.forEach((v) => { this.$toast.error(v[0]); });
                } else if(error.response) {
                    this.$toast.error(error.response.data?.message || 'Lỗi khi tải dữ liệu');
                } else {
                    this.$toast.error('Lỗi kết nối API. Vui lòng kiểm tra kết nối mạng.');
                }
            });
        },
        applyFilters() {
            this.filteredTours = this.list_tour.filter((tour) => {
                const matchKeyword = !this.filter.keyword || tour.ten_tour.toLowerCase().includes(this.filter.keyword.toLowerCase());
                const matchTuNgay = !this.filter.tu_ngay || new Date(tour.ngay_bat_dau) >= new Date(this.filter.tu_ngay);
                const matchDenNgay = !this.filter.den_ngay || new Date(tour.ngay_bat_dau) <= new Date(this.filter.den_ngay);
                return matchKeyword && matchTuNgay && matchDenNgay;
            });
        },
        resetFilter() {
            this.filter = { tu_ngay: '', den_ngay: '', keyword: '' };
            this.filteredTours = this.list_tour;
        },
        themTour() {
            axios.post(apiUrl('admin/tour/add-data'), this.create_tour, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
            .then((res) => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.resetCreateForm();
                    this.getTour();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error('Error adding tour:', error);
                if(error.response && error.response.data && error.response.data.errors) {
                    const list = Object.values(error.response.data.errors);
                    list.forEach((v) => { this.$toast.error(v[0]); });
                } else if(error.response) {
                    this.$toast.error(error.response.data?.message || 'Lỗi khi thêm tour');
                } else {
                    this.$toast.error('Lỗi kết nối API. Vui lòng kiểm tra kết nối mạng.');
                }
            });
        },
        capNhatTour() {
            axios.post(apiUrl('admin/tour/update'), this.edit_tour, {
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
            .catch((error) => {
                console.error('Error updating tour:', error);
                if(error.response && error.response.data && error.response.data.errors) {
                    const list = Object.values(error.response.data.errors);
                    list.forEach((v) => { this.$toast.error(v[0]); });
                } else if(error.response) {
                    this.$toast.error(error.response.data?.message || 'Lỗi khi cập nhật tour');
                } else {
                    this.$toast.error('Lỗi kết nối API. Vui lòng kiểm tra kết nối mạng.');
                }
            });
        },
        xoaTour() {
            axios.post(apiUrl('admin/tour/destroy'), { id: this.del_tour.id }, {
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
            .catch((error) => {
                console.error('Error deleting tour:', error);
                if(error.response && error.response.data && error.response.data.errors) {
                    const list = Object.values(error.response.data.errors);
                    list.forEach((v) => { this.$toast.error(v[0]); });
                } else if(error.response) {
                    this.$toast.error(error.response.data?.message || 'Lỗi khi xóa tour');
                } else {
                    this.$toast.error('Lỗi kết nối API. Vui lòng kiểm tra kết nối mạng.');
                }
            });
        },
        changeStatus(id, status) {
            axios.post(apiUrl('admin/tour/change-status'), { id: id, tinh_trang: status }, {
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
            .catch((error) => {
                console.error('Error changing tour status:', error);
                if(error.response && error.response.data && error.response.data.errors) {
                    const list = Object.values(error.response.data.errors);
                    list.forEach((v) => { this.$toast.error(v[0]); });
                } else if(error.response) {
                    this.$toast.error(error.response.data?.message || 'Lỗi khi thay đổi trạng thái');
                } else {
                    this.$toast.error('Lỗi kết nối API. Vui lòng kiểm tra kết nối mạng.');
                }
            });
        },
        resetCreateForm() {
            this.create_tour = { ten_tour: '', mo_ta: '', gia: 0, ngay_bat_dau: '', ngay_ket_thuc: '', so_nguoi_toi_da: 1, diem_don: '', diem_tra: '', tinh_trang: 1, hinh_anh: '', id_quoc_gia: 1 };
        }
    },
}
</script>

<style scoped>
/* Không cần custom style vì đã dùng chuẩn bootstrap của template */
</style>