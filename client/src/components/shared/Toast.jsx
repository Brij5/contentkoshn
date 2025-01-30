import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { selectToasts } from '../../store/slices/uiSlice';
import { removeToast } from '../../store/slices/uiSlice';
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiAlertTriangle,
  FiX
} from 'react-icons/fi';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  
  @media (max-width: 768px) {
    left: 1rem;
    right: 1rem;
  }
`;

const ToastItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.successBackground;
      case 'error':
        return theme.errorBackground;
      case 'warning':
        return theme.warningBackground;
      case 'info':
      default:
        return theme.infoBackground;
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      case 'info':
      default:
        return theme.infoColor;
    }
  }};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease forwards;
  
  &.removing {
    animation: ${slideOut} 0.3s ease forwards;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.25rem;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Message = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.3;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.1s linear;
`;

const Toast = () => {
  const dispatch = useDispatch();
  const toasts = useSelector(selectToasts);

  useEffect(() => {
    toasts.forEach(toast => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle />;
      case 'error':
        return <FiAlertCircle />;
      case 'warning':
        return <FiAlertTriangle />;
      case 'info':
      default:
        return <FiInfo />;
    }
  };

  return (
    <ToastContainer>
      {toasts.map(toast => {
        const progress = toast.duration === 0 ? 100 : 
          ((toast.duration - (Date.now() - toast.id)) / toast.duration) * 100;

        return (
          <ToastItem key={toast.id} $type={toast.type}>
            <IconWrapper>
              {getIcon(toast.type)}
            </IconWrapper>
            <Content>
              {toast.title && <Title>{toast.title}</Title>}
              <Message>{toast.message}</Message>
            </Content>
            <CloseButton 
              onClick={() => dispatch(removeToast(toast.id))}
              aria-label="Close notification"
            >
              <FiX />
            </CloseButton>
            {toast.duration > 0 && (
              <ProgressBar $progress={Math.max(0, progress)} />
            )}
          </ToastItem>
        );
      })}
    </ToastContainer>
  );
};

export default Toast; 