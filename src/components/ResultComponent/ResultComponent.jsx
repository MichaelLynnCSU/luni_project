import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import gsap from 'gsap'; // Directly import GSAP

import './ResultComponent.scss'; // Ensure SCSS styles are correctly applied

import scanningAnimationData from '../../assets/lotty/research.json';
import extractingAnimationData from '../../assets/lotty/time.json';
import searchingAnimationData from '../../assets/lotty/job-seeking.json';
import detectingAnimationData from '../../assets/lotty/document.json';
import doneAnimationData from '../../assets/lotty/agreement.json';

import pngImage1 from '../../../functions/assets/images/logo1.png';
import pngImage2 from '../../../functions/assets/images/logo2.png';

const images = [pngImage1, pngImage2];

const ResultComponent = () => {
    const tlRef = useRef();

    useEffect(() => {
        if (!gsap.utils.toArray('.title').length) return;

        const title = document.querySelector('.title');
        const split = new gsap.SplitText(title, { type: 'chars' }); // Use gsap.SplitText directly
        const timeline = gsap.timeline();

        gsap.fromTo('.result-container', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 });

        const tl = gsap.timeline();
        tl
           .fromTo('.step-one [aria-label="animation"]', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 })
           .fromTo('.step-one.title', { y: 50, opacity: 0 }, { y: 0, opacity: 1 })
           .fromTo('.step-one.subtitle', { y: 50, opacity: 0 }, { y: 0, opacity: 1 })
           .to({}, { duration: 3 })
            // Add more steps as needed

        tlRef.current = timeline;

        const handleResizeStart = () => {
            tlRef.current.pause();
        };

        const handleResizeEnd = () => {
            tlRef.current.resume();
        };

        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResizeEnd, 150);
            handleResizeStart();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            tlRef.current.kill();
        };
    }, []);

    const StepOne = () => (
        <div className="step-one">
            <Lottie className="lottie-container" ref={lottieRef} options={{ animationData: scanningAnimationData, loop: true, autoplay: true }} height={200} width={200} />
            <div className="animation-wrapper"><h2 className="title">Analyzing Your CV</h2></div>
            <div className="animation-wrapper"><p className="subtitle">Pineapply AI is currently scanning your CV for key details.</p></div>
        </div>
    );

    // Implement other steps similarly

    return (
        <div className="container">
            <div className="result-container">
                <StepOne />
                {/* Include other steps components here */}
            </div>
        </div>
    );
};

export default ResultComponent;
