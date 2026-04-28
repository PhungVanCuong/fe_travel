<template>
  <div class="search-container">
    <div class="container py-5">
      <!-- Tiêu đề -->
      <div class="mb-4">
        <h2 class="fw-bold mb-4">Tìm kiếm Tour</h2>
      </div>

      <!-- Form tìm kiếm -->
      <div class="search-form-wrapper mb-5">
        <!-- Thanh search chính -->
        <div class="search-bar mb-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-0">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input 
              type="text" 
              class="form-control border-start-0 ps-0" 
              placeholder="Tìm kiếm tour, điểm đến..."
              v-model="searchKeyword"
            >
            <span class="input-group-text bg-white border-start-0 cursor-pointer">
              <i class="fa-solid fa-xmark text-muted small"></i>
            </span>
          </div>
        </div>

        <!-- Các bộ lọc -->
        <div class="filter-row row g-3 align-items-end">
          <!-- Từ ngày -->
          <div class="col-md-2">
            <label class="form-label fw-bold d-flex align-items-center">
              Từ ngày
            </label>
            <input 
              type="date" 
              class="form-control" 
              v-model="filterFromDate"
              placeholder="DD/MM/YYYY"
            >
          </div>

          <!-- Đến ngày -->
          <div class="col-md-2">
            <label class="form-label fw-bold d-flex align-items-center">
              Tới ngày
            </label>
            <input 
              type="date" 
              class="form-control" 
              v-model="filterToDate"
              placeholder="DD/MM/YYYY"
            >
          </div>

          <!-- Số người -->
          <div class="col-md-2">
            <label class="form-label fw-bold d-flex align-items-center">
              Số người
            </label>
            <input 
              type="number" 
              class="form-control" 
              v-model="filterPeople"
              placeholder="1"
              min="1"
            >
          </div>

          <!-- Điểm xuất phát -->
          <div class="col-md-2">
            <label class="form-label fw-bold d-flex align-items-center">
              Điểm xuất phát
            </label>
            <select class="form-select" v-model="filterDeparture">
              <option value="">Tất cả</option>
              <option value="TP. HCM">TP. HCM</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>

          <!-- Loại tour -->
          <div class="col-md-2">
            <label class="form-label fw-bold d-flex align-items-center">
              Loại tour
            </label>
            <select class="form-select" v-model="filterType">
              <option value="">Tất cả</option>
              <option value="Trong nước">Trong nước</option>
              <option value="Nước ngoài">Nước ngoài</option>
            </select>
          </div>

          <!-- Nút tìm kiếm -->
          <div class="col-md-2 text-end">
            <button 
              class="btn btn-dark w-100 fw-bold" 
              style="padding: 10px 30px; border-radius: 4px;"
              @click="searchTours"
            >
              <i class="fa-solid fa-magnifying-glass me-2"></i>
              TÌM KIẾM
            </button>
          </div>
        </div>
      </div>

      <!-- Kết quả tìm kiếm -->
      <div class="results-section">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="mb-0">Kết quả tìm kiếm <span class="text-muted">({{ totalResults }}/{{ totalTours }} tour)</span></h5>
        </div>

        <!-- Table kết quả -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th style="width: 10%">HÌNH ẢNH</th>
                <th style="width: 30%">TÊN TOUR</th>
                <th style="width: 15%">GIÁ</th>
                <th style="width: 15%">NGÀY ĐI</th>
                <th style="width: 15%">ĐÁNH GIÁ</th>
                <th style="width: 15%">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tour,index) in filteredTours" :key="tour.id" class="align-middle">
                <td>
                  <img 
                    :src="tour.hinh_anh" 
                    :alt="tour.ten_tour"
                    style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;"
                  >
                </td>
                <td>
                  <p class="mb-1 fw-bold">{{ tour.ten_tour }}</p>
                  <small class="text-muted">Mã tour: {{ tour.ma_tour }}</small>
                </td>
                <td class="fw-bold text-dark">
                  {{ formatCurrency(tour.gia) }}
                </td>
                <td>
                  <small>{{ formatDate(tour.ngay_bat_dau) }}</small>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-1">
                    <span class="text-warning">
                      <i class="fa-solid fa-star"></i>
                    </span>
                    <span>{{ tour.danh_gia }} ({{ tour.so_danh_gia }})</span>
                  </div>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-dark" @click="viewDetail(tour.id)">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
              <tr v-if="filteredTours.length === 0">
                <td colspan="6" class="text-center py-4 text-muted">
                  <p>Không tìm thấy tour phù hợp với tiêu chí của bạn</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Phân trang -->
        <div v-if="totalResults > pageSize" class="d-flex justify-content-center mt-4">
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage--">Trước</button>
              </li>
              <li 
                v-for="page in totalPages" 
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <button class="page-link" @click="currentPage = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage++">Tiếp</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '../../../utils/api'

