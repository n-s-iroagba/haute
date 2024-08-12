import React from 'react';
import '../../common/styles/styles.css'
import ManagerCards from '../../common/layout/ManagerCards';
import MiniFooter from '../../common/components/MiniFooter';
import NavbarComponent from '../../common/components/NavbarComponent';


const FundManagers = () => {
    return (

<>
<NavbarComponent/>
        <div className='d-flex flex-column align-items-center px-5 py-3'>
            <h2 className='text-center'>Why Choose Our Managers?</h2>
            <div className='primary-line mb-2' />
            <p className='text-center'><span className="highlight">Decades of Experience</span><br />
                Our managers divlectively boast over <span className="highlight">10</span> years of experience in the financial markets. They have navigated through various market cycles and economic climates, providing them with the insights needed to make informed decisions.</p>

            <p className='text-center'><span className="highlight">Proven Track Record</span><br />
                Our managers have consistently delivered superior returns, outperforming benchmarks and setting new standards of excellence. Their achievements are a testament to their skill and dedication to maximizing client wealth.</p>

            <p className='text-center'><span className="highlight">Diverse Expertise</span><br />
                From equities and fixed income to alternative investments and emerging markets, our managers possess specialized knowledge across a wide range of asset classes. This diversity allows us to create well-rounded portfolios tailored to your unique investment needs.</p>

            <p className='text-center'><span className="highlight">Innovative Strategies</span><br />
                Staying ahead in the fast-paced world of finance requires innovation. Our managers leverage cutting-edge technology and data analytics to uncover new opportunities and manage risks effectively. Their forward-thinking approach ensures that your investments are poised for growth.</p>

            <p className='text-center'><span className="highlight">Client-Centric Approach</span><br />
                We understand that each client has unique financial objectives and risk tolerances. Our managers take the time to understand your individual goals and work closely with you to develop customized investment strategies. Your success is our priority.</p>
            <p className='text-center'></p>
            <h3 className='text-center'>Meet our Fund Managers</h3>
            <div className='primary-line mb-2' />
        </div>
        <div>
            
            <ManagerCards />

            <MiniFooter />
        </div>
        </>
    )
}

export default FundManagers;