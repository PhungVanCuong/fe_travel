<template>
    <div style="padding: 20px; background: #f5f7fa; min-height: 100vh;">
        <!-- Header -->
        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #333; margin: 0;">👨‍💼 Quản Lý Hướng Dẫn Viên & Phân Công Tour</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Quản lý thông tin hướng dẫn viên và phân công tour du lịch.</p>
        </div>

        <!-- Tabs -->
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="display: flex; gap: 15px; border-bottom: 2px solid #e2e8f0;">
                <button 
                    @click="activeTab = 'hdv'"
                    :style="{
                        padding: '15px 25px',
                        background: activeTab === 'hdv' ? '#667eea' : 'transparent',
                        color: activeTab === 'hdv' ? 'white' : '#666',
                        border: 'none',
                        borderRadius: '8px 8px 0 0',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }">
                    <i class="fa-solid fa-users me-2"></i>Danh Sách Hướng Dẫn Viên
                </button>
                <button 
                    @click="activeTab = 'phancong'"
                    :style="{
                        padding: '15px 25px',
                        background: activeTab === 'phancong' ? '#667eea' : 'transparent',
                        color: activeTab === 'phancong' ? 'white' : '#666',
                        border: 'none',
                        borderRadius: '8px 8px 0 0',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }">
                    <i class="fa-solid fa-briefcase me-2"></i>Phân Công Tour
                </button>
            </div>
        </div>

        <!-- Tab: Danh sách HDV -->
        <div v-if="activeTab === 'hdv'">
            <!-- Search & Filter -->
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <div style="display: grid; grid-template-columns: 1fr 150px 150px; gap: 15px; align-items: flex-end;">
                    <!-- Search -->
                    <div style="position: relative;">
                        <input v-model="searchQueryHDV" 
                            type="text" 
                            placeholder="Tìm kiếm hướng dẫn viên..."
                            @input="filterDataHDV"
                            style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                        <i class="fa-solid fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999;"></i>
                    </div>

                    <!-- Status Filter -->
                    <select v-model="statusFilterHDV" 
                        @change="filterDataHDV"
                        style="padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white; cursor: pointer;">
                        <option value="">Tất cả Trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Tạm dừng</option>
                    </select>

                    <!-- Add Button -->
                    <button @click="openAddHDVModal" class="btn-primary-gradient">
                        <i class="fa-solid fa-plus me-2"></i>Thêm HDV
                    </button>
                </div>
            </div>

            <!-- Table HDV -->
            <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Mã HDV</th>
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Thông Tin HDV</th>
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Ngôn Ngữ</th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Trạng Thái</th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredHDV.length === 0">
                                <td colspan="5" style="padding: 30px; text-align: center; color: #999;">
                                    <i class="fa-solid fa-inbox me-2" style="font-size: 1.5rem;"></i>
                                    <p style="margin: 10px 0 0 0;">Không có hướng dẫn viên nào</p>
                                </td>
                            </tr>
                            <tr v-for="hdv in filteredHDV" :key="hdv.id" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;"
                                @mouseenter="(e) => e.currentTarget.style.background = '#f9fafb'"
                                @mouseleave="(e) => e.currentTarget.style.background = ''">
                                <td style="padding: 15px; color: #333; font-weight: 600;">{{ hdv.ma_hdv }}</td>
                                <td style="padding: 15px; color: #666;">
                                    <div style="font-weight: 600;">{{ hdv.ten_hdv }}</div>
                                    <div style="font-size: 0.85rem; color: #999;">📞 {{ hdv.sdt }}</div>
                                </td>
                                <td style="padding: 15px; color: #666;">
                                    <span style="display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0369a1; border-radius: 6px; font-weight: 600; font-size: 0.85rem;">
                                        {{ hdv.ngon_ngu }}
                                    </span>
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <span :style="{
                                        display: 'inline-block',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        background: hdv.trang_thai == 1 ? '#dcfce7' : '#fee2e2',
                                        color: hdv.trang_thai == 1 ? '#16a34a' : '#dc2626'
                                    }">
                                        {{ hdv.trang_thai == 1 ? 'Hoạt động' : 'Tạm dừng' }}
                                    </span>
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <div style="display: flex; gap: 8px; justify-content: center;">
                                        <button @click="viewHDV(hdv)" class="action-btn btn-view" title="Xem chi tiết">
                                            <i class="fa-solid fa-eye"></i>
                                        </button>
                                        <button @click="editHDV(hdv)" class="action-btn btn-edit" title="Chỉnh sửa">
                                            <i class="fa-solid fa-pen-nib"></i>
                                        </button>
                                        <button @click="deleteHDV(hdv)" class="action-btn btn-delete" title="Xóa">
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

        <!-- Tab: Phân công Tour -->
        <div v-if="activeTab === 'phancong'">
            <!-- Search & Filter -->
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <div style="display: grid; grid-template-columns: 1fr 150px 150px; gap: 15px; align-items: flex-end;">
                    <!-- Search -->
                    <div style="position: relative;">
                        <input v-model="searchQueryTour" 
                            type="text" 
                            placeholder="Tìm kiếm tour..."
                            @input="filterDataTour"
                            style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit;">
                        <i class="fa-solid fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999;"></i>
                    </div>

                    <!-- Status Filter -->
                    <select v-model="statusFilterTour" 
                        @change="filterDataTour"
                        style="padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 0.9rem; font-family: inherit; background: white; cursor: pointer;">
                        <option value="">Tất cả Trạng thái</option>
                        <option value="1">Đang diễn ra</option>
                        <option value="0">Đã kết thúc</option>
                    </select>

                    <!-- Add Button -->
                    <button @click="openAddAssignModal" class="btn-primary-gradient">
                        <i class="fa-solid fa-plus me-2"></i>Phân Công
                    </button>
                </div>
            </div>

            <!-- Table Phân công Tour -->
            <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Mã Tour</th>
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Tên Tour</th>
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem;">Hướng Dẫn Viên</th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Ngày Khởi Hành</th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Trạng Thái</th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem;">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredAssignments.length === 0">
                                <td colspan="5" style="padding: 30px; text-align: center; color: #999;">
                                    <i class="fa-solid fa-inbox me-2" style="font-size: 1.5rem;"></i>
                                    <p style="margin: 10px 0 0 0;">Không có phân công nào</p>
                                </td>
                            </tr>
                            <tr v-for="assign in filteredAssignments" :key="assign.id" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;"
                                @mouseenter="(e) => e.currentTarget.style.background = '#f9fafb'"
                                @mouseleave="(e) => e.currentTarget.style.background = ''">
                                <td style="padding: 15px; color: #333; font-weight: 600;">{{ assign.ma_tour }}</td>
                                <td style="padding: 15px; color: #666;">{{ assign.ten_tour }}</td>
                                <td style="padding: 15px; color: #666;">
                                    <div style="font-weight: 600;">{{ assign.ten_hdv }}</div>
                                    <div style="font-size: 0.85rem; color: #999;">📞 {{ assign.sdt_hdv }}</div>
                                </td>
                                <td style="padding: 15px; text-align: center; color: #666; font-size: 0.9rem;">
                                    {{ formatDate(assign.ngay_bat_dau) }}
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <span :style="{
                                        display: 'inline-block',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        background: assign.trang_thai == 1 ? '#dbeafe' : '#fee2e2',
                                        color: assign.trang_thai == 1 ? '#0284c7' : '#dc2626'
                                    }">
                                        {{ assign.trang_thai == 1 ? 'Đang diễn ra' : 'Đã kết thúc' }}
                                    </span>
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <div style="display: flex; gap: 8px; justify-content: center;">
                                        <button @click="editAssign(assign)" class="action-btn btn-edit" title="Chỉnh sửa">
                                            <i class="fa-solid fa-pen-nib"></i>
                                        </button>
                                        <button @click="deleteAssign(assign)" class="action-btn btn-delete" title="Xóa">
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

        <!-- Modals sẽ được thêm ở đây -->
        <!-- TODO: Thêm modals cho view, edit, delete -->
    </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    data() {
        return {
            activeTab: 'hdv',
            
            // HDV Data
            hdvList: [],
            filteredHDV: [],
            searchQueryHDV: '',
            statusFilterHDV: '',
            
            // Assignment Data
            assignments: [],
            filteredAssignments: [],
            searchQueryTour: '',
            statusFilterTour: '',
            
            isLoading: false,
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.isLoading = true;
            
            // Load dữ liệu từ API - sử dụng allSettled để tránh failed promise
            Promise.allSettled([
                this.loadHDVList(),
                this.loadAssignments()
            ]).then((results) => {
                console.log('Data loaded:', results);
                this.filterDataHDV();
                this.filterDataTour();
                this.isLoading = false;
                this.$toast.success('Tải dữ liệu thành công!');
            }).catch(err => {
                console.error('Error loading data:', err);
                this.$toast.error('Lỗi khi tải dữ liệu');
                this.isLoading = false;
            });
        },
        
        loadHDVList() {
            return new Promise((resolve, reject) => {
                axios.get(apiUrl('admin/quan-ly-hdv/danh-sach-hdv'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then(res => {
                    console.log('HDV List Response:', res.data);
                    if (res.data.status) {
                        // Map dữ liệu từ backend
                        this.hdvList = res.data.data.map(hdv => ({
                            id: hdv.id,
                            ma_hdv: '#HDV-' + String(hdv.id).padStart(3, '0'),
                            ten_hdv: hdv.ho_va_ten,
                            sdt: hdv.so_dien_thoai || 'N/A',
                            nguon_goc: hdv.nguon_goc || 'N/A',
                            ngon_ngu: hdv.ngon_ngu || 'Tiếng Việt',
                            trang_thai: hdv.is_block ? 0 : 1 // Nếu is_block = 1 thì trang_thai = 0 (tạm dừng)
                        }));
                        resolve(res.data);
                    } else {
                        console.error('HDV API Error:', res.data.message);
                        this.$toast.error('Lỗi: ' + res.data.message);
                        reject(new Error(res.data.message));
                    }
                })
                .catch(err => {
                    console.error('HDV Request Error:', err);
                    this.$toast.error('Lỗi khi tải danh sách HDV: ' + err.message);
                    reject(err);
                });
            });
        },
        
        loadAssignments() {
            return new Promise((resolve, reject) => {
                axios.get(apiUrl('admin/quan-ly-hdv/danh-sach-phan-cong'), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then(res => {
                    console.log('Assignment List Response:', res.data);
                    if (res.data.status) {
                        // Map dữ liệu từ backend
                        this.assignments = res.data.data.map(assign => ({
                            id: assign.id_phan_cong,
                            ma_tour: '#TOUR-' + String(assign.id_tour).padStart(3, '0'),
                            ten_tour: assign.ten_tour,
                            id_hdv: assign.id_hdv,
                            ten_hdv: assign.ten_hdv,
                            sdt_hdv: assign.so_dien_thoai || 'N/A',
                            ngay_bat_dau: assign.ngay_bat_dau,
                            ngay_ket_thuc: assign.ngay_ket_thuc,
                            // Xác định trạng thái dựa vào ngày
                            trang_thai: this.getTourStatus(assign.ngay_bat_dau, assign.ngay_ket_thuc)
                        }));
                        resolve(res.data);
                    } else {
                        console.error('Assignment API Error:', res.data.message);
                        this.$toast.error('Lỗi: ' + res.data.message);
                        reject(new Error(res.data.message));
                    }
                })
                .catch(err => {
                    console.error('Assignment Request Error:', err);
                    this.$toast.error('Lỗi khi tải danh sách phân công: ' + err.message);
                    reject(err);
                });
            });
        },
        
        getTourStatus(ngay_bat_dau, ngay_ket_thuc) {
            const now = new Date();
            const startDate = new Date(ngay_bat_dau);
            const endDate = new Date(ngay_ket_thuc);
            
            if (now >= startDate && now <= endDate) {
                return 1; // Đang diễn ra
            } else if (now > endDate) {
                return 0; // Đã kết thúc
            } else {
                return 1; // Chưa bắt đầu nhưng vẫn là "Đang diễn ra" để admin biết
            }
        },
        
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        
        // HDV Methods
        filterDataHDV() {
            this.filteredHDV = this.hdvList.filter(hdv => {
                const matchSearch = !this.searchQueryHDV || 
                    hdv.ten_hdv.toLowerCase().includes(this.searchQueryHDV.toLowerCase()) ||
                    hdv.ma_hdv.toLowerCase().includes(this.searchQueryHDV.toLowerCase());
                
                const matchStatus = !this.statusFilterHDV || hdv.trang_thai.toString() === this.statusFilterHDV;
                
                return matchSearch && matchStatus;
            });
        },
        
        viewHDV(hdv) {
            this.$toast.info(`Xem chi tiết HDV: ${hdv.ten_hdv}`);
        },
        
        editHDV(hdv) {
            this.$toast.info(`Chỉnh sửa HDV: ${hdv.ten_hdv}`);
        },
        
        deleteHDV(hdv) {
            if (confirm(`Bạn chắc chắn muốn xóa HDV ${hdv.ten_hdv}?`)) {
                // TODO: Thêm API xóa HDV nếu cần
                this.$toast.success(`Đã xóa HDV: ${hdv.ten_hdv}`);
                this.loadData();
            }
        },
        
        openAddHDVModal() {
            this.$toast.info('Mở form thêm HDV mới');
        },
        
        // Assignment Methods
        filterDataTour() {
            this.filteredAssignments = this.assignments.filter(assign => {
                const matchSearch = !this.searchQueryTour || 
                    assign.ten_tour.toLowerCase().includes(this.searchQueryTour.toLowerCase()) ||
                    assign.ma_tour.toLowerCase().includes(this.searchQueryTour.toLowerCase());
                
                const matchStatus = !this.statusFilterTour || assign.trang_thai.toString() === this.statusFilterTour;
                
                return matchSearch && matchStatus;
            });
        },
        
        editAssign(assign) {
            this.$toast.info(`Chỉnh sửa phân công: ${assign.ten_tour}`);
        },
        
        deleteAssign(assign) {
            if (confirm(`Bạn chắc chắn muốn xóa phân công ${assign.ten_tour}?`)) {
                axios.post(apiUrl('admin/quan-ly-hdv/xoa-phan-cong'), { id: assign.id }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('key_admin')
                    }
                })
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message || 'Đã xóa phân công');
                        this.loadData();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                    this.$toast.error('Lỗi khi xóa phân công');
                });
            }
        },
        
        openAddAssignModal() {
            this.$toast.info('Mở form phân công tour mới');
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
