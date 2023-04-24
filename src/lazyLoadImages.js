// Load img
function load(img) {
    const url = img.getAttribute('lazy-src');
    img.setAttribute('src', url);

    img.removeAttribute('lazy-src');
}

// Xem xem trang web của chúng ta đã load chưa
function ready() {
    if ('IntersectionObserver' in window) {
        // Hỗ trợ
        var lazyImgs = document.querySelectorAll('[lazy-src]');
        // console.log(lazyImgs);

        let observer = new IntersectionObserver((entries) => {
            console.log(entries);
            entries.forEach((entry) => {
                console.log('entry.isIntersecting', entry.isIntersecting);
                if (entry.isIntersecting) {
                    load(entry.target);
                }
            });
        });

        lazyImgs.forEach((img) => {
            console.log(img);

            observer.observe(img);
        });
    } else {
        // Không hỗ trợ nên mình chuyển qua dùng Scroll và Resize event
    }
}

document.addEventListener('DOMContentLoaded', ready);
