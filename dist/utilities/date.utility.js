"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayjs = exports.hrTime = exports.getDateTz = exports.getNextWeekday = exports.getPreviousWeekday = exports.isWeekday = exports.sleep = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
exports.dayjs = dayjs_1.default;
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const weekday_1 = __importDefault(require("dayjs/plugin/weekday"));
const parse_utility_1 = require("./parse.utility");
dayjs_1.default.extend(customParseFormat_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(weekday_1.default);
dayjs_1.default.extend(isoWeek_1.default);
const tz = (_a = process.env.APP_ENV_APPLICATION_TIMEZONE) !== null && _a !== void 0 ? _a : 'Asia/Ho_Chi_Minh';
dayjs_1.default.tz.setDefault(tz);
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const isWeekday = (date) => {
    var _a;
    const isoWeekday = (_a = (0, dayjs_1.default)(date)) === null || _a === void 0 ? void 0 : _a.isoWeekday();
    return isoWeekday > 0 && isoWeekday < 6;
};
exports.isWeekday = isWeekday;
const getPreviousWeekday = () => {
    let date = (0, dayjs_1.default)();
    while (!(0, exports.isWeekday)(date)) {
        date = date.subtract(1, 'day');
    }
    return date;
};
exports.getPreviousWeekday = getPreviousWeekday;
const getNextWeekday = () => {
    let date = (0, dayjs_1.default)();
    while (!(0, exports.isWeekday)(date)) {
        date = date.add(1, 'day');
    }
    return date;
};
exports.getNextWeekday = getNextWeekday;
const getDateTz = (opts) => {
    const { date, timezone, useClientTz = false, timeOffset = 0 } = opts;
    return (0, dayjs_1.default)(date).tz(timezone, useClientTz).add(timeOffset, 'hour');
};
exports.getDateTz = getDateTz;
const hrTime = () => {
    const curr = process.hrtime();
    return (0, parse_utility_1.float)(curr[0] + curr[1] / Math.pow(10, 9), 9);
};
exports.hrTime = hrTime;
//# sourceMappingURL=date.utility.js.map