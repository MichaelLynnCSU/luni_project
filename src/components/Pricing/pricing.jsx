import React from 'react';
import './Pricing.css'; // Import CSS file for styling

const Pricing = () => {
    return (
        <div className="cards-container">
            <div className="card">
                <h2>100 credits for $15</h2>
                <p>Pay only $15 and get 100 credits.</p>
                <a href="www.pineapply.ai" className="buy-button">Buy Now</a>
            </div>
            <div className="card">
                <h2>250 credits for $45</h2>
                <p>Get 250 credits for just $45.</p>
                <p>Thats just 2 cents per application!</p>
                <a href="www.pineapply.ai" className="buy-button">Buy Now</a>
            </div>

            <div className="card">
                <h2>
                    <del style={{color: 'red'}}>$350</del>
                    <ins style={{textDecoration: 'none'}}>$200</ins>
                </h2>
                <p>Get 3000 job applications automatically filled and submitted for you.</p>
                <p>Thats only pennies per application!</p>
                <a href="www.pineapply.ai" className="buy-button">
                    Buy Now
                </a>
            </div>

        </div>
    );
}

export default Pricing;
