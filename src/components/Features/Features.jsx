import React from 'react';
import { Card } from 'antd';
import styles from './Features.module.scss';
import {Typography} from "@mui/joy";

const Features = () => {
    const imgPath1 = 'assets/images/features-section-1.png';
    const imgPath2 = 'assets/images/features-section-2.png';
    return (

        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Pineapply Features</h2>
                <div className={styles.grid}>
                    <Card className={styles.card}>
                        <img className={styles.icon} src={imgPath1} alt="Feature 1" />
                        <h3 className={styles.text}>View all available jobs in the UAE.</h3>
                        <p className={styles.description}>View all available jobs from all the local job boards and jobs you normally would've  missed in one place!</p>
                    </Card>
                    <Card className={styles.card}>
                        <img className={styles.icon} src={imgPath2} alt="Feature 2" />
                        <h3 className={styles.text}>Automatically fill out tedious job applications</h3>
                        <p className={styles.description}>Pineapply will automatically fill out job forms on your behalf. No more manually filling out job applications, just submit your CV once and sit back!</p>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Features;

//
//
//
// import React from 'react';
// import { Card } from 'antd';
// import styles from './Features.module.scss';
// import {Typography} from "@mui/joy";
//
// const Features = () => {
//     const imgPath1 = 'assets/images/features-section-1.png';
//     const imgPath2 = 'assets/images/features-section-2.png';
//     return (
//
//         <section className={styles.section}>
//             <div className={styles.container}>
//                 <h2 className={styles.title}>Pineapply Features</h2>
//                 <div className={styles.grid}>
//                     <Card className={styles.card}>
//                         <img className={styles.icon} src={imgPath1} alt="Feature 1" />
//                         <h3 className={styles.text}>View all available jobs in the UAE.</h3>
//                         <p className={styles.description}>View all available jobs from all the local job boards and jobs you normally would've  missed in one place!</p>
//                     </Card>
//                     <Card className={styles.card}>
//                         <img className={styles.icon} src={imgPath2} alt="Feature 2" />
//                         <h3 className={styles.text}>Automatically fill out tedious job applications</h3>
//                         <p className={styles.description}>Pineapply will automatically fill out job forms on your behalf. No more manually filling out job applications, just submit your CV once and sit back!</p>
//                     </Card>
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default Features;
