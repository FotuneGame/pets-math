import { useState, useEffect } from 'react';

export const useMove = (initialPosition = { x: 0, y: 0 }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    
    setPosition(prev => ({
      x: prev.x + dx * 0.1, // Коэффициент чувствительности
      y: prev.y - dy * 0.1  // Инвертируем Y
    }));
    
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    position,
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
    resetPosition: () => setPosition({ x: 0, y: 0 })
  };
};