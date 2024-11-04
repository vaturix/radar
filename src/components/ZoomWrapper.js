"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../app/RadarChart.module.css";

const ZoomWrapper = ({ children }) => {
  return (
    <TransformWrapper
      options={{
        limitToBounds: false,
        minScale: 0.01,
        maxScale: 100,
        centerContent: true,
      }}
      pan={{
        lockAxisX: false,
        lockAxisY: false,
        velocityEqualToMove: true,
      }}
      pinch={{ disabled: false }}
      wheel={{
        wheelEnabled: true,
        touchPadEnabled: true,
        step: 0.01,
      }}
    >
      <TransformComponent>
        <div className="chart-container flex justify-center items-center" style={{ zIndex: 1, width: '100%' }}>
          {children}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ZoomWrapper;
