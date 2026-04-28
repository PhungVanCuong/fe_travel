<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header d-flex justify-content-between">
                    <h4 class="mt-2"><b>DANH SÁCH VÉ</b></h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                        Thêm Vé Mới
                    </button>
                </div>
                <div class="card-body table-responsive">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Tìm kiếm vé...">
                        <button class="btn btn-success input-group-text" style="width: 155px;">Tìm
                            kiếm</button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="bg-primary text-light text-nowrap">
                                    <th class="text-center">#</th>
                                    <th class="text-center">Mã Vé</th>
                                    <th class="text-center">Khách Hàng</th>
                                    <th class="text-center">Tên Phim</th>
                                    <th class="text-center">Suất Chiếu</th>
                                    <th class="text-center">Ghế</th>
                                    <th class="text-center">Giá Vé</th>
                                    <th class="text-center">Trạng Thái</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-nowrap" v-for="(item, index) in list_ve" :key="index">
                                    <th class="align-middle text-center">{{ index + 1 }}</th>
                                    <td class="align-middle">{{ item.ma_ve }}</td>
                                    <td class="align-middle">{{ item.ho_va_ten }}</td>
                                    <td class="align-middle">{{ item.ten_phim }}</td>
                                    <td class="align-middle text-center">
                                        {{ item.ngay_chieu }} - {{ item.thoi_gian_bat_dau }}
                                    </td>
                                    <td class="align-middle text-center">{{ item.ten_ghe }}</td>
                                    <td class="align-middle text-center">{{ formatMoney(item.gia_ve) }}</td>
                                    <td class="align-middle text-center">
                                        <button v-if="item.tinh_trang == 2" class="btn btn-success w-100">
                                            Đã Thanh Toán
                                        </button>
                                        <button v-else-if="item.tinh_trang == 1"
                                            class="btn btn-warning text-light w-100">
                                            Chưa Thanh Toán
                                        </button>
                                        <button v-else class="btn btn-danger w-100">
                                            Đã Hủy
                                        </button>
                                    </td>
                                    <td class="align-middle text-center" style="width: 200px;">
                                        <button class="btn btn-info text-light me-2" data-bs-toggle="modal"
                                            data-bs-target="#updateModal" v-on:click="Object.assign(update_ve, item)">
                                            Cập nhật
                                        </button>
                                        <button class="btn btn-danger" data-bs-toggle="modal"
                                            data-bs-target="#deleteModal" v-on:click="Object.assign(delete_ve, item)">
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
                    <h5 class="modal-title">Thêm Vé Mới</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Mã Vé</label>
                            <input v-model="create_ve.ma_ve" type="text" class="form-control" placeholder="Nhập mã vé">
                        </div>
                        <!-- <div class="col-md-6 mb-3"> -->
                            <!-- <label class="form-label">Đơn Hàng</label> -->
                            <!-- <select v-model="create_ve.id_don_hang" class="form-select">
                                <option value="">Chọn đơn hàng</option>
                                <option v-for="(item, index) in list_don_hang" :key="index" :value="item.id">
                                    {{ item.ma_don_dat_ve }} - {{ item.ho_va_ten }}
                                </option>
                            </select> -->
                        <!-- </div> -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Suất Chiếu</label>
                            <select v-model="create_ve.id_suat_chieu" class="form-select">
                                <option value="">Chọn suất chiếu</option>
                                <option v-for="(item, index) in list_suat_chieu" :key="index" :value="item.id">
                                    {{ item.ten_phim }} - {{ item.thoi_gian_bat_dau }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Ghế</label>
                            <input v-model="create_ve.ten_ghe" type="text" class="form-control" placeholder="Nhập tên ghế">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Giá Vé</label>
                            <input v-model="create_ve.gia_ve" type="number" class="form-control" placeholder="Nhập giá vé">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Trạng Thái</label>
                            <select v-model="create_ve.tinh_trang" class="form-select">
                                <option value="2">Đã Thanh Toán</option>
                                <option value="1">Chưa Thanh Toán</option>
                                <option value="0">Đã Hủy</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button @click="addVe()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Thêm mới
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cập Nhật Thông Tin Vé</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Mã Vé</label>
                            <input v-model="update_ve.ma_ve" type="text" class="form-control" placeholder="Nhập mã vé" readonly>
                        </div>
                        <!-- <div class="col-md-6 mb-3">
                            <label class="form-label">Đơn Hàng</label>
                            <select v-model="update_ve.id_don_hang" class="form-select">
                                <option value="">Chọn đơn hàng</option>
                                <option v-for="(item, index) in list_don_hang" :key="index" :value="item.id">
                                    {{ item.ma_don_dat_ve }} - {{ item.ho_va_ten }}
                                </option>
                            </select>
                        </div> -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Suất Chiếu</label>
                            <select v-model="update_ve.id_suat_chieu" class="form-select">
                                <option value="">Chọn suất chiếu</option>
                                <option v-for="(item, index) in list_suat_chieu" :key="index" :value="item.id">
                                    {{ item.ten_phim }} - {{ item.thoi_gian_bat_dau }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Ghế</label>
                            <input v-model="update_ve.ten_ghe" type="text" class="form-control" placeholder="Nhập tên ghế">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Giá Vé</label>
                            <input v-model="update_ve.gia_ve" type="number" class="form-control" placeholder="Nhập giá vé">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Trạng Thái</label>
                            <select v-model="update_ve.tinh_trang" class="form-select">
                                <option value="2">Đã Thanh Toán</option>
                                <option value="1">Chưa Thanh Toán</option>
                                <option value="0">Đã Hủy</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button @click="updateVe()" type="button" class="btn btn-success" data-bs-dismiss="modal">
                        Cập nhật
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
                    <h5 class="modal-title">Xóa Vé</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có chắc chắn muốn xóa vé
                        <strong>{{ delete_ve.ma_ve }}</strong>?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button @click="deleteVe()" type="button" class="btn btn-danger" data-bs-dismiss="modal">
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
            list_ve: [],
            list_don_hang: [],
            list_suat_chieu: [],
            create_ve: {
                ma_ve: '',
                // id_don_hang: '',
                id_suat_chieu: '',
                ten_ghe: '',
                gia_ve: '',
                tinh_trang: '1',
            },
            update_ve: {
                id: '',
                ma_ve: '',
                id_don_hang: '',
                id_suat_chieu: '',
                ten_ghe: '',
                gia_ve: '',
                tinh_trang: '1',
            },
            delete_ve: {
                id: '',
                ma_ve: '',
            },
        }
    },
    methods: {
        loadDataVe() {
            axios
                .get(apiUrl('admin/ve/get-data'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if(res.data.status) {
                        this.list_ve = res.data.data;
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
        loadSuatChieu() {
            axios
                .get(apiUrl('admin/suat-chieu/get-data'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if(res.data.status) {
                        this.list_suat_chieu = res.data.data;
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
        addVe() {
            axios
                .post(apiUrl('admin/ve/add-data'), this.create_ve, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataVe();
                        this.create_ve = {
                            ma_ve: '',
                            // id_don_hang: '',
                            id_suat_chieu: '',
                            ten_ghe: '',
                            gia_ve: '',
                            tinh_trang: '1',
                        };
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
        updateVe() {
           
            axios
                .post(`${apiUrl('admin/ve/update')}/${this.update_ve.id}`, this.update_ve, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataVe();
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
        deleteVe() {
            const payload = { id: this.delete_ve.id };
            axios
                .post(apiUrl('admin/ve/delete'), payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDataVe();
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
        formatMoney(number) {
            return new Intl.NumberFormat("vi-VI", { style: "currency", currency: "VND" }).format(number).replace('₫', 'VND');
        }
    },
    mounted() {
        this.loadDataVe();
        this.loadSuatChieu();
    },
}
</script>
<style></style>