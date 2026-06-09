<template>
  <a-layout-sider v-model:collapsed="trangThaiThuGonMenu" width="260px" class="custom-sidebar">
    
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: trangThaiThuGonMenu ? 'center' : 'space-between', padding: '16px', flexShrink: 0 }">
      <img 
        v-if="!trangThaiThuGonMenu" 
        src="../../../assets/images/Logo1.png" 
        alt="Logo IxtalTour" 
        style="height: 80px; width: auto; object-fit: contain;" 
      />
      <MenuOutlined style="font-size: 20px; cursor: pointer; color: black;" @click="thayDoiTrangThaiMenu" />
    </div>

    <div class="menu-scroll-area">
      <a-menu
        v-model:selectedKeys="danhSachDuongDanDuocChon"
        theme="dark"
        mode="inline"
        @click="xuLyChuyenTrang"
      >
        <a-menu-item key="/admin/dashboard">
          <template #icon><i class="bx bx-home-circle menu-icon"></i></template>
          Dashboard
        </a-menu-item>

        <a-sub-menu key="danh-muc-tai-khoan">
          <template #icon><i class="fa-solid fa-user-group menu-icon"></i></template>
          <template #title>Quản lý tài khoản</template>
          <a-menu-item key="/admin/nhan-vien">Nhân Viên</a-menu-item>
          <a-menu-item key="/admin/khach-hang">Khách Hàng</a-menu-item>
          <a-menu-item key="/admin/huong-dan-vien">Hướng Dẫn Viên</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="danh-muc-tour-va-lich-trinh">
          <template #icon><i class="fa-solid fa-route menu-icon"></i></template>
          <template #title>Quản lý tour & lịch trình</template>
          <a-menu-item key="/admin/quan-ly-tour">Tour</a-menu-item>
          <a-menu-item key="/admin/lich-trinh">Lịch Trình</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="danh-muc-ve-va-hoa-don">
          <template #icon><i class="fa-solid fa-clipboard-list menu-icon"></i></template>
          <template #title>Quản lý Vé & Hoá đơn</template>
          <a-menu-item key="/admin/ve">Vé</a-menu-item>
          <a-menu-item key="/admin/hoa-don">Hoá Đơn</a-menu-item>
          <a-menu-item key="/admin/quet-hoa-don">Quét Mã Vé</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/admin/quan-ly-phuong-tien">
          <template #icon><i class="fa-solid fa-bus menu-icon"></i></template>
          Quản lý Phương Tiện
        </a-menu-item>

        <a-menu-item key="/admin/quan-ly-hdv-va-phan-cong">
          <template #icon><i class="fa-solid fa-people-group menu-icon"></i></template>
          Quản lý Hướng Dẫn Viên & Phân Công
        </a-menu-item>

        <a-menu-item key="/admin/phan-quyen">
          <template #icon><i class="fa-solid fa-user-shield menu-icon"></i></template>
          Phân Quyền
        </a-menu-item>

        <a-sub-menu key="danh-muc-noi-dung">
          <template #icon><i class="fa-solid fa-newspaper menu-icon"></i></template>
          <template #title>Quản lý Nội dung</template>
          <a-menu-item key="/admin/bai-viet">Bài Viết</a-menu-item>
          <a-menu-item key="/admin/danh-gia">Đánh Giá</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="danh-muc-thong-ke">
          <template #icon><i class="fa-solid fa-chart-line menu-icon"></i></template>
          <template #title>Thống kê</template>
          <a-menu-item key="/admin/thong-ke/doanh-thu">Doanh Thu</a-menu-item>
          <a-menu-item key="/admin/thong-ke/khach-hang-moi">Khách Hàng Mới</a-menu-item>
          <a-menu-item key="/admin/thong-ke/ve-ban-ra">Vé Bán Ra</a-menu-item>
          <a-menu-item key="/admin/thong-ke/chi-tieu-khach-hang">Chi Tiêu Khách Hàng</a-menu-item>
          <a-menu-item key="/admin/thong-ke/tour">Tour</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/admin/lien-he">
          <template #icon><i class="fa-solid fa-address-book menu-icon"></i></template>
          Quản lý Liên hệ
        </a-menu-item>

        <a-menu-item key="/admin/slide">
          <template #icon><i class="fa-solid fa-images menu-icon"></i></template>
          Quản lý Slide
        </a-menu-item>

        <a-divider style="border-color: rgba(0, 0, 0, 0.06); margin: 10px 0;" />

        <a-sub-menu key="danh-muc-tai-khoan-ca-nhan">
          <template #icon>
            <img 
              src="https://www.shutterstock.com/image-vector/admin-icon-strategy-collection-thin-600nw-2307398667.jpg" 
              style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;" 
            />
          </template>
          <template #title>Quản trị viên</template>
          <a-menu-item key="/admin/profile">Thông tin cá nhân</a-menu-item>
          <a-menu-item key="chuc-nang-dang-xuat">Đăng xuất</a-menu-item>
          <a-menu-item key="chuc-nang-dang-xuat-tat-ca">Đăng xuất tất cả</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/">
          <template #icon><i class="fa-solid fa-home menu-icon"></i></template>
          Quay lại trang chủ
        </a-menu-item>

      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
