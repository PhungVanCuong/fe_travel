<template>
  <div style="display: flex; flex-direction: column; height: 100vh; overflow: hidden; font-family: 'Inter', sans-serif; background: #f0f2f5;">
    <main style="flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px;">

      <div>
        <h1 style="font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 1.4rem; color: #0d1b2a; margin: 0;">Work Schedule</h1>
        <p style="font-size: .84rem; color: #6b7a90; margin: 4px 0 0;">Xem và quản lý lịch trình dẫn tour của bạn</p>
      </div>

      <div v-if="isLoading" style="text-align: center; padding: 40px; color: #6b7a90;">
        Đang tải dữ liệu lịch trình...
      </div>

      <div v-else-if="listData.length === 0" style="text-align: center; padding: 40px; background: #fff; border-radius: 12px; border: 1px solid #e2e6ed;">
        <h4 style="font-family: 'Nunito', sans-serif; font-weight: 700; color: #0d1b2a;">Bạn chưa có lịch trình nào!</h4>
        <p style="font-size: .84rem; color: #6b7a90; margin-top: 8px;">Hiện tại bạn chưa nhận dẫn tour nào. Hãy vào Kho Tour để nhận việc ngay.</p>
      </div>

      <div v-else style="display: grid; grid-template-columns: 300px 1fr; gap: 16px;">
        
        <div style="background: #fff; border-radius: 12px; border: 1px solid #e2e6ed; box-shadow: 0 1px 4px rgba(0,0,0,.06); padding: 20px; align-self: start;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <span style="font-family: 'Nunito', sans-serif; font-weight: 700; font-size: .95rem; color: #0d1b2a;">{{ monthName }}</span>
            <div style="display: flex; gap: 4px;">
              <button @click="prevMonth" style="padding: 4px; border-radius: 6px; border: 1px solid #e2e6ed; background: #fff; cursor: pointer;" class="hover-btn">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6b7a90" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button @click="nextMonth" style="padding: 4px; border-radius: 6px; border: 1px solid #e2e6ed; background: #fff; cursor: pointer;" class="hover-btn">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#6b7a90" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px 0; margin-bottom: 4px;">
            <div v-for="dayName in dayNames" :key="dayName" style="font-size: .66rem; font-weight: 600; color: #6b7a90; text-align: center; padding: 4px 0;">
              {{ dayName }}
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px 0;">
            <div v-for="blank in blankDaysCount" :key="'blank-' + blank"></div>
            
            <div v-for="day in calendarDays" :key="day" 
                 class="day-wrapper"
                 :class="getDayRangeClass(day)"
                 @click="isDayInTour(day) ? toggleDaySelection(day) : null"
                 style="position: relative; padding: 2px 0; cursor: pointer;">
              <div class="day-inner"
                   :style="{
                      aspectRatio: '1/1',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.75rem', margin: '0 auto', transition: 'all 0.2s',
                      width: '32px', height: '32px',
                      fontWeight: (isToday(day) || selectedDay === day) ? 700 : 400,
                      background: selectedDay === day ? '#0d1b2a' : (isToday(day) ? '#1a5fd5' : 'transparent'),
                      color: (selectedDay === day || isToday(day)) ? '#fff' : (isDayInTour(day) ? '#1a5fd5' : '#0d1b2a'),
                      transform: selectedDay === day ? 'scale(1.1)' : 'none'
                   }">
                {{ day }}
              </div>
            </div>
          </div>

          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e6ed; display: flex; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #1a5fd5;"></div>
              <span style="font-size: .7rem; color: #6b7a90;">Hôm nay</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 20px; height: 10px; border-radius: 5px; background: #e8f0fc;"></div>
              <span style="font-size: .7rem; color: #6b7a90;">Có Tour</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #0d1b2a;"></div>
              <span style="font-size: .7rem; color: #6b7a90;">Đang chọn</span>
            </div>
          </div>
        </div>

        <div style="background: #fff; border-radius: 12px; border: 1px solid #e2e6ed; box-shadow: 0 1px 4px rgba(0,0,0,.06); overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid #e2e6ed;">
            <span style="font-family: 'Nunito', sans-serif; font-weight: 700; font-size: .95rem; color: #0d1b2a;">
              Tour Timeline — {{ selectedDay ? `Ngày ${selectedDay} ${monthName}` : monthName }}
            </span>
            <span style="font-size: .78rem; color: #6b7a90;" v-if="selectedDay && filteredListData.length > 0">
              <button @click="selectedDay = null" style="background:none; border:none; color:#1a5fd5; font-weight:600; cursor:pointer; font-size:.78rem;">Bỏ lọc ngày</button>
            </span>
            <span style="font-size: .78rem; color: #6b7a90;" v-else>
              {{ filteredListData.length }} tour đã lên lịch
            </span>
          </div>
          
          <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
            <div v-if="filteredListData.length === 0" style="text-align: center; color: #6b7a90; font-size: .85rem;">
              Không có tour nào diễn ra trong ngày này.
            </div>

            <div v-for="(tour, index) in filteredListData" :key="tour.id_tour" style="display: flex; gap: 16px;">
              
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #16a34a; background: #dcfce7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .78rem; font-weight: 700; color: #16a34a;">
                  {{ getDayFromDate(tour.ngay_bat_dau) }}
                </div>
                <div v-if="index < filteredListData.length - 1" style="width: 2px; flex: 1; background: #e2e6ed; margin-top: 4px; min-height: 20px;"></div>
              </div>

              <div class="tour-card" @click="handleTourClick(tour)" style="flex: 1; border-radius: 12px; border: 1px solid #e2e6ed; padding: 16px; margin-bottom: 4px; background: #fff;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                      <span style="font-family: 'Nunito', sans-serif; font-weight: 700; font-size: .92rem; color: #0d1b2a;">{{ tour.ten_tour }}</span>
                      <span style="font-size: .68rem; color: #6b7a90;">(#{{ tour.id_tour }})</span>
                    </div>
                    <div style="font-size: .75rem; color: #6b7a90; margin-top: 4px; background: #f8fafc; display: inline-block; padding: 2px 8px; border-radius: 6px; border: 1px solid #e2e6ed;">
                      Từ: <strong style="color: #0d1b2a;">{{ formatDate(tour.ngay_bat_dau) }}</strong> - Đến: <strong style="color: #0d1b2a;">{{ formatDate(tour.ngay_ket_thuc) }}</strong>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="padding: 2px 10px; border-radius: 9999px; background: #dcfce7; color: #16a34a; font-size: .72rem; font-weight: 600; flex-shrink: 0;">Confirmed</span>
                    <svg :style="{ transform: expandedTourIds.includes(tour.id_tour) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#6b7a90" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
                
                <div v-if="expandedTourIds.includes(tour.id_tour) && tour.danh_sach_lich_trinh && tour.danh_sach_lich_trinh.length > 0" style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px; padding-left: 4px;">
                  
                  <div v-for="(diemDen) in tour.danh_sach_lich_trinh" :key="diemDen.id_lich_trinh" style="display: flex; gap: 12px; position: relative;">
                    <div style="display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0; padding-top: 4px;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a5fd5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>

                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e6ed; border-left: 3px solid #1a5fd5; border-radius: 8px; padding: 12px;">
                      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 8px;">
                        
                        <div style="display: flex; align-items: center; gap: 12px;">
                          <img v-if="diemDen.anh_diem_den" :src="diemDen.anh_diem_den" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover; border: 1px solid #e2e6ed;" alt="Location" />
                          <div v-else style="width: 40px; height: 40px; border-radius: 6px; background: #e2e6ed; display: flex; align-items: center; justify-content: center;">
                            <svg width="16" height="16" fill="none" stroke="#6b7a90" viewBox="0 0 24 24" stroke-width="2"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          </div>
                          
                          <div>
                            <h5 style="margin: 0 0 4px 0; font-family: 'Nunito', sans-serif; font-size: .95rem; color: #0d1b2a; font-weight: 700;">{{ diemDen.ten_diem_den }}</h5>
                            <span v-if="diemDen.loai_phuong_tien" style="display: inline-flex; align-items: center; gap: 4px; font-size: .65rem; color: #6b7a90; background: #edf0f4; padding: 3px 8px; border-radius: 4px; font-weight: 500;">
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                              {{ diemDen.loai_phuong_tien }} <span v-if="diemDen.so_hieu">({{ diemDen.so_hieu }})</span>
                            </span>
                          </div>
                        </div>

                      </div>
                      
                      <p style="margin: 0; font-size: .8rem; color: #6b7a90; line-height: 1.5;">{{ diemDen.tieu_de_hoat_dong }}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import apiUrl from '../../../utils/api';

export default {
    data() {
        return {
            listData: [],
            isLoading: true,
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            todayDate: new Date().getDate(),
            todayMonth: new Date().getMonth(),
            todayYear: new Date().getFullYear(),
            dayNames: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            selectedDay: null,
            expandedTourIds: [] 
        }
    },
    computed: {
        calendarDays() {
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            return Array.from({ length: daysInMonth }, (_, index) => index + 1);
        },
        // Lấy tất cả tour có ngày diễn ra giao thoa với tháng đang xem trên lịch
        toursInCurrentMonth() {
            return this.listData.filter(tour => {
                if (!tour.ngay_bat_dau || !tour.ngay_ket_thuc) return false;
                
                const start = new Date(tour.ngay_bat_dau);
                start.setHours(0,0,0,0);
                const end = new Date(tour.ngay_ket_thuc);
                end.setHours(0,0,0,0);
                
                const monthStart = new Date(this.currentYear, this.currentMonth, 1);
                const monthEnd = new Date(this.currentYear, this.currentMonth + 1, 0);

                return start <= monthEnd && end >= monthStart;
            });
        },
        filteredListData() {
            if (!this.selectedDay) return this.toursInCurrentMonth;
            
            const selectedDate = new Date(this.currentYear, this.currentMonth, this.selectedDay);
            selectedDate.setHours(0,0,0,0);

            // Timeline chỉ hiện những tour ĐANG DIỄN RA trong ngày được chọn
            return this.toursInCurrentMonth.filter(tour => {
                if (!tour.ngay_bat_dau || !tour.ngay_ket_thuc) return false;
                const start = new Date(tour.ngay_bat_dau);
                start.setHours(0,0,0,0);
                const end = new Date(tour.ngay_ket_thuc);
                end.setHours(0,0,0,0);

                return selectedDate.getTime() >= start.getTime() && selectedDate.getTime() <= end.getTime();
            });
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        // Tìm xem một ngày cụ thể có nằm trong khoảng thời gian diễn ra của bất kỳ tour nào không
        getTourForDay(day) {
            const currentDate = new Date(this.currentYear, this.currentMonth, day);
            currentDate.setHours(0,0,0,0);

            for (let i = 0; i < this.listData.length; i++) {
                const tour = this.listData[i];
                if (!tour.ngay_bat_dau || !tour.ngay_ket_thuc) continue;
                
                const start = new Date(tour.ngay_bat_dau);
                start.setHours(0,0,0,0);
                const end = new Date(tour.ngay_ket_thuc);
                end.setHours(0,0,0,0);

                if (currentDate.getTime() >= start.getTime() && currentDate.getTime() <= end.getTime()) {
                    return { start, end };
                }
            }
            return null;
        },
        
        // Cấp class CSS động để bo góc các đầu mút tạo thành "thanh kéo"
        getDayRangeClass(day) {
            const currentDate = new Date(this.currentYear, this.currentMonth, day);
            currentDate.setHours(0,0,0,0);

            const tourRange = this.getTourForDay(day);
            if (!tourRange) return '';

            const isStart = currentDate.getTime() === tourRange.start.getTime();
            const isEnd = currentDate.getTime() === tourRange.end.getTime();

            // Bo góc nếu bị đứt đoạn do xuống hàng (Chủ nhật/Thứ Bảy) hoặc đầu/cuối tháng
            const isStartOfWeek = currentDate.getDay() === 0; 
            const isEndOfWeek = currentDate.getDay() === 6; 
            const isFirstOfMonth = day === 1;
            const isLastOfMonth = day === this.calendarDays.length;

            let classes = [];

            if (isStart || isStartOfWeek || isFirstOfMonth) classes.push('range-start');
            if (isEnd || isEndOfWeek || isLastOfMonth) classes.push('range-end');

            if (classes.length === 0) return 'tour-between';
            
            if (classes.includes('range-start') && classes.includes('range-end')) {
                return 'tour-single';
            }
            
            return classes.join(' ');
        },

        isDayInTour(day) {
            return this.getTourForDay(day) !== null;
        },

        isToday(day) {
            return this.todayDate === day && this.todayMonth === this.currentMonth && this.todayYear === this.currentYear;
        },
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
            this.selectedDay = null; 
            this.expandedTourIds = []; 
        },
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
            this.selectedDay = null;
            this.expandedTourIds = []; 
        },
        toggleDaySelection(day) {
            if (this.selectedDay === day) {
                this.selectedDay = null;
            } else {
                this.selectedDay = day;
            }
            this.expandedTourIds = []; 
        },
        handleTourClick(tour) {
            const index = this.expandedTourIds.indexOf(tour.id_tour);
            if (index > -1) {
                this.expandedTourIds.splice(index, 1);
            } else {
                this.expandedTourIds.push(tour.id_tour);
            }
        },
        getHeaders() {
            return {
                Authorization: "Bearer " + localStorage.getItem("key_hdv"),
            };
        },
        formatDate(dateString) {
            if (!dateString) return "...";
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('vi-VN').format(date);
        },
        formatDateLabel(dateString) {
            if (!dateString) return "...";
            const date = new Date(dateString);
            const days = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
            return `${days[date.getDay()]}, ${date.getDate()} Thg ${date.getMonth() + 1}`;
        },
        getDayFromDate(dateString) {
            if (!dateString) return "?";
            return new Date(dateString).getDate();
        },

        initNearestTour() {
            if (!this.listData || this.listData.length === 0) return;

            const now = new Date();
            now.setHours(0, 0, 0, 0); 

            let sortedTours = [...this.listData].sort((a, b) => new Date(a.ngay_bat_dau) - new Date(b.ngay_bat_dau));

            let targetTour = sortedTours.find(t => {
                if (!t.ngay_bat_dau || !t.ngay_ket_thuc) return false;
                const start = new Date(t.ngay_bat_dau); start.setHours(0,0,0,0);
                const end = new Date(t.ngay_ket_thuc); end.setHours(0,0,0,0);
                return now >= start && now <= end;
            });

            if (!targetTour) {
                targetTour = sortedTours.find(t => {
                    const start = new Date(t.ngay_bat_dau); start.setHours(0,0,0,0);
                    return start > now;
                });
            }

            if (!targetTour) {
                let pastTours = [...sortedTours].sort((a, b) => new Date(b.ngay_bat_dau) - new Date(a.ngay_bat_dau));
                if (pastTours.length > 0) targetTour = pastTours[0];
            }

            if (targetTour) {
                const targetDate = new Date(targetTour.ngay_bat_dau);
                this.currentMonth = targetDate.getMonth();
                this.currentYear = targetDate.getFullYear();
                this.selectedDay = targetDate.getDate();
            }
        },

        loadData() {
            this.isLoading = true;
            axios.get(apiUrl('huong-dan-vien/lich-trinh/get-data'), { headers: this.getHeaders() })
                .then((res) => {
                    if (res.data.status) {
                        this.listData = res.data.data;
                        this.initNearestTour();
                    } else {
                        if(this.$toast) this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    if(this.$toast) this.$toast.error("Không thể tải danh sách lịch trình.");
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>

<style scoped>
.tour-card {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}
.tour-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-color: #1a5fd5 !important;
}

.hover-btn {
    transition: background 0.1s;
}
.hover-btn:hover {
    background: #f0f2f5 !important;
}

/* Các class định dạng CSS tạo thanh kéo ngang giữa các ngày trên lịch */
.day-wrapper {
    background: transparent;
    transition: opacity 0.2s;
}
.day-wrapper:hover {
    opacity: 0.85;
}
.day-wrapper.tour-single {
    background: #e8f0fc;
    border-radius: 16px;
}
.day-wrapper.range-start {
    background: #e8f0fc;
    border-radius: 16px 0 0 16px;
}
.day-wrapper.range-end {
    background: #e8f0fc;
    border-radius: 0 16px 16px 0;
}
.day-wrapper.tour-between {
    background: #e8f0fc;
}
.day-wrapper.range-start.range-end {
    border-radius: 16px;
}
</style>    