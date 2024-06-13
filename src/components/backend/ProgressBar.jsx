import styles from "./ProgressBar.module.css";


  // Definerer komponentet ved navn ProgressBar, som modtager en prop: currentStep.
export default function ProgressBar({ currentStep }) {

  const steps = [1, 2, 3, 4, 5];
    // Opretter et array med trinene i progress baren.

    return (
      <div className="grid grid-cols-gridContent">

        <div className="pt-6 col-start-3 flex items-center justify-center">

          <section className={styles.progressbar_container}>
            {/* Sektion for progress baren med en specifik CSS-klasse */}
            <ul className={styles.steps_container}>
              {/* Ul element for at indeholde trinene i progress baren */}
              {steps.map((step) => (
                // Mapper over steps arrayet og opretter et li element for hvert trin
                <li
                  key={step}
                  className={`${styles.step_item} ${
                    currentStep === step ? styles.current_item : ""
                  }`}
                  // Dynamisk tilføjer CSS-klasser til hvert trin
                >
                  <span className={styles.progress_count}>{step}</span>
                  {/* Span element til at vise trin nummeret */}
                  <span className={styles.step_label}></span>
                  {/* Span element til trin label */}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  }
  