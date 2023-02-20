
import React  from 'react';
import { WrapComponent } from './wrap';
import { useWebTitle } from './title';


const New = (props) => {
    const [title] = useWebTitle();
    return (
        <div>
            <span>{props.extraTitle}</span>
            <WrapComponent title={title} />
        </div>
    )
}

export { New }