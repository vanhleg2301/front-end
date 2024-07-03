import React from "react";
import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "./Player.module.css";
import { Mic, MicOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Player = (props) => {
  const { playerId, url, muted, playing, isActive } = props;
  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: isActive,
        [styles.notPlaying]: !playing,
      })}>
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width='100%'
          height='100%'
        />
      ) : (
        <AccountCircleIcon />
      )}

      {!isActive ? muted ? <MicOff /> : <Mic /> : undefined}
    </div>
  );
};

export default Player;
