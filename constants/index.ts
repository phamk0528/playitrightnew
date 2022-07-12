export const NAVBAR_LINKS = [
    {
        to: '/',
        name: 'Home',
    },
    {
        to: '/',
        name: 'Magazine',
    },
    {
        to: '/',
        name: 'Sports',
    },
    {
        to: '/',
        name: 'Economy',
    },
];

export const FOOTER_LINKS = [
    {
        heading: 'Terms Of Use',
        link: '/termsOfUse',
    },
   
    {
        heading: 'Privacy Policy',
        link: '/generalPrivacyNotice',
    },
    {
        heading: 'Whistleblowing Policy',
        link: '/whistleblowingPolicy',
    },
];

export const SOCIAL_LINKS = [
    {
        heading: 'Facebook',
        link: '/Facebook',
    },
    // {
    //     heading: 'Twitter',
    //     link:'/Twitter'
    // },
    {
        heading: 'Instagram',
        link: '/Instagram',
    },
];

export const FRIST_CHARACTERS = [
    { title: 'All', value: 'asc' },
    { title: '0-9', value: '09' },
    { title: 'A', value: 'A' },
    { title: 'B', value: 'B' },
    { title: 'C', value: 'C' },
    { title: 'D', value: 'D' },
    { title: 'E', value: 'E' },
    { title: 'F', value: 'F' },
    { title: 'G', value: 'G' },
    { title: 'H', value: 'H' },
    { title: 'I', value: 'I' },
    { title: 'J', value: 'J' },
    { title: 'K', value: 'K' },
    { title: 'L', value: 'L' },
    { title: 'M', value: 'M' },
    { title: 'N', value: 'N' },
    { title: 'O', value: 'O' },
    { title: 'P', value: 'P' },
    { title: 'Q', value: 'Q' },
    { title: 'R', value: 'R' },
    { title: 'S', value: 'S' },
    { title: 'T', value: 'T' },
    { title: 'U', value: 'U' },
    { title: 'V', value: 'V' },
    { title: 'W', value: 'W' },
    { title: 'X', value: 'X' },
    { title: 'Y', value: 'Y' },
    { title: 'Z', value: 'Z' },
];

export const URL_BASE = process.env.NEXT_PUBLIC_BASE_URL;
// export const URL_BASE = process.env.NEXT_PUBLIC_PROUCTION_URL;
export const CAR_PARK_URL = 'https://integration.bistrobytes.com.sg/carpark/lots';
export const bistroByte = [
    { value: 'Missing food items', label: 'Missing food items' },
    { value: 'Missing order, paid and no order', label: 'Missing order, paid and no order' },
    { value: 'Food safety', label: 'Food safety', color: '#5243AA' },
    { value: 'Feedback on quality', label: 'Feedback on quality' },
    {
        value: 'Long waiting time (beyond 15 mins)',
        label: 'Long waiting time (beyond 15 mins)',
    },
    // { value: 'LongWaiting40', label: 'Long waiting time for Delivery order (Beyond 40mins)' },
    // { value: 'Long waiting time for Delivery order (Beyond 40mins)', label: 'General delivery experience' },
    // { value: `Riders' service level `, label: `Riders' service level ` },
    // { value: 'Missing Cutleries', label: 'Missing Cutleries' },
    // { value: 'Feedback on packaging ', label: 'Feedback on packaging ' },
    // { value: 'Update delivery address', label: 'Update delivery address' },
    // { value: 'Wrong order received', label: 'Wrong order received' },
    // { value: 'No order received', label: 'No order received' },
];

export const klikRelated = [
    { value: 'Voucher usage/promotion issue', label: 'Voucher usage/promotion issue' },
    { value: 'Rewards Programme', label: 'Rewards Programme' },
    { value: 'Referral Discount', label: 'Referral Discount' },
];
export const myAccount = [
    { value: 'Forgot Password / Reset Password', label: 'Forgot Password / Reset Password' },
    { value: 'Update account information', label: 'Update account information' },
    { value: 'Unsubscribe to Klik/i12 Katong', label: 'Unsubscribe to Klik/i12 Katong' },
    { value: 'Account Security & Protection', label: 'Account Security & Protection' },
    { value: 'Delete account', label: 'Delete account' },
];
export const ordersPayments = [
    { value: 'Payment issues', label: 'Payment issues' },
    { value: 'Enquiry on Payment methods', label: 'Enquiry on Payment methods' },
];

export const delivery = [
    { value: 'General delivery experience', label: 'General delivery experience' },
    { value: 'Long waiting time (Beyond 40mins)', label: 'Long waiting time (Beyond 40mins)' },
    { value: `Riders' service level`, label: `Riders' service level` },
    { value: 'Missing Cutleries', label: 'Missing Cutleries' },
    { value: 'Feedback on packaging', label: 'Feedback on packaging' },
    { value: 'Update delivery address', label: 'Update delivery address' },
    { value: 'Wrong order received', label: 'Wrong order received' },
    { value: 'No order received', label: 'No order received' },
];

export const groupedOptions = [
    {
        label: 'Food',
        options: bistroByte,
    },
    {
        label: 'Klik Related',
        options: klikRelated,
    },
    {
        label: 'My Account',
        options: myAccount,
    },
    {
        label: 'Orders/Payments',
        options: ordersPayments,
    },
    {
        label: 'Delivery',
        options: delivery,
    },
];

export const bistroByteFeedback = [
    { value: 'Missing food items', label: 'Missing food items' },
    { value: 'Missing order, paid and no order', label: 'Missing order, paid and no order' },
    { value: 'Wrong Order', label: 'Wrong Order' },
    { value: 'Unable to retrieve order from locker', label: 'Unable to retrieve order from locker' },
    { value: 'No receipt printed', label: 'No receipt printed' },
];

export const groupedOptionsFeedback = [
    {
        label: 'Food',
        options: bistroByteFeedback,
    },
];
