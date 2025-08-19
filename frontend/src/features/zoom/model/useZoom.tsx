import { useState, useEffect } from 'react';

export const useZoom = (
  initialZoom: number = 1,
  minZoom: number = 0.1,
  maxZoom: number = 100,
  zoomStep: number = 0.1
) => {
  const [zoom, setZoom] = useState<number>(initialZoom);

  // Функция увеличения масштаба
  const zoomOut = () => {
    setZoom(prev => Math.min(prev + zoomStep, maxZoom));
  };

  // Функция уменьшения масштаба
  const zoomIn = () => {
    setZoom(prev => Math.max(prev - zoomStep, minZoom));
  };

  // Функция установки конкретного значения зума
  const setCustomZoom = (value: number) => {
    setZoom(Math.max(minZoom, Math.min(maxZoom, value)));
  };

  // Обработчик колеса мыши для зума
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch(e.key) {
        case "+":
            zoomIn();
            break;
        case "-":
            zoomOut();
            break;
        default:
            return;
    }
  }

  // Добавляем обработчик колеса мыши
  useEffect(() => {
    const element = document;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        element.removeEventListener('wheel', handleWheel);
        element.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, []);

  return {
    zoom,
    zoomIn,
    zoomOut,
    setZoom: setCustomZoom,
  };
};