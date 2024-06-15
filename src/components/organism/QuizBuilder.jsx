import React, { useState } from 'react';
import QuestionForm from '../molecules/QuestionForm';
import QuizPreview from '../molecules/QuizPreview';
import Button from '../atoms/Button';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 3em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const QuizBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div>
      <StyledTitle>Quiz Interactivo</StyledTitle>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <ButtonContainer>
        <Button onClick={() => setShowPreview(!showPreview)}>Mostrar Vista Previa</Button>
      </ButtonContainer>
      {showPreview && <QuizPreview questions={questions} />}
    </div>
  );
};

export default QuizBuilder;
