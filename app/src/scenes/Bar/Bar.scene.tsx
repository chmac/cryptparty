import React from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Bar: React.FC<Props> = (props: Props) => {
  // const { classes } = props;

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" component="h1" color="inherit">
          Zero Knowledge Party
          <Typography variant="h6" component="h2" color="inherit">
            <Box fontSize="0.8em">Encrypted parties since 2020</Box>
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

type Props = WithStyles<typeof styles>;

export default withStyles(styles)(Bar);
