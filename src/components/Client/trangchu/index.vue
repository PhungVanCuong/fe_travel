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

  <div class="section-background py-4">
    <div class="container my-0">
      <h1>Tour được yêu thích nhất</h1>
      <div class="row">
        <template
          v-for="(value, index) in list_tour.filter(x => x.tinh_trang === 1 && x.so_nguoi_toi_da > 0).slice(0, 6)"
          :key="index">
          <div class="col-lg-4 col-md-6 mb-4 mt-2">
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
                <div style="color: #FEE715; font-size: 13px;">
                  <i class="fa-solid fa-star me-1"></i><span class=" fw-bold">{{
                    Number(value.avg_sao || 0).toFixed(1) }}</span> <span class="text-muted">({{ value.so_luot_danh_gia
                      || 0 }} đánh giá)</span>
                </div>
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
                    <span class="d-block text-muted mb-1" style="font-size: 0.85rem;">Khởi hành: {{ value.ngay_bat_dau
                    }}</span>
                    <h5 class="fw-bold mb-0 " style="color: #8fdfb5;">
                      {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.gia) }}
                    </h5>
                  </div>
                  <router-link :to="'/chi-tiet-tour/' + value.id" class="btn btn-primary btn-sm rounded-pill px-3">
                    <i class="bx bx-star"></i> Chi tiết
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div class="section-background py-4">
    <div class="container ">
      <div class="" style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Tour trong nước</h1> <a style="font-size: large;" href="/tour/tour-trong-nuoc" class="">Xem Thêm</a>
      </div>
      <div class="row">
        <template
          v-for="(value, index) in list_tour.filter(x => x.tinh_trang === 1 && x.so_nguoi_toi_da > 0 && x.id_quoc_gia == '1').slice(0, 4)"
          :key="index">
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
                <div style="color: #FEE715; font-size: 13px;">
                  <i class="fa-solid fa-star me-1"></i><span class=" fw-bold">{{
                    Number(value.avg_sao || 0).toFixed(1) }}</span> <span class="text-muted">({{ value.so_luot_danh_gia
                      || 0 }} đánh giá)</span>
                </div>
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
                    <span class="d-block text-muted mb-1" style="font-size: 0.85rem;">Khởi hành: {{ value.ngay_bat_dau
                    }}</span>
                    <h5 class="fw-bold mb-0 " style="color: #8fdfb5;">
                      {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.gia) }}
                    </h5>
                  </div>
                  <router-link :to="'/chi-tiet-tour/' + value.id" class="btn btn-primary btn-sm rounded-pill px-3">
                    <i class="bx bx-star"></i> Chi tiết
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div class="section-background py-4">
    <div class="container ">
      <div class="" style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Tour nước ngoài</h1> <a style="font-size: large;" href="/tour/tour-ngoai-nuoc" class="">Xem Thêm</a>
      </div>
      <div class="row">
        <template
          v-for="(value, index) in list_tour.filter(x => x.tinh_trang === 1 && x.so_nguoi_toi_da > 0 && x.id_quoc_gia != '1').slice(0, 4)"
          :key="index">
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
                <div style="color: #FEE715; font-size: 13px;">
                  <i class="fa-solid fa-star me-1"></i><span class=" fw-bold">{{
                    Number(value.avg_sao || 0).toFixed(1) }}</span> <span class="text-muted">({{ value.so_luot_danh_gia
                      ||
                      0 }} đánh giá)</span>
                </div>
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
                    <span class="d-block text-muted mb-1" style="font-size: 0.85rem;">Khởi hành: {{ value.ngay_bat_dau
                    }}</span>
                    <h5 class="fw-bold mb-0 " style="color: #8fdfb5;">
                      {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.gia) }}
                    </h5>
                  </div>
                  <router-link :to="'/chi-tiet-tour/' + value.id" class="btn btn-primary btn-sm rounded-pill px-3">
                    <i class="bx bx-star"></i> Chi tiết
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <div class="section-background py-4">
    <div class="container">
      <h1>Bài viết nổi bật</h1>
      <div class="row">
        <template v-for="(value, index) in list_bv.slice(0, 3)" :key="index">
          <div class="col-lg-4 mb-4">
            <router-link :to="`/chi-tiet-bai-viet/${value.id}`" class="text-decoration-none">
              <article class="article-card group cursor-pointer h-100">
                <div class="overflow-hidden rounded-4 mb-3 position-relative"
                  style="height: 250px; border: 1px solid rgba(227, 204, 129, 0.3);">
                  <img :src="value.hinh_anh" class="w-100 h-100 object-fit-cover transition-transform article-img">
                  <span class="position-absolute top-0 start-0 m-3 badge"
                    style="background-color: #191970; color: #E3CC81; border: 1px solid #E3CC81;">Tin
                    Tức</span>
                </div>
                <h5 class="fw-bold mb-2 article-title transition-colors line-clamp-2">{{
                  value.tieu_de }}</h5>
                <p class="text-muted small mb-0 line-clamp-2">{{ value.mo_ta_ngan }}</p>
              </article>
            </router-link>
          </div>
        </template>
      </div>
      <div class="text-center mb-5 mt-3">
        <router-link to="/bai-viet">
          <button class="btn rounded-pill"
            style="background-color: transparent; border: 1px solid #E4445E; color: #E4445E; transition: all 0.3s ease;"
            onmouseover="this.style.backgroundColor='#E4445E'; this.style.color='white'"
            onmouseout="this.style.backgroundColor='transparent'; this.style.color='#E4445E'">Xem thêm bài viết</button>
        </router-link>
      </div>
    </div>
  </div>

  <div class="section-background py-5">
    <div class="container bg-white p-4 p-md-5 my-4" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide"
      style="border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.06); font-family: 'Roboto', sans-serif;">

      <div class="container">
        <div class="text-start mb-5" style="position: relative;">
          <h3 class="fw-bold text-dark display-5">
            Khách Hàng Nói Gì <br> Về <span style="color: #005baa;">Ixtal Tour</span>?
          </h3>
          <div class="mt-2" style="height: 4px; width: 80px; background-color: #8fdfb5; border-radius: 2px;">
          </div>
          <div class="mt-3 bg-light" style="width: 150px; height: 4px; border-radius: 2px; overflow: hidden;">
            <div :style="{ width: progressWidth + '%' }"
              style="height: 100%; background-color: #8fdfb5; box-shadow: 0 0 10px rgba(143,223,181,0.8);"></div>
          </div>
          <p class="text-secondary mt-3 fs-5">Những trải nghiệm thực tế từ du khách sau mỗi chuyến đi.</p>
        </div>

        <div class="row g-4 align-items-center">

          <div class="col-lg-7">
            <div class="review-display-card"
              style="background-color: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); padding: 40px; position: relative; min-height: 320px; display: flex; flex-direction: column; justify-content: center; overflow: hidden;">

              <i class="fa-solid fa-quote-left quote-icon"
                style="position: absolute; top: -10px; left: 20px; font-size: 8rem; color: rgba(0, 91, 170, 0.04); z-index: 0;"></i>

              <transition name="slide-fade" mode="out-in">

                <div v-if="activeTab === 1" key="1" class="position-relative" style="z-index: 1;">
                  <div class="mb-3 text-warning fs-5">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                      class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </div>
                  <p class="fst-italic mb-4 text-dark lh-base review-text">
                    "Chuyến đi Đà Nẵng - Hội An thực sự tuyệt vời. Hướng dẫn viên nhiệt tình, lịch trình hợp lý và dịch
                    vụ
                    khách sạn chuẩn 5 sao. Gia đình tôi đã có một kỳ nghỉ trọn vẹn nhờ Ixtal Tour!"
                  </p>
                  <div class="d-flex align-items-center mt-4 pt-3" style="border-top: 1px solid rgba(0,0,0,0.05);">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" class="rounded-circle me-3 avatar-glow"
                      width="65" height="65">
                    <div>
                      <h5 class="mb-0 fw-bold text-dark">Trần Hoàng Nam</h5>
                      <small class="text-muted fw-semibold">Khách du lịch gia đình</small>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 2" key="2" class="position-relative" style="z-index: 1;">
                  <div class="mb-3 text-warning fs-5">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                      class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </div>
                  <p class="fst-italic mb-4 text-dark lh-base review-text">
                    "Giao diện website đặt tour rất dễ sử dụng, thanh toán nhanh chóng. Mình đặc biệt thích tính năng so
                    sánh giá và lọc tour theo sở thích. Chắc chắn sẽ tiếp tục ủng hộ."
                  </p>
                  <div class="d-flex align-items-center mt-4 pt-3" style="border-top: 1px solid rgba(0,0,0,0.05);">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" class="rounded-circle me-3 avatar-glow"
                      width="65" height="65">
                    <div>
                      <h5 class="mb-0 fw-bold text-dark">Lê Thu Trang</h5>
                      <small class="text-muted fw-semibold">Travel Blogger</small>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 3" key="3" class="position-relative" style="z-index: 1;">
                  <div class="mb-3 text-warning fs-5">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                      class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
                  </div>
                  <p class="fst-italic mb-4 text-dark lh-base review-text">
                    "Tour đi Thái Lan giá quá tốt so với chất lượng. Đồ ăn ngon, xe đưa đón xịn xò và không hề bị ép mua
                    sắm. Cảm ơn Ixtal Tour đã mang đến trải nghiệm cực kỳ ưng ý."
                  </p>
                  <div class="d-flex align-items-center mt-4 pt-3" style="border-top: 1px solid rgba(0,0,0,0.05);">
                    <img src="https://randomuser.me/api/portraits/men/65.jpg" class="rounded-circle me-3 avatar-glow"
                      width="65" height="65">
                    <div>
                      <h5 class="mb-0 fw-bold text-dark">Phạm Minh Tuấn</h5>
                      <small class="text-muted fw-semibold">Nhân viên văn phòng</small>
                    </div>
                  </div>
                </div>

              </transition>
            </div>
          </div>

          <div class="col-lg-5 ps-lg-4">
            <div class="d-flex flex-column gap-3">

              <div @click="changeTab(1)" class="user-tab d-flex align-items-center p-3 rounded-4"
                :class="{ 'active-user': activeTab === 1 }">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="rounded-circle me-3" width="55"
                  height="55" style="object-fit: cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-1 fw-bold text-dark">Trần Hoàng Nam</h6>
                  <small class="text-secondary">Khách du lịch gia đình</small>
                </div>
                <div v-if="activeTab === 1" class="text-success fs-4 bounce-icon"><i
                    class="fa-solid fa-circle-check"></i>
                </div>
              </div>

              <div @click="changeTab(2)" class="user-tab d-flex align-items-center p-3 rounded-4"
                :class="{ 'active-user': activeTab === 2 }">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" class="rounded-circle me-3" width="55"
                  height="55" style="object-fit: cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-1 fw-bold text-dark">Lê Thu Trang</h6>
                  <small class="text-secondary">Travel Blogger</small>
                </div>
                <div v-if="activeTab === 2" class="text-success fs-4 bounce-icon"><i
                    class="fa-solid fa-circle-check"></i>
                </div>
              </div>

              <div @click="changeTab(3)" class="user-tab d-flex align-items-center p-3 rounded-4"
                :class="{ 'active-user': activeTab === 3 }">
                <img src="https://randomuser.me/api/portraits/men/65.jpg" class="rounded-circle me-3" width="55"
                  height="55" style="object-fit: cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-1 fw-bold text-dark">Phạm Minh Tuấn</h6>
                  <small class="text-secondary">Nhân viên văn phòng</small>
                </div>
                <div v-if="activeTab === 3" class="text-success fs-4 bounce-icon"><i
                    class="fa-solid fa-circle-check"></i>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '../../../utils/api'
