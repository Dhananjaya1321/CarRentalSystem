const BRAND=/^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const PASSENGER_COUNT=/^[1-9]\d?$/;/*only numbers between 1 and 99*/
const REGISTRATION_NUMBER=/^[A-Z]{2,3}-\d{2,4}$/;/*ex- "AB-1524," "XYZ-123," "ABC-4567,"*/
const COLOR=/^[A-Za-z]+$/;/*only letters*/
const PRICES=/^\d+(\.\d+)?$/;/*integer or double values*/
const MILEAGES=/^\d+$/;/*integer values*/
const INT=/^\d+$/;/*integer values*/

const EMAIL=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ADDRESS=/^.{5,100}$/;
const NAME=/^[A-Za-z-']{2,50}$/;
const NIC=/^[0-9]{9}(V)?|[0-9]{12}(V)?/;
const CONTACT=/^(?:\+94|0)7[0-9]{8}$/;
const PASSWORD=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;/* 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character*/
const USERNAME=/^[A-Za-z0-9_-]{3,20}$/;
const MESSAGE=/^.{4,}$/;
const LICENSE=/^[A-Z]{2}\d{6}$/;
