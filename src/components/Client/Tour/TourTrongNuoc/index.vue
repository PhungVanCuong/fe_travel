<template>
  <div class="tour-browse-container" style="background-color: #F2F7FA; min-height: 100vh; padding-bottom: 50px;">

    <div class="page-header text-center py-5 text-white"
      style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1920&q=80') center/cover;">
      <h1 class="fw-bold text-white">Khám Phá Việt Nam</h1>
      <p class="fs-5 mt-2">Hành trình tuyệt vời trên mọi miền Tổ quốc cùng Ixtal Tour</p>
    </div>

    <div class="container mt-5">
      <div class="row">

        <!-- CỘT BỘ LỌC BÊN TRÁI -->
        <div class="col-lg-3 col-md-4 mb-4">
          <div class="sidebar-sticky">

            <div class="filters-wrapper p-4 rounded-4 bg-white shadow-sm border-0 mb-4">
              <h5 class="fw-bold mb-4" style="color: #125633;">Bộ lọc tìm kiếm</h5>

              <!-- ĐÃ SỬA: LỌC THEO MIỀN BẮC, TRUNG, NAM -->
              <div class="filter-group mb-4">
                <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-geo-alt-fill text-success me-2"></i>
                  Khu vực (Vùng miền)</h6>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="regionBac" value="Miền Bắc" v-model="filterRegions">
                  <label class="form-check-label text-secondary" for="regionBac">Miền Bắc</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="regionTrung" value="Miền Trung" v-model="filterRegions">
                  <label class="form-check-label text-secondary" for="regionTrung">Miền Trung</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="regionNam" value="Miền Nam" v-model="filterRegions">
                  <label class="form-check-label text-secondary" for="regionNam">Miền Nam</label>
                </div>
              </div>

              <!-- LỌC THỜI GIAN (GIỮ NGUYÊN) -->
              <div class="filter-group mb-4">
                <h6 class="fw-bold mb-3 d-flex align-items-center"><i
                    class="bi bi-calendar-event-fill text-success me-2"></i> Thời gian</h6>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="duration" id="dur1" value="1"
                    v-model="filterDuration">
                  <label class="form-check-label text-secondary" for="dur1">Trong ngày (1 ngày)</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="duration" id="dur2" value="2-3"
                    v-model="filterDuration">
                  <label class="form-check-label text-secondary" for="dur2">Trung bình (2 - 3 ngày)</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="duration" id="dur3" value="4+"
                    v-model="filterDuration">
                  <label class="form-check-label text-secondary" for="dur3">Dài ngày (Từ 4 ngày)</label>
                </div>
              </div>

              <!-- LỌC MỨC GIÁ (GIỮ NGUYÊN) -->
              <div class="filter-group mb-4">
                <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-cash-coin text-success me-2"></i> Mức
                  giá</h6>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="price1" value="<2000000" v-model="priceRanges">
                  <label class="form-check-label text-secondary" for="price1">Dưới 2 triệu</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="price2" value="2000000-5000000"
                    v-model="priceRanges">
                  <label class="form-check-label text-secondary" for="price2">2 - 5 triệu</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="price3" value=">5000000" v-model="priceRanges">
                  <label class="form-check-label text-secondary" for="price3">Trên 5 triệu</label>
                </div>
              </div>

              <button class="btn w-100 rounded-pill fw-bold" style="background-color: #8fdfb5; color: #125633;"
                @click="resetFilters">
                <i class="bi bi-arrow-clockwise me-1"></i> Đặt lại bộ lọc
              </button>
            </div>

            <!-- CẨM NANG DU LỊCH (GIỮ NGUYÊN) -->
            <div class="articles-wrapper p-3 rounded-4 shadow-sm bg-white border-0">
              <h6 class="fw-bold text-uppercase mb-3" style="color: #005baa;">
                <i class="fa-solid fa-map-location-dot me-2"></i> Cẩm nang du lịch
              </h6>

              <div class="article-item mb-3 pb-2 border-bottom" v-for="(bai, index) in baiVietNoiBat" :key="index">
                <router-link :to="`/client/chi-tiet-bai-viet/${bai.id}`"
                  class="text-decoration-none text-dark d-flex gap-2 align-items-start">
                  <img :src="bai.hinh_anh" class="rounded" style="width: 60px; height: 60px; object-fit: cover;" alt="">
                  <div>
                    <h6 class="mb-1" style="font-size: 0.85rem; font-weight: 600; line-height: 1.3;">{{ bai.tieu_de }}
                    </h6>
                    <small class="text-muted" style="font-size: 0.75rem;">{{ bai.tag }}</small>
                  </div>
                </router-link>
              </div>

              <router-link to="/client/bai-viet" class="text-primary small fw-bold text-decoration-none">Xem tất cả bài viết <i
                  class="fa-solid fa-arrow-right ms-1"></i></router-link>
            </div>

          </div>
        </div>

        <!-- CỘT DANH SÁCH TOUR BÊN PHẢI -->
        <div class="col-lg-9 col-md-8">

          <div
            class="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 shadow-sm mb-4">
            <div class="input-group w-50">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
              <input type="text" class="form-control border-start-0 ps-0 shadow-none"
                placeholder="Tìm tên tour trong nước..." v-model="filterSearch">
            </div>

            <div class="d-flex align-items-center mt-3 mt-md-0">
              <span class="me-2 text-muted small">Sắp xếp:</span>
              <select class="form-select border-0 shadow-none fw-bold" style="background-color: #F2F7FA;"
                v-model="sortBy">
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>
          </div>

          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border" style="color: #8fdfb5;" role="status"></div>
            <p class="mt-2 text-muted">Đang tìm kiếm...</p>
          </div>

          <div v-else-if="filteredAndSortedTours.length === 0"
            class="alert bg-white shadow-sm border-0 text-center py-5 rounded-4">
            <i class="bi bi-geo-alt fs-1 text-muted"></i>
            <h5 class="mt-3 fw-bold">Không tìm thấy tour trong nước phù hợp</h5>
            <p class="text-muted">Vui lòng thử lại với các tiêu chí lọc khác.</p>
            <button class="btn btn-outline-success rounded-pill" @click="resetFilters">Xóa bộ lọc</button>
          </div>

          <div v-else class="row">
            <template v-for="(value, index) in filteredAndSortedTours" :key="index">
              <div class="col-lg-4 col-md-6 mb-4 mt-2">
                <div class="card h-100 shadow-sm border-0 position-relative tour-card"
                  style="cursor: pointer; border-radius: 12px; transition: transform 0.3s ease;"
                  @click="viewDetail(value.id)">

                  <img :src="value.hinh_anh" class="card-img-top" :alt="value.ten_tour"
                    style="height: 200px; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px;">

                  <div class="position-absolute z-2 text-white px-2 py-1 bg-dark bg-opacity-50 rounded"
                    style="top: 160px; right: 10px; font-size: 0.85rem;">
                    <i class="bi bi-people-fill"></i> Còn lại: {{ value.so_nguoi_toi_da }} khách
                  </div>

                  <div class="card-body d-flex flex-column pt-3">
                    <h5 class="card-title fw-bold text-dark mb-2"
                      style="font-size: 1.1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      {{ value.ten_tour }}
                    </h5>

                    <div class="mb-3" style="color: #FEE715; font-size: 13px;">
                      <i class="fa-solid fa-star me-1"></i>
                      <span class="fw-bold text-dark">
                        {{ value.avg_sao ? Number(value.avg_sao).toFixed(1) : 'Chưa có đánh giá' }}
                      </span>
                      <span class="text-muted">({{ value.so_luot_danh_gia || 0 }} đánh giá)</span>
                    </div>

                    <div class="d-flex flex-column gap-2 mb-3 text-secondary" style="font-size: 0.9rem;">
                      <div class="d-flex align-items-start gap-2">
                        <i class="bi bi-geo-alt text-primary mt-1"></i>
                        <span>Đón tại: <strong>{{ value.diem_don }}</strong></span>
                      </div>
                      <div class="d-flex align-items-start gap-2">
                        <i class="bi bi-clock text-primary mt-1"></i>
                        <span>Thời gian: <strong>{{ calculateDays(value.ngay_bat_dau, value.ngay_ket_thuc) }} ngày</strong></span>
                      </div>
                    </div>

                    <div class="mt-auto pt-3 border-top">
                      <div class="mb-3">
                        <span class="d-block text-muted mb-1" style="font-size: 0.85rem;">Khởi hành: {{ formatDate(value.ngay_bat_dau) }}</span>
                        <h5 class="fw-bold mb-0 text-danger">
                          {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.gia) }}
                        </h5>
                      </div>
                      <div class="d-flex gap-2">
                        <button class="btn btn-outline-success btn-sm w-100 fw-bold rounded-pill"
                          @click.stop="viewDetail(value.id)">
                          Chi tiết
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </template>
          </div>

          <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
            <ul class="pagination shadow-sm">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link px-3" @click="currentPage--">Trước</button>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <button class="page-link" @click="currentPage = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link px-3" @click="currentPage++">Sau</button>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '../../../../utils/api'

