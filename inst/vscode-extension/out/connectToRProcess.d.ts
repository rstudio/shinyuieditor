/// <reference types="node" />
import type { ChildProcessWithoutNullStreams } from "child_process";
export declare type ActiveRSession = {
    proc: ChildProcessWithoutNullStreams;
    runCmd: (cmd: string, timeout_ms?: number) => Promise<string[]>;
    stop: () => void;
};
export declare function connectToRProcess({ pathToR, }: {
    pathToR: string;
}): Promise<ActiveRSession | null>;
export declare function escapeDoubleQuotes(cmd: string): string;
//# sourceMappingURL=connectToRProcess.d.ts.map