import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const QuizPreview = ({ questions }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const checkAnswer = (question, answer) => {
    if (question.type === 'open') {
      return question.correctAnswer.toLowerCase() === answer.toLowerCase();
    } else if (question.type === 'truefalse') {
      return question.options.some(option => option.isCorrect && option.text.toLowerCase() === answer.toLowerCase());
    } else if (question.type === 'multiple') {
      return question.options.some((option, index) => option.isCorrect && index.toString() === answer);
    }
    return false;
  };

  return (
    <div>
      <h2>Vista Previa del Quiz</h2>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex}>
          <h3>{q.question}</h3>
          {q.type === 'multiple' && (
            <ul>
              {q.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    onChange={() => handleAnswerChange(questionIndex, optionIndex.toString())}
                    checked={answers[questionIndex] === optionIndex.toString()}
                  />
                  {option.text}
                </li>
              ))}
            </ul>
          )}
          {q.type === 'truefalse' && (
            <ul>
              <li>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  onChange={() => handleAnswerChange(questionIndex, 'verdadero')}
                  checked={answers[questionIndex] === 'verdadero'}
                />
                Verdadero
              </li>
              <li>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  onChange={() => handleAnswerChange(questionIndex, 'falso')}
                  checked={answers[questionIndex] === 'falso'}
                />
                Falso
              </li>
            </ul>
          )}
          {q.type === 'open' && (
            <div>
              <Input
                type="text"
                value={answers[questionIndex] || ''}
                onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <Button onClick={handleSubmit}>Enviar Respuestas</Button>
      {showResults && (
        <div>
          <h2>Resultados</h2>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex}>
              <h3>{q.question}</h3>
              {q.type === 'multiple' && (
                <ul>
                  {q.options.map((option, optionIndex) => (
                    <li key={optionIndex} style={{ color: option.isCorrect ? 'green' : 'red' }}>
                      {option.text}
                    </li>
                  ))}
                </ul>
              )}
              {q.type === 'truefalse' && (
                <ul>
                  <li style={{ color: q.options[0].isCorrect ? 'green' : 'red' }}>Verdadero</li>
                  <li style={{ color: q.options[1].isCorrect ? 'green' : 'red' }}>Falso</li>
                </ul>
              )}
              <p>
                Tu respuesta: {q.type === 'open' ? answers[questionIndex] : answers[questionIndex] === 'verdadero' ? 'Verdadero' : 'Falso'}
              </p>
              <p style={{ color: checkAnswer(q, answers[questionIndex]) ? 'green' : 'red' }}>
                {checkAnswer(q, answers[questionIndex]) ? 'Correcto' : 'Incorrecto'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPreview;
