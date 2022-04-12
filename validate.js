const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phonenumber');
const otp = document.getElementById('otp');
const form1 = document.getElementById('form1');


var random = 1000;

// states object with state code and state name

States = [
    { "State Code": "100", "State": "Jammu & Kashmir" },
    { "State Code": "101", "State": "Himachal Pradesh" },
    { "State Code": "102", "State": "Punjab" },
    { "State Code": "103", "State": "Chandigarh" },
    { "State Code": "104", "State": "Uttranchal" },
    { "State Code": "105", "State": "Haryana" },
    { "State Code": "106", "State": "Delhi" },
    { "State Code": "107", "State": "Rajasthan" },
    { "State Code": "108", "State": "Uttar Pradesh" },
    { "State Code": "109", "State": "Bihar" },
    { "State Code": "110", "State": "Sikkim" },
    { "State Code": "111", "State": "Arunachal Pradesh" },
    { "State Code": "112", "State": "Nagaland" },
    { "State Code": "113", "State": "Manipur" },
    { "State Code": "114", "State": "Mizoram" },
    { "State Code": "115", "State": "Tripura" },
    { "State Code": "116", "State": "Meghalaya" },
    { "State Code": "117", "State": "Assam" },
    { "State Code": "118", "State": "West Bengal" },
    { "State Code": "119", "State": "Jharkhand" },
    { "State Code": "120", "State": "Orissa" },
    { "State Code": "121", "State": "Chhattisgarh" },
    { "State Code": "122", "State": "Madhya Pradesh" },
    { "State Code": "123", "State": "Gujarat" },
    { "State Code": "124", "State": "Daman & Diu" },
    { "State Code": "125", "State": "Dadra & Nagar Haveli" },
    { "State Code": "126", "State": "Maharashtra" },
    { "State Code": "127", "State": "Karnataka" },
    { "State Code": "128", "State": "Goa" },
    { "State Code": "129", "State": "Lakshdweep" },
    { "State Code": "130", "State": "Kerala" },
    { "State Code": "131", "State": "Tamil Nadu" },
    { "State Code": "132", "State": "Pondicherry" },
    { "State Code": "133", "State": "Andaman & Nicobar Islands" },
    { "State Code": "134", "State": "Telangana" },
    { "State Code": "135", "State": "Andhra Pradesh" },
    { "State Code": "136", "State": "Himachal Pradesh" },


];

// Adding event listner to phone number as it is real time validation
if (phone) {
    phone.addEventListener('input', e => {

        e.preventDefault();

        checkPhonenumber();

    });
}

// Adding event listner to sign up page form
if (form) {
    form.addEventListener('submit', e => {

        validateForm(e);





    });
}


// Adding event listner to landing page form
if (form1) {
    form1.addEventListener('submit', e => {


        e.preventDefault()
        validateOTP();

    });
}


// validating the format of the phone number with specific provider , state code and 4 digit number

const checkPhonenumber = e => {

    const phonevalcheck = phone.value.trim();
    var provider = "";


    let providerNo = 0;
    let stateNo = 0;

    let len = States.length;

    let phnArr = phonevalcheck.split("-")

    providerNo = parseInt(phnArr[0].replace(/\(|\)/g, ""))

    stateNo = parseInt(phnArr[1])

    var flag1 = false;
    var flag2 = false;





    const phnum = 0;




    // checking the provider code and validating the range with name of the provider
    if (typeof (phnArr[0].replace(/\(|\)/g, "")) != "undefined") {
        if (phnArr[0].replace(/\(|\)/g, "").length == 3) {
            if (providerNo <= 799 && providerNo >= 621) {

                provider = "Jio"
                console.log(provider)
                setError(phone, 'Invalid number..!')
                flag1 = true;
                // setSuccess(phone)
                checkProvider(provider)


            }
            else if (providerNo <= 920 && providerNo >= 801) {
                provider = "Idea"
                console.log(provider)
                // setSuccess(phone)
                setError(phone, 'Invalid number..!')
                flag1 = true
                checkProvider(provider)

            }
            else if (providerNo <= 999 && providerNo >= 921) {
                provider = "Vodafone"
                console.log(provider)
                // setSuccess(phone)
                setError(phone, 'Invalid number..!')
                flag1 = true;
                checkProvider(provider)


            }
            else {
                provider = "";

                setError(phone, 'Invalid number..!')
                flag1 = false;
                checkProvider(provider)


            }

        }
        else {
            provider = "";
            setError(phone, 'Invalid number..!')

            checkProvider(provider)
            flag1 = false;

        }
    }


    // checking the state code within the specified range and getting state name for the same
    if (typeof (phnArr[1]) != "undefined") {
        if (!isState(phnArr[1])) {
            setError(phone, 'Please enter valid State Code!')
            flag2 = false;
            checkCode(Code)


        }
        else {



            var par = 0;
            var flag = 1;
            var Code = "";
            for (var i = 0; i < len; i++) {

                var par = parseInt(States[i]["State Code"]);

                console.log("Sates", stateNo)
                if (par == stateNo) {
                    //  States[i]["State Name"];
                    console.log("Code", States[i]["State"])
                    Code = States[i]["State"];

                    flag = 0;
                    break;
                }
                else {
                    flag = 1
                    console.log("error", flag)
                    Code = "";

                }
            }

            if (flag == 0) {
                flag2 = true;
                checkCode(Code)

                setError(phone, 'Invalid number..!')

            }

            else {
                flag2 = false
                checkCode(Code)
                setError(phone, 'Invalid State Code..!')

            }

        }

    }

    // condition for checking the last 4 digit number with state code and provider number

    if (typeof (phnArr[2]) != "undefined" && phnArr[2] != "") {
        console.log("call", phnArr[2])
        if (phnArr[2].length == 4 && flag1 && flag2) {
            if (!isnumber(phnArr[2])) {
                setError(phone, 'Please enter valid number!')
                e.preventDefault()
                return false

            }
            else {
                setSuccess(phone)
                return true;
            }
        }
        else {
            setError(phone, 'Please enter valid number')

            e.preventDefault()
            return false

        }
    }


};


