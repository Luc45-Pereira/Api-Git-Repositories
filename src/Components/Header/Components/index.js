import React from "react";

const Header = ({ nome }) => (
    <li key={nome?.id} id="cabecalho">
        <img src={nome?.owner.avatar_url} key={nome?.id}></img>
        <h1>
            {
                nome?.owner.login
            }
        </h1>
    </li>
);

export default Header;