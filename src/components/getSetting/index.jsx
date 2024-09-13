import axios from "axios";
import React, { useEffect, useState }
 from "react";
import Loading from "../loading/index";
const GetSettings = () => {


  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favicon, setFavicon] = useState("");
  const [logo, setLogo] = useState("");
  const [tel, setTel] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [active, setIsActive] = useState(false);

  useEffect(() => {
    axios.get("https://rebo.ir/settings").then((res) => {
      setTitle(res.data.title);
      setDescription(res.data.description);
      setFavicon(res.data.favicon);
      setLogo(res.data.logo);
      setTel(res.data.tel);
      setMobile(res.data.mobile);
      setAddress(res.data.address);
      setEmail(res.data.email);
      setIsActive(res.data.is_active);
      setIsLoading(false);

    }
);
  }
, []);
  return (
    <div>
      {isLoading?<div><Loading /></div>:
      <div>
        <h1>title = {title}
</h1>
        <p>description = {description}
</p>
        <p>favicon = {favicon}
</p>
        <p>logo = {logo}
</p>
        <p>tel = {tel}
</p>
        <p>mobile = {mobile}
</p>
        <p>address = {address}
</p>
        <p>email = {email}
</p>
        <p>is_active = {active}
</p>
      </div>}

    </div>
  );
}
;

export default GetSettings;
