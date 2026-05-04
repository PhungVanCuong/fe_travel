<template>
    <div style="padding: 20px; background: #f5f7fa; min-height: 100vh;">
        <!-- Header -->
        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #333; margin: 0;">👥 Quản Lý Tài Khoản Khách Hàng</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Quản lý thông tin và trạng thái tài khoản khách hàng.</p>
        </div>

        <!-- Search & Filter Bar -->
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="display: grid; grid-template-columns: 1fr 1fr 150px 150px; gap: 15px; align-items: flex-end;">
                <!-- Search -->
                <div style="position: relative;">
                    <input v-model="searchQuery" 
                        type="text" 
                        placeholder="Tìm kiếm theo tên hoặc email..."
                        @input="filterData"
                        style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    <i class="fa-solid fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999;"></i>
                </div>

                <!-- Status Filter -->
                <select v-model="statusFilter" 
                    @change="filterData"
                    style="padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white; cursor: pointer;">
                    <option value="">Tất cả Trạng thái</option>
                    <option value="1">Đã Kích Hoạt</option>
                    <option value="0">Chưa Kích Hoạt</option>
                </select>

                <!-- Active Filter -->
                <select v-model="blockFilter" 
                    @change="filterData"
                    style="padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white; cursor: pointer;">
                    <option value="">Tất cả</option>
                    <option value="0">Đang Hoạt Động</option>
                    <option value="1">Bị Khóa</option>
                </select>

                <!-- Add Button -->
                <button @click="openAddModal" class="btn-primary-gradient">
                    <i class="fa-solid fa-user-plus me-2"></i>Thêm Mới
                </button>
            </div>
        </div>

        <!-- Table -->
        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                            <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Tên Khách Hàng</th>
                            <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Email</th>
                            <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Số Điện Thoại</th>
                            <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Kích Hoạt</th>
                            <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Trạng Thái</th>
                            <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredCustomers.length === 0">
                            <td colspan="6" style="padding: 30px; text-align: center; color: #999;">
                                <i class="fa-solid fa-inbox me-2" style="font-size: 1.5rem;"></i>
                                <p style="margin: 10px 0 0 0;">Không có khách hàng nào</p>
                            </td>
                        </tr>
                        <tr v-for="customer in filteredCustomers" :key="customer.id" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;"
                            @mouseenter="(e) => e.currentTarget.style.background = '#f9fafb'"
                            @mouseleave="(e) => e.currentTarget.style.background = ''">
                            <td style="padding: 15px; color: #333; font-weight: 600;">{{ customer.ho_va_ten }}</td>
                            <td style="padding: 15px; color: #666;">{{ customer.email }}</td>
                            <td style="padding: 15px; color: #666;">{{ customer.so_dien_thoai }}</td>
                            <td style="padding: 15px; text-align: center;">
                                <span :style="{
                                    display: 'inline-block',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    background: customer.is_active == 1 ? '#dcfce7' : '#fee2e2',
                                    color: customer.is_active == 1 ? '#16a34a' : '#dc2626'
                                }">
                                    {{ customer.is_active == 1 ? 'Đã Kích Hoạt' : 'Chưa Kích Hoạt' }}
                                </span>
                            </td>
                            <td style="padding: 15px; text-align: center;">
                                <span :style="{
                                    display: 'inline-block',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    background: customer.is_block == 0 ? '#e0f2fe' : '#fee2e2',
                                    color: customer.is_block == 0 ? '#0369a1' : '#dc2626'
                                }">
                                    {{ customer.is_block == 0 ? 'Đang Hoạt Động' : 'Bị Khóa' }}
                                </span>
                            </td>
                            <td style="padding: 15px; text-align: center;">
                                <div style="display: flex; gap: 8px; justify-content: center;">
                                    <button @click="viewCustomer(customer)" class="action-btn btn-view" title="Xem chi tiết">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    <button @click="editCustomer(customer)" class="action-btn btn-edit" title="Chỉnh sửa">
                                        <i class="fa-solid fa-pen-nib"></i>
                                    </button>
                                    <button @click="deleteCustomer(customer)" class="action-btn btn-delete" title="Xóa">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- View Modal -->
        <div v-if="showViewModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 1.5rem;">Chi Tiết Khách Hàng</h2>
                    <button @click="showViewModal = false" style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer;">×</button>
                </div>
                <div v-if="selectedCustomer" style="color: #333;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div>
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Tên Khách Hàng</p>
                            <p style="margin: 0; font-weight: 600; font-size: 1rem;">{{ selectedCustomer.ho_va_ten }}</p>
                        </div>
                        <div>
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Email</p>
                            <p style="margin: 0; font-weight: 600; font-size: 1rem;">{{ selectedCustomer.email }}</p>
                        </div>
                        <div>
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Số Điện Thoại</p>
                            <p style="margin: 0; font-weight: 600; font-size: 1rem;">{{ selectedCustomer.so_dien_thoai }}</p>
                        </div>
                        <div>
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Ngày Sinh</p>
                            <p style="margin: 0; font-weight: 600; font-size: 1rem;">{{ formatDate(selectedCustomer.ngay_sinh) }}</p>
                        </div>
                        <div>
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Trạng Thái Kích Hoạt</p>
                            <p style="margin: 0; font-weight: 600; font-size: 1rem; color: #667eea;">{{ selectedCustomer.is_active == 1 ? 'Đã Kích Hoạt' : 'Chưa Kích Hoạt' }}</p>
                        </div>
                        <div>
                            <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Trạng Thái Tài Khoản</p>
                            <p style="margin: 0; font-weight: 600; font-size: 1rem; color: #667eea;">{{ selectedCustomer.is_block == 0 ? 'Đang Hoạt Động' : 'Bị Khóa' }}</p>
                        </div>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p style="color: #999; font-size: 0.85rem; margin: 0 0 5px 0;">Địa Chỉ</p>
                        <p style="margin: 0; color: #555; line-height: 1.5;">{{ selectedCustomer.dia_chi || 'Chưa cập nhật' }}</p>
                    </div>
                    <button @click="showViewModal = false" style="width: 100%; padding: 12px; background: #f0f0f0; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Đóng</button>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 1.5rem;">Cập Nhật Thông Tin</h2>
                    <button @click="showEditModal = false" style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer;">×</button>
                </div>
                <div v-if="editingCustomer" style="color: #333;">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Tên Khách Hàng
                        </label>
                        <input v-model="editingCustomer.ho_va_ten" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Email
                        </label>
                        <input v-model="editingCustomer.email" type="email"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Số Điện Thoại
                        </label>
                        <input v-model="editingCustomer.so_dien_thoai" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Ngày Sinh
                        </label>
                        <input v-model="editingCustomer.ngay_sinh" type="date"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Địa Chỉ
                        </label>
                        <input v-model="editingCustomer.dia_chi" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div>
                            <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                                Kích Hoạt
                            </label>
                            <select v-model="editingCustomer.is_active"
                                style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white;">
                                <option value="0">Chưa Kích Hoạt</option>
                                <option value="1">Đã Kích Hoạt</option>
                            </select>
                        </div>

                        <div>
                            <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                                Trạng Thái
                            </label>
                            <select v-model="editingCustomer.is_block"
                                style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white;">
                                <option value="0">Đang Hoạt Động</option>
                                <option value="1">Bị Khóa</option>
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button @click="showEditModal = false"
                            style="padding: 12px; background: #f0f0f0; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Hủy</button>
                        <button @click="saveCustomer"
                            style="padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Modal -->
        <div v-if="showAddModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 1.5rem;">Thêm Khách Hàng Mới</h2>
                    <button @click="showAddModal = false" style="background: none; border: none; font-size: 1.5rem; color: #999; cursor: pointer;">×</button>
                </div>
                <div style="color: #333;">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Tên Khách Hàng
                        </label>
                        <input v-model="newCustomer.ho_va_ten" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Email
                        </label>
                        <input v-model="newCustomer.email" type="email"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Mật Khẩu
                        </label>
                        <input v-model="newCustomer.password" type="password"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Số Điện Thoại
                        </label>
                        <input v-model="newCustomer.so_dien_thoai" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Ngày Sinh
                        </label>
                        <input v-model="newCustomer.ngay_sinh" type="date"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-weight: 600; color: #333; margin-bottom: 8px; font-size: 0.9rem;">
                            Địa Chỉ
                        </label>
                        <input v-model="newCustomer.dia_chi" type="text"
                            style="width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button @click="showAddModal = false"
                            style="padding: 12px; background: #f0f0f0; border: none; border-radius: 8px; font-weight: 600; color: #333; cursor: pointer;">Hủy</button>
                        <button @click="addCustomer"
                            style="padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Thêm</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="showDeleteModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; color: #f56565; margin-bottom: 15px;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <h2 style="margin: 0 0 10px 0; color: #333;">Xóa Khách Hàng?</h2>
                    <p v-if="selectedCustomer" style="color: #666; margin: 0 0 20px 0;">
                        Bạn chắc chắn muốn xóa khách hàng <strong>{{ selectedCustomer.ho_va_ten }}</strong>?<br><span style="font-size: 0.85rem; color: #999;">Hành động này không thể hoàn tác!</span>
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <button @click="showDeleteModal = false"
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
            customers: [],
            filteredCustomers: [],
            searchQuery: '',
            statusFilter: '',
            blockFilter: '',
            showViewModal: false,
            showEditModal: false,
            showAddModal: false,
            showDeleteModal: false,
            selectedCustomer: null,
            editingCustomer: null,
            newCustomer: {},
            isLoading: false,
        }
    },
    mounted() {
        this.loadCustomers();
    },
    methods: {
        loadCustomers() {
            this.isLoading = true;
            axios.get(apiUrl('admin/khach-hang/get-data'), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.customers = res.data.data;
                    this.filterData();
                    this.$toast.success('Tải dữ liệu thành công!');
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi tải dữ liệu khách hàng');
            })
            .finally(() => {
                this.isLoading = false;
            });
        },
        filterData() {
            this.filteredCustomers = this.customers.filter(customer => {
                const matchSearch = !this.searchQuery || 
                    (customer.ho_va_ten && customer.ho_va_ten.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
                    (customer.email && customer.email.toLowerCase().includes(this.searchQuery.toLowerCase()));
                
                const matchStatus = !this.statusFilter || customer.is_active.toString() === this.statusFilter;
                const matchBlock = !this.blockFilter || customer.is_block.toString() === this.blockFilter;
                
                return matchSearch && matchStatus && matchBlock;
            });
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        viewCustomer(customer) {
            this.selectedCustomer = customer;
            this.showViewModal = true;
        },
        editCustomer(customer) {
            this.selectedCustomer = customer;
            this.editingCustomer = JSON.parse(JSON.stringify(customer));
            this.showEditModal = true;
        },
        openAddModal() {
            this.newCustomer = {};
            this.showAddModal = true;
        },
        deleteCustomer(customer) {
            this.selectedCustomer = customer;
            this.showDeleteModal = true;
        },
        confirmDelete() {
            if (!this.selectedCustomer) return;
            
            axios.post(apiUrl('admin/khach-hang/destroy'), { id: this.selectedCustomer.id }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.showDeleteModal = false;
                    this.loadCustomers();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi xóa khách hàng');
            });
        },
        saveCustomer() {
            if (!this.editingCustomer) return;
            
            axios.post(apiUrl('admin/khach-hang/update'), this.editingCustomer, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.showEditModal = false;
                    this.loadCustomers();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi cập nhật khách hàng');
            });
        },
        addCustomer() {
            if (!this.newCustomer.ho_va_ten || !this.newCustomer.email) {
                this.$toast.error('Vui lòng điền đầy đủ thông tin');
                return;
            }

            axios.post(apiUrl('admin/khach-hang/store'), this.newCustomer, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('key_admin')
                }
            })
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.showAddModal = false;
                    this.loadCustomers();
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                this.$toast.error('Lỗi khi thêm khách hàng');
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
</style>
