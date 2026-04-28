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

			 

				<!-- Quản lý phòng chiếu -->
				 

				<!-- Quản lý dịch vụ & vé -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
						data-bs-toggle="dropdown" aria-expanded="false">
						<div class="parent-icon"><i class="fa-brands fa-servicestack"></i>
						</div>
						<div class="menu-title">Quản lý Dịch vụ & Vé</div>
					</a>
					<ul class="dropdown-menu">
						<router-link to="/admin/ve">
							<li>
								<a class="dropdown-item" href="/admin/ve">
									<i class="bx bx-right-arrow-alt"></i>Vé
								</a>
							</li>
						</router-link>
						<router-link to="/admin/dich-vu">
							<li>
								<a class="dropdown-item" href="/admin/dich-vu">
									<i class="bx bx-right-arrow-alt"></i>Dịch Vụ
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
						<router-link to="/admin/binh-luan">
							<li>
								<a class="dropdown-item" href="/admin/binh-luan">
									<i class="bx bx-right-arrow-alt"></i>Bình Luận
								</a>
							</li>
						</router-link>
					</ul>
				</li>
				<!-- Voucher -->
				<router-link to="/admin/voucher">
					<li class="nav-item">
						<a class="nav-link" href="/admin/voucher">
							<div class="parent-icon">
								<i class="fa-solid fa-ticket"></i>
							</div>
							<div class="menu-title">Voucher</div>
						</a>
					</li>
				</router-link>
				<!-- Hóa Đơn -->
				<router-link to="/admin/hoa-don">
					<li class="nav-item">
						<a class="nav-link" href="/admin/hoa-don">
							<div class="parent-icon">
								<i class="fa-solid fa-receipt"></i>
							</div>
							<div class="menu-title">Hóa Đơn</div>
						</a>
					</li>
				</router-link>
				<!-- Đơn Hàng -->
				<router-link to="/admin/don-hang">
					<li class="nav-item">
						<a class="nav-link" href="/admin/don-hang">
							<div class="parent-icon">
								<i class="fa-solid fa-cart-shopping"></i>
							</div>
							<div class="menu-title">Đơn Hàng</div>
						</a>
					</li>
				</router-link>
				<!-- Thông kê -->
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret show"
						data-bs-toggle="dropdown" aria-expanded="true">
						<div class="parent-icon"><i class="fa-solid fa-chart-line"></i>
						</div>
						<div class="menu-title">Thống kê</div>
					</a>
					<ul class="dropdown-menu show" data-bs-popper="static">
						<router-link to="/admin/thong-ke">
							<li>
								<a class="dropdown-item" href="/admin/thong-ke"><i
										class="bx bx-right-arrow-alt"></i>Tổng Quan Thống Kê</a>
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