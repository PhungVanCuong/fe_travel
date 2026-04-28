<template>
    <div class="">
        <div class="row">
            <div class="col-lg-12">
                <div class="card radius-10 border-top border-0 border-3 border-info">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="mt-2"><b>DANH SÁCH NHÂN VIÊN</b></h4>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                            Thêm Nhân Viên
                        </button>
                    </div>
                    <div class="card-body table-responsive">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Tìm kiếm khách hàng...">
                            <button class="btn btn-success input-group-text" style="width: 155px;">Tìm
                                kiếm</button>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr class="bg-primary text-light text-nowrap">
                                        <th class="text-center">#</th>
                                        <th class="text-center">Họ Và Tên</th>
                                        <th class="text-center">Email</th>
                                        <th class="text-center">Số Điện Thoại</th>
                                        <th class="text-center">Địa Chỉ</th>
                                        <th class="text-center">Ngày Sinh</th>
                                        <th class="text-center">Chức Vụ</th>
                                        <th class="text-center">Tình Trạng</th>
                                        <th class="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-nowrap" v-for="(item, index) in list_nhan_vien" :key="index">
                                        <th class="align-middle text-center">{{ index + 1 }}</th>
                                        <td class="align-middle">{{ item.ho_va_ten }}</td>
                                        <td class="align-middle">{{ item.email }}</td>
                                        <td class="align-middle text-center">{{ item.so_dien_thoai }}</td>
                                        <td class="align-middle">{{ item.dia_chi }}</td>
                                        <td class="align-middle text-center">{{ item.ngay_sinh }}</td>
                                        <td class="align-middle">
                                            <template v-for="(value, index_1) in list_chuc_vu" :key="index_1">
                                                <span v-if="value.id == item.id_chuc_vu">{{ value.ten_chuc_vu }}</span>
                                            </template>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button v-if="item.tinh_trang == 1" class="btn btn-info text-light w-100"
                                                style="color: white;">
                                                Hoạt Động
                                            </button>
                                            <button v-else class="btn btn-warning w-100" style="color: white;">
                                                Tạm Tắt
                                            </button>
                                        </td>
                                        <td class="align-middle text-center" style="width: 200px;">
                                            <button class="btn btn-success me-2" data-bs-toggle="modal"
                                                data-bs-target="#updateModal"
                                                v-on:click="Object.assign(update_nhan_vien, item)">
                                                Cập nhật
                                            </button>
                                            <button class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                                v-on:click="Object.assign(delete_nhan_vien, item)">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Thêm Mới -->
        <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thêm Nhân Viên Mới</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Họ Và Tên</label>
                                <input v-model="create_nhan_vien.ho_va_ten" type="text" class="form-control"
                                    placeholder="Nhập họ và tên" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email</label>
                                <input v-model="create_nhan_vien.email" type="email" class="form-control"
                                    placeholder="Nhập email" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Mật Khẩu</label>
                                <input v-model="create_nhan_vien.password" type="password" class="form-control"
                                    placeholder="Nhập mật khẩu" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Xác Nhận Mật Khẩu</label>
                                <input v-model="create_nhan_vien.re_password" type="password" class="form-control"
                                    placeholder="Xác nhận mật khẩu" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Số Điện Thoại</label>
                                <input v-model="create_nhan_vien.so_dien_thoai" type="text" class="form-control"
                                    placeholder="Nhập số điện thoại" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Ngày Sinh</label>
                                <input v-model="create_nhan_vien.ngay_sinh" type="date" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Địa Chỉ</label>
                                <input v-model="create_nhan_vien.dia_chi" type="text" class="form-control"
                                    placeholder="Nhập địa chỉ" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tình Trạng</label>
                                <select v-model="create_nhan_vien.tinh_trang" class="form-select">
                                    <option value="1">Hoạt Động</option>
                                    <option value="0">Tạm Tắt</option>
                                </select>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Chức Vụ</label>
                                <select v-model="create_nhan_vien.id_chuc_vu" class="form-select">
                                    <option v-for="(item, index) in list_chuc_vu" :key="index" :value="item.id">
                                        {{ item.ten_chuc_vu }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                        <button v-on:click="addNhanVien()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">
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
                        <h5 class="modal-title">Cập Nhật Thông Tin Nhân Viên</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Họ Và Tên</label>
                                <input v-model="update_nhan_vien.ho_va_ten" type="text" class="form-control"
                                    placeholder="Nhập họ và tên" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email</label>
                                <input v-model="update_nhan_vien.email" type="email" class="form-control"
                                    placeholder="Nhập email" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Số Điện Thoại</label>
                                <input v-model="update_nhan_vien.so_dien_thoai" type="text" class="form-control"
                                    placeholder="Nhập số điện thoại" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Ngày Sinh</label>
                                <input v-model="update_nhan_vien.ngay_sinh" type="date" class="form-control" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Địa Chỉ</label>
                                <input v-model="update_nhan_vien.dia_chi" type="text" class="form-control"
                                    placeholder="Nhập địa chỉ" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tình Trạng</label>
                                <select v-model="update_nhan_vien.tinh_trang" class="form-select">
                                    <option value="1">Hoạt Động</option>
                                    <option value="0">Tạm Tắt</option>
                                </select>
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Chức Vụ</label>
                                <select v-model="update_nhan_vien.id_chuc_vu" class="form-select">
                                    <option v-for="(item, index) in list_chuc_vu" :key="index" :value="item.id">
                                        {{ item.ten_chuc_vu }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                        <button @click="updateNhanVien()" type="button" class="btn btn-success" data-bs-dismiss="modal">
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Xóa -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xóa Nhân Viên</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có chắc chắn muốn xóa nhân viên
                            <strong>{{ delete_nhan_vien.ho_va_ten }}</strong>?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteNhanVien()">
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 
<script>
import axios from 'axios';
import apiUrl from '../../../utils/api'
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            list_nhan_vien: [],
            list_chuc_vu: [],
            create_nhan_vien: {
                ho_va_ten: '',
                email: '',
                password: '',
                re_password: '',
                so_dien_thoai: '',
                dia_chi: '',
                ngay_sinh: '',
                id_chuc_vu: '',
                tinh_trang: 1,
            },
            update_nhan_vien: {
                id: '',
                ho_va_ten: '',
                email: '',
                password: '',
                so_dien_thoai: '',
                dia_chi: '',
                ngay_sinh: '',
                id_chuc_vu: '',
                tinh_trang: '',
            },
            delete_nhan_vien: {
                id: '',
                ho_va_ten: '',          
            },
        }
    },
    methods: {
        loadDataNhanVien() {
            axios
                .get(apiUrl('admin/nhan-vien/get-data'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if(res.data.status) {
                        this.list_nhan_vien = res.data.data;
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        loadDataChucVu() {
            axios
                .get(apiUrl('admin/chuc-vu/get-data'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if(res.data.status) {
                        this.list_chuc_vu = res.data.data;
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        addNhanVien() {
            axios
                .post(apiUrl('admin/nhan-vien/add-data'), this.create_nhan_vien, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
                        this.create_nhan_vien = {
                        };
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        updateNhanVien() {
            axios
                .post(apiUrl('admin/nhan-vien/update'), this.update_nhan_vien, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        deleteNhanVien() {
            axios
                .post(apiUrl('admin/nhan-vien/delete'), this.delete_nhan_vien, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadDataNhanVien();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        }
    },
    mounted() {
        this.loadDataNhanVien();
        this.loadDataChucVu();
    },
}
</script>
<style></style>