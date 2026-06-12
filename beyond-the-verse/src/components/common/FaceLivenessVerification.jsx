import React, { useRef, useEffect, useState } from 'react';
import * as FaceMeshLib from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';

export default function FaceLivenessVerification({ onVerify, onCancel }) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState('Initializing AI...');
    const [error, setError] = useState(null);

    // 🌟 REFS FOR REAL-TIME TRACKING (Prevents Stale State)
    const stepRef = useRef(0);
    const progressRef = useRef(0);
    
    // UI State (Synced with Refs)
    const [uiStep, setUIStep] = useState(0);
    const [uiProgress, setUIProgress] = useState(0);

    const steps = [
        { label: "Position face in center", icon: "fa-user-check" },
        { label: "Blink your eyes", icon: "fa-eye" },
        { label: "Turn head slowly left", icon: "fa-arrow-left" },
        { label: "Turn head slowly right", icon: "fa-arrow-right" }
    ];

    useEffect(() => {
        let camera = null;
        let faceMesh = null;

        const initAI = async () => {
            try {
                const FaceMeshConstructor = FaceMeshLib.FaceMesh || (window && window.FaceMesh);
                if (!FaceMeshConstructor) {
                    setError("AI Library failed to load. Please refresh.");
                    return;
                }

                faceMesh = new FaceMeshConstructor({
                    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`,
                });

                faceMesh.setOptions({
                    maxNumFaces: 1,
                    refineLandmarks: true,
                    minDetectionConfidence: 0.4,
                    minTrackingConfidence: 0.4,
                });

                faceMesh.onResults((results) => {
                    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
                        setStatus('No face detected');
                        updateProgress(0);
                        return;
                    }
                    analyzeFace(results.multiFaceLandmarks[0]);
                });

                if (videoRef.current) {
                    camera = new cam.Camera(videoRef.current, {
                        onFrame: async () => {
                            if (faceMesh && videoRef.current && videoRef.current.readyState === 4) {
                                await faceMesh.send({ image: videoRef.current });
                            }
                        },
                        width: 1280,
                        height: 720,
                    });
                    await camera.start();
                }
            } catch (err) {
                console.error("🚨 AI Setup Error:", err);
                setError(`Identity scanner error: ${err.message}`);
            }
        };

        initAI();

        return () => {
            if (camera) camera.stop();
            if (faceMesh) faceMesh.close();
        };
    }, []);

    const updateProgress = (val) => {
        progressRef.current = val;
        setUIProgress(val);
    };

    const nextStep = () => {
        if (stepRef.current >= 3) {
            setStatus('Verification Complete!');
            setUIStep(4);
            setTimeout(() => onVerify(), 1000);
            return;
        }
        stepRef.current += 1;
        setUIStep(stepRef.current);
        updateProgress(0);
        console.log(`✅ Moving to Step ${stepRef.current}`);
    };

    const analyzeFace = (landmarks) => {
        const nose = landmarks[1];
        const leftEyeTop = landmarks[159];
        const leftEyeBot = landmarks[145];
        const rightEyeTop = landmarks[386];
        const rightEyeBot = landmarks[374];

        const leftEAR = Math.abs(leftEyeTop.y - leftEyeBot.y);
        const rightEAR = Math.abs(rightEyeTop.y - rightEyeBot.y);
        const isBlinking = leftEAR < 0.015 && rightEAR < 0.015;
        const noseX = nose.x;

        const currentStep = stepRef.current;

        if (currentStep === 0) { // Center
            if (noseX > 0.4 && noseX < 0.6) {
                setStatus('Face Centered - Hold...');
                const newProg = progressRef.current + 4;
                updateProgress(Math.min(newProg, 100));
                if (newProg >= 100) nextStep();
            } else {
                setStatus('Please center your face');
                updateProgress(0);
            }
        } else if (currentStep === 1) { // Blink
            setStatus('Blink your eyes now...');
            if (isBlinking) {
                updateProgress(100);
                setTimeout(() => nextStep(), 500);
            }
        } else if (currentStep === 2) { // Left
            setStatus('Turn head slowly LEFT');
            if (noseX < 0.35) {
                const newProg = progressRef.current + 8;
                updateProgress(Math.min(newProg, 100));
                if (newProg >= 100) nextStep();
            }
        } else if (currentStep === 3) { // Right
            setStatus('Turn head slowly RIGHT');
            if (noseX > 0.65) {
                const newProg = progressRef.current + 8;
                updateProgress(Math.min(newProg, 100));
                if (newProg >= 100) nextStep();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-scale-in">
                
                <div className="p-6 text-center border-b border-slate-100">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Live AI Secure</span>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Identity Verification</h2>
                </div>

                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    {error ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <i className="fa-solid fa-camera-slash text-4xl text-rose-400 mb-4"></i>
                            <p className="text-slate-600 font-bold">{error}</p>
                            <button onClick={onCancel} className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Close</button>
                        </div>
                    ) : (
                        <>
                            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" autoPlay playsInline muted />
                            <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 flex items-center justify-center">
                                <div className="w-64 h-80 border-2 border-white/30 rounded-[4rem] relative">
                                    <div className={`absolute inset-0 border-4 border-teal-500 rounded-[4rem] transition-all duration-300 ${status.includes('No face') ? 'opacity-0' : 'opacity-100'}`} style={{ clipPath: `inset(${100 - uiProgress}% 0 0 0)` }}></div>
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                                <div className="bg-slate-900/80 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm shrink-0">
                                            <i className={`fa-solid ${steps[Math.min(uiStep, 3)].icon}`}></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-teal-400 uppercase tracking-wider leading-none mb-1">Step {Math.min(uiStep + 1, 4)} of 4</p>
                                            <p className="text-sm font-bold leading-tight">{status}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${uiProgress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 bg-slate-50 flex justify-between items-center">
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${uiStep === i ? 'w-8 bg-teal-500' : uiStep > i ? 'bg-teal-200' : 'bg-slate-200'}`}></div>
                        ))}
                    </div>
                    <button onClick={onCancel} className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Cancel Verification</button>
                </div>
            </div>
        </div>
    );
}
