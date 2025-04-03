import styled, { css, keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const animation = () => css`
  ${blink} 1.5s infinite ease-in-out;
`;

export const LoaderWrapper = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
});

export const DotsContainer = styled.div({
  display: 'flex',
  gap: '15px',
});

export const LoaderDot = styled.div({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: 'white',
  animation: `${animation}`,
  '&:nth-of-type(1)': {
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    animationDelay: '0.2s',
  },
  '&:nth-of-type(3)': {
    animationDelay: '0.4s',
  },
});
