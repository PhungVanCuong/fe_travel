Đây là toàn bộ file `index_2.vue` đã được tích hợp hoàn chỉnh thư viện AOS và các hiệu ứng cuộn trang, bạn chỉ cần copy và dán đè lên file hiện tại của mình là mọi thứ sẽ hoạt động mượt mà:

```vue
<template>
  <div class="voyagr-home">
    <!-- HERO SECTION -->
    <section style="position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;" @mouseenter="stopHeroSlide" @mouseleave="startHeroSlide">
      <div style="position:absolute;inset:0;">
        <!-- Hiệu ứng chuyển slide -->
        <transition name="fade" mode="out-in">
          <img :key="activeSlide" :src="currentHeroImage" alt="Hero Background" style="width:100%;height:100%;object-fit:cover;filter: saturate(1.2); position:absolute; inset:0;" />
        </transition>
        
        <!-- Gradient chỉ tập trung ở dưới cùng, phần trên hoàn toàn trong suốt để ảnh sáng -->
        <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(12,26,46,0.8) 0%, transparent 50%);"></div>
        
        <!-- Gradient nối với màu nền của trang -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:160px;background:linear-gradient(to top,#f8fafc,transparent);"></div>
      </div>
      <div style="position:absolute;inset:0;opacity:.05;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px);background-size:60px 60px;"></div>
      
      <div style="position:relative;z-index:10;max-width:1500px;margin:0 auto;padding:0 24px;width:100%;">
        <div class="hero-content">
          
          <!-- ĐÃ SỬA: Đổi margin-bottom từ 24px xuống 8px để kéo dòng chữ sát xuống dưới -->
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:-55px;">
            <span class="booking-badge">
              <span class="pulse" style="width:6px;height:6px;border-radius:9999px;background:#8fdfb5;display:inline-block;"></span>
              Premium Concierge
            </span>
          </div>
          
          <transition name="fade" mode="out-in">
            <h1 :key="activeSlide" class="font-serif hero-title">
              {{ currentHeroTitle }}<br><span style="color:#8fdfb5;">Ixtal Tour</span>
            </h1>
          </transition>
          
          <p style="font-size:1.2rem;color:rgba(255,255,255,.9);line-height:1.6;max-width:600px;margin-bottom:40px;text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
            Hành trình được "may đo" riêng cho bạn. Trọn vẹn Việt Nam, vươn tầm thế giới.
          </p>
          
          <div style="display:flex;gap:40px;">
            <div><p class="font-serif stats-num" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">10K+</p><p class="stats-label" style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">Khách Hàng</p></div>
            <div><p class="font-serif stats-num" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">500+</p><p class="stats-label" style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">Tours Cao Cấp</p></div>
            <div><p class="font-serif stats-num" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">98%</p><p class="stats-label" style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">Hài Lòng</p></div>
          </div>
        </div>
      </div>

      <!-- Nút điều hướng Slide Hero -->
      <button @click="prevHero" style="position:absolute;left:24px;top:50%;transform:translateY(-50%);z-index:20;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:black;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(4px);" class="hover-lift">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button @click="nextHero" style="position:absolute;right:24px;top:50%;transform:translateY(-50%);z-index:20;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:black;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(4px);" class="hover-lift">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <!-- Dots chỉ thị Slide -->
      <div style="position:absolute;bottom:180px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:20;">
        <div v-for="(slide, index) in list_slide" :key="index" @click="activeSlide = index" 
             :style="{ height: '6px', width: index === activeSlide ? '32px' : '6px', borderRadius: '9999px', background: index === activeSlide ? '#8fdfb5' : 'rgba(255,255,255,.3)', cursor: 'pointer', transition: 'all .3s', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }">
        </div>
      </div>
    </section>

    <!-- DOMESTIC TOURS -->
    <section id="domestic" style="padding:80px 0;background:#f8fafc;overflow:hidden;">
      <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:16px;">
          <div data-aos="fade-right">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <div style="height:1px;width:32px;background:#8fdfb5;"></div>
              <span style="font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#125633;">Khám Phá Việt Nam</span>
            </div>
            <h2 class="font-serif" style="font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:700;color:#0c1a2e;line-height:1.1;letter-spacing:-.02em;">Tour <em>Trong Nước</em> Phổ Biến</h2>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <router-link to="/client/tour/tour-trong-nuoc" style="font-size:.875rem;font-weight:500;color:#125633;text-decoration:none;margin-right:8px;">Xem tất cả →</router-link>
            <button @click="scrollTrack('domTrack',-340)" class="nav-arrow light hover-lift"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c1a2e" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>
            <button @click="scrollTrack('domTrack',340)" class="nav-arrow brand-color hover-lift"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#125633" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></button>
          </div>
        </div>
        <div ref="domTrack" class="no-scrollbar track-container">
          <!-- Domestic Tour Cards -->
          <div v-for="(value, index) in domesticTours" :key="index" 
               class="tour-poster hover-scale-img"
               data-aos="fade-up" 
               :data-aos-delay="index * 100">
            <img :src="value.hinh_anh" :alt="value.ten_tour" class="tour-img" />
            <div class="tour-overlay"></div>
            <span class="tour-badge badge-primary">Còn {{ value.so_nguoi_toi_da }} chỗ</span>
            
            <div class="tour-info">
              <p style="font-size:.8rem;color:rgba(255,255,255,.9);margin-bottom:6px;">📍 Đón tại: {{ value.diem_don }}</p>
              <h3 class="font-serif tour-title">{{ value.ten_tour }}</h3>
              
              <div style="display:flex;align-items:center;justify-content:space-between; margin-top: 12px;">
                <div>
                  <div style="display:flex;align-items:center;gap:2px;margin-bottom:4px;">
                    <span style="color:#fbbf24;font-size:.85rem;">★★★★★</span>
                    <span style="font-size:.75rem;color:rgba(255,255,255,.8);margin-left:4px;">{{ Number(value.avg_sao || 0).toFixed(1) }} ({{ value.so_luot_danh_gia || 0 }})</span>
                  </div>
                  <span class="tour-price">{{ formatCurrency(value.gia) }}</span>
                </div>
                <span class="tour-duration">{{ formatDate(value.ngay_bat_dau) }}</span>
              </div>
              <div class="cta-reveal">
                <router-link :to="'/client/chi-tiet-tour/' + value.id">
                  <button class="view-details-btn">Xem Chi Tiết →</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTERNATIONAL TOURS -->
    <section id="international" style="padding:80px 0;background:#0c1a2e;overflow:hidden;">
      <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:16px;">
          <div data-aos="fade-right">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <div style="height:1px;width:32px;background:#8fdfb5;"></div>
              <span style="font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#8fdfb5;">Vươn Tầm Thế Giới</span>
            </div>
            <h2 class="font-serif" style="font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:700;color:white;line-height:1.1;letter-spacing:-.02em;">Tour <em>Nước Ngoài</em> Nổi Bật</h2>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <router-link to="/client/tour/tour-ngoai-nuoc" style="font-size:.875rem;font-weight:500;color:rgba(255,255,255,.8);text-decoration:none;margin-right:8px;">Xem tất cả →</router-link>
            <button @click="scrollTrack('intlTrack',-340)" class="nav-arrow dark hover-lift"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>
            <button @click="scrollTrack('intlTrack',340)" class="nav-arrow brand-color hover-lift"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#125633" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></button>
          </div>
        </div>
        <div ref="intlTrack" class="no-scrollbar track-container">
          <!-- International Tour Cards -->
          <div v-for="(value, index) in internationalTours" :key="index" 
               class="tour-poster hover-scale-img"
               data-aos="fade-up" 
               :data-aos-delay="index * 100">
            <img :src="value.hinh_anh" :alt="value.ten_tour" class="tour-img" />
            <div class="tour-overlay"></div>
            <span class="tour-badge badge-primary">Còn {{ value.so_nguoi_toi_da }} chỗ</span>
            
            <div class="tour-info">
              <p style="font-size:.8rem;color:rgba(255,255,255,.9);margin-bottom:6px;">📍 Đón tại: {{ value.diem_don }}</p>
              <h3 class="font-serif tour-title">{{ value.ten_tour }}</h3>
              
              <div style="display:flex;align-items:center;justify-content:space-between; margin-top: 12px;">
                <div>
                  <div style="display:flex;align-items:center;gap:2px;margin-bottom:4px;">
                    <span style="color:#fbbf24;font-size:.85rem;">★★★★★</span>
                    <span style="font-size:.75rem;color:rgba(255,255,255,.8);margin-left:4px;">{{ Number(value.avg_sao || 0).toFixed(1) }} ({{ value.so_luot_danh_gia || 0 }})</span>
                  </div>
                  <span class="tour-price">{{ formatCurrency(value.gia) }}</span>
                </div>
                <span class="tour-duration">{{ formatDate(value.ngay_bat_dau) }}</span>
              </div>
              <div class="cta-reveal">
                <router-link :to="'/client/chi-tiet-tour/' + value.id">
                  <button class="view-details-btn">Xem Chi Tiết →</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG SECTION -->
    <section id="blog" style="padding:80px 24px;background:#f8fafc;">
      <div style="max-width:1280px;margin:0 auto;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px;flex-wrap:wrap;gap:16px;">
          <div data-aos="fade-right">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <div style="height:1px;width:32px;background:#8fdfb5;"></div>
              <span style="font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#125633;">Tin Tức & Cẩm Nang</span>
            </div>
            <h2 class="font-serif" style="font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:700;color:#0c1a2e;line-height:1.1;letter-spacing:-.02em;">Bài Viết <em>Nổi Bật</em></h2>
          </div>
          <router-link to="/client/bai-viet" style="font-size:.875rem;font-weight:500;color:#125633;text-decoration:none;">Tất cả bài viết →</router-link>
        </div>
        <div class="blog-grid">
          <div v-for="(value, index) in list_bv.slice(0, 3)" :key="index" 
               class="blog-card" 
               :style="index === 0 ? 'grid-column:1/-1;height:480px;' : 'height:320px;'"
               data-aos="zoom-in"
               :data-aos-delay="index * 150">
            <router-link :to="`/client/chi-tiet-bai-viet/${value.id}`" style="display:block; height:100%;">
              <img :src="value.hinh_anh" alt="Blog" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(12,26,46,.9) 0%,rgba(12,26,46,.3) 55%,transparent 100%);"></div>
              
              <div v-if="index === 0" style="position:absolute;bottom:0;left:0;right:0;padding:40px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;">
                <div style="max-width:600px;">
                  <span class="blog-badge badge-primary">Tin tức</span>
                  <h3 class="font-serif blog-title-lg">{{ value.tieu_de }}</h3>
                  <p class="blog-desc">{{ value.mo_ta_ngan }}</p>
                </div>
                <button class="read-more-btn hover-lift">Đọc Thêm →</button>
              </div>

              <div v-else style="position:absolute;bottom:0;left:0;right:0;padding:28px;">
                <span class="blog-badge badge-primary">Tin tức</span>
                <h3 class="font-serif blog-title-sm">{{ value.tieu_de }}</h3>
                <p class="blog-desc-sm">{{ value.mo_ta_ngan }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section id="reviews" style="padding:80px 24px;background:#0c1a2e;overflow:hidden;">
      <div style="max-width:1280px;margin:0 auto;" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:56px;flex-wrap:wrap;gap:16px;">
          <div data-aos="fade-right">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <div style="height:1px;width:32px;background:#8fdfb5;"></div>
              <span style="font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#8fdfb5;">Đánh Giá</span>
            </div>
            <h2 class="font-serif" style="font-size:clamp(1.8rem,3.5vw,2.75rem);font-weight:700;color:white;line-height:1.1;letter-spacing:-.02em;">Khách hàng nói gì về <em>Ixtal Tour</em></h2>
          </div>
          <div style="display:flex;gap:12px;">
            <button @click="prevT" class="nav-arrow dark hover-lift"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
            <button @click="nextT" class="nav-arrow brand-color hover-lift"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#125633" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
          </div>
        </div>
        
        <div style="display:grid;grid-template-columns:2fr 3fr;gap:32px;align-items:center;margin-bottom:56px;">
          <div style="position:relative;border-radius:24px;overflow:hidden;height:420px;">
            <img :src="testimonials[activeTestimonial].img" alt="Tour" style="width:100%;height:100%;object-fit:cover;transition:opacity .4s;" />
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(12,26,46,.6) 0%,transparent 60%);"></div>
          </div>
          <div>
            <svg style="opacity:.2;margin-bottom:24px;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8fdfb5" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            <transition name="fade" mode="out-in">
              <p :key="activeTestimonial" class="font-serif" style="font-size:clamp(1.1rem,2.2vw,1.6rem);color:rgba(255,255,255,.9);line-height:1.75;font-style:italic;margin-bottom:36px;">
                {{ testimonials[activeTestimonial].text }}
              </p>
            </transition>
            <div style="display:flex;gap:4px;margin-bottom:20px;"><span style="color:#fbbf24;font-size:1.1rem;">★★★★★</span></div>
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:36px;">
              <img :src="testimonials[activeTestimonial].avatar" alt="Avatar" style="width:56px;height:56px;border-radius:9999px;object-fit:cover;border:2px solid #8fdfb5;" />
              <div>
                <p style="font-weight:600;color:white;font-size:1rem;">{{ testimonials[activeTestimonial].name }}</p>
                <p style="color:rgba(255,255,255,.5);font-size:.85rem;">{{ testimonials[activeTestimonial].role }}</p>
              </div>
            </div>
            
            <div style="display:flex;gap:8px;align-items:center;">
              <div v-for="(t, i) in testimonials" :key="i" @click="goT(i)" 
                   :style="{ height: '6px', width: i === activeTestimonial ? '28px' : '6px', borderRadius: '9999px', background: i === activeTestimonial ? '#8fdfb5' : 'rgba(255,255,255,.2)', cursor: 'pointer', transition: 'all .3s' }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios'
import apiUrl from '../../../utils/api'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  data() {
    return {
      list_tour: [],
      list_bv: [],
      list_slide: [],
      activeSlide: 0,
      heroInterval: null,
      heroSlideDuration: 4000,

      // Testimonial Data & State
      activeTestimonial: 0,
      autoSlideInterval: null,
      slideDuration: 5000,
      testimonials: [
        {
          img: 'https://images.unsplash.com/photo-1524309784716-6a4be8299c7f?w=500&h=400&fit=crop&auto=format',
          text: '"Chuyến đi thực sự tuyệt vời. Hướng dẫn viên nhiệt tình, lịch trình hợp lý và dịch vụ khách sạn chuẩn 5 sao. Gia đình tôi đã có một kỳ nghỉ trọn vẹn nhờ Ixtal Tour!"',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          name: 'Trần Hoàng Nam',
          role: 'Khách du lịch gia đình'
        },
        {
          img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=500&h=400&fit=crop&auto=format',
          text: '"Giao diện website đặt tour rất dễ sử dụng, thanh toán nhanh chóng. Mình đặc biệt thích tính năng so sánh giá và lọc tour. Chắc chắn sẽ tiếp tục ủng hộ."',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          name: 'Lê Thu Trang',
          role: 'Travel Blogger'
        },
        {
          img: 'https://images.unsplash.com/photo-1651478881270-6c3a0fc883f4?w=500&h=400&fit=crop&auto=format',
          text: '"Tour Thái Lan giá quá tốt so với chất lượng. Đồ ăn ngon, xe đưa đón xịn xò và không hề bị ép mua sắm. Cảm ơn Ixtal Tour đã mang đến trải nghiệm ưng ý."',
          avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
          name: 'Phạm Minh Tuấn',
          role: 'Nhân viên văn phòng'
        }
      ]
    }
  },
  computed: {
    currentHeroImage() {
      if (this.list_slide && this.list_slide.length > 0) {
        return this.list_slide[this.activeSlide].hinh_anh;
      }
      return 'https://images.unsplash.com/photo-1609779340167-207589f3f94f?w=1920&q=90&auto=format&fit=crop';
    },
    domesticTours() {
      return this.list_tour.filter(x => x.tinh_trang === 1 && x.so_nguoi_toi_da > 0 && x.id_quoc_gia == '1').slice(0, 6);
    },
    internationalTours() {
      return this.list_tour.filter(x => x.tinh_trang === 1 && x.so_nguoi_toi_da > 0 && x.id_quoc_gia != '1').slice(0, 6);
    }
  },
  mounted() {
    this.loadData();
    this.startAutoSlide(); // Hàm cho Testimonials cũ
    this.startHeroSlide(); // Bật chạy Slider Hero
    AOS.init({
      duration: 800, // Thời gian chạy hiệu ứng (tính bằng mili giây)
      once: false,    
      offset: 100    // Khoảng cách cuộn (pixel) trước khi kích hoạt hiệu ứng
    });
  },
  beforeUnmount() {
    this.stopAutoSlide();
    this.stopHeroSlide(); // Tắt Slider khi chuyển trang
  },
  methods: {
    startHeroSlide() {
      if (this.heroInterval) clearInterval(this.heroInterval);
      this.heroInterval = setInterval(() => {
        this.nextHero();
      }, this.heroSlideDuration);
    },
    stopHeroSlide() {
      if (this.heroInterval) {
        clearInterval(this.heroInterval);
      }
    },
    nextHero() {
      if (this.list_slide.length > 0) {
        this.activeSlide = (this.activeSlide + 1) % this.list_slide.length;
      }
    },
    prevHero() {
      if (this.list_slide.length > 0) {
        this.activeSlide = (this.activeSlide - 1 + this.list_slide.length) % this.list_slide.length;
      }
    },
    loadData() {
      axios.get(apiUrl('client/trang-chu/get-data'))
        .then((res) => {
          this.list_tour = res.data.data.tours || [];
          this.list_bv = res.data.data.baiViets || [];
          this.list_slide = res.data.data.slides || [];
          
          this.$nextTick(() => {
            AOS.refresh();
          });
        })
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },
    formatCurrency(value) {
      if (!value) return '';
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    scrollTrack(refName, distance) {
      const track = this.$refs[refName];
      if (track) {
        track.scrollBy({ left: distance, behavior: 'smooth' });
      }
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextT();
      }, this.slideDuration);
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
      }
    },
    goT(index) {
      this.activeTestimonial = index;
    },
    prevT() {
      this.activeTestimonial = (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
    },
    nextT() {
      this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
    }
  }
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.voyagr-home { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0c1a2e; }
.font-serif { font-family: 'Playfair Display', serif; }

.no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* Utilities & Animations */
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.pulse { animation: pulse 1.8s infinite; }

.hover-lift { transition: transform 0.2s; }
.hover-lift:hover { transform: translateY(-2px); }
.hover-scale-img img { transition: transform 0.6s ease; }
.hover-scale-img:hover img { transform: scale(1.07); }

/* Hero Elements */
.hero-content { display: flex; flex-direction: column; justify-content: center; padding-top: 60px; }
.booking-badge { display:flex; align-items:center; gap:8px; font-size:.85rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; padding:8px 16px; border-radius:9999px; background:rgba(143,223,181,.15); color:#8fdfb5; border:1px solid rgba(143,223,181,.3); }
.hero-title { font-size: clamp(3.2rem, 7vw, 6rem); font-weight: 700; color: white; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px; }
.stats-num { font-size: 2rem; font-weight: 700; color: white; line-height: 1; }
.stats-label { font-size: .8rem; color: rgba(255,255,255,.6); margin-top: 6px; text-transform: uppercase; letter-spacing: .06em; }

/* Tour Tracks */
.track-container { display: flex; gap: 24px; overflow-x: auto; padding-bottom: 20px; }
.nav-arrow { width:44px; height:44px; border-radius:9999px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.nav-arrow.light { background:white; border:1px solid #e2e8f0; }
.nav-arrow.dark { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); }
.nav-arrow.brand-color { background:#8fdfb5; border:none; box-shadow:0 6px 16px rgba(143,223,181,.35); }

/* INCREASED TOUR CARD SIZE */
.tour-poster { position: relative; flex-shrink: 0; width: 320px; height: 420px; border-radius: 28px; overflow: hidden; cursor: pointer; }
.tour-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.tour-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(12,26,46,.95) 0%, rgba(12,26,46,.3) 50%, transparent 100%); }

/* BADGES AND BUTTONS (Changed to #8fdfb5) */
.tour-badge { position: absolute; top: 20px; left: 20px; font-size: .75rem; font-weight: 700; padding: 6px 14px; border-radius: 9999px; }
.badge-primary { background: #8fdfb5; color: #125633; }
.tour-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; }
.tour-title { font-size: 1.4rem; font-weight: 700; color: white; line-height: 1.3; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tour-price { font-size: 1.3rem; font-weight: 700; color: white; }
.tour-duration { padding: 6px 12px; border-radius: 9999px; font-size: .75rem; background: rgba(255,255,255,.15); color: rgba(255,255,255,.9); border: 1px solid rgba(255,255,255,.2); }

.cta-reveal { max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease; }
.tour-poster:hover .cta-reveal { max-height: 54px; opacity: 1; margin-top: 16px; }
.view-details-btn { width: 100%; padding: 12px; border-radius: 16px; background: #8fdfb5; color: #125633; border: none; font-size: 1rem; font-weight: 700; cursor: pointer; }

/* Blog */
.blog-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.blog-card { position: relative; border-radius: 28px; overflow: hidden; cursor: pointer; }
.blog-card img { transition: transform 0.6s ease; }
.blog-card:hover img { transform: scale(1.05); }
.blog-badge { display: inline-block; font-size: .75rem; font-weight: 700; padding: 6px 14px; border-radius: 9999px; margin-bottom: 12px; }
.blog-title-lg { font-size: 2rem; font-weight: 700; color: white; line-height: 1.25; margin-bottom: 10px; }
.blog-title-sm { font-size: 1.3rem; font-weight: 700; color: white; line-height: 1.3; margin-bottom: 8px; }
.blog-desc { font-size: 1rem; color: rgba(255,255,255,.75); line-height: 1.7; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.blog-desc-sm { font-size: .9rem; color: rgba(255,255,255,.7); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.read-more-btn { display: flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 9999px; background: #8fdfb5; color: #125633; border: none; font-size: .95rem; font-weight: 700; cursor: pointer; }

/* Testimonial Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
