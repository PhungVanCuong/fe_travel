<template>
	<div class="nav-container primary-menu">
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				<!-- Dashboard -->
				<router-link to="/admin/dashboard">
					<li class="nav-item">
						<a class="nav-link" href="/admin/dashboard">
							<div class="parent-icon">
								<i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">Dashboard</div>
						</a>
					</li>
				</router-link>

				<!-- Quản lý tài khoản -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown" aria-expanded="false">
						<div class="parent-icon"><i class="fa-solid fa-user-group"></i>
						</div>
						<div class="menu-title">Quản lý tài khoản</div>
					</a>
					<ul class="dropdown-menu">
						<router-link to="/admin/nhan-vien">
							<li>
								<a class="dropdown-item" href="/admin/nhan-vien">
									<i class="bx bx-right-arrow-alt"></i>Nhân Viên
								</a>
							</li>
						</router-link>
						<router-link to="/admin/khach-hang">
							<li>
								<a class="dropdown-item" href="/admin/khach-hang">
									<i class="bx bx-right-arrow-alt"></i>Khách Hàng
								</a>
							</li>
						</router-link>
					</ul>
				</li>

				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown" aria-expanded="false">
						<div class="parent-icon"><i class="fa-brands fa-servicestack"></i>
						</div>
						<div class="menu-title">Quản lý tour & lịch trình</div>
					</a>
					<ul class="dropdown-menu">
						<router-link to="/admin/quan-ly-tour">
							<li>
								<a class="dropdown-item" href="/admin/quan-ly-tour">
									<i class="bx bx-right-arrow-alt"></i>Tour
								</a>
							</li>
						</router-link>
						<router-link to="/admin/lich-trinh">
							<li>
								<a class="dropdown-item" href="/admin/lich-trinh">
									<i class="bx bx-right-arrow-alt"></i>Lịch Trình
								</a>
							</li>
						</router-link>
						<router-link to="/admin/quoc-gia">
							<li>	
								<a class="dropdown-item" href="/admin/quoc-gia">
									<i class="bx bx-right-arrow-alt"></i>Quốc Gia
								</a>
							</li>
						</router-link>
					</ul>
				</li>

				<!-- Quản lý vé & Hoá đơn -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown" aria-expanded="false">
						<div class="parent-icon"><i class="fa-brands fa-servicestack"></i>
						</div>
						<div class="menu-title">Quản lý Vé & Hoá đơn</div>
					</a>
					<ul class="dropdown-menu">
						<router-link to="/admin/ve">
							<li>
								<a class="dropdown-item" href="/admin/ve">
									<i class="bx bx-right-arrow-alt"></i>Vé
								</a>
							</li>
						</router-link>
						<router-link to="/admin/hoa-don">
							<li>
								<a class="dropdown-item" href="/admin/hoa-don">
									<i class="bx bx-right-arrow-alt"></i>Hoá đơn
								</a>
							</li>
						</router-link>
						<router-link to="/admin/quet-ve">
							<li>	
								<a class="dropdown-item" href="/admin/quet-ve">
									<i class="bx bx-right-arrow-alt"></i>Quét Vé
								</a>
							</li>
						</router-link>
					</ul>
				</li>

				<!-- Phân quyền -->
				<router-link to="/admin/phan-quyen">
					<li class="nav-item">
						<a class="nav-link" href="/admin/phan-quyen">
							<div class="parent-icon">
								<i class="fa-solid fa-user-shield"></i>
							</div>
							<div class="menu-title">Phân Quyền</div>
						</a>
					</li>
				</router-link>

				<!-- Bài viết -->
				<!-- Quản lý Nội dung -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown" aria-expanded="false">
						<div class="parent-icon">
							<i class="fa-solid fa-newspaper"></i>
						</div>
						<div class="menu-title">Quản lý Nội dung</div>
					</a>
					<ul class="dropdown-menu">
						<router-link to="/admin/bai-viet">
							<li>
								<a class="dropdown-item" href="/admin/bai-viet">
									<i class="bx bx-right-arrow-alt"></i>Bài Viết
								</a>
							</li>
						</router-link>
						<router-link to="/admin/danh-gia">
							<li>
								<a class="dropdown-item" href="/admin/danh-gia">
									<i class="bx bx-right-arrow-alt"></i>Đánh Giá
								</a>
							</li>
						</router-link>
					</ul>
				</li>
				<!-- Thông kê -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown" aria-expanded="false">
						<div class="parent-icon"><i class="fa-solid fa-chart-line"></i>
						</div>
						<div class="menu-title">Thống kê</div>
					</a>
					<ul class="dropdown-menu">
						<router-link to="/admin/thong-ke/doanh-thu">
							<li>
								<a class="dropdown-item" href="/admin/thong-ke/doanh-thu">
									<i class="bx bx-right-arrow-alt"></i>Doanh Thu
								</a>
							</li>
						</router-link>
						<router-link to="/admin/thong-ke/khach-hang-moi">
							<li>
								<a class="dropdown-item" href="/admin/thong-ke/khach-hang-moi">
									<i class="bx bx-right-arrow-alt"></i>Khách Hàng Mới
								</a>
							</li>
						</router-link>
						<router-link to="/admin/thong-ke/ve-ban-ra">
							<li>
								<a class="dropdown-item" href="/admin/thong-ke/ve-ban-ra">
									<i class="bx bx-right-arrow-alt"></i>vé Bán Ra
								</a>
							</li>
						</router-link>
						<router-link to="/admin/thong-ke/chi-tieu-khach-hang">
							<li>
								<a class="dropdown-item" href="/admin/thong-ke/chi-tieu-khach-hang">
									<i class="bx bx-right-arrow-alt"></i>Chi Tiêu Khách Hàng
								</a>
							</li>
						</router-link>
						<router-link to="/admin/thong-ke/tour">
							<li>
								<a class="dropdown-item" href="/admin/thong-ke/tour">
									<i class="bx bx-right-arrow-alt"></i>Tour
								</a>
							</li>
						</router-link>
					</ul>
				</li>

				<!-- Thông tin cá nhân -->
				
			</ul>
		</nav>
	</div>
</template>
<script>
export default {

}
</script>
<style></style>