export default {
  data() {
    return {
      allTours: [
        {
          id: 1,
          ten_tour: 'Tour khám phá Vĩnh Hạ Long 1 ngày',
          ma_tour: 'HL-1001',
          hinh_anh: 'https://hitour.vn/storage/images/upload/tour-du-lich-vinh-ha-long-4-ngay-3-dem-gallery-1666029595-18.webp',
          mo_ta: 'Khám phá vẻ đẹp thiên nhiên của vịnh Hạ Long',
          diem_don: 'TP. HCM',
          ngay_bat_dau: '2024-10-12',
          gia: 1500000,
          so_nguoi_toi_da: 30,
          danh_gia: 4.5,
          so_danh_gia: 121
        },
        {
          id: 2,
          ten_tour: 'Tour khám phá Vĩnh Hạ Long 2 ngày',
          ma_tour: 'HL-1002',
          hinh_anh: 'https://hitour.vn/storage/images/upload/tour-du-lich-vinh-ha-long-4-ngay-3-dem-gallery-1666029595-18.webp',
          mo_ta: 'Khám phá vẻ đẹp thiên nhiên của vịnh Hạ Long',
          diem_don: 'TP. HCM',
          ngay_bat_dau: '2024-10-12',
          gia: 3000000,
          so_nguoi_toi_da: 25,
          danh_gia: 4.5,
          so_danh_gia: 122
        },
        {
          id: 3,
          ten_tour: 'Tour khám phá Vĩnh Hạ Long 3 ngày',
          ma_tour: 'HL-1003',
          hinh_anh: 'https://hitour.vn/storage/images/upload/tour-du-lich-vinh-ha-long-4-ngay-3-dem-gallery-1666029595-18.webp',
          mo_ta: 'Khám phá vẻ đẹp thiên nhiên của vịnh Hạ Long',
          diem_don: 'TP. HCM',
          ngay_bat_dau: '2024-10-12',
          gia: 4500000,
          so_nguoi_toi_da: 20,
          danh_gia: 4.5,
          so_danh_gia: 123
        },
        {
          id: 4,
          ten_tour: 'Tour khám phá Vĩnh Hạ Long 4 ngày',
          ma_tour: 'HL-1004',
          hinh_anh: 'https://hitour.vn/storage/images/upload/tour-du-lich-vinh-ha-long-4-ngay-3-dem-gallery-1666029595-18.webp',
          mo_ta: 'Khám phá vẻ đẹp thiên nhiên của vịnh Hạ Long',
          diem_don: 'TP. HCM',
          ngay_bat_dau: '2024-10-12',
          gia: 6000000,
          so_nguoi_toi_da: 15,
          danh_gia: 4.5,
          so_danh_gia: 124
        },
        {
          id: 5,
          ten_tour: 'Tour khám phá Vĩnh Hạ Long 5 ngày',
          ma_tour: 'HL-1005',
          hinh_anh: 'https://hitour.vn/storage/images/upload/tour-du-lich-vinh-ha-long-4-ngay-3-dem-gallery-1666029595-18.webp',
          mo_ta: 'Khám phá vẻ đẹp thiên nhiên của vịnh Hạ Long',
          diem_don: 'TP. HCM',
          ngay_bat_dau: '2024-10-12',
          gia: 7500000,
          so_nguoi_toi_da: 10,
          danh_gia: 4.5,
          so_danh_gia: 125
        }
      ],
      filteredTours: [],
      
      // Filter inputs
      searchKeyword: '',
      filterFromDate: '',
      filterToDate: '',
      filterPeople: '',
      filterDeparture: '',
      filterType: '',
      
      // Pagination
      currentPage: 1,
      pageSize: 10,
      totalTours: 0,
      totalResults: 0,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.pageSize);
    }
  },
  mounted() {
    this.loadTours();
  },
  watch: {
    currentPage() {
      this.applyFilters();
    }
  },
  methods: {
    loadTours() {
      // Sử dụng dữ liệu mock thay vì gọi API
      this.totalTours = this.allTours.length;
      this.applyFilters();
    },
    
    searchTours() {
      this.currentPage = 1;
      this.applyFilters();
    },
    
    applyFilters() {
      let results = this.allTours.slice();
      
      // Filter by keyword
      if (this.searchKeyword) {
        results = results.filter(tour => 
          tour.ten_tour.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          tour.diem_don.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          tour.mo_ta.toLowerCase().includes(this.searchKeyword.toLowerCase())
        );
      }
      
      // Filter by from date
      if (this.filterFromDate) {
        results = results.filter(tour => 
          new Date(tour.ngay_bat_dau) >= new Date(this.filterFromDate)
        );
      }
      
      // Filter by to date
      if (this.filterToDate) {
        results = results.filter(tour => 
          new Date(tour.ngay_bat_dau) <= new Date(this.filterToDate)
        );
      }
      
      // Filter by departure point
      if (this.filterDeparture) {
        results = results.filter(tour => 
          tour.diem_don === this.filterDeparture
        );
      }
      
      // Filter by number of people (check if tour still has slots)
      if (this.filterPeople) {
        results = results.filter(tour => 
          tour.so_nguoi_toi_da >= parseInt(this.filterPeople)
        );
      }
      
      this.totalResults = results.length;
      
      // Pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.filteredTours = results.slice(startIndex, endIndex);
    },
    
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN');
    },
    
    viewDetail(tourId) {
      
      this.$router.push(`/chi-tiet-tour/${tourId}`);
    },
    
    bookTour(tourId) {
     
      this.$router.push(`/dat-tour/${tourId}`);
    }
  }
}
</script>