// HẰNG SỐ: Khai báo sẵn 63 tỉnh thành chia làm 3 miền
const VIETNAM_REGIONS = {
  'Miền Bắc': [
    'Hà Nội', 'Hà Giang', 'Cao Bằng', 'Bắc Kạn', 'Tuyên Quang', 'Lào Cai', 'Điện Biên', 'Lai Châu', 'Sơn La', 'Yên Bái', 'Hòa Bình', 'Thái Nguyên', 'Lạng Sơn', 'Quảng Ninh', 'Bắc Giang', 'Phú Thọ', 'Vĩnh Phúc', 'Bắc Ninh', 'Hải Dương', 'Hải Phòng', 'Hưng Yên', 'Thái Bình', 'Hà Nam', 'Nam Định', 'Ninh Bình'
  ],
  'Miền Trung': [
    'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng', 'Đà Lạt' // Bổ sung "Đà Lạt" vì đôi khi data ghi là Đà Lạt thay vì Lâm Đồng
  ],
  'Miền Nam': [
    'Bình Phước', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu', 'Bà Rịa Vũng Tàu', 'Hồ Chí Minh', 'TP. Hồ Chí Minh', 'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long', 'Đồng Tháp', 'An Giang', 'Kiên Giang', 'Phú Quốc', 'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau' // Bổ sung "Phú Quốc" 
  ]
};

