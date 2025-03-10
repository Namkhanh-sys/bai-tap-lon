<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trang Người Dùng - Nhà Cho Thuê</title>
    <link rel="stylesheet" href="user.css" />
    <!-- Thêm FontAwesome để sử dụng icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body>
    <!-- Header -->
    <header class="fixed-header">
        <div class="header-container">
            <div class="logo-container">
                <img id="header-logo" src="" alt="Logo" class="header-logo" />
                <h1 class="header-title-text">Quản Lý Nhà Cho Thuê</h1>
            </div>
            <!-- Đã xóa các liên kết Trang Chủ và Đăng Xuất -->
        </div>
    </header>

    <!-- Main Content -->
    <main>
        <div class="user-container">
            <h2><i class="fas fa-home"></i> Danh Sách Nhà Cho Thuê</h2>

            <!-- Filter Button Container -->
            <div class="search-container">
                <button id="filter-btn" class="btn btn-primary"><i class="fas fa-filter"></i> Bộ Lọc</button>
            </div>

            <!-- Filter Container (Hidden by default) -->
            <div id="filter-container" class="filter-container" style="display: none;">
                <div class="filter-group">
                    <label for="price-range">Giá tối đa (VNĐ/tháng):</label>
                    <input type="number" id="price-range" placeholder="Nhập giá tối đa" min="0" />
                </div>
                <div class="filter-group">
                    <label for="area-range">Diện tích tối thiểu (m²):</label>
                    <input type="number" id="area-range" placeholder="Nhập diện tích tối thiểu" min="0" />
                </div>
                <div class="filter-group">
                    <label for="bedrooms">Số phòng ngủ:</label>
                    <input type="number" id="bedrooms" placeholder="Nhập số phòng ngủ" min="0" />
                </div>
                <button id="apply-filter" class="btn btn-primary"><i class="fas fa-check"></i> Áp Dụng</button>
            </div>

            <!-- Sort Options -->
            <div class="sort-container">
                <label for="sort-options">Sắp xếp theo:</label>
                <select id="sort-options">
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="area-asc">Diện tích: Nhỏ đến Lớn</option>
                    <option value="area-desc">Diện tích: Lớn đến Nhỏ</option>
                </select>
            </div>

            <!-- Loading Spinner -->
            <div class="loading-spinner" id="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
            </div>

            <!-- House Grid -->
            <div class="house-grid" id="house-grid">
                <!-- Dữ liệu sẽ được render bằng JS -->
            </div>
        </div>
    </main>

    <!-- Modal Chi Tiết -->
    <div id="detail-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">×</span>
            <div class="detail-grid">
                <div class="image-container">
                    <img id="detail-image" src="" alt="House Image" />
                </div>
                <div class="detail-info">
                    <h3 id="detail-name"></h3>
                    <p><strong>Giá:</strong> <span id="detail-price"></span> VNĐ/tháng</p>
                    <p><strong>Diện tích:</strong> <span id="detail-area"></span> m²</p>
                    <p><strong>Địa chỉ:</strong> <span id="detail-address"></span></p>
                    <p><strong>Phòng:</strong> <span id="detail-rooms"></span></p>
                    <div class="contact-info">
                        <p><strong>Liên hệ:</strong> <span id="detail-contact">0354952306</span></p>
                        <button id="copy-contact" class="btn btn-primary"><i class="fas fa-copy"></i> Sao Chép Số</button>
                        <a id="btn-call" href="tel:0354952306" class="btn-call"><i class="fas fa-phone"></i> Gọi Ngay</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="user.js"></script>
</body>
</html>
