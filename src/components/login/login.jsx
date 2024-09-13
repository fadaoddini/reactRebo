import React, { useState }
 from "react";
import styles from "./login.module.css";
import axios from "axios";
const LoginApp = () => {

    const[mobile,setMobile]=useState("")
    let params = {mobile:mobile}

    const onClickToSendOtp=()=>{
        axios.post("https://rebo.ir/login/sendOtp",params)
    }

  return (
    <div>

        <div id={styles.main_login}
>
          <div id={styles.content_desktop}
>
            <div className={styles.logo}
>
              <div className={styles.logo_desktop}
>
                <img src="" alt="" />
              </div>
            </div>
            <br />
            <br />
            <h2>ورود</h2>
            <input type="text" name="mobile" value={mobile}
 onChange={(event)=>{
                setMobile(event.target.value)
            }
}
 />
            
            
            <input type="submit" name="login" value="ارسال کد" onClick={onClickToSendOtp}
 />
            <div className={styles.sign_up}
>
              <p>
                با عضویت در ربو قوانین و مقررات آن را می پذیرید
              </p>
            </div>
          </div>

          <div id={styles.content_mobile}
>
            <div className={styles.logo}
>
              <div className={styles.logo_desktop}
>
              <img src="" alt="" />
              </div>
            </div>
            <br />
            <br />
            <h2>ورود</h2>
            <input type="text" name="mobile" placeholder="شماره همراه خود را وارد کنید" />
            
            
            <input type="submit" name="login" value="ارسال کد" />
            <div className={styles.sign_up}
>
            <p>
                با عضویت در ربو قوانین و مقررات آن را می پذیرید
              </p>
            </div>
          </div>
        </div>

    </div>
  );
}
;

export default LoginApp;
