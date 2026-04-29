import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkAdmin from "./checkAdmin";
import checkClient from "./checkClient";

const routes = [
    // ============= Client ==================
    
    {
        path: "/",
        component: () => import("../components/Client/TrangChu/index.vue"),
        meta: { layout: "client" },
    },
    {
    path: "/client/dang-nhap",
    component: () => import("../components/Client/DangNhap/index.vue"),
    meta: { layout: "blank" },
    },
    {
    path: "/client/dang-ky",
    component: () => import("../components/Client/DangKy/index.vue"),
    meta: { layout: "blank" },
    },
    {
    path: "/client/quen-mat-khau",
    component: () => import("../components/Client/QuenMatKhau/index.vue"),
    meta: { layout: "blank" },
    },
    {
    path: "/client/lay-lai-mat-khau",
    component: () => import("../components/Client/LayLaiMatKhau/index.vue"),
    meta: { layout: "blank" },
    },

    {
    path: "/tim-kiem-tour",
    component: () => import("../components/Client/TimKiemTour/index.vue"),
    meta: { layout: "client" },
    },
    {
    path: "/tour/tour-trong-nuoc",
    component: () => import("../components/Client/Tour/TourTrongNuoc/index.vue"),
    meta: { layout: "client" },
    },
    {
    path: "/tour/tour-ngoai-nuoc",
    component: () => import("../components/Client/Tour/TourNgoaiNuoc/index.vue"),
    meta: { layout: "client" },
    },
    {
    path: "/bai-viet",
    component: () => import("../components/Client/BaiViet/index.vue"),
    meta: { layout: "client" },
    },
    {
        path: "/chi-tiet-bai-viet/:id_bai_viet",
        component: () => import("../components/Client/ChiTietBaiViet/index.vue"),
        meta: { layout: "client" },
    },
    {
    path: "/huong-dan-vien",
    component: () => import("../components/Client/HuongDanVien/index.vue"),
    meta: { layout: "client" },
    },
    {
        path: "/chi-tiet-huong-dan-vien/:id_huong_dan_vien",
        component: () => import("../components/Client/ChiTietHuongDanVien/index.vue"),
        meta: { layout: "client" },
    },
    {
    path: "/chi-tiet-tour/:id_tour",
    component: () => import("../components/Client/ChiTietTour/index.vue"),
    meta: { layout: "client" },
    },
    {
    path: "/lien-he",
    component: () => import("../components/Client/LienHe/index.vue"),
    meta: { layout: "client" },
    },
    {
        path: "/client/profile",
        component: () => import("../components/Client/Profile/index.vue"),
        meta: { layout: "client" },
        beforeEnter: checkClient,
    },
    {
        path: "/client/thanh-toan/:ma_hoa_don",
        component: () => import("../components/Client/ThanhToan/index.vue"),
        meta: { layout: "client" },
        beforeEnter: checkClient,
        props: true,
    },
    {
       path: "/client/lich-su-dat-tour",
        component: () => import("../components/Client/LichSuDonHang/index.vue"),
        meta: { layout: "client" },
        beforeEnter: checkClient,
        props: true, 
    },
    {
    path: "/Ket-qua-thanh-toan",
    component: () => import("../components/Client/KetQuaThanhToan/index.vue"),
    meta: { layout: "blank" },
    },

    // {
    //     path: "/client/chi-tiet-don-hang/:ma_don_hang",
    //     component: () => import("../components/Client/ChiTietDonHang/index.vue"),
    //     meta: { layout: "client" },
    //     beforeEnter: checkClient,
    //     props: true,
    // },
    // {
     

    // ==================== VIEW ====================
    // {
    //     path: "/",
    //     component: () => import("../components/Test/index.vue"),
    // },

    // ============= Admin ==================
    {
        path: "/admin/quan-ly-phuong-tien",
        component: () => import("../components/Admin/QuanLyPhuongTien/index.vue"),
        beforeEnter: checkAdmin,
    },
     {
        path: "/admin/Dashboard",
        component: () => import("../components/Admin/Dashboard/index.vue"),
        beforeEnter: checkAdmin,
    },
    {
        path: "/admin/quan-ly-tour",
        component: () => import("../components/Admin/QuanLyTour/index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/dang-nhap",
        component: () => import("../components/Admin/DangNhap/index.vue"),
       meta: { layout: "blank" },
    },
    {
        path: "/admin/phan-quyen",
        component: () => import("../components/Admin/PhanQuyen/index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/khach-hang",
        component: () => import("../components/Admin/khachhang/index.vue"),
       beforeEnter: checkAdmin,
    },
     {
        path: "/admin/nhan-vien",
        component: () => import("../components/Admin/nhanvien/index.vue"),
       beforeEnter: checkAdmin,
    },
     {
        path: "/admin/ve",
        component: () => import("../components/Admin/Ve/new-index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/hoa-don",
        component: () => import("../components/Admin/HoaDon/index.vue"),
       beforeEnter: checkAdmin,
    },
    
    {
        path: "/admin/thong-ke/doanh-thu",
        component: () => import("../components/Admin/ThongKe/ThongKeDanhThu/index.vue"),
        beforeEnter: checkAdmin,
        name: "thong-ke-doanh-thu",
    },
    {
        path: "/admin/thong-ke/khach-hang-moi",
        component: () => import("../components/Admin/ThongKe/ThongKeKhachHangMoi/index.vue"),
        beforeEnter: checkAdmin,
        name: "thong-ke-khach-hang-moi",
    },
    {
        path: "/admin/thong-ke/ve-ban-ra",
        component: () => import("../components/Admin/ThongKe/ThongKeVeBanRa/index.vue"),
        beforeEnter: checkAdmin,
        name: "thong-ke-ve-ban-ra",
    },
    {
        path: "/admin/thong-ke/chi-tieu-khach-hang",
        component: () => import("../components/Admin/ThongKe/ThongKeChiTieuKhachHang/index.vue"),
        beforeEnter: checkAdmin,
        name: "thong-ke-chi-tieu-khach-hang",
    },
    {
        path: "/admin/thong-ke/tour",
        component: () => import("../components/Admin/ThongKe/ThongKeTour/index.vue"),
        beforeEnter: checkAdmin,
        name: "thong-ke-tour",
    },
    // {
    //     path: "/admin/phong-chieu",
    //     component: () => import("../components/Admin/PhongChieu/index.vue"),
    //     beforeEnter: checkAdmin,
    // },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
