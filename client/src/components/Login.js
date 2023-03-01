import React from 'react'

export default function Login() {

    function show_hide_password(target){
        var input = document.getElementById('password-input');
        if (input.getAttribute('type') == 'password') {
            target.classList.add('view');
            input.setAttribute('type', 'text');
        } else {
            target.classList.remove('view');
            input.setAttribute('type', 'password');
        }
        return false;
    }
    return (
        <div>
            <section>

                <div class="box">

                    <div class="container">
                        <div class="form">
                            <p id="login-title">LOGIN</p>
                            <form action="">
                                <div class="inputBx">
                                    <input type="text" required="required" />
                                    <span>Login</span>
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                <div class="inputBx password">
                                    <input id="password-input" type="password" name="password" required="required" />
                                    <span>Password</span>
                                    <a href="#" class="password-control" onclick="return show_hide_password(this);"></a>
                                    <i class="fas fa-key"></i>
                                </div>
                                <label class="remember"><input type="checkbox" />
                                    Remember</label>
                                <div class="inputBx">
                                    <input type="submit" value="Log in" disabled />
                                </div>
                            </form>
                            <p>Forgot password? <a href="#">Click Here</a></p>
                            <p>Don't have an account <a href="#">Sign up</a></p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
