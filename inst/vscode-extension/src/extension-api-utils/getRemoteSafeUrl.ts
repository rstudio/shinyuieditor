import * as vscode from "vscode";

export async function getRemoteSafeUrl(local_url: string): Promise<string> {
  const local_uri = vscode.Uri.parse(local_url);
  return (await vscode.env.asExternalUri(local_uri)).toString();
}