import App from '../../../App.vue'
export default {
  components: { App },
  data() {
    return {
      activeTab: 1,
      autoSlideInterval: null,
      slideDuration: 4000,
      progressWidth: 0,
      progressInterval: null,

      list_tour: [],
      list_bv: [],
      list_slide: [],
    }
  },
  mounted() {
    this.loadData();
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide(); // Hủy slide khi rời trang
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
    startAutoSlide() {
      this.progressWidth = 0;
      this.progressInterval = setInterval(() => {
        if (this.progressWidth >= 100) {
          this.progressWidth = 0;
        } else {
          this.progressWidth += (100 / (this.slideDuration / 100));
        }
      }, 100);

      this.autoSlideInterval = setInterval(() => {
        if (this.activeTab < 3) {
          this.activeTab++;
        } else {
          this.activeTab = 1;
        }
      }, this.slideDuration);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
      clearInterval(this.progressInterval);
      this.progressWidth = 0;
    },
    changeTab(tabIndex) {
      this.activeTab = tabIndex;
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }
}
</script>

<style scoped>
.section-background {
  background-color: #f3ffff;
  background-image: url('../../../assets/images/section-background.png');
  /* Thêm các thuộc tính này để ảnh hiển thị đẹp hơn nếu cần */
  background-size: cover;
  background-position: center;
}

/* --- HIỆU ỨNG CHO TAB KHÁCH HÀNG (CỘT PHẢI) --- */
.user-tab {
  background-color: #f8f9fa;
  /* Màu xám nhạt khi chưa chọn */
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* Hiệu ứng mượt mà hơi nảy nhẹ */
}

.user-tab:hover {
  background-color: #f1f3f5;
  transform: translateX(-5px);
  /* Trượt nhẹ sang trái khi lia chuột */
}

.user-tab.active-user {
  background-color: #ffffff;
  border-color: #8fdfb5;
  /* Viền màu xanh nổi bật */
  box-shadow: 0 10px 25px rgba(143, 223, 181, 0.25);
  /* Bóng đổ màu xanh */
  transform: translateX(-15px) scale(1.02);
  /* Bay hẳn sang trái và phóng to ra 2% */
  z-index: 2;
}

/* Nảy icon check màu xanh */
.bounce-icon {
  animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

/* --- HIỆU ỨNG CHO NỘI DUNG REVIEW (CỘT TRÁI) --- */
.review-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #2c3e50 !important;
}

.avatar-glow {
  border: 3px solid #8fdfb5;
  box-shadow: 0 0 15px rgba(143, 223, 181, 0.5);
  padding: 2px;
}

/* Hiệu ứng trượt chữ (Trượt từ phải sang trái và mờ dần) */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>