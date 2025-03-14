import React from 'react';

interface SubmitProps {
    onClick: () => void;
}

function Submit( { onClick }: SubmitProps) {
    return (
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
    )
}

export default Submit;