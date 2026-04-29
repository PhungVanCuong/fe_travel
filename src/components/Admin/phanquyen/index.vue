<template>
    <div style="padding: 20px; background: #f5f7fa; min-height: 100vh;">
        <!-- Header -->
        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #333; margin: 0;">🔐 Quản Lý Phân Quyền</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Quản lý chức vụ, quyền hạn và các chức năng hệ thống.</p>
        </div>

        <!-- Main Grid -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 25px;">
            <!-- Left: Positions Management -->
            <div>
                <!-- Search & Filter Bar -->
                <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="display: grid; grid-template-columns: 1fr 150px; gap: 15px; align-items: flex-end;">
                        <div style="position: relative;">
                            <input v-model="searchQuery" 
                                type="text" 
                                placeholder="Tìm kiếm chức vụ..."
                                @input="filterPositions"
                                style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                            <i class="fa-solid fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999;"></i>
                        </div>
                        <button @click="openAddPositionModal" class="btn-primary-gradient">
                            <i class="fa-solid fa-plus me-2"></i>Thêm Chức Vụ
                        </button>
                    </div>
                </div>

                <!-- Positions Table -->
                <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                                    <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Tên Chức Vụ</th>
                                    <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Trạng Thái</th>
                                    <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="filteredPositions.length === 0">
                                    <td colspan="3" style="padding: 30px; text-align: center; color: #999;">
                                        <i class="fa-solid fa-inbox me-2" style="font-size: 1.5rem;"></i>
                                        <p style="margin: 10px 0 0 0;">Không có chức vụ nào</p>
                                    </td>
                                </tr>
                                <tr v-for="pos in filteredPositions" :key="pos.id" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;"
                                    @mouseenter="(e) => e.currentTarget.style.background = '#f9fafb'"
                                    @mouseleave="(e) => e.currentTarget.style.background = ''">
                                    <td style="padding: 15px; color: #333; font-weight: 600;">{{ pos.ten_chuc_vu }}</td>
                                    <td style="padding: 15px; text-align: center;">
                                        <span :style="{
                                            display: 'inline-block',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            background: pos.tinh_trang == 1 ? '#e0f2fe' : '#fef3c7',
                                            color: pos.tinh_trang == 1 ? '#0369a1' : '#d97706'
                                        }">
                                            {{ pos.tinh_trang == 1 ? 'Hoạt Động' : 'Tạm Dừng' }}
                                        </span>
                                    </td>
                                    <td style="padding: 15px; text-align: center;">
                                        <div style="display: flex; gap: 8px; justify-content: center;">
                                            <button @click="grantPermissions(pos)" class="action-btn btn-success" title="Cấp Quyền">
                                                <i class="fa-solid fa-lock-open"></i>
                                            </button>
                                            <button @click="editPosition(pos)" class="action-btn btn-edit" title="Chỉnh sửa">
                                                <i class="fa-solid fa-pen-nib"></i>
                                            </button>
                                            <button @click="deletePosition(pos)" class="action-btn btn-delete" title="Xóa">
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

            <!-- Right: Functions & Permissions -->
            <div>
                <!-- Functions List -->
                <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #333; font-weight: 700;">📋 Danh Sách Chức Năng</h3>
                    <div style="max-height: 300px; overflow-y: auto;">
                        <div v-if="functions.length === 0" style="padding: 20px; text-align: center; color: #999;">
                            Chưa có chức năng nào
                        </div>
                        <div v-for="func in functions" :key="func.id" style="padding: 12px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" :id="'func-' + func.id" :value="func.id" v-model="selectedFunctions" style="cursor: pointer;">
                            <label :for="'func-' + func.id" style="margin: 0; cursor: pointer; flex: 1; color: #333;">
                                {{ func.ten_chuc_nang }}
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Current Position Info -->
                <div v-if="selectedPosition" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <h3 style="margin: 0 0 15px 0; color: #333; font-weight: 700;">✨ Quyền Hiện Tại</h3>
                    <div style="margin-bottom: 15px; padding: 12px; background: #f0f4f8; border-radius: 8px;">
                        <p style="margin: 0 0 5px 0; color: #999; font-size: 0.85rem;">Chức Vụ</p>
                        <p style="margin: 0; color: #333; font-weight: 600;">{{ selectedPosition.ten_chuc_vu }}</p>
                    </div>
                    <button @click="savePermissions" class="btn-primary-gradient" style="width: 100%;">
                        <i class="fa-solid fa-check me-2"></i>Lưu Quyền
                    </button>
                </div>
                <div v-else style="background: white; border-radius: 12px; padding: 30px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center; color: #999;">
                    <i class="fa-solid fa-info-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p style="margin: 0;">Chọn một chức vụ để cấp quyền</p>
                </div>
            </div>
        </div>

        <!-- Add Position Modal -->
        <div v-if="showAddPositionModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 1.5rem;">Thêm Chức Vụ Mới</h2>
                    <button @click="showAddPositionModal = false" style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer;">×</button>
                </div>
                <div style="color: #333;">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Tên Chức Vụ
                        </label>
                        <input v-model="newPosition.ten_chuc_vu" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Trạng Thái
                        </label>
                        <select v-model="newPosition.tinh_trang"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white;">
                            <option value="0">Tạm Dừng</option>
                            <option value="1">Hoạt Động</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button @click="showAddPositionModal = false"
                            style="padding: 12px; background: #f0f0f0; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Hủy</button>
                        <button @click="addPosition"
                            style="padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Thêm</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Position Modal -->
        <div v-if="showEditPositionModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 1.5rem;">Cập Nhật Chức Vụ</h2>
                    <button @click="showEditPositionModal = false" style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer;">×</button>
                </div>
                <div v-if="editingPosition" style="color: #333;">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Tên Chức Vụ
                        </label>
                        <input v-model="editingPosition.ten_chuc_vu" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Trạng Thái
                        </label>
                        <select v-model="editingPosition.tinh_trang"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white;">
                            <option value="0">Tạm Dừng</option>
                            <option value="1">Hoạt Động</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button @click="showEditPositionModal = false"
                            style="padding: 12px; background: #f0f0f0; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Hủy</button>
                        <button @click="savePosition"
                            style="padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Position Modal -->
        <div v-if="showDeletePositionModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; color: #f56565; margin-bottom: 15px;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <h2 style="margin: 0 0 10px 0; color: #333;">Xóa Chức Vụ?</h2>
                    <p v-if="selectedPosition" style="color: #666; margin: 0 0 20px 0;">
                        Bạn chắc chắn muốn xóa chức vụ <strong>{{ selectedPosition.ten_chuc_vu }}</strong>?<br><span style="font-size: 0.85rem; color: #999;">Hành động này không thể hoàn tác!</span>
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button @click="showDeletePositionModal = false"
                            style="padding: 12px; background: #f0f0f0; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Hủy</button>
                        <button @click="confirmDelete"
                            style="padding: 12px; background: #f56565; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Xóa</button>
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
    data() {
        return {
            positions: [],
            filteredPositions: [],
            functions: [],
            searchQuery: '',
            selectedPosition: null,
            selectedFunctions: [],
            newPosition: {},
            editingPosition: null,
            showAddPositionModal: false,
            showEditPositionModal: false,
            showDeletePositionModal: false,
        }
    },
    mounted() {
        this.loadPositions();
        this.loadFunctions();
    },
    methods: {
        loadPositions() {
            axios.get(apiUrl('admin/chuc-vu/get-data'), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.positions = res.data.data;
                    this.filterPositions();
                    this.$toast.success('Tải dữ liệu thành công!');
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi tải dữ liệu chức vụ');
            });
        },
        loadFunctions() {
            axios.get(apiUrl('admin/chuc-nang/get-data'), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.functions = res.data.data;
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi tải chức năng');
            });
        },
        filterPositions() {
            this.filteredPositions = this.positions.filter(pos => {
                return !this.searchQuery || 
                    pos.ten_chuc_vu.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        grantPermissions(position) {
            this.selectedPosition = position;
            this.selectedFunctions = [];
            // Nạp quyền hiện tại nếu có
            this.loadCurrentPermissions(position);
        },
        loadCurrentPermissions(position) {
            axios.get(apiUrl('admin/chuc-vu/get-permissions/' + position.id), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status && res.data.data) {
                    this.selectedFunctions = res.data.data.map(p => p.id_chuc_nang);
                }
            })
            .catch(err => {
                console.error('Error loading permissions:', err);
            });
        },
        savePermissions() {
            if (!this.selectedPosition) return;
            
            axios.post(apiUrl('admin/chuc-vu/grant-permissions'), {
                id_chuc_vu: this.selectedPosition.id,
                chuc_nang_ids: this.selectedFunctions
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success('Cập nhật quyền thành công!');
                    this.selectedPosition = null;
                    this.selectedFunctions = [];
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi cập nhật quyền');
            });
        },
        openAddPositionModal() {
            this.newPosition = { tinh_trang: 1 };
            this.showAddPositionModal = true;
        },
        addPosition() {
            if (!this.newPosition.ten_chuc_vu) {
                this.$toast.error('Vui lòng nhập tên chức vụ');
                return;
            }

            axios.post(apiUrl('admin/chuc-vu/store'), this.newPosition, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.showAddPositionModal = false;
                    this.loadPositions();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi thêm chức vụ');
            });
        },
        editPosition(pos) {
            this.selectedPosition = pos;
            this.editingPosition = JSON.parse(JSON.stringify(pos));
            this.showEditPositionModal = true;
        },
        savePosition() {
            if (!this.editingPosition) return;
            
            axios.post(apiUrl('admin/chuc-vu/update'), this.editingPosition, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.showEditPositionModal = false;
                    this.loadPositions();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi cập nhật chức vụ');
            });
        },
        deletePosition(pos) {
            this.selectedPosition = pos;
            this.showDeletePositionModal = true;
        },
        confirmDelete() {
            if (!this.selectedPosition) return;
            
            axios.post(apiUrl('admin/chuc-vu/destroy'), { id: this.selectedPosition.id }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.showDeletePositionModal = false;
                    this.selectedPosition = null;
                    this.loadPositions();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi xóa chức vụ');
            });
        }
    }
}
</script>

<style scoped>
.btn-primary-gradient {
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
.btn-primary-gradient:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
    background: #e3f2fd;
    color: #667eea;
}
.btn-view:hover {
    background: #667eea;
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
    background: #fee;
    color: #f56565;
}
.btn-delete:hover {
    background: #f56565;
    color: white;
}

.btn-success {
    background: #dcfce7;
    color: #16a34a;
}
.btn-success:hover {
    background: #16a34a;
    color: white;
}
</style>