<style scoped>
.search-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.search-form-wrapper {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-bar .input-group {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0;
}

.search-bar .form-control {
  border: none !important;
  padding: 12px;
  font-size: 0.95rem;
}

.search-bar .form-control::placeholder {
  color: #999;
}

.search-bar .input-group-text {
  border: none !important;
  padding: 0 12px;
  color: #666;
}

.filter-row .form-label {
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #333;
}

.filter-row .form-control,
.filter-row .form-select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.filter-row .form-control:focus,
.filter-row .form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-dark {
  background-color: #222;
  border: none;
}

.btn-dark:hover {
  background-color: #000;
}

.results-section {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table {
  margin-bottom: 0;
}

.table thead {
  background-color: #f5f5f5;
}

.table thead th {
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
  padding: 15px;
}

.table tbody td {
  border-color: #e9ecef;
  padding: 15px;
  font-size: 0.9rem;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

.btn-primary, .btn-outline-success {
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.pagination {
  gap: 5px;
}

.page-link {
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #007bff;
  margin: 0 2px;
}

.page-link:hover {
  color: #0056b3;
  background-color: #f8f9fa;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  color: #999;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-row .col-md-2 {
    flex: 0 0 50%;
  }
  
  .search-form-wrapper {
    padding: 15px;
  }
  
  .table thead th,
  .table tbody td {
    padding: 10px;
    font-size: 0.85rem;
  }
}
</style>
