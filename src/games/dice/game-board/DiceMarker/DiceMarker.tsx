"use client";

import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

interface DiceMarkerProps {
  left: number;
  label: number;
  isWin?: boolean | null;
  isBouncing?: boolean;
  onMoveEnd: () => void;
  onMoveStart: () => void;
  onBounceEnd: () => void;
}

const bounce = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

export const DiceMarker: FC<DiceMarkerProps> = ({
  left,
  label,
  isWin,
  isBouncing,
  onMoveEnd,
  onMoveStart,
  onBounceEnd,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "100%",
        left: `${left}%`,
        transform: "translateX(-50%) translateY(-10px)",
        height: { xs: 60, md: 90 },
        width: { xs: 60, md: 90 },
        transition: "left 260ms ease-out",
      }}
      onTransitionStart={onMoveStart}
      onTransitionEnd={onMoveEnd}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          animation: isBouncing ? `${bounce} 550ms ease-out` : "none",
        }}
        onAnimationEnd={onBounceEnd}
      >
        <Box
          component="img"
          src="/dice.webp"
          alt="dice"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 700,
            fontSize: { xs: 16, md: 24 },
            color:
              isWin === null
                ? "#000"
                : isWin
                ? "success.light"
                : "warning.light",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};
