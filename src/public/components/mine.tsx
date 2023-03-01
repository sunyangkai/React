import React from "react";

const Mine = () => {
    const a = 'test';
    if (false) {
        console.log('this is impossible!');
        const b = 'b';
        const c = b + 1;
        return c;
    }
    return (
        <div>
            mine
        </div>
    )
}

export { Mine }