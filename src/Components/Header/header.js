import React from 'react';
import Name from './Components/index';

const Header = ({repo}) => (
    <header>
        <Name nome={repo[0]}/>
    </header>
);

export default Header;