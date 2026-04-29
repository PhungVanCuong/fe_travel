<template>
    <div class="nav-container primary-menu">
        <div class="mobile-topbar-header">
            <div>
                <img src="../../../../assets/images/2-removebg-preview.png" class="logo-icon" alt="logo icon">
            </div>
            <div>
                <h4 class="logo-text text-primary">IXTAL TOUR</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
            </div>
        </div>
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li class="nav-item">
                    <router-link to="/huong-dan-vien/lich-trinh" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-calendar"></i></div>
                        <div class="menu-title">Lịch Trình Công Việc</div>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/huong-dan-vien/quan-ly-tour" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-map-alt"></i></div>
                        <div class="menu-title">Quản Lý Tour Dẫn</div>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/huong-dan-vien/quan-ly-khach-hang" class="nav-link">
                        <div class="parent-icon"><i class="bx bx-group"></i></div>
                        <div class="menu-title">Quản Lý Khách Hàng</div>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'MenuHDV'
}
</script>