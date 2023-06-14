export const sliderItems = [
    {
        id: 1,
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-2bc2a.appspot.com/o/slider1High.webp?alt=media&token=a69c8f81-2b95-44b7-826a-78a49cfcd9c4',
        setSrc: 'https://firebasestorage.googleapis.com/v0/b/shop-2bc2a.appspot.com/o/Slider1Min.webp?alt=media&token=fd1eeff8-18b9-4eb2-a051-9df5a4eb9e6d',

        cat: 'TEE',
    },

    {
        id: 3,
        img: 'https://firebasestorage.googleapis.com/v0/b/shop-2bc2a.appspot.com/o/slider2High.webp?alt=media&token=90c965d3-a735-41e1-a2b6-88a6bcb107ff',
        setSrc: 'https://firebasestorage.googleapis.com/v0/b/shop-2bc2a.appspot.com/o/AnyConv.com__slider2min.webp?alt=media&token=fc8d4a10-fc27-494e-a128-e2d65355af02',
        cat: 'TEE',
    },
];

export const listItemNavBar = [
    {
        id: 1,
        title: 'TEE',
        to: `/products/TEE?page=${1}`,
    },

    {
        id: 2,
        title: 'HOODIE',
        to: `/products/HOODIE?page=${1}`,
    },

    {
        id: 3,
        title: 'POLO',
        to: `/products/POLO?page=${1}`,
    },

    {
        id: 4,
        title: 'SHORT',
        to: `/products/SHORT?page=${1}`,
    },
];

export const listNavPc = [
    {
        id: 1,
        title: 'HOME',
        to: `/`,
    },

    {
        id: 2,
        title: 'Shop',
        to: `/products/all?page=${1}`,
    },

    {
        id: 3,
        title: 'Kiểm tra đơn hàng',
        to: `/wait-for-confirmation`,
    },

    {
        id: 4,
        title: 'ABOUT',
        to: `/about`,
    },
];

export const listFunctions = [
    {
        id: 1,
        title: 'Tài khoản của tôi',
        to: `account/profile`,
        noLink: true,
    },

    {
        id: 2,
        title: 'Đổi mật khẩu',
        to: `account/change-password`,
        noLink: true,
    },

    {
        id: 3,
        title: 'Đăng xuất',
        noLink: false,
    },
];

export const listInfoMobile = [
    {
        id: 1,
        title: 'HOME',
        to: `/`,
        noLink: true,
    },

    {
        id: 2,
        title: 'Shop',
        to: `#`,
        noLink: false,
    },

    {
        id: 3,
        noLink: true,
        title: 'kiểm tra đơn hàng',
        to: '/wait-for-confirmation',
    },

    {
        noLink: true,
        id: 4,
        title: 'ABOUT',
        to: `/about`,
    },
];