import apiUrl from '../../../utils/api'; 

const trangThaiThuGonMenu = ref(false);
const danhSachDuongDanDuocChon = ref([]);
const route = useRoute();
const router = useRouter();

const thayDoiTrangThaiMenu = () => {
  trangThaiThuGonMenu.value = !trangThaiThuGonMenu.value;
};

watch(
  () => route.path,
  (duongDanMoi) => {
    danhSachDuongDanDuocChon.value = [duongDanMoi];
  },
  { immediate: true }
);

const xuLyChuyenTrang = (menuInfo) => {
  const khoaCuaMenu = menuInfo.key;

  if (khoaCuaMenu === 'chuc-nang-dang-xuat') {
    thucHienDangXuat();
  } 
  else if (khoaCuaMenu === 'chuc-nang-dang-xuat-all') {
    thucHienDangXuatTatCaTaiKhoan();
  } 
  else if (typeof khoaCuaMenu === 'string' && khoaCuaMenu.startsWith('/')) {
    router.push(khoaCuaMenu);
  }
};

const thucHienDangXuat = () => {
  axios.post(apiUrl("admin/dang-xuat"), {}, {
    headers: { Authorization: "Bearer " + localStorage.getItem("key_admin") }
  }).then((ketQuaTraVe) => {
    if (ketQuaTraVe.data.status) {
      localStorage.removeItem("key_admin");
      localStorage.removeItem("ho_va_ten");
      router.push("/admin/dang-nhap");
      message.success(ketQuaTraVe.data.message);
    } else {
      message.error(ketQuaTraVe.data.message);
    }
  }).catch((loi) => console.log(loi));
};

const thucHienDangXuatTatCaTaiKhoan = () => {
  axios.post(apiUrl("admin/dang-xuat-all"), {}, {
    headers: { Authorization: "Bearer " + localStorage.getItem("key_admin") }
  }).then((ketQuaTraVe) => {
    if (ketQuaTraVe.data.status) {
      localStorage.removeItem("key_admin");
      localStorage.removeItem("ho_va_ten");
      router.push("/admin/dang-nhap");
      message.success(ketQuaTraVe.data.message);
    } else {
      message.error(ketQuaTraVe.data.message);
    }
  }).catch((loi) => console.log(loi));
};
</script>

<style scoped>
/* 1. KHÓA CHIỀU CAO SIDEBAR & CỐ ĐỊNH TRÊN MÀN HÌNH */
.custom-sidebar {
  height: 100vh !important;
  position: sticky !important;
  top: 0 !important;
  left: 0 !important;
  background-color: #f4fdf8 !important;
  border-right: 1px solid #f0f0f0;
  box-shadow: none !important;
}

/* 2. CẤU TRÚC CUỘN ĐỘC LẬP */
:deep(.ant-layout-sider-children) {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}

.menu-scroll-area {
  flex: 1 !important;
  overflow-y: auto !important; 
  overflow-x: hidden !important;
  padding-bottom: 80px !important;
}

/* 3. MÀU SẮC MENU (Nền trắng, chữ đen) */
:deep(.ant-menu),
:deep(.ant-menu-root),
:deep(.ant-menu-sub),
:deep(.ant-menu-submenu-title),
:deep(.ant-menu-item) {
  background-color: #f4fdf8 !important;
}

:deep(.ant-menu-item),
:deep(.ant-menu-submenu-title) {
  color: #333 !important; 
  transition: all 0.3s ease;
}

/* 4. MÀU XANH KHI DI CHUỘT (Hover) */
/* Dùng màu xanh lá tươi (Mint Green) */
:deep(.ant-menu-item:hover),
:deep(.ant-menu-submenu-title:hover) {
  background-color: #e6f9ef !important; /* Xanh lá cực nhạt */
  color: #1b6b43 !important;           /* Xanh lá đậm */
}

/* 5. MÀU XANH KHI ĐƯỢC CHỌN (Selected) */
:deep(.ant-menu-item-selected) {
  background-color: #1b6b43 !important; /* Xanh lá đậm */
  color: #ffffff !important;           /* Chữ trắng để nổi trên nền xanh */
  font-weight: bold;
}

/* 6. ĐẢM BẢO ICON CÙNG MÀU XANH */
.menu-icon {
  font-size: 1.2rem;
  color: #1b6b43; /* Màu xanh lá thương hiệu */
  margin-right: 10px;
}

/* Khi item được chọn, icon cũng đổi màu thành trắng */
:deep(.ant-menu-item-selected .menu-icon) {
  color: #ffffff !important;
}

/* 7. Đường phân cách */
:deep(.ant-divider) {
  border-color: #f0f0f0 !important;
}

/* TÙY CHỈNH THANH CUỘN */
.menu-scroll-area::-webkit-scrollbar {
  width: 5px;
}
.menu-scroll-area::-webkit-scrollbar-thumb {
  background-color: #c4d6ce;
  border-radius: 5px;
}
</style>