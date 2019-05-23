import React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

import { setIsOwner } from "./ManageEvent.state";

const ManageEvent: React.FC<Props> = (props: Props) => {
  const { match, isOwner, setIsOwner } = props;
  const { key, action } = match.params;

  console.log("ManageEvent #T67oQd", props);

  if (!!action && action === "o") {
    debugger;
    setIsOwner(true);
    return <Redirect to={`/m/${key}`} />;
  }

  return (
    <div>
      <p>Some thing coming</p>
      <p>Key is: {key}</p>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isOwner: state.ManageEvent.isOwner
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
    setIsOwner: (isOwner: boolean) => {
      dispatch(setIsOwner(isOwner));
    }
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
interface RouteParams {
  key: string;
  action: string;
}
type Props = StateProps &
  DispatchProps &
  WithStyles &
  RouteComponentProps<RouteParams>;

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      margin: theme.spacing(2, 0)
    },
    buttonGrid: {
      ...theme.mixins.gutters()
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageEvent));
