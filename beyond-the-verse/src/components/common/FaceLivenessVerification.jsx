import React, { useRef, useEffect, useState } from 'react';
import * as FaceMeshLib from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';

export default function FaceLivenessVerification({ onVerify, onCancel }) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState('Initializing AI...');
    const [step, setStep] = useState(0); 
    const [progress, setStepProgress] = useState(0);
    const [error, setError] = useState(null);

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
                // 1. Identify Constructor
                const FaceMeshConstructor = FaceMeshLib.FaceMesh || (window && window.FaceMesh);
                
                if (!FaceMeshConstructor) {
                    console.error("MediaPipe FaceMesh not found in library or window");
                    setError("AI Library failed to load. Please refresh the page.");
                    return;
                }

                // 2. Initialize FaceMesh
                faceMesh = new FaceMeshConstructor({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633503008/${file}`;
                    },
                });

                faceMesh.setOptions({
                    maxNumFaces: 1,
                    refineLandmarks: true,
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5,
                });

                faceMesh.onResults((results) => {
                    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
                        setStatus('No face detected');
                        setStepProgress(0);
                        return;
                    }
                    analyzeFace(results.multiFaceLandmarks[0]);
                });

                // 3. Initialize Camera
                if (videoRef.current) {
                    const cameraInstance = new cam.Camera(videoRef.current, {
                        onFrame: async () => {
                            if (faceMesh) {
                                try {
                                    await faceMesh.send({ image: videoRef.current });
                                } catch (e) {
                                    console.error("FaceMesh send error:", e);
                                }
                            }
                        },
                        width: 640,
                        height: 480,
                    });
                    
                    camera = cameraInstance;
                    await camera.start();
                    console.log("✅ Camera and AI started successfully");
                }
            } catch (err) {
                console.error("🚨 AI Setup Error:", err);
                setError(`Identity scanner error: ${err.message || "Unknown error"}`);
            }
        };

        initAI();

        return () => {
            if (camera) camera.stop();
            if (faceMesh) faceMesh.close();
        };
    }, []);

    const analyzeFace = (landmarks) => {
        // Simple logic for head position and blinking
        const nose = landmarks[1];
        const leftEyeTop = landmarks[159];
        const leftEyeBot = landmarks[145];
        const rightEyeTop = landmarks[386];
        const rightEyeBot = landmarks[374];

        // 1. Eye Aspect Ratio (EAR) for blinking
        const leftEAR = Math.abs(leftEyeTop.y - leftEyeBot.y);
        const rightEAR = Math.abs(rightEyeTop.y - rightEyeBot.y);
        const isBlinking = leftEAR < 0.015 && rightEAR < 0.015;

        // 2. Head Rotation (Normalized coordinates)
        const noseX = nose.x;

        if (step === 0) { // Center
            if (noseX > 0.45 && noseX < 0.55) {
                setStatus('Face Centered');
                setStepProgress(prev => Math.min(prev + 5, 100));
                if (progress >= 100) moveNextStep();
            } else {
                setStatus('Please center your face');
                setStepProgress(0);
            }
        } else if (step === 1) { // Blink
            setStatus('Blink now...');
            if (isBlinking) {
                setStepProgress(100);
                moveNextStep();
            }
        } else if (step === 2) { // Left
            setStatus('Looking left...');
            if (noseX < 0.4) {
                setStepProgress(prev => Math.min(prev + 10, 100));
                if (progress >= 100) moveNextStep();
            }
        } else if (step === 3) { // Right
            setStatus('Looking right...');
            if (noseX > 0.6) {
                setStepProgress(prev => Math.min(prev + 10, 100));
                if (progress >= 100) {
                    setStatus('Verification Complete!');
                    setStep(4);
                    setTimeout(() => onVerify(), 1000);
                }
            }
        }
    };

    const moveNextStep = () => {
        setStep(prev => prev + 1);
        setStepProgress(0);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-scale-in">
                
                {/* Header */}
                <div className="p-6 text-center border-b border-slate-100">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Live AI Secure</span>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Identity Verification</h2>
                </div>

                {/* Camera Container */}
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
                            
                            {/* Overlay UI */}
                            <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 flex items-center justify-center">
                                {/* Face Frame */}
                                <div className="w-64 h-80 border-2 border-white/50 rounded-[4rem] relative">
                                    <div className={`absolute inset-0 border-4 border-teal-500 rounded-[4rem] transition-opacity duration-300 ${status.includes('No face') ? 'opacity-0' : 'opacity-100'}`} style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}></div>
                                </div>
                            </div>

                            {/* Floating Instruction */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                                <div className="bg-slate-900/80 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm shrink-0">
                                            <i className={`fa-solid ${steps[Math.min(step, 3)].icon}`}></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-teal-400 uppercase tracking-wider leading-none mb-1">Step {Math.min(step + 1, 4)} of 4</p>
                                            <p className="text-sm font-bold leading-tight">{status}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Small Progress Bar */}
                                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Step Indicators */}
                <div className="p-6 bg-slate-50 flex justify-between items-center">
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-teal-500' : step > i ? 'bg-teal-200' : 'bg-slate-200'}`}></div>
                        ))}
                    </div>
                    <button onClick={onCancel} className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Cancel Verification</button>
                </div>
            </div>
        </div>
    );
}
