import React from "react";
import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "./Player.module.css";
import { Mic, MicOff, AccountCircle } from "@mui/icons-material";

const Player = ({ playerId, url, muted, playing, isActive }) => {
  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.active]: isActive,
        [styles.notActive]: !isActive,
        [styles.notPlaying]: !playing,
      })}
    >
      <div className={styles.videoWrapper}>
        {playing ? (
          <ReactPlayer
            url={url}
            muted={muted}
            playing={playing}
            width="100%"
            height="100%"
          />
        ) : (
          <AccountCircle className={styles.accountIcon} />
        )}
      </div>
      <div className={styles.playerInfo}>
        <span className={styles.playerName}>Player {playerId}</span>
        {!isActive && (
          <span className={styles.micIcon}>
            {muted ? <MicOff /> : <Mic />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Player;