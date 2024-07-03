import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import styles from "./CopySection.module.css";

const CopySection = (props) => {
  const { roomId } = props;

  return (
    <div className={styles.copyContainer}>
      <div className={styles.copyHeading}>Copy Room ID:</div>
      <hr />
      <div className={styles.copyDescription}>
        <span>{roomId}</span>
        <CopyToClipboard text={roomId}>
          <ContentCopyIcon className='ml-3 cursor-pointer' />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;