export default {
  data() {
    return {
      isLoading: true,
      allTours: [],
      filteredTours: [],

      baiVietNoiBat: [], 
      danhSachIdBaiViet: [1, 4, 5],

      filterSearch: '',
      filterRegions: [], // Đã đổi từ filterDestinations sang array chứa tên Miền (Miền Bắc, Miền Trung...)
      filterDuration: '',
      priceRanges: [],
      sortBy: 'newest',

      currentPage: 1,
      pageSize: 9,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTours.length / this.pageSize);
    },

    filteredAndSortedTours() {
      let results = this.filteredTours.slice();

      if (this.sortBy === 'price-asc') results.sort((a, b) => parseFloat(a.gia) - parseFloat(b.gia));
      else if (this.sortBy === 'price-desc') results.sort((a, b) => parseFloat(b.gia) - parseFloat(a.gia));
      else if (this.sortBy === 'newest') results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      else if (this.sortBy === 'rating') results.sort((a, b) => parseFloat(b.avg_sao || 0) - parseFloat(a.avg_sao || 0));

      const startIndex = (this.currentPage - 1) * this.pageSize;
      return results.slice(startIndex, startIndex + this.pageSize);
    }
  },
  mounted() {
    this.fetchDomesticTours();
    this.fetchArticles(); 
  },
  watch: {
    filterSearch() { this.applyFilters(); },
    filterRegions: { handler() { this.applyFilters(); }, deep: true }, // Theo dõi thay đổi của check box Miền
    filterDuration() { this.applyFilters(); },
    priceRanges: { handler() { this.applyFilters(); }, deep: true },
    sortBy() { this.currentPage = 1; }
  },
  methods: {
    async fetchDomesticTours() {
      this.isLoading = true;
      try {
        const response = await axios.get(apiUrl('client/tour/get-data'));
        if (response.data.status) {
          // Lọc ra các tour trong nước (id_quoc_gia = 1)
          this.allTours = response.data.data.filter(tour => tour.id_quoc_gia === 1 && tour.so_nguoi_toi_da > 0);
          this.applyFilters();
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchArticles() {
      try {
        const response = await axios.get(apiUrl('client/trang-chu/get-data'));
        if (response.data.status) {
          const tatCaBaiViet = response.data.data.baiViets || [];
          this.baiVietNoiBat = tatCaBaiViet.filter(bai => this.danhSachIdBaiViet.includes(bai.id));
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      }
    },

    applyFilters() {
      let results = this.allTours.slice();

      // 1. Lọc theo Tên Tour
      if (this.filterSearch) {
        results = results.filter(t => t.ten_tour.toLowerCase().includes(this.filterSearch.toLowerCase()));
      }

      // 2. LỌC THEO MIỀN BẮC, TRUNG, NAM
      if (this.filterRegions.length > 0) {
        // Gộp tất cả các tỉnh thành thuộc các miền mà người dùng đã tick
        let allowedCities = [];
        this.filterRegions.forEach(region => {
            allowedCities = allowedCities.concat(VIETNAM_REGIONS[region]);
        });

        // Tìm kiếm xem Tour đó có điểm đến nào nằm trong allowedCities không
        results = results.filter(t => {
            if (t.lich_trinhs && t.lich_trinhs.length > 0) {
                // Kiểm tra tất cả các lịch trình của tour này
                return t.lich_trinhs.some(lt => {
                    if (lt.diem_den && lt.diem_den.thanh_pho) {
                        // So sánh linh hoạt (VD: "Đà Nẵng" sẽ khớp nếu trong data là "TP. Đà Nẵng")
                        return allowedCities.some(city => lt.diem_den.thanh_pho.includes(city) || city.includes(lt.diem_den.thanh_pho));
                    }
                    return false;
                });
            }
            return false;
        });
      }

      // 3. Lọc theo Thời gian
      if (this.filterDuration) {
        results = results.filter(t => {
          const days = this.calculateDays(t.ngay_bat_dau, t.ngay_ket_thuc);
          if (this.filterDuration === '1') return days <= 1;
          if (this.filterDuration === '2-3') return days >= 2 && days <= 3;
          if (this.filterDuration === '4+') return days >= 4;
        });
      }

      // 4. Lọc theo Giá
      if (this.priceRanges.length > 0) {
        results = results.filter(t => {
          const price = parseFloat(t.gia);
          return this.priceRanges.some(r => {
            if (r === '<2000000') return price < 2000000;
            if (r === '2000000-5000000') return price >= 2000000 && price <= 5000000;
            if (r === '>5000000') return price > 5000000;
          });
        });
      }

      this.filteredTours = results;
      this.currentPage = 1;
    },

    resetFilters() {
      this.filterSearch = '';
      this.filterRegions = []; // Reset bộ lọc Miền
      this.filterDuration = '';
      this.priceRanges = [];
      this.sortBy = 'newest';
      this.applyFilters();
    },

    calculateDays(start, end) {
      if (!start || !end) return 1;
      return Math.ceil(Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const d = new Date(dateString);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    },

    viewDetail(id) { this.$router.push(`/client/chi-tiet-tour/${id}`); },
  }
}
</script>

<style scoped>
.tour-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.form-check-input:checked {
  background-color: #125633;
  border-color: #125633;
}

.sidebar-sticky {
  position: sticky;
  top: 20px;
  z-index: 10;
}

.sidebar-sticky::-webkit-scrollbar {
  width: 4px;
}

.sidebar-sticky::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
</style>