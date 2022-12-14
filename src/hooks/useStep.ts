import { useCallback, useMemo, useState } from "react";

interface StepOutput {
    canGoToNextStep: boolean;
    canGoToPreviousStep: boolean;
    nextStep: () => void;
    previousStep: () => void;
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
        console.log(canGoToPreviousStep, 'value');
        if(canGoToPreviousStep) {
            setCurrentStep(step => step - 1);
        }
    }, [canGoToPreviousStep]);

    return [
        currentStep,
        {
            canGoToPreviousStep,
            canGoToNextStep,
            previousStep,
            nextStep
        }
    ]

};

export default useStep; 