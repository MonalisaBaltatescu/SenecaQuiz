import styles from "../styles/Welcome.module.scss";
interface IWelcomeProps {
  startQuiz(): void;
}

const Welcome = (props: IWelcomeProps) => {
  return (
    <>
      <p>Are you ready for a challenge?</p>
      <button className={styles.acceptChallange} onClick={() => props.startQuiz()}>Yes</button>
      <button className={styles.acceptChallange} onClick={() => props.startQuiz()}>Why not?!</button>
    </>
  );
};

export default Welcome;