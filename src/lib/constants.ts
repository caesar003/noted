import * as path from "path";
import * as os from "os";


const CONFIG_DIR = path.join(os.homedir(), ".config", "noted");
const VERSION = "1.0.0";

export { CONFIG_DIR, VERSION };
