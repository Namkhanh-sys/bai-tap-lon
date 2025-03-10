$(document).ready(function() {
    const API_URL = 'https://67c7bf32c19eb8753e7a91a3.mockapi.io/api/v1/khanh';
    let houses = [];

    // Hiển thị logo từ localStorage
    function loadSiteLogo() {
        const siteLogo = localStorage.getItem('siteLogo');
        if (siteLogo) {
            $('#header-logo').attr('src', siteLogo);
        }
    }

    // Render danh sách nhà
    function renderHouses(housesToRender) {
        $('#house-grid').empty();
        housesToRender.forEach(house => {
            const card = `
                <div class="house-card" data-id="${house.id}">
                    <img src="${house.image}" alt="${house.name}" />
                    <h3>${house.name}</h3>
                    <p><strong>Giá:</strong> ${Number(house.price).toLocaleString('vi-VN')} VNĐ/tháng</p>
                    <p><strong>Diện tích:</strong> ${house.area} m²</p>
                    <p><strong>Phòng:</strong> ${house.bedrooms} ngủ, ${house.bathrooms} tắm</p>
                    <a href="#" class="btn-detail">Xem Chi Tiết</a>
                </div>
            `;
            $('#house-grid').append(card);
        });
    }

    // Load danh sách nhà từ API
    function loadHouses() {
        $('#loading-spinner').show();
        $.ajax({
            url: API_URL,
            method: 'GET',
            success: function(data) {
                houses = data;
                renderHouses(houses);
                $('#loading-spinner').hide();
            },
            error: function(xhr) {
                alert('Lỗi khi tải danh sách nhà: ' + xhr.responseText);
                $('#loading-spinner').hide();
            }
        });
    }

    // Hiển thị/Ẩn bộ lọc
    $('#filter-btn').on('click', function() {
        $('#filter-container').slideToggle();
    });

    // Áp dụng bộ lọc
    $('#apply-filter').on('click', function() {
        const maxPrice = parseFloat($('#price-range').val()) || Infinity;
        const minArea = parseFloat($('#area-range').val()) || 0;
        const bedrooms = parseInt($('#bedrooms').val()) || 0;

        const filteredHouses = houses.filter(house =>
            parseFloat(house.price) <= maxPrice &&
            parseFloat(house.area) >= minArea &&
            (bedrooms === 0 || parseInt(house.bedrooms) === bedrooms)
        );

        renderHouses(filteredHouses);
        $('#filter-container').slideUp();
    });

    // Sắp xếp danh sách nhà
    $('#sort-options').on('change', function() {
        const sortOption = $(this).val();
        let sortedHouses = [...houses];

        if (sortOption === 'price-asc') {
            sortedHouses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === 'price-desc') {
            sortedHouses.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortOption === 'area-asc') {
            sortedHouses.sort((a, b) => parseFloat(a.area) - parseFloat(b.area));
        } else if (sortOption === 'area-desc') {
            sortedHouses.sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
        }

        renderHouses(sortedHouses);
    });

    // Hiển thị chi tiết nhà
    $(document).on('click', '.btn-detail', function(e) {
        e.preventDefault();
        const id = $(this).closest('.house-card').data('id');
        $.ajax({
            url: `${API_URL}/${id}`,
            method: 'GET',
            success: function(house) {
                $('#detail-image').attr('src', house.image);
                $('#detail-name').text(house.name);
                $('#detail-price').text(Number(house.price).toLocaleString('vi-VN'));
                $('#detail-area').text(house.area);
                $('#detail-address').text(house.address);
                $('#detail-rooms').text(`${house.bedrooms} phòng ngủ, ${house.bathrooms} phòng tắm`);
                $('#detail-contact').text('0354952306'); // Giả lập số điện thoại
                $('#btn-call').attr('href', 'tel:0354952306');
                $('#detail-modal').show();
            },
            error: function(xhr) {
                alert('Lỗi khi lấy chi tiết nhà: ' + xhr.responseText);
            }
        });
    });

    // Sao chép số điện thoại
    $('#copy-contact').on('click', function() {
        const contact = $('#detail-contact').text();
        navigator.clipboard.writeText(contact).then(() => {
            alert('Đã sao chép số điện thoại: ' + contact);
        });
    });

    // Đóng modal
    $('.close-btn').on('click', function() {
        $('#detail-modal').hide();
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#detail-modal')) {
            $('#detail-modal').hide();
        }
    });

    // Load dữ liệu ban đầu
    loadHouses();
    loadSiteLogo();
});
