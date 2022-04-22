import React from "react";

import { BsChevronDown, BsChevronUp, BsCircleFill } from "react-icons/bs";
import { GrClear } from "react-icons/gr";

import Button from "../Inputs/Button";

import classes from "./LogsViewer.module.css";
import type { AppLogs } from "./useCommunicateWithWebsocket";

export function LogsViewer({
  appLogs,
  clearLogs,
}: {
  appLogs: AppLogs;
  clearLogs: () => void;
}) {
  const { logsExpanded, toggleLogExpansion, unseenLogs } =
    useExpandableLogs(appLogs);
  const noLogs = appLogs.length === 0;

  return (
    <div className={classes.logs} data-expanded={logsExpanded}>
      <button
        className={classes.expandTab}
        title={logsExpanded ? "hide logs" : "show logs"}
        onClick={toggleLogExpansion}
      >
        <BsCircleFill
          className={classes.unseenLogsNotification}
          data-show={unseenLogs}
        />
        App Logs
        {logsExpanded ? <BsChevronDown /> : <BsChevronUp />}
      </button>
      <div className={classes.logsContents}>
        {noLogs ? (
          <p className={classes.noLogsMsg}>No recent logs</p>
        ) : (
          appLogs.map((line, i) => (
            <p className={classes.logLine} key={i}>
              {line}
            </p>
          ))
        )}
        {!noLogs ? (
          <Button
            variant="icon"
            title="clear logs"
            className={classes.clearLogsButton}
            onClick={clearLogs}
          >
            <GrClear />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function useExpandableLogs(appLogs: AppLogs) {
  const [logsExpanded, setLogsExpanded] = React.useState(false);
  const [unseenLogs, setUnseenLogs] = React.useState(false);
  const [logsLastExpanded, setLogsLastExpanded] = React.useState<Date | null>(
    null
  );
  const [logsLastReceived, setLogsLastReceived] = React.useState<Date>(
    new Date()
  );
  const toggleLogExpansion = React.useCallback(() => {
    if (logsExpanded) {
      setLogsExpanded(false);
      setLogsLastExpanded(new Date());
      return;
    }
    setLogsExpanded(true);
    setUnseenLogs(false);
  }, [logsExpanded]);

  React.useEffect(() => {
    setLogsLastReceived(new Date());
  }, [appLogs]);

  React.useEffect(() => {
    if (logsExpanded || appLogs.length === 0) {
      setUnseenLogs(false);
      return;
    }

    if (logsLastExpanded === null || logsLastExpanded < logsLastReceived) {
      setUnseenLogs(true);
      return;
    }
  }, [appLogs.length, logsExpanded, logsLastExpanded, logsLastReceived]);

  return { logsExpanded, toggleLogExpansion, unseenLogs };
}