// writing the provider name behind the phone number on html
const checkProvider = prv => {

    if (prv) {



        document.getElementById("para").innerHTML = prv + ",";

    }
    else {
        document.getElementById("para").innerHTML = prv;
    }


}


// writing the state name behind the phone number on html
const checkCode = code => {

    if (code || typeof (code) != "undefined") {



        document.getElementById("paracode").innerHTML = code;

    }
    else {
        code = ""
        document.getElementById("paracode").innerHTML = code;
    }


}

// regex for validating the state code of the phone number
const isState = sat => {


    const staecheck = /(1[01][0-9]|12[0-9]|13[0-7])\b/

    return staecheck.test(String(sat).toLocaleLowerCase())
}

// regex for validating the last 4 digit of phone number
const isnumber = num => {

    const numcheck = /^\(?([0-9]{4})$/;

    return numcheck.test(String(num).toLocaleLowerCase())
}



// regex for validating the User Name
const isValidName = name => {



    var splt = username.value.split(/(\s+)/);
    console.log(splt[0].match(/([a-zA-Z]*|\s)^!@#\$%\^\&*\)\(+=._-]+$/))


    if (name.match(/([a-zA-Z]|\s)$/) && splt.length >= 3 && splt[0].length >= 4 && splt[2].length >= 4) {
        return true;
    }
    else {
        return false;
    }
}


// regx for validating the email
const isValidEmail = semail => {

    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reEmail.test(String(semail).toLocaleLowerCase())

}


// Validating the form fields such as "user name" , "Email" , "phone number" on submiting the form

const validateForm = e => {

    const usernameVal = username.value.trim();
    const emailval = email.value.trim();
    const phoneval = phone.value.trim();

    if (usernameVal === '') {

        setError(username, 'Username is required..!')
        e.preventDefault()
        return false

    } else if (!isValidName(usernameVal)) {
        console.log("hey")
        setError(username, 'Provide a valid user name.')
        e.preventDefault()
        return false

    } else {
        console.log("HI")
        setSuccess(username)
    }

    if (emailval === '') {

        setError(email, 'Email is required..!')
        e.preventDefault()
        return false

    } else if (!isValidEmail(emailval)) {
        setError(email, 'Provide a valid email address.')
        e.preventDefault()
        return false

    } else {
        setSuccess(email)
    }

    if (phoneval === '') {

        setError(phone, 'Phone Number is required..!')
        e.preventDefault()
        return false


    }
    else if (checkPhonenumber(e)) {
        setSuccess(phone)
    }
    else {
        setError(phone, 'Required Valid phone number!')
        e.preventDefault()
        return false
    }



};


const UserDetails = () => {
    // generating 4 digit random number
    random = Math.floor(1000 + Math.random() * 9000);

    // taking username and phonenumber from url
    var url = window.location.href;


    // spliting the URL to get specific username and phonenumber
    var splt = url.split("?")

    var val = splt[1].split("&")


    var actval = val[0].split("=")
    var nval = actval[1].split("+")
    console.log(nval)

    var pval = val[2].split("=")
    var actp = pval[1].replace("%28", "(")
    var actphn = actp.replace("%29", ")")

    // Adding username and phonenumber to the description on landing page
    document.getElementById("sp1").innerHTML = nval[0];
    document.getElementById("sp2").innerHTML = actphn;

}

// Valiadating OTP and checking the condtions 

const validateOTP = () => {

    const otpcheck = otp.value.trim();
    const charrand = random
    console.log("otp", charrand)

    // check for empty field
    if (otpcheck === '') {
        setError(otp, 'Please enter OTP')
    }

    // check for wrong otp
    else if (charrand != otpcheck) {
        setError(otp, 'Invalid OTP')
        location.href = 'http://pixel6.co/invalidotp';


    }

    // if otp entered is correct
    else {
        setSuccess(otp)
        location.href = 'http://pixel6.co/';
    }

}


//Adding Error field to input control of the specific elements
const setError = (element, msg) => {
    const inputcontrol = element.parentElement;
    const errorDisplay = inputcontrol.querySelector('.error');

    errorDisplay.innerText = msg;
    inputcontrol.classList.add('error');
    inputcontrol.classList.remove('success')
}


//Adding Success field to input control of the specific elements
const setSuccess = element => {
    const inputcontrol = element.parentElement;
    const errorDisplay = inputcontrol.querySelector('.error');


    errorDisplay.innerText = '';
    inputcontrol.classList.add('success');
    inputcontrol.classList.remove('error')
}



