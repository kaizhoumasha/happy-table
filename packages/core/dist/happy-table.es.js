import { n as createLogger } from "./logger-CjSoYuMW.js";
import { i as DEFAULT_MIN_COLUMN_WIDTH, n as DEFAULT_COLUMN_WIDTH, r as DEFAULT_MAX_COLUMN_WIDTH, t as columnManagementPlugin } from "./column-management-plugin-DzLf4Rbz.js";
import { c as browserOptimizations, l as initializeBrowserOptimizations, t as BrowserFeatures } from "./browser-optimization-Aw-vm1Jr.js";
import { n as enhancedSortingPlugin, r as sortingPlugin, t as createSortingPlugin } from "./sorting-plugin-DiKduNRw.js";
import { t as filteringPlugin } from "./filtering-plugin-A3EMZfyC.js";
import { t as selectionPlugin } from "./selection-plugin-CoUp6zlZ.js";
import { t as cellEditingPlugin } from "./cell-editing-plugin-D7cHGJs1.js";
import { t as keyboardNavigationPlugin } from "./keyboard-navigation-plugin-zKtMHwcf.js";
import { t as dragDropPlugin } from "./drag-drop-plugin-B91YM0sd.js";
import { Fragment, Teleport, Transition, computed, createApp, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSlots, createStaticVNode, createTextVNode, createVNode, defineComponent, getCurrentInstance, guardReactiveProps, inject, markRaw, mergeProps, nextTick, normalizeClass, normalizeProps, normalizeStyle, onBeforeUnmount, onMounted, onUnmounted, openBlock, provide, reactive, ref, renderList, renderSlot, resolveDynamicComponent, shallowRef, toDisplayString, toRef, unref, useAttrs, useId, vModelCheckbox, vModelDynamic, vModelSelect, vModelText, vShow, watch, withCtx, withDirectives, withKeys, withModifiers } from "vue";
var DEFAULTS = {
	sampleSize: 500,
	enumMaxUnique: 50,
	enumMaxUniqueRatio: .2,
	locale: "en-US"
}, CURRENCY_SYMBOLS = [
	"$",
	"€",
	"£",
	"¥",
	"￥",
	"₩",
	"₹"
];
function isNullish(e) {
	return e == null;
}
function isBooleanLike(e) {
	if (typeof e == "boolean") return !0;
	if (typeof e == "number") return e === 0 || e === 1;
	if (typeof e == "string") {
		let t = e.trim().toLowerCase();
		return t === "true" || t === "false";
	}
	return !1;
}
function isPercentageLike(e) {
	if (typeof e != "string") return !1;
	let t = e.trim();
	if (!t.endsWith("%")) return !1;
	let n = t.slice(0, -1).replace(/[,\s]/g, "");
	return n.length > 0 && !isNaN(Number(n));
}
function isCurrencyLike(e) {
	if (typeof e != "string") return !1;
	let t = e.trim();
	if (!t || !CURRENCY_SYMBOLS.some((e) => t.includes(e))) return !1;
	let n = t.replace(/[\p{Sc},\s]/gu, "");
	return n.length > 0 && !isNaN(Number(n));
}
function isNumberLike(e) {
	if (typeof e == "number") return Number.isFinite(e);
	if (typeof e == "string") {
		let t = e.trim();
		if (!t) return !1;
		let n = t.replace(/,/g, "");
		return n.length > 0 && !isNaN(Number(n));
	}
	return !1;
}
function isISODateString(e) {
	let t = e.trim();
	return /^\d{4}-\d{2}-\d{2}$/.test(t) ? {
		isDate: !0,
		isDateTime: !1
	} : /^\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}(:\d{2})?/.test(t) ? {
		isDate: !1,
		isDateTime: !0
	} : {
		isDate: !1,
		isDateTime: !1
	};
}
function isDateLike(e) {
	if (e instanceof Date && !isNaN(e.getTime())) return "datetime";
	if (typeof e == "string") {
		let { isDate: t, isDateTime: n } = isISODateString(e);
		if (t || n) return t ? "date" : "datetime";
		let r = detectLocaleDate(e);
		if (r !== "none") return r;
		let i = new Date(e);
		if (!isNaN(i.getTime())) {
			let t = e.toLowerCase();
			return t.includes("t") || /\d{2}:\d{2}/.test(t) ? "datetime" : "date";
		}
	}
	return "none";
}
function detectLocaleDate(e, t) {
	let n = e.trim();
	if (!n) return "none";
	if (/^(\d{4})年(\d{1,2})月(\d{1,2})日(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?$/.test(n)) return n.includes(":") ? "datetime" : "date";
	if (/^(\d{4})[/.](\d{1,2})[/.](\d{1,2})(?:[ T]\d{1,2}:\d{2}(?::\d{2})?)?$/.test(n)) return /\d{1,2}:\d{2}/.test(n) ? "datetime" : "date";
	let r = n.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})(?:[ T]\d{1,2}:\d{2}(?::\d{2})?)?$/);
	if (r) {
		let e = parseInt(r[1], 10), i = parseInt(r[2], 10), a = parseInt(r[3], 10), o = /\d{1,2}:\d{2}/.test(n);
		if (e > 12 && i <= 12 || i > 12 && e <= 12) return o ? "datetime" : "date";
		if (t) {
			let e = t.toLowerCase();
			if (e.includes("en-us") || e.includes("en-gb") || e.includes("zh-cn") || e.includes("de") || e.includes("fr") || e.includes("es")) return o ? "datetime" : "date";
		}
		if (a >= 1900 && a <= 2100 && e >= 1 && e <= 31 && i >= 1 && i <= 31) return o ? "datetime" : "date";
	}
	return "none";
}
function inferDataType(e, t = {}) {
	let { sampleSize: n, enumMaxUnique: r, enumMaxUniqueRatio: i } = {
		...DEFAULTS,
		...t
	}, a = [];
	for (let t = 0; t < e.length && a.length < n; t++) a.push(e[t]);
	let o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = /* @__PURE__ */ new Set();
	for (let e of a) {
		if (isNullish(e)) continue;
		if (o++, v.add(String(e)), isBooleanLike(e) && s++, isPercentageLike(e) && l++, isCurrencyLike(e) && u++, typeof e == "object" && e && !(e instanceof Date) && h++, typeof e == "string") {
			g++;
			let t = e;
			(t.includes("\n") || t.includes("\r")) && _++;
			let n = t.trim();
			if (n.startsWith("{") && n.endsWith("}") || n.startsWith("[") && n.endsWith("]")) {
				let e = !1;
				try {
					JSON.parse(n), e = !0;
				} catch {
					e = !1;
				}
				e && h++;
			}
			isNumberLike(e) && c++;
		} else isNumberLike(e) && c++;
		if (typeof e == "string") {
			let t = e.trim();
			if (/^P(?=\d|T)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/i.test(t)) m++;
			else if (/(\d+\s+(years?|months?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?))/i.test(t)) m++;
			else {
				let e = t.match(/^(\d{1,3}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(?:\s*(AM|PM))?$/i);
				if (e) {
					let t = parseInt(e[1], 10), n = parseInt(e[2], 10), r = e[3] ? parseInt(e[3], 10) : 0;
					t >= 24 || n >= 60 || r >= 60 ? m++ : p++;
				}
			}
		}
		let n = typeof e == "string" && detectLocaleDate(e, t.locale) || isDateLike(e);
		n === "date" && d++, n === "datetime" && f++;
	}
	if (o === 0) return "text";
	let Ro = s / o, y = c / o, b = l / o, x = u / o, S = (d + f) / o, C = p / o, w = m / o, T = h / o, E = g > 0 ? _ / g : 0;
	if (Ro >= .95) return "boolean";
	if (b >= .9) return "percentage";
	if (x >= .9) return "currency";
	if (T >= .9) return "json";
	if (S >= .9) return f / (d + f) >= .2 ? "datetime" : "date";
	if (C >= .9) return "time";
	if (w >= .9) return "interval";
	if (y >= .95) return "number";
	let D = v.size, O = D / o;
	return D > 0 && D <= r && O <= i && o >= 10 ? "enum" : E >= .3 ? "multiline" : "text";
}
function inferDataTypeForColumn(e, t, n = {}) {
	if (t.options && Array.isArray(t.options)) return "enum";
	let r = [], i = t.field, { sampleSize: a = DEFAULTS.sampleSize } = n;
	for (let t = 0; t < e.length && r.length < a; t++) r.push(e[t]?.[i]);
	let o = n.locale || t.locale;
	return inferDataType(r, {
		...n,
		locale: o
	});
}
var CorePluginRegistry = class {
	logger = createLogger("CorePluginRegistry");
	plugins = /* @__PURE__ */ new Map();
	loadOrder = [];
	extensions = /* @__PURE__ */ new Map();
	api;
	constructor(e) {
		this.api = e;
	}
	async register(e) {
		try {
			if (!e.name || typeof e.install != "function") throw Error("Invalid plugin: missing name or install function");
			if (this.plugins.has(e.name)) throw Error(`Plugin '${e.name}' is already registered`);
			return this.plugins.set(e.name, e), await this.installPlugin(e), this.loadOrder.push(e.name), { success: !0 };
		} catch (t) {
			let n = {
				type: "installation",
				message: t instanceof Error ? t.message : "Unknown error",
				name: t instanceof Error ? t.name : "PluginInstallationError",
				timestamp: Date.now(),
				stack: t instanceof Error ? t.stack : void 0
			};
			return this.notifyExtensions("plugin-error", {
				plugin: e.name,
				error: n
			}), {
				success: !1,
				error: n
			};
		}
	}
	async unregister(e) {
		let t = this.plugins.get(e);
		if (!t) return {
			success: !1,
			error: {
				type: "installation",
				message: `Plugin '${e}' not found`,
				name: "PluginNotFoundError",
				timestamp: Date.now()
			}
		};
		try {
			return t.cleanup && await t.cleanup(), this.plugins.delete(e), this.loadOrder = this.loadOrder.filter((t) => t !== e), this.notifyExtensions("plugin-unregistered", { plugin: e }), { success: !0 };
		} catch (e) {
			return {
				success: !1,
				error: {
					type: "installation",
					message: e instanceof Error ? e.message : "Cleanup failed",
					name: e instanceof Error ? e.name : "PluginCleanupError",
					timestamp: Date.now(),
					stack: e instanceof Error ? e.stack : void 0
				}
			};
		}
	}
	get(e) {
		return this.plugins.get(e);
	}
	list() {
		return Array.from(this.plugins.values());
	}
	getLoadOrder() {
		return [...this.loadOrder];
	}
	use(e) {
		return this.extensions.has(e.name) ? (this.logger.warn(`Extension '${e.name}' is already installed`), this) : (this.extensions.set(e.name, e), e.install(this), this);
	}
	unuse(e) {
		let t = this.extensions.get(e);
		return t && (t.uninstall?.(), this.extensions.delete(e)), this;
	}
	getExtension(e) {
		return this.extensions.get(e);
	}
	async installPlugin(e) {
		let t = this.getExtension("capabilities"), n = t ? t.createGetter() : () => void 0;
		await e.install(this.api, n);
	}
	notifyExtensions(e, t) {
		this.extensions.forEach((n) => {
			try {
				"onEvent" in n && typeof n.onEvent == "function" && n.onEvent(e, t);
			} catch (t) {
				this.logger.warn(`Extension '${n.name}' error in event '${e}':`, t);
			}
		});
	}
	async cleanup() {
		let e = [...this.loadOrder].reverse();
		for (let t of e) await this.unregister(t);
		for (let e of this.extensions.values()) e.uninstall?.();
		this.extensions.clear();
	}
}, CapabilityExtension = class {
	name = "capabilities";
	capabilities = /* @__PURE__ */ new Map();
	logger = createLogger("CapabilityExtension");
	install(e) {
		this.initializeDefaultCapabilities();
	}
	uninstall() {
		this.capabilities.clear();
	}
	register(e, t) {
		this.capabilities.set(e, t);
	}
	get(e) {
		return this.capabilities.get(e);
	}
	list() {
		return Array.from(this.capabilities.keys());
	}
	createGetter() {
		return (e) => this.get(e);
	}
	initializeDefaultCapabilities() {
		this.initializeDataPipelineCapability(), this.initializeAsyncTasksCapability(), this.initializeWebSocketCapability(), this.initializeAICapability();
	}
	initializeDataPipelineCapability() {
		let e = /* @__PURE__ */ new Map();
		this.register("data-pipeline", {
			registerDataInterceptor: (t, n) => {
				e.has(t) || e.set(t, []);
				let r = e.get(t), i = r.findIndex((e) => e.name === n.name);
				i === -1 ? (r.push(n), r.sort((e, t) => t.priority - e.priority)) : r[i] = n;
			},
			removeDataInterceptor: (t, n) => {
				let r = e.get(t);
				if (r) {
					let e = r.findIndex((e) => e.name === n);
					e !== -1 && r.splice(e, 1);
				}
			},
			getDataPipeline: () => {
				let t = [];
				for (let [n, r] of e) t.push(...r);
				return t;
			},
			processData: (t, n) => {
				let r = e.get(n);
				if (!r || r.length === 0) return t;
				let i = t;
				for (let e of r) if (e.enabled !== !1) try {
					i = e.transform(i);
				} catch (t) {
					this.logger.error(`Error in interceptor ${e.name}:`, t);
				}
				return i;
			},
			clearPipeline: (t) => {
				t ? e.delete(t) : e.clear();
			}
		});
	}
	initializeAsyncTasksCapability() {
		let e = /* @__PURE__ */ new Map(), t = 0;
		this.register("async-tasks", {
			scheduleAsyncTask: async (n) => {
				let r = `task-${++t}-${Date.now()}`, i = {
					id: r,
					name: n.name,
					status: "pending",
					startTime: Date.now()
				};
				return e.set(r, i), setTimeout(async () => {
					try {
						i.status = "running";
						let e = await n.execute();
						i.status = "completed", i.result = e, i.endTime = Date.now();
					} catch (e) {
						i.status = "failed", i.error = e, i.endTime = Date.now();
					}
				}, n.priority === "high" ? 0 : 10), r;
			},
			cancelTask: (t) => {
				let n = e.get(t);
				return n && (n.status === "pending" || n.status === "running") ? (n.status = "cancelled", n.endTime = Date.now(), !0) : !1;
			},
			getTaskStatus: (t) => e.get(t) || {
				id: t,
				name: "unknown",
				status: "failed",
				error: /* @__PURE__ */ Error("Task not found")
			},
			getAllTasks: () => new Map(e),
			onTaskComplete: () => {},
			onTaskError: () => {},
			clearCompletedTasks: () => {
				for (let [t, n] of e) [
					"completed",
					"failed",
					"cancelled"
				].includes(n.status) && e.delete(t);
			}
		});
	}
	initializeWebSocketCapability() {
		this.register("websocket", {
			connect: async () => ({
				id: `ws-${Date.now()}`,
				url: "",
				readyState: 1,
				send: () => {},
				close: () => {},
				addEventListener: () => {},
				removeEventListener: () => {}
			}),
			disconnect: () => {},
			subscribe: () => () => {},
			unsubscribe: () => {},
			broadcast: () => {},
			getConnection: () => null,
			getConnectionState: () => "disconnected"
		});
	}
	initializeAICapability() {
		this.register("ai", {
			analyzeData: async () => ({
				summary: "Stub analysis",
				patterns: [],
				recommendations: [],
				statistics: {
					totalRecords: 0,
					fields: {}
				},
				confidence: .8
			}),
			detectAnomalies: async () => [],
			suggestOptimizations: async () => [],
			generateSummary: async () => ({
				recordCount: 0,
				fieldSummaries: [],
				insights: [],
				quality: {
					completeness: 1,
					consistency: 1,
					accuracy: 1
				}
			}),
			predictTrends: async (e, t) => ({
				field: t,
				predictions: [],
				trend: "stable",
				accuracy: .75
			}),
			classifyData: async (e, t) => ({
				field: t,
				categories: [],
				confidence: .8
			})
		});
	}
}, ErrorHandlingExtension = class {
	name = "error-handling";
	errors = /* @__PURE__ */ new Map();
	mode = "production";
	onErrorCallback;
	logger = createLogger("ErrorHandlingExtension");
	constructor(e = {}) {
		this.mode = e.mode || "production", this.onErrorCallback = e.onError;
	}
	install(e) {}
	onEvent(e, t) {
		e === "plugin-error" && this.handleError(t.error, t.plugin);
	}
	handleError(e, t) {
		if (this.errors.set(t, e), this.mode === "development") throw this.logger.error(`Plugin error in ${t}:`, e), Error(`Plugin '${t}' failed: ${e.message}`);
		this.logger.warn(`Plugin error in ${t}:`, e.message), this.onErrorCallback?.(e, t);
	}
	getErrors() {
		return new Map(this.errors);
	}
	clearErrors() {
		this.errors.clear();
	}
	async recover(e) {
		return this.errors.delete(e), !0;
	}
}, MonitoringExtension = class {
	name = "monitoring";
	healthData = /* @__PURE__ */ new Map();
	metrics = {
		totalOperations: 0,
		successfulOperations: 0,
		failedOperations: 0,
		averageOperationTime: 0
	};
	install(e) {}
	onEvent(e, t) {
		e === "plugin-error" ? this.recordError(t.plugin) : e === "plugin-unregistered" && this.recordSuccess();
	}
	recordError(e) {
		let t = this.healthData.get(e) || {
			pluginName: e,
			healthy: !0,
			errorCount: 0,
			healthScore: 100,
			recoveryAttempts: 0
		};
		t.errorCount++, t.healthy = t.errorCount < 3, t.healthScore = Math.max(0, 100 - t.errorCount * 20), this.healthData.set(e, t), this.metrics.failedOperations++;
	}
	recordSuccess() {
		this.metrics.successfulOperations++;
	}
	getHealth(e) {
		if (e) return this.healthData.get(e) || {
			pluginName: e,
			healthy: !0,
			errorCount: 0,
			healthScore: 100,
			recoveryAttempts: 0
		};
		let t = Array.from(this.healthData.values()), n = t.filter((e) => e.healthy).length, r = t.length;
		return {
			overallHealth: r > 0 ? n / r * 100 : 100,
			totalPlugins: r,
			healthyPlugins: n,
			criticalIssues: t.filter((e) => e.healthScore < 30).length,
			recommendations: this.generateRecommendations(t)
		};
	}
	generateRecommendations(e) {
		let t = [], n = e.filter((e) => e.healthScore < 30);
		return n.length > 0 && t.push(`${n.length} plugins need immediate attention`), t;
	}
};
function createUnifiedPluginRegistry(e, t = {}) {
	let n = new CorePluginRegistry(e), r = t.mode === "auto" ? process.env.NODE_ENV === "development" ? "development" : "production" : t.mode || "production";
	return t.enableCapabilities !== !1 && n.use(new CapabilityExtension()), t.enableErrorHandling !== !1 && n.use(new ErrorHandlingExtension({
		mode: r,
		onError: t.onError
	})), t.enableMonitoring !== !1 && n.use(new MonitoringExtension()), n;
}
const createPluginRegistry = createUnifiedPluginRegistry;
function useVirtualizer(e) {
	let { count: t, getItemSize: n, overscan: r = 5, enabled: i = ref(!0) } = e, a = ref(null), o = ref({
		height: 0,
		width: 0
	}), s = ref(0), c = [], l = [], u = () => {
		c.length = 0, l.length = 0;
	}, d = (e, t) => {
		let n = c[e];
		c[e] = t, n !== t && (l.length = Math.min(l.length, e));
	}, f = (e) => {
		if (e < 0) return 0;
		let t = c[e];
		if (t !== void 0) return t;
		let r = n(e);
		return d(e, r), r;
	}, p = (e) => {
		if (e < 0) return 0;
		let t = l[e];
		if (t !== void 0) return t;
		let n = e;
		for (; n >= 0 && l[n] === void 0;) n--;
		let r = n >= 0 ? l[n] : 0;
		for (let t = n + 1; t <= e; t++) r += f(t), l[t] = r;
		return l[e];
	}, m = (e) => p(e - 1), h = (e) => p(e);
	watch(t, () => {
		u();
	});
	let g = (e) => {
		let n = t.value;
		if (n === 0) return 0;
		let r = Math.max(0, e), i = 0, a = n - 1, o = n - 1;
		for (; i <= a;) {
			let e = Math.floor((i + a) / 2);
			h(e) > r ? (o = e, a = e - 1) : i = e + 1;
		}
		return o;
	}, _ = (e) => {
		let n = t.value;
		if (n === 0) return 0;
		let r = Math.max(0, e), i = 0, a = n - 1, o = n;
		for (; i <= a;) {
			let e = Math.floor((i + a) / 2);
			m(e) >= r ? (o = e, a = e - 1) : i = e + 1;
		}
		return o;
	}, v = computed(() => t.value === 0 ? 0 : p(t.value - 1)), y = computed(() => {
		let e = t.value;
		if (e === 0) return {
			start: 0,
			end: -1
		};
		if (!i.value || o.value.height === 0) return {
			start: 0,
			end: e - 1
		};
		let n = g(s.value), a = s.value + o.value.height, c = _(a), l = c >= e ? e - 1 : Math.max(n, Math.max(c - 1, n)), u = r;
		E > 2 ? u = Math.min(r * 4, 20) : E > .5 && (u = Math.min(r * 2, 12));
		let d = Math.max(0, n - u), f = Math.min(e - 1, l + u);
		return {
			start: d,
			end: f
		};
	}), b = computed(() => {
		let e = t.value;
		if (e === 0) return [];
		if (!i.value) {
			let t = [];
			for (let n = 0; n < e; n++) {
				let e = m(n), r = f(n);
				t.push({
					index: n,
					start: e,
					size: r,
					end: e + r
				});
			}
			return t;
		}
		let n = [], { start: r, end: a } = y.value;
		if (r < 0 || a < r) return n;
		for (let e = r; e <= a; e++) {
			let t = m(e), r = f(e);
			n.push({
				index: e,
				start: t,
				size: r,
				end: t + r
			});
		}
		return n;
	}), x = computed(() => b.value[0]?.index ?? 0), S = computed(() => b.value[b.value.length - 1]?.index ?? 0), C = null, w = 0, T = 0, E = 0, D = (e) => {
		let t = e.target, n = performance.now(), r = t.scrollTop, i = n - T;
		i > 0 && (E = Math.abs(r - w) / i), w = r, T = n, C && cancelAnimationFrame(C), C = requestAnimationFrame(() => {
			s.value = r, C = null;
		});
	}, O = (e, n = "start") => {
		if (!a.value || !i.value || t.value === 0) return;
		let r = t.value, s = Math.min(Math.max(e, 0), r - 1), c = m(s), l = f(s), u = o.value.height;
		switch (n) {
			case "center":
				c -= (u - l) / 2;
				break;
			case "end":
				c -= u - l;
				break;
			case "start":
			default: break;
		}
		let d = Math.max(0, v.value - u);
		c = Math.max(0, Math.min(c, d)), a.value.scrollTop = c;
	}, k = (e) => {
		o.value = e;
	};
	watch(a, (e, t) => {
		t && t.removeEventListener("scroll", D), e && e.addEventListener("scroll", D, { passive: !0 });
	}, { immediate: !0 }), onUnmounted(() => {
		a.value && a.value.removeEventListener("scroll", D), C && cancelAnimationFrame(C), A && clearTimeout(A), u();
	});
	let A = null;
	return {
		scrollElement: a,
		totalSize: v,
		virtualItems: b,
		startIndex: x,
		endIndex: S,
		scrollToIndex: O,
		setContainerSize: k,
		updateScrollPosition: (e) => {
			s.value = e;
		}
	};
}
function calculateDynamicOverscan(e, t, n = 20) {
	let r = Math.min(Math.abs(t) / 50, 1), i = Math.floor(e + r * (n - e));
	return Math.min(i, n);
}
function useHorizontalVirtualizer(e) {
	let { columns: t, getColumnWidth: n, overscan: r = 3, enabled: i = ref(!0) } = e, a = ref(null), o = ref({
		width: 0,
		height: 0
	}), s = ref(0), c = ref(0), l = ref(0), u = [], d = [], f = () => {
		u.length = 0, d.length = 0;
	}, p = (e, t) => {
		let n = u[e];
		u[e] = t, n !== t && (d.length = Math.min(d.length, e));
	}, m = (e) => {
		if (e < 0) return 0;
		let t = u[e];
		if (t !== void 0) return t;
		let r = n(e);
		return p(e, r), r;
	}, h = (e) => {
		if (e < 0) return 0;
		let t = d[e];
		if (t !== void 0) return t;
		let n = e;
		for (; n >= 0 && d[n] === void 0;) n--;
		let r = n >= 0 ? d[n] : 0;
		for (let t = n + 1; t <= e; t++) r += m(t), d[t] = r;
		return d[e];
	}, g = (e) => h(e - 1), _ = (e) => h(e);
	watch(t, () => {
		f();
	}, { deep: !0 });
	let v = (e) => {
		let n = t.value.length;
		if (n === 0) return 0;
		let r = Math.max(0, e), i = 0, a = n - 1, o = n - 1;
		for (; i <= a;) {
			let e = Math.floor((i + a) / 2);
			_(e) > r ? (o = e, a = e - 1) : i = e + 1;
		}
		return o;
	}, y = (e) => {
		let n = t.value.length;
		if (n === 0) return 0;
		let r = Math.max(0, e), i = 0, a = n - 1, o = n;
		for (; i <= a;) {
			let e = Math.floor((i + a) / 2);
			g(e) >= r ? (o = e, a = e - 1) : i = e + 1;
		}
		return o;
	}, b = computed(() => {
		let e = t.value.length;
		return e === 0 ? 0 : h(e - 1);
	}), x = computed(() => {
		let e = t.value.length;
		if (e === 0) return {
			start: 0,
			end: -1
		};
		if (!i.value || o.value.width === 0) return {
			start: 0,
			end: e - 1
		};
		let n = v(s.value), a = s.value + o.value.width, c = y(a), u = c >= e ? e - 1 : Math.max(n, Math.max(c - 1, n)), d = calculateDynamicOverscan(r, l.value), f = Math.max(0, n - d), p = Math.min(e - 1, u + d);
		return {
			start: f,
			end: p
		};
	}), S = computed(() => {
		let e = t.value.length;
		if (e === 0) return [];
		if (!i.value) {
			let t = [];
			for (let n = 0; n < e; n++) {
				let e = g(n), r = m(n);
				t.push({
					index: n,
					start: e,
					size: r,
					end: e + r
				});
			}
			return t;
		}
		let n = [], { start: r, end: a } = x.value;
		if (r < 0 || a < r) return n;
		for (let e = r; e <= a; e++) {
			let t = g(e), r = m(e);
			n.push({
				index: e,
				start: t,
				size: r,
				end: t + r
			});
		}
		return n;
	}), C = computed(() => S.value[0]?.index ?? 0), w = computed(() => S.value[S.value.length - 1]?.index ?? 0), T = null, E = (e) => {
		let t = e.target;
		T && cancelAnimationFrame(T), T = requestAnimationFrame(() => {
			let e = t.scrollLeft;
			l.value = e - c.value, c.value = e, s.value = e, T = null;
		});
	}, D = (e, n = "start") => {
		if (!a.value || !i.value || t.value.length === 0) return;
		let r = t.value.length, s = Math.min(Math.max(e, 0), r - 1), c = g(s), l = m(s), u = o.value.width;
		switch (n) {
			case "center":
				c -= (u - l) / 2;
				break;
			case "end":
				c -= u - l;
				break;
			case "start":
			default: break;
		}
		let d = Math.max(0, b.value - u);
		c = Math.max(0, Math.min(c, d)), a.value.scrollLeft = c;
	}, O = (e) => {
		o.value = e;
	};
	watch(a, (e, t) => {
		t && t.removeEventListener("scroll", E), e && e.addEventListener("scroll", E, { passive: !0 });
	}, { immediate: !0 }), onUnmounted(() => {
		a.value && a.value.removeEventListener("scroll", E), T && cancelAnimationFrame(T), k && clearTimeout(k), f();
	});
	let k = null;
	return {
		scrollElement: a,
		totalWidth: b,
		virtualColumns: S,
		startIndex: C,
		endIndex: w,
		scrollToColumn: D,
		setContainerSize: O,
		updateScrollPosition: (e) => {
			s.value = e;
		}
	};
}
function useAdvancedVirtualizer(e) {
	let { count: t, getItemSize: n, overscanCount: r = 5, enableDynamicOverscan: i = !0, scrollingDelay: a = 150, itemKey: o = (e) => e, enabled: s = ref(!0) } = e, c = ref(null), l = ref({
		height: 0,
		width: 0
	}), u = ref(0), d = ref(0), f = ref(!1), p = ref(0), m = ref({
		scrollVelocity: 0,
		renderTime: 0,
		visibleItems: 0,
		totalHeight: 0,
		lastUpdateTime: 0
	}), h = 0, g = 0, _ = null, v = (e) => {
		let t = e.target, n = performance.now(), r = t.scrollTop;
		u.value = r, d.value = t.scrollLeft;
		let i = n - h, o = Math.abs(r - g);
		i > 0 && (p.value = o / i, m.value.scrollVelocity = p.value), h = n, g = r, f.value = !0, _ && clearTimeout(_), _ = window.setTimeout(() => {
			f.value = !1, p.value = 0;
		}, a);
	};
	class y {
		cache = /* @__PURE__ */ new Map();
		accessOrder = [];
		maxSize = 1e3;
		get(e) {
			if (this.cache.has(e)) {
				let t = this.accessOrder.indexOf(e);
				return t > -1 && this.accessOrder.splice(t, 1), this.accessOrder.push(e), this.cache.get(e);
			}
		}
		set(e, t) {
			if (this.cache.has(e)) {
				this.cache.set(e, t);
				return;
			}
			if (this.cache.size >= this.maxSize) {
				let e = this.accessOrder.shift();
				e !== void 0 && this.cache.delete(e);
			}
			this.cache.set(e, t), this.accessOrder.push(e);
		}
		clear() {
			this.cache.clear(), this.accessOrder = [];
		}
	}
	let b = new y(), x = (e) => {
		let t = b.get(e);
		return t === void 0 && (t = n(e), b.set(e, t)), t;
	}, S = () => {
		if (!i) return r;
		let e = Math.min(p.value / 10, 3);
		return Math.ceil(r * (1 + e));
	}, C = computed(() => {
		if (!s.value || t.value === 0) return 0;
		let e = performance.now(), n = 0;
		for (let e = 0; e < t.value; e++) n += x(e);
		return m.value.renderTime = performance.now() - e, m.value.totalHeight = n, n;
	}), w = computed(() => {
		if (!s.value || t.value === 0 || l.value.height === 0) return {
			start: 0,
			end: t.value - 1
		};
		let e = l.value.height, n = u.value, r = 0, i = t.value - 1;
		for (; r <= i;) {
			let e = Math.floor((r + i) / 2), t = 0;
			for (let n = 0; n <= e; n++) t += x(n);
			t <= n ? r = e + 1 : i = e - 1;
		}
		let a = Math.max(0, r - 1), o = 0, c = a;
		for (let n = a; n < t.value; n++) {
			if (o += x(n), o >= e) {
				c = n;
				break;
			}
			c = n;
		}
		let d = S(), f = Math.max(0, a - d), p = Math.min(t.value - 1, c + d);
		return {
			start: f,
			end: p
		};
	}), T = computed(() => {
		let e = performance.now();
		if (!s.value || t.value === 0) {
			let e = [], n = 0;
			for (let r = 0; r < t.value; r++) {
				let t = x(r);
				e.push({
					index: r,
					start: n,
					size: t,
					end: n + t,
					key: o(r)
				}), n += t;
			}
			return m.value.visibleItems = e.length, e;
		}
		let n = [], { start: r, end: i } = w.value, a = 0;
		for (let e = 0; e < r; e++) a += x(e);
		for (let e = r; e <= i; e++) {
			let t = x(e);
			n.push({
				index: e,
				start: a,
				size: t,
				end: a + t,
				key: o(e)
			}), a += t;
		}
		return m.value.visibleItems = n.length, m.value.renderTime = performance.now() - e, m.value.lastUpdateTime = performance.now(), n;
	}), E = computed(() => T.value[0]?.index ?? 0), D = computed(() => T.value[T.value.length - 1]?.index ?? 0);
	return watch(c, (e, t) => {
		t && t.removeEventListener("scroll", v), e && e.addEventListener("scroll", v, { passive: !0 });
	}, { immediate: !0 }), watch(t, () => {
		b.clear();
	}), onUnmounted(() => {
		c.value && c.value.removeEventListener("scroll", v), _ && clearTimeout(_), b.clear();
	}), {
		scrollElement: c,
		totalSize: C,
		virtualItems: T,
		startIndex: E,
		endIndex: D,
		isScrolling: computed(() => f.value),
		metrics: computed(() => m.value),
		scrollToIndex: (e, t = "start") => {
			if (!c.value || !s.value) return;
			let n = 0;
			for (let t = 0; t < e; t++) n += x(t);
			let r = x(e), i = l.value.height;
			switch (t) {
				case "center":
					n -= (i - r) / 2;
					break;
				case "end":
					n -= i - r;
					break;
				case "start":
				default: break;
			}
			n = Math.max(0, Math.min(n, C.value - i)), c.value.scrollTo({
				top: n,
				behavior: "smooth"
			});
		},
		scrollToOffset: (e) => {
			c.value && c.value.scrollTo({
				top: e,
				behavior: "smooth"
			});
		},
		setContainerSize: (e) => {
			l.value = e;
		}
	};
}
function useThreePaneVirtualizer(e) {
	let { paneConfig: t, rowCount: n, getRowSize: r, containerSize: i, rowData: a, overscan: o = {
		rows: 5,
		columns: 3
	} } = e, s = ref(0), c = ref(0), l = useVirtualizer({
		count: n,
		getItemSize: r,
		overscan: o.rows || 8,
		enabled: computed(() => n.value > 50)
	}), u = /* @__PURE__ */ new Map(), d = (e) => {
		let t = e.id;
		if (u.has(t)) return u.get(t);
		let n = e.width ?? 150;
		return u.set(t, n), n;
	};
	watch(() => t.value.center.columns, () => {
		u.clear();
	}, { deep: !0 });
	let f = computed(() => t.value.center.columns.reduce((e, t) => e + d(t), 0)), p = computed(() => {
		let e = t.value.center.columns, n = i.value.width, r = t.value.left.width, a = t.value.right.width, c = n - r - a;
		if (e.length === 0 || c <= 0) return {
			start: 0,
			end: -1
		};
		let l = 0, u = 0;
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (!n) continue;
			let r = d(n);
			if (u + r > s.value) {
				l = t;
				break;
			}
			u += r;
		}
		let f = l, p = 0;
		for (let t = l; t < e.length; t++) {
			let n = e[t];
			if (!n) continue;
			let r = d(n);
			if (p += r, f = t, p >= c) break;
		}
		let m = Math.max(0, l - (o.columns || 3)), h = Math.min(e.length - 1, f + (o.columns || 3));
		return {
			start: m,
			end: h
		};
	}), m = computed(() => {
		let e = t.value.center.columns, { start: n, end: r } = p.value;
		if (n > r) return [];
		let i = [], a = 0;
		for (let t = 0; t < n; t++) {
			let n = e[t];
			n && (a += d(n));
		}
		for (let t = n; t <= r; t++) {
			let n = e[t];
			if (!n) continue;
			let r = d(n);
			i.push({
				index: t,
				start: a,
				size: r,
				end: a + r,
				column: n
			}), a += r;
		}
		return i;
	}), h = computed(() => ({
		columns: t.value.left.columns,
		rows: l.virtualItems.value,
		width: t.value.left.width
	})), g = computed(() => ({
		columns: t.value.right.columns,
		rows: l.virtualItems.value,
		width: t.value.right.width
	})), _ = computed(() => {
		let e = m.value, n = l.virtualItems.value, r = a.value, i = [];
		for (let t of n) {
			let n = t.index, a = r[n], o = [];
			for (let t of e) {
				let e = t.index, r = t.column;
				o.push({
					rowIndex: n,
					columnIndex: e,
					column: r,
					value: a?.[r.field],
					rowData: a || {}
				});
			}
			i.push(o);
		}
		return {
			virtualColumns: e,
			virtualRows: n,
			virtualCells: i,
			width: t.value.center.width,
			totalWidth: f.value
		};
	}), v = computed(() => s.value), y = computed(() => ({
		width: f.value,
		height: l.totalSize.value
	})), b = (e, n) => {
		l.scrollToIndex(e, "start");
		let r = t.value.center.columns;
		n >= 0 && n < r.length && x(n, "start");
	}, x = (e, n = "start") => {
		let r = t.value.center.columns;
		if (e < 0 || e >= r.length) return;
		let a = i.value.width, o = t.value.left.width, c = t.value.right.width, l = a - o - c, u = 0;
		for (let t = 0; t < e; t++) {
			let e = r[t];
			e && (u += d(e));
		}
		let p = r[e];
		if (!p) return;
		let m = d(p);
		switch (n) {
			case "center":
				u -= (l - m) / 2;
				break;
			case "end":
				u -= l - m;
				break;
			case "start":
			default: break;
		}
		let h = Math.max(0, f.value - l);
		u = Math.max(0, Math.min(u, h)), s.value = u;
	};
	return watch(i, (e) => {
		l.setContainerSize(e);
	}, { immediate: !0 }), onUnmounted(() => {
		u.clear();
	}), {
		leftPane: h,
		centerPane: _,
		rightPane: g,
		scrollToCell: b,
		scrollToColumn: x,
		updateScrollPosition: (e) => {
			c.value = e.top, s.value = e.left, l.updateScrollPosition(e.top);
		},
		headerScrollSync: v,
		totalDimensions: y,
		scrollLeft: s,
		scrollTop: c
	};
}
var logger$3 = createLogger("MemoryManagement"), ResourceManager = class {
	resources = /* @__PURE__ */ new Set();
	timers = /* @__PURE__ */ new Set();
	intervals = /* @__PURE__ */ new Set();
	listeners = /* @__PURE__ */ new Map();
	register(e) {
		this.resources.add(e);
	}
	setTimeout(e, t) {
		let n = window.setTimeout(e, t);
		return this.timers.add(n), n;
	}
	setInterval(e, t) {
		let n = window.setInterval(e, t);
		return this.intervals.add(n), n;
	}
	addEventListener(e, t, n, r) {
		e.addEventListener(t, n, r), this.listeners.has(e) || this.listeners.set(e, []), this.listeners.get(e).push({
			event: t,
			handler: n,
			options: r
		});
	}
	clearTimeout(e) {
		clearTimeout(e), this.timers.delete(e);
	}
	clearInterval(e) {
		clearInterval(e), this.intervals.delete(e);
	}
	cleanup() {
		this.resources.forEach((e) => {
			try {
				e();
			} catch (e) {
				logger$3.warn("Error during cleanup:", { module: "MemoryManagement" }, e);
			}
		}), this.timers.forEach((e) => clearTimeout(e)), this.intervals.forEach((e) => clearInterval(e)), this.listeners.forEach((e, t) => {
			e.forEach(({ event: e, handler: n, options: r }) => {
				t.removeEventListener(e, n, r);
			});
		}), this.resources.clear(), this.timers.clear(), this.intervals.clear(), this.listeners.clear();
	}
}, MemoryMonitor = class {
	measurements = [];
	interval;
	onThreshold;
	threshold;
	constructor(e = 5e3, t = 200) {
		this.threshold = t * 1024 * 1024, this.interval = setInterval(() => {
			this.measure();
		}, e);
	}
	measure() {
		if ("memory" in performance) {
			let e = performance.memory, t = {
				timestamp: Date.now(),
				used: e.usedJSHeapSize,
				total: e.totalJSHeapSize
			};
			this.measurements.push(t), this.measurements.length > 50 && this.measurements.shift(), this.onThreshold && t.used > this.threshold && this.onThreshold(t.used / (1024 * 1024));
		}
	}
	onMemoryThreshold(e) {
		this.onThreshold = e;
	}
	getCurrentUsage() {
		if ("memory" in performance) {
			let e = performance.memory;
			return {
				used: e.usedJSHeapSize / (1024 * 1024),
				total: e.totalJSHeapSize / (1024 * 1024)
			};
		}
		return null;
	}
	getHistory() {
		return [...this.measurements];
	}
	destroy() {
		clearInterval(this.interval), this.measurements = [], this.onThreshold = void 0;
	}
};
function useMemoryManagement() {
	let e = new ResourceManager(), t = new MemoryMonitor(), n = ref(null), r = ref(!1);
	t.onMemoryThreshold((e) => {
		r.value = !0, logger$3.warn(`High memory usage detected: ${e.toFixed(2)}MB`);
	}), e.setInterval(() => {
		n.value = t.getCurrentUsage();
	}, 5e3);
	let i = watch(r, (t) => {
		if (t) {
			if ("gc" in window) try {
				window.gc();
			} catch {
				logger$3.warn("GC not available");
			}
			e.setTimeout(() => {
				r.value = !1;
			}, 1e4);
		}
	});
	return onUnmounted(() => {
		i(), e.cleanup(), t.destroy();
	}), {
		resourceManager: e,
		memoryUsage: n,
		memoryWarning: r,
		getCurrentMemoryUsage: () => t.getCurrentUsage(),
		getMemoryHistory: () => t.getHistory(),
		forceCleanup: () => {
			if (e.cleanup(), "gc" in window) try {
				window.gc();
			} catch {
				logger$3.warn("Manual GC failed");
			}
		}
	};
}
var logger$2 = createLogger("PerformanceMonitoring"), FPSCounter = class {
	frames = 0;
	lastTime = performance.now();
	fps = 60;
	callbacks = /* @__PURE__ */ new Set();
	rafId = null;
	isRunning = !1;
	start() {
		this.isRunning || (this.isRunning = !0, this.lastTime = performance.now(), this.frames = 0, this.tick());
	}
	stop() {
		this.isRunning = !1, this.rafId &&= (cancelAnimationFrame(this.rafId), null);
	}
	onUpdate(e) {
		return this.callbacks.add(e), () => this.callbacks.delete(e);
	}
	get currentFPS() {
		return this.fps;
	}
	tick() {
		if (!this.isRunning) return;
		this.frames++;
		let e = performance.now();
		e - this.lastTime >= 1e3 && (this.fps = Math.round(this.frames * 1e3 / (e - this.lastTime)), this.frames = 0, this.lastTime = e, this.callbacks.forEach((e) => e(this.fps))), this.rafId = requestAnimationFrame(() => this.tick());
	}
}, RenderProfiler = class {
	measurements = [];
	activeTimers = /* @__PURE__ */ new Map();
	maxMeasurements = 1e3;
	start(e) {
		this.activeTimers.set(e, performance.now());
	}
	end(e) {
		let t = this.activeTimers.get(e);
		if (!t) return logger$2.warn(`No start time found for measurement: ${e}`), 0;
		let n = performance.now() - t;
		return this.activeTimers.delete(e), this.measurements.push({
			name: e,
			duration: n,
			timestamp: Date.now()
		}), this.measurements.length > this.maxMeasurements && this.measurements.shift(), n;
	}
	getAverage(e, t = 10) {
		let n = this.measurements.filter((t) => t.name === e).slice(-t);
		return n.length === 0 ? 0 : n.reduce((e, t) => e + t.duration, 0) / n.length;
	}
	getAll() {
		return [...this.measurements];
	}
	clear() {
		this.measurements = [], this.activeTimers.clear();
	}
}, ScrollPerformanceTracker = class {
	scrollEvents = [];
	frameCount = 0;
	lastFrame = performance.now();
	isTracking = !1;
	start() {
		this.isTracking = !0, this.scrollEvents = [], this.frameCount = 0, this.lastFrame = performance.now();
	}
	recordScroll(e) {
		this.isTracking && (this.scrollEvents.push({
			timestamp: performance.now(),
			position: e
		}), this.frameCount++);
	}
	stop() {
		if (!this.isTracking) return {
			avgFPS: 0,
			scrollLatency: 0,
			jankCount: 0
		};
		this.isTracking = !1;
		let e = performance.now() - this.lastFrame, t = this.frameCount * 1e3 / e, n = 0, r = 0;
		for (let e = 1; e < this.scrollEvents.length; e++) {
			let t = this.scrollEvents[e].timestamp - this.scrollEvents[e - 1].timestamp;
			n += t, t > 16.67 && r++;
		}
		let i = n / (this.scrollEvents.length - 1) || 0;
		return {
			avgFPS: Math.round(t),
			scrollLatency: Math.round(i * 100) / 100,
			jankCount: r
		};
	}
}, WebVitalsMonitor = class {
	metrics = ref({
		lcp: null,
		fid: null,
		cls: null,
		fcp: null,
		ttfb: null
	});
	constructor() {
		this.measureCoreWebVitals();
	}
	measureCoreWebVitals() {
		if ("PerformanceObserver" in window) try {
			new PerformanceObserver((e) => {
				let t = e.getEntries(), n = t[t.length - 1];
				this.metrics.value.lcp = n.startTime;
			}).observe({ entryTypes: ["largest-contentful-paint"] }), new PerformanceObserver((e) => {
				let t = e.getEntries().find((e) => e.name === "first-contentful-paint");
				t && (this.metrics.value.fcp = t.startTime);
			}).observe({ entryTypes: ["paint"] }), new PerformanceObserver((e) => {
				let t = 0;
				for (let n of e.getEntries()) n.hadRecentInput || (t += n.value);
				this.metrics.value.cls = t;
			}).observe({ entryTypes: ["layout-shift"] }), new PerformanceObserver((e) => {
				let t = e.getEntries()[0];
				t && (this.metrics.value.fid = t.processingStart - t.startTime);
			}).observe({ entryTypes: ["first-input"] });
		} catch (e) {
			logger$2.warn("Performance observer not fully supported:", { module: "PerformanceMonitoring" }, e);
		}
		if ("performance" in window && "timing" in performance) {
			let e = performance.timing;
			this.metrics.value.ttfb = e.responseStart - e.fetchStart;
		}
	}
	getMetrics() {
		return this.metrics;
	}
}, PerformanceTestSuite = class {
	tests = /* @__PURE__ */ new Map();
	results = [];
	addTest(e, t) {
		this.tests.set(e, t);
	}
	async runAll() {
		this.results = [];
		for (let [e, t] of this.tests.entries()) try {
			let n = await t(), r = this.evaluatePerformance(n);
			this.results.push({
				testName: e,
				metrics: n,
				passed: r
			});
		} catch (t) {
			logger$2.error(`Performance test failed: ${e}`, { module: "PerformanceMonitoring" }, t), this.results.push({
				testName: e,
				metrics: this.getDefaultMetrics(),
				passed: !1
			});
		}
		return this.results;
	}
	evaluatePerformance(e) {
		let t = {
			fps: 55,
			avgRenderTime: 16.67,
			memoryUsage: 200,
			scrollLatency: 20,
			interactionLatency: 100
		};
		return e.fps >= t.fps && e.avgRenderTime <= t.avgRenderTime && e.memoryUsage <= t.memoryUsage && e.scrollLatency <= t.scrollLatency && e.interactionLatency <= t.interactionLatency;
	}
	getDefaultMetrics() {
		return {
			fps: 0,
			avgRenderTime: 0,
			memoryUsage: 0,
			scrollLatency: 0,
			firstContentfulPaint: 0,
			largestContentfulPaint: 0,
			cumulativeLayoutShift: 0,
			interactionLatency: 0,
			timestamp: Date.now()
		};
	}
	getResults() {
		return this.results;
	}
	generateReport() {
		let e = this.results.filter((e) => e.passed).length, t = this.results.length, n = "Performance Test Report\n";
		return n += "========================\n", n += `Passed: ${e}/${t}\n\n`, this.results.forEach((e) => {
			let t = e.passed ? "✅" : "❌";
			n += `${t} ${e.testName}\n`, n += `   FPS: ${e.metrics.fps}\n`, n += `   Render Time: ${e.metrics.avgRenderTime.toFixed(2)}ms\n`, n += `   Memory: ${e.metrics.memoryUsage.toFixed(2)}MB\n`, n += `   Scroll Latency: ${e.metrics.scrollLatency.toFixed(2)}ms\n\n`;
		}), n;
	}
};
function usePerformanceMonitoring() {
	let e = new FPSCounter(), t = new RenderProfiler(), n = new ScrollPerformanceTracker(), r = new WebVitalsMonitor(), i = ref(60), a = ref(!1), o = null, s = () => {
		a.value || (a.value = !0, e.start(), o = e.onUpdate((e) => {
			i.value = e;
		}));
	}, c = () => {
		a.value = !1, e.stop(), o &&= (o(), null);
	}, l = async (e, n) => (t.start(e), await n(), t.end(e)), u = () => n.start(), d = (e) => n.recordScroll(e), f = () => n.stop(), p = () => {
		let e = "memory" in performance ? performance.memory : null;
		return {
			fps: i.value,
			avgRenderTime: t.getAverage("render"),
			memoryUsage: e ? e.usedJSHeapSize / (1024 * 1024) : 0,
			scrollLatency: 0,
			firstContentfulPaint: r.getMetrics().value.fcp || 0,
			largestContentfulPaint: r.getMetrics().value.lcp || 0,
			cumulativeLayoutShift: r.getMetrics().value.cls || 0,
			interactionLatency: r.getMetrics().value.fid || 0,
			timestamp: Date.now()
		};
	};
	return onUnmounted(() => {
		c(), t.clear();
	}), {
		currentFPS: i,
		isMonitoring: a,
		webVitalsMetrics: r.getMetrics(),
		startMonitoring: s,
		stopMonitoring: c,
		profileRender: l,
		trackScrollStart: u,
		trackScrollEvent: d,
		trackScrollEnd: f,
		getMetrics: p,
		getRenderStats: () => t.getAll(),
		createPerformanceTest: (e, t) => async () => {
			let e = performance.now();
			await t(), await nextTick();
			let n = performance.now();
			return {
				...p(),
				avgRenderTime: n - e,
				timestamp: Date.now()
			};
		},
		createTestSuite: () => new PerformanceTestSuite()
	};
}
async function benchmarkOperation(e, t, n = 100) {
	let r = [];
	for (let e = 0; e < n; e++) {
		let e = performance.now();
		await t();
		let n = performance.now();
		r.push(n - e);
	}
	let i = r.reduce((e, t) => e + t, 0), a = i / n, o = Math.min(...r), s = Math.max(...r);
	return {
		name: e,
		avgTime: Math.round(a * 100) / 100,
		minTime: Math.round(o * 100) / 100,
		maxTime: Math.round(s * 100) / 100,
		totalTime: Math.round(i * 100) / 100
	};
}
var ElementPool = class {
	pool = [];
	activeElements = /* @__PURE__ */ new Set();
	createElement;
	resetElement;
	maxPoolSize;
	constructor(e, t = () => {}, n = 100) {
		this.createElement = e, this.resetElement = t, this.maxPoolSize = n;
	}
	acquire() {
		let e = this.pool.pop();
		return e ||= this.createElement(), this.activeElements.add(e), e;
	}
	release(e) {
		this.activeElements.has(e) && (this.activeElements.delete(e), this.resetElement(e), this.pool.length < this.maxPoolSize && this.pool.push(e));
	}
	clear() {
		this.pool = [], this.activeElements.clear();
	}
	get stats() {
		return {
			poolSize: this.pool.length,
			activeElements: this.activeElements.size,
			totalElements: this.pool.length + this.activeElements.size
		};
	}
};
function enableHardwareAcceleration(e) {
	e.style.transform = "translateZ(0)", e.style.willChange = "transform";
}
function applyCSSContainment(e, t = [
	"layout",
	"style",
	"paint"
]) {
	e.style.contain = t.join(" ");
}
var DOMBatcher = class {
	batches = [];
	rafId = null;
	add(e) {
		this.batches.push(e), this.schedule();
	}
	schedule() {
		this.rafId ||= requestAnimationFrame(() => {
			this.batches.splice(0).forEach((e) => e()), this.rafId = null;
		});
	}
	flush() {
		this.rafId &&= (cancelAnimationFrame(this.rafId), null), this.batches.splice(0).forEach((e) => e());
	}
	clear() {
		this.rafId &&= (cancelAnimationFrame(this.rafId), null), this.batches = [];
	}
}, EventDelegator = class {
	listeners = /* @__PURE__ */ new Map();
	boundHandler;
	container;
	constructor(e) {
		this.container = e, this.boundHandler = this.handleEvent.bind(this), this.container.addEventListener("click", this.boundHandler, { passive: !0 }), this.container.addEventListener("dblclick", this.boundHandler, { passive: !0 }), this.container.addEventListener("mousedown", this.boundHandler, { passive: !0 }), this.container.addEventListener("mouseup", this.boundHandler, { passive: !0 });
	}
	on(e, t, n) {
		let r = `${e}:${t}`;
		this.listeners.has(r) || this.listeners.set(r, /* @__PURE__ */ new Set()), this.listeners.get(r).add(n);
	}
	off(e, t, n) {
		let r = `${e}:${t}`, i = this.listeners.get(r);
		i && (i.delete(n), i.size === 0 && this.listeners.delete(r));
	}
	handleEvent(e) {
		let t = e.target;
		if (t) for (let [n, r] of this.listeners.entries()) {
			let [i, a] = n.split(":");
			if (e.type === i && a) {
				let n = t.closest(a);
				n && this.container.contains(n) && r.forEach((t) => t(e, n));
			}
		}
	}
	destroy() {
		this.container.removeEventListener("click", this.boundHandler), this.container.removeEventListener("dblclick", this.boundHandler), this.container.removeEventListener("mousedown", this.boundHandler), this.container.removeEventListener("mouseup", this.boundHandler), this.listeners.clear();
	}
}, StyleBatcher = class {
	updates = /* @__PURE__ */ new Map();
	rafId = null;
	setStyle(e, t, n) {
		this.updates.has(e) || this.updates.set(e, {}), this.updates.get(e)[t] = n, this.schedule();
	}
	setStyles(e, t) {
		this.updates.has(e) || this.updates.set(e, {}), Object.assign(this.updates.get(e), t), this.schedule();
	}
	schedule() {
		this.rafId ||= requestAnimationFrame(() => {
			for (let [e, t] of this.updates.entries()) Object.assign(e.style, t);
			this.updates.clear(), this.rafId = null;
		});
	}
	flush() {
		this.rafId &&= (cancelAnimationFrame(this.rafId), null);
		for (let [e, t] of this.updates.entries()) Object.assign(e.style, t);
		this.updates.clear();
	}
};
function createVirtualRowFactory() {
	let e = new ElementPool(() => {
		let e = document.createElement("div");
		return e.className = "ht-virtual-row", applyCSSContainment(e), enableHardwareAcceleration(e), e;
	}, (e) => {
		e.style.transform = "", e.style.height = "", e.innerHTML = "", e.className = "ht-virtual-row";
	}), t = new ElementPool(() => {
		let e = document.createElement("div");
		return e.className = "ht-virtual-cell", e;
	}, (e) => {
		e.innerHTML = "", e.className = "ht-virtual-cell", e.style.width = "";
	}), n = new StyleBatcher();
	return {
		acquireRow: () => e.acquire(),
		releaseRow: (t) => e.release(t),
		acquireCell: () => t.acquire(),
		releaseCell: (e) => t.release(e),
		batchStyle: (e, t) => {
			n.setStyles(e, t);
		},
		flushStyles: () => n.flush(),
		getStats: () => ({
			rows: e.stats,
			cells: t.stats
		}),
		cleanup: () => {
			e.clear(), t.clear(), n.flush();
		}
	};
}
var DataStreamProcessor = class {
	batchSize;
	abortController;
	constructor(e = 1e3) {
		this.batchSize = e;
	}
	async processBatches(e, t, n) {
		if (e.length <= this.batchSize) return await t(e, 0);
		let r = [], i = Math.ceil(e.length / this.batchSize);
		for (let a = 0; a < i; a++) {
			if (n?.aborted) throw Error("Processing aborted");
			let o = a * this.batchSize, s = Math.min((a + 1) * this.batchSize, e.length), c = e.slice(o, s), l = await t(c, a);
			r.push(...l), a < i - 1 && await new Promise((e) => setTimeout(e, 0));
		}
		return r;
	}
	abort() {
		this.abortController && this.abortController.abort();
	}
}, PipelineProfiler = class {
	measurements = /* @__PURE__ */ new Map();
	maxMeasurements = 100;
	start(e) {
		let t = performance.now();
		return () => {
			let n = performance.now() - t;
			return this.recordMeasurement(e, n), n;
		};
	}
	recordMeasurement(e, t) {
		this.measurements.has(e) || this.measurements.set(e, []);
		let n = this.measurements.get(e);
		n.push(t), n.length > this.maxMeasurements && n.shift();
	}
	getAverageTime(e) {
		let t = this.measurements.get(e);
		return !t || t.length === 0 ? 0 : t.reduce((e, t) => e + t, 0) / t.length;
	}
	getMetrics(e) {
		let t = this.measurements.get(e) || [];
		return t.length === 0 ? {
			avg: 0,
			min: 0,
			max: 0,
			count: 0
		} : {
			avg: t.reduce((e, t) => e + t, 0) / t.length,
			min: Math.min(...t),
			max: Math.max(...t),
			count: t.length
		};
	}
	clear() {
		this.measurements.clear();
	}
};
function useDataPipeline(t, n = {}) {
	let r = createLogger("DataPipeline"), { enableMetrics: i = !0, maxBatchSize: a = 1e3, asyncProcessing: o = !0, errorHandling: s = "log", debounceMs: c = 16 } = n, l = ref([]), u = ref(!1), d = ref(null), f = ref({
		totalProcessTime: 0,
		stagesCompleted: 0,
		itemsProcessed: 0,
		errorCount: 0,
		lastRunTime: 0,
		throughputPerSecond: 0
	}), p = new DataStreamProcessor(a), m = i ? new PipelineProfiler() : null, h = null, g = computed(() => [
		"filter",
		"sort",
		"transform",
		"grouping",
		"aggregation"
	].map((e) => {
		let t = l.value.filter((t) => t.type === e && t.enabled).sort((e, t) => e.priority - t.priority), n = m?.getMetrics(e) || {
			avg: 0,
			min: 0,
			max: 0,
			count: 0
		};
		return {
			name: e,
			interceptors: t,
			metrics: {
				processedCount: n.count,
				averageTime: n.avg,
				lastProcessTime: n.max,
				errorCount: 0
			}
		};
	})), _ = async (e, n) => {
		if (u.value) return r.warn("Processing already in progress, skipping"), e;
		u.value = !0, d.value = null;
		let c = performance.now(), h = [...e], g = 0;
		try {
			for (let e of [
				"filter",
				"sort",
				"transform",
				"grouping",
				"aggregation"
			]) {
				let t = l.value.filter((t) => t.type === e && t.enabled).sort((e, t) => e.priority - t.priority);
				if (t.length === 0) continue;
				let i = m?.start(e);
				try {
					for (let r of t) {
						let t = m?.start(`${e}:${r.name}`);
						if (o && h.length > a) h = await p.processBatches(h, async (e) => {
							let t = await r.process(e, n);
							return Array.isArray(t) ? t : [t];
						});
						else {
							let e = await r.process(h, n);
							h = Array.isArray(e) ? e : [e];
						}
						t?.();
					}
					g++;
				} catch (t) {
					if (r.error(`Error in ${e} stage:`, {
						module: "DataPipeline",
						stage: e
					}, t), s === "throw") throw t;
					s === "log" && (d.value = t, f.value.errorCount++);
				}
				i?.();
			}
			let u = performance.now() - c;
			return i && (f.value = {
				totalProcessTime: u,
				stagesCompleted: g,
				itemsProcessed: h.length,
				errorCount: f.value.errorCount,
				lastRunTime: Date.now(),
				throughputPerSecond: h.length / (u / 1e3)
			}), t && t.emit?.("data-pipeline-complete", {
				originalCount: e.length,
				processedCount: h.length,
				processingTime: u,
				stagesCompleted: g
			}), h;
		} catch (n) {
			if (d.value = n, f.value.errorCount++, t && t.emit?.("data-pipeline-error", {
				error: n,
				stage: g
			}), s === "throw") throw n;
			return e;
		} finally {
			u.value = !1;
		}
	}, v = (e, t) => new Promise((n, r) => {
		h && clearTimeout(h), h = window.setTimeout(async () => {
			try {
				let r = await _(e, t);
				n(r);
			} catch (e) {
				r(e);
			}
		}, c);
	}), y = (e) => {
		if (!e.name || !e.process) throw Error("Invalid interceptor: name and process function are required");
		b(e.name), l.value.push({ ...e }), t && (t.emit?.("data-interceptor-added", {
			name: e.name,
			type: e.type
		}), t.emit?.("data-interceptor-registered", {
			type: e.type,
			interceptor: e
		}));
	}, b = (e) => {
		let n = l.value.findIndex((t) => t.name === e);
		if (n !== -1) {
			let r = l.value.splice(n, 1)[0];
			t && r && t.emit?.("data-interceptor-removed", {
				name: e,
				type: r.type
			});
		}
	};
	return onUnmounted(() => {
		h && clearTimeout(h), p.abort(), l.value = [], m?.clear();
	}), {
		isProcessing: computed(() => u.value),
		metrics: computed(() => f.value),
		stages: g,
		lastError: d,
		processData: c > 0 ? v : _,
		addInterceptor: y,
		removeInterceptor: b,
		enableInterceptor: (e) => {
			let t = l.value.find((t) => t.name === e);
			t && (t.enabled = !0);
		},
		disableInterceptor: (e) => {
			let t = l.value.find((t) => t.name === e);
			t && (t.enabled = !1);
		},
		getInterceptors: (e) => e ? l.value.filter((t) => t.type === e) : [...l.value],
		clearPipeline: (e) => {
			e ? l.value = l.value.filter((t) => t.type !== e) : l.value = [], t && t.emit?.("data-pipeline-cleared", { type: e });
		},
		resetMetrics: () => {
			f.value = {
				totalProcessTime: 0,
				stagesCompleted: 0,
				itemsProcessed: 0,
				errorCount: 0,
				lastRunTime: 0,
				throughputPerSecond: 0
			}, m?.clear();
		},
		benchmark: async (e, t = 10) => {
			let n = [];
			for (let r = 0; r < t; r++) {
				let t = performance.now();
				await _(e);
				let r = performance.now();
				n.push(r - t);
			}
			let r = n.reduce((e, t) => e + t, 0), i = r / t, a = Math.min(...n), o = Math.max(...n), s = e.length / (i / 1e3);
			return {
				averageTime: i,
				minTime: a,
				maxTime: o,
				totalTime: r,
				throughput: s,
				iterations: t
			};
		}
	};
}
const DataPipelineUtils = {
	createFilterInterceptor: (e, t, n = 0) => ({
		type: "filter",
		name: e,
		priority: n,
		enabled: !0,
		process: (e) => e.filter(t)
	}),
	createSortInterceptor: (e, t, n = 0) => ({
		type: "sort",
		name: e,
		priority: n,
		enabled: !0,
		process: (e) => [...e].sort(t)
	}),
	createTransformInterceptor: (e, t, n = 0) => ({
		type: "transform",
		name: e,
		priority: n,
		enabled: !0,
		process: (e) => e.map(t)
	}),
	createAsyncInterceptor: (e, t, n, r = 0) => ({
		type: t,
		name: e,
		priority: r,
		enabled: !0,
		process: async (e) => await n(e, (e) => {})
	})
};
function detectPlatform() {
	if (typeof navigator > "u") return {
		isMac: !1,
		isWindows: !1,
		isLinux: !1,
		isMobile: !1,
		modifierKey: "Ctrl",
		modifierSymbol: "Ctrl"
	};
	let e = navigator.userAgent, t = navigator.platform, n = /Mac|iPhone|iPad|iPod/.test(t) || navigator.userAgentData?.platform === "macOS" || /Macintosh|MacIntel|MacPPC|Mac68K/.test(t), r = /Win/.test(t) || navigator.userAgentData?.platform === "Windows" || /Windows/.test(e), i = /Linux/.test(t) || navigator.userAgentData?.platform === "Linux" || /X11/.test(t), a = /Mobi|Android/i.test(e) || /iPhone|iPad|iPod/.test(t) || navigator.userAgentData?.mobile === !0;
	return {
		isMac: n,
		isWindows: r,
		isLinux: i,
		isMobile: a,
		modifierKey: n ? "Cmd" : "Ctrl",
		modifierSymbol: n ? "⌘" : "Ctrl"
	};
}
function hasModifierKey(e) {
	return e.ctrlKey || e.metaKey;
}
function getModifierKeyText() {
	return detectPlatform().modifierKey;
}
function getModifierKeySymbol() {
	return detectPlatform().modifierSymbol;
}
function formatShortcut(e, t = !0) {
	let n = detectPlatform();
	return t ? `${n.modifierKey}+${e}` : e;
}
function formatShortcutSymbol(e, t = !0) {
	let n = detectPlatform();
	return t ? `${n.modifierSymbol}+${e}` : e;
}
var counter = 0, SESSION_ID = Math.random().toString(36).slice(2, 8);
function generateComponentId(e) {
	counter = (counter + 1) % 1e4;
	let t = Date.now().toString(36);
	return `${e}-${counter}-${SESSION_ID}${t}`;
}
function generateIdGroup(e, t) {
	let n = generateComponentId(e), r = {};
	for (let e of t) r[e] = `${n}-${e}`;
	return r;
}
var validPinnedLocations = [
	"left",
	"right",
	"center"
];
function normalizePinnedLocation(e) {
	return e === "left" || e === "right" ? e : "center";
}
function isColumnDropBlocked(e, t) {
	if (!e || !t || e.columnId === t.id) return !1;
	let n = normalizePinnedLocation(t.pinned);
	return e.pinned !== n;
}
function getColumnPinnedLocation(e) {
	if (!e) return "center";
	let t = normalizePinnedLocation(e.pinned);
	return validPinnedLocations.includes(t) ? t : "center";
}
function createRAFScrollHandler(e) {
	let { onScroll: t, onScrollEnd: n, debounceDelay: r = 150, trackVelocity: i = !0 } = e, a = null, o = null, s = null, c = !1, l = 0, u = 0, d = 0, f = {
		horizontal: 0,
		vertical: 0,
		magnitude: 0
	}, p = (e) => {
		if (!i) return {
			horizontal: 0,
			vertical: 0,
			magnitude: 0
		};
		let t = e.target, n = performance.now(), r = t.scrollLeft || 0, a = t.scrollTop || 0, o = n - d;
		if (o > 0) {
			let e = Math.abs(r - l), t = Math.abs(a - u), n = e / o, i = t / o, s = Math.sqrt(n ** 2 + i ** 2);
			f = {
				horizontal: n,
				vertical: i,
				magnitude: s
			};
		}
		return l = r, u = a, d = n, f;
	}, m = () => {
		c || !s || (c = !0, a = requestAnimationFrame(() => {
			s &&= (t(s, f), null), c = !1;
		}));
	};
	return {
		handleScroll: (e) => {
			p(e), s = e, m(), n && (o !== null && clearTimeout(o), o = window.setTimeout(() => {
				n(e), o = null, f = {
					horizontal: 0,
					vertical: 0,
					magnitude: 0
				};
			}, r));
		},
		cleanup: () => {
			a !== null && (cancelAnimationFrame(a), a = null), o !== null && (clearTimeout(o), o = null), s = null, c = !1;
		},
		getVelocity: () => f
	};
}
function useRAFScroll(e) {
	let t = createRAFScrollHandler(e);
	if (typeof window < "u" && "onUnmounted" in globalThis) {
		let { onUnmounted: e } = globalThis;
		e(() => t.cleanup());
	}
	return t;
}
const UtilityFeatures = {
	ADVANCED_VIRTUALIZATION: !0,
	BIDIRECTIONAL_VIRTUALIZATION: !0,
	MEMORY_MANAGEMENT: !0,
	PERFORMANCE_MONITORING: !0,
	DOM_OPTIMIZATION: !0,
	BROWSER_OPTIMIZATION: !0,
	DATA_PIPELINE: !0,
	HARDWARE_ACCELERATION: typeof CSS < "u" && CSS.supports("transform", "translateZ(0)"),
	INTERSECTION_OBSERVER: typeof IntersectionObserver < "u",
	RESIZE_OBSERVER: typeof ResizeObserver < "u",
	PERFORMANCE_OBSERVER: typeof PerformanceObserver < "u",
	WEB_WORKERS: typeof Worker < "u",
	OFFSCREEN_CANVAS: typeof OffscreenCanvas < "u"
};
async function initializeUtilities() {
	if (typeof window < "u") {
		let { initializeBrowserOptimizations: e } = await import("./browser-optimization-BmgcIssW.js");
		e();
	}
}
function getUtilityInfo() {
	return {
		version: "1.1.0",
		features: UtilityFeatures,
		modules: {
			virtualization: "Core virtual scrolling with dynamic sizing",
			advancedVirtualization: "Advanced virtual scrolling with velocity-based overscan",
			bidirectionalVirtualization: "Combined row and column virtualization for large grids",
			threePaneVirtualization: "Three-pane virtualization for frozen columns",
			memoryManagement: "Memory leak prevention and cleanup utilities",
			performanceMonitoring: "Real-time performance metrics and benchmarking",
			domOptimization: "DOM manipulation optimization and pooling",
			browserOptimization: "Browser-specific performance optimizations",
			dataPipeline: "High-performance data processing pipeline"
		}
	};
}
const quickStartUtils = {
	basicVirtualization: (e, t = 50) => ({
		count: e,
		getItemSize: () => t,
		overscan: 5,
		enabled: !0
	}),
	highPerformanceVirtualization: (e, t = 50) => ({
		count: e,
		getItemSize: () => t,
		overscanCount: 10,
		enableDynamicOverscan: !0,
		scrollingDelay: 100
	}),
	bidirectionalVirtualization: (e, t = 32, n = 150) => ({
		rowCount: e,
		getRowSize: () => t,
		columns: [],
		getColumnWidth: () => n,
		overscan: {
			rows: 5,
			columns: 2
		},
		enabled: {
			vertical: !0,
			horizontal: !0
		}
	}),
	memoryOptimization: () => ({
		enableGC: !0,
		poolSize: 100,
		cacheSize: 1e3,
		cleanupInterval: 3e4
	}),
	performanceTracking: () => ({
		enableFPS: !0,
		enableRenderProfiling: !0,
		enableMemoryTracking: !0,
		enableWebVitals: !0
	})
};
var RendererRegistry = class {
	renderers = /* @__PURE__ */ new Map();
	instances = /* @__PURE__ */ new Map();
	currentRenderer = null;
	logger = createLogger("RendererRegistry");
	register(e, t) {
		this.renderers.set(e, t);
	}
	unregister(e) {
		let t = this.instances.get(e);
		t && t.renderer.unmount(), this.renderers.delete(e), this.instances.delete(e), this.currentRenderer === e && (this.currentRenderer = null);
	}
	getAvailable() {
		return Array.from(this.renderers.keys());
	}
	has(e) {
		return this.renderers.has(e);
	}
	getInstance(e, t, n, r) {
		let i = this.renderers.get(e);
		if (!i) return this.logger.error(`Renderer '${e}' is not registered`), null;
		let a = this.instances.get(e);
		if (a) return r && a.renderer.updateConfig && a.renderer.updateConfig(r), a;
		try {
			return a = {
				renderer: i(r),
				factory: i,
				options: r || {},
				metadata: {
					createdAt: /* @__PURE__ */ new Date(),
					lastUsed: /* @__PURE__ */ new Date(),
					renderCount: 0
				}
			}, this.instances.set(e, a), a;
		} catch (t) {
			return this.logger.error(`Failed to create renderer '${e}':`, t), null;
		}
	}
	async switchTo(e, t, n, r) {
		try {
			if (this.currentRenderer) {
				let e = this.instances.get(this.currentRenderer);
				e && await e.renderer.unmount();
			}
			let i = this.getInstance(e, t, n, r);
			if (!i) return null;
			await i.renderer.mount(t, n), i.metadata.lastUsed = /* @__PURE__ */ new Date();
			let a = n.getState();
			if (a) {
				let e = this.buildVirtualRows(a, a.data || []);
				i.renderer.render(a, a.columns || [], e), i.metadata.renderCount++;
			}
			return this.currentRenderer = e, i;
		} catch (t) {
			return this.logger.error(`Failed to switch to renderer '${e}':`, t), null;
		}
	}
	getCurrent() {
		return this.currentRenderer && this.instances.get(this.currentRenderer) || null;
	}
	getCurrentName() {
		return this.currentRenderer;
	}
	render(e, t, n) {
		let r = this.getCurrent();
		if (r) {
			let i = this.buildVirtualRows(e, n);
			r.renderer.render(e, t, i), r.metadata.renderCount++;
		}
	}
	updateSize(e, t) {
		let n = this.getCurrent();
		n && n.renderer.resize && n.renderer.resize(e, t);
	}
	cleanup() {
		for (let [e, t] of this.instances) try {
			t.renderer.unmount();
		} catch (t) {
			this.logger.error(`Error cleaning up renderer '${e}':`, t);
		}
		this.instances.clear(), this.currentRenderer = null;
	}
	getStats() {
		let e = Array.from(this.renderers.keys()).map((e) => {
			let t = this.instances.get(e);
			return {
				name: e,
				hasInstance: !!t,
				renderCount: t?.metadata.renderCount || 0,
				lastUsed: t?.metadata.lastUsed
			};
		});
		return {
			registered: this.renderers.size,
			instances: this.instances.size,
			current: this.currentRenderer,
			renderers: e
		};
	}
	buildVirtualRows(e, t) {
		let n = e?.config?.rowHeight ?? 32;
		return t.map((e, t) => {
			let r = e?.id;
			return {
				id: typeof r == "string" || typeof r == "number" ? r : t,
				index: t,
				data: e,
				top: t * n,
				height: n,
				visible: !0
			};
		});
	}
};
const rendererRegistry = new RendererRegistry();
function createRendererRegistry() {
	return new RendererRegistry();
}
function switchRenderer(e, t, n, r) {
	return rendererRegistry.switchTo(e, t, n, r);
}
function getCurrentRenderer() {
	return rendererRegistry.getCurrent();
}
function getAvailableRenderers() {
	return rendererRegistry.getAvailable();
}
function isFunctionalColumn(e) {
	return "type" in e && (e.type === "seq" || e.type === "checkbox" || e.type === "radio" || e.type === "drag" || e.type === "actions");
}
const FUNCTIONAL_COLUMN_DEFAULTS = {
	seq: {
		width: 48,
		minWidth: 40,
		pinned: "left"
	},
	checkbox: {
		width: 52,
		minWidth: 52,
		pinned: "left"
	},
	radio: {
		width: 52,
		minWidth: 52,
		pinned: "left"
	},
	drag: {
		width: 48,
		minWidth: 48,
		pinned: "left"
	},
	actions: {
		width: 120,
		minWidth: 80,
		pinned: "right"
	}
}, DEFAULT_LEFT_FUNCTIONAL_ORDER = [
	"drag",
	"checkbox",
	"radio",
	"seq"
];
function generateFunctionalColumnId(e, t = 0) {
	return `__functional_${e}_${t}`;
}
function normalizeFunctionalColumn(e, t = 0) {
	let n = FUNCTIONAL_COLUMN_DEFAULTS[e.type];
	return {
		...e,
		id: e.id || generateFunctionalColumnId(e.type, t),
		field: e.field || `__functional_${e.type}`,
		title: e.title || "",
		pinned: e.pinned || n.pinned,
		width: e.width ?? n.width,
		minWidth: e.minWidth ?? n.minWidth,
		resizable: e.resizable ?? !1,
		isDraggable: e.isDraggable ?? !1,
		sortable: !1,
		filterable: !1,
		visible: e.visible ?? !0
	};
}
function sortFunctionalColumns(e) {
	let t = e.filter(isFunctionalColumn), n = e.filter((e) => !isFunctionalColumn(e)), r = t.filter((e) => e.pinned === "left").sort((e, t) => {
		let n = e.type, r = t.type, i = DEFAULT_LEFT_FUNCTIONAL_ORDER.indexOf(n), a = DEFAULT_LEFT_FUNCTIONAL_ORDER.indexOf(r);
		return (i === -1 ? 999 : i) - (a === -1 ? 999 : a);
	}), i = t.filter((e) => e.pinned === "right");
	return [
		...r,
		...n,
		...i
	];
}
function enforceSelectionColumnExclusivity(e) {
	let t = !1;
	return e.filter((e) => {
		if (!isFunctionalColumn(e)) return !0;
		let n = e.type;
		return n === "checkbox" || n === "radio" ? t ? !1 : (t = !0, !0) : !0;
	});
}
var OptimizedSelection = class {
	selection = /* @__PURE__ */ new Set();
	callbacks = /* @__PURE__ */ new Set();
	add(e) {
		return this.selection.has(e) ? !1 : (this.selection.add(e), this.notifyChange(), !0);
	}
	delete(e) {
		return this.selection.has(e) ? (this.selection.delete(e), this.notifyChange(), !0) : !1;
	}
	clear() {
		this.selection.size !== 0 && (this.selection.clear(), this.notifyChange());
	}
	has(e) {
		return this.selection.has(e);
	}
	toArray() {
		return Array.from(this.selection);
	}
	get size() {
		return this.selection.size;
	}
	notifyChange() {
		this.callbacks.forEach((e) => e());
	}
	subscribe(e) {
		return this.callbacks.add(e), () => this.callbacks.delete(e);
	}
};
function createDebouncer(e, t) {
	let n = null, r = ((...r) => {
		n && clearTimeout(n), n = window.setTimeout(() => {
			e(...r);
		}, t);
	});
	return r.cancel = () => {
		n &&= (clearTimeout(n), null);
	}, r;
}
var ComputedCache = class {
	cache = /* @__PURE__ */ new Map();
	ttl;
	constructor(e = 1e4) {
		this.ttl = e;
	}
	get(e) {
		let t = this.cache.get(e);
		if (t) {
			if (Date.now() - t.timestamp > this.ttl) {
				this.cache.delete(e);
				return;
			}
			return t.value;
		}
	}
	set(e, t) {
		this.cache.set(e, {
			value: t,
			timestamp: Date.now()
		});
	}
	clear() {
		this.cache.clear();
	}
	cleanup() {
		let e = Date.now();
		for (let [t, { timestamp: n }] of this.cache.entries()) e - n > this.ttl && this.cache.delete(t);
	}
}, EventEmitter = class {
	listeners = /* @__PURE__ */ new Map();
	logger = createLogger({
		module: "EventEmitter",
		operation: "useGridState"
	});
	on(e, t) {
		this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set());
		let n = this.listeners.get(e);
		return n && n.add(t), () => {
			this.listeners.get(e)?.delete(t);
		};
	}
	off(e, t) {
		this.listeners.get(e)?.delete(t);
	}
	emit(e, ...t) {
		let n = this.listeners.get(e);
		n && n.forEach((n) => {
			try {
				n(...t);
			} catch (t) {
				this.logger.error(`Error in event handler for '${e}':`, {
					module: "useGridState",
					event: e
				}, t);
			}
		});
	}
	clear() {
		this.listeners.clear();
	}
};
function processColumns(e, t, n) {
	let r = e.map((e, r) => {
		if (isFunctionalColumn(e)) {
			let n = normalizeFunctionalColumn(e, r);
			return n.type === "drag" && (t && t("drag-drop") || (n.functionalOptions = {
				...n.functionalOptions || {},
				isRowDraggable: () => ({
					disabled: !0,
					reason: "Drag-drop plugin not installed"
				})
			})), n;
		}
		let i = e.dataType || (n && n.length > 0 ? inferDataTypeForColumn(n, e) : void 0);
		return {
			...e,
			dataType: i || e.dataType,
			width: e.width ?? 150,
			minWidth: e.minWidth ?? 50,
			maxWidth: e.maxWidth ?? 500,
			isLastPinned: !1,
			isFirstRightPinned: !1
		};
	}), i = enforceSelectionColumnExclusivity(r), a = sortFunctionalColumns(i), o = a.filter((e) => e.pinned === "left"), s = a.filter((e) => e.pinned === "right");
	if (o.length > 0) {
		let e = o[o.length - 1];
		e && (e.isLastPinned = !0);
	}
	return s.length > 0 && s[0] && (s[0].isFirstRightPinned = !0), a;
}
function useGridState(t = {}, n = []) {
	let r = createLogger("useGridState"), i = new OptimizedSelection(), a = ref(0), o = i.subscribe(() => {
		a.value++;
	}), s = new ComputedCache(1e4), c = new EventEmitter(), l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Map(), d = createRendererRegistry(), f = null, p = reactive({
		scrollPosition: {
			top: 0,
			left: 0
		},
		focusedCell: null,
		rawData: [],
		processedData: [],
		columns: [],
		config: {
			rowHeight: 32,
			headerHeight: 40,
			virtualizationThreshold: 1e3,
			enableVirtualization: !0,
			...t
		},
		loading: !1,
		error: null,
		virtualizationEnabled: !1,
		renderMetrics: {
			lastRenderTime: 0,
			avgRenderTime: 0,
			renderCount: 0
		}
	}), m = {
		setData: (e) => {
			let t = markRaw([...e]);
			p.rawData = t, e.length >= p.config.virtualizationThreshold && (p.virtualizationEnabled = !0), s.clear(), _(t), p.columns && p.columns.length > 0 && p.columns.some((e) => !e.dataType) && (p.columns = processColumns(p.columns, (e) => !!h.get(e), p.rawData), c.emit("columns-changed", p.columns)), c.emit("data-changed", t);
		},
		getData: () => p.rawData,
		getFilteredData: () => p.processedData,
		selectRow: (e) => {
			i.add(e);
		},
		selectRows: (e) => {
			e.forEach((e) => i.add(e));
		},
		clearSelection: () => {
			i.clear();
		},
		setColumns: (e) => {
			p.columns = processColumns(e, (e) => !!h.get(e), p.rawData), c.emit("columns-changed", p.columns), m.renderWithActiveRenderer?.();
		},
		updateColumn: (e, t) => {
			let n = p.columns.findIndex((t) => t.id === e);
			if (n !== -1) {
				let r = p.columns[n];
				if (!r) return;
				let i = {
					...r,
					...t,
					id: r.id,
					field: t.field ?? r.field
				}, a = [...p.columns];
				a[n] = i, p.columns = processColumns(a, (e) => !!h.get(e), p.rawData), c.emit("column-updated", {
					columnId: e,
					updates: t
				}), m.renderWithActiveRenderer?.();
			}
		},
		getState: () => ({
			data: p.processedData,
			columns: p.columns,
			config: p.config,
			selectedRows: new Set(i.toArray()),
			focusedCell: p.focusedCell,
			scrollPosition: p.scrollPosition,
			loading: p.loading,
			error: p.error
		}),
		updateConfig: (e) => {
			p.config = {
				...p.config,
				...e
			}, s.clear(), p.rawData.length > 0 && _(p.rawData), c.emit("config-changed", p.config);
		},
		emit: (e, t) => {
			c.emit(e, t);
		},
		on: (e, t) => c.on(e, t),
		off: (e, t) => {
			c.off(e, t);
		},
		loadPlugin: async (e) => (await h.register(e)).success,
		unloadPlugin: async (e) => (await h.unregister(e)).success,
		getPlugin: (e) => h.get(e),
		listPlugins: () => h.list(),
		getPluginErrors: () => h.getExtension("error-handling")?.getErrors() || /* @__PURE__ */ new Map(),
		registerCellRenderer: (e, t) => {
			u.set(e, t), c.emit("cell-renderer-registered", {
				name: e,
				component: t
			});
		},
		unregisterCellRenderer: (e) => {
			u.delete(e), c.emit("cell-renderer-unregistered", { name: e });
		},
		registerRenderer: (e, t) => {
			d.register(e, t), c.emit("renderer-registered", {
				name: e,
				factory: t
			});
		},
		setRenderer: async (e) => {
			r.debug(`Switching to renderer: ${e}`);
			let t = d.getAvailable();
			return t.includes(e) ? (c.emit("renderer-changed", { name: e }), !0) : (r.warn(`Renderer '${e}' not registered. Available: ${t.join(", ")}`), !1);
		},
		getRenderer: () => d.getCurrentName() || "table",
		renderWithActiveRenderer: () => {
			let e = () => {
				if (!d.getCurrent()) return;
				let e = m.getState();
				d.render(e, p.columns, p.processedData), r.debug("Rendered with active renderer");
			};
			if (typeof window > "u" || window.requestAnimationFrame === void 0) {
				e();
				return;
			}
			f === null && (f = window.requestAnimationFrame(() => {
				f = null, e();
			}));
		},
		initializeRenderer: async (e) => {
			try {
				let t = p.config.renderer || "table";
				if (r.debug(`Initializing renderer: ${t}`), !d.has(t)) throw Error(`Renderer '${t}' is not registered`);
				if (!await d.switchTo(t, e, m, p.config)) throw Error(`Failed to initialize renderer '${t}'`);
				return r.debug(`Renderer '${t}' initialized successfully`), !0;
			} catch (e) {
				return r.error("Renderer initialization failed:", { module: "useGridState" }, e), !1;
			}
		},
		resizeRenderer: (e, t) => {
			d.updateSize(e, t), r.debug(`Renderer resized to ${e}x${t}`);
		},
		getAvailableRenderers: () => d.getAvailable(),
		getActiveRendererInstance: () => d.getCurrent(),
		registerMemoryCleanup: (e) => {
			l.add(e);
		}
	}, h = createPluginRegistry(m);
	function g() {
		return h.getExtension("capabilities")?.get("data-pipeline");
	}
	function _(e) {
		let t = g();
		if (!t) {
			p.processedData = markRaw([...e]);
			return;
		}
		let n = typeof performance < "u" && performance.now ? performance.now() : Date.now(), i = 0;
		try {
			let r = e;
			i = 1, r = t.processData(r, "filter"), i = 2, r = t.processData(r, "sort"), i = 3, r = t.processData(r, "transform"), i = 4, r = t.processData(r, "grouping"), i = 5, r = t.processData(r, "aggregation"), p.processedData = markRaw(r);
			let a = typeof performance < "u" && performance.now ? performance.now() : Date.now();
			c.emit("data-pipeline-complete", {
				originalCount: e.length,
				processedCount: p.processedData.length,
				processingTime: a - n,
				stagesCompleted: 5
			});
		} catch (t) {
			r.error("Error processing data through pipeline:", { module: "useGridState" }, t), p.processedData = markRaw([...e]), c.emit("data-pipeline-error", {
				error: t,
				stage: i
			});
		}
	}
	let v = computed(() => {
		let e = p.processedData, { rowHeight: t } = p.config, n = {
			visibleRows: e,
			startIndex: 0,
			endIndex: e.length - 1,
			totalHeight: e.length * t
		};
		return c.emit("data-processed", {
			stage: "virtualization",
			data: n.visibleRows
		}), n;
	}), y = createDebouncer(() => {
		p.rawData.length > 0 && _(p.rawData);
	}, 16), b = [];
	b.push(watch(() => p.rawData, () => {
		y();
	}, { flush: "post" })), b.push(watch(() => [p.config.sort, p.config.filters], () => {
		y();
	}, {
		flush: "post",
		deep: !0
	})), b.push(watch([() => p.processedData.length, () => p.config.virtualizationThreshold], ([e, t]) => {
		p.virtualizationEnabled = e >= t;
	})), c.on("data-interceptor-registered", () => {
		y();
	}), c.on("data-interceptor-removed", () => {
		y();
	}), c.on("data-refresh-requested", () => {
		y();
	}), c.on("data-pipeline-complete", () => {
		m.renderWithActiveRenderer?.();
	});
	let x = setInterval(() => {
		s.cleanup();
	}, 3e4);
	return n.length > 0 && n.forEach((e) => {
		try {
			m.loadPlugin(e);
		} catch (t) {
			r.error(`Failed to load initial plugin ${e.name}:`, {
				module: "useGridState",
				plugin: e.name
			}, t);
		}
	}), onUnmounted(() => {
		f !== null && typeof window < "u" && typeof window.cancelAnimationFrame == "function" && (window.cancelAnimationFrame(f), f = null), y.cancel(), i.clear(), o(), s.clear(), clearInterval(x), b.forEach((e) => e()), d.cleanup(), h.cleanup(), c.clear(), l.forEach((e) => {
			try {
				e();
			} catch (e) {
				r.error("Error during cleanup:", { module: "useGridState" }, e);
			}
		}), l.clear(), p.rawData = [], p.processedData = [];
	}), {
		data: v,
		columns: computed(() => p.columns),
		selectedRows: computed(() => (a.value, i.toArray())),
		loading: computed(() => p.loading),
		error: computed(() => p.error),
		scrollPosition: computed(() => p.scrollPosition),
		focusedCell: computed(() => p.focusedCell),
		config: computed(() => p.config),
		virtualizationEnabled: computed(() => p.virtualizationEnabled),
		renderMetrics: computed(() => p.renderMetrics),
		api: m,
		__internal: {
			state: p,
			selectionManager: i,
			pluginRegistry: h,
			eventEmitter: c,
			processDataThroughPipeline: _,
			updateScrollPosition: (e) => {
				p.scrollPosition = e;
			},
			setFocusedCell: (e) => {
				p.focusedCell = e;
			},
			setLoading: (e) => {
				p.loading = e;
			},
			setError: (e) => {
				p.error = e;
			},
			clearCache: () => {
				s.clear();
			}
		}
	};
}
var logger = createLogger("interaction-contract"), InteractionContractImpl = class {
	eventEmitter = null;
	coreCallbacks = {};
	destroyed = !1;
	constructor(e) {
		logger.debug(`Creating interaction contract for renderer: ${e}`);
	}
	registerEventEmitter(e) {
		this.eventEmitter = e;
	}
	updateSelection(e, t) {}
	setActive(e) {}
	ensureVisible(e, t) {}
	async toggleEditMode(e, t) {
		return !1;
	}
	updateScrollPosition(e) {}
	refresh() {}
	registerCoreCallbacks(e) {
		this.coreCallbacks = {
			...this.coreCallbacks,
			...e
		};
	}
	emit(e, t) {
		if (this.destroyed) {
			logger.warn(`Attempted to emit '${e}' on destroyed contract`);
			return;
		}
		if (this.eventEmitter) try {
			this.eventEmitter(e, t);
		} catch (t) {
			logger.error(`Error emitting event '${e}':`, t);
		}
		else logger.debug(`No event emitter registered for event '${e}'`);
	}
	destroy() {
		this.destroyed = !0, this.eventEmitter = null, this.coreCallbacks = {};
	}
	isDestroyed() {
		return this.destroyed;
	}
};
function createInteractionContract(e) {
	return new InteractionContractImpl(e);
}
const GRID_INSTANCE_ID_KEY = Symbol("ht-grid-instance-id"), GRID_API_KEY = Symbol("ht-grid-api");
var _hoisted_1$39 = ["type", "disabled"], _hoisted_2$26 = {
	key: 0,
	class: "inline-flex items-center justify-center"
}, HtButton_default = /* @__PURE__ */ defineComponent({
	__name: "HtButton",
	props: {
		label: { default: "" },
		disabled: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		type: { default: "button" },
		variant: { default: "default" },
		size: { default: "md" },
		block: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = [
			"inline-flex items-center justify-center",
			"rounded-md font-medium select-none",
			"transition-colors",
			"focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
			"disabled:opacity-50 disabled:pointer-events-none",
			"gap-2"
		].join(" "), r = {
			default: "bg-[var(--ht-primary)] text-[var(--ht-text-inverse)] hover:bg-[var(--ht-primary-hover)] focus-visible:ring-[var(--ht-primary)]",
			filled: "bg-[var(--ht-bg-subtle)] text-[var(--ht-text)] hover:bg-[var(--ht-cell-hover)] focus-visible:ring-[var(--ht-primary)]",
			primary: "bg-[var(--ht-primary)] text-[var(--ht-text-inverse)] hover:bg-[var(--ht-primary-hover)] focus-visible:ring-[var(--ht-primary)]",
			secondary: "bg-[var(--ht-bg-subtle)] text-[var(--ht-text)] border border-[var(--ht-border-strong)] hover:bg-[var(--ht-cell-hover)] focus-visible:ring-[var(--ht-primary)]",
			outline: "border border-[var(--ht-border-strong)] text-[var(--ht-text)] bg-transparent hover:bg-[var(--ht-cell-hover)] focus-visible:ring-[var(--ht-primary)]",
			ghost: "bg-transparent text-[var(--ht-text)] hover:bg-[var(--ht-cell-hover)] focus-visible:ring-[var(--ht-primary)]",
			destructive: "bg-[var(--ht-danger)] text-[var(--ht-text-inverse)] hover:bg-[var(--ht-danger)]/90 focus-visible:ring-[var(--ht-danger)]",
			link: "bg-transparent text-[var(--ht-primary)] underline-offset-4 hover:underline focus-visible:ring-[var(--ht-primary)]"
		}, i = {
			micro: "h-6 px-1.5 text-xs gap-1",
			xs: "h-7 px-2 text-xs",
			sm: "h-8 px-2.5 text-sm",
			md: "h-9 px-3 text-sm",
			lg: "h-11 px-4 text-base",
			"icon-micro": "size-6 p-0",
			"icon-xs": "size-7 p-0",
			"icon-sm": "size-8 p-0",
			icon: "size-9 p-0",
			"icon-lg": "size-11 p-0"
		}, a = computed(() => [
			n,
			r[t.variant],
			i[t.size],
			t.block ? "w-full" : ""
		].join(" "));
		return (e, n) => (openBlock(), createElementBlock("button", {
			type: t.type,
			disabled: t.disabled || t.loading,
			class: normalizeClass(a.value)
		}, [t.loading ? (openBlock(), createElementBlock("span", _hoisted_2$26, [...n[0] ||= [createElementVNode("svg", {
			class: "animate-spin w-4 h-4",
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24"
		}, [createElementVNode("circle", {
			class: "opacity-25",
			cx: "12",
			cy: "12",
			r: "10",
			stroke: "currentColor",
			"stroke-width": "4"
		}), createElementVNode("path", {
			class: "opacity-75",
			fill: "currentColor",
			d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		})], -1)]])) : createCommentVNode("", !0), renderSlot(e.$slots, "default", {}, () => [createTextVNode(toDisplayString(t.label || "Button"), 1)])], 10, _hoisted_1$39));
	}
}), _hoisted_1$38 = { class: "relative inline-flex items-center w-full" }, _hoisted_2$25 = {
	key: 0,
	class: "absolute left-3 flex items-center pointer-events-none text-[var(--ht-text-muted)]"
}, _hoisted_3$19 = [
	"id",
	"type",
	"value",
	"placeholder",
	"disabled",
	"readonly",
	"required",
	"autocomplete",
	"maxlength",
	"minlength",
	"pattern",
	"aria-invalid",
	"aria-describedby",
	"aria-errormessage",
	"aria-required"
], _hoisted_4$16 = {
	key: 1,
	class: "absolute right-3 flex items-center"
}, _hoisted_5$13 = {
	key: 1,
	class: "text-[var(--ht-text-muted)]"
}, HtInput_default = /* @__PURE__ */ defineComponent({
	__name: "HtInput",
	props: {
		modelValue: {},
		type: { default: "text" },
		placeholder: {},
		disabled: { type: Boolean },
		readonly: { type: Boolean },
		clearable: {
			type: Boolean,
			default: !1
		},
		autocomplete: {},
		maxlength: {},
		minlength: {},
		pattern: {},
		required: { type: Boolean },
		variant: { default: "default" },
		size: { default: "md" },
		state: { default: "default" }
	},
	emits: [
		"update:modelValue",
		"clear",
		"focus",
		"blur",
		"keydown"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = useId(), a = useAttrs(), o = [
			"rounded-md transition-colors outline-none",
			"focus-visible:ring-1 focus-visible:ring-offset-1",
			"disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
			"placeholder:text-[var(--ht-text-subtle)]"
		].join(" "), s = {
			default: "bg-[var(--ht-bg)] border border-[var(--ht-border-strong)] text-[var(--ht-text)] hover:border-[var(--ht-text)]/60",
			filled: "bg-[var(--ht-bg-subtle)] border border-transparent text-[var(--ht-text)]",
			outline: "bg-transparent border border-[var(--ht-border-strong)] text-[var(--ht-text)] hover:border-[var(--ht-text)]/60",
			ghost: "bg-transparent border border-transparent text-[var(--ht-text)] hover:bg-[var(--ht-bg-subtle)]"
		}, c = {
			sm: "h-[var(--size-ht-input-sm)] px-2.5 text-sm",
			md: "h-[var(--size-ht-input-md)] px-3 text-sm",
			lg: "h-[var(--size-ht-input-lg)] px-4 text-base"
		}, l = {
			default: "focus-visible:ring-[var(--ht-primary)]",
			error: "border-[var(--ht-danger)] focus-visible:ring-[var(--ht-danger)]",
			success: "border-[var(--ht-success)] focus-visible:ring-[var(--ht-success)]",
			warning: "border-[var(--ht-warning)] focus-visible:ring-[var(--ht-warning)]"
		}, u = computed(() => [
			o,
			s[n.variant],
			c[n.size],
			l[n.state]
		].join(" ")), d = computed(() => n.modelValue === void 0 || n.modelValue === null ? !1 : typeof n.modelValue == "string" ? n.modelValue.length > 0 : typeof n.modelValue == "number" ? !isNaN(n.modelValue) : !0), f = (e) => {
			let t = e.target, i = n.type === "number" ? t.valueAsNumber || 0 : t.value;
			r("update:modelValue", i);
		}, p = () => {
			r("update:modelValue", n.type === "number" ? 0 : ""), r("clear");
		}, m = (e) => {
			r("keydown", e), e.key === "Escape" && n.clearable && d.value && (p(), e.preventDefault());
		};
		return (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$38, [
			t.$slots.prefix ? (openBlock(), createElementBlock("div", _hoisted_2$25, [renderSlot(t.$slots, "prefix")])) : createCommentVNode("", !0),
			createElementVNode("input", mergeProps({
				id: unref(i),
				type: e.type,
				value: e.modelValue,
				class: [
					u.value,
					"w-full",
					t.$slots.prefix ? "pl-10" : "",
					e.clearable || t.$slots.suffix ? "pr-10" : ""
				],
				placeholder: e.placeholder,
				disabled: e.disabled,
				readonly: e.readonly,
				required: e.required,
				autocomplete: e.autocomplete,
				maxlength: e.maxlength,
				minlength: e.minlength,
				pattern: e.pattern,
				"aria-invalid": e.state === "error",
				"aria-describedby": unref(a)["aria-describedby"],
				"aria-errormessage": unref(a)["aria-errormessage"],
				"aria-required": e.required
			}, t.$attrs, {
				onInput: f,
				onFocus: n[0] ||= (e) => r("focus", e),
				onBlur: n[1] ||= (e) => r("blur", e),
				onKeydown: m
			}), null, 16, _hoisted_3$19),
			e.clearable || t.$slots.suffix ? (openBlock(), createElementBlock("div", _hoisted_4$16, [e.clearable && d.value && !e.disabled && !e.readonly ? (openBlock(), createElementBlock("button", {
				key: 0,
				type: "button",
				class: "text-[var(--ht-text-muted)] hover:text-[var(--ht-text)] transition-colors",
				"aria-label": "Clear input",
				tabindex: "-1",
				onClick: p
			}, [...n[2] ||= [createElementVNode("svg", {
				class: "w-4 h-4",
				fill: "currentColor",
				viewBox: "0 0 20 20"
			}, [createElementVNode("path", {
				"fill-rule": "evenodd",
				d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
				"clip-rule": "evenodd"
			})], -1)]])) : t.$slots.suffix ? (openBlock(), createElementBlock("div", _hoisted_5$13, [renderSlot(t.$slots, "suffix")])) : createCommentVNode("", !0)])) : createCommentVNode("", !0)
		]));
	}
}), _hoisted_1$37 = { class: "ht-checkbox-wrapper inline-flex items-start gap-2" }, _hoisted_2$24 = [
	"id",
	"name",
	"value",
	"checked",
	"disabled",
	"required",
	"aria-checked",
	"aria-invalid",
	"aria-required"
], _hoisted_3$18 = ["for"], _hoisted_4$15 = {
	key: 0,
	class: "ht-checkbox-label-container flex-1"
}, _hoisted_5$12 = ["for"], HtCheckbox_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HtCheckbox",
	props: {
		modelValue: {
			type: [Boolean, String],
			default: !1
		},
		value: {},
		disabled: { type: Boolean },
		required: { type: Boolean },
		indeterminate: {
			type: Boolean,
			default: !1
		},
		label: {},
		description: {},
		name: {},
		variant: { default: "default" },
		size: { default: "md" },
		state: { default: "default" }
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = useId(), a = computed(() => n.indeterminate || n.modelValue === "indeterminate" ? !1 : n.modelValue === !0), o = computed(() => n.indeterminate || n.modelValue === "indeterminate"), s = [
			"inline-flex items-center justify-center",
			"rounded-sm border-[1px]",
			"cursor-pointer",
			"transition-all duration-200",
			"will-change-auto"
		].join(" "), c = {
			default: "border-[var(--ht-text)] bg-[var(--ht-bg)]",
			filled: "border-[var(--ht-text)] bg-[var(--ht-bg-subtle)]",
			outline: "border-[var(--ht-text)] bg-transparent",
			ghost: "border-[var(--ht-text)] bg-transparent"
		}, l = {
			default: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90 text-[var(--ht-text-inverse)]",
			filled: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90 text-[var(--ht-text-inverse)]",
			outline: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90 text-[var(--ht-text-inverse)]",
			ghost: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90 text-[var(--ht-text-inverse)]"
		}, u = {
			default: "border-[var(--ht-text-subtle)] bg-[var(--ht-bg)]",
			filled: "border-[var(--ht-text-subtle)] bg-[var(--ht-bg-subtle)]",
			outline: "border-[var(--ht-text-subtle)] bg-transparent",
			ghost: "border-[var(--ht-text-subtle)] bg-transparent"
		}, d = {
			default: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10 text-[var(--ht-text-subtle)]",
			filled: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10 text-[var(--ht-text-subtle)]",
			outline: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10 text-[var(--ht-text-subtle)]",
			ghost: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10 text-[var(--ht-text-subtle)]"
		}, f = [
			"opacity-40",
			"cursor-not-allowed",
			"pointer-events-none"
		].join(" "), p = {
			sm: "w-4 h-4",
			md: "w-5 h-5",
			lg: "w-6 h-6"
		}, m = {
			default: "focus-visible:ring-[var(--ht-primary)]",
			error: "border-[var(--ht-danger)] focus-visible:ring-[var(--ht-danger)]",
			success: "border-[var(--ht-success)] focus-visible:ring-[var(--ht-success)]",
			warning: "border-[var(--ht-warning)] focus-visible:ring-[var(--ht-warning)]"
		}, h = computed(() => {
			let e = a.value || o.value, t;
			return t = n.disabled ? e ? d[n.variant] ?? "" : u[n.variant] ?? "" : e ? l[n.variant] ?? "" : c[n.variant] ?? "", [
				s,
				n.disabled ? f : "",
				t,
				p[n.size],
				m[n.state]
			].join(" ");
		}), g = computed(() => ({
			sm: "w-3 h-3",
			md: "w-4 h-4",
			lg: "w-5 h-5"
		})[n.size]), _ = computed(() => ({
			sm: "mt-[-4px]",
			md: "mt-[-1px]",
			lg: "mt-[2px]"
		})[n.size]), v = computed(() => ({
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base"
		})[n.size]), y = computed(() => ({
			sm: "text-[11px]",
			md: "text-xs",
			lg: "text-sm"
		})[n.size]), b = (e) => {
			if (n.disabled) return;
			let t = e.target.checked;
			r("update:modelValue", t), r("change", t, e);
		}, w = (e) => {
			if (e.preventDefault(), n.disabled) return;
			let t = !a.value;
			r("update:modelValue", t), r("change", t, e);
		}, T = (e) => {
			e.key === " " && (e.preventDefault(), e.target.click());
		};
		return (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$37, [createElementVNode("div", { class: normalizeClass(["ht-checkbox-container relative flex-shrink-0", _.value]) }, [createElementVNode("input", {
			id: unref(i),
			type: "checkbox",
			name: e.name,
			value: e.value,
			checked: a.value,
			disabled: e.disabled,
			required: e.required,
			"aria-checked": o.value ? "mixed" : a.value,
			"aria-invalid": e.state === "error",
			"aria-required": e.required,
			class: "sr-only peer",
			onChange: b,
			onKeydown: T
		}, null, 40, _hoisted_2$24), createElementVNode("label", {
			for: unref(i),
			class: normalizeClass(h.value),
			onClick: w
		}, [
			withDirectives((openBlock(), createElementBlock("svg", {
				class: normalizeClass(g.value),
				fill: "none",
				viewBox: "0 0 24 24",
				stroke: "currentColor",
				"stroke-width": "3",
				"aria-hidden": "true"
			}, [...n[0] ||= [createElementVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M5 13l4 4L19 7"
			}, null, -1)]], 2)), [[vShow, a.value && !o.value]]),
			withDirectives((openBlock(), createElementBlock("svg", {
				class: normalizeClass(g.value),
				fill: "none",
				viewBox: "0 0 24 24",
				stroke: "currentColor",
				"stroke-width": "3",
				"aria-hidden": "true"
			}, [...n[1] ||= [createElementVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				d: "M6 12h12"
			}, null, -1)]], 2)), [[vShow, o.value]]),
			withDirectives(createElementVNode("span", {
				class: normalizeClass(g.value),
				"aria-hidden": "true"
			}, null, 2), [[vShow, !a.value && !o.value]])
		], 10, _hoisted_3$18)], 2), e.label || e.description || t.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_4$15, [e.label || t.$slots.default ? (openBlock(), createElementBlock("label", {
			key: 0,
			for: unref(i),
			class: normalizeClass([
				v.value,
				"font-medium text-[var(--ht-text)] cursor-pointer select-none block leading-snug",
				{ "opacity-50": e.disabled }
			])
		}, [renderSlot(t.$slots, "default", {}, () => [createTextVNode(toDisplayString(e.label), 1)], !0)], 10, _hoisted_5$12)) : createCommentVNode("", !0), e.description || t.$slots.description ? (openBlock(), createElementBlock("p", {
			key: 1,
			class: normalizeClass([
				y.value,
				"text-[var(--ht-text-muted)] mt-1 leading-snug",
				{ "opacity-50": e.disabled }
			])
		}, [renderSlot(t.$slots, "description", {}, () => [createTextVNode(toDisplayString(e.description), 1)], !0)], 2)) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]));
	}
}), __plugin_vue_export_helper_default = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, HtCheckbox_default = /* @__PURE__ */ __plugin_vue_export_helper_default(HtCheckbox_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bd13cb08"]]), _hoisted_1$36 = { class: "ht-radio-wrapper inline-flex items-start gap-2" }, _hoisted_2$23 = [
	"id",
	"name",
	"value",
	"checked",
	"disabled",
	"required",
	"aria-checked",
	"aria-invalid",
	"aria-required"
], _hoisted_3$17 = ["for"], _hoisted_4$14 = {
	key: 0,
	class: "ht-radio-label-container flex-1"
}, _hoisted_5$11 = ["for"], HtRadio_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HtRadio",
	props: {
		modelValue: {},
		value: {},
		variant: { default: "default" },
		size: { default: "md" },
		state: { default: "default" },
		disabled: { type: Boolean },
		required: { type: Boolean },
		label: {},
		description: {},
		name: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = useId(), a = computed(() => n.modelValue === n.value), o = [
			"inline-flex items-center justify-center",
			"rounded-full border-[1px]",
			"cursor-pointer",
			"transition-all duration-200",
			"will-change-auto"
		].join(" "), s = {
			default: "border-[var(--ht-text)] bg-[var(--ht-bg)]",
			filled: "border-[var(--ht-text)] bg-[var(--ht-bg-subtle)]",
			outline: "border-[var(--ht-text)] bg-transparent",
			ghost: "border-[var(--ht-text)] bg-transparent"
		}, c = {
			default: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90",
			filled: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90",
			outline: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90",
			ghost: "border-[var(--ht-primary)] bg-[var(--ht-primary)]/90"
		}, l = {
			default: "border-[var(--ht-text-subtle)] bg-[var(--ht-bg)]",
			filled: "border-[var(--ht-text-subtle)] bg-[var(--ht-bg-subtle)]",
			outline: "border-[var(--ht-text-subtle)] bg-transparent",
			ghost: "border-[var(--ht-text-subtle)] bg-transparent"
		}, u = {
			default: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10",
			filled: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10",
			outline: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10",
			ghost: "border-[var(--ht-text-subtle)] bg-[var(--ht-text-subtle)]/10"
		}, d = [
			"opacity-40",
			"cursor-not-allowed",
			"pointer-events-none"
		].join(" "), f = {
			sm: "w-4 h-4",
			md: "w-5 h-5",
			lg: "w-6 h-6"
		}, p = {
			sm: "w-2 h-2",
			md: "w-2.5 h-2.5",
			lg: "w-3 h-3"
		}, m = {
			default: "focus-visible:ring-[var(--ht-primary)]",
			error: "border-[var(--ht-danger)] focus-visible:ring-[var(--ht-danger)]",
			success: "border-[var(--ht-success)] focus-visible:ring-[var(--ht-success)]",
			warning: "border-[var(--ht-warning)] focus-visible:ring-[var(--ht-warning)]"
		}, h = computed(() => {
			let e;
			return e = n.disabled ? a.value ? u[n.variant] ?? "" : l[n.variant] ?? "" : a.value ? c[n.variant] ?? "" : s[n.variant] ?? "", [
				o,
				n.disabled ? d : "",
				e,
				f[n.size],
				m[n.state]
			].join(" ");
		}), g = computed(() => ({
			sm: "mt-[-5px]",
			md: "mt-[-2px]",
			lg: "mt-[0px]"
		})[n.size]), _ = computed(() => ({
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base"
		})[n.size]), v = computed(() => ({
			sm: "text-[11px]",
			md: "text-xs",
			lg: "text-sm"
		})[n.size]), y = computed(() => [
			p[n.size],
			"rounded-full transition-transform",
			n.disabled ? "bg-[var(--ht-text-subtle)]" : "bg-[var(--ht-text-inverse)]"
		].join(" ")), b = (e) => {
			n.disabled || (r("update:modelValue", n.value), r("change", n.value, e));
		}, w = (e) => {
			e.preventDefault(), !n.disabled && (r("update:modelValue", n.value), r("change", n.value, e));
		}, T = (e) => {
			e.key === " " && (e.preventDefault(), e.target.click());
		};
		return (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$36, [createElementVNode("div", { class: normalizeClass(["ht-radio-container relative flex-shrink-0", g.value]) }, [createElementVNode("input", {
			id: unref(i),
			type: "radio",
			name: e.name,
			value: e.value,
			checked: a.value,
			disabled: e.disabled,
			required: e.required,
			"aria-checked": a.value,
			"aria-invalid": e.state === "error",
			"aria-required": e.required,
			class: "sr-only peer",
			onChange: b,
			onKeydown: T
		}, null, 40, _hoisted_2$23), createElementVNode("label", {
			for: unref(i),
			class: normalizeClass(h.value),
			onClick: w
		}, [withDirectives(createElementVNode("span", {
			class: normalizeClass(y.value),
			"aria-hidden": "true"
		}, null, 2), [[vShow, a.value]]), withDirectives(createElementVNode("span", {
			class: normalizeClass(p[e.size]),
			"aria-hidden": "true"
		}, null, 2), [[vShow, !a.value]])], 10, _hoisted_3$17)], 2), e.label || e.description || t.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_4$14, [e.label || t.$slots.default ? (openBlock(), createElementBlock("label", {
			key: 0,
			for: unref(i),
			class: normalizeClass([
				_.value,
				"font-medium text-[var(--ht-text)] cursor-pointer select-none block leading-snug",
				{ "opacity-50": e.disabled }
			])
		}, [renderSlot(t.$slots, "default", {}, () => [createTextVNode(toDisplayString(e.label), 1)], !0)], 10, _hoisted_5$11)) : createCommentVNode("", !0), e.description || t.$slots.description ? (openBlock(), createElementBlock("p", {
			key: 1,
			class: normalizeClass([
				v.value,
				"text-[var(--ht-text-muted)] mt-1 leading-snug",
				{ "opacity-50": e.disabled }
			])
		}, [renderSlot(t.$slots, "description", {}, () => [createTextVNode(toDisplayString(e.description), 1)], !0)], 2)) : createCommentVNode("", !0)])) : createCommentVNode("", !0)]));
	}
}), HtRadio_default = /* @__PURE__ */ __plugin_vue_export_helper_default(HtRadio_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b9cc1c9f"]]), SELECT_CONTEXT_KEY = Symbol("HtSelect"), SELECT_PROPS_KEY = Symbol("HtSelectProps");
const SELECT_GROUP_KEY = Symbol("HtSelectGroup");
function provideSelectContext(e, t) {
	let n = ref(!1), r = ref(e.modelValue), i = ref(-1), a = ref(null), o = ref(""), s = ref([]), c = generateIdGroup("ht-select", ["triggerId", "contentId"]), l = ref(/* @__PURE__ */ new Map()), u = computed(() => s.value.filter((e) => !e.disabled).map((e) => e.index));
	function d(e) {
		i.value = typeof e == "number" && e >= 0 ? e : -1;
	}
	let f = () => {
		d(null);
	}, p = (e) => s.value.find((t) => t.index === e && !t.disabled), m = () => {
		let [e] = u.value;
		d(e ?? null);
	}, h = () => {
		let e = u.value, t = e[e.length - 1];
		d(typeof t == "number" ? t : null);
	}, g = (e) => {
		let t = u.value;
		if (!t.length) {
			d(null);
			return;
		}
		let n = i.value, r = t.indexOf(n);
		if (r === -1) {
			d(e === 1 ? t[0] : t[t.length - 1]);
			return;
		}
		let a = (r + e + t.length) % t.length;
		d(t[a]);
	}, _ = () => {
		let e = p(i.value);
		e && S(e.value);
	}, v = (e = !1) => {
		if (!u.value.length) {
			f();
			return;
		}
		if (e && p(i.value)) return;
		let t = s.value.find((e) => !e.disabled && C(e.value));
		if (t) {
			d(t.index);
			return;
		}
		m();
	};
	watch(() => e.modelValue, (e) => {
		r.value = e;
	});
	let y = () => {
		e.disabled || (n.value = !n.value);
	}, b = () => {
		n.value = !1, f(), o.value = "", e.searchable || nextTick(() => {
			a.value && a.value.focus();
		});
	}, x = () => {
		e.disabled || (n.value = !0);
	}, S = (e) => {
		r.value = e, t("update:modelValue", e), t("change", e), b();
	}, C = (t) => {
		let n = r.value;
		return n == null ? !1 : e.by && typeof e.by == "function" ? e.by(n, t) : e.by && typeof e.by == "string" ? n?.[e.by] === t?.[e.by] : n === t;
	}, w = {
		open: n,
		selectedValue: r,
		highlightedIndex: i,
		triggerRef: a,
		optionsMap: l,
		inputValue: o,
		ids: c,
		toggle: y,
		close: b,
		openDropdown: x,
		select: S,
		isSelected: C,
		registerOption: (e, t) => {
			l.value.set(e, t);
		},
		unregisterOption: (e) => {
			l.value.delete(e);
		},
		setNavigableOptions: (e) => {
			s.value = e, n.value ? v(!0) : f();
		},
		moveHighlight: g,
		highlightFirst: m,
		highlightLast: h,
		selectHighlighted: _,
		clearHighlight: f
	};
	return watch(r, () => {
		n.value && v();
	}), watch(() => n.value, (e) => {
		e ? nextTick(() => {
			v();
		}) : f();
	}), provide(SELECT_CONTEXT_KEY, w), w;
}
function injectSelectContext() {
	let e = inject(SELECT_CONTEXT_KEY);
	if (!e) throw Error("useSelectContext must be used within HtSelect");
	return e;
}
function provideSelectProps(e) {
	provide(SELECT_PROPS_KEY, e);
}
function injectSelectProps() {
	return inject(SELECT_PROPS_KEY, {
		size: "md",
		variant: "outline",
		state: "default",
		disabled: !1
	});
}
function useDebounceFn(e, t) {
	let n = null, r = (...r) => {
		n !== null && clearTimeout(n), n = setTimeout(() => {
			e(...r), n = null;
		}, t);
	};
	return r.cancel = () => {
		n !== null && (clearTimeout(n), n = null);
	}, r;
}
function useAsyncSource(e, t, n) {
	let r = ref({
		loading: !1,
		error: null,
		abortController: null
	}), i = ref(/* @__PURE__ */ new Map()), a = ref([]), o = (e) => `async-source:${e.toLowerCase().trim()}`, s = async (t) => {
		let n = o(t);
		if (e.cacheStrategy === "memory" || !e.cacheStrategy) return i.value.get(n) || null;
		if (e.cacheStrategy === "session") {
			let e = sessionStorage.getItem(n);
			return e ? JSON.parse(e) : null;
		}
		return e.cacheStrategy === "custom" && e.cache ? await e.cache.get(n) : null;
	}, c = async (t, n) => {
		let r = o(t);
		if (e.cacheStrategy === "memory" || !e.cacheStrategy) {
			i.value.set(r, n);
			return;
		}
		if (e.cacheStrategy === "session") {
			sessionStorage.setItem(r, JSON.stringify(n));
			return;
		}
		e.cacheStrategy === "custom" && e.cache && await e.cache.set(r, n);
	}, l = async (t) => {
		r.value.abortController && r.value.abortController.abort();
		let i = await s(t);
		if (i) {
			a.value = i;
			return;
		}
		let o = new AbortController();
		r.value = {
			loading: !0,
			error: null,
			abortController: o
		}, n("loading-start", t);
		try {
			let i = await e.source(t, o.signal);
			if (o.signal.aborted) return;
			a.value = i, await c(t, i), r.value = {
				loading: !1,
				error: null,
				abortController: null
			}, n("loading-end", i, t);
		} catch (i) {
			if (i instanceof Error && i.name === "AbortError") return;
			let a = i instanceof Error ? i : Error(String(i));
			r.value = {
				loading: !1,
				error: a,
				abortController: null
			}, n("loading-error", a, t), e.onError && e.onError(a);
		}
	}, u = useDebounceFn(l, e.debounce ?? 250), d = computed(() => {
		let n = e.searchThreshold ?? 0;
		return t.value.length >= n;
	});
	return watch(() => t.value, (e) => {
		if (!d.value) {
			a.value = [];
			return;
		}
		u(e);
	}, { immediate: !1 }), {
		loading: computed(() => r.value.loading),
		error: computed(() => r.value.error),
		options: computed(() => a.value),
		loadOptions: l,
		cleanup: () => {
			r.value.abortController && r.value.abortController.abort(), i.value.clear();
		},
		clearCache: () => i.value.clear()
	};
}
var _hoisted_1$35 = { class: "ht-combobox-tag__text" }, _hoisted_2$22 = [
	"id",
	"value",
	"disabled",
	"placeholder",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant"
], _hoisted_3$16 = { class: "ht-combobox-suffix" }, HtSelectTrigger_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "HtSelectTrigger",
	setup(e) {
		let t = injectSelectContext(), n = injectSelectProps(), r = ref(null), i = ref(null), a = computed(() => {
			let e = t.selectedValue.value;
			return e == null ? "" : t.optionsMap.value.get(e) || "";
		}), o = computed(() => t.selectedValue.value !== void 0 && t.selectedValue.value !== null), s = ref(!1), c = computed(() => {
			let e = t.highlightedIndex.value;
			if (!(!n.searchable || !t.open.value || e < 0)) return `${t.ids.contentId}-opt-${e}`;
		}), l = (e) => {
			t.open.value || t.openDropdown(), t.inputValue.value = String(e), s.value = !1;
		}, u = () => {}, d = (e) => {
			e.preventDefault(), e.stopPropagation(), t.toggle();
		}, f = (e) => {
			e.preventDefault(), e.stopPropagation(), t.select(null), t.inputValue.value = "", s.value = !1;
			let n = document.getElementById(t.ids.triggerId);
			n && n.focus();
		}, p = (e) => {
			if (!n.disabled) {
				if (e.key === "Backspace") {
					if (!t.inputValue.value && o.value) {
						e.preventDefault(), s.value ? (t.select(null), t.inputValue.value = "", s.value = !1) : s.value = !0;
						return;
					}
				} else s.value = !1;
				switch (e.key) {
					case "ArrowDown":
						e.preventDefault(), t.open.value ? t.moveHighlight(1) : (t.openDropdown(), t.highlightFirst());
						break;
					case "ArrowUp":
						e.preventDefault(), t.open.value ? t.moveHighlight(-1) : (t.openDropdown(), t.highlightLast());
						break;
					case "Home":
						t.open.value && (e.preventDefault(), t.highlightFirst());
						break;
					case "End":
						t.open.value && (e.preventDefault(), t.highlightLast());
						break;
					case "Enter":
						t.open.value && (e.preventDefault(), t.selectHighlighted());
						break;
					case "Escape":
						t.open.value && (e.preventDefault(), t.close());
						break;
					case "Tab":
						t.open.value && t.close();
						break;
					default:
						s.value = !1;
						break;
				}
			}
		}, m = (e) => {
			if (!n.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), t.open.value ? t.moveHighlight(1) : (t.openDropdown(), t.highlightFirst());
					break;
				case "ArrowUp":
					e.preventDefault(), t.open.value ? t.moveHighlight(-1) : (t.openDropdown(), t.highlightLast());
					break;
				case "Home":
					t.open.value && (e.preventDefault(), t.highlightFirst());
					break;
				case "End":
					t.open.value && (e.preventDefault(), t.highlightLast());
					break;
				case "Enter":
				case " ":
				case "Space":
				case "Spacebar":
					e.preventDefault(), t.open.value ? t.selectHighlighted() : (t.openDropdown(), t.highlightFirst());
					break;
				case "Escape":
					t.open.value && (e.preventDefault(), t.close());
					break;
				case "Tab":
					t.open.value && t.close();
					break;
				default:
					s.value = !1;
					break;
			}
		};
		return watch(() => t.selectedValue.value, () => {
			s.value = !1;
		}), onMounted(() => {
			n.searchable ? i.value && (t.triggerRef.value = i.value) : r.value && r.value.$el && (t.triggerRef.value = r.value.$el);
		}), (e, h) => unref(n).searchable ? (openBlock(), createElementBlock("div", {
			key: 0,
			ref_key: "comboboxTriggerRef",
			ref: i,
			class: normalizeClass(["ht-combobox-trigger", {
				"ht-combobox-trigger--disabled": unref(n).disabled,
				"ht-combobox-trigger--open": unref(t).open.value,
				[`ht-combobox-trigger--${unref(n).size}`]: unref(n).size,
				[`ht-combobox-trigger--${unref(n).variant}`]: unref(n).variant,
				[`ht-combobox-trigger--${unref(n).state}`]: unref(n).state
			}])
		}, [
			o.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(["ht-combobox-tag", { "ht-combobox-tag--pending-clear": s.value }])
			}, [createElementVNode("span", _hoisted_1$35, toDisplayString(a.value), 1), unref(n).disabled ? createCommentVNode("", !0) : (openBlock(), createElementBlock("button", {
				key: 0,
				type: "button",
				class: "ht-combobox-tag__close",
				"aria-label": "Clear selection",
				tabindex: "-1",
				onClick: f
			}, [...h[2] ||= [createElementVNode("svg", {
				class: "w-3 h-3",
				fill: "currentColor",
				viewBox: "0 0 20 20"
			}, [createElementVNode("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })], -1)]]))], 2)) : createCommentVNode("", !0),
			createElementVNode("input", {
				id: unref(t).ids.triggerId,
				type: "text",
				value: unref(t).inputValue.value,
				disabled: unref(n).disabled,
				placeholder: o.value ? "" : unref(n).placeholder,
				class: "ht-combobox-input",
				role: "combobox",
				"aria-expanded": unref(t).open.value ? "true" : "false",
				"aria-haspopup": "listbox",
				"aria-controls": unref(t).ids.contentId,
				"aria-autocomplete": "list",
				"aria-activedescendant": c.value,
				onInput: h[0] ||= (e) => l(e.target.value),
				onFocus: u,
				onKeydown: p
			}, null, 40, _hoisted_2$22),
			createElementVNode("div", _hoisted_3$16, [(openBlock(), createElementBlock("svg", {
				class: normalizeClass(["h-4 w-4 transition-transform cursor-pointer", { "rotate-180": unref(t).open.value }]),
				fill: "none",
				stroke: "currentColor",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				onClick: d
			}, [...h[3] ||= [createElementVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2",
				d: "M19 9l-7 7-7-7"
			}, null, -1)]], 2))])
		], 2)) : (openBlock(), createBlock(HtButton_default, {
			key: 1,
			ref_key: "buttonComponentRef",
			ref: r,
			type: "button",
			id: unref(t).ids.triggerId,
			role: "button",
			"aria-expanded": unref(t).open.value ? "true" : "false",
			"aria-haspopup": "listbox",
			"aria-controls": unref(t).ids.contentId,
			size: unref(n).size,
			variant: unref(n).variant,
			disabled: unref(n).disabled,
			class: "w-full justify-between",
			onClick: h[1] ||= (e) => unref(t).toggle(),
			onKeydown: m
		}, {
			default: withCtx(() => [renderSlot(e.$slots, "default", {}, void 0, !0), (openBlock(), createElementBlock("svg", {
				class: normalizeClass(["w-4 h-4 ml-2 shrink-0 transition-transform", { "rotate-180": unref(t).open.value }]),
				fill: "none",
				stroke: "currentColor",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg"
			}, [...h[4] ||= [createElementVNode("path", {
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"stroke-width": "2",
				d: "M19 9l-7 7-7-7"
			}, null, -1)]], 2))]),
			_: 3
		}, 8, [
			"id",
			"aria-expanded",
			"aria-controls",
			"size",
			"variant",
			"disabled"
		]));
	}
}), [["__scopeId", "data-v-f8f84f42"]]), HtSelectValue_default = /* @__PURE__ */ defineComponent({
	__name: "HtSelectValue",
	props: { placeholder: { default: "Select..." } },
	setup(e) {
		let t = e, n = injectSelectContext(), r = computed(() => {
			let e = n.selectedValue.value;
			return e == null ? t.placeholder : n.optionsMap.value.get(e) || (typeof e == "object" && e && "label" in e ? e.label : String(e));
		}), i = computed(() => n.selectedValue.value != null);
		return (e, t) => (openBlock(), createElementBlock("span", { class: normalizeClass(["flex-1 text-left truncate", { "text-[var(--ht-text-muted)]": !i.value }]) }, toDisplayString(r.value), 3));
	}
}), _hoisted_1$34 = [
	"role",
	"aria-modal",
	"aria-label"
], BasePopover_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BasePopover",
	props: {
		open: { type: Boolean },
		anchor: { default: null },
		position: { default: () => ({
			placement: "bottom",
			align: "center",
			offset: 4,
			autoFlip: !0
		}) },
		role: { default: "dialog" },
		ariaLabel: { default: "" },
		closeOnClickOutside: {
			type: Boolean,
			default: !0
		},
		closeOnEscape: {
			type: Boolean,
			default: !0
		},
		trapFocus: {
			type: Boolean,
			default: !0
		},
		keepAlive: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:open",
		"close",
		"opened",
		"closed"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ref(null), a = ref({
			position: "fixed",
			top: "-10000px",
			left: "-10000px",
			transform: "none",
			zIndex: "1000"
		}), o = ref(!1);
		function s() {
			let e = n.anchor, t = i.value;
			if (!e || !t) return;
			let r = e.getBoundingClientRect(), s = t.getBoundingClientRect(), c = window.innerWidth, l = window.innerHeight;
			if (r.bottom < 0 || r.top > l) {
				f();
				return;
			}
			let { placement: u = "bottom", align: d = "center", offset: p = 4, autoFlip: m = !0 } = n.position || {}, h = 0, g, _ = 0;
			switch (u) {
				case "bottom":
					h = r.bottom + p, _ = r.left + (d === "center" ? r.width / 2 - s.width / 2 : d === "end" ? r.width - s.width : 0);
					break;
				case "top":
					g = l - r.top + p, _ = r.left + (d === "center" ? r.width / 2 - s.width / 2 : d === "end" ? r.width - s.width : 0);
					break;
				case "left":
					h = r.top + (d === "center" ? r.height / 2 - s.height / 2 : d === "end" ? r.height - s.height : 0), _ = r.left - s.width - p;
					break;
				case "right":
					h = r.top + (d === "center" ? r.height / 2 - s.height / 2 : d === "end" ? r.height - s.height : 0), _ = r.right + p;
					break;
			}
			m && (u === "bottom" && h + s.height > l ? (g = l - r.top + p, h = 0) : u === "top" && g !== void 0 && l - g + s.height > l && (h = r.bottom + p, g = void 0)), _ < 8 && (_ = 8), _ + s.width > c - 8 && (_ = c - 8 - s.width), g === void 0 ? (h < 8 && (h = 8), h + s.height > l - 8 && (h = Math.max(8, l - 8 - s.height))) : (g < 8 && (g = 8), l - g - s.height < 8 && (g = Math.max(8, l - 8 - s.height))), a.value = {
				position: "fixed",
				...g === void 0 ? { top: `${h}px` } : { bottom: `${g}px` },
				left: `${_}px`,
				transform: "none",
				zIndex: "1000"
			}, o.value = !0;
		}
		function c() {
			let e = [
				"button:not([disabled])",
				"input:not([disabled])",
				"select:not([disabled])",
				"textarea:not([disabled])",
				"[tabindex]:not([tabindex=\"-1\"])"
			].join(",");
			return i.value ? Array.from(i.value.querySelectorAll(e)).filter((e) => e.offsetParent !== null) : [];
		}
		function l() {
			if (!n.trapFocus) return;
			let e = c()[0];
			if (e) try {
				e.focus();
			} catch {}
		}
		function u(e) {
			if (!n.trapFocus) return;
			let t = c();
			if (t.length === 0) return;
			let r = t[0], a = t[t.length - 1], o = document.activeElement;
			e.shiftKey ? (!o || o === r || !i.value?.contains(o)) && (e.preventDefault(), a && a.focus()) : (!o || o === a || !i.value?.contains(o)) && (e.preventDefault(), r && r.focus());
		}
		function d(e) {
			e.key === "Escape" && n.closeOnEscape ? (e.preventDefault(), e.stopPropagation(), f()) : e.key === "Tab" && u(e);
		}
		function f() {
			r("update:open", !1), r("close");
		}
		let p = [], m = null;
		return watch(() => n.anchor, (e) => {
			e && n.open && nextTick(() => {
				s();
			});
		}, { immediate: !1 }), watch(() => n.open, (e) => {
			if (e) {
				o.value = !1, nextTick(() => {
					s(), requestAnimationFrame(() => {
						l(), r("opened");
					});
				});
				let e = (e) => {
					if (!n.closeOnClickOutside) return;
					let t = e.target;
					n.anchor?.contains(t) || i.value?.contains(t) || f();
				}, t = () => {
					m !== null && cancelAnimationFrame(m), m = requestAnimationFrame(() => {
						s(), m = null;
					});
				}, a = () => s();
				document.addEventListener("mousedown", e), document.addEventListener("scroll", t, {
					capture: !0,
					passive: !0
				}), window.addEventListener("resize", a), p = [
					() => document.removeEventListener("mousedown", e),
					() => document.removeEventListener("scroll", t, { capture: !0 }),
					() => window.removeEventListener("resize", a),
					() => {
						m !== null && (cancelAnimationFrame(m), m = null);
					}
				];
			} else o.value = !1, r("closed"), p.forEach((e) => {
				try {
					e();
				} catch {}
			}), p = [];
		}), onUnmounted(() => {
			p.forEach((e) => {
				try {
					e();
				} catch {}
			}), p = [];
		}), (t, n) => (openBlock(), createBlock(Teleport, { to: "body" }, [e.keepAlive || e.open ? withDirectives((openBlock(), createElementBlock("div", {
			key: 0,
			ref_key: "popoverRef",
			ref: i,
			role: e.role,
			"aria-modal": e.role === "dialog" ? "true" : void 0,
			"aria-label": e.ariaLabel,
			style: normalizeStyle({
				...a.value,
				opacity: o.value ? "1" : "0"
			}),
			class: "ht-popover",
			onClick: n[0] ||= withModifiers(() => {}, ["stop"]),
			onMousedown: n[1] ||= withModifiers(() => {}, ["stop"]),
			onKeydown: withModifiers(d, ["stop"])
		}, [renderSlot(t.$slots, "default", {}, void 0, !0)], 44, _hoisted_1$34)), [[vShow, !e.keepAlive || e.open]]) : createCommentVNode("", !0)]));
	}
}), BasePopover_default = /* @__PURE__ */ __plugin_vue_export_helper_default(BasePopover_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-98f67a6b"]]), _hoisted_1$33 = ["id", "aria-labelledby"], HtSelectContent_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "HtSelectContent",
	props: {
		placement: { default: "bottom" },
		align: { default: "start" },
		maxHeight: { default: "300px" }
	},
	setup(e) {
		let t = e, n = injectSelectContext(), r = injectSelectProps(), i = ref(null), a = ref("");
		watch(() => n.triggerRef.value, (e) => {
			e && (a.value = `${e.getBoundingClientRect().width}px`);
		}, { immediate: !0 }), watch(() => n.open.value, (e) => {
			e && n.triggerRef.value && (a.value = `${n.triggerRef.value.getBoundingClientRect().width}px`);
		});
		let o = computed(() => {
			let e = { maxHeight: t.maxHeight };
			return r.width && !r.width.includes("%") ? e.width = r.width : a.value ? e.width = a.value : e.width = "8rem", e;
		});
		return (t, r) => (openBlock(), createBlock(BasePopover_default, {
			open: unref(n).open.value,
			anchor: unref(n).triggerRef.value,
			position: {
				placement: e.placement,
				align: e.align,
				offset: 4,
				autoFlip: !0
			},
			role: "dialog",
			"close-on-click-outside": !0,
			"close-on-escape": !0,
			"trap-focus": !1,
			"keep-alive": !0,
			"onUpdate:open": r[0] ||= (e) => unref(n).open.value = e
		}, {
			default: withCtx(() => [createElementVNode("div", {
				ref_key: "contentRef",
				ref: i,
				id: unref(n).ids.contentId,
				role: "listbox",
				"aria-labelledby": unref(n).ids.triggerId,
				tabindex: "-1",
				class: "ht-select-content",
				style: normalizeStyle(o.value)
			}, [renderSlot(t.$slots, "default", {}, void 0, !0)], 12, _hoisted_1$33)]),
			_: 3
		}, 8, [
			"open",
			"anchor",
			"position"
		]));
	}
}), [["__scopeId", "data-v-242c6f15"]]), _hoisted_1$32 = [
	"id",
	"aria-selected",
	"aria-disabled",
	"data-highlighted"
], _hoisted_2$21 = {
	key: 0,
	class: "w-4 h-4 ml-auto shrink-0",
	fill: "currentColor",
	viewBox: "0 0 20 20",
	xmlns: "http://www.w3.org/2000/svg"
}, HtSelectItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HtSelectItem",
	props: {
		value: {},
		disabled: { type: Boolean },
		textValue: {},
		itemIndex: {}
	},
	setup(e) {
		let t = inject(SELECT_GROUP_KEY, !1), n = e, r = injectSelectContext(), i = injectSelectProps(), a = ref(null), o = () => n.textValue ? n.textValue : a.value && a.value.textContent?.trim() || String(n.value);
		onMounted(() => {
			a.value && r.registerOption(n.value, o());
		}), onUnmounted(() => {
			r.unregisterOption(n.value);
		});
		let s = computed(() => {
			if (typeof n.itemIndex == "number") return n.itemIndex;
			if (!a.value) return -1;
			let e = a.value.closest(".ht-select-content");
			return e ? Array.from(e.querySelectorAll("[data-ht-select-item=\"true\"]:not([aria-disabled=\"true\"])")).indexOf(a.value) : -1;
		}), c = computed(() => r.isSelected(n.value)), l = computed(() => s.value >= 0 && r.highlightedIndex.value === s.value), u = () => {
			n.disabled || r.select(n.value);
		};
		return watch(l, (e) => {
			e && a.value && a.value.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		}), (n, o) => (openBlock(), createElementBlock("div", {
			ref_key: "itemRef",
			ref: a,
			"data-ht-select-item": "true",
			id: s.value >= 0 ? `${unref(r).ids.contentId}-opt-${s.value}` : void 0,
			role: "option",
			"aria-selected": c.value ? "true" : "false",
			"aria-disabled": e.disabled ? "true" : "false",
			"data-highlighted": l.value ? "true" : "false",
			class: normalizeClass(["ht-select-item", {
				"ht-select-item--selected": c.value,
				"ht-select-item--disabled": e.disabled,
				"ht-select-item--highlighted": l.value,
				"ht-select-item--multiline": unref(i).showMultiLines && unref(i).showMultiLines > 1,
				"ht-select-item--grouped": unref(t)
			}]),
			onClick: u
		}, [createElementVNode("span", {
			class: "ht-select-item__text",
			style: normalizeStyle({ WebkitLineClamp: unref(i).showMultiLines && unref(i).showMultiLines > 1 ? unref(i).showMultiLines : void 0 })
		}, [renderSlot(n.$slots, "default", {}, void 0, !0)], 4), c.value ? (openBlock(), createElementBlock("svg", _hoisted_2$21, [...o[0] ||= [createElementVNode("path", {
			"fill-rule": "evenodd",
			d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
			"clip-rule": "evenodd"
		}, null, -1)]])) : createCommentVNode("", !0)], 10, _hoisted_1$32));
	}
}), HtSelectItem_default = /* @__PURE__ */ __plugin_vue_export_helper_default(HtSelectItem_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-78cc8e80"]]), _hoisted_1$31 = ["aria-labelledby"], HtSelectGroup_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "HtSelectGroup",
	props: { id: {} },
	setup(e) {
		return provide(SELECT_GROUP_KEY, !0), (t, n) => (openBlock(), createElementBlock("div", {
			role: "group",
			"aria-labelledby": e.id,
			class: "ht-select-group"
		}, [renderSlot(t.$slots, "default", {}, void 0, !0)], 8, _hoisted_1$31));
	}
}), [["__scopeId", "data-v-b3ed0866"]]), _hoisted_1$30 = ["id"], HtSelectLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HtSelectLabel",
	props: {
		id: {},
		sticky: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = computed(() => t.id || `ht-select-label-${Math.random().toString(36).substr(2, 9)}`);
		return (e, r) => (openBlock(), createElementBlock("div", {
			id: n.value,
			class: normalizeClass(["ht-select-label", { "ht-select-label--sticky": t.sticky }]),
			role: "presentation"
		}, [renderSlot(e.$slots, "default", {}, void 0, !0)], 10, _hoisted_1$30));
	}
}), HtSelectLabel_default = /* @__PURE__ */ __plugin_vue_export_helper_default(HtSelectLabel_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a100900a"]]), _hoisted_1$29 = {
	class: "ht-select-separator",
	role: "separator"
}, HtSelectSeparator_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "HtSelectSeparator",
	setup(e) {
		return (e, t) => (openBlock(), createElementBlock("div", _hoisted_1$29));
	}
}), [["__scopeId", "data-v-e4e4f67f"]]), _hoisted_1$28 = { class: "ht-option-render" }, _hoisted_2$20 = { class: "ht-option-render__content" }, _hoisted_3$15 = {
	key: 0,
	class: "ht-option-render__title"
}, _hoisted_4$13 = {
	key: 1,
	class: "ht-option-render__description"
}, _hoisted_5$10 = {
	key: 2,
	class: "ht-option-render__meta"
}, _hoisted_6$10 = { class: "ht-option-render__meta-label" }, _hoisted_7$9 = { class: "ht-option-render__meta-value" }, _hoisted_8$7 = {
	key: 0,
	class: "ht-option-render__badge"
}, HtSelectOptionRender_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HtSelectOptionRender",
	props: {
		renderData: {},
		getBadgeClass: { type: Function }
	},
	setup(e) {
		return (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$28, [createElementVNode("div", _hoisted_2$20, [
			e.renderData.title ? (openBlock(), createElementBlock("div", _hoisted_3$15, toDisplayString(e.renderData.title), 1)) : createCommentVNode("", !0),
			e.renderData.description ? (openBlock(), createElementBlock("div", _hoisted_4$13, toDisplayString(e.renderData.description), 1)) : createCommentVNode("", !0),
			e.renderData.meta?.length ? (openBlock(), createElementBlock("div", _hoisted_5$10, [(openBlock(!0), createElementBlock(Fragment, null, renderList(e.renderData.meta, (e, t) => (openBlock(), createElementBlock("span", {
				key: t,
				class: "ht-option-render__meta-item"
			}, [createElementVNode("span", _hoisted_6$10, toDisplayString(e.label) + ":", 1), createElementVNode("span", _hoisted_7$9, toDisplayString(e.value), 1)]))), 128))])) : createCommentVNode("", !0)
		]), e.renderData.badge ? (openBlock(), createElementBlock("div", _hoisted_8$7, [createElementVNode("span", { class: normalizeClass(["ht-option-badge", e.getBadgeClass(e.renderData.badgeType)]) }, toDisplayString(e.renderData.badge), 3)])) : createCommentVNode("", !0)]));
	}
}), HtSelectOptionRender_default = /* @__PURE__ */ __plugin_vue_export_helper_default(HtSelectOptionRender_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-62e06951"]]), _hoisted_1$27 = {
	key: 0,
	class: "ht-select-empty"
}, _hoisted_2$19 = {
	key: 0,
	class: "ht-select-threshold-hint"
}, _hoisted_3$14 = { key: 1 }, _hoisted_4$12 = {
	key: 2,
	class: "ht-select-error"
}, _hoisted_5$9 = { key: 3 }, _hoisted_6$9 = {
	key: 0,
	class: "ht-select-empty"
}, _hoisted_7$8 = {
	key: 0,
	class: "ht-select-threshold-hint"
}, _hoisted_8$6 = { key: 1 }, _hoisted_9$6 = {
	key: 2,
	class: "ht-select-error"
}, _hoisted_10$5 = { key: 3 }, HtSelect_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "HtSelect",
	props: {
		modelValue: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		name: {},
		size: { default: "md" },
		variant: { default: "outline" },
		state: { default: "default" },
		width: {},
		showMultiLines: { default: 1 },
		clearable: {
			type: Boolean,
			default: !1
		},
		searchable: {
			type: Boolean,
			default: !1
		},
		searchFields: { default: "auto" },
		by: {},
		options: {},
		placeholder: { default: "Select..." },
		groupBy: { default: "group" },
		groupLabelSticky: {
			type: Boolean,
			default: !1
		},
		emptyText: { default: "No options available" },
		emptySearchText: { default: "No results found" },
		defaultGroupName: { default: "Other" },
		valueField: { default: "value" },
		labelField: { default: "label" },
		optionDisabled: {},
		optionRender: {},
		source: {},
		debounce: {},
		searchThreshold: {},
		searchThresholdHint: {},
		cacheStrategy: {},
		cache: {},
		initialOptions: {},
		minResults: {},
		minResultsText: {},
		searchPlaceholder: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"loading-start",
		"loading-end",
		"loading-error"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = provideSelectContext(n, r);
		provideSelectProps(n);
		let a = computed(() => !!n.source), o = a.value ? useAsyncSource({
			source: n.source,
			debounce: n.debounce,
			searchThreshold: n.searchThreshold,
			cacheStrategy: n.cacheStrategy,
			cache: n.cache
		}, i.inputValue, (e, ...t) => {
			e === "loading-start" ? r("loading-start", t[0]) : e === "loading-end" ? r("loading-end", t[0], t[1]) : e === "loading-error" && r("loading-error", t[0], t[1]);
		}) : null, s = computed(() => ({ width: n.width })), c = computed(() => a.value ? !0 : Array.isArray(n.options) && n.options.length > 0), l = computed(() => a.value && o ? !i.inputValue.value && n.initialOptions ? n.initialOptions : o.options.value : n.options ? n.options.map((e) => {
			if (typeof e == "string" || typeof e == "number") return {
				value: e,
				label: String(e),
				disabled: !1
			};
			let t = n.valueField || "value", r = n.labelField || "label", i = n.optionDisabled ? n.optionDisabled(e) : e.disabled || !1;
			return {
				value: e[t],
				label: e[r] || String(e[t]),
				disabled: i,
				...e
			};
		}) : []);
		function u(e, t, n, r) {
			let i = (e) => n.includes(e);
			if (i("label") && (e.label?.toLowerCase() || "").includes(t)) return !0;
			if (r) {
				let n = r(e);
				if (!n) return !1;
				if (i("title") && n.title?.toLowerCase().includes(t) || i("description") && n.description?.toLowerCase().includes(t) || i("meta") && n.meta && Array.isArray(n.meta) && n.meta.some((e) => {
					let n = String(e.label || "").toLowerCase(), r = String(e.value || "").toLowerCase();
					return n.includes(t) || r.includes(t);
				}) || i("badge") && n.badge?.toLowerCase().includes(t)) return !0;
			}
			return !1;
		}
		let d = computed(() => {
			if (a.value) return l.value;
			let e = i.inputValue.value.trim().toLowerCase();
			if (!e) return l.value;
			let t;
			t = n.searchFields === "auto" ? n.optionRender ? [
				"label",
				"title",
				"description",
				"meta",
				"badge"
			] : ["label"] : n.searchFields === "basic" ? ["label"] : n.searchFields === "full" ? [
				"label",
				"title",
				"description",
				"meta",
				"badge"
			] : n.searchFields;
			let r = n.optionRender ? (e) => n.optionRender(e, { index: 0 }) : void 0;
			return l.value.filter((n) => u(n, e, t, r));
		}), f = computed(() => {
			if (!c.value) return [];
			let e = 0;
			return d.value.map((t) => {
				let r = n.groupBy ? t[n.groupBy] : void 0, i = r != null && r !== "", a = e++;
				return {
					option: t,
					index: a,
					group: i ? String(r) : void 0,
					renderData: n.optionRender ? n.optionRender(t, { index: a }) : null
				};
			});
		}), p = computed(() => {
			if (!n.groupBy || !f.value.length || !f.value.some((e) => e.group !== void 0)) return null;
			let e = /* @__PURE__ */ new Map();
			return f.value.forEach((t) => {
				let r = t.group ?? n.defaultGroupName;
				e.has(r) || e.set(r, []), e.get(r).push(t);
			}), Array.from(e.entries()).map(([e, t]) => ({
				name: e,
				options: t
			}));
		}), m = computed(() => c.value ? f.value.map((e) => ({
			index: e.index,
			value: e.option.value,
			disabled: !!e.option.disabled
		})) : []);
		watch(() => c.value ? m.value : [], (e) => {
			i.setNavigableOptions(e);
		}, { immediate: !0 });
		let h = computed(() => p.value), _ = (e) => {
			let t = {
				primary: "ht-option-badge--primary",
				success: "ht-option-badge--success",
				warning: "ht-option-badge--warning",
				info: "ht-option-badge--info",
				default: "ht-option-badge--default"
			}, n = e || "primary";
			return t[n] === void 0 ? t.primary : t[n];
		}, v = computed(() => {
			if (!a.value || !n.searchThreshold) return !1;
			let e = i.inputValue.value.trim().length;
			return e > 0 && e < n.searchThreshold;
		}), y = computed(() => {
			let e = n.searchThreshold || 0, t = `Type ${e} or more characters to search...`;
			return (n.searchThresholdHint || t).replace("{n}", String(e));
		});
		return (e, t) => (openBlock(), createElementBlock("div", {
			class: "ht-select-root",
			style: normalizeStyle(s.value)
		}, [c.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(HtSelectTrigger_default, null, {
			default: withCtx(() => [createVNode(HtSelectValue_default, { placeholder: n.placeholder }, null, 8, ["placeholder"])]),
			_: 1
		}), createVNode(HtSelectContent_default, null, {
			default: withCtx(() => [h.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(h.value, (e, t) => (openBlock(), createElementBlock(Fragment, { key: e.name }, [createVNode(HtSelectGroup_default, { id: `${unref(i).ids.contentId}-group-${t}-label` }, {
				default: withCtx(() => [createVNode(HtSelectLabel_default, {
					id: `${unref(i).ids.contentId}-group-${t}-label`,
					sticky: n.groupLabelSticky
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(e.name), 1)]),
					_: 2
				}, 1032, ["id", "sticky"]), (openBlock(!0), createElementBlock(Fragment, null, renderList(e.options, (e) => (openBlock(), createBlock(HtSelectItem_default, {
					key: String(e.option.value),
					value: e.option.value,
					disabled: e.option.disabled,
					"text-value": e.option.label,
					"item-index": e.index,
					class: normalizeClass({ "ht-option-custom": !!n.optionRender })
				}, {
					default: withCtx(() => [e.renderData ? (openBlock(), createBlock(HtSelectOptionRender_default, {
						key: 0,
						"render-data": e.renderData,
						"get-badge-class": _
					}, null, 8, ["render-data"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(e.option.label), 1)], 64))]),
					_: 2
				}, 1032, [
					"value",
					"disabled",
					"text-value",
					"item-index",
					"class"
				]))), 128))]),
				_: 2
			}, 1032, ["id"]), t < h.value.length - 1 ? (openBlock(), createBlock(HtSelectSeparator_default, { key: 0 })) : createCommentVNode("", !0)], 64))), 128)), h.value.length ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_6$9, [v.value ? (openBlock(), createElementBlock("span", _hoisted_7$8, toDisplayString(y.value), 1)) : a.value && unref(o)?.loading.value ? (openBlock(), createElementBlock("span", _hoisted_8$6, " Loading... ")) : a.value && unref(o)?.error.value ? (openBlock(), createElementBlock("span", _hoisted_9$6, toDisplayString(unref(o).error.value.message), 1)) : (openBlock(), createElementBlock("span", _hoisted_10$5, toDisplayString(unref(i).inputValue.value ? n.emptySearchText : n.emptyText), 1))]))], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(f.value, (e) => (openBlock(), createBlock(HtSelectItem_default, {
				key: String(e.option.value),
				value: e.option.value,
				disabled: e.option.disabled,
				"text-value": e.option.label,
				"item-index": e.index,
				class: normalizeClass({ "ht-option-custom": !!n.optionRender })
			}, {
				default: withCtx(() => [e.renderData ? (openBlock(), createBlock(HtSelectOptionRender_default, {
					key: 0,
					"render-data": e.renderData,
					"get-badge-class": _
				}, null, 8, ["render-data"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(e.option.label), 1)], 64))]),
				_: 2
			}, 1032, [
				"value",
				"disabled",
				"text-value",
				"item-index",
				"class"
			]))), 128)), f.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_1$27, [v.value ? (openBlock(), createElementBlock("span", _hoisted_2$19, toDisplayString(y.value), 1)) : a.value && unref(o)?.loading.value ? (openBlock(), createElementBlock("span", _hoisted_3$14, " Loading... ")) : a.value && unref(o)?.error.value ? (openBlock(), createElementBlock("span", _hoisted_4$12, toDisplayString(unref(o).error.value.message), 1)) : (openBlock(), createElementBlock("span", _hoisted_5$9, toDisplayString(unref(i).inputValue.value ? n.emptySearchText : n.emptyText), 1))])) : createCommentVNode("", !0)], 64))]),
			_: 1
		})], 64)) : renderSlot(e.$slots, "default", { key: 1 }, void 0, !0)], 4));
	}
}), HtSelect_default = /* @__PURE__ */ __plugin_vue_export_helper_default(HtSelect_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-3e5871d6"]]), CheckboxCell_default = /* @__PURE__ */ defineComponent({
	__name: "CheckboxCell",
	props: {
		rowData: {},
		rowIndex: {},
		isSelected: { type: Boolean },
		column: {},
		options: { default: () => ({}) },
		isFiltered: {
			type: Boolean,
			default: !1
		},
		isGrouped: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["toggle-selection"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = computed(() => {
			if (n.column.condition) {
				let e = n.column.condition(n.rowData);
				return {
					disabled: !e,
					reason: e ? void 0 : "Row does not meet selection criteria"
				};
			}
			return { disabled: !1 };
		}), a = computed(() => i.value.disabled), o = computed(() => i.value.reason);
		function s(e) {
			a.value || r("toggle-selection", n.rowData, n.rowIndex);
		}
		return (t, n) => (openBlock(), createBlock(unref(HtCheckbox_default), {
			"model-value": e.isSelected,
			disabled: a.value,
			title: o.value,
			size: "sm",
			variant: "default",
			"data-ht-functional": "checkbox",
			"onUpdate:modelValue": s,
			onClick: n[0] ||= withModifiers(() => {}, ["stop"])
		}, null, 8, [
			"model-value",
			"disabled",
			"title"
		]));
	}
}), CheckboxHeader_default = /* @__PURE__ */ defineComponent({
	name: "HtCheckboxHeader",
	props: {
		totalSelectableRows: {},
		selectedCount: {},
		options: { default: () => ({}) }
	},
	emits: ["select-all", "clear-selection"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = computed(() => n.totalSelectableRows > 0 && n.selectedCount === n.totalSelectableRows), a = computed(() => n.options?.showIndeterminate !== !1 && n.selectedCount > 0 && n.selectedCount < n.totalSelectableRows), o = computed(() => i.value ? `Deselect all (${n.selectedCount} selected)` : a.value ? `Select all (${n.selectedCount}/${n.totalSelectableRows} selected)` : `Select all (${n.totalSelectableRows} rows)`);
		function s(e) {
			i.value ? r("clear-selection") : r("select-all");
		}
		return (e, t) => (openBlock(), createBlock(unref(HtCheckbox_default), {
			"model-value": i.value,
			indeterminate: a.value,
			title: o.value,
			class: "ht-checkbox-header",
			size: "sm",
			variant: "default",
			"data-ht-functional": "checkbox-header",
			"onUpdate:modelValue": s,
			onClick: t[0] ||= withModifiers(() => {}, ["stop"])
		}, null, 8, [
			"model-value",
			"indeterminate",
			"title"
		]));
	}
}), RadioCell_default = /* @__PURE__ */ defineComponent({
	name: "HtRadioCell",
	props: {
		rowData: {},
		rowIndex: {},
		isSelected: { type: Boolean },
		column: {},
		options: { default: () => ({}) },
		isFiltered: {
			type: Boolean,
			default: !1
		},
		isGrouped: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["toggle-selection"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = inject(GRID_INSTANCE_ID_KEY, "ht-grid"), a = computed(() => {
			if (n.options?.radioGroupName) return n.options.radioGroupName;
			let e = n.column?.id || n.column?.field || "radio";
			return `${i}--${e}`;
		}), o = computed(() => {
			if (n.column.condition) {
				let e = n.column.condition(n.rowData);
				return {
					disabled: !e,
					reason: e ? void 0 : "Row does not meet selection criteria"
				};
			}
			return { disabled: !1 };
		}), s = computed(() => o.value.disabled), c = computed(() => o.value.reason), l = computed(() => s.value ? c.value || "Cannot select this row" : n.isSelected ? "Selected row" : "Select this row");
		function u(e) {
			s.value || r("toggle-selection", n.rowData, n.rowIndex);
		}
		return (t, r) => (openBlock(), createBlock(unref(HtRadio_default), {
			"model-value": e.isSelected ? n.rowData : void 0,
			value: n.rowData,
			disabled: s.value,
			name: a.value,
			title: l.value,
			size: "sm",
			variant: "default",
			"data-ht-functional": "radio",
			"onUpdate:modelValue": u,
			onClick: r[0] ||= withModifiers(() => {}, ["stop"])
		}, null, 8, [
			"model-value",
			"value",
			"disabled",
			"name",
			"title"
		]));
	}
}), _hoisted_1$26 = {
	class: "ht-radio-header",
	"data-ht-functional": "radio-header"
}, _hoisted_2$18 = ["title"], RadioHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "HtRadioHeader",
	props: {
		totalSelectableRows: {},
		selectedCount: {},
		options: { default: () => ({}) }
	},
	setup(e) {
		let t = e, n = computed(() => t.options?.headerLabel || ""), r = computed(() => t.selectedCount === 1 ? "1 row selected" : `${t.totalSelectableRows} rows available`);
		return (e, t) => (openBlock(), createElementBlock("div", _hoisted_1$26, [createElementVNode("span", {
			class: "ht-radio-header-label",
			title: r.value
		}, toDisplayString(n.value), 9, _hoisted_2$18)]));
	}
}), RadioHeader_default = /* @__PURE__ */ __plugin_vue_export_helper_default(RadioHeader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-ef2ebbc9"]]), _hoisted_1$25 = {
	class: "ht-seq-cell",
	"data-ht-functional": "seq"
}, SeqCell_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "SeqCell",
	props: {
		rowIndex: {},
		options: { default: () => ({}) },
		paginationOffset: { default: 0 }
	},
	setup(e) {
		let t = e, n = computed(() => t.options?.baseNumber ?? 1), r = computed(() => {
			let e = t.rowIndex + t.paginationOffset, r = e + n.value;
			return t.options?.formatter ? t.options.formatter(e, n.value) : r;
		});
		return (e, t) => (openBlock(), createElementBlock("span", _hoisted_1$25, toDisplayString(r.value), 1));
	}
}), [["__scopeId", "data-v-d3df6ea7"]]), _hoisted_1$24 = ["innerHTML"], _hoisted_2$17 = { class: "ht-action-label" }, ActionsCell_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "ActionsCell",
	props: {
		rowData: {},
		rowIndex: {},
		options: { default: () => ({}) }
	},
	setup(e) {
		let t = e, n = computed(() => t.options?.buttons && t.options.buttons.length > 0), r = computed(() => t.options?.buttons ? t.options.buttons.filter((e) => e.visible ? e.visible(t.rowData) : !0) : []);
		function i(e) {
			return e.disabled ? e.disabled(t.rowData) : !1;
		}
		function a(e) {
			i(e) || e.onClick(t.rowData);
		}
		return (t, o) => (openBlock(), createElementBlock("div", {
			class: "ht-actions-cell",
			"data-ht-functional": "actions",
			onClick: o[0] ||= withModifiers(() => {}, ["stop"]),
			onDblclick: o[1] ||= withModifiers(() => {}, ["stop"]),
			onContextmenu: o[2] ||= withModifiers(() => {}, ["stop"]),
			onMousedown: o[3] ||= withModifiers(() => {}, ["stop"]),
			onMouseup: o[4] ||= withModifiers(() => {}, ["stop"]),
			onPointerdown: o[5] ||= withModifiers(() => {}, ["stop"]),
			onTouchstart: o[6] ||= withModifiers(() => {}, ["stop"]),
			onTouchend: o[7] ||= withModifiers(() => {}, ["stop"])
		}, [renderSlot(t.$slots, "actions", {
			rowData: e.rowData,
			rowIndex: e.rowIndex
		}, () => [n.value ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(r.value, (e, t) => (openBlock(), createBlock(HtButton_default, {
			key: t,
			variant: "secondary",
			size: "sm",
			class: "gap-1",
			disabled: i(e),
			onClick: (t) => a(e)
		}, {
			default: withCtx(() => [e.icon ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: "ht-action-icon",
				innerHTML: e.icon
			}, null, 8, _hoisted_1$24)) : createCommentVNode("", !0), createElementVNode("span", _hoisted_2$17, toDisplayString(e.label), 1)]),
			_: 2
		}, 1032, ["disabled", "onClick"]))), 128)) : createCommentVNode("", !0)], !0)], 32));
	}
}), [["__scopeId", "data-v-26d134b5"]]), _hoisted_1$23 = [
	"disabled",
	"title",
	"draggable",
	"aria-disabled",
	"aria-grabbed",
	"aria-label"
], DragCell_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "HtDragCell",
	props: {
		rowData: {},
		rowIndex: {},
		options: { default: () => ({}) }
	},
	emits: ["drag-start", "drag-end"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ref(!1), a = inject("setDraggingRowId", () => {}), o = inject(GRID_API_KEY, null), s = computed(() => ({ rowIndex: n.rowIndex })), c = ref(0), l = computed(() => {
			if (c.value, !o) return !1;
			let e = o.getSortConfig?.();
			return e ? "fields" in e ? e.fields.length > 0 : !!("field" in e && e.field) : !1;
		});
		onMounted(() => {
			if (o?.on) {
				let e = () => {
					c.value++;
				};
				o.on("data-refresh-requested", e), onUnmounted(() => {
					o.off?.("data-refresh-requested", e);
				});
			}
		});
		let u = computed(() => {
			if (l.value) return {
				disabled: !0,
				reason: "Table is sorted. Clear sorting to enable row dragging"
			};
			if (n.options?.isRowDraggable) {
				let e = n.options.isRowDraggable(n.rowData, s.value);
				return typeof e == "boolean" ? { disabled: !e } : e;
			}
			return { disabled: !1 };
		}), d = computed(() => u.value.disabled), f = computed(() => d.value ? u.value.reason || "Cannot drag this row" : "Drag to reorder"), p = computed(() => d.value ? u.value.reason ? `Drag disabled: ${u.value.reason}` : "Drag disabled" : "Drag handle: drag to reorder row");
		function m(e, t) {
			let r = document.createElement("div");
			return r.className = "ht-drag-preview", r.style.cssText = "\n    position: fixed;\n    top: 0;\n    left: 0;\n    padding: 8px 16px;\n    background: var(--ht-bg, white);\n    border: 2px solid var(--ht-primary, rgb(59 130 246));\n    border-radius: 6px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n    font-size: 14px;\n    color: var(--ht-text, #374151);\n    white-space: nowrap;\n    z-index: 9999;\n    pointer-events: none;\n    opacity: 0;\n    transform: translate(-9999px, -9999px);\n  ", r.textContent = n.options?.dragPreviewContent ? n.options.dragPreviewContent(e) : `Row ${t + 1}`, document.body.appendChild(r), r;
		}
		function h(e) {
			if (d.value) {
				e.preventDefault(), l.value && o?.emit && o.emit("user-notification", {
					type: "warn",
					message: "Table is sorted. Clear sorting to enable row dragging",
					details: "Click the sort indicator in the column header to clear sorting"
				});
				return;
			}
			i.value = !0;
			let t = n.rowData?.id ?? n.rowIndex;
			if (a(t), e.dataTransfer) {
				e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("application/json", JSON.stringify({
					rowData: n.rowData,
					rowIndex: n.rowIndex
				}));
				let t = null;
				t = n.options?.dragImageElement ? n.options.dragImageElement(n.rowData) : m(n.rowData, n.rowIndex), t && (t.style.opacity === "0" && (t.style.opacity = "1", t.style.transform = "translate(0, 0)"), e.dataTransfer.setDragImage(t, 10, 10), requestAnimationFrame(() => {
					t && t.parentNode === document.body && document.body.removeChild(t);
				}));
			}
			r("drag-start", n.rowData, n.rowIndex, e);
		}
		function g(e) {
			i.value = !1, a(null), r("drag-end", n.rowData, n.rowIndex, e);
		}
		return (e, t) => (openBlock(), createElementBlock("div", {
			class: normalizeClass(["ht-drag-cell", {
				"ht-drag-disabled": d.value,
				"ht-drag-active": i.value
			}]),
			"data-ht-functional": "drag"
		}, [createElementVNode("button", {
			class: "ht-drag-handle",
			disabled: d.value,
			title: f.value,
			draggable: !d.value,
			"aria-disabled": d.value ? "true" : "false",
			"aria-grabbed": i.value ? "true" : "false",
			"aria-label": p.value,
			"aria-roledescription": "Drag handle",
			onDragstart: h,
			onDragend: g,
			onClick: t[0] ||= withModifiers(() => {}, ["stop"])
		}, [...t[1] ||= [createElementVNode("svg", {
			class: "ht-drag-icon",
			viewBox: "0 0 16 16",
			fill: "currentColor"
		}, [createElementVNode("path", { d: "M5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM5 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" }), createElementVNode("path", { d: "M14 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM14 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM14 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" })], -1)]], 40, _hoisted_1$23)], 2));
	}
}), DragCell_default = /* @__PURE__ */ __plugin_vue_export_helper_default(DragCell_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-dddbe9d8"]]);
function useColumnDrag({ columnRef: e, dragContextRef: t, emit: n }) {
	let r = computed(() => getColumnPinnedLocation(e.value)), i = ref(!1), a = ref(null), o = ref(!1), s = computed(() => {
		let t = e.value;
		return !(isFunctionalColumn(t) || t.reorderable === !1 || t.draggable === !1);
	});
	watch(t, (e) => {
		e || (o.value = !1, a.value = null);
	});
	let c = () => {
		a.value = null, o.value = !1;
	}, l = (t) => {
		if (!s.value) {
			t.preventDefault();
			return;
		}
		i.value = !0, a.value = null, t.dataTransfer && (t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/plain", e.value.id), t.dataTransfer.setData("application/happy-table-column", e.value.id)), n("column-drag-start", {
			columnId: e.value.id,
			pinned: r.value
		});
	}, u = () => {
		i.value = !1, c(), n("column-drag-end");
	}, d = (e) => {
		let t = e.currentTarget.getBoundingClientRect();
		return e.clientX - t.left <= t.width / 2 ? "before" : "after";
	};
	return {
		pinnedSide: r,
		isColumnDraggable: s,
		isDragSource: i,
		dragOverPosition: a,
		isDropBlocked: o,
		handleColumnDragStart: l,
		handleColumnDragEnd: u,
		handleColumnDragOver: (n) => {
			if (!s.value || i.value) return;
			if (isColumnDropBlocked(t.value, e.value)) {
				o.value = !0, a.value = null, n.dataTransfer && (n.dataTransfer.dropEffect = "none");
				return;
			}
			o.value = !1, n.preventDefault(), n.dataTransfer && (n.dataTransfer.dropEffect = "move");
			let r = d(n);
			a.value !== r && (a.value = r);
		},
		handleColumnDragLeave: () => {
			a.value !== null && (a.value = null), o.value &&= !1;
		},
		handleColumnDrop: (r) => {
			if (!s.value) return;
			if (isColumnDropBlocked(t.value, e.value)) {
				o.value = !0, a.value = null, r.dataTransfer && (r.dataTransfer.dropEffect = "none");
				return;
			}
			r.preventDefault(), r.dataTransfer && (r.dataTransfer.dropEffect = "move");
			let l = i.value ? "after" : d(r);
			c(), n("column-drop", {
				columnId: e.value.id,
				position: l
			});
		}
	};
}
function useColumnResize({ columnRef: e, gridAPI: t, getCurrentWidth: n }) {
	let r = computed(() => e.value.resizable !== !1), i = ref(!1), a = () => {
		i.value && (i.value = !1, typeof document < "u" && document.body.classList.remove("ht-grid-resizing"), typeof window < "u" && (window.removeEventListener("mouseup", a), window.removeEventListener("blur", a)));
	};
	return onBeforeUnmount(() => {
		a();
	}), {
		isColumnResizable: r,
		isResizeActive: i,
		handleResize: (o) => {
			if (!r.value || o.button !== 0) return;
			let s = o.detail > 1;
			o.preventDefault(), o.stopPropagation(), !s && (i.value || (i.value = !0, typeof document < "u" && document.body.classList.add("ht-grid-resizing"), typeof window < "u" && (window.addEventListener("mouseup", a), window.addEventListener("blur", a))), t?.emit("column-resize-start", {
				columnId: e.value.id,
				startX: o.clientX,
				currentWidth: n()
			}));
		},
		handleResizeDoubleClick: (n) => {
			if (!r.value) return;
			n.preventDefault(), n.stopPropagation();
			let i = t;
			typeof i.autoSizeColumn == "function" && i.autoSizeColumn(e.value.id);
		},
		handleResizeEndVisuals: a
	};
}
var _hoisted_1$22 = ["draggable", "title"], _hoisted_2$16 = ["title"], _hoisted_3$13 = ["aria-label", "onKeydown"], _hoisted_4$11 = {
	key: 0,
	class: "ht-sort-hint absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--ht-primary)] text-[var(--ht-text-inverse)] text-xs rounded shadow-lg whitespace-nowrap z-50 pointer-events-none"
}, HINT_STORAGE_KEY = "ht-sort-hint-shown", SortIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "SortIndicator",
	props: {
		column: {},
		gridAPI: {},
		compact: { type: Boolean }
	},
	emits: ["sort-priority-change", "sort-indicator-focus"],
	setup(t, { emit: n }) {
		let r = t, i = n, a = createLogger("SortIndicator"), o = ref(null), s = ref(!1), c = ref(!1), l = () => {
			typeof window < "u" && window.localStorage && (c.value = localStorage.getItem(HINT_STORAGE_KEY) === "true");
		}, u = () => {
			typeof window < "u" && window.localStorage && (localStorage.setItem(HINT_STORAGE_KEY, "true"), c.value = !0, s.value = !1);
		}, d = null, f = () => {
			let e = r.gridAPI?.getMultiSortConfig?.(), t = r.gridAPI?.getSortConfig?.();
			if (e && "fields" in e) {
				let t = e.fields.find((e) => e.field === r.column.field);
				if (t) {
					o.value = {
						direction: t.direction,
						priority: t.priority,
						isMultiSort: e.fields.length > 1,
						totalFields: e.fields.length
					};
					return;
				}
			}
			if (t) {
				if ("field" in t && "direction" in t) {
					if (t.field === r.column.field) {
						o.value = {
							direction: t.direction,
							priority: 0,
							isMultiSort: !1,
							totalFields: 1
						};
						return;
					}
				} else if ("fields" in t) {
					let e = t.fields.find((e) => e.field === r.column.field);
					if (e) {
						o.value = {
							direction: e.direction,
							priority: e.priority,
							isMultiSort: t.fields.length > 1,
							totalFields: t.fields.length
						};
						return;
					}
				}
			}
			o.value = null;
		};
		onMounted(() => {
			l(), r.gridAPI?.on && (f(), d = r.gridAPI.on("multi-sort-change", () => {
				f();
			}));
		}), onUnmounted(() => {
			d?.();
		});
		let p = computed(() => o.value), m = computed(() => {
			let e = p.value;
			return [
				"ht-sort-indicator",
				"inline-flex items-center",
				"transition-all duration-200",
				"group",
				{
					"gap-1": !r.compact && !e?.isMultiSort,
					"gap-0.5": r.compact || e?.isMultiSort,
					"ml-1": !r.compact && !e?.isMultiSort,
					"ml-0.5": r.compact || e?.isMultiSort,
					"cursor-grab": e?.isMultiSort && e.priority > 0,
					"active:cursor-grabbing": e?.isMultiSort && e.priority > 0
				}
			].filter(Boolean);
		}), h = (e) => {
			if (!r.column.sortable || !r.gridAPI) return;
			e.preventDefault(), e.stopPropagation(), s.value && u();
			let t = e.ctrlKey || e.metaKey, n = r.gridAPI?.sortByColumn, i = r.gridAPI?.addSortField;
			t && i ? i(r.column.field) : t && !i ? (a.warn("Multi-column sorting is not enabled. Current basic sorting plugin only supports single column sorting."), a.info("Tip: To enable multi-column sorting, use pluginPresets.enhanced or createSortingPlugin({ enableMultiSort: true })"), r.gridAPI?.emit?.("multi-sort-disabled-warning", {
				attempted: !0,
				message: "Multi-column sorting is not enabled. Please use enhanced plugin to enable this feature."
			})) : n && n(r.column.field), f();
		}, g = () => {
			!c.value && !s.value && (s.value = !0);
		}, _ = (e) => {
			if (!p.value?.isMultiSort) return;
			e.preventDefault(), e.stopPropagation();
			let t = p.value.priority, n = (p.value.totalFields || 1) - 1, a = t >= n ? 0 : t + 1;
			i("sort-priority-change", r.column.field, a);
		}, y = () => {
			i("sort-indicator-focus", r.column.field);
		}, b = (e) => {
			e.stopPropagation(), p.value?.isMultiSort && e.dataTransfer?.setData("text/plain", JSON.stringify({
				field: r.column.field,
				priority: p.value.priority
			}));
		}, w = (e) => {
			e.stopPropagation(), p.value?.isMultiSort && e.preventDefault();
		}, O = (e) => {
			if (e.stopPropagation(), p.value?.isMultiSort) {
				e.preventDefault();
				try {
					let t = JSON.parse(e.dataTransfer?.getData("text/plain") || "{}");
					t.field && t.field !== r.column.field && i("sort-priority-change", t.field, p.value.priority);
				} catch (e) {
					a.warn("Invalid drag data:", e);
				}
			}
		};
		return (e, n) => t.column.sortable ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: normalizeClass([m.value, "relative"]),
			draggable: p.value?.isMultiSort,
			title: p.value ? `Sorted ${p.value.direction === "asc" ? "ascending" : "descending"}${p.value.isMultiSort ? ` (priority ${p.value.priority + 1})` : ""}. Click again to ${p.value.direction === "asc" ? "sort descending" : "clear sorting"}. ${p.value.isMultiSort ? "Drag to reorder priority. " : ""}${unref(formatShortcut)("click")} to add secondary sort.` : `Click to sort ascending. Three-state cycle: none → asc → desc → none. ${unref(formatShortcut)("click")} to add secondary sort.`,
			onDragstart: withModifiers(b, ["stop"]),
			onDragover: withModifiers(w, ["stop"]),
			onDrop: withModifiers(O, ["stop"])
		}, [p.value?.isMultiSort ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: "ht-priority-badge relative flex items-center justify-center",
			title: `Sort priority ${p.value.priority + 1} of ${p.value.totalFields}. Click to reorder.`,
			onClick: withModifiers(_, ["stop"])
		}, [createElementVNode("div", { class: normalizeClass(["min-w-[10px] h-2.5 px-0.5 rounded-full font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110", {
			"bg-[var(--ht-primary)] text-[var(--ht-text-inverse)] shadow-sm text-[9px]": p.value.priority === 0,
			"bg-[var(--ht-primary-hover)] text-[var(--ht-text-inverse)] shadow-sm text-[9px]": p.value.priority === 1,
			"bg-[var(--ht-primary-active)] text-[var(--ht-text-inverse)] shadow-sm text-[9px]": p.value.priority === 2,
			"bg-[var(--ht-primary-subtle)] text-[var(--ht-text)] shadow-sm text-[8px]": p.value.priority > 2
		}]) }, toDisplayString(p.value.priority + 1), 3)], 8, _hoisted_2$16)) : createCommentVNode("", !0), createElementVNode("div", {
			class: normalizeClass(["ht-sort-icon flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ht-primary)] rounded relative", {
				"w-4 h-4": !r.compact && !p.value?.isMultiSort,
				"w-3.5 h-3.5": r.compact || p.value?.isMultiSort
			}]),
			tabindex: "0",
			role: "button",
			"aria-label": p.value ? `Sorted ${p.value.direction === "asc" ? "ascending" : "descending"}. Press Enter to ${p.value.direction === "asc" ? "sort descending" : "clear sorting"}` : "Not sorted. Press Enter to sort ascending",
			onClick: h,
			onKeydown: [withKeys(withModifiers(h, ["prevent"]), ["enter"]), withKeys(withModifiers(h, ["prevent"]), ["space"])],
			onMouseenter: g,
			onFocus: y
		}, [createVNode(Transition, { name: "hint-fade" }, {
			default: withCtx(() => [s.value && !p.value ? (openBlock(), createElementBlock("div", _hoisted_4$11, [...n[0] ||= [createTextVNode(" Click to sort ", -1), createElementVNode("div", { class: "absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[var(--ht-primary)]" }, null, -1)]])) : createCommentVNode("", !0)]),
			_: 1
		}), p.value ? p.value.direction === "asc" ? (openBlock(), createElementBlock("svg", {
			key: 1,
			class: normalizeClass(["transition-all duration-200 drop-shadow-sm", {
				"w-4 h-4": !r.compact && !p.value.isMultiSort,
				"w-3.5 h-3.5": r.compact || p.value.isMultiSort,
				"text-[var(--ht-primary)]": !p.value.isMultiSort || p.value.priority === 0,
				"text-[var(--ht-primary-hover)]": p.value.isMultiSort && p.value.priority === 1,
				"text-[var(--ht-primary-active)]": p.value.isMultiSort && p.value.priority > 1
			}]),
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			viewBox: "0 0 24 24",
			"aria-hidden": "true"
		}, [...n[2] ||= [createStaticVNode("<path d=\"m3 8 4-4 4 4\" data-v-5d39723d></path><path d=\"M7 4v16\" data-v-5d39723d></path><path d=\"M11 12h4\" data-v-5d39723d></path><path d=\"M11 16h7\" data-v-5d39723d></path><path d=\"M11 20h10\" data-v-5d39723d></path>", 5)]], 2)) : p.value.direction === "desc" ? (openBlock(), createElementBlock("svg", {
			key: 2,
			class: normalizeClass(["transition-all duration-200 drop-shadow-sm", {
				"w-4 h-4": !r.compact && !p.value.isMultiSort,
				"w-3.5 h-3.5": r.compact || p.value.isMultiSort,
				"text-[var(--ht-primary)]": !p.value.isMultiSort || p.value.priority === 0,
				"text-[var(--ht-primary-hover)]": p.value.isMultiSort && p.value.priority === 1,
				"text-[var(--ht-primary-active)]": p.value.isMultiSort && p.value.priority > 1
			}]),
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			viewBox: "0 0 24 24",
			"aria-hidden": "true"
		}, [...n[3] ||= [createStaticVNode("<path d=\"m3 16 4 4 4-4\" data-v-5d39723d></path><path d=\"M7 20V4\" data-v-5d39723d></path><path d=\"M11 4h10\" data-v-5d39723d></path><path d=\"M11 8h7\" data-v-5d39723d></path><path d=\"M11 12h4\" data-v-5d39723d></path>", 5)]], 2)) : createCommentVNode("", !0) : (openBlock(), createElementBlock("svg", {
			key: 0,
			class: normalizeClass(["text-[var(--ht-text-muted)] opacity-60 transition-all duration-200 hover:text-[var(--ht-text)] hover:opacity-80", {
				"w-4 h-4": !r.compact,
				"w-3.5 h-3.5": r.compact
			}]),
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			viewBox: "0 0 24 24",
			"aria-hidden": "true"
		}, [...n[1] ||= [createStaticVNode("<path d=\"m3 8 4-4 4 4\" data-v-5d39723d></path><path d=\"m11 16-4 4-4-4\" data-v-5d39723d></path><path d=\"M7 4v16\" data-v-5d39723d></path><path d=\"M15 8h6\" data-v-5d39723d></path><path d=\"M15 16h6\" data-v-5d39723d></path><path d=\"M13 12h8\" data-v-5d39723d></path>", 6)]], 2))], 42, _hoisted_3$13)], 42, _hoisted_1$22)) : createCommentVNode("", !0);
	}
}), SortIndicator_default = /* @__PURE__ */ __plugin_vue_export_helper_default(SortIndicator_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-5d39723d"]]), _hoisted_1$21 = { class: "min-w-[300px] max-w-[540px] rounded-lg border border-[var(--ht-border)] bg-[var(--ht-bg)] shadow-[var(--shadow-ht-xl)] backdrop-blur-sm" }, _hoisted_2$15 = { class: "border-b border-[var(--ht-border-subtle)] px-4 py-3" }, _hoisted_3$12 = { class: "text-sm font-semibold text-[var(--ht-text)]" }, _hoisted_4$10 = { class: "p-4" }, FilterPopover_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "FilterPopover",
	props: {
		open: { type: Boolean },
		anchor: {},
		title: {},
		position: { default: () => ({
			placement: "bottom",
			align: "center",
			offset: 4,
			autoFlip: !0
		}) }
	},
	emits: [
		"update:open",
		"opened",
		"closed"
	],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (openBlock(), createBlock(BasePopover_default, {
			open: e.open,
			anchor: e.anchor,
			position: e.position,
			"aria-label": e.title,
			"onUpdate:open": r[0] ||= (e) => n("update:open", e),
			onOpened: r[1] ||= (e) => n("opened"),
			onClosed: r[2] ||= (e) => n("closed")
		}, {
			default: withCtx(() => [createElementVNode("div", _hoisted_1$21, [createElementVNode("div", _hoisted_2$15, [createElementVNode("div", _hoisted_3$12, [renderSlot(t.$slots, "title", {}, () => [createTextVNode(toDisplayString(e.title), 1)], !0)])]), createElementVNode("div", _hoisted_4$10, [renderSlot(t.$slots, "default", {}, void 0, !0)])])]),
			_: 3
		}, 8, [
			"open",
			"anchor",
			"position",
			"aria-label"
		]));
	}
}), FilterPopover_default = /* @__PURE__ */ __plugin_vue_export_helper_default(FilterPopover_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-88c8098f"]]), _hoisted_1$20 = { class: "space-y-3" }, _hoisted_2$14 = { class: "flex items-center gap-2" }, _hoisted_3$11 = {
	key: 0,
	class: "flex items-center gap-3 px-3 py-2.5 text-sm bg-[var(--ht-bg)] border-b border-[var(--ht-border-subtle)] hover:bg-[var(--ht-bg-subtle)] cursor-pointer transition-colors group"
}, _hoisted_4$9 = { class: "ml-auto text-xs text-[var(--ht-text-subtle)] tabular-nums" }, _hoisted_5$8 = { class: "flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--ht-cell-hover)] cursor-pointer transition-colors group" }, _hoisted_6$8 = ["checked", "onChange"], _hoisted_7$7 = ["title"], _hoisted_8$5 = { class: "text-xs text-[var(--ht-text-subtle)] tabular-nums" }, _hoisted_9$5 = { class: "flex items-center justify-between text-xs text-[var(--ht-text-muted)] pt-1 border-t border-[var(--ht-border-subtle)]" }, _hoisted_10$4 = { class: "tabular-nums" }, pageSize = 100, valueRowHeight = 32, RAF_DEBOUNCE_FRAMES = 4, ValueFilterEditor_default = /* @__PURE__ */ defineComponent({
	__name: "ValueFilterEditor",
	props: {
		field: {},
		allData: {},
		currentFilter: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = ref(""), i = ref("all"), a = ref(/* @__PURE__ */ new Set()), o = ref(/* @__PURE__ */ new Set()), s = ref(!0);
		t({
			getValueFilter: () => {
				let e = f.value.map(([e]) => e), t = r.value.trim().toLowerCase();
				if (i.value === "all") {
					if (t.length > 0) {
						let n = [...e], r = "(null)".includes(t);
						return s.value && r && n.push(null), {
							operator: "in",
							value: n
						};
					}
					let n = Array.from(o.value), r = !s.value;
					if (n.length === 0 && !r) return null;
					let i = [...n];
					return r && i.push(null), {
						operator: "notIn",
						value: i
					};
				}
				let n = Array.from(a.value), c = s.value;
				if (n.length === e.length && c) return null;
				if (n.length > e.length / 2) {
					let t = new Set(e);
					n.forEach((e) => t.delete(e));
					let r = Array.from(t);
					return c || r.push(null), {
						operator: "notIn",
						value: r
					};
				}
				let l = [...n];
				return c && l.push(null), {
					operator: "in",
					value: l
				};
			},
			remeasure: () => {
				m.value && h.setContainerSize({
					height: m.value.clientHeight,
					width: m.value.clientWidth
				});
			}
		});
		let c = /* @__PURE__ */ new WeakMap(), l = computed(() => {
			let e = n.allData, t = c.get(e);
			t || (t = /* @__PURE__ */ new Map(), c.set(e, t));
			let r = t.get(n.field);
			if (r) return r;
			let i = /* @__PURE__ */ new Map();
			for (let e of n.allData) {
				let t = e[n.field], r = t ?? "__NULL__";
				i.set(r, (i.get(r) || 0) + 1);
			}
			let a = Array.from(i.entries());
			return t.set(n.field, a), a;
		}), u = computed(() => {
			let e = r.value.trim().toLowerCase(), t = l.value;
			return e && (t = t.filter(([t]) => (t === "__NULL__" ? "(null)" : String(t)).toLowerCase().includes(e))), t.sort((e, t) => t[1] - e[1]);
		}), d = ref(pageSize), f = computed(() => u.value.filter(([e]) => e !== "__NULL__")), p = computed(() => f.value.slice(0, d.value)), m = ref(null), h = useVirtualizer({
			count: computed(() => p.value.length),
			getItemSize: () => valueRowHeight,
			overscan: 6
		});
		onMounted(() => {
			h.scrollElement.value = m.value, m.value && h.setContainerSize({
				height: m.value.clientHeight,
				width: m.value.clientWidth
			});
		});
		let _ = null, v = 0;
		watch(() => h.endIndex.value, (e) => {
			if (e >= d.value - 5 && d.value < f.value.length) {
				if (_) return;
				v = 0;
				let e = () => {
					_ = requestAnimationFrame(() => {
						v++, v < RAF_DEBOUNCE_FRAMES ? e() : (d.value = Math.min(f.value.length, d.value + pageSize), _ = null, v = 0);
					});
				};
				e();
			}
		}), watch([l, r], () => {
			d.value = pageSize, m.value && (m.value.scrollTop = 0, h.updateScrollPosition(0));
		}), watch(() => n.currentFilter, (e) => {
			e && Array.isArray(e.value) ? e.operator === "notIn" ? (i.value = "all", o.value = new Set(e.value.filter((e) => e != null)), a.value = /* @__PURE__ */ new Set(), s.value = !e.value.some((e) => e == null)) : (i.value = "subset", s.value = e.value.some((e) => e == null), a.value = new Set(e.value.filter((e) => e != null)), o.value = /* @__PURE__ */ new Set()) : (i.value = "all", s.value = !0, a.value = /* @__PURE__ */ new Set(), o.value = /* @__PURE__ */ new Set());
		}, { immediate: !0 });
		function y(e, t) {
			if (i.value === "all") {
				let n = new Set(o.value);
				t ? n.delete(e) : n.add(e), o.value = n;
				return;
			}
			let n = new Set(a.value);
			t ? n.add(e) : n.delete(e), a.value = n;
		}
		function b() {
			i.value = "all", o.value = /* @__PURE__ */ new Set(), s.value = !0;
		}
		function w() {
			i.value = "subset", a.value = /* @__PURE__ */ new Set(), o.value = /* @__PURE__ */ new Set(), s.value = !1;
		}
		function T(e) {
			return i.value === "all" ? !o.value.has(e) : a.value.has(e);
		}
		return (e, t) => (openBlock(), createElementBlock("div", _hoisted_1$20, [
			createElementVNode("div", _hoisted_2$14, [
				withDirectives(createElementVNode("input", {
					"onUpdate:modelValue": t[0] ||= (e) => r.value = e,
					type: "text",
					placeholder: "Search values",
					class: "h-8 flex-1 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] placeholder:text-[var(--ht-text-subtle)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20"
				}, null, 512), [[vModelText, r.value]]),
				createElementVNode("button", {
					class: "h-8 px-3 text-xs font-medium text-[var(--ht-text-muted)] hover:text-[var(--ht-primary)] hover:bg-[var(--ht-bg-subtle)] rounded-md transition-colors",
					onClick: w
				}, " Clear "),
				createElementVNode("button", {
					class: "h-8 px-3 text-xs font-medium text-[var(--ht-primary)] hover:text-[var(--ht-primary-hover)] hover:bg-[var(--ht-primary-subtle)] rounded-md transition-colors",
					onClick: b
				}, " Select All ")
			]),
			createElementVNode("div", {
				ref_key: "scrollEl",
				ref: m,
				class: "relative overflow-auto rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg-subtle)]",
				style: {
					"max-height": "16rem",
					height: "16rem"
				}
			}, [!r.value || "(null)".includes(r.value.trim().toLowerCase()) ? (openBlock(), createElementBlock("label", _hoisted_3$11, [
				withDirectives(createElementVNode("input", {
					"onUpdate:modelValue": t[1] ||= (e) => s.value = e,
					type: "checkbox",
					class: "w-4 h-4 rounded border-[var(--ht-border-strong)] text-[var(--ht-primary)] focus:ring-2 focus:ring-[var(--ht-primary)]/30 cursor-pointer"
				}, null, 512), [[vModelCheckbox, s.value]]),
				t[2] ||= createElementVNode("span", { class: "font-medium text-[var(--ht-text-muted)] group-hover:text-[var(--ht-text)]" }, "(null)", -1),
				createElementVNode("span", _hoisted_4$9, toDisplayString(l.value.find(([e]) => e === "__NULL__")?.[1] ?? 0), 1)
			])) : createCommentVNode("", !0), createElementVNode("div", { style: normalizeStyle({
				height: unref(h).totalSize.value + "px",
				position: "relative"
			}) }, [(openBlock(!0), createElementBlock(Fragment, null, renderList(unref(h).virtualItems.value, (e) => (openBlock(), createElementBlock("div", {
				key: e.index,
				style: normalizeStyle({
					position: "absolute",
					top: e.start + "px",
					height: e.size + "px",
					left: 0,
					right: 0
				})
			}, [createElementVNode("label", _hoisted_5$8, [
				createElementVNode("input", {
					type: "checkbox",
					class: "w-4 h-4 rounded border-[var(--ht-border-strong)] text-[var(--ht-primary)] focus:ring-2 focus:ring-[var(--ht-primary)]/30 cursor-pointer",
					checked: T(p.value[e.index]?.[0]),
					onChange: (t) => y(p.value[e.index]?.[0], t.target?.checked)
				}, null, 40, _hoisted_6$8),
				createElementVNode("span", {
					class: "truncate flex-1 text-[var(--ht-text)] group-hover:text-[var(--ht-text)]",
					title: String(p.value[e.index]?.[0] ?? "")
				}, toDisplayString(String(p.value[e.index]?.[0] ?? "")), 9, _hoisted_7$7),
				createElementVNode("span", _hoisted_8$5, toDisplayString(p.value[e.index]?.[1] ?? 0), 1)
			])], 4))), 128))], 4)], 512),
			createElementVNode("div", _hoisted_9$5, [createElementVNode("span", _hoisted_10$4, "Showing " + toDisplayString(Math.min(d.value, f.value.length)) + " of " + toDisplayString(f.value.length), 1)])
		]));
	}
}), _hoisted_1$19 = { class: "space-y-3" }, _hoisted_2$13 = {
	key: 0,
	class: "flex flex-wrap gap-2"
}, _hoisted_3$10 = {
	key: 1,
	class: "flex gap-2 items-center min-w-0"
}, _hoisted_4$8 = ["value"], _hoisted_5$7 = ["type", "placeholder"], _hoisted_6$7 = ["type"], _hoisted_7$6 = ["type"], _hoisted_8$4 = ["value"], _hoisted_9$4 = {
	key: 1,
	class: "max-h-48 overflow-auto rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg-subtle)] p-2 space-y-1"
}, _hoisted_10$3 = ["checked", "onChange"], _hoisted_11$2 = { class: "truncate text-[var(--ht-text)] group-hover:text-[var(--ht-text)]" }, _hoisted_12 = {
	key: 4,
	class: "flex items-start gap-2 rounded-md bg-[var(--ht-danger-bg)] border border-[var(--ht-danger-border)] px-3 py-2 text-xs text-[var(--ht-danger)]"
}, CustomFilterEditor_default = /* @__PURE__ */ defineComponent({
	__name: "CustomFilterEditor",
	props: {
		field: {},
		dataType: {},
		currentFilter: {},
		enumOptions: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = ref(""), i = ref(""), a = ref(""), o = ref(""), s = ref(/* @__PURE__ */ new Set()), c = ref("");
		t({
			getFilterConfig: () => {
				c.value = "";
				let e = r.value;
				if (!e) return null;
				let t = i.value;
				if (u.value === "number") {
					let e = Number(t);
					if (!Number.isFinite(e)) return c.value = "Invalid number input", null;
					t = e;
				}
				if (u.value === "boolean" && (t = t === !0 || t === "true"), u.value === "datetime-local" && e === "equals" && typeof t == "string" && t) {
					let e = new Date(t);
					isNaN(e.getTime()) || (t = e.toISOString());
				}
				if (e === "between") {
					let e = a.value, n = o.value;
					if (u.value === "number") {
						let t = Number(e), r = Number(n);
						if (!Number.isFinite(t) || !Number.isFinite(r)) return c.value = "Invalid range input", null;
						e = t, n = r;
					}
					if (u.value === "datetime-local" || u.value === "date") {
						let t = new Date(e), r = new Date(n);
						if (isNaN(t.getTime()) || isNaN(r.getTime())) return c.value = "Invalid range input", null;
						u.value === "datetime-local" && (e = t.toISOString(), n = r.toISOString());
					}
					t = [e, n];
				}
				if (u.value === "enum") if (e === "in") {
					let e = Array.from(s.value);
					if (e.length === 0) return c.value = "Select at least one option", null;
					t = e;
				} else s.value = /* @__PURE__ */ new Set();
				return {
					operator: e,
					value: t
				};
			},
			hasValidationError: () => c.value
		});
		let l = computed(() => {
			let e = n.dataType;
			return e === "date" || e === "datetime" || e === "time" || e === "interval" ? [
				{
					label: "Equals",
					value: "equals"
				},
				{
					label: "On or after",
					value: "gte"
				},
				{
					label: "On or before",
					value: "lte"
				},
				{
					label: "Between",
					value: "between"
				}
			] : e === "enum" ? [
				{
					label: "Equals",
					value: "equals"
				},
				{
					label: "Not equals",
					value: "notEquals"
				},
				{
					label: "Includes any",
					value: "in"
				}
			] : e === "number" || e === "currency" || e === "percentage" ? [
				{
					label: "Equals",
					value: "equals"
				},
				{
					label: "Not equals",
					value: "notEquals"
				},
				{
					label: "Greater than",
					value: "gt"
				},
				{
					label: "Less than",
					value: "lt"
				},
				{
					label: "Greater or equal",
					value: "gte"
				},
				{
					label: "Less or equal",
					value: "lte"
				},
				{
					label: "Between",
					value: "between"
				}
			] : e === "boolean" ? [{
				label: "Equals",
				value: "equals"
			}, {
				label: "Not equals",
				value: "notEquals"
			}] : [
				{
					label: "Contains",
					value: "contains"
				},
				{
					label: "Equals",
					value: "equals"
				},
				{
					label: "Not equals",
					value: "notEquals"
				},
				{
					label: "Starts with",
					value: "startsWith"
				},
				{
					label: "Ends with",
					value: "endsWith"
				},
				{
					label: "Is empty",
					value: "isEmpty"
				},
				{
					label: "Is not empty",
					value: "notEmpty"
				}
			];
		}), u = computed(() => n.dataType === "number" || n.dataType === "currency" || n.dataType === "percentage" ? "number" : n.dataType === "boolean" ? "boolean" : n.dataType === "date" ? "date" : n.dataType === "datetime" ? "datetime-local" : n.dataType === "time" ? "time" : n.dataType === "interval" ? "text" : n.dataType === "enum" ? "enum" : "text");
		watch(() => n.currentFilter, (e) => {
			if (!e) {
				r.value = "", i.value = u.value === "boolean" ? !0 : "", a.value = "", o.value = "", s.value = /* @__PURE__ */ new Set();
				return;
			}
			if (r.value = e.operator, (e.operator === "in" || e.operator === "oneOf") && Array.isArray(e.value)) s.value = new Set(e.value), i.value = "", a.value = "", o.value = "";
			else if (e.operator === "between" && Array.isArray(e.value)) {
				let [t, n] = e.value;
				a.value = d(t), o.value = d(n), i.value = "", s.value = /* @__PURE__ */ new Set();
			} else a.value = "", o.value = "", s.value = /* @__PURE__ */ new Set(), i.value = d(e.value);
		}, { immediate: !0 }), watch(r, (e) => {
			if (c.value = "", !e) {
				u.value === "enum" && (s.value = /* @__PURE__ */ new Set());
				return;
			}
			if (u.value === "enum") {
				if (e === "in") i.value = "";
				else if (s.value = /* @__PURE__ */ new Set(), (e === "equals" || e === "notEquals") && (i.value === "" || i.value === void 0)) {
					let e = n.enumOptions?.[0];
					e && (i.value = e.value);
				}
			}
		});
		function d(e) {
			if (e == null) return "";
			if (u.value === "datetime-local") {
				let t = e instanceof Date ? e : new Date(e);
				if (!isNaN(t.getTime())) return t.toISOString().slice(0, 16);
			}
			if (u.value === "date") {
				let t = e instanceof Date ? e : new Date(e);
				if (!isNaN(t.getTime())) return t.toISOString().slice(0, 10);
				if (typeof e == "string") return e.slice(0, 10);
			}
			return e;
		}
		function f(e) {
			let t = /* @__PURE__ */ new Date(), n, i;
			switch (e) {
				case "today":
					n = new Date(t.setHours(0, 0, 0, 0)), i = new Date(t.setHours(23, 59, 59, 999));
					break;
				case "yesterday": {
					let e = new Date(t);
					e.setDate(e.getDate() - 1), n = new Date(e.setHours(0, 0, 0, 0)), i = new Date(e.setHours(23, 59, 59, 999));
					break;
				}
				case "last7": {
					let e = new Date(t);
					e.setDate(e.getDate() - 6), n = new Date(e.setHours(0, 0, 0, 0)), i = new Date(t.setHours(23, 59, 59, 999));
					break;
				}
				case "last30": {
					let e = new Date(t);
					e.setDate(e.getDate() - 29), n = new Date(e.setHours(0, 0, 0, 0)), i = new Date(t.setHours(23, 59, 59, 999));
					break;
				}
				case "thisMonth":
					n = new Date(t.getFullYear(), t.getMonth(), 1, 0, 0, 0, 0), i = new Date(t.setHours(23, 59, 59, 999));
					break;
				default: return;
			}
			r.value = "between", u.value === "datetime-local" ? (a.value = n.toISOString().slice(0, 19), o.value = i.toISOString().slice(0, 19)) : (a.value = n.toISOString().slice(0, 10), o.value = i.toISOString().slice(0, 10));
		}
		function p(e, t) {
			let n = new Set(s.value);
			t ? n.add(e) : n.delete(e), s.value = n, n.size > 0 && (c.value = "");
		}
		return (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$19, [
			u.value === "date" || u.value === "datetime-local" ? (openBlock(), createElementBlock("div", _hoisted_2$13, [
				createElementVNode("button", {
					class: "px-3 py-1.5 text-xs font-medium text-[var(--ht-text)] rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] hover:bg-[var(--ht-bg-subtle)] hover:border-[var(--ht-border-strong)] transition-colors",
					onClick: n[0] ||= (e) => f("today")
				}, " Today "),
				createElementVNode("button", {
					class: "px-3 py-1.5 text-xs font-medium text-[var(--ht-text)] rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] hover:bg-[var(--ht-bg-subtle)] hover:border-[var(--ht-border-strong)] transition-colors",
					onClick: n[1] ||= (e) => f("yesterday")
				}, " Yesterday "),
				createElementVNode("button", {
					class: "px-3 py-1.5 text-xs font-medium text-[var(--ht-text)] rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] hover:bg-[var(--ht-bg-subtle)] hover:border-[var(--ht-border-strong)] transition-colors",
					onClick: n[2] ||= (e) => f("last7")
				}, " Last 7 days "),
				createElementVNode("button", {
					class: "px-3 py-1.5 text-xs font-medium text-[var(--ht-text)] rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] hover:bg-[var(--ht-bg-subtle)] hover:border-[var(--ht-border-strong)] transition-colors",
					onClick: n[3] ||= (e) => f("last30")
				}, " Last 30 days "),
				createElementVNode("button", {
					class: "px-3 py-1.5 text-xs font-medium text-[var(--ht-text)] rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] hover:bg-[var(--ht-bg-subtle)] hover:border-[var(--ht-border-strong)] transition-colors",
					onClick: n[4] ||= (e) => f("thisMonth")
				}, " This month ")
			])) : createCommentVNode("", !0),
			u.value !== "boolean" && u.value !== "enum" ? (openBlock(), createElementBlock("div", _hoisted_3$10, [withDirectives(createElementVNode("select", {
				"onUpdate:modelValue": n[5] ||= (e) => r.value = e,
				class: "h-9 min-w-[140px] shrink-0 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20"
			}, [n[11] ||= createElementVNode("option", {
				disabled: "",
				value: ""
			}, "Select condition…", -1), (openBlock(!0), createElementBlock(Fragment, null, renderList(l.value, (e) => (openBlock(), createElementBlock("option", {
				key: e.value,
				value: e.value
			}, toDisplayString(e.label), 9, _hoisted_4$8))), 128))], 512), [[vModelSelect, r.value]]), r.value === "between" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
				withDirectives(createElementVNode("input", {
					"onUpdate:modelValue": n[7] ||= (e) => a.value = e,
					type: u.value,
					placeholder: "Min",
					style: normalizeStyle(u.value === "date" || u.value === "datetime-local" || u.value === "time" ? "color-scheme: light dark;" : void 0),
					class: normalizeClass(["h-9 shrink-0 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] placeholder:text-[var(--ht-text-subtle)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20", u.value === "datetime-local" ? "w-[160px]" : u.value === "time" ? "w-[90px]" : "w-[110px]"])
				}, null, 14, _hoisted_6$7), [[vModelDynamic, a.value]]),
				n[12] ||= createElementVNode("span", { class: "text-[var(--ht-text-muted)] text-sm shrink-0" }, "to", -1),
				withDirectives(createElementVNode("input", {
					"onUpdate:modelValue": n[8] ||= (e) => o.value = e,
					type: u.value,
					placeholder: "Max",
					style: normalizeStyle(u.value === "date" || u.value === "datetime-local" || u.value === "time" ? "color-scheme: light dark;" : void 0),
					class: normalizeClass(["h-9 shrink-0 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] placeholder:text-[var(--ht-text-subtle)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20", u.value === "datetime-local" ? "w-[160px]" : u.value === "time" ? "w-[90px]" : "w-[110px]"])
				}, null, 14, _hoisted_7$6), [[vModelDynamic, o.value]])
			], 64)) : withDirectives((openBlock(), createElementBlock("input", {
				key: 0,
				"onUpdate:modelValue": n[6] ||= (e) => i.value = e,
				type: u.value,
				style: normalizeStyle(u.value === "date" || u.value === "datetime-local" || u.value === "time" ? "color-scheme: light dark;" : void 0),
				class: "h-9 flex-1 min-w-0 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] placeholder:text-[var(--ht-text-subtle)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20",
				placeholder: u.value === "text" ? "Enter value" : ""
			}, null, 12, _hoisted_5$7)), [[vModelDynamic, i.value]])])) : u.value === "boolean" ? withDirectives((openBlock(), createElementBlock("select", {
				key: 2,
				"onUpdate:modelValue": n[9] ||= (e) => i.value = e,
				class: "h-9 flex-1 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20"
			}, [...n[13] ||= [createElementVNode("option", { value: !0 }, "True", -1), createElementVNode("option", { value: !1 }, "False", -1)]], 512)), [[vModelSelect, i.value]]) : u.value === "enum" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [r.value === "equals" ? withDirectives((openBlock(), createElementBlock("select", {
				key: 0,
				"onUpdate:modelValue": n[10] ||= (e) => i.value = e,
				class: "h-9 flex-1 rounded-md border border-[var(--ht-border)] bg-[var(--ht-bg)] px-3 text-sm text-[var(--ht-text)] transition-colors focus:border-[var(--ht-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ht-primary)]/20"
			}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(e.enumOptions, (e) => (openBlock(), createElementBlock("option", {
				key: String(e.value),
				value: e.value
			}, toDisplayString(e.label), 9, _hoisted_8$4))), 128))], 512)), [[vModelSelect, i.value]]) : (openBlock(), createElementBlock("div", _hoisted_9$4, [(openBlock(!0), createElementBlock(Fragment, null, renderList(e.enumOptions, (e) => (openBlock(), createElementBlock("label", {
				key: String(e.value),
				class: "flex items-center gap-3 px-2 py-2 text-sm rounded hover:bg-[var(--ht-cell-hover)] cursor-pointer transition-colors group"
			}, [createElementVNode("input", {
				type: "checkbox",
				class: "w-4 h-4 rounded border-[var(--ht-border-strong)] text-[var(--ht-primary)] focus:ring-2 focus:ring-[var(--ht-primary)]/30 cursor-pointer",
				checked: s.value.has(e.value),
				onChange: (t) => p(e.value, t.target.checked)
			}, null, 40, _hoisted_10$3), createElementVNode("span", _hoisted_11$2, toDisplayString(e.label), 1)]))), 128))]))], 64)) : createCommentVNode("", !0),
			c.value ? (openBlock(), createElementBlock("div", _hoisted_12, [n[14] ||= createElementVNode("svg", {
				class: "w-4 h-4 shrink-0 mt-0.5",
				fill: "currentColor",
				viewBox: "0 0 20 20"
			}, [createElementVNode("path", {
				"fill-rule": "evenodd",
				d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
				"clip-rule": "evenodd"
			})], -1), createElementVNode("span", null, toDisplayString(c.value), 1)])) : createCommentVNode("", !0)
		]));
	}
}), _hoisted_1$18 = [
	"aria-label",
	"aria-pressed",
	"title"
], _hoisted_2$12 = { class: "space-y-3" }, _hoisted_3$9 = { class: "space-y-2" }, _hoisted_4$7 = { class: "overflow-hidden transition-all duration-200" }, _hoisted_5$6 = {
	key: 0,
	class: "border-t border-[var(--ht-border)]"
}, _hoisted_6$6 = {
	key: 1,
	class: "space-y-2"
}, _hoisted_7$5 = {
	key: 2,
	class: "border-t border-[var(--ht-border)] pt-2"
}, FilterIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "FilterIndicator",
	props: {
		column: {},
		gridAPI: {}
	},
	emits: [
		"filter-open",
		"filter-apply",
		"filter-clear"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ref(!1), a = ref(null), o = ref(null), s = ref(null), c = () => {
			o.value?.remeasure?.();
		}, l = ref(!1), u = computed(() => {
			let e = n.column.dataType || "text";
			return e === "date" || e === "datetime" || e === "time" || e === "interval" || e === "number" || e === "currency" || e === "percentage" || e === "json" || e === "multiline";
		}), d = computed(() => {
			let e = n.column.dataType;
			return !(e === "date" || e === "datetime" || e === "json" || e === "multiline");
		}), f = computed(() => {
			try {
				return (n.gridAPI.getState().config?.filters || []).filter((e) => e.field === n.column.field);
			} catch {
				return [];
			}
		}), p = computed(() => f.value.find((e) => e.operator === "in" || e.operator === "notIn") || null), m = computed(() => f.value.find((e) => ![
			"in",
			"oneOf",
			"notIn"
		].includes(e.operator)) || null), h = computed(() => {
			let e = p.value;
			if (!e) return null;
			let t = Array.isArray(e.value) ? e.value : [];
			return {
				operator: e.operator,
				value: t
			};
		}), g = computed(() => f.value.length > 0);
		watch(f, () => {
			m.value ? l.value = !0 : i.value || (l.value = !1);
		}, { immediate: !0 }), watch(() => n.column, () => {
			!m.value && !i.value && (l.value = !1);
		});
		let _ = computed(() => i.value && n.gridAPI.getData() || []), v = computed(() => {
			if (!i.value) return 0;
			try {
				let e = _.value, t = n.column.field, r = /* @__PURE__ */ new Set();
				for (let n = 0; n < e.length; n++) {
					let i = e[n][t];
					if (i != null && (r.add(i), r.size > 50)) break;
				}
				return r.size;
			} catch {
				return 0;
			}
		}), y = computed(() => {
			if (n.column.dataType !== "enum") return [];
			let e = n.column.options;
			if (Array.isArray(e) && e.length > 0) return e.map((e) => typeof e == "object" && e && "value" in e ? {
				label: String(e.label ?? e.value),
				value: e.value
			} : {
				label: String(e),
				value: e
			});
			try {
				let e = n.gridAPI.getData() || [], t = /* @__PURE__ */ new Set();
				for (let r = 0; r < e.length && t.size < 100; r++) {
					let i = e[r][n.column.field];
					i != null && t.add(i);
				}
				return Array.from(t).sort((e, t) => String(e).localeCompare(String(t))).map((e) => ({
					label: String(e),
					value: e
				}));
			} catch {
				return [];
			}
		});
		function b() {
			r("filter-open", n.column.field), i.value = !0, m.value ? l.value = !0 : l.value = u.value, nextTick(() => {
				(n.column.dataType || "text") === "text" && v.value > 50 && (l.value = !0);
			});
		}
		function w() {
			i.value = !1;
		}
		function T() {
			let e = (n.gridAPI.getState().config?.filters || []).filter((e) => e.field !== n.column.field), t = [];
			if (d.value) {
				let e = o.value?.getValueFilter?.();
				if (e && Array.isArray(e.value)) {
					let r = e.value.filter((e) => e !== void 0);
					r.length > 0 && t.push({
						field: n.column.field,
						operator: e.operator,
						value: r
					});
				}
			}
			let i = s.value?.getFilterConfig?.();
			i && t.push({
				field: n.column.field,
				operator: i.operator,
				value: i.value
			});
			let a = t.length > 0 ? [...e, ...t] : e;
			n.gridAPI.updateConfig({ filters: a }), t.length > 0 ? r("filter-apply", t) : r("filter-clear", n.column.field), w();
		}
		function E() {
			let e = (n.gridAPI.getState().config?.filters || []).filter((e) => e.field !== n.column.field);
			n.gridAPI.updateConfig({ filters: e }), r("filter-clear", n.column.field), w();
		}
		return n.gridAPI.on && n.gridAPI.on("column-open-filter", (e) => {
			e && e.field === n.column.field && b();
		}), (t, n) => (openBlock(), createElementBlock("div", {
			ref_key: "triggerRef",
			ref: a,
			class: "relative inline-flex items-center ml-1 select-none",
			onClick: n[3] ||= withModifiers(() => {}, ["stop"])
		}, [createElementVNode("button", {
			class: normalizeClass(["inline-flex h-5 w-5 items-center justify-center rounded cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-[var(--ht-primary)]", g.value ? "text-[var(--ht-primary)] bg-[var(--ht-primary-subtle)]/70 shadow-sm" : "text-[var(--ht-text-muted)] hover:text-[var(--ht-text)] hover:bg-[var(--ht-primary-subtle)]/60"]),
			"aria-label": `Filter ${e.column.title}`,
			"aria-pressed": g.value ? "true" : "false",
			title: g.value ? "Clear filter" : "Set filter",
			onClick: n[0] ||= withModifiers((e) => i.value ? w() : b(), ["stop"])
		}, [...n[4] ||= [createElementVNode("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			class: "h-3.5 w-3.5 transition-transform duration-200"
		}, [createElementVNode("path", { d: "M4 4h16l-6 8v5l-4 2v-7L4 4Z" })], -1)]], 10, _hoisted_1$18), createVNode(FilterPopover_default, {
			open: i.value,
			anchor: a.value,
			title: `Filter: ${e.column.title}`,
			"onUpdate:open": n[2] ||= (e) => i.value = e,
			onOpened: c
		}, {
			default: withCtx(() => [createElementVNode("div", _hoisted_2$12, [
				createElementVNode("div", _hoisted_3$9, [createElementVNode("button", {
					class: "flex w-full items-center justify-between text-xs font-semibold text-[var(--ht-text)] hover:text-[var(--ht-primary)] transition-colors",
					onClick: n[1] ||= (e) => l.value = !l.value
				}, [n[6] ||= createElementVNode("span", null, "Custom Conditions", -1), (openBlock(), createElementBlock("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					class: normalizeClass(["h-4 w-4 transition-transform duration-200", { "rotate-180": l.value }])
				}, [...n[5] ||= [createElementVNode("path", { d: "m6 9 6 6 6-6" }, null, -1)]], 2))]), withDirectives(createElementVNode("div", _hoisted_4$7, [createVNode(CustomFilterEditor_default, {
					ref_key: "customFilterRef",
					ref: s,
					field: e.column.field,
					"data-type": e.column.dataType || "text",
					"current-filter": m.value || null,
					"enum-options": y.value
				}, null, 8, [
					"field",
					"data-type",
					"current-filter",
					"enum-options"
				])], 512), [[vShow, l.value]])]),
				d.value ? (openBlock(), createElementBlock("div", _hoisted_5$6)) : createCommentVNode("", !0),
				d.value ? (openBlock(), createElementBlock("div", _hoisted_6$6, [n[7] ||= createElementVNode("div", { class: "text-xs font-semibold text-[var(--ht-text)]" }, "Filter by Values", -1), createVNode(ValueFilterEditor_default, {
					ref_key: "valueFilterRef",
					ref: o,
					field: e.column.field,
					"all-data": _.value,
					"current-filter": h.value
				}, null, 8, [
					"field",
					"all-data",
					"current-filter"
				])])) : createCommentVNode("", !0),
				createElementVNode("div", { class: "flex items-center justify-end gap-2 pt-3 border-t border-[var(--ht-border)]" }, [createElementVNode("button", {
					class: "h-8 rounded border border-[var(--ht-border)] px-2 text-xs text-[var(--ht-text)] hover:bg-[var(--ht-bg-subtle)] transition-colors",
					onClick: w
				}, " Cancel "), createElementVNode("button", {
					class: "h-8 rounded bg-[var(--ht-primary)] px-3 text-xs text-white hover:opacity-90 transition-colors",
					onClick: T
				}, " Apply ")]),
				g.value ? (openBlock(), createElementBlock("div", _hoisted_7$5, [createElementVNode("button", {
					class: "w-full h-8 rounded border border-[var(--ht-border)] text-xs text-[var(--ht-text)] hover:bg-[var(--ht-bg-subtle)] transition-colors",
					onClick: E
				}, " Clear Filter ")])) : createCommentVNode("", !0)
			])]),
			_: 1
		}, 8, [
			"open",
			"anchor",
			"title"
		])], 512));
	}
}), _hoisted_1$17 = [
	"data-resizable",
	"data-pinned",
	"aria-sort",
	"aria-label",
	"draggable"
], HeaderCell_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "HeaderCell",
	props: {
		column: {},
		width: {},
		gridAPI: {},
		dragContext: {},
		borderClasses: {},
		selectedRows: {},
		totalRows: {}
	},
	emits: [
		"sort-indicator-focus",
		"column-drag-start",
		"column-drop",
		"column-drag-end",
		"select-all",
		"clear-selection"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = computed(() => ({
			width: `${n.width}px`,
			minWidth: `${n.column.minWidth || 50}px`,
			maxWidth: `${n.column.maxWidth || 400}px`
		})), a = toRef(n, "column"), o = toRef(n, "dragContext"), { pinnedSide: s, isColumnDraggable: c, isDragSource: l, dragOverPosition: u, isDropBlocked: d, handleColumnDragStart: f, handleColumnDragEnd: p, handleColumnDragOver: m, handleColumnDragLeave: h, handleColumnDrop: g } = useColumnDrag({
			columnRef: a,
			dragContextRef: o,
			emit: r
		}), { isColumnResizable: _, isResizeActive: v, handleResize: y, handleResizeDoubleClick: w } = useColumnResize({
			columnRef: a,
			gridAPI: n.gridAPI,
			getCurrentWidth: () => n.width
		}), T = computed(() => s.value === "right"), E = computed(() => [
			"ht-header-cell",
			n.borderClasses || "",
			"px-3 py-2",
			"flex items-center justify-between",
			"bg-[var(--ht-header-bg)]",
			"text-[var(--ht-header-text)]",
			"font-medium text-sm",
			"select-none",
			_.value ? "is-resizable" : "is-fixed-width",
			v.value ? "is-resizing" : null,
			{
				"is-dragging": l.value,
				"drag-over-before": !l.value && u.value === "before",
				"drag-over-after": !l.value && u.value === "after",
				"is-draggable": c.value,
				"drop-forbidden": !l.value && d.value,
				"is-last-pinned": n.column.isLastPinned,
				"is-first-pinned-right": n.column.isFirstRightPinned
			}
		].filter(Boolean)), D = computed(() => n.column.sortable !== void 0 && n.column.sortable !== !1), O = (e, t) => {
			let r = n.gridAPI?.changeSortPriority;
			r && r(e, t);
		}, k = (e) => {
			let t = n.gridAPI?.removeSortField;
			t && t(e);
		}, A = (e) => {
			r("sort-indicator-focus", e);
		}, j = computed(() => isFunctionalColumn(n.column)), M = computed(() => j.value ? n.column.type : null), N = () => {
			r("select-all");
		}, P = () => {
			r("clear-selection");
		};
		return (t, n) => (openBlock(), createElementBlock("div", {
			class: normalizeClass(E.value),
			style: normalizeStyle(i.value),
			role: "columnheader",
			"data-resizable": unref(_) ? "true" : "false",
			"data-pinned": unref(s),
			"aria-sort": D.value ? "none" : void 0,
			"aria-label": `Column ${e.column.title}${D.value ? ", sortable" : ""}`,
			draggable: unref(c),
			onDragstart: n[6] ||= (...e) => unref(f) && unref(f)(...e),
			onDragend: n[7] ||= (...e) => unref(p) && unref(p)(...e),
			onDragover: n[8] ||= (...e) => unref(m) && unref(m)(...e),
			onDragleave: n[9] ||= (...e) => unref(h) && unref(h)(...e),
			onDrop: n[10] ||= (...e) => unref(g) && unref(g)(...e)
		}, [j.value && M.value === "checkbox" ? (openBlock(), createBlock(unref(CheckboxHeader_default), {
			key: 0,
			options: e.column.functionalOptions,
			"selected-count": e.selectedRows?.length || 0,
			"total-selectable-rows": e.totalRows || 0,
			onSelectAll: N,
			onClearSelection: P
		}, null, 8, [
			"options",
			"selected-count",
			"total-selectable-rows"
		])) : j.value && M.value === "radio" ? (openBlock(), createBlock(unref(RadioHeader_default), {
			key: 1,
			options: e.column.functionalOptions,
			"selected-count": e.selectedRows?.length || 0,
			"total-selectable-rows": e.totalRows || 0
		}, null, 8, [
			"options",
			"selected-count",
			"total-selectable-rows"
		])) : (openBlock(), createElementBlock("div", {
			key: 2,
			class: normalizeClass(["flex items-center min-w-0 flex-1 group", {
				"justify-start": !e.column.dataType || e.column.dataType === "text",
				"justify-end": e.column.dataType === "number",
				"justify-center": e.column.dataType === "boolean"
			}])
		}, [
			e.column.dataType === "number" ? (openBlock(), createBlock(SortIndicator_default, {
				key: 0,
				column: e.column,
				"grid-a-p-i": e.gridAPI,
				class: "order-1",
				onSortPriorityChange: O,
				onSortFieldRemove: k,
				onSortIndicatorFocus: A,
				onDragstart: n[0] ||= withModifiers(() => {}, ["stop"])
			}, null, 8, ["column", "grid-a-p-i"])) : createCommentVNode("", !0),
			createElementVNode("span", { class: normalizeClass(["truncate", {
				"order-1": !e.column.dataType || e.column.dataType === "text" || e.column.dataType === "boolean" || e.column.dataType === "date",
				"order-2": e.column.dataType === "number"
			}]) }, toDisplayString(e.column.title), 3),
			!e.column.dataType || e.column.dataType === "text" || e.column.dataType === "boolean" || e.column.dataType === "date" ? (openBlock(), createBlock(SortIndicator_default, {
				key: 1,
				column: e.column,
				"grid-a-p-i": e.gridAPI,
				class: "order-2",
				onSortPriorityChange: O,
				onSortFieldRemove: k,
				onSortIndicatorFocus: A,
				onDragstart: n[1] ||= withModifiers(() => {}, ["stop"])
			}, null, 8, ["column", "grid-a-p-i"])) : createCommentVNode("", !0),
			e.column.filterable === !1 ? createCommentVNode("", !0) : (openBlock(), createBlock(FilterIndicator_default, {
				key: 2,
				column: e.column,
				"grid-a-p-i": e.gridAPI,
				class: "order-3",
				onFilterOpen: () => {}
			}, null, 8, ["column", "grid-a-p-i"]))
		], 2)), unref(_) ? (openBlock(), createElementBlock("div", {
			key: 3,
			class: normalizeClass(["ht-resize-handle w-1 h-full cursor-col-resize bg-transparent hover:bg-[var(--ht-primary)] opacity-0 hover:opacity-100 transition-all", T.value ? "left-handle mr-2" : "right-handle ml-2"]),
			onMousedown: n[2] ||= (...e) => unref(y) && unref(y)(...e),
			onDblclick: n[3] ||= (...e) => unref(w) && unref(w)(...e),
			onDragstart: n[4] ||= withModifiers(() => {}, ["prevent"]),
			onClick: n[5] ||= withModifiers(() => {}, ["stop"])
		}, null, 34)) : createCommentVNode("", !0)], 46, _hoisted_1$17));
	}
}), [["__scopeId", "data-v-dd4b7c53"]]), GridHeader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "GridHeader",
	props: {
		columns: {},
		paneConfig: {},
		scrollLeft: {},
		height: {},
		isContentOverflowing: { type: Boolean },
		gridAPI: {},
		headerCellBorderClasses: {},
		selectedRows: {},
		totalRows: {}
	},
	emits: [
		"header-scroll",
		"sort-indicator-focus",
		"select-all",
		"clear-selection"
	],
	setup(t, { expose: n, emit: r }) {
		let i = createLogger({ module: "GridHeader" }), a = t, o = r, s = ref(), c = ref(), l = !1, u = ref(null), d = computed(() => a.gridAPI), f = computed(() => ({
			height: `${a.height}px`,
			position: "sticky",
			top: 0,
			zIndex: 40,
			background: "var(--ht-header-bg)"
		})), p = computed(() => ({ width: `${a.paneConfig.center.width}px` }));
		watch(() => a.scrollLeft, (e) => {
			l || c.value && c.value.scrollLeft !== e && (l = !0, c.value.scrollLeft = e, nextTick(() => {
				l = !1;
			}));
		});
		let m = (e) => {
			if (l) return;
			let t = e.target.scrollLeft;
			l = !0, o("header-scroll", t), nextTick(() => {
				l = !1;
			});
		}, h = (e) => {
			o("sort-indicator-focus", e);
		}, _ = () => {
			u.value = null;
		}, v = (e) => {
			u.value = e;
		}, y = (e, t) => {
			let n = a.gridAPI.getState().columns || [], r = n.find((e) => e.id === t);
			if (!r || isColumnDropBlocked(u.value, r)) return null;
			let i = n.map((e) => e.id);
			return i.includes(e) ? {
				columns: n,
				targetColumn: r,
				order: i
			} : null;
		}, w = (e, t, n, r, i) => {
			if (!e.includes(t)) return e.length;
			let a = e.findIndex((e) => e === t), o = getColumnPinnedLocation(n), s = e.map((e) => i.find((t) => t.id === e)).filter((e) => !!e).filter((e) => getColumnPinnedLocation(e) === o).map((e) => e.id), c = s.findIndex((e) => e === t);
			if (c !== -1) {
				let t = e.findIndex((e) => e === s[c]);
				return r === "before" ? t : t + 1;
			}
			return r === "before" ? a : a + 1;
		}, T = (e, t, n) => {
			let r = d.value.moveColumn;
			if (typeof r == "function") r(e, t);
			else if (typeof d.value.setColumnOrder == "function") {
				let r = [...n];
				r.splice(t, 0, e), d.value.setColumnOrder(r);
			}
		}, E = (e) => {
			let t = u.value?.columnId;
			if (!t || e.columnId === t) {
				_();
				return;
			}
			let n = y(t, e.columnId);
			if (!n) {
				_();
				return;
			}
			let { columns: r, targetColumn: i, order: a } = n, o = a.filter((e) => e !== t), s = w(o, e.columnId, i, e.position, r);
			T(t, s, o), _();
		}, D = () => {
			_();
		};
		typeof a.gridAPI.on == "function" && a.gridAPI.on("column-open-filter", (e) => {
			try {
				let t = e?.field;
				if (!t || e?.__skipHeader) return;
				let n = (a.gridAPI.getState().columns || []).find((e) => e.field === t || e.id === t);
				if (!n) return;
				if (getColumnPinnedLocation(n) === "center") {
					let e = (a.paneConfig.center.columns || []).findIndex((e) => e.field === t || e.id === t);
					if (e >= 0 && c.value) {
						let n = a.paneConfig.center.columns, r = 0;
						for (let t = 0; t < e; t++) {
							let e = Number(n[t]?.width) || 150;
							r += e;
						}
						let i = Number(n[e]?.width) || 150, o = c.value, s = o.scrollLeft, l = s + o.clientWidth, u = s;
						if (r < s ? u = r : r + i > l && (u = Math.max(0, r - (o.clientWidth - i))), u !== s) try {
							o.scrollTo({
								left: u,
								behavior: "smooth"
							});
						} catch {
							o.scrollLeft = u;
						}
						let d = 0, f = () => {
							d++, d < 11 ? requestAnimationFrame(f) : a.gridAPI.emit("column-open-filter", {
								field: t,
								__skipHeader: !0
							});
						};
						requestAnimationFrame(f);
						return;
					}
				}
				requestAnimationFrame(() => a.gridAPI.emit("column-open-filter", {
					field: t,
					__skipHeader: !0
				}));
			} catch (e) {
				i.warn("Failed to handle column-open-filter event", e);
			}
		});
		let O = () => {
			o("select-all");
		}, k = () => {
			o("clear-selection");
		};
		return n({}), (e, n) => (openBlock(), createElementBlock("div", {
			class: "ht-header flex",
			style: normalizeStyle(f.value),
			role: "rowgroup"
		}, [
			t.paneConfig.left.columns.length > 0 ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: "ht-pane-left flex-shrink-0 flex bg-[var(--ht-header-bg)] relative z-10",
				style: normalizeStyle({ width: `${t.paneConfig.left.width}px` })
			}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(t.paneConfig.left.columns, (e) => (openBlock(), createBlock(HeaderCell_default, {
				key: e.id,
				column: e,
				width: e.width || 150,
				"grid-a-p-i": t.gridAPI,
				"drag-context": u.value,
				"border-classes": t.headerCellBorderClasses,
				"selected-rows": t.selectedRows,
				"total-rows": t.totalRows,
				onColumnDragStart: v,
				onColumnDrop: E,
				onColumnDragEnd: D,
				onSelectAll: O,
				onClearSelection: k
			}, null, 8, [
				"column",
				"width",
				"grid-a-p-i",
				"drag-context",
				"border-classes",
				"selected-rows",
				"total-rows"
			]))), 128))], 4)) : createCommentVNode("", !0),
			createElementVNode("div", {
				ref_key: "centerScrollArea",
				ref: c,
				class: normalizeClass(["ht-pane-center overflow-x-auto overflow-y-visible relative ht-hide-scrollbar", { "flex-1": t.isContentOverflowing }]),
				onScroll: m
			}, [createElementVNode("div", {
				ref_key: "centerPane",
				ref: s,
				class: "flex",
				style: normalizeStyle(p.value)
			}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(t.paneConfig.center.columns, (e) => (openBlock(), createBlock(HeaderCell_default, {
				key: e.id,
				column: e,
				width: e.width || 150,
				"grid-a-p-i": t.gridAPI,
				"drag-context": u.value,
				"border-classes": t.headerCellBorderClasses,
				"selected-rows": t.selectedRows,
				"total-rows": t.totalRows,
				onSortIndicatorFocus: h,
				onColumnDragStart: v,
				onColumnDrop: E,
				onColumnDragEnd: D,
				onSelectAll: O,
				onClearSelection: k
			}, null, 8, [
				"column",
				"width",
				"grid-a-p-i",
				"drag-context",
				"border-classes",
				"selected-rows",
				"total-rows"
			]))), 128))], 4)], 34),
			t.paneConfig.right.columns.length > 0 ? (openBlock(), createElementBlock("div", {
				key: 1,
				class: "ht-pane-right flex-shrink-0 flex bg-[var(--ht-header-bg)] relative z-10",
				style: normalizeStyle({ width: `${t.paneConfig.right.width}px` })
			}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(t.paneConfig.right.columns, (e) => (openBlock(), createBlock(HeaderCell_default, {
				key: e.id,
				column: e,
				width: e.width || 150,
				"grid-a-p-i": t.gridAPI,
				"drag-context": u.value,
				"border-classes": t.headerCellBorderClasses,
				"selected-rows": t.selectedRows,
				"total-rows": t.totalRows,
				onColumnDragStart: v,
				onColumnDrop: E,
				onColumnDragEnd: D,
				onSelectAll: O,
				onClearSelection: k
			}, null, 8, [
				"column",
				"width",
				"grid-a-p-i",
				"drag-context",
				"border-classes",
				"selected-rows",
				"total-rows"
			]))), 128))], 4)) : createCommentVNode("", !0)
		], 4));
	}
}), GridHeader_default = /* @__PURE__ */ __plugin_vue_export_helper_default(GridHeader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-898ee759"]]), _hoisted_1$16 = ["title"], TextCell_default = /* @__PURE__ */ defineComponent({
	__name: "TextCell",
	props: {
		value: {},
		align: { default: "left" },
		truncate: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let t = e, n = {
			left: "text-left",
			center: "text-center",
			right: "text-right"
		}, r = t.value ?? "";
		return (t, i) => (openBlock(), createElementBlock("span", {
			class: normalizeClass([
				"inline-block w-full",
				n[e.align],
				e.truncate ? "truncate" : ""
			]),
			title: e.truncate ? String(unref(r)) : void 0
		}, toDisplayString(unref(r)), 11, _hoisted_1$16));
	}
}), _hoisted_1$15 = ["title"], NumberCell_default = /* @__PURE__ */ defineComponent({
	__name: "NumberCell",
	props: {
		value: {},
		decimals: {},
		locale: { default: "en-US" },
		useGrouping: {
			type: Boolean,
			default: !0
		},
		align: { default: "right" },
		prefix: {},
		suffix: {}
	},
	setup(e) {
		let t = e, n = (() => {
			if (t.value === null || t.value === void 0) return "";
			let e = typeof t.value == "string" ? parseFloat(t.value) : t.value;
			if (isNaN(e)) return String(t.value);
			let n = new Intl.NumberFormat(t.locale, {
				minimumFractionDigits: t.decimals,
				maximumFractionDigits: t.decimals,
				useGrouping: t.useGrouping
			}).format(e);
			return `${t.prefix || ""}${n}${t.suffix || ""}`;
		})(), r = {
			left: "text-left",
			center: "text-center",
			right: "text-right"
		};
		return (t, i) => (openBlock(), createElementBlock("span", {
			class: normalizeClass(["inline-block w-full tabular-nums", r[e.align]]),
			title: String(e.value)
		}, toDisplayString(unref(n)), 11, _hoisted_1$15));
	}
}), _hoisted_1$14 = ["title"], DateCell_default = /* @__PURE__ */ defineComponent({
	__name: "DateCell",
	props: {
		value: {},
		format: { default: "date" },
		customFormat: {},
		locale: { default: "en-US" },
		align: { default: "left" }
	},
	setup(e) {
		let t = e, n = (e) => {
			if (!e) return null;
			if (e instanceof Date) return isNaN(e.getTime()) ? null : e;
			let t = new Date(e);
			return isNaN(t.getTime()) ? null : t;
		}, r = {
			date: {
				year: "numeric",
				month: "short",
				day: "numeric"
			},
			datetime: {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			},
			time: {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			}
		}, i = (e) => {
			let n = (/* @__PURE__ */ new Date()).getTime() - e.getTime(), r = Math.floor(n / 1e3), i = Math.floor(r / 60), a = Math.floor(i / 60), o = Math.floor(a / 24);
			return r < 60 ? `${r}s ago` : i < 60 ? `${i}m ago` : a < 24 ? `${a}h ago` : o < 30 ? `${o}d ago` : e.toLocaleDateString(t.locale);
		}, a = (() => {
			let e = n(t.value);
			if (!e) return "";
			if (t.format === "relative") return i(e);
			let a = t.format === "custom" ? t.customFormat : r[t.format];
			return new Intl.DateTimeFormat(t.locale, a).format(e);
		})(), o = {
			left: "text-left",
			center: "text-center",
			right: "text-right"
		};
		return (t, n) => (openBlock(), createElementBlock("span", {
			class: normalizeClass(["inline-block w-full", o[e.align]]),
			title: e.value ? new Date(e.value).toISOString() : void 0
		}, toDisplayString(unref(a)), 11, _hoisted_1$14));
	}
}), _hoisted_1$13 = {
	key: 0,
	class: "truncate"
}, _hoisted_2$11 = {
	key: 1,
	class: "flex-shrink-0"
}, _hoisted_3$8 = {
	key: 0,
	class: "w-4 h-4 text-[var(--ht-success)]",
	fill: "currentColor",
	viewBox: "0 0 20 20"
}, _hoisted_4$6 = {
	key: 1,
	class: "w-4 h-4 text-[var(--ht-danger)]",
	fill: "currentColor",
	viewBox: "0 0 20 20"
}, BooleanCell_default = /* @__PURE__ */ defineComponent({
	__name: "BooleanCell",
	props: {
		value: { type: [Boolean, null] },
		showText: {
			type: Boolean,
			default: !0
		},
		showIcon: {
			type: Boolean,
			default: !0
		},
		align: { default: "center" },
		trueText: { default: "Yes" },
		falseText: { default: "No" },
		nullText: { default: "" }
	},
	setup(e) {
		let t = e, n = (() => t.value === null || t.value === void 0 ? t.nullText : t.value ? t.trueText : t.falseText)(), r = {
			left: "justify-start",
			center: "justify-center",
			right: "justify-end"
		};
		return (t, i) => (openBlock(), createElementBlock("div", { class: normalizeClass(["inline-flex items-center gap-2 w-full", r[e.align]]) }, [e.showText ? (openBlock(), createElementBlock("span", _hoisted_1$13, toDisplayString(unref(n)), 1)) : createCommentVNode("", !0), e.showIcon && e.value !== null && e.value !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_2$11, [e.value ? (openBlock(), createElementBlock("svg", _hoisted_3$8, [...i[0] ||= [createElementVNode("path", {
			"fill-rule": "evenodd",
			d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
			"clip-rule": "evenodd"
		}, null, -1)]])) : (openBlock(), createElementBlock("svg", _hoisted_4$6, [...i[1] ||= [createElementVNode("path", {
			"fill-rule": "evenodd",
			d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
			"clip-rule": "evenodd"
		}, null, -1)]]))])) : createCommentVNode("", !0)], 2));
	}
}), _hoisted_1$12 = [
	"aria-label",
	"tabindex",
	"data-cell-id",
	"data-row-id",
	"data-column-id",
	"data-row-index",
	"data-column-index"
], _hoisted_2$10 = {
	key: 10,
	class: "absolute inset-0 pointer-events-none ring-2 ring-[var(--ht-primary)] ring-inset",
	"aria-hidden": "true"
}, cellRole = "gridcell", BodyCell_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BodyCell",
	props: {
		row: {},
		column: {},
		value: { type: [
			String,
			Number,
			Boolean,
			Date,
			null
		] },
		focused: { type: Boolean },
		rowSelected: { type: Boolean },
		rowIndex: {},
		columnIndex: {},
		borderClasses: {}
	},
	emits: [
		"cell-click",
		"cell-double-click",
		"cell-right-click",
		"toggle-selection",
		"row-drag-start"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = computed(() => ({
			width: `${n.column.width || 150}px`,
			minWidth: `${n.column.minWidth || 50}px`,
			maxWidth: `${n.column.maxWidth || 400}px`
		})), a = computed(() => [
			"ht-body-cell",
			"px-3 py-1",
			n.borderClasses || "",
			"flex items-center",
			"text-[var(--ht-text)]",
			"text-sm",
			"truncate",
			"relative",
			{
				"bg-[var(--ht-cell-focused)]": n.focused,
				"ring-2 ring-[var(--ht-primary)] ring-inset": n.focused,
				"cursor-text": n.column.dataType === "text",
				"cursor-pointer": !n.column.dataType || n.column.dataType !== "text",
				"ht-cell-interactive": n.column.dataType === "custom" || n.column.formatter,
				"is-last-pinned": n.column.isLastPinned,
				"is-first-pinned-right": n.column.isFirstRightPinned
			}
		].filter(Boolean)), o = computed(() => n.column.formatter ? n.column.formatter(n.value, n.row) : n.value ?? ""), s = (e) => {
			r("cell-click", n.column, n.value, e);
		}, c = (e) => {
			r("cell-double-click", n.column, n.value, e);
		}, l = (e) => {
			e.preventDefault(), r("cell-right-click", n.column, n.value, e);
		}, u = (e) => {
			if (n.focused) switch (e.key) {
				case "Enter":
					e.preventDefault();
					break;
				case "F2":
					e.preventDefault();
					break;
				case "Escape":
					e.preventDefault();
					break;
			}
		}, d = computed(() => `${n.column.title}: ${o.value}`), f = computed(() => isFunctionalColumn(n.column)), p = computed(() => f.value ? n.column.type : null), m = () => {
			!p.value || p.value !== "checkbox" && p.value !== "radio" || r("toggle-selection", {
				rowData: n.row,
				rowIndex: n.rowIndex,
				column: n.column,
				selectionType: p.value
			});
		}, h = (e, t, n) => {
			r("row-drag-start", {
				row: e,
				rowIndex: t,
				event: n
			});
		}, g = (e, t, n) => {};
		return (t, n) => (openBlock(), createElementBlock("div", {
			class: normalizeClass(a.value),
			style: normalizeStyle(i.value),
			role: cellRole,
			"aria-label": d.value,
			tabindex: e.focused ? 0 : -1,
			"data-cell-id": `${e.row.id || e.row.index}-${e.column.id}`,
			"data-row-id": e.row.id || e.row.index,
			"data-column-id": e.column.id,
			"data-row-index": e.rowIndex,
			"data-column-index": e.columnIndex,
			onClick: s,
			onDblclick: c,
			onContextmenu: l,
			onKeydown: u
		}, [f.value && p.value === "seq" ? (openBlock(), createBlock(unref(SeqCell_default), {
			key: 0,
			"row-index": e.rowIndex,
			options: e.column.functionalOptions,
			"pagination-offset": 0
		}, null, 8, ["row-index", "options"])) : f.value && p.value === "checkbox" ? (openBlock(), createBlock(unref(CheckboxCell_default), {
			key: 1,
			"row-data": e.row,
			"row-index": e.rowIndex,
			"is-selected": e.rowSelected,
			column: e.column,
			options: e.column.functionalOptions,
			onToggleSelection: m
		}, null, 8, [
			"row-data",
			"row-index",
			"is-selected",
			"column",
			"options"
		])) : f.value && p.value === "radio" ? (openBlock(), createBlock(unref(RadioCell_default), {
			key: 2,
			"row-data": e.row,
			"row-index": e.rowIndex,
			"is-selected": e.rowSelected,
			column: e.column,
			options: e.column.functionalOptions,
			onToggleSelection: m
		}, null, 8, [
			"row-data",
			"row-index",
			"is-selected",
			"column",
			"options"
		])) : f.value && p.value === "drag" ? (openBlock(), createBlock(unref(DragCell_default), {
			key: 3,
			"row-data": e.row,
			"row-index": e.rowIndex,
			options: e.column.functionalOptions,
			onDragStart: h,
			onDragEnd: g
		}, null, 8, [
			"row-data",
			"row-index",
			"options"
		])) : f.value && p.value === "actions" ? (openBlock(), createBlock(unref(ActionsCell_default), {
			key: 4,
			"row-data": e.row,
			"row-index": e.rowIndex,
			options: e.column.functionalOptions
		}, createSlots({ _: 2 }, [e.column.cellSlot ? {
			name: "default",
			fn: withCtx((n) => [renderSlot(t.$slots, e.column.cellSlot, normalizeProps(guardReactiveProps(n)), void 0, !0)]),
			key: "0"
		} : void 0]), 1032, [
			"row-data",
			"row-index",
			"options"
		])) : e.column.cellRenderer ? (openBlock(), createBlock(resolveDynamicComponent(e.column.cellRenderer), {
			key: 5,
			value: e.value,
			row: e.row,
			column: e.column,
			class: "w-full"
		}, null, 8, [
			"value",
			"row",
			"column"
		])) : e.column.dataType === "boolean" ? (openBlock(), createBlock(unref(BooleanCell_default), {
			key: 6,
			value: e.value
		}, null, 8, ["value"])) : e.column.dataType === "number" ? (openBlock(), createBlock(unref(NumberCell_default), {
			key: 7,
			value: e.value
		}, null, 8, ["value"])) : e.column.dataType === "date" ? (openBlock(), createBlock(unref(DateCell_default), {
			key: 8,
			value: e.value
		}, null, 8, ["value"])) : (openBlock(), createBlock(unref(TextCell_default), {
			key: 9,
			value: String(o.value)
		}, null, 8, ["value"])), e.focused ? (openBlock(), createElementBlock("div", _hoisted_2$10)) : createCommentVNode("", !0)], 46, _hoisted_1$12));
	}
}), BodyCell_default = /* @__PURE__ */ __plugin_vue_export_helper_default(BodyCell_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-4478fea4"]]), _hoisted_1$11 = ["aria-rowindex", "aria-selected"], BodyRow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "BodyRow",
	props: {
		row: {},
		columns: {},
		rowIndex: {},
		virtualItem: {},
		rowHeight: {},
		focusedCell: {},
		selected: { type: Boolean },
		hoveredRowKey: {},
		rowBorderClasses: {},
		cellBorderClasses: {},
		stripeEnabled: { type: Boolean }
	},
	emits: [
		"row-click",
		"cell-click",
		"cell-double-click",
		"cell-right-click",
		"row-hover",
		"row-leave",
		"toggle-selection",
		"row-drag-start",
		"row-drag-over",
		"row-drag-end"
	],
	setup(e, { emit: t }) {
		let n = () => [
			"ht-virtual-item",
			"ht-body-row",
			"hover:bg-[var(--ht-row-hover)]",
			"cursor-pointer"
		], r = e, i = t, a = computed(() => ({
			transform: `translateY(${r.virtualItem.start}px)`,
			minHeight: `${r.rowHeight}px`,
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			display: "flex",
			flexDirection: "column"
		})), o = (e) => {
			e.target.closest(".ht-cell-interactive") || i("row-click", r.row, r.rowIndex);
		}, s = (e, t, n) => {
			n.stopPropagation(), i("cell-click", r.row, e, t), i("row-click", r.row, r.rowIndex);
		}, c = (e, t, n) => {
			n.stopPropagation(), i("cell-double-click", r.row, e, t);
		}, l = (e, t, n) => {
			n.stopPropagation(), i("cell-right-click", r.row, e, t);
		}, u = computed(() => !r.focusedCell || r.focusedCell.rowId !== r.row?.id ? null : r.focusedCell.columnId), d = (e) => u.value === e, f = computed(() => r.row), p = computed(() => {
			let e = f.value;
			return e && e.id !== null ? e.id : e && e.rowId !== null ? e.rowId : r.virtualItem?.index === null ? r.rowIndex : r.virtualItem.index;
		}), m = computed(() => r.hoveredRowKey !== null && r.hoveredRowKey === p.value), h = inject("draggingRowId", ref(null)), _ = inject("dropTargetRowId", ref(null)), v = inject("dropTargetPosition", ref(null)), y = inject("setDropTarget", () => {}), w = computed(() => h.value !== null && h.value === p.value), T = computed(() => _.value !== null && _.value === p.value), E = computed(() => T.value ? v.value : null), D = computed(() => [...n(), {
			"bg-[var(--ht-row-selected)]": r.selected,
			"bg-[var(--ht-row-odd)]": r.stripeEnabled && !r.selected && r.rowIndex % 2 == 1,
			"bg-[var(--ht-row-even)]": r.stripeEnabled && !r.selected && r.rowIndex % 2 == 0,
			"ht-row-hover-state": m.value && !r.selected,
			"ht-row-hover-selected": m.value && r.selected,
			"ht-row-dragging": w.value,
			"ht-row-drop-target": T.value && !w.value
		}]), O = () => {
			i("row-hover", p.value);
		}, k = () => {
			i("row-leave", p.value);
		}, A = (e) => {
			let t = r.columns.findIndex((t) => t.id === e.column.id);
			i("toggle-selection", {
				...e,
				rowId: p.value,
				columnIndex: t >= 0 ? t : 0
			});
		}, M = (e) => {
			e.preventDefault(), i("row-drag-over", e);
			let t = e.currentTarget.getBoundingClientRect(), n = t.top + t.height / 2, r = e.clientY < n ? "top" : "bottom";
			y(p.value, r);
		}, N = (e) => {
			let t = e.relatedTarget;
			(!t || !e.currentTarget.contains(t)) && _.value === p.value && y(null, null);
		}, P = (e) => {
			let t = E.value;
			y(null, null);
			try {
				let n = e.dataTransfer?.getData("application/json");
				if (!n) return;
				let a = JSON.parse(n), o = r.rowIndex;
				if (t === "bottom" && (o = r.rowIndex + 1), a.rowIndex === o) return;
				let s = {
					sourceIndex: a.rowIndex,
					destinationIndex: o,
					rowData: a.rowData
				};
				i("row-drag-end", {
					result: s,
					sourceId: a.rowData?.id ?? a.rowIndex,
					targetId: r.row?.id ?? r.rowIndex
				});
			} catch {}
		};
		return (t, n) => (openBlock(), createElementBlock("div", {
			class: normalizeClass(D.value),
			style: normalizeStyle(a.value),
			role: "row",
			"aria-rowindex": e.rowIndex + 1,
			"aria-selected": e.selected
		}, [E.value === null ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", {
			key: 0,
			class: normalizeClass(["ht-drop-indicator", {
				"ht-drop-top": E.value === "top",
				"ht-drop-bottom": E.value === "bottom"
			}]),
			"aria-hidden": "true"
		}, null, 2)), createElementVNode("div", {
			class: normalizeClass(["ht-row-cells", e.rowBorderClasses]),
			style: normalizeStyle({
				height: `${e.rowHeight}px`,
				display: "flex",
				alignItems: "center"
			}),
			onClick: o,
			onMouseenter: O,
			onMouseleave: k,
			onDragover: withModifiers(M, ["prevent"]),
			onDragleave: N,
			onDrop: withModifiers(P, ["prevent"])
		}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(e.columns, (t, r) => (openBlock(), createBlock(BodyCell_default, {
			key: t.id,
			row: e.row,
			column: t,
			value: e.row && t.field ? e.row[t.field] : void 0,
			focused: d(t.id),
			"row-selected": e.selected,
			"row-index": e.rowIndex,
			"column-index": r,
			"border-classes": e.cellBorderClasses,
			onCellClick: s,
			onCellDoubleClick: c,
			onCellRightClick: l,
			onToggleSelection: A,
			onRowDragStart: n[0] ||= (e) => i("row-drag-start", e)
		}, null, 8, [
			"row",
			"column",
			"value",
			"focused",
			"row-selected",
			"row-index",
			"column-index",
			"border-classes"
		]))), 128))], 38)], 14, _hoisted_1$11));
	}
}), BodyRow_default = /* @__PURE__ */ __plugin_vue_export_helper_default(BodyRow_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2dfc7516"]]), DragAutoScroller = class {
	scrollContainer = null;
	scrollInterval = null;
	scrollZone;
	scrollSpeed;
	horizontal;
	vertical;
	currentScrollX = 0;
	currentScrollY = 0;
	constructor(e, t = {}) {
		this.scrollContainer = e, this.scrollZone = t.scrollZone ?? 50, this.scrollSpeed = t.scrollSpeed ?? 10, this.horizontal = t.horizontal ?? !1, this.vertical = t.vertical ?? !0;
	}
	start(e) {
		if (!this.scrollContainer) return;
		let t = this.scrollContainer.getBoundingClientRect(), { clientX: n, clientY: r } = e, i = 0, a = 0;
		if (this.vertical) {
			let e = r - t.top, n = t.bottom - r;
			e < this.scrollZone && e >= 0 ? a = -this.scrollSpeed : n < this.scrollZone && n >= 0 && (a = this.scrollSpeed);
		}
		if (this.horizontal) {
			let e = n - t.left, r = t.right - n;
			e < this.scrollZone && e >= 0 ? i = -this.scrollSpeed : r < this.scrollZone && r >= 0 && (i = this.scrollSpeed);
		}
		this.currentScrollX = i, this.currentScrollY = a, this.currentScrollX !== 0 || this.currentScrollY !== 0 ? this.ensureInterval() : this.stop();
	}
	ensureInterval() {
		this.scrollInterval ||= window.setInterval(() => {
			this.scrollContainer && (this.currentScrollY !== 0 && (this.scrollContainer.scrollTop += this.currentScrollY), this.currentScrollX !== 0 && (this.scrollContainer.scrollLeft += this.currentScrollX), this.currentScrollX === 0 && this.currentScrollY === 0 && this.stop());
		}, 16);
	}
	stop() {
		this.scrollInterval &&= (clearInterval(this.scrollInterval), null);
	}
	destroy() {
		this.stop(), this.scrollContainer = null;
	}
}, _hoisted_1$10 = { class: "ht-panes-container flex" }, _hoisted_2$9 = { class: "ht-virtual-container-left relative" }, _hoisted_3$7 = { class: "ht-virtual-container-right relative" }, GridBody_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "GridBody",
	props: {
		data: {},
		columns: {},
		paneConfig: {},
		virtualizer: {},
		rowHeight: {},
		isContentOverflowing: { type: Boolean },
		focusedCell: {},
		selectedRows: {},
		interactionContract: {},
		bodyRowBorderClasses: {},
		bodyCellBorderClasses: {},
		stripeEnabled: { type: Boolean }
	},
	emits: ["scroll"],
	setup(t, { expose: n, emit: r }) {
		let i = createLogger("grid-body"), a = t, o = r, s = ref(), c = ref(), l = ref(), u = computed(() => ({
			height: "100%",
			overflow: "hidden",
			position: "relative"
		})), d = computed(() => ({
			height: `${a.data.totalHeight}px`,
			position: "relative",
			overflow: "hidden"
		})), f = computed(() => ({
			...d.value,
			width: `${a.paneConfig.center.width}px`
		})), p = computed(() => ({
			height: "100%",
			overflow: "auto"
		})), m = ref(0), h = ref(0), _ = ref(null), v = ref(null), y = (e) => {
			v.value = e;
		}, w = ref(null), T = ref(null);
		provide("draggingRowId", v), provide("setDraggingRowId", y), provide("dropTargetRowId", w), provide("dropTargetPosition", T), provide("setDropTarget", (e, t) => {
			w.value = e, T.value = t;
		});
		let E = null, D = computed(() => a.virtualizer.virtualItems.value || []), O = computed(() => D.value.map((e) => {
			let t = a.data.visibleRows[e.index];
			return t ? {
				...e,
				row: t,
				rowArrayIndex: e.index
			} : (i.warn(`Missing row data for index ${e.index}, total rows: ${a.data.visibleRows.length}`), null);
		}).filter((e) => e !== null)), k = (e) => {
			_.value = e;
		}, A = (e) => {
			_.value === e && (_.value = null);
		}, j = (e) => {
			let t = e.target;
			h.value = t.scrollTop;
			let n = {
				...e,
				target: {
					...t,
					scrollLeft: m.value,
					scrollTop: h.value,
					dataset: { pane: "body" }
				}
			};
			o("scroll", n);
		}, M = (e) => {
			let t = e.target;
			m.value = t.scrollLeft;
			let n = {
				...e,
				target: {
					...t,
					scrollLeft: m.value,
					scrollTop: h.value,
					dataset: { pane: "body" }
				}
			};
			o("scroll", n);
		}, N = useRAFScroll({
			onScroll: j,
			debounceDelay: 150,
			trackVelocity: !0
		}), P = useRAFScroll({
			onScroll: M,
			debounceDelay: 150,
			trackVelocity: !0
		}), F = N.handleScroll, I = P.handleScroll, L = (e, t) => {
			a.interactionContract.emit?.("row-click", {
				row: e,
				index: t
			});
		}, z = (e, t, n) => {
			a.interactionContract.emit?.("cell-click", {
				row: e,
				column: t,
				value: n
			});
		}, B = (e, t, n) => {
			a.interactionContract.emit?.("cell-double-click", {
				row: e,
				column: t,
				value: n
			});
		}, V = (e, t, n) => {
			a.interactionContract.emit?.("cell-right-click", {
				row: e,
				column: t,
				value: n
			});
		}, H = (e) => {
			a.interactionContract.emit?.("toggle-selection", {
				row: e.rowData,
				rowId: e.rowId,
				rowIndex: e.rowIndex,
				selectionType: e.selectionType
			});
		}, U = (e) => {
			a.interactionContract.emit?.("row-drag-start", e);
		}, W = (e) => {
			E?.start(e);
		}, G = (e) => {
			E?.stop(), a.interactionContract.emit?.("row-drag-end", e);
		};
		return n({
			scrollToIndex: a.virtualizer.scrollToIndex,
			recalculate: () => {
				a.virtualizer.updateScrollPosition && a.virtualizer.updateScrollPosition(h.value);
			},
			enterEditMode: async (e) => a.interactionContract.toggleEditMode ? await a.interactionContract.toggleEditMode(e, "enter") : !1,
			completeEdit: async (e, t) => a.interactionContract.toggleEditMode ? await a.interactionContract.toggleEditMode(e, "exit") : !1,
			cancelEdit: (e) => {
				a.interactionContract.toggleEditMode && a.interactionContract.toggleEditMode(e, "exit");
			},
			centerScrollArea: l
		}), onMounted(() => {
			c.value && (E = new DragAutoScroller(c.value, {
				vertical: !0,
				horizontal: !1,
				scrollZone: 50,
				scrollSpeed: 10
			}));
		}), onUnmounted(() => {
			N.cleanup(), P.cleanup(), E?.destroy(), E = null;
		}), (e, n) => (openBlock(), createElementBlock("div", {
			ref_key: "bodyContainer",
			ref: s,
			class: "ht-body h-full",
			style: normalizeStyle(u.value),
			role: "rowgroup"
		}, [createElementVNode("div", {
			ref_key: "bodyScrollArea",
			ref: c,
			class: "ht-scroll-area h-full overflow-y-auto overflow-x-hidden ht-custom-scrollbar",
			onScroll: n[1] ||= (...e) => unref(F) && unref(F)(...e)
		}, [createElementVNode("div", {
			class: "ht-virtual-wrapper",
			style: normalizeStyle(d.value)
		}, [createElementVNode("div", _hoisted_1$10, [
			t.paneConfig.left.columns.length > 0 ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: "ht-pane-left flex-shrink-0 relative z-10 overflow-hidden",
				style: normalizeStyle({ width: `${t.paneConfig.left.width}px` })
			}, [createElementVNode("div", _hoisted_2$9, [(openBlock(!0), createElementBlock(Fragment, null, renderList(O.value, (e) => (openBlock(), createBlock(BodyRow_default, {
				key: `left-${e.row.id || e.index}`,
				row: e.row,
				columns: t.paneConfig.left.columns,
				"row-index": e.index,
				"virtual-item": e,
				"row-height": t.rowHeight,
				"focused-cell": t.focusedCell,
				selected: e.row.id !== null && e.row.id !== void 0 && t.selectedRows.includes(e.row.id),
				"hovered-row-key": _.value,
				"row-border-classes": t.bodyRowBorderClasses,
				"cell-border-classes": t.bodyCellBorderClasses,
				"stripe-enabled": t.stripeEnabled,
				onRowClick: L,
				onCellClick: z,
				onCellDoubleClick: B,
				onCellRightClick: V,
				onRowHover: k,
				onRowLeave: A,
				onToggleSelection: H,
				onRowDragStart: U,
				onRowDragOver: W,
				onRowDragEnd: G
			}, null, 8, [
				"row",
				"columns",
				"row-index",
				"virtual-item",
				"row-height",
				"focused-cell",
				"selected",
				"hovered-row-key",
				"row-border-classes",
				"cell-border-classes",
				"stripe-enabled"
			]))), 128))])], 4)) : createCommentVNode("", !0),
			createElementVNode("div", { class: normalizeClass(["ht-pane-center relative overflow-hidden", { "flex-1": t.isContentOverflowing }]) }, [createElementVNode("div", {
				ref_key: "centerScrollArea",
				ref: l,
				class: "ht-scroll-area-horizontal h-full overflow-x-auto overflow-y-hidden",
				style: normalizeStyle(p.value),
				onScroll: n[0] ||= (...e) => unref(I) && unref(I)(...e)
			}, [createElementVNode("div", {
				class: "ht-virtual-container-center",
				style: normalizeStyle(f.value)
			}, [(openBlock(!0), createElementBlock(Fragment, null, renderList(O.value, (e) => (openBlock(), createBlock(BodyRow_default, {
				key: `center-${e.row.id || e.index}`,
				row: e.row,
				columns: t.paneConfig.center.columns,
				"row-index": e.index,
				"virtual-item": e,
				"row-height": t.rowHeight,
				"focused-cell": t.focusedCell,
				selected: e.row.id !== null && e.row.id !== void 0 && t.selectedRows.includes(e.row.id),
				"hovered-row-key": _.value,
				"row-border-classes": t.bodyRowBorderClasses,
				"cell-border-classes": t.bodyCellBorderClasses,
				"stripe-enabled": t.stripeEnabled,
				onRowClick: L,
				onCellClick: z,
				onCellDoubleClick: B,
				onCellRightClick: V,
				onRowHover: k,
				onRowLeave: A,
				onToggleSelection: H,
				onRowDragStart: U,
				onRowDragOver: W,
				onRowDragEnd: G
			}, null, 8, [
				"row",
				"columns",
				"row-index",
				"virtual-item",
				"row-height",
				"focused-cell",
				"selected",
				"hovered-row-key",
				"row-border-classes",
				"cell-border-classes",
				"stripe-enabled"
			]))), 128))], 4)], 36)], 2),
			t.paneConfig.right.columns.length > 0 ? (openBlock(), createElementBlock("div", {
				key: 1,
				class: "ht-pane-right flex-shrink-0 relative z-10 overflow-hidden",
				style: normalizeStyle({ width: `${t.paneConfig.right.width}px` })
			}, [createElementVNode("div", _hoisted_3$7, [(openBlock(!0), createElementBlock(Fragment, null, renderList(O.value, (e) => (openBlock(), createBlock(BodyRow_default, {
				key: `right-${e.row.id || e.index}`,
				row: e.row,
				columns: t.paneConfig.right.columns,
				"row-index": e.index,
				"virtual-item": e,
				"row-height": t.rowHeight,
				"focused-cell": t.focusedCell,
				selected: e.row.id !== null && e.row.id !== void 0 && t.selectedRows.includes(e.row.id),
				"hovered-row-key": _.value,
				"row-border-classes": t.bodyRowBorderClasses,
				"cell-border-classes": t.bodyCellBorderClasses,
				"stripe-enabled": t.stripeEnabled,
				onRowClick: L,
				onCellClick: z,
				onCellDoubleClick: B,
				onCellRightClick: V,
				onRowHover: k,
				onRowLeave: A,
				onToggleSelection: H,
				onRowDragStart: U,
				onRowDragOver: W,
				onRowDragEnd: G
			}, null, 8, [
				"row",
				"columns",
				"row-index",
				"virtual-item",
				"row-height",
				"focused-cell",
				"selected",
				"hovered-row-key",
				"row-border-classes",
				"cell-border-classes",
				"stripe-enabled"
			]))), 128))])], 4)) : createCommentVNode("", !0)
		])], 4)], 544)], 4));
	}
}), GridBody_default = /* @__PURE__ */ __plugin_vue_export_helper_default(GridBody_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-559cd87b"]]), _hoisted_1$9 = { class: "flex items-center space-x-4" }, _hoisted_2$8 = {
	key: 0,
	class: "text-xs opacity-75"
}, _hoisted_3$6 = { class: "flex items-center space-x-2" }, GridFooter_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "GridFooter",
	props: {
		totalRows: {},
		selectedCount: {},
		renderMetrics: {}
	},
	setup(e) {
		let t = e, n = computed(() => t.selectedCount > 0 ? `${t.selectedCount} of ${t.totalRows} rows selected` : `${t.totalRows.toLocaleString()} rows`), r = computed(() => ""), i = computed(() => [
			"ht-grid-footer",
			"flex items-center justify-between",
			"px-3 py-2",
			"bg-[var(--ht-footer-bg)]",
			"border-t border-[var(--ht-border)]",
			"text-sm text-[var(--ht-text-muted)]",
			"h-10"
		]);
		return (e, t) => (openBlock(), createElementBlock("div", { class: normalizeClass(i.value) }, [createElementVNode("div", _hoisted_1$9, [createElementVNode("span", null, toDisplayString(n.value), 1), r.value ? (openBlock(), createElementBlock("span", _hoisted_2$8, toDisplayString(r.value), 1)) : createCommentVNode("", !0)]), createElementVNode("div", _hoisted_3$6, [
			createCommentVNode("", !0),
			renderSlot(e.$slots, "actions", {}, void 0, !0),
			t[1] ||= createElementVNode("div", { class: "flex items-center space-x-1" }, [createElementVNode("div", { class: "ht-status-ready w-2 h-2 bg-[var(--ht-success)] rounded-full" }), createElementVNode("span", { class: "text-xs" }, "Ready")], -1)
		])], 2));
	}
}), [["__scopeId", "data-v-23844793"]]), _hoisted_1$8 = [
	"data-border-mode",
	"aria-rowcount",
	"aria-colcount"
], _hoisted_2$7 = {
	key: 1,
	class: "ht-horizontal-scrollbar-container flex flex-shrink-0"
}, TableRendererComponent_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "TableRendererComponent",
	props: {
		renderer: {},
		interactionContract: {},
		gridAPI: {},
		options: {}
	},
	setup(t, { expose: n }) {
		let r = t, i = `ht-grid-${getCurrentInstance()?.uid ?? "0"}`;
		provide(GRID_INSTANCE_ID_KEY, i), provide(GRID_API_KEY, r.gridAPI);
		let a = computed(() => y.state?.config?.border ?? "default"), o = computed(() => y.state?.config?.stripe ?? !1), s = computed(() => {
			switch (a.value) {
				case "none": return "";
				case "outer":
				case "full":
				case "default":
				default: return "border border-[var(--ht-border)] rounded-md";
			}
		}), c = computed(() => {
			switch (a.value) {
				case "full": return "border-r border-[var(--ht-border)] last:border-r-0";
				case "default":
				case "none":
				case "outer":
				default: return "";
			}
		}), l = computed(() => {
			switch (a.value) {
				case "full":
				case "default": return "border-b border-[var(--ht-border)]";
				case "none":
				case "outer":
				default: return "";
			}
		}), u = computed(() => {
			switch (a.value) {
				case "full": return "border-r border-[var(--ht-border)] last:border-r-0";
				case "default":
				case "none":
				case "outer":
				default: return "";
			}
		}), d = createLogger("TableRendererComponent"), f = ref(), p = ref(), m = ref(), h = ref(), g = ref(), _ = ref(0), v = computed(() => f.value ? A.value.left.width + A.value.center.width + A.value.right.width > _.value : !1), y = reactive({
			state: null,
			columns: [],
			rows: [],
			loading: !1,
			error: null
		}), w = reactive({ ...r.options }), T = ref(8), E = () => {
			let e = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--ht-scrollbar-height"));
			T.value = isNaN(e) ? 8 : e;
		};
		onMounted(() => {
			E(), window.addEventListener("resize", E);
		}), onUnmounted(() => {
			window.removeEventListener("resize", E);
		});
		let O = computed(() => {
			if (!y.state) return {
				totalWidth: 0,
				headerHeight: 40,
				rowHeight: 32,
				bodyHeight: "calc(100% - 80px - var(--ht-scrollbar-height, 8px))"
			};
			let { config: e } = y.state, t = A.value, n = w.layout?.showFooter === !1 ? 0 : 40;
			return {
				totalWidth: t.left.width + t.center.width + t.right.width,
				headerHeight: e.headerHeight,
				rowHeight: e.rowHeight,
				bodyHeight: `calc(100% - ${e.headerHeight}px - ${n}px - ${T.value}px)`
			};
		}), A = computed(() => {
			let e = {
				left: {
					columns: [],
					width: 0
				},
				center: {
					columns: [],
					width: 0
				},
				right: {
					columns: [],
					width: 0
				}
			};
			for (let t of y.columns) {
				let n = t.width || 150;
				t.pinned === "left" ? (e.left.columns.push(t), e.left.width += n) : t.pinned === "right" ? (e.right.columns.push(t), e.right.width += n) : (e.center.columns.push(t), e.center.width += n);
			}
			if (e.left.columns.length > 0) {
				let t = e.left.columns[e.left.columns.length - 1];
				t.isLastPinned = !0;
			}
			if (e.right.columns.length > 0) {
				let t = e.right.columns[0];
				t.isFirstRightPinned = !0;
			}
			return e;
		}), j = ref({
			scrollLeft: 0,
			scrollTop: 0
		}), M = !1, N = reactive({
			selectedIds: /* @__PURE__ */ new Set(),
			activeId: null
		}), F = ref(0), I = [], R = useVirtualizer({
			count: computed(() => y.rows.length),
			getItemSize: () => O.value.rowHeight,
			estimateItemSize: () => O.value.rowHeight,
			overscan: 5,
			enabled: computed(() => y.rows.length > 20)
		}), z = useHorizontalVirtualizer({
			columns: computed(() => A.value.center.columns),
			getColumnWidth: (e) => A.value.center.columns[e]?.width || 150,
			overscan: 3,
			enabled: computed(() => A.value.center.columns.length > 20)
		}), B = computed(() => ({
			visibleRows: y.rows.map((e) => e.data || e),
			startIndex: R.startIndex.value,
			endIndex: R.endIndex.value,
			totalHeight: R.totalSize.value
		})), V = computed(() => {
			let e = /* @__PURE__ */ new Map();
			return y.rows.forEach((t, n) => {
				let r = t.data || t, i = String(r.id || r.rowId);
				e.set(i, n);
			}), e;
		}), H = (e, t, n) => {
			y.state = e, y.columns = t, y.rows = n, y.loading = e.loading, y.error = e.error;
		}, U = (e, t) => {
			N.selectedIds = new Set(e), F.value++;
		}, W = (e) => {
			N.activeId = e;
		}, G = (e) => {
			j.value = {
				scrollLeft: e.left,
				scrollTop: e.top
			};
		}, K = (e, t) => {
			try {
				_.value = e, nextTick(() => {
					f.value && (R.setContainerSize({
						height: t,
						width: e
					}), z.setContainerSize({
						width: e,
						height: t
					}), m.value?.recalculate && m.value.recalculate());
				});
			} catch (e) {
				d.error("Resize failed:", { module: "TableRendererComponent" }, e);
			}
		}, zo = (e) => {
			Object.assign(w, e);
		}, q = async (e) => {
			try {
				return m.value?.enterEditMode ? await m.value.enterEditMode(e) : !1;
			} catch (e) {
				return d.error("Failed to enter edit mode:", { module: "TableRendererComponent" }, e), !1;
			}
		}, Bo = async (e, t) => {
			try {
				return m.value?.completeEdit ? await m.value.completeEdit(e, t) : !1;
			} catch (e) {
				return d.error("Failed to complete edit:", { module: "TableRendererComponent" }, e), !1;
			}
		}, J = (e) => {
			m.value?.cancelEdit && m.value.cancelEdit(e);
		}, Vo = async (e, t) => {
			try {
				return t === "enter" ? await q(e) : t === "exit" ? (J(e), !0) : !1;
			} catch (n) {
				return d.error("Toggle edit mode failed:", {
					module: "TableRendererComponent",
					id: e,
					mode: t
				}, n), !1;
			}
		}, Ho = (e, t = "auto") => {
			try {
				if (!f.value) {
					d.warn("Cannot scroll: container not mounted", { id: e });
					return;
				}
				let n = String(e).split("_"), r = n[0] || "", i = V.value.get(r) ?? -1;
				if (i === -1) {
					d.warn("Row not found for ensureVisible", {
						id: e,
						rowId: r
					});
					return;
				}
				let a = O.value.headerHeight, o = O.value.rowHeight, s = i * o, c = f.value.getBoundingClientRect().height - a - 40, l = j.value.scrollTop;
				if (s >= l && s + o <= l + c) {
					d.debug("Row already visible", {
						rowIndex: i,
						id: e
					});
					return;
				}
				let u = m.value?.$el?.querySelector(".ht-scroll-area") || f.value;
				if (u.scrollTo({
					top: s,
					behavior: t
				}), d.debug("Scrolled to row", {
					rowIndex: i,
					targetScrollTop: s,
					behavior: t
				}), n.length >= 2) {
					let e = n[1], r = y.columns.findIndex((t) => t.id === e);
					if (r !== -1) {
						let e = y.columns.slice(0, r).reduce((e, t) => e + (t.width || 150), 0);
						u.scrollTo({
							left: e,
							behavior: t
						}), d.debug("Scrolled to cell", {
							rowIndex: i,
							columnIndex: r,
							targetScrollLeft: e
						});
					}
				}
			} catch (e) {
				d.error("Error in ensureVisible:", { module: "TableRendererComponent" }, e);
			}
		}, Uo = () => {
			try {
				nextTick(() => {
					if (!f.value) return;
					let e = f.value.getBoundingClientRect();
					R.setContainerSize({
						height: e.height,
						width: e.width
					}), z.setContainerSize({
						width: e.width,
						height: e.height
					}), m.value?.recalculate && m.value.recalculate();
					let t = j.value;
					R.updateScrollPosition(t.scrollTop), z.updateScrollPosition(t.scrollLeft), d.debug("Refresh completed", {
						containerSize: {
							width: e.width,
							height: e.height
						},
						rowCount: y.rows.length,
						columnCount: y.columns.length
					});
				});
			} catch (e) {
				d.error("Error in refresh:", { module: "TableRendererComponent" }, e);
			}
		}, Y = (e) => {
			try {
				if (!e.position) return;
				let t = y.rows[e.position.rowIndex];
				if (!t) return;
				let n = t.data || t, i = y.columns.find((t) => t.id === e.position?.columnId);
				n && i && r.gridAPI.emit("cell-click", {
					row: n,
					column: i,
					value: n[i.field]
				});
			} catch (e) {
				d.error("Error in handleCellClick:", { module: "TableRendererComponent" }, e);
			}
		}, X = (e) => {
			try {
				if (!e.position) return;
				let t = y.rows[e.position.rowIndex];
				if (!t) return;
				let n = t.data || t, i = y.columns.find((t) => t.id === e.position?.columnId);
				n && i && r.gridAPI.emit("cell-double-click", {
					row: n,
					column: i,
					value: n[i.field]
				});
			} catch (e) {
				d.error("Error in handleCellDoubleClick:", { module: "TableRendererComponent" }, e);
			}
		}, Z = (e) => {
			try {
				if (!e.position) return;
				let t = y.rows[e.position.rowIndex];
				if (!t) return;
				let n = t.data || t, i = y.columns.find((t) => t.id === e.position?.columnId);
				n && i && r.gridAPI.emit("cell-right-click", {
					row: n,
					column: i,
					value: n[i.field]
				});
			} catch (e) {
				d.error("Error in handleCellRightClick:", { module: "TableRendererComponent" }, e);
			}
		}, Q = (e) => {
			try {
				if (!e.position) return;
				let t = e.position.rowId, n = N.selectedIds.has(t);
				n ? N.selectedIds.delete(t) : N.selectedIds.add(t), F.value++, d.debug("Row selection toggled", {
					rowId: t,
					selected: !n
				});
			} catch (e) {
				d.error("Error in handleRowSelect:", { module: "TableRendererComponent" }, e);
			}
		}, Wo = () => {
			try {
				let e = !1, t = y.columns.find((e) => e.type === "checkbox");
				y.rows.forEach((n) => {
					let r = n.data || n, i = r?.id ?? r?.rowId ?? n?.key ?? (typeof n?.index == "number" ? n.index : null);
					i === null || N.selectedIds.has(i) || $(r, t) && (N.selectedIds.add(i), e = !0);
				}), e && F.value++, r.gridAPI.emit("select-all", { count: N.selectedIds.size }), d.debug("All rows selected via header", { count: N.selectedIds.size });
			} catch (e) {
				d.error("Error selecting all rows:", { module: "TableRendererComponent" }, e);
			}
		};
		function $(e, t) {
			return t && t.condition ? t.condition(e) : !0;
		}
		let Go = computed(() => {
			let e = y.columns.find((e) => e.type === "checkbox");
			if (!e || !e.condition) return y.rows.length;
			let t = 0;
			return y.rows.forEach((n) => {
				let r = n.data || n;
				$(r, e) && t++;
			}), t;
		}), Ko = (e) => {
			try {
				let t = N.selectedIds.size;
				if (t === 0) return;
				N.selectedIds.clear(), F.value++, r.gridAPI.emit("selection-clear", { previousCount: t }), d.debug("Selection cleared", {
					reason: e,
					previousCount: t
				});
			} catch (e) {
				d.error("Error clearing selection:", { module: "TableRendererComponent" }, e);
			}
		}, qo = () => {
			Wo();
		}, Jo = () => {
			Ko("header-action");
		}, Yo = () => ({
			state: y.state,
			columns: y.columns,
			rows: y.rows,
			loading: y.loading,
			error: y.error,
			scrollPosition: j.value,
			selection: {
				selectedIds: Array.from(N.selectedIds),
				activeId: N.activeId
			},
			layout: {
				metrics: O.value,
				paneConfig: A.value
			},
			virtualization: {
				vertical: {
					startIndex: R.startIndex.value,
					endIndex: R.endIndex.value,
					totalSize: R.totalSize.value
				},
				horizontal: {
					startIndex: z.startIndex.value,
					endIndex: z.endIndex.value,
					totalWidth: z.totalWidth.value
				}
			}
		}), Xo = () => ({
			performance: {
				type: "object",
				properties: {
					enableRAF: {
						type: "boolean",
						default: !0,
						description: "Use requestAnimationFrame for rendering"
					},
					batchUpdates: {
						type: "boolean",
						default: !0,
						description: "Batch multiple updates together"
					},
					maxConcurrentRenders: {
						type: "number",
						default: 3,
						description: "Maximum concurrent render operations"
					}
				}
			},
			accessibility: {
				type: "object",
				properties: {
					enableAria: {
						type: "boolean",
						default: !0,
						description: "Enable ARIA attributes"
					},
					announceChanges: {
						type: "boolean",
						default: !0,
						description: "Announce changes to screen readers"
					},
					keyboardNavigation: {
						type: "boolean",
						default: !0,
						description: "Enable keyboard navigation"
					}
				}
			},
			layout: {
				type: "object",
				properties: {
					showHeader: {
						type: "boolean",
						default: !0,
						description: "Show table header"
					},
					showFooter: {
						type: "boolean",
						default: !0,
						description: "Show table footer"
					},
					enablePanes: {
						type: "boolean",
						default: !0,
						description: "Enable frozen panes"
					},
					stickyHeader: {
						type: "boolean",
						default: !0,
						description: "Make header sticky on scroll"
					}
				}
			},
			theme: {
				type: "object",
				properties: { className: {
					type: "string",
					default: "",
					description: "Custom theme class name"
				} }
			}
		}), Zo = (e) => {
			if (!M) try {
				let t = e.target, n = t.scrollLeft, i = t.scrollTop;
				M = !0, j.value = {
					scrollLeft: n,
					scrollTop: i
				}, g.value && g.value.scrollLeft !== n && (g.value.scrollLeft = n), R.updateScrollPosition(i), z.updateScrollPosition(n), r.interactionContract.updateScrollPosition?.({
					left: n,
					top: i
				}), r.interactionContract.emit?.("scroll", {
					left: n,
					top: i
				}), nextTick(() => {
					M = !1;
				});
			} catch (e) {
				d.error("Scroll handling failed:", { module: "TableRendererComponent" }, e), M = !1;
			}
		}, Qo = (e) => {
			if (!M) try {
				let t = e.target.scrollLeft;
				M = !0, j.value.scrollLeft = t, m.value?.centerScrollArea && m.value.centerScrollArea.scrollLeft !== t && (m.value.centerScrollArea.scrollLeft = t), z.updateScrollPosition(t), r.interactionContract.updateScrollPosition?.({
					left: t,
					top: j.value.scrollTop
				}), r.interactionContract.emit?.("scroll", {
					left: t,
					top: j.value.scrollTop
				}), nextTick(() => {
					M = !1;
				});
			} catch (e) {
				d.error("Horizontal scrollbar handling failed:", { module: "TableRendererComponent" }, e), M = !1;
			}
		}, $o = (e) => {
			if (!M) try {
				M = !0, j.value.scrollLeft = e, m.value?.centerScrollArea && m.value.centerScrollArea.scrollLeft !== e && (m.value.centerScrollArea.scrollLeft = e), g.value && g.value.scrollLeft !== e && (g.value.scrollLeft = e), z.updateScrollPosition(e), r.interactionContract.updateScrollPosition?.({
					left: e,
					top: j.value.scrollTop
				}), nextTick(() => {
					M = !1;
				});
			} catch (e) {
				d.error("Header scroll handling failed:", { module: "TableRendererComponent" }, e), M = !1;
			}
		}, es = (e) => {
			try {
				if (!m.value) return;
				let t = y.columns.find((t) => t.field === e);
				if (!t) return;
				let n = A.value.center.columns.findIndex((t) => t.field === e);
				if (n === -1) return;
				let r = A.value.center.columns.slice(0, n).reduce((e, t) => e + (t.width || 150), 0), i = t.width || 150, a = m.value.$el?.querySelector(".ht-scroll-area-horizontal");
				if (!a) return;
				let o = a.clientWidth, s = a.scrollLeft;
				r >= s && r + i <= s + o || a.scrollTo({
					left: r,
					behavior: "smooth"
				});
			} catch (e) {
				d.error("Sort indicator focus handling failed:", { module: "TableRendererComponent" }, e);
			}
		}, ts = (e) => {
			let { activeId: t } = N;
			if (t) switch (e.key) {
				case "ArrowDown":
				case "ArrowUp":
				case "ArrowLeft":
				case "ArrowRight":
					e.preventDefault();
					break;
				case "Enter":
					e.preventDefault(), q(t);
					break;
				case "Escape":
					e.preventDefault(), J(t);
					break;
			}
		};
		onMounted(() => {
			try {
				r.interactionContract.registerEventEmitter?.((e, t) => {
					r.gridAPI.emit(e, t);
				}), r.interactionContract.registerCoreCallbacks && (r.interactionContract.registerCoreCallbacks({
					onCellClick: Y,
					onCellDoubleClick: X,
					onCellRightClick: Z,
					onRowSelect: Q
				}), d.debug("Core interaction callbacks registered", { module: "TableRendererComponent" }));
				let e = r.gridAPI.on?.("toggle-selection", (e) => {
					let t = e?.rowId ?? null;
					if (t === null) {
						d.warn("toggle-selection event missing rowId", e);
						return;
					}
					if (e.selectionType === "radio") {
						if (N.selectedIds.has(t)) return;
						N.selectedIds.clear(), N.selectedIds.add(t);
					} else N.selectedIds.has(t) ? N.selectedIds.delete(t) : N.selectedIds.add(t);
					N.activeId = t, F.value++, d.debug("Selection toggled via toggle-selection event", {
						rowId: t,
						selectionType: e.selectionType,
						selected: N.selectedIds.has(t)
					});
				});
				e && I.push(e);
				let t = r.gridAPI.on?.("clear-selection", (e) => {
					Ko(e?.reason);
				});
				if (t && I.push(t), nextTick(() => {
					try {
						if (f.value) {
							let e = f.value.getBoundingClientRect();
							R.setContainerSize({
								height: e.height,
								width: e.width
							}), z.setContainerSize({
								width: e.width,
								height: e.height
							});
						}
						m.value && d.debug("Virtualizers initialized", {
							rowCount: y.rows.length,
							columnCount: y.columns.length
						});
					} catch (e) {
						d.error("Virtualizer initialization failed:", { module: "TableRendererComponent" }, e);
					}
				}), f.value) {
					let e = new ResizeObserver((e) => {
						try {
							for (let t of e) {
								let { height: e, width: n } = t.contentRect;
								K(n, e);
							}
						} catch (e) {
							d.error("ResizeObserver callback failed:", { module: "TableRendererComponent" }, e);
						}
					});
					e.observe(f.value), onUnmounted(() => {
						e.disconnect();
					});
				}
			} catch (e) {
				d.error("Mount initialization failed:", { module: "TableRendererComponent" }, e);
			}
		});
		let ns = /* @__PURE__ */ new Set();
		return watch(F, () => {
			let e = N.selectedIds;
			if (e === ns) return;
			let t = Array.from(e), n = Array.from(ns), i = t.filter((e) => !n.includes(e)), a = n.filter((e) => !t.includes(e));
			i.forEach((e) => {
				r.gridAPI.emit("row-select", {
					rowId: e,
					selected: !0,
					selectedRows: t
				});
			}), a.forEach((e) => {
				r.gridAPI.emit("row-select", {
					rowId: e,
					selected: !1,
					selectedRows: t
				});
			}), ns = new Set(e);
		}), watch(() => N.activeId, (e, t) => {
			if (e !== t) {
				let t = null, n = null;
				if (e) {
					let r = String(e).split("_");
					r.length >= 2 && (t = r[0] || null, n = r[1] || null);
				}
				r.gridAPI.emit("cell-focus-change", {
					rowId: t,
					columnId: n
				});
			}
		}), onUnmounted(() => {
			I.forEach((e) => {
				try {
					e();
				} catch (e) {
					d.error("Cleanup handler failed during unmount", { module: "TableRendererComponent" }, e);
				}
			}), I.length = 0;
		}), n({
			updateState: H,
			updateSelection: U,
			setActive: W,
			updateScrollPosition: G,
			updateConfig: zo,
			resize: K,
			refresh: Uo,
			ensureVisible: Ho,
			enterEditMode: q,
			completeEdit: Bo,
			cancelEdit: J,
			toggleEditMode: Vo,
			handleCellClick: Y,
			handleCellDoubleClick: X,
			handleCellRightClick: Z,
			handleRowSelect: Q,
			getCurrentState: Yo,
			getConfigSchema: Xo
		}), (e, t) => (openBlock(), createElementBlock("div", {
			ref_key: "containerRef",
			ref: f,
			class: normalizeClass(["ht-table-renderer-component h-full w-full flex flex-col", [w.theme?.className, s.value]]),
			"data-border-mode": a.value,
			tabindex: "0",
			role: "grid",
			"aria-rowcount": y.rows.length,
			"aria-colcount": y.columns.length,
			onKeydown: ts
		}, [
			w.layout?.showHeader === !1 ? createCommentVNode("", !0) : (openBlock(), createBlock(GridHeader_default, {
				key: 0,
				ref_key: "headerRef",
				ref: p,
				columns: y.columns,
				"pane-config": A.value,
				"scroll-left": j.value.scrollLeft,
				height: O.value.headerHeight,
				"is-content-overflowing": v.value,
				"grid-a-p-i": r.gridAPI,
				"header-cell-border-classes": c.value,
				"selected-rows": Array.from(N.selectedIds),
				"total-rows": Go.value,
				class: "flex-shrink-0",
				onHeaderScroll: $o,
				onSortIndicatorFocus: es,
				onSelectAll: qo,
				onClearSelection: Jo
			}, null, 8, [
				"columns",
				"pane-config",
				"scroll-left",
				"height",
				"is-content-overflowing",
				"grid-a-p-i",
				"header-cell-border-classes",
				"selected-rows",
				"total-rows"
			])),
			createVNode(GridBody_default, {
				ref_key: "bodyRef",
				ref: m,
				data: B.value,
				columns: y.columns,
				"pane-config": A.value,
				virtualizer: unref(R),
				"row-height": O.value.rowHeight,
				"is-content-overflowing": v.value,
				"focused-cell": typeof N.activeId == "string" || typeof N.activeId == "number" ? {
					rowId: N.activeId,
					columnId: ""
				} : null,
				"selected-rows": Array.from(N.selectedIds),
				"interaction-contract": r.interactionContract,
				"body-row-border-classes": l.value,
				"body-cell-border-classes": u.value,
				"stripe-enabled": o.value,
				class: "flex-1 overflow-hidden",
				style: normalizeStyle({ height: O.value.bodyHeight }),
				onScroll: Zo
			}, null, 8, [
				"data",
				"columns",
				"pane-config",
				"virtualizer",
				"row-height",
				"is-content-overflowing",
				"focused-cell",
				"selected-rows",
				"interaction-contract",
				"body-row-border-classes",
				"body-cell-border-classes",
				"stripe-enabled",
				"style"
			]),
			v.value ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
				createElementVNode("div", {
					class: "ht-scrollbar-pane-left flex-shrink-0",
					style: normalizeStyle({ width: `${A.value.left.width}px` })
				}, null, 4),
				createElementVNode("div", {
					ref_key: "horizontalScrollbarRef",
					ref: g,
					class: "ht-scrollbar-pane-center flex-1 overflow-x-auto ht-custom-scrollbar",
					tabindex: "-1",
					role: "presentation",
					"aria-hidden": "true",
					onScrollPassive: Qo
				}, [createElementVNode("div", { style: normalizeStyle({
					width: `${A.value.center.width}px`,
					height: "1px"
				}) }, null, 4)], 544),
				createElementVNode("div", {
					class: "ht-scrollbar-pane-right flex-shrink-0",
					style: normalizeStyle({ width: `${A.value.right.width}px` })
				}, null, 4)
			])) : createCommentVNode("", !0),
			w.layout?.showFooter === !1 ? createCommentVNode("", !0) : (openBlock(), createBlock(GridFooter_default, {
				key: 2,
				ref_key: "footerRef",
				ref: h,
				"total-rows": y.rows.length,
				"selected-count": N.selectedIds.size,
				"render-metrics": {
					lastRenderTime: 0,
					renderCount: 0,
					avgRenderTime: 0,
					averageFPS: 60
				},
				class: "flex-shrink-0 border-t border-[var(--ht-border)] h-10"
			}, null, 8, ["total-rows", "selected-count"]))
		], 42, _hoisted_1$8));
	}
}), [["__scopeId", "data-v-15d81561"]]), TableRenderer = class {
	name = "table";
	interactionContract;
	logger;
	app = null;
	componentInstance = null;
	hostElement = null;
	isDestroyed = !1;
	options;
	currentState = null;
	currentColumns = [];
	currentRows = [];
	constructor(t = {}) {
		this.options = t, this.logger = createLogger("TableRenderer");
		let n = createInteractionContract("table-renderer");
		this.interactionContract = {
			updateSelection: (e, t) => {
				this.componentInstance?.updateSelection && this.componentInstance.updateSelection(e, t);
			},
			setActive: (e) => {
				this.componentInstance?.setActive && this.componentInstance.setActive(e);
			},
			ensureVisible: (e, t) => {
				this.componentInstance?.ensureVisible && this.componentInstance.ensureVisible(e, t);
			},
			toggleEditMode: async (e, t) => this.componentInstance?.toggleEditMode ? await this.componentInstance.toggleEditMode(e, t) : !1,
			registerEventEmitter: (e) => {
				n.registerEventEmitter(e);
			},
			updateScrollPosition: (e) => {
				this.componentInstance?.updateScrollPosition && this.componentInstance.updateScrollPosition(e);
			},
			refresh: () => {
				this.componentInstance?.refresh && this.componentInstance.refresh();
			},
			emit: (e, t) => {
				n.emit?.(e, t);
			},
			registerCoreCallbacks: (e) => {
				n.registerCoreCallbacks?.(e);
			},
			destroy: () => {
				n.destroy?.();
			}
		}, this.setupCoreCallbacks();
	}
	async mount(e, t) {
		if (this.isDestroyed) throw Error("Cannot mount destroyed TableRenderer");
		this.app && (this.logger.warn("Already mounted, unmounting first"), await this.unmount());
		try {
			this.hostElement = e, this.app = createApp(TableRendererComponent_default, {
				renderer: this,
				interactionContract: this.interactionContract,
				gridAPI: t,
				options: this.options
			}), this.componentInstance = this.app.mount(e), this.interactionContract.registerEventEmitter((e, n) => {
				t.emit(e, n);
			}), this.logger.debug("Mounted successfully");
		} catch (e) {
			throw this.logger.error("Mount failed:", { module: "TableRenderer" }, e), await this.cleanup(), e;
		}
	}
	async unmount() {
		await this.cleanup();
	}
	render(e, t, n) {
		if (!(this.isDestroyed || !this.componentInstance)) try {
			this.currentState = e, this.currentColumns = t, this.currentRows = n, this.componentInstance.updateState && this.componentInstance.updateState(e, t, n);
		} catch (e) {
			this.logger.error("Render failed:", { module: "TableRenderer" }, e);
		}
	}
	resize(e, t) {
		if (!(this.isDestroyed || !this.componentInstance)) try {
			this.componentInstance.resize && this.componentInstance.resize(e, t);
		} catch (e) {
			this.logger.error("Resize failed:", { module: "TableRenderer" }, e);
		}
	}
	getConfigSchema() {
		return {
			performance: {
				type: "object",
				properties: {
					enableRAF: {
						type: "boolean",
						default: !0
					},
					batchUpdates: {
						type: "boolean",
						default: !0
					},
					maxConcurrentRenders: {
						type: "number",
						default: 3
					}
				}
			},
			accessibility: {
				type: "object",
				properties: {
					enableAria: {
						type: "boolean",
						default: !0
					},
					announceChanges: {
						type: "boolean",
						default: !0
					},
					keyboardNavigation: {
						type: "boolean",
						default: !0
					}
				}
			},
			layout: {
				type: "object",
				properties: {
					showHeader: {
						type: "boolean",
						default: !0
					},
					showFooter: {
						type: "boolean",
						default: !0
					},
					enablePanes: {
						type: "boolean",
						default: !0
					},
					stickyHeader: {
						type: "boolean",
						default: !0
					}
				}
			}
		};
	}
	updateConfig(e) {
		Object.assign(this.options, e), this.componentInstance?.updateConfig && this.componentInstance.updateConfig(this.options);
	}
	getCurrentState() {
		return {
			state: this.currentState,
			columns: this.currentColumns,
			rows: this.currentRows
		};
	}
	setupCoreCallbacks() {
		this.interactionContract.registerCoreCallbacks?.({
			onCellClick: (e) => {
				this.componentInstance?.handleCellClick && this.componentInstance.handleCellClick(e);
			},
			onCellDoubleClick: (e) => {
				this.componentInstance?.handleCellDoubleClick && this.componentInstance.handleCellDoubleClick(e);
			},
			onCellRightClick: (e) => {
				this.componentInstance?.handleCellRightClick && this.componentInstance.handleCellRightClick(e);
			},
			onRowSelect: (e) => {
				this.componentInstance?.handleRowSelect && this.componentInstance.handleRowSelect(e);
			},
			onScroll: (e) => {
				this.componentInstance?.handleScroll && this.componentInstance.handleScroll(e);
			}
		});
	}
	async cleanup() {
		try {
			this.app && this.hostElement && (this.app.unmount(), this.app = null, this.componentInstance = null), this.hostElement &&= (this.hostElement.innerHTML = "", null), this.interactionContract.destroy?.(), this.currentState = null, this.currentColumns = [], this.currentRows = [];
		} catch (e) {
			this.logger.error("Cleanup failed:", { module: "TableRenderer" }, e);
		}
	}
	destroy() {
		this.isDestroyed = !0, this.cleanup();
	}
};
function createTableRenderer(e = {}) {
	return new TableRenderer(e);
}
var _hoisted_1$7 = {
	key: 0,
	class: "keyboard-shortcuts-panel",
	role: "complementary",
	"aria-labelledby": "shortcuts-title"
}, _hoisted_2$6 = { class: "shortcuts-content" }, _hoisted_3$5 = {
	key: 0,
	class: "shortcut-group"
}, _hoisted_4$5 = {
	key: 1,
	class: "shortcut-group"
}, _hoisted_5$5 = {
	key: 2,
	class: "shortcut-group"
}, _hoisted_6$5 = { class: "shortcut-list" }, _hoisted_7$4 = { class: "shortcut-keys" }, _hoisted_8$3 = { class: "shortcut-description" }, _hoisted_9$3 = {
	key: 1,
	class: "keyboard-help-hint"
}, _hoisted_10$2 = {
	class: "sr-only",
	"aria-live": "polite",
	"aria-atomic": "true"
}, KeyboardShortcuts_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "KeyboardShortcuts",
	props: {
		showShortcuts: {
			type: Boolean,
			default: !1
		},
		showHelpHint: {
			type: Boolean,
			default: !0
		},
		enableEditing: {
			type: Boolean,
			default: !0
		},
		enableSelection: {
			type: Boolean,
			default: !0
		},
		customShortcuts: { default: () => [] }
	},
	emits: ["close", "show"],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = ref(""), o = () => {
			i("close");
		}, s = (e) => {
			if (e.key === "?" && !e.ctrlKey && !e.altKey && !e.metaKey) {
				let t = e.target;
				if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
				e.preventDefault(), r.showShortcuts ? o() : i("show");
			}
			e.key === "Escape" && r.showShortcuts && (e.preventDefault(), o());
		};
		return onMounted(() => {
			document.addEventListener("keydown", s);
		}), onUnmounted(() => {
			document.removeEventListener("keydown", s);
		}), t({ announceShortcut: (e, t) => {
			a.value = `${e} ${t}`, setTimeout(() => {
				a.value = "";
			}, 1e3);
		} }), (t, n) => (openBlock(), createElementBlock(Fragment, null, [e.showShortcuts ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
			createElementVNode("div", { class: "shortcuts-header" }, [n[0] ||= createElementVNode("h3", {
				id: "shortcuts-title",
				class: "shortcuts-title"
			}, "Keyboard Shortcuts", -1), createElementVNode("button", {
				class: "shortcuts-close",
				"aria-label": "Close keyboard shortcuts",
				onClick: o
			}, "×")]),
			createElementVNode("div", _hoisted_2$6, [
				n[4] ||= createStaticVNode("<div class=\"shortcut-group\" data-v-63978771><h4 class=\"shortcut-group-title\" data-v-63978771>Navigation</h4><div class=\"shortcut-list\" data-v-63978771><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>↑</kbd><kbd data-v-63978771>↓</kbd><kbd data-v-63978771>←</kbd><kbd data-v-63978771>→</kbd></div><div class=\"shortcut-description\" data-v-63978771>Move between cells</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Home</kbd> / <kbd data-v-63978771>End</kbd></div><div class=\"shortcut-description\" data-v-63978771>First/last cell in row</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Ctrl</kbd> + <kbd data-v-63978771>Home</kbd> / <kbd data-v-63978771>End</kbd></div><div class=\"shortcut-description\" data-v-63978771>First/last cell in grid</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Page Up</kbd> / <kbd data-v-63978771>Page Down</kbd></div><div class=\"shortcut-description\" data-v-63978771>Move page up/down</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Tab</kbd> / <kbd data-v-63978771>Shift</kbd> + <kbd data-v-63978771>Tab</kbd></div><div class=\"shortcut-description\" data-v-63978771>Next/previous cell</div></div></div></div>", 1),
				e.enableEditing ? (openBlock(), createElementBlock("div", _hoisted_3$5, [...n[1] ||= [createStaticVNode("<h4 class=\"shortcut-group-title\" data-v-63978771>Editing</h4><div class=\"shortcut-list\" data-v-63978771><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Enter</kbd> / <kbd data-v-63978771>F2</kbd></div><div class=\"shortcut-description\" data-v-63978771>Start editing cell</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Escape</kbd></div><div class=\"shortcut-description\" data-v-63978771>Cancel editing</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Enter</kbd></div><div class=\"shortcut-description\" data-v-63978771>Commit edit and move down</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Tab</kbd></div><div class=\"shortcut-description\" data-v-63978771>Commit edit and move right</div></div></div>", 2)]])) : createCommentVNode("", !0),
				e.enableSelection ? (openBlock(), createElementBlock("div", _hoisted_4$5, [...n[2] ||= [createStaticVNode("<h4 class=\"shortcut-group-title\" data-v-63978771>Selection</h4><div class=\"shortcut-list\" data-v-63978771><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Space</kbd></div><div class=\"shortcut-description\" data-v-63978771>Toggle row selection</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Ctrl</kbd> + <kbd data-v-63978771>A</kbd></div><div class=\"shortcut-description\" data-v-63978771>Select all rows</div></div><div class=\"shortcut-item\" data-v-63978771><div class=\"shortcut-keys\" data-v-63978771><kbd data-v-63978771>Shift</kbd> + <kbd data-v-63978771>Arrow</kbd></div><div class=\"shortcut-description\" data-v-63978771>Extend selection</div></div></div>", 2)]])) : createCommentVNode("", !0),
				e.customShortcuts.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$5, [n[3] ||= createElementVNode("h4", { class: "shortcut-group-title" }, "Custom", -1), createElementVNode("div", _hoisted_6$5, [(openBlock(!0), createElementBlock(Fragment, null, renderList(e.customShortcuts, (e) => (openBlock(), createElementBlock("div", {
					key: e.key,
					class: "shortcut-item"
				}, [createElementVNode("div", _hoisted_7$4, [(openBlock(!0), createElementBlock(Fragment, null, renderList(e.keys, (e) => (openBlock(), createElementBlock("kbd", { key: e }, toDisplayString(e), 1))), 128))]), createElementVNode("div", _hoisted_8$3, toDisplayString(e.description), 1)]))), 128))])])) : createCommentVNode("", !0)
			]),
			n[5] ||= createElementVNode("div", { class: "shortcuts-footer" }, [createElementVNode("div", { class: "shortcut-help" }, [
				createTextVNode(" Press "),
				createElementVNode("kbd", null, "?"),
				createTextVNode(" to toggle this panel ")
			])], -1)
		])) : e.showHelpHint ? (openBlock(), createElementBlock("div", _hoisted_9$3, [...n[6] ||= [createElementVNode("div", { class: "help-hint-content" }, [
			createTextVNode(" Press "),
			createElementVNode("kbd", null, "?"),
			createTextVNode(" for keyboard shortcuts ")
		], -1)]])) : createCommentVNode("", !0), createElementVNode("div", _hoisted_10$2, toDisplayString(a.value), 1)], 64));
	}
}), KeyboardShortcuts_default = /* @__PURE__ */ __plugin_vue_export_helper_default(KeyboardShortcuts_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-63978771"]]), AccessibilityAnnouncer_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "AccessibilityAnnouncer",
	setup(e, { expose: t }) {
		let n = ref(""), r = ref(""), i = ref(""), a = {
			high: [],
			medium: [],
			low: []
		}, o = !1, s = [], c = (e, t = {}) => {
			let { priority: n = "medium", category: r = "navigation", delay: i = 0, clearAfter: s = 3e3 } = t;
			e.trim() && (a[n].push({
				message: e,
				options: t
			}), o || setTimeout(() => l(), i));
		}, l = () => {
			o = !0;
			let e = [
				"high",
				"medium",
				"low"
			];
			for (let t of e) {
				let e = a[t];
				if (e.length > 0) {
					let { message: t, options: n } = e.shift();
					u(t, n);
					break;
				}
			}
			e.some((e) => a[e].length > 0) ? setTimeout(() => l(), 100) : o = !1;
		}, u = (e, t) => {
			let { priority: a = "medium", category: o = "navigation", clearAfter: c = 3e3 } = t;
			if (s.forEach((e) => clearTimeout(e)), s = [], a === "high" || o === "error") {
				if (n.value = e, c > 0) {
					let e = window.setTimeout(() => {
						n.value = "";
					}, c);
					s.push(e);
				}
			} else if (o === "navigation") {
				if (i.value = e, c > 0) {
					let e = window.setTimeout(() => {
						i.value = "";
					}, c);
					s.push(e);
				}
			} else if (r.value = e, c > 0) {
				let e = window.setTimeout(() => {
					r.value = "";
				}, c);
				s.push(e);
			}
		}, d = (e, t, n, r) => {
			let i = `Row ${e + 1}, Column ${t + 1}`, a = r ? `, ${r}` : "", o = n ? `, ${n}` : "";
			c(`${i}${a}${o}`, {
				category: "navigation",
				priority: "low",
				clearAfter: 2e3
			});
		}, f = (e, t) => {
			let n = e === 0 ? "Selection cleared" : e === 1 ? "1 row selected" : e === t ? "All rows selected" : `${e} of ${t} rows selected`;
			c(n, {
				category: "selection",
				priority: "medium",
				clearAfter: 2e3
			});
		}, p = (e, t) => {
			if (e && t) {
				let e = `Row ${t.row + 1}, Column ${t.column + 1}`, n = t.title ? `, ${t.title}` : "";
				c(`Editing ${e}${n}`, {
					category: "editing",
					priority: "medium",
					clearAfter: 1e3
				});
			} else e || c("Edit mode exited", {
				category: "editing",
				priority: "low",
				clearAfter: 1e3
			});
		}, m = (e, t) => {
			let n = t === "none" ? `${e} sorting cleared` : `${e} sorted ${t === "asc" ? "ascending" : t === "desc" ? "descending" : "none"}`;
			c(n, {
				category: "navigation",
				priority: "medium",
				clearAfter: 2e3
			});
		}, h = (e, t, n) => {
			c(e === 0 ? `All filters cleared. Showing all ${t} rows` : `${e} filter${e > 1 ? "s" : ""} applied. Showing ${n} of ${t} rows`, {
				category: "navigation",
				priority: "medium",
				clearAfter: 2e3
			});
		}, _ = (e) => {
			c(`Error: ${e}`, {
				category: "error",
				priority: "high",
				clearAfter: 5e3
			});
		}, v = (e) => {
			c(e, {
				category: "success",
				priority: "medium",
				clearAfter: 2e3
			});
		}, Ro = () => {
			n.value = "", r.value = "", i.value = "", s.forEach((e) => clearTimeout(e)), s = [], Object.keys(a).forEach((e) => {
				a[e] = [];
			}), o = !1;
		};
		return onUnmounted(() => {
			Ro();
		}), t({
			announce: c,
			announceCellFocus: d,
			announceSelection: f,
			announceEditMode: p,
			announceSorting: m,
			announceFiltering: h,
			announceError: _,
			announceSuccess: v,
			clearAll: Ro
		}), (e, t) => (openBlock(), createElementBlock(Fragment, null, [
			createElementVNode("div", {
				ref: "primaryRegion",
				class: "sr-only",
				"aria-live": "assertive",
				"aria-atomic": "true",
				role: "status"
			}, toDisplayString(n.value), 513),
			createElementVNode("div", {
				ref: "secondaryRegion",
				class: "sr-only",
				"aria-live": "polite",
				"aria-atomic": "false",
				role: "log"
			}, toDisplayString(r.value), 513),
			createElementVNode("div", {
				ref: "navigationRegion",
				class: "sr-only",
				"aria-live": "polite",
				"aria-atomic": "true",
				role: "status"
			}, toDisplayString(i.value), 513)
		], 64));
	}
}), [["__scopeId", "data-v-a88bd2f5"]]), _hoisted_1$6 = ["aria-live"], _hoisted_2$5 = { class: "flex-shrink-0" }, _hoisted_3$4 = {
	key: 0,
	class: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2",
	viewBox: "0 0 24 24"
}, _hoisted_4$4 = {
	key: 1,
	class: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2",
	viewBox: "0 0 24 24"
}, _hoisted_5$4 = {
	key: 2,
	class: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2",
	viewBox: "0 0 24 24"
}, _hoisted_6$4 = {
	key: 3,
	class: "w-5 h-5",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": "2",
	viewBox: "0 0 24 24"
}, _hoisted_7$3 = { class: "flex-1 text-sm font-medium" }, ToastNotification_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ToastNotification",
	props: {
		message: {},
		type: { default: "info" },
		duration: { default: 4e3 },
		visible: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ref(n.visible), a = null;
		watch(() => n.visible, (e) => {
			i.value = e, e ? o() : s();
		});
		function o() {
			s(), n.duration > 0 && (a = setTimeout(() => {
				i.value = !1, r("close");
			}, n.duration));
		}
		function s() {
			a &&= (clearTimeout(a), null);
		}
		function c() {
			s(), i.value = !1, r("close");
		}
		onMounted(() => {
			n.visible && o();
		});
		let l = {
			info: "bg-[var(--ht-primary)] text-[var(--ht-text-inverse)]",
			warn: "bg-orange-500 text-white",
			error: "bg-red-500 text-white",
			success: "bg-green-500 text-white"
		};
		return (t, n) => (openBlock(), createBlock(Transition, { name: "toast-slide" }, {
			default: withCtx(() => [i.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(["ht-toast fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg max-w-md flex items-center gap-3", l[e.type]]),
				role: "alert",
				"aria-live": e.type === "error" ? "assertive" : "polite"
			}, [
				createElementVNode("div", _hoisted_2$5, [e.type === "info" ? (openBlock(), createElementBlock("svg", _hoisted_3$4, [...n[0] ||= [
					createElementVNode("circle", {
						cx: "12",
						cy: "12",
						r: "10"
					}, null, -1),
					createElementVNode("path", { d: "M12 16v-4" }, null, -1),
					createElementVNode("path", { d: "M12 8h.01" }, null, -1)
				]])) : e.type === "warn" ? (openBlock(), createElementBlock("svg", _hoisted_4$4, [...n[1] ||= [
					createElementVNode("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }, null, -1),
					createElementVNode("path", { d: "M12 9v4" }, null, -1),
					createElementVNode("path", { d: "M12 17h.01" }, null, -1)
				]])) : e.type === "error" ? (openBlock(), createElementBlock("svg", _hoisted_5$4, [...n[2] ||= [
					createElementVNode("circle", {
						cx: "12",
						cy: "12",
						r: "10"
					}, null, -1),
					createElementVNode("path", { d: "m15 9-6 6" }, null, -1),
					createElementVNode("path", { d: "m9 9 6 6" }, null, -1)
				]])) : e.type === "success" ? (openBlock(), createElementBlock("svg", _hoisted_6$4, [...n[3] ||= [createElementVNode("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }, null, -1), createElementVNode("path", { d: "m9 11 3 3L22 4" }, null, -1)]])) : createCommentVNode("", !0)]),
				createElementVNode("div", _hoisted_7$3, toDisplayString(e.message), 1),
				createElementVNode("button", {
					class: "flex-shrink-0 ml-2 p-1 rounded hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50",
					"aria-label": "Close notification",
					onClick: c
				}, [...n[4] ||= [createElementVNode("svg", {
					class: "w-4 h-4",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2",
					viewBox: "0 0 24 24"
				}, [createElementVNode("path", { d: "M18 6 6 18" }), createElementVNode("path", { d: "m6 6 12 12" })], -1)]])
			], 10, _hoisted_1$6)) : createCommentVNode("", !0)]),
			_: 1
		}));
	}
}), ToastNotification_default = /* @__PURE__ */ __plugin_vue_export_helper_default(ToastNotification_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-6fee3fd6"]]), _hoisted_1$5 = {
	key: 0,
	class: "ht-filterbar mb-2"
}, _hoisted_2$4 = { class: "flex items-center justify-between gap-2" }, _hoisted_3$3 = { class: "flex flex-wrap items-center gap-2" }, _hoisted_4$3 = ["onClick"], _hoisted_5$3 = { class: "truncate max-w-[220px]" }, _hoisted_6$3 = ["onClick"], _hoisted_7$2 = {
	class: "text-xs text-[var(--ht-text-muted)]",
	"aria-live": "polite",
	"aria-atomic": "true"
}, _hoisted_8$2 = { key: 0 }, _hoisted_9$2 = {
	key: 1,
	class: "mt-1 flex items-center gap-2"
}, _hoisted_10$1 = { class: "relative h-2 w-24 rounded bg-[var(--ht-bg-subtle)]" }, _hoisted_11$1 = { key: 1 }, FilterBar_default = /* @__PURE__ */ defineComponent({
	__name: "FilterBar",
	props: { api: {} },
	setup(t) {
		let n = t, r = createLogger({ module: "FilterBar" }), i = ref([]), a = ref(0), o = ref(0), s = ref(0), c = ref(null), l = ref([]);
		function u() {
			try {
				i.value = n.api.getState()?.config?.filters || [];
			} catch (e) {
				r.warn("Failed to refresh filters from API", e);
			}
		}
		onMounted(() => {
			u(), n.api.on && (l.value.push(n.api.on("filter-change", (e) => {
				i.value = e || [];
			})), l.value.push(n.api.on("data-pipeline-complete", (e) => {
				a.value = e?.originalCount ?? 0, o.value = e?.processedCount ?? 0, s.value = Math.round(e?.processingTime ?? 0), c.value = null;
			})), l.value.push(n.api.on("filter-progress", (e) => {
				c.value = e ? {
					processed: e.processed ?? 0,
					total: e.total ?? 0
				} : null;
			})));
		}), onUnmounted(() => {
			l.value.forEach((e) => {
				try {
					e();
				} catch (e) {
					r.warn("Failed to cleanup event listener", e);
				}
			}), l.value = [];
		});
		function d() {
			n.api.updateConfig({ filters: [] });
		}
		function f() {
			try {
				n.api.emit("filter-cancel", null);
			} catch (e) {
				r.warn("Failed to cancel worker", e);
			}
			c.value = null;
		}
		function p(e) {
			let t = i.value.filter((t) => !(t.field === e.field && t.operator === e.operator && t.value === e.value));
			n.api.updateConfig({ filters: t });
		}
		function m(e) {
			try {
				n.api.emit("column-open-filter", { field: e.field });
			} catch (e) {
				r.warn("Failed to emit column-open-filter event", e);
			}
		}
		function h(e) {
			let t = {
				equals: "=",
				contains: "Contains",
				startsWith: "Starts with",
				endsWith: "Ends with",
				gt: ">",
				gte: "≥",
				lt: "<",
				lte: "≤",
				between: "Between",
				in: "Includes",
				oneOf: "One of",
				notIn: "Excludes",
				notEquals: "≠"
			}, n = Array.isArray(e.value) ? e.operator === "between" ? `${e.value[0]}~${e.value[1]}` : `${e.value.length} items` : String(e.value);
			return `${e.field} ${t[e.operator] ?? e.operator} ${n}`;
		}
		let _ = computed(() => (i.value?.length ?? 0) > 0);
		return (e, t) => _.value || a.value ? (openBlock(), createElementBlock("div", _hoisted_1$5, [createElementVNode("div", _hoisted_2$4, [createElementVNode("div", _hoisted_3$3, [(openBlock(!0), createElementBlock(Fragment, null, renderList(i.value, (e) => (openBlock(), createElementBlock("span", {
			key: h(e),
			class: "inline-flex items-center gap-2 rounded border border-[var(--ht-border)] bg-[var(--ht-bg-subtle)] px-2 py-1 text-xs text-[var(--ht-text)] cursor-pointer",
			onClick: (t) => m(e)
		}, [createElementVNode("span", _hoisted_5$3, toDisplayString(h(e)), 1), createElementVNode("button", {
			class: "text-[var(--ht-text-muted)] hover:text-[var(--ht-danger)]",
			onClick: withModifiers((t) => p(e), ["stop"])
		}, "×", 8, _hoisted_6$3)], 8, _hoisted_4$3))), 128)), _.value ? (openBlock(), createElementBlock("button", {
			key: 0,
			class: "text-xs text-[var(--ht-primary)] hover:underline",
			onClick: d
		}, "Clear All")) : createCommentVNode("", !0)]), createElementVNode("div", _hoisted_7$2, [a.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode("Showing " + toDisplayString(o.value || a.value) + " / " + toDisplayString(a.value), 1), s.value ? (openBlock(), createElementBlock("span", _hoisted_8$2, " (" + toDisplayString(s.value) + " ms)", 1)) : createCommentVNode("", !0)], 64)) : createCommentVNode("", !0), c.value && c.value.total ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
			createElementVNode("div", _hoisted_10$1, [createElementVNode("div", {
				class: "h-2 rounded bg-[var(--ht-primary)]",
				style: normalizeStyle({ width: Math.min(100, Math.round(c.value.processed / c.value.total * 100)) + "%" })
			}, null, 4)]),
			createElementVNode("span", null, toDisplayString(Math.min(100, Math.round(c.value.processed / c.value.total * 100))) + "%", 1),
			createElementVNode("button", {
				class: "px-2 py-0.5 rounded border border-[var(--ht-border)] text-[var(--ht-text-muted)] hover:text-[var(--ht-danger)]",
				onClick: f
			}, "Cancel")
		])) : createCommentVNode("", !0)])])])) : (openBlock(), createElementBlock("div", _hoisted_11$1));
	}
});
const GRID_EVENT_NAMES = [
	"row-click",
	"row-select",
	"cell-click",
	"cell-double-click",
	"cell-right-click",
	"multi-sort-change",
	"filter-change",
	"scroll",
	"column-resize-start",
	"column-resize",
	"toggle-selection",
	"select-all",
	"clear-selection"
];
var _hoisted_1$4 = [
	"aria-label",
	"aria-rowcount",
	"aria-colcount",
	"data-renderer"
], _hoisted_2$3 = {
	key: 0,
	class: "ht-overlay ht-overlay-bg z-30"
}, _hoisted_3$2 = {
	key: 1,
	class: "ht-overlay bg-[var(--ht-bg)] z-30"
}, _hoisted_4$2 = { class: "ht-overlay-panel" }, _hoisted_5$2 = { class: "text-[var(--ht-text)]" }, _hoisted_6$2 = {
	key: 2,
	class: "ht-overlay bg-[var(--ht-bg)] z-30"
}, _hoisted_7$1 = { class: "ht-overlay-panel" }, _hoisted_8$1 = { class: "text-[var(--ht-text)] text-sm mb-4" }, _hoisted_9$1 = {
	key: 0,
	class: "ht-overlay ht-empty-overlay text-[var(--ht-text-muted)]"
}, _hoisted_10 = { class: "ht-overlay-panel" }, _hoisted_11 = { class: "text-xs mt-1 text-[var(--ht-text-muted)]" }, DataGrid_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "DataGrid",
	props: {
		data: { default: () => [] },
		columns: { default: () => [] },
		config: { default: () => ({}) },
		loading: {
			type: Boolean,
			default: !1
		},
		height: { default: 400 },
		class: { default: "" },
		plugins: { default: () => [] },
		renderer: { default: "table" },
		showKeyboardShortcuts: {
			type: Boolean,
			default: !1
		},
		keyboardHelpHint: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"row-click",
		"row-select",
		"cell-click",
		"cell-double-click",
		"cell-right-click",
		"multi-sort-change",
		"filter-change",
		"scroll",
		"column-resize-start",
		"column-resize",
		"renderer-changed",
		"renderer-error",
		"toggle-selection",
		"clear-selection"
	],
	setup(t, { expose: n, emit: r }) {
		let i = t, a = r, o = computed(() => ({
			...i.config,
			renderer: i.renderer
		})), s = createLogger("DataGrid"), c = useGridState(o.value, i.plugins), { api: l } = c, u = ref(), d = ref(), f = ref(), p = ref(), m = ref(), h = [], g = ref(!1), _ = ref(null), v = ref(i.showKeyboardShortcuts), y = ref(!1), b = ref(""), w = ref("info"), T = ref(new Set((i.plugins || []).map((e) => e.name))), O = ref(null), k = (e) => {
			let t = null;
			for (let n of e || []) if (isFunctionalColumn(n)) {
				let e = n.type;
				if (e === "radio") return "radio";
				e === "checkbox" && (t ??= "checkbox");
			}
			return t;
		}, A = computed(() => ({
			height: typeof i.height == "number" ? `${i.height}px` : i.height,
			position: "relative",
			overflow: "hidden"
		})), j = computed(() => [
			"ht-grid-container",
			"bg-[var(--ht-bg)]",
			"rounded-[var(--radius-ht-md)]",
			`ht-renderer-${i.renderer}`,
			i.class
		].filter(Boolean).join(" ")), M = computed(() => !c.loading.value && !c.error.value && !_.value), N = {
			updateSelection: (e, t) => {
				let n = l.getActiveRendererInstance?.();
				n?.renderer?.interactionContract && n.renderer.interactionContract.updateSelection(e, t);
			},
			setActive: (e) => {
				let t = l.getActiveRendererInstance?.();
				t?.renderer?.interactionContract && t.renderer.interactionContract.setActive(e);
			},
			ensureVisible: (e, t) => {
				let n = l.getActiveRendererInstance?.();
				n?.renderer?.interactionContract && n.renderer.interactionContract.ensureVisible(e, t);
			},
			toggleEditMode: async (e, t) => {
				let n = l.getActiveRendererInstance?.();
				return n?.renderer?.interactionContract ? await n.renderer.interactionContract.toggleEditMode(e, t) : !1;
			},
			registerEventEmitter: (e) => {
				let t = l.getActiveRendererInstance?.();
				t?.renderer?.interactionContract && t.renderer.interactionContract.registerEventEmitter(e);
			},
			updateScrollPosition: (e) => {
				let t = l.getActiveRendererInstance?.();
				t?.renderer?.interactionContract && t.renderer.interactionContract.updateScrollPosition?.(e);
			},
			refresh: () => {
				let e = l.getActiveRendererInstance?.();
				e?.renderer?.interactionContract && e.renderer.interactionContract.refresh?.();
			},
			emit: (e, t) => {
				GRID_EVENT_NAMES.includes(e) ? a(e, t) : l.emit(e, t);
			},
			registerCoreCallbacks: (e) => {
				let t = l.getActiveRendererInstance?.();
				t?.renderer?.interactionContract && t.renderer.interactionContract.registerCoreCallbacks?.(e);
			},
			destroy: () => {
				let e = l.getActiveRendererInstance?.();
				e?.renderer?.interactionContract && e.renderer.interactionContract.destroy?.();
			}
		};
		provide("gridState", c), provide("interactionContract", N), provide(GRID_API_KEY, l);
		let F = async () => {
			try {
				if (!f.value) throw Error("Renderer host element not found");
				if (_.value = null, !(l.getAvailableRenderers?.() || []).includes("table") && l.registerRenderer && (s.debug("Registering table renderer"), l.registerRenderer("table", (e) => createTableRenderer(e))), !await l.initializeRenderer?.(f.value)) throw Error("Renderer initialization returned false");
				return g.value = !0, s.debug(`Renderer system initialized with '${i.renderer}' renderer`), !0;
			} catch (e) {
				let t = e instanceof Error ? e.message : "Unknown error";
				return _.value = t, s.error("Renderer initialization failed:", { module: "DataGrid" }, e), a("renderer-error", {
					error: e instanceof Error ? e : Error(t),
					context: "initialization",
					renderer: i.renderer
				}), !1;
			}
		}, I = async (e) => {
			if (!g.value) return s.warn("Cannot switch renderer - system not initialized"), !1;
			try {
				let t = l.getRenderer?.() || "unknown", n = await l.setRenderer?.(e);
				return n && (a("renderer-changed", {
					name: e,
					previousRenderer: t
				}), s.debug(`Switched from '${t}' to '${e}' renderer`)), n;
			} catch (t) {
				return s.error(`Failed to switch to renderer '${e}':`, { module: "DataGrid" }, t), a("renderer-error", {
					error: t instanceof Error ? t : /* @__PURE__ */ Error("Renderer switch failed"),
					context: "switch",
					renderer: e
				}), !1;
			}
		}, L = () => {
			v.value = !0;
		}, R = () => {
			v.value = !1;
		}, z = computed(() => {
			let e = l.listPlugins().map((e) => e.name);
			return {
				editing: e.includes("core-cell-editing"),
				selection: e.includes("core-selection")
			};
		}), B = () => {
			if (!m.value) return;
			let e = m.value;
			l.on?.("cell-focus-change", (t) => {
				t.rowId !== null && t.columnId !== null && e.announceCellFocus(0, 0, void 0, t.columnId);
			}), l.on?.("row-select", (t) => {
				if (t.selectedRows) {
					let n = c.data.value.visibleRows.length;
					e.announceSelection(t.selectedRows.length, n);
				}
			}), l.on?.("cell-edit-start", (t) => {
				let n = c.data.value.visibleRows.findIndex((e) => (e.id ?? e.index) === t.rowId), r = c.columns.value.findIndex((e) => e.field === t.columnId), i = c.columns.value.find((e) => e.field === t.columnId);
				n >= 0 && r >= 0 && e.announceEditMode(!0, {
					row: n,
					column: r,
					title: i?.title
				});
			}), l.on?.("cell-edit-complete", () => {
				e.announceEditMode(!1);
			}), l.on?.("cell-edit-cancel", () => {
				e.announceEditMode(!1);
			}), l.on?.("multi-sort-change", (t) => {
				if (!t || !t.fields || t.fields.length === 0) {
					e.announceSorting("All columns", "none");
					return;
				}
				let [n] = t.fields;
				if (!n) return;
				let r = c.columns.value.find((e) => e.field === n.field);
				r && e.announceSorting(r.title, n.direction);
			}), l.on?.("filter-change", (t) => {
				let n = i.data.length, r = c.data.value.visibleRows.length, a = t.length || 0;
				e.announceFiltering(a, n, r);
			}), l.on?.("plugin-error", (t) => {
				e.announceError(`Plugin error: ${t.error.message}`);
			});
		}, V = l.on?.("column-resize-start", (e) => {
			a("column-resize-start", e);
		});
		V && h.push(V);
		let U = l.on?.("column-resize", (e) => {
			a("column-resize", e);
		});
		U && h.push(U);
		let W = l.on?.("cell-click", (e) => {
			a("cell-click", e);
		});
		W && h.push(W);
		let G = l.on?.("row-click", (e) => {
			a("row-click", e);
		});
		G && h.push(G);
		let K = l.on?.("cell-double-click", (e) => {
			a("cell-double-click", e);
		});
		K && h.push(K);
		let zo = l.on?.("cell-right-click", (e) => {
			a("cell-right-click", e);
		});
		zo && h.push(zo);
		let q = l.on?.("row-select", (e) => {
			a("row-select", e);
		});
		q && h.push(q);
		let Bo = l.on?.("toggle-selection", (e) => {
			a("toggle-selection", e);
		});
		Bo && h.push(Bo);
		let J = l.on?.("clear-selection", (e) => {
			a("clear-selection", e);
		});
		J && h.push(J);
		let Ho = l.on?.("multi-sort-change", (e) => {
			a("multi-sort-change", e);
		});
		Ho && h.push(Ho);
		let Uo = l.on?.("filter-change", (e) => {
			a("filter-change", e);
		});
		Uo && h.push(Uo);
		let Y = l.on?.("scroll", (e) => {
			a("scroll", e);
		});
		Y && h.push(Y);
		let X = l.on?.("multi-sort-disabled-warning", (e) => {
			Q(e.message, "warn");
		});
		X && h.push(X);
		let Z = l.on?.("user-notification", (e) => {
			Q(e.message, e.type);
		});
		Z && h.push(Z);
		let Q = (e, t = "info") => {
			b.value = e, w.value = t, y.value = !0;
		}, Wo = () => {
			y.value = !1;
		};
		onMounted(async () => {
			i.data.length > 0 && l.setData(i.data), i.columns.length > 0 && l.setColumns(i.columns), c.__internal.setLoading(i.loading), await nextTick(), await F(), await nextTick(), B(), O.value = k(c.columns.value);
		}), watch(() => i.data, (e) => {
			l.setData(e);
		}), watch(() => i.columns, (e) => {
			l.setColumns(e);
		}), watch(() => c.columns.value, (e) => {
			let t = k(e);
			t !== O.value && (l.clearSelection?.(), N.updateSelection?.(/* @__PURE__ */ new Set(), "programmatic"), t === "radio" ? l.setSelectionMode?.("single") : t === "checkbox" && l.setSelectionMode?.("multi"), O.value = t);
		}), watch(() => i.loading, (e) => {
			c.__internal.setLoading(e);
		}), watch(() => o.value, (e) => {
			l.updateConfig(e);
		}), watch(() => i.renderer, async (e, t) => {
			e !== t && g.value && await I(e);
		}), watch([() => c.data.value, () => c.columns.value], () => {
			s.debug("Data or columns changed, Vue will handle re-render");
		}, { deep: !1 });
		let $ = null;
		return onMounted(() => {
			d.value && ($ = new ResizeObserver((e) => {
				for (let t of e) {
					let { width: e, height: n } = t.contentRect;
					l.resizeRenderer?.(e, n);
				}
			}), $.observe(d.value));
		}), onUnmounted(() => {
			$ && $.disconnect(), h.forEach((e) => {
				try {
					e();
				} catch (e) {
					s.warn("Error cleaning up listener", e);
				}
			}), h.length = 0;
		}), watch(() => i.plugins, async (e) => {
			let t = new Set((e || []).map((e) => e.name)), n = T.value;
			for (let e of n) if (!t.has(e)) try {
				await l.unloadPlugin?.(e);
			} catch (t) {
				s.warn(`Failed to unload plugin ${e}:`, t);
			}
			let r = new Map((e || []).map((e) => [e.name, e]));
			for (let e of t) if (!n.has(e)) {
				let t = r.get(e);
				if (t) try {
					await l.loadPlugin?.(t);
				} catch (t) {
					s.warn(`Failed to load plugin ${e}:`, t);
				}
			}
			if (T.value = t, i.columns && i.columns.length > 0) try {
				l.setColumns(i.columns);
			} catch (e) {
				s.warn("Failed to re-apply columns after plugin change:", e);
			}
		}, { deep: !1 }), n({
			switchRenderer: I,
			initializeRenderer: F,
			getAvailableRenderers: () => l.getAvailableRenderers?.() || [],
			getCurrentRenderer: () => l.getRenderer?.() || "unknown",
			renderNow: () => l.renderWithActiveRenderer?.(),
			gridState: c,
			api: l
		}), (e, t) => (openBlock(), createElementBlock("div", {
			ref_key: "gridContainer",
			ref: u,
			class: normalizeClass(j.value),
			style: normalizeStyle(A.value),
			role: "grid",
			"aria-label": `Data grid with ${unref(c).data.value.visibleRows.length} rows using ${i.renderer} renderer`,
			"aria-rowcount": unref(c).data.value.visibleRows.length,
			"aria-colcount": unref(c).columns.value.length,
			"data-renderer": i.renderer
		}, [
			unref(c).loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$3, [...t[0] ||= [createElementVNode("div", { class: "flex items-center space-x-2" }, [createElementVNode("div", { class: "animate-spin w-4 h-4 border-2 border-[var(--ht-primary)] border-t-transparent rounded-full" }), createElementVNode("span", { class: "text-[var(--ht-text-muted)]" }, "Loading...")], -1)]])) : unref(c).error.value ? (openBlock(), createElementBlock("div", _hoisted_3$2, [createElementVNode("div", _hoisted_4$2, [t[1] ||= createElementVNode("div", { class: "text-[var(--ht-danger)] mb-2" }, "⚠️ Grid Error", -1), createElementVNode("div", _hoisted_5$2, toDisplayString(unref(c).error.value), 1)])])) : _.value ? (openBlock(), createElementBlock("div", _hoisted_6$2, [createElementVNode("div", _hoisted_7$1, [
				t[3] ||= createElementVNode("div", { class: "text-[var(--ht-danger)] mb-2" }, "⚠️ Renderer Error", -1),
				createElementVNode("div", _hoisted_8$1, toDisplayString(_.value), 1),
				createVNode(HtButton_default, {
					size: "sm",
					variant: "primary",
					onClick: F
				}, {
					default: withCtx(() => [...t[2] ||= [createTextVNode("Retry", -1)]]),
					_: 1
				})
			])])) : createCommentVNode("", !0),
			createVNode(FilterBar_default, { api: unref(l) }, null, 8, ["api"]),
			M.value ? (openBlock(), createElementBlock("div", {
				key: 3,
				ref_key: "rendererContainer",
				ref: d,
				class: normalizeClass(["h-full w-full ht-renderer-container", `ht-renderer-${i.renderer}`])
			}, [createElementVNode("div", {
				ref_key: "rendererHost",
				ref: f,
				class: "h-full w-full"
			}, null, 512), unref(c).data.value.visibleRows.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9$1, [createElementVNode("div", _hoisted_10, [
				t[4] ||= createElementVNode("div", { class: "text-4xl mb-2" }, "📄", -1),
				t[5] ||= createElementVNode("div", null, "No data available", -1),
				createElementVNode("div", _hoisted_11, "Renderer: " + toDisplayString(i.renderer), 1)
			])])) : createCommentVNode("", !0)], 2)) : createCommentVNode("", !0),
			createVNode(KeyboardShortcuts_default, {
				ref_key: "keyboardShortcutsRef",
				ref: p,
				"show-shortcuts": v.value,
				"show-help-hint": i.keyboardHelpHint,
				"enable-editing": z.value.editing,
				"enable-selection": z.value.selection,
				onShow: L,
				onClose: R
			}, null, 8, [
				"show-shortcuts",
				"show-help-hint",
				"enable-editing",
				"enable-selection"
			]),
			createVNode(AccessibilityAnnouncer_default, {
				ref_key: "accessibilityAnnouncerRef",
				ref: m
			}, null, 512),
			createVNode(ToastNotification_default, {
				visible: y.value,
				message: b.value,
				type: w.value,
				duration: 4e3,
				onClose: Wo
			}, null, 8, [
				"visible",
				"message",
				"type"
			])
		], 14, _hoisted_1$4));
	}
}), DataGrid_default = /* @__PURE__ */ __plugin_vue_export_helper_default(DataGrid_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-98853d3d"]]), DEFAULT_GRID_PROPS = {
	data: [],
	columns: [],
	plugins: [],
	height: 400,
	showKeyboardShortcuts: !1,
	keyboardHelpHint: !1
};
function useHappyTable(t = {}) {
	let { props: n, data: r, columns: i, plugins: a, height: o, keyboardHelpHint: s, loggerModule: c = "HappyTable" } = t, l = createLogger(c), u = reactive({
		...DEFAULT_GRID_PROPS,
		...n ?? {}
	});
	return r !== void 0 && (u.data = r), i !== void 0 && (u.columns = i), a !== void 0 && (u.plugins = a), o !== void 0 && (u.height = o), s !== void 0 && (u.keyboardHelpHint = s), {
		gridProps: u,
		updateGridProps: (e) => {
			Object.assign(u, e);
		},
		logger: l
	};
}
function useGridEvents(e) {
	let { on: t, off: n } = e, r = (e, n) => t(e, n), i = (e, r) => {
		t(e, (t) => {
			r(t), n(e);
		});
	};
	return {
		onEvent: r,
		onceEvent: i,
		onCellClick: (e) => t("cell-click", e),
		onceCellClick: (e) => i("cell-click", e),
		offCellClick: () => n("cell-click"),
		onCellDoubleClick: (e) => t("cell-double-click", e),
		offCellDoubleClick: () => n("cell-double-click"),
		onCellRightClick: (e) => t("cell-right-click", e),
		offCellRightClick: () => n("cell-right-click"),
		onRowClick: (e) => t("row-click", e),
		onceRowClick: (e) => i("row-click", e),
		offRowClick: () => n("row-click"),
		onRowSelect: (e) => t("row-select", e),
		offRowSelect: () => n("row-select"),
		onMultiSortChange: (e) => t("multi-sort-change", e),
		offMultiSortChange: () => n("multi-sort-change"),
		onFilterChange: (e) => t("filter-change", e),
		offFilterChange: () => n("filter-change"),
		onScroll: (e) => t("scroll", e),
		offScroll: () => n("scroll"),
		onColumnResizeStart: (e) => t("column-resize-start", e),
		onColumnResize: (e) => t("column-resize", e)
	};
}
var ExcelRenderer = class {
	name = "excel";
	interactionContract;
	options;
	constructor(e = {}) {
		this.options = e;
		let t = createInteractionContract("excel-renderer-stub");
		this.interactionContract = {
			updateSelection: (e, t) => {},
			setActive: (e) => {},
			ensureVisible: (e, t) => {},
			toggleEditMode: async (e, t) => !1,
			registerEventEmitter: (e) => {
				t.registerEventEmitter(e);
			},
			updateScrollPosition: (e) => {},
			refresh: () => {},
			emit: (e, t) => {},
			registerCoreCallbacks: (e) => {},
			destroy: () => {}
		};
	}
	async mount(e, t) {
		throw Error("ExcelRenderer is not available. Please install the Excel plugin to use Excel-style rendering.\nInstallation: npm install @happy-table/excel-plugin\nUsage: import { excelPlugin } from \"@happy-table/excel-plugin\"\n       useGridState(config, [excelPlugin])");
	}
	async unmount() {}
	render(e, t, n) {
		throw Error("ExcelRenderer stub cannot render. Please install the Excel plugin.");
	}
	resize(e, t) {}
	getConfigSchema() {
		return {
			grid: {
				type: "object",
				description: "Excel-style grid configuration",
				properties: {
					showGridLines: {
						type: "boolean",
						default: !0
					},
					showRowHeaders: {
						type: "boolean",
						default: !0
					},
					showColumnHeaders: {
						type: "boolean",
						default: !0
					},
					headerStyle: {
						type: "string",
						enum: ["excel", "google-sheets"],
						default: "excel"
					}
				}
			},
			selection: {
				type: "object",
				description: "Selection behavior configuration",
				properties: {
					multiRange: {
						type: "boolean",
						default: !0
					},
					showFillHandle: {
						type: "boolean",
						default: !0
					},
					enableRangeSelection: {
						type: "boolean",
						default: !0
					}
				}
			},
			editing: {
				type: "object",
				description: "Cell editing configuration",
				properties: {
					enableInCellEditing: {
						type: "boolean",
						default: !0
					},
					enableFormulaBar: {
						type: "boolean",
						default: !0
					},
					autoCommitOnEnter: {
						type: "boolean",
						default: !0
					}
				}
			}
		};
	}
	updateConfig(e) {
		Object.assign(this.options, e);
	}
};
function createExcelRenderer(e = {}) {
	return new ExcelRenderer(e);
}
const EXCEL_PLUGIN_INFO = {
	name: "@happy-table/excel-plugin",
	version: "^1.0.0",
	description: "Excel-style grid renderer with advanced cell interactions",
	features: [
		"Excel-style grid lines and headers",
		"Multi-range selection",
		"Fill handle for cell dragging",
		"In-cell editing with formula support",
		"Excel-style keyboard navigation",
		"A1 coordinate system",
		"Formula bar",
		"Cell merging (future)",
		"Conditional formatting (future)"
	],
	installation: "npm install @happy-table/excel-plugin",
	usage: "\nimport { createExcelPlugin } from '@happy-table/excel-plugin'\n\nconst excelPlugin = createExcelPlugin({\n  grid: { showGridLines: true },\n  selection: { multiRange: true },\n  editing: { enableFormulaBar: true }\n})\n\nconst gridState = useGridState(config, [excelPlugin])\n  "
};
var TableInteractionHandler = class {
	keyboardNavEnabled = !0;
	mouseNavEnabled = !0;
	editMode = !1;
	currentFocus = null;
	isDestroyed = !1;
	interactionContract;
	gridAPI;
	constructor(e, t) {
		this.interactionContract = e, this.gridAPI = t, this.setupEventListeners();
	}
	initialize(e) {
		this.isDestroyed || (e.setAttribute("role", "grid"), e.setAttribute("tabindex", "0"), this.gridAPI.initializeKeyboardHandling ? this.gridAPI.initializeKeyboardHandling(e) : this.enableKeyboardNavigation(e), this.enableMouseInteractions(e));
	}
	enableKeyboardNavigation(e) {
		if (!this.keyboardNavEnabled) return;
		let t = (e) => {
			this.handleKeyboardEvent(e);
		};
		e.addEventListener("keydown", t), e.__cleanup = () => {
			e.removeEventListener("keydown", t);
		};
	}
	enableMouseInteractions(e) {
		if (!this.mouseNavEnabled) return;
		let t = (e) => {
			this.handleMouseEvent(e, "click");
		}, n = (e) => {
			this.handleMouseEvent(e, "doubleClick");
		}, r = (e) => {
			this.handleMouseEvent(e, "contextMenu");
		};
		e.addEventListener("click", t), e.addEventListener("dblclick", n), e.addEventListener("contextmenu", r), e.__cleanup = () => {
			e.removeEventListener("click", t), e.removeEventListener("dblclick", n), e.removeEventListener("contextmenu", r);
		};
	}
	handleKeyboardEvent(e) {
		if (!this.keyboardNavEnabled || this.isDestroyed || this.gridAPI.handleKeyboardEvent && this.gridAPI.handleKeyboardEvent(e)) return;
		let t = this.getNavigationDirection(e);
		switch (t && (e.preventDefault(), this.navigateCell(t)), e.key) {
			case "Enter":
				this.currentFocus && (e.preventDefault(), this.activateCell(this.currentFocus));
				break;
			case "Escape":
				this.editMode && (e.preventDefault(), this.exitEditMode());
				break;
			case " ":
				this.currentFocus && !this.editMode && (e.preventDefault(), this.toggleCellSelection(this.currentFocus));
				break;
		}
	}
	handleMouseEvent(e, t) {
		if (!this.mouseNavEnabled || this.isDestroyed) return;
		let n = this.getCellFromEvent(e);
		if (n) switch (t) {
			case "click":
				this.handleCellClick(e, n.position, n.rowData, n.columnDef);
				break;
			case "doubleClick":
				this.handleCellDoubleClick(e, n.position, n.rowData, n.columnDef);
				break;
			case "contextMenu":
				this.handleCellRightClick(e, n.position, n.rowData, n.columnDef);
				break;
		}
	}
	getNavigationDirection(e) {
		switch (e.key) {
			case "ArrowUp": return "up";
			case "ArrowDown": return "down";
			case "ArrowLeft": return "left";
			case "ArrowRight": return "right";
			case "Home": return "home";
			case "End": return "end";
			case "PageUp": return "pageUp";
			case "PageDown": return "pageDown";
			default: return null;
		}
	}
	navigateCell(e) {
		if (!this.currentFocus) {
			this.setFocus({
				rowIndex: 0,
				columnIndex: 0,
				rowId: "0",
				columnId: "col-0"
			});
			return;
		}
		let t = null;
		switch (e) {
			case "up":
				this.currentFocus.rowIndex > 0 && (t = {
					...this.currentFocus,
					rowIndex: this.currentFocus.rowIndex - 1,
					rowId: String(this.currentFocus.rowIndex - 1)
				});
				break;
			case "down":
				t = {
					...this.currentFocus,
					rowIndex: this.currentFocus.rowIndex + 1,
					rowId: String(this.currentFocus.rowIndex + 1)
				};
				break;
			case "left":
				this.currentFocus.columnIndex > 0 && (t = {
					...this.currentFocus,
					columnIndex: this.currentFocus.columnIndex - 1,
					columnId: `col-${this.currentFocus.columnIndex - 1}`
				});
				break;
			case "right":
				t = {
					...this.currentFocus,
					columnIndex: this.currentFocus.columnIndex + 1,
					columnId: `col-${this.currentFocus.columnIndex + 1}`
				};
				break;
			case "home":
				t = {
					...this.currentFocus,
					columnIndex: 0,
					columnId: "col-0"
				};
				break;
			case "end": break;
		}
		t && this.setFocus(t);
	}
	setFocus(e) {
		this.currentFocus = e, this.interactionContract.setActive(e.rowId), this.interactionContract.ensureVisible(e.rowId, "smooth");
	}
	activateCell(e) {
		this.interactionContract.toggleEditMode(e.rowId, "enter"), this.editMode = !0;
	}
	exitEditMode() {
		this.currentFocus && this.interactionContract.toggleEditMode(this.currentFocus.rowId, "exit"), this.editMode = !1;
	}
	toggleCellSelection(e) {
		let t = new Set([e.rowId]);
		this.interactionContract.updateSelection(t, "user");
	}
	handleCellClick(e, t, n, r) {
		this.setFocus(t), this.interactionContract.emit?.("cell-click", {
			row: n,
			column: r,
			value: n[r.field]
		});
	}
	handleCellDoubleClick(e, t, n, r) {
		this.activateCell(t), this.interactionContract.emit?.("cell-double-click", {
			row: n,
			column: r,
			value: n[r.field]
		});
	}
	handleCellRightClick(e, t, n, r) {
		e.preventDefault(), this.interactionContract.emit?.("cell-right-click", {
			row: n,
			column: r,
			value: n[r.field]
		});
	}
	getCellFromEvent(e) {
		let t = e.target.closest("[data-cell-id]");
		if (!t) return null;
		let n = t.getAttribute("data-cell-id"), r = t.getAttribute("data-row-id"), i = t.getAttribute("data-column-id");
		return !n || !r || !i ? null : {
			position: {
				rowIndex: parseInt(r, 10),
				columnIndex: parseInt(i, 10),
				rowId: r,
				columnId: i
			},
			rowData: {},
			columnDef: {}
		};
	}
	setupEventListeners() {
		this.interactionContract.registerEventEmitter((e, t) => {
			this.gridAPI.emit(e, t);
		});
	}
	setKeyboardNavigationEnabled(e) {
		this.keyboardNavEnabled = e;
	}
	setMouseInteractionsEnabled(e) {
		this.mouseNavEnabled = e;
	}
	getCurrentFocus() {
		return this.currentFocus;
	}
	isInEditMode() {
		return this.editMode;
	}
	destroy() {
		this.isDestroyed = !0, this.currentFocus = null, this.editMode = !1;
	}
};
function createTableInteractionHandler(e, t) {
	return new TableInteractionHandler(e, t);
}
const pluginPresets = {
	get basic() {
		return [
			createSortingPlugin({ enableMultiSort: !1 }),
			columnManagementPlugin,
			filteringPlugin,
			selectionPlugin,
			keyboardNavigationPlugin
		];
	},
	get enhanced() {
		return [
			createSortingPlugin({ enableMultiSort: !0 }),
			filteringPlugin,
			selectionPlugin,
			columnManagementPlugin,
			keyboardNavigationPlugin
		];
	},
	get full() {
		return [
			createSortingPlugin({ enableMultiSort: !0 }),
			filteringPlugin,
			selectionPlugin,
			columnManagementPlugin,
			cellEditingPlugin,
			keyboardNavigationPlugin
		];
	},
	get editing() {
		return [
			createSortingPlugin({ enableMultiSort: !1 }),
			filteringPlugin,
			selectionPlugin,
			cellEditingPlugin,
			keyboardNavigationPlugin
		];
	},
	get accessible() {
		return [
			createSortingPlugin({ enableMultiSort: !1 }),
			filteringPlugin,
			selectionPlugin,
			keyboardNavigationPlugin
		];
	}
}, corePlugins = {
	sorting: () => import("./sorting-plugin-DkpnWC9P.js").then((e) => e.sortingPlugin),
	filtering: () => import("./filtering-plugin-BfTymisC.js").then((e) => e.filteringPlugin),
	selection: () => import("./selection-plugin-BBbbRAi6.js").then((e) => e.selectionPlugin),
	columnManagement: () => import("./column-management-plugin-DEGZQykq.js").then((e) => e.columnManagementPlugin),
	cellEditing: () => import("./cell-editing-plugin-CbRPICoF.js").then((e) => e.cellEditingPlugin),
	keyboardNavigation: () => import("./keyboard-navigation-plugin-DLXd39NV.js").then((e) => e.keyboardNavigationPlugin),
	dragDrop: () => import("./drag-drop-plugin--NFv-uw5.js").then((e) => e.dragDropPlugin)
};
var CellTextEditor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CellTextEditor",
	props: {
		value: { type: [
			String,
			Number,
			Boolean,
			Date,
			null
		] },
		row: {},
		column: {},
		cellRect: {},
		gridAPI: {}
	},
	emits: [
		"update:value",
		"commit",
		"cancel"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = ref(), o = ref(String(r.value || "")), s = computed(() => ({
			position: "absolute",
			left: `${r.cellRect.left}px`,
			top: `${r.cellRect.top}px`,
			width: `${r.cellRect.width}px`,
			height: `${r.cellRect.height}px`,
			zIndex: 1e3
		})), c = (e) => {
			let t = String(e);
			o.value = t, i("update:value", t), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(t);
		}, l = (e) => {
			switch (e.key) {
				case "Enter":
					e.shiftKey || (e.preventDefault(), e.stopPropagation(), i("commit"));
					break;
				case "Escape":
					e.preventDefault(), e.stopPropagation(), i("cancel");
					break;
				case "Tab":
					e.preventDefault(), e.stopPropagation(), i("commit");
					break;
			}
		}, u = () => {
			i("commit");
		}, d = () => {
			let e = a.value?.$el?.querySelector("input");
			e && (e.focus(), e.select());
		};
		return onMounted(async () => {
			await nextTick(), d();
		}), t({ focus: d }), (t, n) => (openBlock(), createElementBlock("div", {
			style: normalizeStyle(s.value),
			class: "ht-cell-text-editor"
		}, [createVNode(HtInput_default, {
			ref_key: "inputRef",
			ref: a,
			"model-value": o.value,
			type: "text",
			variant: "default",
			size: "md",
			placeholder: e.column.placeholder || `Enter ${e.column.title}`,
			maxlength: e.column.maxLength,
			autocomplete: "off",
			class: "ht-cell-editor-input",
			"onUpdate:modelValue": c,
			onKeydown: l,
			onBlur: u
		}, null, 8, [
			"model-value",
			"placeholder",
			"maxlength"
		])], 4));
	}
}), CellTextEditor_default = /* @__PURE__ */ __plugin_vue_export_helper_default(CellTextEditor_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2f4c8191"]]), CellNumberEditor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CellNumberEditor",
	props: {
		value: { type: [
			String,
			Number,
			Boolean,
			Date,
			null
		] },
		row: {},
		column: {},
		cellRect: {},
		gridAPI: {}
	},
	emits: [
		"update:value",
		"commit",
		"cancel"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = ref(), o = ref(d(r.value)), s = ref(!1), c = ref(""), l = computed(() => ({
			position: "absolute",
			left: `${r.cellRect.left}px`,
			top: `${r.cellRect.top}px`,
			width: `${r.cellRect.width}px`,
			height: `${r.cellRect.height}px`,
			zIndex: 1e3
		})), u = computed(() => s.value ? "error" : "default");
		function d(e) {
			if (e == null || e === "") return "";
			let t = Number(e);
			return isNaN(t) ? String(e) : r.column.decimals === void 0 ? t : Number(t.toFixed(r.column.decimals));
		}
		function f(e) {
			if (e === "" || e == null) return null;
			let t = Number(e);
			return isNaN(t) ? null : t;
		}
		function p(e) {
			if (e === "") return { valid: !0 };
			let t = Number(e);
			return isNaN(t) ? {
				valid: !1,
				message: "Must be a valid number"
			} : r.column.min !== void 0 && t < r.column.min ? {
				valid: !1,
				message: `Must be at least ${r.column.min}`
			} : r.column.max !== void 0 && t > r.column.max ? {
				valid: !1,
				message: `Must be at most ${r.column.max}`
			} : { valid: !0 };
		}
		let m = (e) => {
			o.value = e;
			let t = p(e);
			s.value = !t.valid, c.value = t.message || "";
			let n = f(e);
			i("update:value", n), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(n);
		}, h = (e) => {
			switch (e.key) {
				case "Enter":
					e.shiftKey || (e.preventDefault(), e.stopPropagation(), s.value || i("commit"));
					break;
				case "Escape":
					e.preventDefault(), e.stopPropagation(), i("cancel");
					break;
				case "Tab":
					e.preventDefault(), e.stopPropagation(), s.value || i("commit");
					break;
				case "ArrowUp":
					e.preventDefault(), _(1);
					break;
				case "ArrowDown":
					e.preventDefault(), _(-1);
					break;
			}
		}, g = () => {
			s.value || i("commit");
		}, _ = (e) => {
			let t = f(o.value) || 0, n = r.column.step || 1, i = t + e * n;
			r.column.min !== void 0 && (i = Math.max(i, r.column.min)), r.column.max !== void 0 && (i = Math.min(i, r.column.max)), o.value = d(i), m(o.value);
		}, v = () => {
			let e = a.value?.$el?.querySelector("input");
			e && (e.focus(), e.select());
		};
		return watch(() => r.value, (e) => {
			o.value = d(e), s.value = !1, c.value = "";
		}), onMounted(async () => {
			await nextTick(), v();
		}), t({ focus: v }), (t, n) => (openBlock(), createElementBlock("div", {
			style: normalizeStyle(l.value),
			class: "ht-cell-number-editor"
		}, [createVNode(HtInput_default, {
			ref_key: "inputRef",
			ref: a,
			"model-value": o.value,
			type: "number",
			variant: "default",
			size: "md",
			state: u.value,
			placeholder: e.column.placeholder || `Enter ${e.column.title}`,
			autocomplete: "off",
			class: "ht-cell-editor-input",
			"onUpdate:modelValue": m,
			onKeydown: h,
			onBlur: g
		}, null, 8, [
			"model-value",
			"state",
			"placeholder"
		]), s.value && c.value ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: "absolute bg-[var(--ht-danger)] text-[var(--ht-text-inverse)] text-xs px-2 py-1 rounded shadow-lg z-[1001]",
			style: normalizeStyle({
				left: `${e.cellRect.left}px`,
				top: `${e.cellRect.bottom + 2}px`,
				maxWidth: `${e.cellRect.width}px`
			})
		}, toDisplayString(c.value), 5)) : createCommentVNode("", !0)], 4));
	}
}), CellNumberEditor_default = /* @__PURE__ */ __plugin_vue_export_helper_default(CellNumberEditor_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-bcce32c7"]]), _hoisted_1$3 = { class: "ht-select-container" }, _hoisted_2$2 = ["aria-expanded"], _hoisted_3$1 = { class: "truncate flex-1" }, _hoisted_4$1 = {
	key: 0,
	class: "p-2 border-b border-[var(--ht-border)]"
}, _hoisted_5$1 = { class: "max-h-40 overflow-y-auto" }, _hoisted_6$1 = ["aria-selected", "onClick"], _hoisted_7 = { class: "truncate" }, _hoisted_8 = {
	key: 0,
	class: "w-4 h-4 ml-2 flex-shrink-0",
	fill: "currentColor",
	viewBox: "0 0 20 20"
}, _hoisted_9 = {
	key: 0,
	class: "px-3 py-2 text-sm text-[var(--ht-text-muted)] text-center"
}, CellSelectEditor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CellSelectEditor",
	props: {
		value: { type: [
			String,
			Number,
			Boolean,
			Date,
			null
		] },
		row: {},
		column: {},
		cellRect: {},
		gridAPI: {}
	},
	emits: [
		"update:value",
		"commit",
		"cancel"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = ref(), o = ref(), s = ref(r.value), c = ref(!1), l = ref(""), u = ref(-1), d = computed(() => ({
			position: "absolute",
			left: `${r.cellRect.left}px`,
			top: `${r.cellRect.top}px`,
			width: `${r.cellRect.width}px`,
			minWidth: `${Math.max(r.cellRect.width, 150)}px`,
			zIndex: 1e3
		})), f = computed(() => ({
			position: "absolute",
			left: `${r.cellRect.left}px`,
			top: `${r.cellRect.bottom}px`,
			width: `${Math.max(r.cellRect.width, 150)}px`,
			maxHeight: "200px",
			zIndex: 1001
		})), p = computed(() => r.column.options ? r.column.options.map((e) => {
			if (typeof e == "string" || typeof e == "number") return {
				value: e,
				label: String(e)
			};
			let t = e;
			return {
				value: t.value,
				label: t.label || String(t.value),
				disabled: t.disabled || !1
			};
		}) : []), m = computed(() => {
			if (!l.value) return p.value;
			let e = l.value.toLowerCase();
			return p.value.filter((t) => t.label.toLowerCase().includes(e) || String(t.value).toLowerCase().includes(e));
		}), h = computed(() => p.value.find((e) => e.value === s.value)), _ = computed(() => h.value?.label || String(s.value || "")), v = computed(() => [
			"ht-cell-editor",
			"ht-select-editor",
			"px-3 py-1",
			"border-2 border-[var(--ht-primary)]",
			"bg-[var(--ht-bg)]",
			"text-[var(--ht-text)]",
			"text-sm",
			"outline-none",
			"rounded",
			"shadow-md",
			"cursor-pointer",
			"flex items-center justify-between"
		]), y = computed(() => [
			"ht-select-dropdown",
			"border border-[var(--ht-border)]",
			"bg-[var(--ht-bg)]",
			"rounded",
			"shadow-lg",
			"overflow-hidden"
		]), b = () => {
			c.value = !0, l.value = "", u.value = m.value.findIndex((e) => e.value === s.value), u.value === -1 && m.value.length > 0 && (u.value = 0);
		}, w = () => {
			c.value = !1, u.value = -1, l.value = "";
		}, T = (e) => {
			e.disabled || (s.value = e.value, i("update:value", e.value), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(e.value), w(), i("commit"));
		}, E = (e) => {
			switch (e.key) {
				case "Enter":
					if (e.preventDefault(), e.stopPropagation(), c.value && u.value >= 0) {
						let e = m.value[u.value];
						e && !e.disabled && T(e);
					} else c.value || b();
					break;
				case "Escape":
					e.preventDefault(), e.stopPropagation(), c.value ? w() : i("cancel");
					break;
				case "Tab":
					e.preventDefault(), e.stopPropagation(), w(), i("commit");
					break;
				case "ArrowDown":
					e.preventDefault(), c.value ? (u.value = Math.min(u.value + 1, m.value.length - 1), D(u.value)) : b();
					break;
				case "ArrowUp":
					e.preventDefault(), c.value && (u.value = Math.max(u.value - 1, 0), D(u.value));
					break;
				case "Space":
					c.value || (e.preventDefault(), b());
					break;
				default:
					if (e.key.length === 1 && c.value) {
						l.value += e.key;
						let t = m.value.findIndex((e) => e.label.toLowerCase().startsWith(l.value.toLowerCase()));
						t >= 0 && (u.value = t, D(u.value));
					}
					break;
			}
		}, D = (e) => {
			if (o.value) {
				let t = o.value.querySelectorAll(".ht-select-option")[e];
				t && t.scrollIntoView({ block: "nearest" });
			}
		}, O = () => {
			c.value ? w() : b();
		}, k = (e) => {
			let t = e.target;
			a.value && !a.value.contains(t) && o.value && !o.value.contains(t) && (w(), i("commit"));
		}, A = () => {
			a.value && a.value.focus();
		};
		return watch(() => r.value, (e) => {
			s.value = e;
		}), onMounted(async () => {
			await nextTick(), A(), document.addEventListener("mousedown", k);
		}), t({
			focus: A,
			cleanup: () => {
				document.removeEventListener("mousedown", k);
			}
		}), (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$3, [createElementVNode("div", {
			ref_key: "selectRef",
			ref: a,
			class: normalizeClass(v.value),
			style: normalizeStyle(d.value),
			tabindex: "0",
			role: "combobox",
			"aria-expanded": c.value,
			"aria-haspopup": !0,
			onClick: O,
			onKeydown: E
		}, [createElementVNode("span", _hoisted_3$1, toDisplayString(_.value), 1), (openBlock(), createElementBlock("svg", {
			class: normalizeClass(["w-4 h-4 ml-2 flex-shrink-0 transform transition-transform", { "rotate-180": c.value }]),
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		}, [...n[2] ||= [createElementVNode("path", {
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			"stroke-width": "2",
			d: "M19 9l-7 7-7-7"
		}, null, -1)]], 2))], 46, _hoisted_2$2), c.value ? (openBlock(), createElementBlock("div", {
			key: 0,
			ref_key: "dropdownRef",
			ref: o,
			class: normalizeClass(y.value),
			style: normalizeStyle(f.value),
			role: "listbox"
		}, [e.column.searchable ? (openBlock(), createElementBlock("div", _hoisted_4$1, [withDirectives(createElementVNode("input", {
			"onUpdate:modelValue": n[0] ||= (e) => l.value = e,
			type: "text",
			class: "w-full px-2 py-1 text-sm border border-[var(--ht-border)] rounded outline-none",
			placeholder: "Search options...",
			onKeydown: n[1] ||= withModifiers(() => {}, ["stop"])
		}, null, 544), [[vModelText, l.value]])])) : createCommentVNode("", !0), createElementVNode("div", _hoisted_5$1, [(openBlock(!0), createElementBlock(Fragment, null, renderList(m.value, (e, t) => (openBlock(), createElementBlock("div", {
			key: `${e.value}-${t}`,
			class: normalizeClass(["ht-select-option px-3 py-2 text-sm cursor-pointer hover:bg-[var(--ht-cell-hover)] flex items-center justify-between", {
				"bg-[var(--ht-primary)] text-[var(--ht-text-inverse)]": t === u.value,
				"text-[var(--ht-text-muted)] cursor-not-allowed": e.disabled,
				"bg-[var(--ht-cell-selected)]": e.value === s.value && t !== u.value
			}]),
			role: "option",
			"aria-selected": e.value === s.value,
			onClick: (t) => T(e)
		}, [createElementVNode("span", _hoisted_7, toDisplayString(e.label), 1), e.value === s.value ? (openBlock(), createElementBlock("svg", _hoisted_8, [...n[3] ||= [createElementVNode("path", {
			"fill-rule": "evenodd",
			d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
			"clip-rule": "evenodd"
		}, null, -1)]])) : createCommentVNode("", !0)], 10, _hoisted_6$1))), 128)), m.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, " No options available ")) : createCommentVNode("", !0)])], 6)) : createCommentVNode("", !0)]));
	}
}), CellSelectEditor_default = /* @__PURE__ */ __plugin_vue_export_helper_default(CellSelectEditor_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-96d19957"]]), _hoisted_1$2 = { class: "ht-date-container relative" }, _hoisted_2$1 = ["value", "placeholder"], CellDateEditor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CellDateEditor",
	props: {
		value: { type: [
			String,
			Number,
			Boolean,
			Date,
			null
		] },
		row: {},
		column: {},
		cellRect: {},
		gridAPI: {}
	},
	emits: [
		"update:value",
		"commit",
		"cancel"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n;
		function a(e) {
			return e instanceof Date || typeof e == "string" || e == null ? p(e) : "";
		}
		let o = ref(), s = ref(a(r.value)), c = ref(!1), l = ref(""), u = computed(() => ({
			position: "absolute",
			left: `${r.cellRect.left}px`,
			top: `${r.cellRect.top}px`,
			width: `${r.cellRect.width}px`,
			height: `${r.cellRect.height}px`,
			zIndex: 1e3
		})), d = computed(() => [
			"ht-cell-editor",
			"ht-date-editor",
			"px-3 py-1",
			"border-2",
			c.value ? "border-[var(--ht-danger)]" : "border-[var(--ht-primary)]",
			"bg-[var(--ht-bg)]",
			"text-[var(--ht-text)]",
			"text-sm",
			"outline-none",
			"rounded",
			"shadow-md"
		]), f = computed(() => {
			let e = {
				type: "date",
				autocomplete: "off"
			};
			return r.column.minDate && (e.min = p(r.column.minDate)), r.column.maxDate && (e.max = p(r.column.maxDate)), e;
		});
		function p(e) {
			if (!e) return "";
			try {
				let t = e instanceof Date ? e : new Date(e);
				return isNaN(t.getTime()) ? "" : t.toISOString().split("T")[0] || "";
			} catch {
				return "";
			}
		}
		function m(e) {
			if (!e) return null;
			try {
				let t = /* @__PURE__ */ new Date(`${e}T00:00:00`);
				return isNaN(t.getTime()) ? null : t;
			} catch {
				return null;
			}
		}
		function h(e) {
			if (!e) return "";
			try {
				let t = r.column.locale || "en-US", n = r.column.dateOptions || {
					year: "numeric",
					month: "short",
					day: "numeric"
				};
				return e.toLocaleDateString(t, n);
			} catch {
				return e.toISOString().split("T")[0] || "";
			}
		}
		function g(e) {
			if (!e) return { valid: !0 };
			let t = m(e);
			if (!t) return {
				valid: !1,
				message: "Invalid date format"
			};
			if (r.column.minDate) {
				let e = new Date(r.column.minDate);
				if (t < e) return {
					valid: !1,
					message: `Date must be after ${h(e)}`
				};
			}
			if (r.column.maxDate) {
				let e = new Date(r.column.maxDate);
				if (t > e) return {
					valid: !1,
					message: `Date must be before ${h(e)}`
				};
			}
			return { valid: !0 };
		}
		let _ = (e) => {
			let t = e.target;
			s.value = t.value;
			let n = g(t.value);
			c.value = !n.valid, l.value = n.message || "";
			let a = m(t.value);
			i("update:value", a), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(a);
		}, v = (e) => {
			switch (e.key) {
				case "Enter":
					e.shiftKey || (e.preventDefault(), e.stopPropagation(), c.value || i("commit"));
					break;
				case "Escape":
					e.preventDefault(), e.stopPropagation(), i("cancel");
					break;
				case "Tab":
					e.preventDefault(), e.stopPropagation(), c.value || i("commit");
					break;
				case "ArrowDown":
				case "ArrowUp": break;
			}
		}, y = () => {
			c.value || i("commit");
		}, b = () => {
			if (s.value = p(/* @__PURE__ */ new Date()), o.value) {
				o.value.value = s.value;
				let e = new Event("input", { bubbles: !0 });
				o.value.dispatchEvent(e);
			}
		}, w = () => {
			if (s.value = "", o.value) {
				o.value.value = "";
				let e = new Event("input", { bubbles: !0 });
				o.value.dispatchEvent(e);
			}
		}, T = () => {
			o.value && (o.value.focus(), o.value.showPicker?.());
		};
		return watch(() => r.value, (e) => {
			s.value = a(e), c.value = !1, l.value = "";
		}), onMounted(async () => {
			await nextTick(), T();
		}), t({ focus: T }), (t, n) => (openBlock(), createElementBlock("div", _hoisted_1$2, [
			createElementVNode("input", mergeProps({
				ref_key: "inputRef",
				ref: o,
				value: s.value,
				class: d.value,
				style: u.value,
				placeholder: e.column.placeholder || "Select date"
			}, f.value, {
				onInput: _,
				onKeydown: v,
				onBlur: y
			}), null, 16, _hoisted_2$1),
			e.column.showQuickActions === !1 ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", {
				key: 0,
				class: "absolute flex gap-1 z-[1001]",
				style: normalizeStyle({
					left: `${e.cellRect.right - 80}px`,
					top: `${e.cellRect.bottom + 2}px`
				})
			}, [createVNode(HtButton_default, {
				type: "button",
				size: "xs",
				variant: "primary",
				title: "Set to today",
				onClick: b
			}, {
				default: withCtx(() => [...n[0] ||= [createTextVNode(" Today ", -1)]]),
				_: 1
			}), createVNode(HtButton_default, {
				type: "button",
				size: "xs",
				variant: "secondary",
				title: "Clear date",
				onClick: w
			}, {
				default: withCtx(() => [...n[1] ||= [createTextVNode(" Clear ", -1)]]),
				_: 1
			})], 4)),
			c.value && l.value ? (openBlock(), createElementBlock("div", {
				key: 1,
				class: "absolute bg-[var(--ht-danger)] text-[var(--ht-text-inverse)] text-xs px-2 py-1 rounded shadow-lg z-[1001]",
				style: normalizeStyle({
					left: `${e.cellRect.left}px`,
					top: `${e.cellRect.bottom + 2}px`,
					maxWidth: `${e.cellRect.width}px`
				})
			}, toDisplayString(l.value), 5)) : createCommentVNode("", !0)
		]));
	}
}), CellDateEditor_default = /* @__PURE__ */ __plugin_vue_export_helper_default(CellDateEditor_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-b92095db"]]), _hoisted_1$1 = {
	key: 0,
	class: "flex items-center gap-2"
}, _hoisted_2 = {
	key: 1,
	class: "flex items-center gap-2"
}, _hoisted_3 = { class: "ht-toggle-container flex items-center gap-2" }, _hoisted_4 = ["aria-checked"], _hoisted_5 = { class: "text-sm text-[var(--ht-text)] select-none" }, _hoisted_6 = {
	key: 2,
	class: "flex gap-1"
}, CellBooleanEditor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "CellBooleanEditor",
	props: {
		value: { type: [
			String,
			Number,
			Boolean,
			Date,
			null
		] },
		row: {},
		column: {},
		cellRect: {},
		gridAPI: {}
	},
	emits: [
		"update:value",
		"commit",
		"cancel"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, a = ref(), o = ref(!!r.value), s = computed(() => ({
			position: "absolute",
			left: `${r.cellRect.left}px`,
			top: `${r.cellRect.top}px`,
			width: `${r.cellRect.width}px`,
			height: `${r.cellRect.height}px`,
			zIndex: 1e3
		})), c = computed(() => [
			"ht-cell-editor",
			"ht-boolean-editor",
			"flex items-center justify-center",
			"border-2 border-[var(--ht-primary)]",
			"bg-[var(--ht-bg)]",
			"rounded",
			"shadow-md"
		]), l = computed(() => r.column.booleanDisplay || "checkbox"), u = computed(() => ({
			true: r.column.trueLabel || "Yes",
			false: r.column.falseLabel || "No"
		})), d = () => {
			let e = !o.value;
			o.value = e, i("update:value", e), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(e), r.column.autoCommit !== !1 && nextTick(() => {
				i("commit");
			});
		}, f = (e) => {
			o.value = e, i("update:value", e), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(e), r.column.autoCommit !== !1 && nextTick(() => {
				i("commit");
			});
		}, p = (e) => {
			let t = e === !0;
			o.value = t, i("update:value", t), r.gridAPI?.updateCellEditValue && r.gridAPI.updateCellEditValue(t), r.column.autoCommit !== !1 && nextTick(() => {
				i("commit");
			});
		}, m = (e) => {
			switch (e.key) {
				case "Enter":
				case " ":
					e.preventDefault(), e.stopPropagation(), l.value === "buttons" ? i("commit") : d();
					break;
				case "Escape":
					e.preventDefault(), e.stopPropagation(), i("cancel");
					break;
				case "Tab":
					e.preventDefault(), e.stopPropagation(), i("commit");
					break;
				case "ArrowLeft":
				case "ArrowDown":
					l.value === "buttons" && (e.preventDefault(), f(!1));
					break;
				case "ArrowRight":
				case "ArrowUp":
					l.value === "buttons" && (e.preventDefault(), f(!0));
					break;
			}
		}, h = () => {
			if (l.value === "buttons") {
				let e = a.value;
				e && e.focus();
			} else {
				let e = a.value?.$el?.querySelector("input");
				e && e.focus();
			}
		};
		return watch(() => r.value, (e) => {
			o.value = !!e;
		}), onMounted(async () => {
			await nextTick(), h();
		}), t({ focus: h }), (e, t) => (openBlock(), createElementBlock("div", {
			class: normalizeClass(c.value),
			style: normalizeStyle(s.value),
			onKeydown: m
		}, [l.value === "checkbox" ? (openBlock(), createElementBlock("div", _hoisted_1$1, [createVNode(HtCheckbox_default, {
			ref_key: "checkboxRef",
			ref: a,
			"model-value": o.value,
			variant: "default",
			size: "md",
			label: o.value ? u.value.true : u.value.false,
			"onUpdate:modelValue": p
		}, null, 8, ["model-value", "label"])])) : l.value === "toggle" ? (openBlock(), createElementBlock("div", _hoisted_2, [createElementVNode("div", _hoisted_3, [createElementVNode("div", {
			class: "ht-toggle relative inline-block w-10 h-6 cursor-pointer",
			tabindex: "0",
			role: "switch",
			"aria-checked": o.value,
			onClick: d,
			onKeydown: m
		}, [createElementVNode("div", { class: normalizeClass(["ht-toggle-bg w-full h-full rounded-full border-2 transition-colors duration-200", o.value ? "bg-[var(--ht-primary)] border-[var(--ht-primary)]" : "bg-[var(--ht-bg-subtle)] border-[var(--ht-border)]"]) }, null, 2), createElementVNode("div", { class: normalizeClass(["ht-toggle-thumb absolute top-0.5 left-0.5 w-4 h-4 bg-[var(--color-ht-white)] rounded-full shadow-sm transform transition-transform duration-200", { "translate-x-4": o.value }]) }, null, 2)], 40, _hoisted_4), createElementVNode("span", _hoisted_5, toDisplayString(o.value ? u.value.true : u.value.false), 1)])])) : l.value === "buttons" ? (openBlock(), createElementBlock("div", _hoisted_6, [createVNode(HtButton_default, {
			ref_key: "checkboxRef",
			ref: a,
			type: "button",
			size: "xs",
			variant: o.value ? "primary" : "secondary",
			tabindex: "0",
			onClick: t[0] ||= (e) => f(!0)
		}, {
			default: withCtx(() => [createTextVNode(toDisplayString(u.value.true), 1)]),
			_: 1
		}, 8, ["variant"]), createVNode(HtButton_default, {
			type: "button",
			size: "xs",
			variant: o.value ? "secondary" : "primary",
			onClick: t[1] ||= (e) => f(!1)
		}, {
			default: withCtx(() => [createTextVNode(toDisplayString(u.value.false), 1)]),
			_: 1
		}, 8, ["variant"])])) : createCommentVNode("", !0)], 38));
	}
}), CellBooleanEditor_default = /* @__PURE__ */ __plugin_vue_export_helper_default(CellBooleanEditor_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-48e9b7a9"]]), _hoisted_1 = {
	key: 0,
	class: "ht-cell-editor-overlay",
	style: {
		position: "fixed",
		top: "0",
		left: "0",
		"pointer-events": "none",
		"z-index": "1000"
	}
}, CellEditorOverlay_default = /* @__PURE__ */ __plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "CellEditorOverlay",
	props: {
		containerElement: {},
		gridAPI: {}
	},
	setup(t, { expose: n }) {
		let r = createLogger("cell-editor-overlay"), i = t, a = shallowRef(null), o = ref(null), s = ref({}), c = ref(!1), l = {
			text: CellTextEditor_default,
			number: CellNumberEditor_default,
			select: CellSelectEditor_default,
			date: CellDateEditor_default,
			boolean: CellBooleanEditor_default
		}, u = computed(() => {
			if (!a.value) return null;
			let e = a.value.type || "text";
			return l[e] || CellTextEditor_default;
		}), d = computed(() => i.containerElement || document.body), f = (e, t) => {
			let n = document.querySelector(`[data-row-id="${e}"][data-column-id="${t}"]`);
			return n ? n.getBoundingClientRect() : (r.warn(`Cell not found: row=${e}, column=${t}`), null);
		}, p = async (e) => {
			m();
			let t = f(e.rowId, e.columnId);
			if (!t) return !1;
			let n = y(e.column);
			return s.value = {
				value: e.value,
				row: e.row,
				column: e.column,
				cellRect: t,
				gridAPI: i.gridAPI,
				"onUpdate:value": h,
				onCommit: g,
				onCancel: v
			}, a.value = {
				type: n,
				rowId: e.rowId,
				columnId: e.columnId
			}, c.value = !0, await nextTick(), o.value?.focus && o.value.focus(), !0;
		}, m = () => {
			o.value?.cleanup && o.value.cleanup(), a.value = null, o.value = null, s.value = {}, c.value = !1;
		}, h = (e) => {
			i.gridAPI.updateCellEditValue && i.gridAPI.updateCellEditValue(e);
		}, g = async () => {
			i.gridAPI.commitCellEdit && await i.gridAPI.commitCellEdit() && m();
		}, v = () => {
			i.gridAPI.cancelCellEdit && i.gridAPI.cancelCellEdit(), m();
		}, y = (e) => e.editor || e.editor && i.gridAPI.getCellEditor && i.gridAPI.getCellEditor(e.editor) ? e.editor : e.dataType || "text", C = (e) => {
			o.value?.handleKeydown && o.value.handleKeydown(e) || i.gridAPI.handleCellEditKeydown && i.gridAPI.handleCellEditKeydown(e);
		}, w = () => {
			i.gridAPI.on && (i.gridAPI.on("cell-edit-start", (e) => {
				let t = i.gridAPI.getData().find((t) => (t.id || t._index) === e.rowId), n = i.columns?.find((t) => t.id === e.columnId);
				t && n && p({
					row: t,
					column: n,
					value: e.value,
					cellRect: new DOMRect(0, 0, 0, 0)
				});
			}), i.gridAPI.on("cell-edit-cancel", () => {
				m();
			}), i.gridAPI.on("cell-edit-complete", () => {
				m();
			}));
		}, T = () => {
			if (!a.value || !s.value.cellRect) return;
			let e = f(a.value.rowId, a.value.columnId);
			e && (s.value = {
				...s.value,
				cellRect: e
			});
		}, E = () => {
			c.value && T();
		}, D = () => {
			c.value && T();
		};
		return w(), typeof window < "u" && (window.addEventListener("scroll", E, { passive: !0 }), window.addEventListener("resize", D, { passive: !0 }), window.addEventListener("keydown", C, { capture: !0 })), onUnmounted(() => {
			m(), typeof window < "u" && (window.removeEventListener("scroll", E), window.removeEventListener("resize", D), window.removeEventListener("keydown", C, { capture: !0 }));
		}), n({
			showEditor: p,
			hideEditor: m,
			updatePosition: T,
			isVisible: computed(() => c.value)
		}), (e, t) => (openBlock(), createBlock(Teleport, {
			to: d.value,
			disabled: !c.value
		}, [c.value && u.value && a.value ? (openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(resolveDynamicComponent(u.value), mergeProps({
			ref_key: "editorInstance",
			ref: o
		}, s.value, {
			value: s.value.value,
			row: s.value.row,
			column: s.value.column,
			"cell-rect": s.value.cellRect,
			"grid-a-p-i": s.value.gridAPI,
			style: { "pointer-events": "auto" },
			"onUpdate:value": s.value["onUpdate:value"],
			onCancel: s.value.onCancel,
			onCommit: s.value.onCommit
		}), null, 16, [
			"value",
			"row",
			"column",
			"cell-rect",
			"grid-a-p-i",
			"onUpdate:value",
			"onCancel",
			"onCommit"
		]))])) : createCommentVNode("", !0)], 8, ["to", "disabled"]));
	}
}), [["__scopeId", "data-v-b18c51cc"]]), BasePlugin = class {
	api;
	logger;
	constructor() {
		this.logger = createLogger({
			module: "Plugin",
			operation: "base-plugin"
		});
	}
	install(t) {
		this.api = t, this.logger = createLogger({
			module: "Plugin",
			operation: this.name
		}), this.logger.info(`Plugin installed: ${this.name}`);
	}
};
const SORT_PRESETS = {
	default: { sensitivity: "variant" },
	caseInsensitive: { sensitivity: "base" },
	natural: {
		naturalSort: !0,
		sensitivity: "base"
	},
	naturalCaseSensitive: {
		naturalSort: !0,
		sensitivity: "variant"
	},
	chinese: {
		locale: "zh-CN",
		sensitivity: "base"
	},
	strict: { sensitivity: "variant" },
	numericFirst: {
		naturalSort: !0,
		sensitivity: "base"
	}
}, LOCALE_PRESETS = {
	"en-US": {
		locale: "en-US",
		sensitivity: "base"
	},
	"zh-CN": {
		locale: "zh-CN",
		sensitivity: "base"
	},
	"ja-JP": {
		locale: "ja-JP",
		sensitivity: "base"
	},
	"ko-KR": {
		locale: "ko-KR",
		sensitivity: "base"
	},
	"de-DE": {
		locale: "de-DE",
		sensitivity: "base"
	},
	"fr-FR": {
		locale: "fr-FR",
		sensitivity: "base"
	},
	"es-ES": {
		locale: "es-ES",
		sensitivity: "base"
	}
};
function createSortOptions(e, t) {
	return {
		...SORT_PRESETS[e],
		...t
	};
}
const version = "1.1.0-renderer-system", features = {
	ADVANCED_VIRTUALIZATION: !0,
	PERFORMANCE_MONITORING: !0,
	MEMORY_MANAGEMENT: !0,
	BROWSER_OPTIMIZATION: !0,
	PLUGIN_SYSTEM: !0,
	CAPABILITY_SYSTEM: !0,
	RENDERER_SYSTEM: !0,
	DUAL_RENDERING: !0,
	EXCEL_SUPPORT: !0,
	DATA_PIPELINE: !0,
	KEYBOARD_NAVIGATION: !0,
	ACCESSIBILITY: !0
};
typeof window < "u" && initializeBrowserOptimizations();
const PLUGIN_API_VERSION = "1.1.0", RENDERER_API_VERSION = "1.0.0";
function isPluginCompatible(e) {
	return e ? e === PLUGIN_API_VERSION : !0;
}
function isRendererCompatible(e) {
	return e ? e === RENDERER_API_VERSION : !0;
}
function getRendererSystemInfo() {
	return {
		apiVersion: RENDERER_API_VERSION,
		supportedRenderers: ["table", "excel"],
		defaultRenderer: "table",
		features: {
			dynamicSwitching: !0,
			pluginProvided: !0,
			statePreservation: !0,
			hotSwapping: !0
		}
	};
}
const quickStart = {
	table: (e, t) => ({
		data: e,
		columns: t,
		renderer: "table",
		config: {
			virtualizationThreshold: 1e3,
			enableVirtualization: !0
		}
	}),
	excel: (e, t) => ({
		data: e,
		columns: t,
		renderer: "excel",
		config: {
			virtualizationThreshold: 1e3,
			enableVirtualization: !0
		}
	}),
	highPerformance: (e, t) => ({
		data: e,
		columns: t,
		config: {
			virtualizationThreshold: 100,
			enableVirtualization: !0,
			rowHeight: 32,
			headerHeight: 40
		},
		utilities: {
			memoryManagement: !0,
			performanceMonitoring: !0,
			dataPipeline: !0,
			browserOptimizations: !0
		}
	})
};
export { AccessibilityAnnouncer_default as AccessibilityAnnouncer, BasePlugin, BrowserFeatures, CellBooleanEditor_default as CellBooleanEditor, CellDateEditor_default as CellDateEditor, CellEditorOverlay_default as CellEditorOverlay, CellNumberEditor_default as CellNumberEditor, CellSelectEditor_default as CellSelectEditor, CellTextEditor_default as CellTextEditor, DOMBatcher, DataGrid_default as DataGrid, DataPipelineUtils, EXCEL_PLUGIN_INFO, ElementPool, EventDelegator, GRID_EVENT_NAMES, HtButton_default as HtButton, HtCheckbox_default as HtCheckbox, HtInput_default as HtInput, HtRadio_default as HtRadio, HtSelect_default as HtSelect, HtSelectContent_default as HtSelectContent, HtSelectGroup_default as HtSelectGroup, HtSelectItem_default as HtSelectItem, HtSelectLabel_default as HtSelectLabel, HtSelectSeparator_default as HtSelectSeparator, HtSelectTrigger_default as HtSelectTrigger, HtSelectValue_default as HtSelectValue, KeyboardShortcuts_default as KeyboardShortcuts, LOCALE_PRESETS, PLUGIN_API_VERSION, RENDERER_API_VERSION, RendererRegistry, SORT_PRESETS, UtilityFeatures, benchmarkOperation, browserOptimizations, cellEditingPlugin, corePlugins, createExcelRenderer, createRendererRegistry, createSortOptions, createTableInteractionHandler, createTableRenderer, createVirtualRowFactory, detectPlatform, dragDropPlugin, enhancedSortingPlugin, features, formatShortcut, formatShortcutSymbol, getAvailableRenderers, getCurrentRenderer, getModifierKeySymbol, getModifierKeyText, getRendererSystemInfo, getUtilityInfo, hasModifierKey, initializeBrowserOptimizations, initializeUtilities, isPluginCompatible, isRendererCompatible, keyboardNavigationPlugin, pluginPresets, quickStart, quickStartUtils, selectionPlugin, sortingPlugin, switchRenderer, useAdvancedVirtualizer, useDataPipeline, useGridEvents, useGridState, useHappyTable, useHorizontalVirtualizer, useMemoryManagement, usePerformanceMonitoring, useThreePaneVirtualizer, useVirtualizer, version };

//# sourceMappingURL=happy-table.es.js.map