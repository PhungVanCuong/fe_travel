<template>
  <div v-if="list_slide.length > 0" id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <template v-for="(value, index) in list_slide" :key="index">
        <div class="carousel-item" :class="{ 'active': index === 0 }" style="position: relative;">

          <img :src="value.hinh_anh" class="d-block w-100" :alt="value.tieu_de || 'Slide'"
            style="width: 100%; height: 100%; object-fit: contain; object-position: center; background-color: #000;">

          <div
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.8) 100%); z-index: 1; pointer-events: none;">
          </div>

          <div
            class="carousel-caption d-flex flex-column align-items-start text-start p-4 h-100 justify-content-end pb-5"
            style="position: absolute; z-index: 10; bottom: 0; left: 0; width: 100%; color: #fff; transform: none;">

            <div class="mb-3">
              <span
                style="display: inline-block; background-color: #8fdfb5; color: #125633; padding: 8px 16px; border-radius: 4px; font-weight: 600; font-size: 0.9rem;">
                PREMIUM CONCIERGE
              </span>
            </div>

            <h1 class=" text-white fw-bold mb-3" style="font-size: 3.5rem; line-height: 1.2;">
              Khám Phá Việt Nam<br>Cùng <span style="color: #8fdfb5;">Ixtal Tour</span>
            </h1>

            <p class="mb-4 w-75" style="font-size: 1.1rem; line-height: 1.6;">
              Hành trình được "may đo" riêng cho bạn. Trọn vẹn Việt Nam, vươn tầm thế giới .
            </p>

            <div class="d-flex gap-5">
              <div class="text-center">
                <h2 class=" text-white  mb-1" style="font-size: 2.5rem;">10K+</h2>
                <p class="mb-0" style="font-size: 1rem; color: rgba(255, 255, 255, 0.8);">Khách hàng</p>
              </div>
              <div class="text-center">
                <h2 class=" text-white  mb-1" style="font-size: 2.5rem;">500+</h2>
                <p class="mb-0" style="font-size: 1rem; color: rgba(255, 255, 255, 0.8);">Tours cao cấp</p>
              </div>
              <div class="text-center">
                <h2 class=" text-white  mb-1" style="font-size: 2.5rem;">98%</h2>
                <p class="mb-0" style="font-size: 1rem; color: rgba(255, 255, 255, 0.8);">Hài lòng</p>
              </div>
            </div>

          </div>
        </div>
      </template>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="prev" style="z-index: 11;">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="next" style="z-index: 11;">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <div class="container my-5">
    <h1>Danh sách tour</h1>
    <div class="row">
      <template v-for="(value, index) in list_tour.filter(x => x.tinh_trang === 1 && x.so_nguoi_toi_da > 0).slice(0, 4)" :key="index">
        <div class="col-lg-3 col-md-6 mb-4 mt-2">
          <div class="card h-100 shadow-sm border-0 position-relative tour-card "
            style="cursor: pointer; border-radius: 12px; transition: transform 0.3s ease; ">

            <img :src="value.hinh_anh" class="card-img-top" :alt="value.ten_tour"
              style="height: 220px; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px;">

            <div class="position-absolute z-2 text-white px-2 py-1 bg-dark bg-opacity-50 rounded"
              style="top: 180px; right: 10px; font-size: 0.85rem;">
              <i class="bi bi-people-fill"></i> Còn lại: {{ value.so_nguoi_toi_da }} khách
            </div>

            <div class="card-body d-flex flex-column pt-4">

              <h5 class="card-title fw-bold text-dark mb-3"
                style="line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                {{ value.ten_tour }}
              </h5>
              <div class="d-flex flex-column gap-2 mb-3 text-secondary" style="font-size: 0.95rem;">
                <div class="d-flex align-items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-geo-alt text-primary mt-1" viewBox="0 0 16 16">
                    <path
                      d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  <span>Đón tại: <strong>{{ value.diem_don }}</strong></span>
                </div>
              </div>
              <p class="text-muted mb-4"
                style="font-size: 0.9rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                {{ value.mo_ta }}
              </p>

              <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <div>
                  <span class="d-block text-muted mb-1" style="font-size: 0.85rem;">KT: {{ value.ngay_bat_dau }}</span>
                  <h5 class="fw-bold mb-0 text-danger">
                    {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.gia) }}
                  </h5>
                </div>
                <a href="javascript:;" class="btn btn-primary btn-sm rounded-pill px-3">
                  <i class="bx bx-star"></i> Chi tiết
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '../../../utils/api'
export default {
  data() {
    return {
      list_tour: [],
      list_bv: [],
      list_slide: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.get(apiUrl('client/trang-chu/get-data'))
        .then((res) => {
          this.list_tour = res.data.data.tours;
          this.list_bv = res.data.data.baiViets;
          this.list_slide = res.data.data.slides || [];
        })
    },
  }
}
</script>

<style scoped>
/* CSS cho trang chủ */
</style>