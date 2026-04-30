<template>
    <div class="admin-container">
        <!-- Header -->
        <div class="admin-header">
            <h1 class="admin-title">🔐 Quản Lý Phân Quyền</h1>
            <p class="admin-subtitle">Quản lý chức vụ, quyền hạn và các chức năng hệ thống.</p>
        </div>

        <!-- Main Content Grid -->
        <div class="content-grid">
            <!-- Left: Positions List -->
            <div class="left-section">
                <div class="card-container">
                    <div class="card-header">
                        <div class="header-content">
                            <h3>📋 Danh Sách Chức Vụ</h3>
                            <button @click="openAddModal" class="btn-primary-gradient btn-sm">
                                <i class="fa-solid fa-plus me-1"></i>Thêm Chức Vụ
                            </button>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="search-bar">
                        <div class="search-wrapper">
                            <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm kiếm chức vụ..." @keyup="timKiem()">
                            <i class="fa-solid fa-search"></i>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="table-wrapper">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Chức Vụ</th>
                                    <th>Trạng Thái</th>
                                    <th style="text-align: center;">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="list_chuc_vu.length === 0" class="empty-row">
                                    <td colspan="4">
                                        <i class="fa-solid fa-inbox"></i>
                                        <p>Không có chức vụ nào</p>
                                    </td>
                                </tr>
                                <tr v-for="(value, index) in list_chuc_vu" :key="index" class="table-row">
                                    <td class="col-number">{{ index + 1 }}</td>
                                    <td class="col-name">{{ value.ten_chuc_vu }}</td>
                                    <td class="col-status">
                                        <span :class="['status-badge', value.tinh_trang == 1 ? 'status-active' : 'status-inactive']">
                                            {{ value.tinh_trang == 1 ? 'Hoạt Động' : 'Tạm Dừng' }}
                                        </span>
                                    </td>
                                    <td class="col-actions">
                                        <div class="action-group">
                                            <button @click="phanQuyen(value)" class="action-btn btn-info" title="Phân Quyền">
                                                <i class="fa-solid fa-key"></i>
                                            </button>
                                            <button @click="doiTrangThai(value)" class="action-btn btn-toggle" title="Đổi Trạng Thái">
                                                <i class="fa-solid fa-toggle-on"></i>
                                            </button>
                                            <button @click="openEditModal(value)" class="action-btn btn-edit" title="Chỉnh Sửa">
                                                <i class="fa-solid fa-pen-nib"></i>
                                            </button>
                                            <button @click="openDeleteModal(value)" class="action-btn btn-delete" title="Xóa">
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

            <!-- Middle: Functions List -->
            <div class="middle-section">
                <div class="card-container">
                    <div class="card-header">
                        <h3>✨ Danh Sách Chức Năng</h3>
                    </div>
                    <div class="functions-list">
                        <div v-if="list_chuc_nang.length === 0" class="empty-message">
                            <i class="fa-solid fa-inbox"></i>
                            <p>Không có chức năng nào</p>
                        </div>
                        <div v-for="(value, index) in list_chuc_nang" :key="index" class="function-item">
                            <span class="func-name">{{ value.ten_chuc_nang }}</span>
                            <button @click="capQuyen(value.id)" class="btn-grant">Cấp Quyền</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: Current Permissions -->
            <div class="right-section">
                <div class="card-container">
                    <div class="card-header">
                        <h3>🔒 Quyền Của: <span class="position-name">{{ chon_chuc_vu.ten_chuc_vu || '...' }}</span></h3>
                    </div>
                    <div class="permissions-list">
                        <div v-if="!chon_chuc_vu.id" class="empty-message">
                            <i class="fa-solid fa-info-circle"></i>
                            <p>Chọn chức vụ để xem quyền</p>
                        </div>
                        <div v-else-if="list_phan_quyen.length === 0" class="empty-message">
                            <i class="fa-solid fa-inbox"></i>
                            <p>Không có quyền nào</p>
                        </div>
                        <div v-for="(value, index) in list_phan_quyen" :key="index" class="permission-item">
                            <span class="perm-name">{{ value.ten_chuc_nang }}</span>
                            <button @click="xoaQuyen(value)" class="btn-remove">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal: Thêm Chức Vụ -->
        <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h2>Thêm Chức Vụ Mới</h2>
                    <button @click="showAddModal = false" class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Tên Chức Vụ</label>
                        <input v-model="create_chuc_vu.ten_chuc_vu" type="text" class="form-input" placeholder="Nhập tên chức vụ...">
                    </div>
                    <div class="form-group">
                        <label>Slug Chức Vụ</label>
                        <input v-model="create_chuc_vu.slug_chuc_vu" type="text" class="form-input" placeholder="Nhập slug chức vụ...">
                    </div>
                    <div class="form-group">
                        <label>Trạng Thái</label>
                        <select v-model="create_chuc_vu.tinh_trang" class="form-select">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button @click="showAddModal = false" class="btn-secondary">Hủy</button>
                        <button @click="taoChucVu" class="btn-primary-gradient">Thêm</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal: Cập Nhật Chức Vụ -->
        <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h2>Cập Nhật Chức Vụ</h2>
                    <button @click="showEditModal = false" class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Tên Chức Vụ</label>
                        <input v-model="update_chuc_vu.ten_chuc_vu" type="text" class="form-input" placeholder="Nhập tên chức vụ...">
                    </div>
                    <div class="form-group">
                        <label>Slug Chức Vụ</label>
                        <input v-model="update_chuc_vu.slug_chuc_vu" type="text" class="form-input" placeholder="Nhập slug chức vụ...">
                    </div>
                    <div class="form-group">
                        <label>Trạng Thái</label>
                        <select v-model="update_chuc_vu.tinh_trang" class="form-select">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button @click="showEditModal = false" class="btn-secondary">Hủy</button>
                        <button @click="capNhatChucVu" class="btn-primary-gradient">Cập Nhật</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal: Xóa Chức Vụ -->
        <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
            <div class="modal-dialog modal-sm">
                <div class="modal-header modal-danger">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <h2>Xóa Chức Vụ?</h2>
                </div>
                <div class="modal-body">
                    <p class="modal-text">
                        Bạn chắc chắn muốn xóa chức vụ <strong>{{ delete_chuc_vu.ten_chuc_vu }}</strong>?<br>
                        <span class="modal-warning">Hành động này không thể hoàn tác!</span>
                    </p>
                </div>
                <div class="modal-footer">
                    <button @click="showDeleteModal = false" class="btn-secondary">Hủy</button>
                    <button @click="xoaChucVu" class="btn-danger">Xóa</button>
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
            list_chuc_nang: [],
            list_chuc_vu: [],
            create_chuc_vu: { tinh_trang: 1 },
            update_chuc_vu: {},
            delete_chuc_vu: {},
            list_phan_quyen: [],
            tim_kiem: { noi_dung: '' },
            chon_chuc_vu: {},
            showAddModal: false,
            showEditModal: false,
            showDeleteModal: false,
        }
    },

    mounted() {
        this.layDataChucVu();
        this.layDataChucNang();
    },

    methods: {
        // ================= MODAL =================
        openAddModal() {
            this.create_chuc_vu = { tinh_trang: 1 };
            this.showAddModal = true;
        },

        openEditModal(value) {
            this.update_chuc_vu = { ...value }; // 🔥 giữ id
            console.log("EDIT DATA:", this.update_chuc_vu);
            this.showEditModal = true;
        },

        openDeleteModal(value) {
            this.delete_chuc_vu = { ...value }; // 🔥 giữ id
            console.log("DELETE DATA:", this.delete_chuc_vu);
            this.showDeleteModal = true;
        },

        // ================= GET DATA =================
        layDataChucVu() {
            axios.get(apiUrl('admin/chuc-vu/get-data'), this.authHeader())
                .then(res => {
                    console.log("GET CHUC VU:", res.data);

                    if (res.data.status) {
                        this.list_chuc_vu = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(this.handleError);
        },

        layDataChucNang() {
            axios.get(apiUrl('admin/chuc-nang/get-data'), this.authHeader())
                .then(res => {
                    if (res.data.status) {
                        this.list_chuc_nang = res.data.data;
                    }
                })
                .catch(this.handleError);
        },

        // ================= ADD =================
        taoChucVu() {
            console.log("ADD:", this.create_chuc_vu);

            axios.post(apiUrl('admin/chuc-vu/add-data'), this.create_chuc_vu, this.authHeader())
                .then(res => {
                    console.log("ADD RES:", res.data);

                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.showAddModal = false;
                        this.layDataChucVu();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(this.handleError);
        },

        // ================= UPDATE =================
        capNhatChucVu() {
            console.log("UPDATE DATA:", this.update_chuc_vu);

            axios.post(apiUrl('admin/chuc-vu/update'), this.update_chuc_vu, this.authHeader())
                .then(res => {
                    console.log("UPDATE RES:", res.data);

                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.showEditModal = false;
                        this.layDataChucVu();
                    } else {
                        this.$toast.error(res.data.message); // 🔥 HIỂN THỊ LỖI
                    }
                })
                .catch(this.handleError);
        },

        // ================= DELETE =================
        xoaChucVu() {
            console.log("DELETE ID:", this.delete_chuc_vu.id);

            axios.post(apiUrl('admin/chuc-vu/destroy'), {
                id: this.delete_chuc_vu.id
            }, this.authHeader())
                .then(res => {
                    console.log("DELETE RES:", res.data);

                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.showDeleteModal = false;
                        this.layDataChucVu();
                    } else {
                        this.$toast.error(res.data.message); // 🔥 QUAN TRỌNG
                    }
                })
                .catch(this.handleError);
        },

        // ================= STATUS =================
        doiTrangThai(payload) {
            axios.post(apiUrl('admin/chuc-vu/change-status'), payload, this.authHeader())
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDataChucVu();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(this.handleError);
        },

        // ================= SEARCH =================
        timKiem() {
            axios.post(apiUrl('admin/chuc-vu/tim-kiem'), this.tim_kiem, this.authHeader())
                .then(res => {
                    this.list_chuc_vu = res.data.data;
                })
                .catch(this.handleError);
        },

        // ================= PHÂN QUYỀN =================
        phanQuyen(value) {
            this.chon_chuc_vu = value;

            axios.post(apiUrl('admin/phan-quyen/chi-tiet-phan-quyen/data'), value, this.authHeader())
                .then(res => {
                    this.list_phan_quyen = res.data.data;
                })
                .catch(this.handleError);
        },

        capQuyen(id_chuc_nang) {
            axios.post(apiUrl('admin/phan-quyen/chi-tiet-phan-quyen/add-data'), {
                id_chuc_vu: this.chon_chuc_vu.id,
                id_chuc_nang
            }, this.authHeader())
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.phanQuyen(this.chon_chuc_vu);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(this.handleError);
        },

        xoaQuyen(value) {
            axios.post(apiUrl('admin/phan-quyen/chi-tiet-phan-quyen/delete'), value, this.authHeader())
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.phanQuyen(this.chon_chuc_vu);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(this.handleError);
        },

        // ================= HELPER =================
        authHeader() {
            return {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                }
            };
        },

        handleError(err) {
            console.log("FULL ERROR:", err.response);

            if (err.response?.data?.message) {
                this.$toast.error(err.response.data.message);
            } else {
                this.$toast.error("Có lỗi xảy ra!");
            }
        }
    }
}
</script>

<style scoped>
/* ============ Admin Container ============ */
.admin-container {
    padding: 2rem;
    background: #f8f9fa;
    min-height: 100vh;
    font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* ============ Header ============ */
.admin-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e9ecef;
}

.admin-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.5px;
}

