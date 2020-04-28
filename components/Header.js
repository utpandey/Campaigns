import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
    return(
        // for jsx,we have to place two curly bracks to pass obj literal
        <Menu style={{ marginTop: '10px' }}> 
            <Link route='/'>
                <a className='item' > CrowdFund </a>
            </Link>

            <Menu.Menu position="right">

            <Link route='/'>
                <a className='item' > Campaigns </a>
            </Link>
            <Link route='/campaigns/new'>
                <a className='item' > + </a>
            </Link>

            </Menu.Menu>


        </Menu>

    )
}