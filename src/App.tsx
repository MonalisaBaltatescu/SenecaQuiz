import { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';

const App = () => {
  const [canStartQuiz, setCanStartQuiz] = useState<boolean>(false);

  return (
    <div className="App">
      {!canStartQuiz && <Welcome startQuiz={() => setCanStartQuiz(true)} />}
      {canStartQuiz && <Quiz />}
    </div>
  );
};

export default App;