.admin-subtitle {
    font-size: 0.95rem;
    color: #6c757d;
    margin: 0;
}

/* ============ Content Grid ============ */
.content-grid {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1.5fr;
    gap: 1.5rem;
}

/* ============ Card Container ============ */
.card-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.card-container:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
    padding: 1.25rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
}

.header-content h3 {
    margin: 0;
    flex: 1;
}

/* ============ Search Bar ============ */
.search-bar {
    padding: 1rem 1.25rem;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-wrapper input {
    width: 100%;
    padding: 0.6rem 1rem 0.6rem 2.5rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.search-wrapper input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-wrapper i {
    position: absolute;
    left: 0.8rem;
    color: #adb5bd;
    font-size: 0.85rem;
}

/* ============ Table ============ */
.table-wrapper {
    overflow-x: auto;
}

.admin-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
}

.admin-table thead {
    background: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
}

.admin-table th {
    padding: 1rem 1.25rem;
    text-align: left;
    font-weight: 600;
    color: #495057;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.admin-table tbody tr {
    border-bottom: 1px solid #e9ecef;
    transition: all 0.2s ease;
}

.admin-table tbody tr:hover {
    background: #f8f9fa;
}

.admin-table td {
    padding: 1rem 1.25rem;
    color: #2c3e50;
    font-size: 0.9rem;
}

.admin-table .col-number {
    font-weight: 600;
    color: #667eea;
    width: 4rem;
}

.admin-table .col-name {
    font-weight: 500;
    max-width: 150px;
    word-break: break-word;
}

.admin-table .col-status {
    text-align: center;
}

.admin-table .col-actions {
    text-align: center;
}

.empty-row {
    background: #f8f9fa;
}

.empty-row td {
    padding: 2rem 1.25rem;
    text-align: center;
}

.empty-row i {
    font-size: 2rem;
    color: #dee2e6;
    margin-bottom: 0.5rem;
}

.empty-row p {
    color: #adb5bd;
    margin: 0.5rem 0 0 0;
}

/* ============ Status Badge ============ */
.status-badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.status-active {
    background: #d4edda;
    color: #155724;
}

.status-inactive {
    background: #fff3cd;
    color: #856404;
}

/* ============ Action Group ============ */
.action-group {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: white;
}

.action-btn i {
    font-size: 0.8rem;
}

.btn-info {
    background: #17a2b8;
}

.btn-info:hover {
    background: #138496;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
}

.btn-toggle {
    background: #6c757d;
}

.btn-toggle:hover {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.btn-edit {
    background: #ffc107;
    color: #333;
}

.btn-edit:hover {
    background: #e0a800;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
}

.btn-delete {
    background: #dc3545;
}

.btn-delete:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

/* ============ Button Styles ============ */
.btn-primary-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary-gradient:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
}

.btn-secondary {
    background: #e9ecef;
    color: #495057;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: #dee2e6;
}

.btn-danger {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-danger:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-grant, .btn-remove {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-grant {
    background: #28a745;
    color: white;
}

.btn-grant:hover {
    background: #218838;
    transform: translateY(-2px);
}

.btn-remove {
    background: #dc3545;
    color: white;
}

.btn-remove:hover {
    background: #c82333;
    transform: translateY(-2px);
}

/* ============ Functions & Permissions Lists ============ */
.functions-list, .permissions-list {
    padding: 1.25rem;
    max-height: 600px;
    overflow-y: auto;
}

.functions-list::-webkit-scrollbar,
.permissions-list::-webkit-scrollbar {
    width: 6px;
}

.functions-list::-webkit-scrollbar-track,
.permissions-list::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.functions-list::-webkit-scrollbar-thumb,
.permissions-list::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 3px;
}

.functions-list::-webkit-scrollbar-thumb:hover,
.permissions-list::-webkit-scrollbar-thumb:hover {
    background: #888;
}

.function-item, .permission-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 0.75rem;
    border-left: 3px solid #667eea;
    transition: all 0.2s ease;
}

.function-item:hover, .permission-item:hover {
    background: #e7e8ff;
    transform: translateX(4px);
}

.func-name, .perm-name {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    color: #2c3e50;
    word-break: break-word;
}

.empty-message {
    text-align: center;
    padding: 2rem 1rem;
    color: #adb5bd;
}

.empty-message i {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
}

.empty-message p {
    margin: 0.5rem 0 0 0;
}

.position-name {
    color: #ffd700;
    font-weight: 700;
}

/* ============ Form Input ============ */
.form-input, .form-select {
    width: 100%;
    padding: 0.6rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.form-input:focus, .form-select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.9rem;
}

/* ============ Modal ============ */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-dialog {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 90%;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-sm {
    max-width: 400px;
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px 12px 0 0;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    flex: 1;
}

.modal-header.modal-danger {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}

.modal-header i {
    font-size: 1.5rem;
    margin-right: 0.75rem;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.75rem;
    color: white;
    cursor: pointer;
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.modal-close:hover {
    transform: rotate(90deg);
}

.modal-body {
    padding: 1.5rem;
}

.modal-text {
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
}

.modal-warning {
    display: block;
    color: #dc3545;
    font-weight: 600;
    margin-top: 0.5rem;
}

.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background: #f8f9fa;
    border-radius: 0 0 12px 12px;
}

/* ============ Responsive Design ============ */
@media (max-width: 1400px) {
    .content-grid {
        grid-template-columns: 1.5fr 1fr 1fr;
    }
}

@media (max-width: 1200px) {
    .content-grid {
        grid-template-columns: 1fr 1fr;
    }

    .right-section {
        grid-column: 1 / -1;
    }
}

@media (max-width: 768px) {
    .admin-container {
        padding: 1rem;
    }

    .admin-title {
        font-size: 1.5rem;
    }

    .content-grid {
        grid-template-columns: 1fr;
    }

    .card-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .header-content {
        flex-direction: column;
        width: 100%;
    }

    .header-content h3 {
        width: 100%;
    }

    .action-group {
        flex-wrap: wrap;
    }

    .modal-dialog {
        width: 95%;
    }
}
</style>