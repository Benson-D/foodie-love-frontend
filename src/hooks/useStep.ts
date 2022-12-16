import { useCallback, useMemo, useState } from "react";

interface StepOutput {
    canGoToNextStep: boolean;
    canGoToPreviousStep: boolean;
    nextStep: () => void;
    previousStep: () => void;
    reset: () => void;
    prevSwitchStep: () => void;
    nextSwitchStep: () => void;
}

/**
 * Custom hook to update step motion, multi step form
 * @param {number} maxStep 
 * @returns [number, StepOutput]
 */
function useStep(maxStep: number): [number, StepOutput] {
    const [currentStep, setCurrentStep] = useState(1);

    const canGoToNextStep = useMemo(() => currentStep + 1 < maxStep, 
    [currentStep, maxStep]);

    const canGoToPreviousStep = useMemo(() => currentStep - 1 >= 1,
    [currentStep]);

    const nextStep = useCallback(() => {
        if(canGoToNextStep) {
            setCurrentStep(step => step + 1);
        }
    }, [canGoToNextStep]);

    const previousStep = useCallback(() => {
        if(canGoToPreviousStep) {
            setCurrentStep(step => step - 1);
        }
    }, [canGoToPreviousStep]);

    const setStep = useCallback((step: number): void => {    
        if (!(step >= 1 && step <= maxStep)) {
            throw new Error('Step not valid')
        }
        
        setCurrentStep(step)
    },[maxStep, currentStep]);

    const reset = useCallback(() => {
        setCurrentStep(1)
    }, []);

    const prevSwitchStep = useCallback(() => {
        if (canGoToPreviousStep) {
            setCurrentStep(step => step - 1);
        } else {
            setStep(maxStep - 1);
        }
    }, [maxStep, canGoToPreviousStep])

    const nextSwitchStep = useCallback(() => {
        if (canGoToNextStep) {
            setCurrentStep(step => step + 1);
        } else {
            reset();
        }
    }, [canGoToNextStep])

    return [
        currentStep,
        {
            canGoToPreviousStep,
            canGoToNextStep,
            previousStep,
            nextStep,
            reset,
            prevSwitchStep,
            nextSwitchStep
        }
    ]

};

export default useStep; 