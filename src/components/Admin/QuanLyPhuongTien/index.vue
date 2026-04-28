<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between">
                    <h4 class="mt-2">DANH SÁCH PHƯƠNG TIỆN</h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                        Thêm phương tiện
                    </button>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bx bx-search"></i>
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Tìm kiếm theo tên phương tiện, biển số…"
                                    v-model="searchKeyword"
                                    @keyup="applyFilters"
                                />
                            </div>
                        </div>

                        <div class="col-md-4">
                            <select class="form-select" v-model="selectedType" @change="applyFilters">
                                <option value="">Tất cả loại phương tiện</option>
                                <option value="xe-buyt">Xe buýt</option>
                                <option value="xe-du-lich">Xe du lịch</option>
                                <option value="xe-7-cho">Xe 7 chỗ</option>
                                <option value="xe-4-cho">Xe 4 chỗ</option>
                                <option value="xe-tai">Xe tải</option>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <select class="form-select" v-model="selectedStatus" @change="applyFilters">
                                <option value="">Tất cả trạng thái</option>
                                <option value="1">Hoạt động</option>
                                <option value="2">Bảo trì</option>
                                <option value="3">Ngưng hoạt động</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="bg-primary text-light text-nowrap">
                                    <th class="text-center">#</th>
                                    <th class="text-center">Hình ảnh</th>
                                    <th class="text-center">Tên phương tiện</th>
                                    <th class="text-center">Loại phương tiện</th>
                                    <th class="text-center">Biển số</th>
                                    <th class="text-center">Số chỗ</th>
                                    <th class="text-center">Trạng thái</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="filteredVehicles.length === 0">
                                    <td colspan="8" class="text-center py-4 text-muted">
                                        Không có phương tiện nào
                                    </td>
                                </tr>
                                <tr v-for="(vehicle, index) in paginatedVehicles" :key="vehicle.id">
                                    <th class="align-middle text-center">{{ (currentPage - 1) * pageSize + index + 1 }}</th>
                                    <td class="align-middle text-center" style="width: 100px;">
                                        <img 
                                            :src="vehicle.image || 'https://via.placeholder.com/100x80?text=No+Image'" 
                                            alt="Hình ảnh" 
                                            class="img-fluid rounded"
                                            style="height: 80px; object-fit: cover; width: 100%;">
                                    </td>
                                    <td class="align-middle">{{ vehicle.name }}</td>
                                    <td class="align-middle text-center">
                                        <span class="badge bg-info">{{ getVehicleTypeName(vehicle.type) }}</span>
                                    </td>
                                    <td class="align-middle text-center">{{ vehicle.licenseplate }}</td>
                                    <td class="align-middle text-center">{{ vehicle.seats }}</td>
                                    <td class="align-middle text-center text-nowrap">
                                        <button 
                                            v-if="vehicle.status == 1"
                                            class="btn btn-success btn-sm">
                                            Hoạt động
                                        </button>
                                        <button 
                                            v-else-if="vehicle.status == 2"
                                            class="btn btn-warning btn-sm">
                                            Bảo trì
                                        </button>
                                        <button 
                                            v-else
                                            class="btn btn-danger btn-sm">
                                            Ngưng hoạt động
                                        </button>
                                    </td>
                                    <td class="align-middle text-center text-nowrap" style="width: 200px;">
                                        <button 
                                            class="btn btn-info text-light me-2 btn-sm" 
                                            @click="Object.assign(view_vehicle, vehicle)"
                                            data-bs-toggle="modal"
                                            data-bs-target="#viewModal">
                                            <i class="bx bx-eye"></i> Xem
                                        </button>
                                        <button 
                                            class="btn btn-warning text-light me-2 btn-sm" 
                                            @click="Object.assign(edit_vehicle, vehicle)"
                                            data-bs-toggle="modal"
                                            data-bs-target="#updateModal">
                                            <i class="bx bx-edit"></i> Sửa
                                        </button>
                                        <button 
                                            class="btn btn-danger btn-sm" 
                                            @click="Object.assign(del_vehicle, vehicle)"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteModal">
                                            <i class="bx bx-trash"></i> Xóa
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="d-flex justify-content-between align-items-center mt-4" v-if="getTotalPages() > 0">
                        <div class="text-muted">
                            Hiển thị {{ (currentPage - 1) * pageSize + 1 }} đến
                            {{ Math.min(currentPage * pageSize, filteredVehicles.length) }} của
                            {{ filteredVehicles.length }} phương tiện
                        </div>

                        <nav v-if="getTotalPages() > 1" aria-label="Page navigation">
                            <ul class="pagination mb-0">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <a class="page-link" href="javascript:;" @click="previousPage">Trước</a>
                                </li>

                                <li
                                    v-for="page in getVisiblePages()"
                                    :key="page"
                                    class="page-item"
                                    :class="{ active: page === currentPage }"
                                >
                                    <a class="page-link" href="javascript:;" @click="goToPage(page)">{{ page }}</a>
                                </li>

                                <li class="page-item" :class="{ disabled: currentPage === getTotalPages() }">
                                    <a class="page-link" href="javascript:;" @click="nextPage">Sau</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Thêm Mới -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thêm Phương Tiện Mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên phương tiện *</label>
                        <input type="text" class="form-control mt-1" v-model="create_vehicle.name" />
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Loại phương tiện *</label>
                                <select class="form-select mt-1" v-model="create_vehicle.type">
                                    <option value="">Chọn loại</option>
                                    <option value="xe-buyt">Xe buýt</option>
                                    <option value="xe-du-lich">Xe du lịch</option>
                                    <option value="xe-7-cho">Xe 7 chỗ</option>
                                    <option value="xe-4-cho">Xe 4 chỗ</option>
                                    <option value="xe-tai">Xe tải</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Biển số xe *</label>
                                <input type="text" class="form-control mt-1" v-model="create_vehicle.licenseplate" placeholder="VD: 51F-12345" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Số chỗ ngồi *</label>
                                <input type="number" class="form-control mt-1" v-model.number="create_vehicle.seats" min="1" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Trạng thái *</label>
                                <select class="form-select mt-1" v-model.number="create_vehicle.status">
                                    <option value="">Chọn trạng thái</option>
                                    <option :value="1">Hoạt động</option>
                                    <option :value="2">Bảo trì</option>
                                    <option :value="3">Ngưng hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label>Hình ảnh</label>
                        <input type="text" class="form-control mt-1" v-model="create_vehicle.image" placeholder="URL hình ảnh" />
                    </div>
                    <div class="mb-2">
                        <label>Mô tả</label>
                        <textarea class="form-control mt-1" rows="3" v-model="create_vehicle.description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Hủy
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="themPhuongTien()">
                        Thêm mới
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập Nhật Phương Tiện</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên phương tiện *</label>
                        <input type="text" class="form-control mt-1" v-model="edit_vehicle.name" />
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Loại phương tiện *</label>
                                <select class="form-select mt-1" v-model="edit_vehicle.type">
                                    <option value="">Chọn loại</option>
                                    <option value="xe-buyt">Xe buýt</option>
                                    <option value="xe-du-lich">Xe du lịch</option>
                                    <option value="xe-7-cho">Xe 7 chỗ</option>
                                    <option value="xe-4-cho">Xe 4 chỗ</option>
                                    <option value="xe-tai">Xe tải</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Biển số xe *</label>
                                <input type="text" class="form-control mt-1" v-model="edit_vehicle.licenseplate" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Số chỗ ngồi *</label>
                                <input type="number" class="form-control mt-1" v-model.number="edit_vehicle.seats" min="1" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Trạng thái *</label>
                                <select class="form-select mt-1" v-model.number="edit_vehicle.status">
                                    <option value="">Chọn trạng thái</option>
                                    <option :value="1">Hoạt động</option>
                                    <option :value="2">Bảo trì</option>
                                    <option :value="3">Ngưng hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label>Hình ảnh</label>
                        <input type="text" class="form-control mt-1" v-model="edit_vehicle.image" />
                    </div>
                    <div class="mb-2">
                        <label>Mô tả</label>
                        <textarea class="form-control mt-1" rows="3" v-model="edit_vehicle.description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Hủy
                    </button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="capNhatPhuongTien()">
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xem Chi Tiết -->
    <div class="modal fade" id="viewModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chi Tiết Phương Tiện</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img 
                                v-if="view_vehicle.image"
                                :src="view_vehicle.image"
                                :alt="view_vehicle.name"
                                class="img-fluid rounded"
                                style="max-height: 300px; object-fit: cover;">
                            <div v-else class="text-muted">Không có hình ảnh</div>
                        </div>
                        <div class="col-md-8">
                            <h4 class="mb-3">{{ view_vehicle.name }}</h4>
                            <table class="table table-sm">
                                <tr>
                                    <td class="fw-bold">Loại phương tiện:</td>
                                    <td>{{ getVehicleTypeName(view_vehicle.type) }}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold">Biển số:</td>
                                    <td>{{ view_vehicle.licenseplate }}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold">Số chỗ ngồi:</td>
                                    <td>{{ view_vehicle.seats }}</td>
                                </tr>
                                <tr>
                                    <td class="fw-bold">Trạng thái:</td>
                                    <td>
                                        <span 
                                            :class="{
                                                'badge bg-success': view_vehicle.status === 1,
                                                'badge bg-warning': view_vehicle.status === 2,
                                                'badge bg-danger': view_vehicle.status === 3,
                                            }">
                                            {{ getStatusName(view_vehicle.status) }}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            <div v-if="view_vehicle.description" class="mt-3">
                                <strong>Mô tả:</strong>
                                <p>{{ view_vehicle.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xóa Phương Tiện</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="bx bx-info-circle"></i></div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-dark">Bạn có chắc chắn muốn xóa phương tiện
                                    <b>{{ del_vehicle.name }}</b>
                                    này không?
                                </h6>
                                <div class="text-dark"><b>Lưu ý: </b>Điều này không thể hoàn tác khi nhấn xác nhận</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Hủy Bỏ
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="xoaPhuongTien()">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api'

export default {
    data() {
        return {
            list_vehicle: [],
            filteredVehicles: [],
            paginatedVehicles: [],
            searchKeyword: '',
            selectedType: '',
            selectedStatus: '',
            currentPage: 1,
            pageSize: 10,
            create_vehicle: {
                name: '',
                type: '',
                licenseplate: '',
                seats: '',
                status: '',
                image: '',
                description: '',
            },
            edit_vehicle: {
                id: '',
                name: '',
                type: '',
                licenseplate: '',
                seats: '',
                status: '',
                image: '',
                description: '',
            },
            del_vehicle: {
                id: '',
                name: '',
            },
            view_vehicle: {
                id: '',
                name: '',
                type: '',
                licenseplate: '',
                seats: '',
                status: '',
                image: '',
                description: '',
            },
        }
    },
    methods: {
        loadDataPhuongTien() {
            axios
                .get(apiUrl('admin/phuong-tien/get-data'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_vehicle = res.data.data;
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                    this.applyFilters();
                })
                .catch((res) => {
                    if (res.response && res.response.data.errors) {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error(res.response.data.message);
                    }
                });
        },
        themPhuongTien() {
            axios
                .post(apiUrl('admin/phuong-tien/add'), this.create_vehicle, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataPhuongTien();
                        this.$toast.success(res.data.message);
                        this.create_vehicle = {
                            name: '',
                            type: '',
                            licenseplate: '',
                            seats: '',
                            status: '',
                            image: '',
                            description: '',
                        };
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    if (res.response && res.response.data.errors) {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error(res.response.data.message);
                    }
                });
        },
        capNhatPhuongTien() {
            axios
                .post(apiUrl('admin/phuong-tien/update'), this.edit_vehicle, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataPhuongTien();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    if (res.response && res.response.data.errors) {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error(res.response.data.message);
                    }
                });
        },
        xoaPhuongTien() {
            axios
                .post(apiUrl('admin/phuong-tien/delete'), this.del_vehicle, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataPhuongTien();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    if (res.response && res.response.data.errors) {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error(res.response.data.message);
                    }
                });
        },
        applyFilters() {
            this.filteredVehicles = this.list_vehicle.filter((vehicle) => {
                const matchesSearch =
                    !this.searchKeyword ||
                    (vehicle.name && vehicle.name.toLowerCase().includes(this.searchKeyword.toLowerCase())) ||
                    (vehicle.licenseplate && vehicle.licenseplate.toLowerCase().includes(this.searchKeyword.toLowerCase()));

                const matchesType =
                    !this.selectedType || vehicle.type === this.selectedType;

                const matchesStatus =
                    !this.selectedStatus ||
                    vehicle.status === parseInt(this.selectedStatus);

                return matchesSearch && matchesType && matchesStatus;
            });

            this.currentPage = 1;
            this.updatePaginatedVehicles();
        },
        updatePaginatedVehicles() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            this.paginatedVehicles = this.filteredVehicles.slice(start, end);
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePaginatedVehicles();
            }
        },
        nextPage() {
            if (this.currentPage < this.getTotalPages()) {
                this.currentPage++;
                this.updatePaginatedVehicles();
            }
        },
        getTotalPages() {
            return Math.ceil(this.filteredVehicles.length / this.pageSize);
        },
        getVisiblePages() {
            const pages = [];
            const maxVisible = 5;
            let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
            let end = Math.min(this.getTotalPages(), start + maxVisible - 1);

            if (end - start < maxVisible - 1) {
                start = Math.max(1, end - maxVisible + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
        goToPage(page) {
            this.currentPage = page;
            this.updatePaginatedVehicles();
        },
        getVehicleTypeName(type) {
            const types = {
                'xe-buyt': 'Xe buýt',
                'xe-du-lich': 'Xe du lịch',
                'xe-7-cho': 'Xe 7 chỗ',
                'xe-4-cho': 'Xe 4 chỗ',
                'xe-tai': 'Xe tải',
            };
            return types[type] || type;
        },
        getStatusName(status) {
            const statuses = {
                1: 'Hoạt động',
                2: 'Bảo trì',
                3: 'Ngưng hoạt động',
            };
            return statuses[status] || 'Không xác định';
        },
    },
    mounted() {
        this.loadDataPhuongTien();
    },
}
</script>

<style></style>
