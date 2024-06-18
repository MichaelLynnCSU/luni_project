// ButtonComponent.jsx
import { useState } from 'react';

export default function ButtonComponent() {

    const [showData, setShowData] = useState(false);

    const handleClick = () => {

        setShowData(true);
    }

    return (
        <>
            <Button color='appTheme' size='lg' onClick={handleClick}>
                Search
            </Button>

            {showData &&
                <div>
                    {links.map(item => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </div>
            }
        </>
    )
}