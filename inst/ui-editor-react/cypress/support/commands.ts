/// <reference types="cypress" />
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";
import "@4tw/cypress-drag-drop";

addMatchImageSnapshotCommand({
  failureThreshold: 0.0,
  failureThresholdType: "percent",
  customDiffConfig: { threshold: 0.0 },
  capture: "viewport",
});
