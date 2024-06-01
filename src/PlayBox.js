import React, { useEffect, useMemo, useRef, useState, forwardRef } from "react";

function PlayBox({ position, isRunning, isPaused }, ref) {
  const object = useMemo(() => {
    return (
      <div
        style={{
          ...position,
          display: isRunning ? "" : "none",
        }}
        className="object"
      />
    );
  }, [position, isRunning, isPaused]);

  return <main ref={ref}>{object}</main>;
}

export default forwardRef(PlayBox);
