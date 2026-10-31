const shareButton = document.getElementById("shareButton");
const copyMessage = document.getElementById("copyMessage");

shareButton.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(window.location.href);

        copyMessage.classList.add("show");

        setTimeout(function () {
            copyMessage.classList.remove("show");
        }, 1000);

    } catch (error) {
        console.error("Không thể sao chép URL:", error);
    }
});

const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");

menuButton.addEventListener("click", function (event) {
    event.stopPropagation();

    dropdownMenu.classList.toggle("open");
	menuButton.classList.toggle("open", dropdownMenu.classList.contains("open"));

    const isOpen = dropdownMenu.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", function (event) {
    if (!dropdownMenu.contains(event.target) &&
        !menuButton.contains(event.target)) {
        dropdownMenu.classList.remove("open");
		menuButton.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

const banner = document.getElementById("banner");

const bannerImages = [
	"BG/MADARA_sang lap lang la_banner.jpg",
    "BG/MADARA_edo tensei_banner.jpg",
	"BG/MADARA_edo tensei giai_banner.png",
    "BG/MADARA_bach dien an gia_banner.jpg"
];
bannerImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});

// VỊ TRÍ ẢNH HIỆN TẠI
let currentIndex = 0;

// LẤY CÁC PHẦN TỬ HTML
const bannerImage = document.getElementById("bannerImage");
const nextBannerImage = document.getElementById("nextBannerImage");

// THỜI GIAN CHUYỂN ĐỘNG
const slideDuration = 1000;

// THỜI GIAN HIỂN THỊ MỖI ẢNH
const displayDuration = 4000;

// BIẾN KIỂM SOÁT CHUYỂN ẢNH
let isSliding = false;


// 1. TẢI TRƯỚC TOÀN BỘ ẢNH
bannerImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});


// 2. HÀM CHUYỂN ẢNH
function nextBanner() {

    if (isSliding) return;

    const nextIndex = (currentIndex + 1) % bannerImages.length;
    const preloadImage = new Image();

    preloadImage.onload = function() {

        isSliding = true;
        currentIndex = nextIndex;

        // Đưa ảnh mới vào phần tử HTML thứ hai
        nextBannerImage.src = preloadImage.src;

        // Xóa trạng thái chuyển động cũ
        nextBannerImage.classList.remove("slide-in");
        bannerImage.classList.remove("slide-out");

        // Chờ trình duyệt cập nhật vị trí ban đầu
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                // Hai ảnh bắt đầu trượt cùng lúc
                nextBannerImage.classList.add("slide-in");
                bannerImage.classList.add("slide-out");

            });
        });

        // Sau khi hiệu ứng kết thúc
        setTimeout(() => {

            // Đưa ảnh mới thành ảnh chính
            bannerImage.src = preloadImage.src;

            // Đặt lại trạng thái
            bannerImage.classList.remove("slide-out");
            nextBannerImage.classList.remove("slide-in");

            isSliding = false;

        }, slideDuration);
    };

    preloadImage.onerror = function() {
        console.error("Không thể tải ảnh:", bannerImages[nextIndex]);
    };

    preloadImage.src = bannerImages[nextIndex];
}

// 3. TỰ ĐỘNG CHUYỂN ẢNH
setInterval(nextBanner, displayDuration);

// Click banner để chuyển ảnh ngay
banner.addEventListener("click", nextBanner);
nextBannerImage.src = "BG/MADARA_edo tensei_banner.jpg";