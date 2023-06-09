// import 'sl' from './assets/slider2min.png';

export const sliderItems = [
    {
        id: 1,
        img: 'https://file.hstatic.net/200000312481/file/dacbiet_7c9134bbbea44077b081bbdcaa2a4b33.jpg',
        setSrc: 'https://file.hstatic.net/200000312481/file/dacbiet_7c9134bbbea44077b081bbdcaa2a4b33_large.jpg',

        cat: 'TEE',
    },

    // {
    //     id: 2,
    //     img: 'https://file.hstatic.net/200000312481/file/160167174_187614549831716_8814664794363049413_n_f575b6c1fe4747debb6c45d4b2d01630.jpg',
    //     setSrc: 'https://file.hstatic.net/200000312481/file/160167174_187614549831716_8814664794363049413_n_f575b6c1fe4747debb6c45d4b2d01630.jpg',

    //     cat: 'HOODIE',
    // },

    {
        id: 3,
        img: 'https://file.hstatic.net/200000312481/file/meow_copy_dcd15b165a7449dcbfb1a7e10aad4f2b.jpg',
        // setSrc: 'https://firebasestorage.googleapis.com/v0/b/shop-2bc2a.appspot.com/o/slider2min.jpg?alt=media&token=a1b0e0a3-81d5-4f39-815e-4df35af71f11&_gl=1*1lh1jyq*_ga*ODQ0ODA3ODExLjE2Nzk0MTMwNjc.*_ga_CW55HF8NVT*MTY4NjA4MzI1MS4zLjEuMTY4NjA4MzQwNy4wLjAuMA..',
        setSrc: 'https://file.hstatic.net/200000312481/file/dacbiet_7c9134bbbea44077b081bbdcaa2a4b33_large.jpg',
        // setSrc: 'https://firebasestorage.googleapis.com/v0/b/shop-2bc2a.appspot.com/o/AnyConv.com__slider2min.webp?alt=media&token=fc8d4a10-fc27-494e-a128-e2d65355af02&_gl=1*aam6au*_ga*ODQ0ODA3ODExLjE2Nzk0MTMwNjc.*_ga_CW55HF8NVT*MTY4NjI3OTgzMS41LjEuMTY4NjI3OTkxOC4wLjAuMA..',
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

// export const listInfoMobile1 = [
//     {
//         id: 1,
//         title: 'Quay về',
//         noLink: true,
//         Byid: 'return0',
//     },

//     {
//         id: 2,
//         title: 'Xem tất cả "Shop"',
//         noLink: false,
//     },

//     {
//         id: 3,
//         noLink: true,
//         title: '- TOPS',
//         Byid: 'click1',
//     },

//     {
//         noLink: true,
//         id: 4,
//         title: '- BOTTOM',
//         Byid: 'click2',
//     },
// ];

// export const listInfoMobile2 = [
//     {
//         id: 1,
//         title: 'Quay về',
//         noLink: true,
//         Byid: 'return1',
//         notPage: true,
//     },

//     {
//         id: 2,
//         title: 'Xem tất cả "TOPS"',
//         noLink: true,
//         notPage: false,
//         to: '#',
//     },

//     {
//         id: 3,
//         notPage: true,
//         noLink: false,
//         title: '- TEE',
//         to: `products/TEE?page=${1}`,
//     },

//     {
//         notPage: true,
//         noLink: false,
//         id: 4,
//         title: '- POLO',
//         to: `products/POLO?page=${1}`,
//     },

//     {
//         notPage: true,
//         noLink: false,
//         id: 4,
//         title: '- HOODIE',
//         to: `products/HOODIE?page=${1}`,
//     },
// ];
