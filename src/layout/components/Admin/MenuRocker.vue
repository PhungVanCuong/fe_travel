<template>
  <a-layout-sider v-model:collapsed="trangThaiThuGonMenu" width="260px" class="glass-sidebar`">
    
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: trangThaiThuGonMenu ? 'center' : 'space-between', padding: '16px' }">
  <!-- Thay thế h2 bằng thẻ img -->
  <img 
    v-if="!trangThaiThuGonMenu" 
    src="../../../assets/images/Logo1.png" 
    alt="Logo IxtalTour" 
    style="height: 80px; width: auto; object-fit: contain;" 
  />
  
  <MenuOutlined style="font-size: 20px; cursor: pointer; color: black;" @click="thayDoiTrangThaiMenu" />
</div>

    <a-menu
      v-model:selectedKeys="danhSachDuongDanDuocChon"
      theme="dark"
      mode="inline"
      @click="xuLyChuyenTrang"
    >
      <!-- 1. Dashboard -->
      <a-menu-item key="/admin/dashboard">
        <template #icon>
          <i class="bx bx-home-circle menu-icon"></i>
        </template>
        Dashboard
      </a-menu-item>

      <!-- 2. Quản lý tài khoản -->
      <a-sub-menu key="danh-muc-tai-khoan">
        <template #icon>
          <i class="fa-solid fa-user-group menu-icon"></i>
        </template>
        <template #title>Quản lý tài khoản</template>
        
        <a-menu-item key="/admin/nhan-vien">Nhân Viên</a-menu-item>
        <a-menu-item key="/admin/khach-hang">Khách Hàng</a-menu-item>
        <a-menu-item key="/admin/huong-dan-vien">Hướng Dẫn Viên</a-menu-item>
      </a-sub-menu>

      <!-- 3. Quản lý tour & lịch trình -->
      <a-sub-menu key="danh-muc-tour-va-lich-trinh">
        <template #icon>
          <i class="fa-brands fa-servicestack menu-icon"></i>
        </template>
        <template #title>Quản lý tour & lịch trình</template>
        
        <a-menu-item key="/admin/quan-ly-tour">Tour</a-menu-item>
        <a-menu-item key="/admin/lich-trinh">Lịch Trình</a-menu-item>
      </a-sub-menu>

      <!-- 4. Quản lý Vé & Hoá đơn -->
      <a-sub-menu key="danh-muc-ve-va-hoa-don">
        <template #icon>
          <i class="fa-brands fa-servicestack menu-icon"></i>
        </template>
        <template #title>Quản lý Vé & Hoá đơn</template>
        
        <a-menu-item key="/admin/ve">Vé</a-menu-item>
        <a-menu-item key="/admin/hoa-don">Hoá Đơn</a-menu-item>
        <a-menu-item key="/admin/quet-hoa-don">Quét Hoá Đơn</a-menu-item>
      </a-sub-menu>

      <!-- 5. Quản lý Phương Tiện -->
      <a-menu-item key="/admin/quan-ly-phuong-tien">
        <template #icon>
          <i class="fa-solid fa-bus menu-icon"></i>
        </template>
        Quản lý Phương Tiện
      </a-menu-item>

      <!-- 6. Quản lý Hướng Dẫn Viên & Phân Công -->
      <a-menu-item key="/admin/quan-ly-hdv-va-phan-cong">
        <template #icon>
          <i class="fa-solid fa-people-group menu-icon"></i>
        </template>
        Quản lý Hướng Dẫn Viên & Phân Công
      </a-menu-item>

      <!-- 7. Phân Quyền -->
      <a-menu-item key="/admin/phan-quyen">
        <template #icon>
          <i class="fa-solid fa-user-shield menu-icon"></i>
        </template>
        Phân Quyền
      </a-menu-item>

      <!-- 8. Quản lý Nội dung -->
      <a-sub-menu key="danh-muc-noi-dung">
        <template #icon>
          <i class="fa-solid fa-newspaper menu-icon"></i>
        </template>
        <template #title>Quản lý Nội dung</template>
        
        <a-menu-item key="/admin/bai-viet">Bài Viết</a-menu-item>
        <a-menu-item key="/admin/danh-gia">Đánh Giá</a-menu-item>
      </a-sub-menu>

      <!-- 9. Thống kê -->
      <a-sub-menu key="danh-muc-thong-ke">
        <template #icon>
          <i class="fa-solid fa-chart-line menu-icon"></i>
        </template>
        <template #title>Thống kê</template>
        
        <a-menu-item key="/admin/thong-ke/doanh-thu">Doanh Thu</a-menu-item>
        <a-menu-item key="/admin/thong-ke/khach-hang-moi">Khách Hàng Mới</a-menu-item>
        <a-menu-item key="/admin/thong-ke/ve-ban-ra">Vé Bán Ra</a-menu-item>
        <a-menu-item key="/admin/thong-ke/chi-tieu-khach-hang">Chi Tiêu Khách Hàng</a-menu-item>
        <a-menu-item key="/admin/thong-ke/tour">Tour</a-menu-item>
      </a-sub-menu>

      <!-- Đường kẻ ngang phân cách -->
      <a-divider style="border-color: rgba(255, 255, 255, 0.2); margin: 10px 0;" />

      <!-- 10. Khu vực Tài khoản và Đăng xuất -->
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

    </a-menu>
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

// HÀM MỚI: Xử lý mọi cú click vào Menu
const xuLyChuyenTrang = (menuInfo) => {
  const khoaCuaMenu = menuInfo.key; // Lấy ra key của mục vừa bấm

  // Nếu bấm vào đăng xuất
  if (khoaCuaMenu === 'chuc-nang-dang-xuat') {
    thucHienDangXuat();
  } 
  // Nếu bấm vào đăng xuất tất cả
  else if (khoaCuaMenu === 'chuc-nang-dang-xuat-all') {
    thucHienDangXuatTatCaTaiKhoan();
  } 
  // Ngược lại, nếu key bắt đầu bằng dấu '/' thì nó là đường dẫn URL -> Chuyển trang
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
/* 1. Ép Sidebar nhận màu sắc cố định */
.ant-layout-sider {
  background-color: #f4fdf8 !important;
}

/* 2. Ép Menu và các thành phần con nhận màu nền này */
:deep(.ant-menu),
:deep(.ant-menu-root),
:deep(.ant-menu-sub),
:deep(.ant-menu-submenu-title),
:deep(.ant-menu-item) {
  background-color: #f4fdf8 !important;
}

/* 3. Màu chữ hiển thị trên nền xanh (Dùng màu tối để dễ đọc) */
:deep(.ant-menu-item),
:deep(.ant-menu-submenu-title) {
  color: #000 !important; 
}

/* 4. Hiệu ứng khi di chuột (Hover) */
:deep(.ant-menu-item:hover),
:deep(.ant-menu-submenu-title:hover) {
  background-color: #7ccb9f !important; /* Màu xanh đậm hơn một chút khi hover */
}

/* 5. Hiệu ứng chọn mục (Selected) */
:deep(.ant-menu-item-selected) {
  background-color: #6bb78a !important;
  color: #004d40 !important; 
  font-weight: bold;
}

/* --- Tinh chỉnh icon và ảnh --- */
.menu-icon {
  font-size: 1.2rem;
  color: #004d40;
}

:deep(.ant-layout-sider-collapsed img) {
  margin: 0 auto;
  display: block;
}
</style>