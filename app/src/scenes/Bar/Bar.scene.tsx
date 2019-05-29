import React from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Bar: React.FC<Props> = (props: Props) => {
  const { classes } = props;

  return (
    <AppBar position="static" color="default">
      {/* <Toolbar> */}
      <Box className={classes.inner}>
        <Typography variant="h6" component="h1" color="inherit">
          Zero Knowledge Party
        </Typography>
        <Typography variant="h6" component="h2" color="inherit">
          <Box fontSize="0.8em">Encrypted parties since 2020</Box>
        </Typography>
      </Box>
      {/* </Toolbar> */}
    </AppBar>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    inner: {
      ...theme.mixins.gutters()
    }
  });

type Props = WithStyles<typeof styles>;

export default withStyles(styles)(Bar);
