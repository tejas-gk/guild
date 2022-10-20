import { useMultistepForm } from "../hooks/useMultiStepForm";

export default function multistep() {
  const { steps, currentStepIndex, step, back, next, isFirstStep, isLastStep } =
    useMultistepForm([<div>one</div>, <div>two</div>, <div>three</div>]);
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content",
      }}
    >
      <form>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          <input type="text"></input>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          {!isLastStep && (
            <button type="button" onClick={next}>
              Next
            </button>
          )}
          {isLastStep && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}
