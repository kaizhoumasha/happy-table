var currentLevel = "info", isDev = !1, enabledContexts = new Set(["*"]);
try {
	isDev = !1;
} catch {
	isDev = typeof process < "u" && process.env.NODE_ENV === "development";
}
currentLevel = isDev ? "debug" : "warn";
var LOG_LEVELS = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3
};
function shouldLog(r, o) {
	if (LOG_LEVELS[r] < LOG_LEVELS[currentLevel]) return !1;
	if (o && !enabledContexts.has("*")) {
		let e = typeof o == "string" ? o : o.module;
		return Array.from(enabledContexts).some((r) => e.includes(r) || r.includes(e));
	}
	return !0;
}
function formatMessage(e, r, i) {
	let a = (/* @__PURE__ */ new Date()).toISOString().slice(11, 23), o = e.toUpperCase().padEnd(5), s = "";
	if (i) if (typeof i == "string") s = `[${i}]`;
	else {
		let { module: e, operation: r,...a } = i;
		s = `[${e}${r ? `:${r}` : ""}]`, Object.keys(a).length > 0 && (s += ` ${JSON.stringify(a)}`);
	}
	return `${a} ${o} ${s} ${r}`;
}
var ScopedLogger = class e {
	context;
	constructor(e) {
		this.context = e;
	}
	_log(e) {
		if (!shouldLog(e, this.context)) return (...e) => {};
		let r = (/* @__PURE__ */ new Date()).toISOString().slice(11, 23), i = e.toUpperCase().padEnd(5), a = "";
		if (this.context) if (typeof this.context == "string") a = `[${this.context}]`;
		else {
			let { module: e, operation: r } = this.context;
			a = `[${e}${r ? `:${r}` : ""}]`;
		}
		let s = `${r} ${i} ${a}`;
		return console[e].bind(console, s);
	}
	get debug() {
		return this._log("debug");
	}
	get info() {
		return this._log("info");
	}
	get warn() {
		return this._log("warn");
	}
	get error() {
		return this._log("error");
	}
	format(e, r) {
		return shouldLog(e, this.context) ? formatMessage(e, r, this.context) : "";
	}
	enabled(e) {
		return shouldLog(e, this.context);
	}
	operation(r) {
		let i = typeof this.context == "string" ? {
			module: this.context,
			operation: r
		} : {
			...this.context,
			operation: r
		};
		return new e(i);
	}
	time(e) {
		if (!shouldLog("debug", this.context)) return;
		let r = this.context && typeof this.context == "object" ? `[${this.context.module}:${this.context.operation}] ${e}` : e;
		console.time(r);
	}
	timeEnd(e) {
		if (!shouldLog("debug", this.context)) return;
		let r = this.context && typeof this.context == "object" ? `[${this.context.module}:${this.context.operation}] ${e}` : e;
		console.timeEnd(r);
	}
	group(e) {
		shouldLog("debug", this.context) && (this._log("debug")(e), console.groupCollapsed());
	}
	groupEnd() {
		shouldLog("debug", this.context) && console.groupEnd();
	}
	table(e) {
		shouldLog("debug", this.context) && console.table(e);
	}
};
function createLogger(e) {
	return new ScopedLogger(e);
}
export { createLogger as n, ScopedLogger as t };

//# sourceMappingURL=logger-CjSoYuMW.js.map