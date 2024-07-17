import React from "react";
import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "./Player.module.css";
import { Mic, MicOff, AccountCircle } from "@mui/icons-material";

const Player = ({ playerId, url, muted, playing, isSharing, isActive }) => {
  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.active]: isActive,
        [styles.notActive]: !isActive,
        [styles.notPlaying]: !playing,
        [styles.screenShare]: isSharing,
      })}
    >
      <div className={styles.videoWrapper}>
        {playing ? (
          <ReactPlayer
            url={url}
            muted={muted}
            playing={playing}
            
          />
        ) : (
          <AccountCircle className={styles.accountIcon} />
        )}
      </div>
      {/* Conditional rendering for screen sharing info */}
      {isSharing ? (
        <div className={styles.screenShareInfo}>
          <span>Screen sharing</span>
        </div>
      ) : (
        <div className={styles.playerInfo}>
          <span className={styles.playerName}>Player {playerId}</span>
          {/* Show microphone status only if not the active player */}
          {!isActive && (
            <span className={styles.micIcon}>
              {muted ? <MicOff /> : <Mic />}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
