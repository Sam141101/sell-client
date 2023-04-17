import { createAxios } from './createInstance';
import { loginSuccess } from './redux/authRedux';

// export const InputBlur = (user, dispatch) => {

//     // dùng với username
//     const blurUsername = (e) => {
//             if (!e.target.value) {
//                 document.getElementById('username').innerHTML = 'Vui lòng nhập trường này';
//                 setConfirmName(false);
//             } else {
//                 document.getElementById('username').innerHTML = '';
//                 document.getElementById('succes').innerHTML = '';
//                 setConfirmName(true);
//             }
//         };

// return createAxios(user, dispatch, loginSuccess);
// };

// function validateInput(value, required = false, minLength = 0) {
//     const trimmedValue = value.trim();

//     if (required && !trimmedValue) {
//       return {
//         error: true,
//         message: 'Vui lòng nhập giá trị'
//       };
//     }

//     if (minLength && trimmedValue.length < minLength) {
//       return {
//         error: true,
//         message: `Giá trị phải có ít nhất ${minLength} ký tự`
//       };
//     }

//     return {
//       error: false,
//       message: ''
//     };
//   }
