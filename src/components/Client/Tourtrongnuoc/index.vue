<template>
  <div class="tour-browse-container">
    <div class="container-fluid py-4">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb small">
          <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
          <li class="breadcrumb-item"><router-link to="/tour">Tour</router-link></li>
          <li class="breadcrumb-item active">{{ activeCategoryName }}</li>
        </ol>
      </nav>

      <div class="row">
        <!-- Sidebar Filters -->
        <div class="col-lg-3 col-md-4 mb-4">
          <div class="filters-wrapper">
            <!-- Filter Title -->
            <h5 class="fw-bold mb-4">Khám phá các Tour Du lịch</h5>

            <!-- Điểm đến Filter -->
            <div class="filter-group mb-4">
              <h6 class="filter-title fw-bold d-flex align-items-center mb-3">
                <i class="bi bi-geo-alt me-2"></i>
                Điểm đến
              </h6>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="dest1" value="Trong nước" v-model="filterDestinations">
                <label class="form-check-label" for="dest1">Trong nước</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="dest2" value="Nước ngoài" v-model="filterDestinations">
                <label class="form-check-label" for="dest2">Nước ngoài</label>
              </div>
            </div>

            <!-- Kỳ lưỡng Filter -->
            <div class="filter-group mb-4">
              <h6 class="filter-title fw-bold d-flex align-items-center mb-3">
                <i class="bi bi-calendar-event me-2"></i>
                Kỳ lưỡng
              </h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="duration" id="dur1" value="1" v-model="filterDuration">
                <label class="form-check-label" for="dur1">1 ngày</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="duration" id="dur2" value="2" v-model="filterDuration">
                <label class="form-check-label" for="dur2">2 ngày</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="duration" id="dur3" value="3" v-model="filterDuration">
                <label class="form-check-label" for="dur3">3 ngày</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="duration" id="dur4" value="Quá 4 ngày" v-model="filterDuration">
                <label class="form-check-label" for="dur4">Quá 4 ngày</label>
              </div>
            </div>

            <!-- Mã tour Filter -->
            <div class="filter-group mb-4">
              <h6 class="filter-title fw-bold d-flex align-items-center mb-3">
                <i class="bi bi-list me-2"></i>
                Mã tour
              </h6>
              <input type="text" class="form-control form-control-sm" placeholder="Tìm mã tour..." v-model="filterTourCode">
            </div>

            <!-- Mức giá Filter -->
            <div class="filter-group mb-4">
              <h6 class="filter-title fw-bold d-flex align-items-center mb-3">
                <i class="bi bi-cash me-2"></i>
                Mức giá
              </h6>
              <div class="d-flex gap-2 mb-2">
                <input type="number" class="form-control form-control-sm" placeholder="Min" v-model="filterPriceMin">
                <input type="number" class="form-control form-control-sm" placeholder="Max" v-model="filterPriceMax">
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="price1" value="1000000" v-model="priceRanges">
                <label class="form-check-label" for="price1">Dưới 1 triệu</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="price2" value="5000000" v-model="priceRanges">
                <label class="form-check-label" for="price2">1 - 5 triệu</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="price3" value="10000000" v-model="priceRanges">
                <label class="form-check-label" for="price3">5 - 10 triệu</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="price4" value="999999999" v-model="priceRanges">
                <label class="form-check-label" for="price4">Trên 10 triệu</label>
              </div>
            </div>

            <!-- Đánh giá Filter -->
            <div class="filter-group mb-4">
              <h6 class="filter-title fw-bold d-flex align-items-center mb-3">
                <i class="bi bi-star me-2"></i>
                Đánh giá
              </h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rating" id="rating1" value="5" v-model="filterRating">
                <label class="form-check-label d-flex align-items-center" for="rating1">
                  <span class="text-warning me-1">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </span>
                  5 sao
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rating" id="rating2" value="4" v-model="filterRating">
                <label class="form-check-label d-flex align-items-center" for="rating2">
                  <span class="text-warning me-1">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </span>
                  4+ sao
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rating" id="rating3" value="3" v-model="filterRating">
                <label class="form-check-label d-flex align-items-center" for="rating3">
                  <span class="text-warning me-1">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </span>
                  3+ sao
                </label>
              </div>
            </div>

            <!-- Reset Filter -->
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="bi bi-arrow-clockwise me-2"></i>
              Xóa bộ lọc
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-lg-9 col-md-8">
          <!-- Header -->
          <div class="mb-4">
            <h3 class="fw-bold mb-3">{{ activeCategoryName }}</h3>
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="text-muted mb-0">Có <strong>{{ totalResults }}</strong> tour</p>
              <select class="form-select form-select-sm w-auto" v-model="sortBy">
                <option value="">Sắp xếp theo</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>
          </div>

          <!-- Tour Cards Grid -->
          <div class="row g-4">
            <template v-for="tour in filteredAndSortedTours" :key="tour.id">
              <div class="col-12">
                <div class="tour-card p-3 border rounded-3 h-100">
                  <div class="row">
                    <!-- Tour Image -->
                    <div class="col-md-3">
                      <img :src="tour.hinh_anh" :alt="tour.ten_tour" class="img-fluid rounded-2" style="height: 200px; object-fit: cover; width: 100%;">
                    </div>

                    <!-- Tour Details -->
                    <div class="col-md-6">
                      <div class="tour-info">
                        <h5 class="fw-bold mb-2" style="line-height: 1.4;">{{ tour.ten_tour }}</h5>
                        
                        <!-- Rating -->
                        <div class="d-flex align-items-center gap-2 mb-3">
                          <span class="text-warning">
                            <i class="fa-solid fa-star"></i>
                          </span>
                          <span class="fw-bold">{{ tour.danh_gia }}</span>
                          <span class="text-muted">({{ tour.so_danh_gia }} đánh giá)</span>
                        </div>

                        <!-- Tour Details -->
                        <div class="tour-details small mb-3">
                          <div class="mb-2 d-flex align-items-start gap-2">
                            <i class="fa-solid fa-location-dot text-danger mt-1" style="font-size: 0.8rem;"></i>
                            <span>Điểm đi: <strong>{{ tour.diem_don }}</strong> - Điểm tới: <strong>{{ tour.diem_den || 'Hạ Long' }}</strong></span>
                          </div>
                          <div class="mb-2 d-flex align-items-start gap-2">
                            <i class="fa-solid fa-calendar-days text-danger mt-1" style="font-size: 0.8rem;"></i>
                            <span>Ngày đi: <strong>{{ formatDate(tour.ngay_bat_dau) }}</strong> - Ngày về: <strong>{{ formatDate(tour.ngay_ket_thuc || tour.ngay_bat_dau) }}</strong></span>
                          </div>
                          <div class="d-flex align-items-start gap-2">
                            <i class="fa-solid fa-info-circle text-danger mt-1" style="font-size: 0.8rem;"></i>
                            <span>{{ tour.mo_ta }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Price & Action -->
                    <div class="col-md-3 text-end d-flex flex-column justify-content-between">
                      <div class="mb-3">
                        <div class="text-muted small mb-1">Giá từ</div>
                        <h4 class="fw-bold text-danger mb-0">{{ formatCurrency(tour.gia) }}</h4>
                        <small class="text-muted">/ 1 người</small>
                      </div>
                      <div>
                        <button class="btn btn-outline-primary btn-sm w-100 mb-2" @click="viewDetail(tour.id)">
                          Xem chi tiết
                        </button>
                        <button class="btn btn-dark btn-sm w-100" @click="bookTour(tour.id)">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- No Results -->
            <div v-if="filteredAndSortedTours.length === 0" class="col-12">
              <div class="alert alert-info text-center py-5">
                <p class="mb-0">Không tìm thấy tour phù hợp với tiêu chí tìm kiếm</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="d-flex justify-content-center mt-5">
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="currentPage--">
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
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
                  <button class="page-link" @click="currentPage++">
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
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
          ten_tour: 'Tour Du lịch Đà Nẵng - Hội An - Bà Nà Hills 4 Ngày 3 Đêm',
          ma_tour: 'HL-1001',
          hinh_anh: 'https://via.placeholder.com/300x200?text=Tour+1',
          mo_ta: 'Khám phá vẻ đẹp Đà Nẵng, Hội An cổ kính và núi Bà Nà hùng vĩ',
          diem_don: 'TP. HCM',
          diem_den: 'Đà Nẵng',
          ngay_bat_dau: '2024-10-12',
          ngay_ket_thuc: '2024-10-16',
          gia: 4990000,
          so_nguoi_toi_da: 30,
          danh_gia: 4.8,
          so_danh_gia: 324
        },
        {
          id: 2,
          ten_tour: 'Tour Du lịch Đà Nẵng - Hội An - Bà Nà Hills 4 Ngày 3 Đêm',
          ma_tour: 'HL-1002',
          hinh_anh: 'https://via.placeholder.com/300x200?text=Tour+2',
          mo_ta: 'Khám phá vẻ đẹp Đà Nẵng, Hội An cổ kính và núi Bà Nà hùng vĩ',
          diem_don: 'TP. HCM',
          diem_den: 'Đà Nẵng',
          ngay_bat_dau: '2024-10-12',
          ngay_ket_thuc: '2024-10-16',
          gia: 5200000,
          so_nguoi_toi_da: 25,
          danh_gia: 4.8,
          so_danh_gia: 324
        },
        {
          id: 3,
          ten_tour: 'Tour Du lịch Đà Nẵng - Hội An - Bà Nà Hills 4 Ngày 3 Đêm',
          ma_tour: 'HL-1003',
          hinh_anh: 'https://via.placeholder.com/300x200?text=Tour+3',
          mo_ta: 'Khám phá vẻ đẹp Đà Nẵng, Hội An cổ kính và núi Bà Nà hùng vĩ',
          diem_don: 'Hà Nội',
          diem_den: 'Đà Nẵng',
          ngay_bat_dau: '2024-10-12',
          ngay_ket_thuc: '2024-10-16',
          gia: 3500000,
          so_nguoi_toi_da: 20,
          danh_gia: 4.8,
          so_danh_gia: 324
        },
        {
          id: 4,
          ten_tour: 'Tour Du lịch Đà Nẵng - Hội An - Bà Nà Hills 4 Ngày 3 Đêm',
          ma_tour: 'HL-1004',
          hinh_anh: 'https://via.placeholder.com/300x200?text=Tour+4',
          mo_ta: 'Khám phá vẻ đẹp Đà Nẵng, Hội An cổ kính và núi Bà Nà hùng vĩ',
          diem_don: 'TP. HCM',
          diem_den: 'Đà Nẵng',
          ngay_bat_dau: '2024-10-15',
          ngay_ket_thuc: '2024-10-19',
          gia: 8900000,
          so_nguoi_toi_da: 15,
          danh_gia: 4.8,
          so_danh_gia: 324
        }
      ],
      filteredTours: [],
      
      // Filters
      filterDestinations: [],
      filterDuration: '',
      filterTourCode: '',
      filterPriceMin: '',
      filterPriceMax: '',
      priceRanges: [],
      filterRating: '',
      
      // Sorting & Pagination
      sortBy: '',
      currentPage: 1,
      pageSize: 5,
      
      // Category
      activeCategory: 'trong-nuoc',
    }
  },
  computed: {
    activeCategoryName() {
      return this.activeCategory === 'trong-nuoc' ? 'Tour Trong Nước' : 'Tour Nước Ngoài';
    },
    
    totalResults() {
      return this.filteredTours.length;
    },
    
    totalPages() {
      return Math.ceil(this.filteredTours.length / this.pageSize);
    },
    
    filteredAndSortedTours() {
      let results = this.filteredTours.slice();
      
      // Sort
      if (this.sortBy === 'price-asc') {
        results.sort((a, b) => a.gia - b.gia);
      } else if (this.sortBy === 'price-desc') {
        results.sort((a, b) => b.gia - a.gia);
      } else if (this.sortBy === 'rating-desc') {
        results.sort((a, b) => b.danh_gia - a.danh_gia);
      }
      
      // Pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return results.slice(startIndex, endIndex);
    }
  },
  mounted() {
    this.activeCategory = this.$route.params.category || 'trong-nuoc';
    this.loadTours();
  },
  watch: {
    filterDestinations: {
      handler() { this.applyFilters(); },
      deep: true
    },
    filterDuration() { this.applyFilters(); },
    filterTourCode() { this.applyFilters(); },
    filterPriceMin() { this.applyFilters(); },
    filterPriceMax() { this.applyFilters(); },
    priceRanges: {
      handler() { this.applyFilters(); },
      deep: true
    },
    filterRating() { this.applyFilters(); }
  },
  methods: {
    loadTours() {
      // Using mock data
      this.applyFilters();
    },
    
    applyFilters() {
      let results = this.allTours.slice();
      
      // Filter by destination
      if (this.filterDestinations.length > 0) {
        results = results.filter(tour => 
          this.filterDestinations.includes(tour.diem_den)
        );
      }
      
      // Filter by tour code
      if (this.filterTourCode) {
        results = results.filter(tour => 
          tour.ma_tour.toLowerCase().includes(this.filterTourCode.toLowerCase())
        );
      }
      
      // Filter by price min/max
      if (this.filterPriceMin) {
        results = results.filter(tour => tour.gia >= parseInt(this.filterPriceMin));
      }
      if (this.filterPriceMax) {
        results = results.filter(tour => tour.gia <= parseInt(this.filterPriceMax));
      }
      
      // Filter by price ranges
      if (this.priceRanges.length > 0) {
        results = results.filter(tour => {
          return this.priceRanges.some(range => {
            const rangeNum = parseInt(range);
            if (rangeNum === 1000000) return tour.gia < 1000000;
            if (rangeNum === 5000000) return tour.gia >= 1000000 && tour.gia <= 5000000;
            if (rangeNum === 10000000) return tour.gia > 5000000 && tour.gia <= 10000000;
            if (rangeNum === 999999999) return tour.gia > 10000000;
          });
        });
      }
      
      // Filter by rating
      if (this.filterRating) {
        results = results.filter(tour => tour.danh_gia >= parseInt(this.filterRating));
      }
      
      this.filteredTours = results;
      this.currentPage = 1;
    },
    
    resetFilters() {
      this.filterDestinations = [];
      this.filterDuration = '';
      this.filterTourCode = '';
      this.filterPriceMin = '';
      this.filterPriceMax = '';
      this.priceRanges = [];
      this.filterRating = '';
      this.applyFilters();
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
.tour-browse-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 0;
}

.filters-wrapper {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
}

.filter-title {
  color: #333;
  font-size: 0.95rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.filter-group .form-check {
  margin-bottom: 8px;
}

.filter-group .form-check-label {
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
  margin-bottom: 0;
}

.tour-card {
  background: white;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border: 1px solid #e0e0e0 !important;
}

.tour-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.tour-info h5 {
  color: #333;
  font-size: 1.05rem;
}

.tour-details {
  color: #666;
  line-height: 1.6;
}

.tour-details i {
  flex-shrink: 0;
}

.btn-dark {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}

.btn-dark:hover {
  background-color: #000;
  border-color: #000;
}

.pagination .page-link {
  color: #007bff;
  border-radius: 4px;
  margin: 0 2px;
  border: 1px solid #ddd;
}

.pagination .page-link:hover {
  color: #0056b3;
  background-color: #f8f9fa;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.pagination .page-item.disabled .page-link {
  color: #999;
  pointer-events: none;
}

@media (max-width: 768px) {
  .filters-wrapper {
    position: static;
  }
  
  .tour-card {
    margin-bottom: 10px;
  }
}
</style>
