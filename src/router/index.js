import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkAdmin from "./checkAdmin";
import checkClient from "./checkClient";

const routes = [
    // ============= Client ==================
    
    {
        path: "/",
        component: () => import("../components/Client/trangchu/index.vue"),
        meta: { layout: "client" },
    },
    {
    path: "/client/dang-nhap",
    component: () => import("../components/Client/dangnhap/index.vue"),
    meta: { layout: "blank" },
    },
    {
    path: "/client/dang-ky",
    component: () => import("../components/Client/dangky/index.vue"),
    meta: { layout: "blank" },
    },
    {
    path: "/tim-kiem-tour",
    component: () => import("../components/Client/timkiemtour/index.vue"),
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
    path: "/Dat-tour",
    component: () => import("../components/Client/DatTour/index.vue"),
    meta: { layout: "blank" },
    },
    {
    path: "/Ket-qua-thanh-toan",
    component: () => import("../components/Client/DatTour/KetQuaThanhToan.vue"),
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
        component: () => import("../components/Admin/quanlydiemden/index.vue"),
        beforeEnter: checkAdmin,
    },
    {
        path: "/admin/quan-ly-tour",
        component: () => import("../components/Admin/quanlytour/index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/dang-nhap",
        component: () => import("../components/Admin/dangnhap/index.vue"),
       meta: { layout: "blank" },
    },
    {
        path: "/admin/phan-quyen",
        component: () => import("../components/Admin/PhanQuyen/index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/khach-hang",
        component: () => import("../components/Admin/KhachHang/index.vue"),
       beforeEnter: checkAdmin,
    },
     {
        path: "/admin/nhan-vien",
        component: () => import("../components/Admin/NhanVien/index.vue"),
       beforeEnter: checkAdmin,
    },
     {
        path: "/admin/ve",
        component: () => import("../components/Admin/ve/index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/hoa-don",
        component: () => import("../components/Admin/hoadon/index.vue"),
       beforeEnter: checkAdmin,
    },
    {
        path: "/admin/thong-ke",
        component: () => import("../components/Admin/thongke/index.vue"),
       beforeEnter: checkAdmin,
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
