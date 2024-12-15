import React from 'react';
import '../css/eyes.css';

// The Eyes component receives the mouse position and the properties of the left and right eyes as props
const Eyes = ({ mousePosition, eyeLeft, eyeRight }) => {
  
  /*
   * The limitMovement function restricts the movement of the pupil within a specified radius.
   * mouseX - The X coordinate of the mouse
   * mouseY - The Y coordinate of the mouse
   * centerX - The X coordinate of the eye's center
   * centerY - The Y coordinate of the eye's center
   * radius - The radius within which the movement is limited
   */
  const limitMovement = (mouseX, mouseY, centerX, centerY, radius) => {
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the mouse position is outside the specified radius, constrain it within the radius
    if (distance > radius) {
      const angle = Math.atan2(dy, dx);
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    }

    // Otherwise, use the mouse position directly
    return { x: mouseX, y: mouseY };
  };

  // Calculate the center coordinates of the left and right eyes
  const centerX = (eyeLeft.x + eyeRight.x + eyeLeft.width) / 2;
  const centerY = (eyeLeft.y + eyeRight.y + eyeLeft.height) / 2;

  // Calculate the constrained position of the pupil
  const pupilPosition = limitMovement(
    mousePosition.x,
    mousePosition.y,
    centerX,
    centerY,
    eyeLeft.radius
  );

  return (
    <>
      {/* Left eye container */}
      <div
        className="eye-container"
        style={{ top: `${eyeLeft.y}px`, left: `${eyeLeft.x}px` }}
      >
        {/* Left pupil */}
        <div
          className="pupil"
          style={{
            transform: `translate(${pupilPosition.x - centerX}px, ${
              pupilPosition.y - centerY
            }px)`,
          }}
        ></div>
      </div>

      {/* Right eye container */}
      <div
        className="eye-container"
        style={{ top: `${eyeRight.y}px`, left: `${eyeRight.x}px` }}
      >
        {/* Right pupil */}
        <div
          className="pupil"
          style={{
            transform: `translate(${pupilPosition.x - centerX}px, ${
              pupilPosition.y - centerY
            }px)`,
          }}
        ></div>
      </div>
    </>
  );
};

export default Eyes;





