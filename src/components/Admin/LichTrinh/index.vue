<template>
    <div style="padding: 20px; background: #f5f7fa; min-height: 100vh;">
        <!-- Header -->
        <div style="margin-bottom: 30px;">
            <h1 style="font-size: 1.8rem; font-weight: 700; color: #333; margin: 0;">📅 Quản Lý Lịch Trình Tour</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Quản lý hoạt động và lịch trình chi tiết cho từng tour du lịch.
            </p>
        </div>

        <!-- Tabs -->
        <div style="background: white; border-radius: 12px; overflow: hidden; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="display: flex; gap: 0; padding: 0;">
                <button 
                    @click="activeTab = 'lichtrinh'"
                    :style="{
                        flex: 1,
                        padding: '16px 20px',
                        background: activeTab === 'lichtrinh' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f8fafc',
                        color: activeTab === 'lichtrinh' ? 'white' : '#475569',
                        border: 'none',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        fontSize: '1rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }"
                    @mouseenter="lichTrinhTabHovered = true"
                    @mouseleave="lichTrinhTabHovered = false">
                    <i class="fa-solid fa-calendar-days me-3" style="font-size: 1.1rem;"></i>
                    <span style="font-size: 0.95rem;">📅 Lịch Trình</span>
                    <div v-if="activeTab === 'lichtrinh'" style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
                </button>
                <div style="width: 1px; background: #e2e8f0;"></div>
                <button 
                    @click="activeTab = 'diemden'"
                    :style="{
                        flex: 1,
                        padding: '16px 20px',
                        background: activeTab === 'diemden' ? 'linear-gradient(135deg, #10b981, #059669)' : '#f8fafc',
                        color: activeTab === 'diemden' ? 'white' : '#475569',
                        border: 'none',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        fontSize: '1rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }"
                    @mouseenter="diemDenTabHovered = true"
                    @mouseleave="diemDenTabHovered = false">
                    <i class="fa-solid fa-map-marker-alt me-3" style="font-size: 1.1rem;"></i>
                    <span style="font-size: 0.95rem;">📍 Điểm Đến</span>
                    <div v-if="activeTab === 'diemden'" style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #10b981, #059669);"></div>
                </button>
            </div>
        </div>

        <!-- Tab: Lịch Trình -->
        <div v-if="activeTab === 'lichtrinh'">
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
                        <div style="display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; margin-bottom: 12px;">
                            <select v-model="formData.id_diem_den"
                                style="flex: 1; min-width: 220px; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; background: white; cursor: pointer;">
                                <option value="">-- Chọn điểm đến --</option>
                                <option v-for="diem in diemDens" :key="diem.id" :value="diem.id">
                                    {{ diem.ten_diem_den }}
                                </option>
                            </select>
                            <button type="button" @click="openAddDiemDenModal(true)" class="btn-add" style="height: 45px;">
                                <i class="fa-solid fa-plus me-2"></i>Thêm Điểm Đến
                            </button>
                        </div>
                        <div v-if="selectedDiemDen" style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px;">
                            <img :src="selectedDiemDen.anh" alt="Ảnh điểm đến" style="width: 68px; height: 50px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" v-if="selectedDiemDen.anh">
                            <div>
                                <div style="font-weight: 600; color: #333;">{{ selectedDiemDen.ten_diem_den }}</div>
                                <div style="font-size: 0.82rem; color: #666;">Ảnh điểm đến sẽ được dùng cho lịch trình</div>
                            </div>
                        </div>
                        <p style="margin: 0; color: #999; font-size: 0.85rem;">Thêm điểm đến trước ở tab Điểm Đến hoặc sử dụng nút bên cạnh để tạo mới.</p>
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

        <!-- Tab: Điểm Đến -->
        <div v-if="activeTab === 'diemden'">
            <!-- Header & Search -->
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <div style="display: flex; gap: 12px; align-items: flex-end; margin-bottom: 0;">
                    <div style="flex: 1; position: relative;">
                        <label style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 6px; display: block;">🔍 Tìm kiếm Điểm Đến</label>
                        <input type="text" v-model="searchDiemDen" placeholder="Nhập tên điểm đến để tìm kiếm..."
                            style="width: 100%; padding: 12px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; font-size: 0.9rem;">
                        <i class="fa-solid fa-search" style="position: absolute; right: 12px; bottom: 14px; color: #999; font-size: 0.9rem;"></i>
                    </div>
                    <button @click="openAddDiemDenModal" class="btn-add" style="height: 45px;">
                        <i class="fa-solid fa-plus me-2"></i>Thêm Điểm Đến
                    </button>
                </div>
            </div>

            <!-- Table -->
            <div style="background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem; width: 70px;">
                                    <i class="fa-solid fa-hashtag me-1" style="color: #667eea;"></i>ID
                                </th>
                                <th style="padding: 15px; text-align: left; font-weight: 600; color: #333; font-size: 0.9rem; width: 40%;">
                                    <i class="fa-solid fa-map-marker-alt me-2" style="color: #667eea;"></i>Tên Điểm Đến
                                </th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem; width: 160px;">
                                    <i class="fa-solid fa-image me-1" style="color: #667eea;"></i>Ảnh
                                </th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem; width: 140px;">
                                    <i class="fa-solid fa-toggle-on me-1" style="color: #667eea;"></i>Trạng Thái
                                </th>
                                <th style="padding: 15px; text-align: center; font-weight: 600; color: #333; font-size: 0.9rem; width: 160px;">
                                    <i class="fa-solid fa-sliders me-1" style="color: #667eea;"></i>Hành Động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredDiemDens.length === 0" style="border-bottom: 1px solid #e2e8f0;">
                                <td colspan="5" style="padding: 50px 20px; text-align: center; color: #999;">
                                    <div style="font-size: 3rem; margin-bottom: 15px;">📍</div>
                                    <p style="margin: 0; font-size: 1rem;">Không tìm thấy điểm đến nào</p>
                                    <p style="margin: 8px 0 0 0; font-size: 0.85rem; color: #bbb;">Hãy nhấp nút "Thêm Điểm Đến" để bắt đầu</p>
                                </td>
                            </tr>
                            <tr v-for="diem in filteredDiemDens" :key="diem.id" class="data-row" style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;">
                                <td style="padding: 15px; text-align: center; color: #667eea; font-weight: 700; font-size: 0.95rem;">
                                    #{{ diem.id }}
                                </td>
                                <td style="padding: 15px; color: #333; font-weight: 600; font-size: 0.95rem;">
                                    {{ diem.ten_diem_den }}
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <div style="display: inline-flex; align-items: center; justify-content: center; width: 100%;">
                                        <img v-if="diem.anh" :src="diem.anh" alt="Ảnh điểm đến"
                                            style="width: 80px; height: 55px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">
                                        <span v-else style="color: #999; font-size: 0.85rem;">Không có ảnh</span>
                                    </div>
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <button @click="changeDiemDenStatus(diem.id, diem.tinh_trang == 1 ? 0 : 1)" 
                                        :style="{
                                            border: 'none', 
                                            padding: '6px 14px', 
                                            borderRadius: '6px', 
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            background: diem.tinh_trang == 1 ? '#dcfce7' : '#fee2e2',
                                            color: diem.tinh_trang == 1 ? '#16a34a' : '#dc2626'
                                        }"
                                        :title="diem.tinh_trang == 1 ? 'Nhấp để ẩn' : 'Nhấp để hiển thị'">
                                        <i :class="diem.tinh_trang == 1 ? 'fa-solid fa-eye me-1' : 'fa-solid fa-eye-slash me-1'"></i>
                                        {{ diem.tinh_trang == 1 ? 'Hiển Thị' : 'Ẩn' }}
                                    </button>
                                </td>
                                <td style="padding: 15px; text-align: center;">
                                    <div style="display: flex; gap: 8px; justify-content: center; align-items: center;">
                                        <button @click="openEditDiemDenModal(diem)" class="action-btn btn-edit" title="Chỉnh sửa" style="background: #e0f2fe; color: #0284c7; border: none; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                                            <i class="fa-solid fa-edit"></i>
                                        </button>
                                        <button @click="openDeleteDiemDenModal(diem)" class="action-btn btn-delete" title="Xóa điểm đến" style="background: #fee2e2; color: #ef4444; border: none; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
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

        <!-- Modal Thêm/Sửa Điểm Đến -->
        <div v-if="showDiemDenModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; max-height: 85vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 25px 20px; color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fa-solid fa-map-marker-alt" style="font-size: 1.3rem;"></i>
                        <h2 style="margin: 0; font-size: 1.2rem;">{{ isEditingDiemDen ? '✏️ Chỉnh Sửa Điểm Đến' : '➕ Thêm Điểm Đến Mới' }}</h2>
                    </div>
                    <button @click="closeDiemDenModal" style="background: rgba(255,255,255,0.2); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                        <i class="fa-solid fa-times" style="color: white;"></i>
                    </button>
                </div>

                <form @submit.prevent="saveDiemDen" style="padding: 25px 20px;">
                    <!-- Tên Điểm Đến -->
                    <div style="margin-bottom: 20px;">
                        <label style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 8px; display: block;">Tên Điểm Đến *</label>
                        <input v-model="diemDenForm.ten_diem_den" type="text" placeholder="Nhập tên điểm đến..." 
                            style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit;" required>
                    </div>

                    <!-- Ảnh -->
                    <div style="margin-bottom: 20px;">
                        <label style="font-size: 0.85rem; font-weight: 600; color: #666; margin-bottom: 8px; display: block;">Ảnh Điểm Đến</label>
                        <input type="file" @change="handleDiemDenImageUpload" accept="image/*" 
                            style="width: 100%; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit;">
                        <div v-if="diemDenForm.anh" style="margin-top: 10px;">
                            <img :src="diemDenForm.anh" alt="Preview" style="max-width: 200px; max-height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" class="btn-primary-gradient" style="flex: 1;">
                            <i class="fa-solid fa-save me-2"></i>{{ isEditingDiemDen ? 'Cập Nhật' : 'Lưu Điểm Đến' }}
                        </button>
                        <button type="button" @click="closeDiemDenModal" class="btn-primary-reset" style="flex: 1;">
                            <i class="fa-solid fa-times me-2"></i>Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal Xóa Điểm Đến -->
        <div v-if="showDeleteDiemDenModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 12px; width: 90%; max-width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <div style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 25px 20px; color: white; text-align: center; border-bottom: 4px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 3.5rem; margin-bottom: 15px; animation: shake 0.5s;">⚠️</div>
                    <h3 style="margin: 0 0 10px 0; color: white; font-size: 1.1rem; font-weight: 700;">Xác Nhận Xóa Điểm Đến</h3>
                </div>
                <div style="padding: 25px 20px;">
                    <p style="color: #666; margin: 15px 0; font-size: 0.95rem; line-height: 1.6; text-align: center;">
                        Bạn có chắc chắn muốn xóa điểm đến <br><strong style="color: #ef4444; font-size: 1rem;">{{ del_diem_den.ten_diem_den }}</strong>? <br>
                        <span style="font-size: 0.85rem; color: #999; display: inline-block; margin-top: 8px;">⚠️ Hành động này không thể hoàn tác!</span>
                    </p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 25px;">
                        <button @click="showDeleteDiemDenModal = false" style="padding: 12px; background: #f1f5f9; border: 2px solid #e2e8f0; border-radius: 8px; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s; font-size: 0.9rem;">
                            <i class="fa-solid fa-arrow-left me-2"></i>Hủy Bỏ
                        </button>
                        <button @click="confirmDeleteDiemDen" style="padding: 12px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.9rem; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
                            <i class="fa-solid fa-trash me-2"></i>Xóa Ngay
                        </button>
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
    name: 'LichTrinh',
    data() {
        return {
            activeTab: 'lichtrinh', // Tab mặc định
            lichTrinhTabHovered: false,
            diemDenTabHovered: false,

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

            // Biến cho tab điểm đến
            searchDiemDen: '',
            filteredDiemDens: [],
            showDiemDenModal: false,
            isEditingDiemDen: false,
            diemDenForm: {
                id: '',
                ten_diem_den: '',
                anh: ''
            },
            showDeleteDiemDenModal: false,
            del_diem_den: {},

            // Biến chứa Data để gửi lên Backend
            formData: {
                id: '',
                id_tour: '',
                id_diem_den: '',
                id_phuong_tien: '',
                tieu_de_hoat_dong: ''
            },
            openingDiemDenFromSchedule: false
        }
    },
    watch: {
        searchDiemDen() {
            this.filterDiemDens();
        }
    },
    computed: {
        selectedDiemDen() {
            return this.diemDens.find(diem => diem.id === this.formData.id_diem_den) || null;
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
            this.openingDiemDenFromSchedule = false;
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
            this.openingDiemDenFromSchedule = false;
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
        },

        // ==================== METHODS CHO TAB ĐIỂM ĐẾN ====================
        
        // Load danh sách điểm đến
        loadDiemDens() {
            axios.get(apiUrl('admin/diem-den/get-data'), {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then(res => {
                    if (res.data && res.data.status) {
                        this.diemDens = res.data.data;
                        this.filterDiemDens();
                    } else {
                        this.$toast.error(res.data?.message || 'Lỗi lấy dữ liệu điểm đến');
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.$toast.error('Lỗi kết nối máy chủ');
                });
        },

        // Lọc điểm đến theo từ khóa tìm kiếm
        filterDiemDens() {
            this.filteredDiemDens = this.diemDens.filter(diem => {
                return diem.ten_diem_den && diem.ten_diem_den.toLowerCase().includes(this.searchDiemDen.toLowerCase());
            });
        },

        // Mở modal thêm điểm đến
        openAddDiemDenModal(openFromSchedule = false) {
            this.diemDenForm = { id: '', ten_diem_den: '', anh: '' };
            this.isEditingDiemDen = false;
            this.openingDiemDenFromSchedule = openFromSchedule;
            this.showDiemDenModal = true;
        },

        // Mở modal chỉnh sửa điểm đến
        openEditDiemDenModal(diem) {
            this.diemDenForm = {
                id: diem.id,
                ten_diem_den: diem.ten_diem_den,
                anh: diem.anh
            };
            this.isEditingDiemDen = true;
            this.showDiemDenModal = true;
        },

        // Đóng modal điểm đến
        closeDiemDenModal() {
            this.showDiemDenModal = false;
        },

        // Xử lý upload ảnh điểm đến
        handleDiemDenImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.diemDenForm.anh = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        // Lưu điểm đến (thêm/sửa)
        saveDiemDen() {
            const url = this.isEditingDiemDen ? 'admin/diem-den/update' : 'admin/diem-den/add-data';
            axios.post(apiUrl(url), this.diemDenForm, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then(res => {
                    if (res.data && res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDiemDens();
                        this.loadDropdownData(); // Cập nhật lại dropdown trong form lịch trình
                        if (this.openingDiemDenFromSchedule && res.data.data && res.data.data.id) {
                            this.formData.id_diem_den = res.data.data.id;
                            this.openingDiemDenFromSchedule = false;
                        }
                        this.closeDiemDenModal();
                    } else {
                        this.$toast.error(res.data?.message || 'Lỗi khi lưu điểm đến');
                    }
                })
                .catch(err => this.$toast.error('Lỗi máy chủ'));
        },

        // Thay đổi trạng thái điểm đến
        changeDiemDenStatus(id, newStatus) {
            axios.post(apiUrl('admin/diem-den/change-status'), { id, tinh_trang: newStatus }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then(res => {
                    if (res.data && res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDiemDens();
                        this.loadDropdownData(); // Cập nhật lại dropdown
                    } else {
                        this.$toast.error(res.data?.message || 'Lỗi khi thay đổi trạng thái');
                    }
                })
                .catch(err => this.$toast.error('Lỗi máy chủ'));
        },

        // Mở modal xóa điểm đến
        openDeleteDiemDenModal(diem) {
            this.del_diem_den = diem;
            this.showDeleteDiemDenModal = true;
        },

        // Xác nhận xóa điểm đến
        confirmDeleteDiemDen() {
            axios.post(apiUrl('admin/diem-den/delete'), { id: this.del_diem_den.id }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('key_admin') }
            })
                .then(res => {
                    if (res.data && res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDiemDens();
                        this.loadDropdownData(); // Cập nhật lại dropdown
                        this.showDeleteDiemDenModal = false;
                    } else {
                        this.$toast.error(res.data?.message || 'Lỗi khi xóa điểm đến');
                    }
                })
                .catch(err => this.$toast.error('Lỗi máy chủ'));
        }
    },
    mounted() {
        this.loadSchedules();
        this.loadDropdownData();
        this.loadDiemDens(); // Load điểm đến khi component mount
    },
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

.btn-add {
    padding: 12px 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: inherit;
    font-size: 0.9rem;
}

.btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.action-btn {
    transition: all 0.2s;
}

.action-btn:hover {
    transform: scale(1.1);
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.action-btn {
    transition: all 0.2s;
}

.action-btn:hover {
    transform: scale(1.1);
}

.btn-default {
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