import React, { useState } from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px; /* Ajusta el ancho máximo según sea necesario */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StyledLabel = styled(Label)`
  font-size: 1.2em;
  margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 8px;
  font-size: 1em;
  margin-bottom: 16px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 1em;
  margin-bottom: 16px;
`;

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('multiple');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = { question, type, options: [], correctAnswer: '' };

    if (type === 'multiple') {
      questionData.options = options.map((option, index) => ({
        text: option,
        isCorrect: index.toString() === correctAnswer,
      }));
    } else if (type === 'truefalse') {
      questionData.options = [
        { text: 'Verdadero', isCorrect: correctAnswer === 'true' },
        { text: 'Falso', isCorrect: correctAnswer === 'false' },
      ];
    } else if (type === 'open') {
      questionData.correctAnswer = correctAnswer;
    }

    onAddQuestion(questionData);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledLabel>Pregunta:</StyledLabel>
      <StyledInput type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <StyledLabel>Tipo:</StyledLabel>
      <StyledSelect value={type} onChange={(e) => setType(e.target.value)}>
        <option value="multiple">Opción Múltiple</option>
        <option value="truefalse">Falso/Verdadero</option>
        <option value="open">Pregunta Abierta</option>
      </StyledSelect>
      {type === 'multiple' && options.map((option, index) => (
        <div key={index}>
          <StyledLabel>Opción {index + 1}:</StyledLabel>
          <StyledInput
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}
      {type === 'multiple' && (
        <div>
          <StyledLabel>Respuesta Correcta (índice):</StyledLabel>
          <StyledInput
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
      )}
      {type === 'truefalse' && (
        <div>
          <StyledLabel>Respuesta Correcta:</StyledLabel>
          <StyledSelect value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="true">Verdadero</option>
            <option value="false">Falso</option>
          </StyledSelect>
        </div>
      )}
      {type === 'open' && (
        <div>
          <StyledLabel>Respuesta Correcta:</StyledLabel>
          <StyledInput
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
      )}
      <Button type="submit">Agregar Pregunta</Button>
    </FormContainer>
  );
};

export default QuestionForm;
