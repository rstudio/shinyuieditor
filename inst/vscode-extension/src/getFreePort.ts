import net from "net";

export async function getFreePort(): Promise<number> {
  return new Promise((res) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const serverAddress = srv.address?.();
      if (typeof serverAddress === "string" || serverAddress === null) {
        throw new Error("Failed to find a free port...");
      }

      srv.close((err) => res(serverAddress.port));
    });
  });
}
