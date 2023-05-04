<template>
    <div class="container m-4">
        <h3 class="text-primary center">OTP Verification</h3>
        <div class="row form">
            <div class="col-auto">
                <input type="email" class="form-control email">
            </div>
            <div class="col-auto">
                <button class="btn btn-primary" onclick="sendOTP()">Send OTP</button>
            </div>
        </div>
        <div class="success text-success">
            OTP verified Success fully
        </div>

        <div class="verification">
            <div class="title center">
                <p>An OTP has been sent to <span class="emailpartial">***orlddoubts@gmail.com</span></p>
            </div>
            <div class="otp-input-fields">
                <input type="number" class="otp_num otp_num_1" maxlength="1">
                <input type="number" class="otp_num otp_num_2" maxlength="1">
                <input type="number" class="otp_num otp_num_3" maxlength="1">
                <input type="number" class="otp_num otp_num_4" maxlength="1">
            </div>
        </div>
        <div class="error text-danger">
            Invalid otp
        </div>
    </div>
</template>
<script setup>
    // let emailEle = document.querySelector('.email');
    // let verfEle = document.querySelector('.verification');
    // let successEle = document.querySelector('.success');
    // let errorEle = document.querySelector('.error');
    // let otp_inputs = document.querySelectorAll('.otp_num');
    // let emailpartialEle = document.querySelector('.emailpartial');
    // let regex = new RegExp('[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}');
    // let otp_check = '';
    // let email;
    // otp_inputs.forEach(
    //     (ip) => {
    //         ip.addEventListener('keyup', moveNext)
    //     }
    // )
    // function moveNext(event) {
    //     let current = event.target;
    //     let index = current.classList[1].slice(-1);
    //     if (event.keyCode == 8 && index > 1) {
    //         current.previousElementSibling.focus()
    //     }
    //     else if (index < 4) {
    //         current.nextElementSibling.focus()

    //     }
    //     otp_check = '';
    //     for (ip of otp_inputs) {
    //         otp_check += ip.value
    //     }
    //     if (otp_check.length == 4) {
    //         verifyOTP()
    //     }
    // }

    // function verifyOTP() {
    //     fetch('http://localhost:4000/verify',
    //         {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 "email": `${email}`,
    //                 "otp": `${otp_check}`
    //             }),
    //             headers: { 'Content-Type': 'application/json' }
    //         }
    //     )
    //         .then(
    //             (res) => {
    //                 console.log(res)
    //                 if (res.status == 200) {
    //                     verfEle.style.display = 'none';
    //                     successEle.style.display = 'block';
    //                     errorEle.style.display = 'none';
    //                 }
    //                 else {
    //                     errorEle.style.display = 'block';
    //                     errorEle.innerHTML = "Invalid OTP";
    //                     successEle.style.display = 'none';
    //                 }
    //             }
    //         )
    // }
    // function sendOTP() {
    //     email = emailEle.value;
    //     if (regex.test(email)) {
    //         fetch('http://localhost:4000/sendotp', {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 "email": `${email}`
    //             }),
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //             .then(
    //                 (res) => {
    //                     if (res.status == 200) {
    //                         verfEle.style.display = 'block';
    //                         emailpartialEle.value = "***" + email.slice(3)
    //                         emailEle.value = ''
    //                     }
    //                     else {
    //                         errorEle.style.display = 'block';
    //                         errorEle.innerHTML = "Email not exist";
    //                         successEle.style.display = 'none';
    //                     }
    //                 }
    //             )
    //     }
    //     else {
    //         errorEle.style.display = 'block';
    //         errorEle.innerHTML = "Invalid Email";
    //         successEle.style.display = 'none';

    //     }
    // }
</script>
<style>
    body {
        display: flex;
        justify-content: center;
        height: 100vh;
    }

    .form {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .center {
        text-align: center;
    }

    .verification {
        margin-top: 20px;
        display: none;
    }

    .otp-input-fields {
        margin: auto;
        /* background-color: red; */
        box-shadow: 0px 0 8px 0px #02024066;
        max-width: 420px;
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 30px;
    }

    .otp_num {
        width: 40px;
        height: 40px;
        text-align: center;
        outline: none;
        border-radius: 4px;
        border: 1px solid #2f8f1f;
        font-size: 14px;
    }

    .otp_num::-webkit-inner-spin-button,
    .otp_num::-webkit-outer-spin-button {
        appearance: none;
    }

    .success,
    .error {
        display: none;
        text-align: center;
    }
</style>