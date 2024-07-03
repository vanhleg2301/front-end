import React from "react";
import { IconButton } from "@mui/material";
import {
  Mic,
  Videocam,
  CallEnd,
  MicOff,
  VideocamOff,
} from "@mui/icons-material";
import cx from "classnames";

import styles from "./Bottom.module.css";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div className={styles.bottomContainer}>
      <IconButton
        onClick={toggleAudio}
        className={cx(styles.iconButton, { [styles.active]: muted })}
        color={muted ? "secondary" : "default"}>
        {muted ? <MicOff fontSize='large' /> : <Mic fontSize='large' />}
      </IconButton>
      <IconButton
        onClick={toggleVideo}
        className={cx(styles.iconButton, { [styles.active]: !playing })}
        color={playing ? "default" : "secondary"}>
        {playing ? (
          <Videocam fontSize='large' />
        ) : (
          <VideocamOff fontSize='large' />
        )}
      </IconButton>
      <IconButton
        onClick={leaveRoom}
        className={styles.iconButton}
        color='error'>
        <CallEnd fontSize='large' />
      </IconButton>
    </div>
  );
};

export default Bottom;
