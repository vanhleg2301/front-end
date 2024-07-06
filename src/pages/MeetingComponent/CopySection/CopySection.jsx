import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import styles from "./CopySection.module.css";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

const CopySection = (props) => {
  const { roomId } = props;

  return (

    <Box>
      <Box className={styles.copyHeading}>Copy Room ID:</Box>
      <hr />
      <Box className={styles.copyDescription}>
        <span>{roomId}</span>
        <CopyToClipboard text={roomId}>
          <ContentCopyIcon className='ml-3 cursor-pointer' />
        </CopyToClipboard>
      </Box>
    </Box>
 
  );
};

export default CopySection;
