import React, { useRef, useEffect, useState } from 'react';

interface AsteroidsGameProps {
  onExit: () => void;
}

const AsteroidsGame: React.FC<AsteroidsGameProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Game variables
    const friction = 0.985;
    const shipThrust = 0.15;
    const rotationSpeed = 0.05;

    let ship = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      angle: 90 / 180 * Math.PI, // Convert to radians
      rotation: 0,
      isThrusting: false,
      velocity: { x: 0, y: 0 },
      shield: false,
      multiShot: false
    };
    let bullets: any[] = [];
    let asteroids: any[] = [];
    let powerups: any[] = [];
    const bulletSpeed = 5;
    const asteroidSpeed = 1;
    const asteroidSize = 30;
    const asteroidVertices = 10;
    let score = 0;
    let lives = 3;
    let level = 1;

    // Colors
    const backgroundColor = '#0d1117';
    const shipColor = '#c9d1d9';
    const bulletColor = '#f85149';
    const asteroidColor = '#87ceeb';
    const textColor = '#c9d1d9';
    const shieldColor = '#90ee90';

    const resetGame = () => {
        setGameOver(false);
        ship.x = canvas.width / 2;
        ship.y = canvas.height / 2;
        ship.velocity = { x: 0, y: 0 };
        ship.shield = false;
        ship.multiShot = false;
        score = 0;
        lives = 3;
        level = 1;
        createAsteroids();
        powerups = [];
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        update();
    }

    const nextLevel = () => {
        level++;
        createAsteroids();
    }

    // Create asteroids
    const createAsteroids = () => {
      asteroids = [];
      for (let i = 0; i < 5 + level * 2; i++) {
        asteroids.push(newAsteroid());
      }
    };

    const newAsteroid = (x?: number, y?: number, radius?: number) => {
      const size = radius || asteroidSize;
      return {
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        radius: size,
        angle: Math.random() * Math.PI * 2,
        vertices: Math.floor(Math.random() * (asteroidVertices + 1) + asteroidVertices / 2),
        velocity: {
          x: Math.random() * asteroidSpeed * (Math.random() < 0.5 ? 1 : -1),
          y: Math.random() * asteroidSpeed * (Math.random() < 0.5 ? 1 : -1)
        }
      };
    };

    createAsteroids();

    const shoot = () => {
        bullets.push({
            x: ship.x + 4 / 3 * ship.radius * Math.cos(ship.angle),
            y: ship.y - 4 / 3 * ship.radius * Math.sin(ship.angle),
            angle: ship.angle,
            velocity: {
              x: ship.velocity.x + bulletSpeed * Math.cos(ship.angle),
              y: ship.velocity.y - bulletSpeed * Math.sin(ship.angle)
            }
          });

        if (ship.multiShot) {
            bullets.push({
                x: ship.x + 4 / 3 * ship.radius * Math.cos(ship.angle - 0.2),
                y: ship.y - 4 / 3 * ship.radius * Math.sin(ship.angle - 0.2),
                angle: ship.angle - 0.2,
                velocity: {
                  x: ship.velocity.x + bulletSpeed * Math.cos(ship.angle - 0.2),
                  y: ship.velocity.y - bulletSpeed * Math.sin(ship.angle - 0.2)
                }
              });
            bullets.push({
                x: ship.x + 4 / 3 * ship.radius * Math.cos(ship.angle + 0.2),
                y: ship.y - 4 / 3 * ship.radius * Math.sin(ship.angle + 0.2),
                angle: ship.angle + 0.2,
                velocity: {
                  x: ship.velocity.x + bulletSpeed * Math.cos(ship.angle + 0.2),
                  y: ship.velocity.y - bulletSpeed * Math.sin(ship.angle + 0.2)
                }
              });
        }
    }

    const createPowerup = (x: number, y: number) => {
        const type = Math.random() > 0.5 ? 'shield' : 'multiShot';
        powerups.push({ x, y, type, radius: 10 });
    }

    // Key handlers
    const handleKeyDown = (e: KeyboardEvent) => {
        if (gameOver) {
            if (e.key.toLowerCase() === 'r') {
                resetGame();
            }
            return;
        }
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          ship.isThrusting = true;
          break;
        case 'a':
        case 'arrowleft':
          ship.rotation = rotationSpeed;
          break;
        case 'd':
        case 'arrowright':
          ship.rotation = -rotationSpeed;
          break;
        case ' ':
          shoot();
          break;
        case 'escape':
          onExit();
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          ship.isThrusting = false;
          break;
        case 'a':
        case 'arrowleft':
        case 'd':
        case 'arrowright':
          ship.rotation = 0;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
        if (gameOver) {
            drawGameOver();
            animationFrameId.current = requestAnimationFrame(update);
            return;
        }

        if (asteroids.length === 0) {
            nextLevel();
        }

      // Ship rotation
      ship.angle += ship.rotation;

      // Apply thrust
      if (ship.isThrusting) {
        ship.velocity.x += shipThrust * Math.cos(ship.angle);
        ship.velocity.y -= shipThrust * Math.sin(ship.angle);
      }

      // Apply friction
      ship.velocity.x *= friction;
      ship.velocity.y *= friction;

      // Move ship
      ship.x += ship.velocity.x;
      ship.y += ship.velocity.y;

      // Bullets
      bullets.forEach((bullet, index) => {
        bullet.x += bullet.velocity.x;
        bullet.y += bullet.velocity.y;
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
          bullets.splice(index, 1);
        }
      });

      // Powerups
      powerups.forEach((powerup, pIndex) => {
        const dist = Math.hypot(ship.x - powerup.x, ship.y - powerup.y);
        if (dist < ship.radius + powerup.radius) {
            if (powerup.type === 'shield') {
                ship.shield = true;
                setTimeout(() => ship.shield = false, 5000);
            } else if (powerup.type === 'multiShot') {
                ship.multiShot = true;
                setTimeout(() => ship.multiShot = false, 5000);
            }
            powerups.splice(pIndex, 1);
        }
      });

      // Asteroids
      asteroids.forEach((asteroid, aIndex) => {
        asteroid.x += asteroid.velocity.x;
        asteroid.y += asteroid.velocity.y;

        // Collision detection
        bullets.forEach((bullet, bIndex) => {
          const dist = Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y);
          if (dist < asteroid.radius) {
            bullets.splice(bIndex, 1);
            if (asteroid.radius > 15) {
              asteroids.push(newAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2));
              asteroids.push(newAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2));
            }
            if (Math.random() < 0.1) {
                createPowerup(asteroid.x, asteroid.y);
            }
            asteroids.splice(aIndex, 1);
            score += 10;
          }
        });

        // Ship collision
        const shipDist = Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y);
        if (shipDist < ship.radius + asteroid.radius) {
            if (ship.shield) {
                ship.shield = false;
                asteroids.splice(aIndex, 1);
                return;
            }
          lives--;
          ship.x = canvas.width / 2;
          ship.y = canvas.height / 2;
          ship.velocity = { x: 0, y: 0 };
          if (lives <= 0) {
            setGameOver(true);
          }
        }

        // Wall collision
        if (asteroid.x < 0 - asteroid.radius) asteroid.x = canvas.width + asteroid.radius;
        if (asteroid.x > canvas.width + asteroid.radius) asteroid.x = 0 - asteroid.radius;
        if (asteroid.y < 0 - asteroid.radius) asteroid.y = canvas.height + asteroid.radius;
        if (asteroid.y > canvas.height + asteroid.radius) asteroid.y = 0 - asteroid.radius;
      });

      // Ship wall collision
      if (ship.x < 0 - ship.radius) ship.x = canvas.width + ship.radius;
      if (ship.x > canvas.width + ship.radius) ship.x = 0 - ship.radius;
      if (ship.y < 0 - ship.radius) ship.y = canvas.height + ship.radius;
      if (ship.y > canvas.height + ship.radius) ship.y = 0 - ship.radius;

      draw();
      animationFrameId.current = requestAnimationFrame(update);
    };

    const drawGameOver = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        ctx.font = '40px "Roboto Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '20px "Roboto Mono", monospace';
        ctx.fillText(`Your score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText("Press 'R' to restart", canvas.width / 2, canvas.height / 2 + 40);
    }

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ship
      ctx.strokeStyle = ship.shield ? shieldColor : shipColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(
        ship.x + 4 / 3 * ship.radius * Math.cos(ship.angle),
        ship.y - 4 / 3 * ship.radius * Math.sin(ship.angle)
      );
      ctx.lineTo(
        ship.x - ship.radius * (2 / 3 * Math.cos(ship.angle) + Math.sin(ship.angle)),
        ship.y + ship.radius * (2 / 3 * Math.sin(ship.angle) - Math.cos(ship.angle))
      );
      ctx.lineTo(
        ship.x - ship.radius * (2 / 3 * Math.cos(ship.angle) - Math.sin(ship.angle)),
        ship.y + ship.radius * (2 / 3 * Math.sin(ship.angle) + Math.cos(ship.angle))
      );
      ctx.closePath();
      ctx.stroke();

      // Bullets
      ctx.fillStyle = bulletColor;
      bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Powerups
      powerups.forEach(powerup => {
        ctx.fillStyle = powerup.type === 'shield' ? shieldColor : 'orange';
        ctx.beginPath();
        ctx.arc(powerup.x, powerup.y, powerup.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Asteroids
      ctx.strokeStyle = asteroidColor;
      ctx.lineWidth = 2;
      asteroids.forEach(asteroid => {
        ctx.beginPath();
        ctx.moveTo(
          asteroid.x + asteroid.radius * Math.cos(asteroid.angle),
          asteroid.y + asteroid.radius * Math.sin(asteroid.angle)
        );
        for (let i = 1; i < asteroid.vertices; i++) {
          ctx.lineTo(
            asteroid.x + asteroid.radius * Math.cos(asteroid.angle + i * Math.PI * 2 / asteroid.vertices),
            asteroid.y + asteroid.radius * Math.sin(asteroid.angle + i * Math.PI * 2 / asteroid.vertices)
          );
        }
        ctx.closePath();
        ctx.stroke();
      });

      // Score and lives
      ctx.fillStyle = textColor;
      ctx.font = '20px "Roboto Mono", monospace';
      ctx.fillText('Score: ' + score, 10, 30);
      ctx.fillText('Lives: ' + lives, canvas.width - 90, 30);
      ctx.fillText('Level: ' + level, canvas.width / 2 - 50, 30);
    };

    update();

    const handleThrustStart = () => ship.isThrusting = true;
    const handleThrustEnd = () => ship.isThrusting = false;
    const handleLeftStart = () => ship.rotation = rotationSpeed;
    const handleLeftEnd = () => ship.rotation = 0;
    const handleRightStart = () => ship.rotation = -rotationSpeed;
    const handleRightEnd = () => ship.rotation = 0;

    const upButton = document.getElementById('up-button');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const shootButton = document.getElementById('shoot-button');

    if (upButton && leftButton && rightButton && shootButton) {
        upButton.addEventListener('touchstart', handleThrustStart);
        upButton.addEventListener('touchend', handleThrustEnd);
        upButton.addEventListener('mousedown', handleThrustStart);
        upButton.addEventListener('mouseup', handleThrustEnd);

        leftButton.addEventListener('touchstart', handleLeftStart);
        leftButton.addEventListener('touchend', handleLeftEnd);
        leftButton.addEventListener('mousedown', handleLeftStart);
        leftButton.addEventListener('mouseup', handleLeftEnd);

        rightButton.addEventListener('touchstart', handleRightStart);
        rightButton.addEventListener('touchend', handleRightEnd);
        rightButton.addEventListener('mousedown', handleRightStart);
        rightButton.addEventListener('mouseup', handleRightEnd);

        shootButton.addEventListener('touchstart', shoot);
        shootButton.addEventListener('mousedown', shoot);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', setCanvasDimensions);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (upButton && leftButton && rightButton && shootButton) {
        upButton.removeEventListener('touchstart', handleThrustStart);
        upButton.removeEventListener('touchend', handleThrustEnd);
        upButton.removeEventListener('mousedown', handleThrustStart);
        upButton.removeEventListener('mouseup', handleThrustEnd);

        leftButton.removeEventListener('touchstart', handleLeftStart);
        leftButton.removeEventListener('touchend', handleLeftEnd);
        leftButton.removeEventListener('mousedown', handleLeftStart);
        leftButton.removeEventListener('mouseup', handleLeftEnd);

        rightButton.removeEventListener('touchstart', handleRightStart);
        rightButton.removeEventListener('touchend', handleRightEnd);
        rightButton.removeEventListener('mousedown', handleRightStart);
        rightButton.removeEventListener('mouseup', handleRightEnd);

        shootButton.removeEventListener('touchstart', shoot);
        shootButton.removeEventListener('mousedown', shoot);
      }
    };
  }, [onExit, gameOver]);

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    color: 'white',
    border: '2px solid #00ff00',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '24px'
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <canvas ref={canvasRef} style={{ display: 'block', background: '#0d1117' }} />
        {isMobile && (
            <>
                <div id="up-button" style={{ ...buttonStyle, left: '90px', bottom: '80px' }}>&#8593;</div>
                <div id="left-button" style={{ ...buttonStyle, left: '20px', bottom: '20px' }}>&#8592;</div>
                <div id="right-button" style={{ ...buttonStyle, left: '160px', bottom: '20px' }}>&#8594;</div>
                <div id="shoot-button" style={{ ...buttonStyle, right: '20px', bottom: '20px' }}>&#9679;</div>
            </>
        )}
    </div>
  );
};

export default AsteroidsGame;
