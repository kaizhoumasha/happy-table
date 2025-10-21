import { n as createLogger } from "./logger-CjSoYuMW.js";
function isSingleSortConfig(e) {
	return typeof e == "object" && !!e && "field" in e && "direction" in e && typeof e.field == "string" && ["asc", "desc"].includes(e.direction);
}
function isMultiSortConfig(e) {
	return typeof e == "object" && !!e && "fields" in e && Array.isArray(e.fields);
}
function naturalSortChunks(e) {
	let t = [], n = /(\d+)|(\D+)/g, r;
	for (; (r = n.exec(e)) !== null;) r[1] ? t.push(parseInt(r[1], 10)) : r[2] && t.push(r[2]);
	return t;
}
function naturalCompare(e, t, n = !1) {
	let i = naturalSortChunks(n ? e : e.toLowerCase()), a = naturalSortChunks(n ? t : t.toLowerCase()), o = Math.max(i.length, a.length);
	for (let e = 0; e < o; e++) {
		let t = i[e], n = a[e];
		if (t === void 0) return -1;
		if (n === void 0) return 1;
		if (typeof t == "number" && typeof n == "number") {
			if (t !== n) return t - n;
			continue;
		}
		if (typeof t == "string" && typeof n == "string") {
			let e = t.localeCompare(n);
			if (e !== 0) return e;
			continue;
		}
		if (typeof t == "number") return -1;
		if (typeof n == "number") return 1;
	}
	return 0;
}
var SortingUtils = class {
	static compareValues(e, t, n) {
		if (e === null && t === null) return 0;
		if (e == null) return -1;
		if (t == null) return 1;
		if (typeof e == "number" && typeof t == "number") return e - t;
		if (e instanceof Date && t instanceof Date) return e.getTime() - t.getTime();
		let r = String(e), a = String(t);
		if (n?.naturalSort) try {
			return new Intl.Collator(n.locale, {
				numeric: !0,
				sensitivity: n.sensitivity || "base"
			}).compare(r, a);
		} catch {
			let e = n.sensitivity === "variant" || n.sensitivity === "case";
			return naturalCompare(r, a, e);
		}
		return n?.locale || n?.sensitivity ? r.localeCompare(a, n.locale, { sensitivity: n.sensitivity }) : r.localeCompare(a);
	}
	static applySortField(e, t, n) {
		if (!e.length) return e;
		let { field: r, direction: i, nullsFirst: a, customComparator: o } = t;
		return [...e].sort((e, t) => {
			let s = e[r], c = t[r];
			if (a !== void 0) {
				if (s == null && c == null) return 0;
				if (s == null) return a ? -1 : 1;
				if (c == null) return a ? 1 : -1;
			}
			let l;
			try {
				l = o ? o(s, c) : this.compareValues(s, c, n);
			} catch {
				l = this.compareValues(s, c, n);
			}
			return i === "desc" ? -l : l;
		});
	}
	static applyMultiSort(e, t, n) {
		if (!e.length || t.length === 0) return e;
		let r = this.validateSortFields(t);
		if (r.length === 0) return e;
		let i = [...r].sort((e, t) => e.priority - t.priority);
		return [...e].sort((e, t) => {
			for (let r of i) {
				let { field: i, direction: a, nullsFirst: o, customComparator: s } = r, c = e[i], l = t[i], u = {
					...n,
					...r.naturalSort !== void 0 && { naturalSort: r.naturalSort },
					...r.sensitivity !== void 0 && { sensitivity: r.sensitivity },
					...r.locale !== void 0 && { locale: r.locale }
				};
				if (o !== void 0) {
					if (c == null && l == null) continue;
					if (c == null) return o ? -1 : 1;
					if (l == null) return o ? 1 : -1;
				}
				let d;
				try {
					d = s ? s(c, l) : this.compareValues(c, l, u);
				} catch {
					d = this.compareValues(c, l, u);
				}
				if (d !== 0) return a === "desc" ? -d : d;
			}
			return 0;
		});
	}
	static normalizeToMultiSort(e) {
		return e ? isSingleSortConfig(e) ? { fields: [{
			field: e.field,
			direction: e.direction,
			priority: 0
		}] } : isMultiSortConfig(e) ? {
			...e,
			fields: this.validateSortFields(e.fields)
		} : null : null;
	}
	static validateSortFields(e) {
		return Array.isArray(e) ? e.filter((e) => e && typeof e == "object" && typeof e.field == "string" && e.field.trim() !== "" && ["asc", "desc"].includes(e.direction)).map((e, t) => ({
			...e,
			priority: typeof e.priority == "number" ? e.priority : t
		})).sort((e, t) => e.priority - t.priority) : [];
	}
	static normalizeSortPriorities(e) {
		return this.validateSortFields(e).map((e, t) => ({
			...e,
			priority: t
		}));
	}
	static areSortConfigsEqual(e, t) {
		if (e === t) return !0;
		if (!e || !t) return !1;
		let n = this.normalizeToMultiSort(e), r = this.normalizeToMultiSort(t);
		return !n || !r || n.fields.length !== r.fields.length ? !1 : n.fields.every((e, t) => {
			let n = r.fields[t];
			return n && e.field === n.field && e.direction === n.direction && e.priority === n.priority && e.nullsFirst === n.nullsFirst;
		});
	}
}, TypedEventEmitter = class {
	api;
	constructor(e) {
		this.api = e;
	}
	emit(e, t) {
		this.api.emit && this.api.emit(e, t);
	}
	on(e, t) {
		if (this.api.on) return this.api.on(e, t);
	}
	off(e, t) {
		this.api.off && this.api.off(e, t);
	}
}, PluginEventUtils = class {
	emitter;
	constructor(e) {
		this.emitter = new TypedEventEmitter(e);
	}
	emitMultiSortChange(e) {
		this.emitter.emit("multi-sort-change", e);
	}
	emitSortFieldAdded(e) {
		this.emitter.emit("sort-field-added", e);
	}
	emitSortFieldRemoved(e) {
		this.emitter.emit("sort-field-removed", e);
	}
	emitSortPriorityChanged(e) {
		this.emitter.emit("sort-priority-changed", e);
	}
	emitSelectionModeChange(e) {
		this.emitter.emit("selection-mode-change", e);
	}
	emitRangeSelect(e) {
		this.emitter.emit("range-select", e);
	}
	emitSelectAll(e) {
		this.emitter.emit("select-all", e);
	}
	emitSelectionClear(e) {
		this.emitter.emit("selection-clear", e);
	}
	emitDataProcessed(e) {
		this.emitter.emit("data-processed", e);
	}
	emitDataPipelineComplete(e) {
		this.emitter.emit("data-pipeline-complete", e);
	}
	emitDataPipelineError(e) {
		this.emitter.emit("data-pipeline-error", e);
	}
	emitCellFocusChange(e) {
		this.emitter.emit("cell-focus-change", e);
	}
	emitCellEditStart(e) {
		this.emitter.emit("cell-edit-start", e);
	}
	emitCellEditComplete(e) {
		this.emitter.emit("cell-edit-complete", e);
	}
	emitCellEditCancel(e) {
		this.emitter.emit("cell-edit-cancel", e);
	}
	emitPluginLoaded(e) {
		this.emitter.emit("plugin-loaded", e);
	}
	emitPluginUnloaded(e) {
		this.emitter.emit("plugin-unloaded", e);
	}
	emitPluginError(e) {
		this.emitter.emit("plugin-error", e);
	}
	emit(e, t) {
		this.emitter.emit(e, t);
	}
	on(e, t) {
		return this.emitter.on(e, t);
	}
	off(e, t) {
		this.emitter.off(e, t);
	}
};
function createTypedEventUtils(e) {
	return new PluginEventUtils(e);
}
function hasEventCapabilities(e) {
	return typeof e.emit == "function";
}
function getColumnSortOptions(e) {
	return !e || !e.sortable ? null : e.sortable === !0 ? {} : typeof e.sortable == "object" ? e.sortable : null;
}
function mergeSortOptions(e, t) {
	return t ? {
		...e,
		...t
	} : e;
}
function createSortingPlugin(t = {}) {
	let n = createLogger({
		module: "Plugin",
		operation: "SortingPlugin"
	}), r = {
		enableMultiSort: t.enableMultiSort ?? !0,
		maxSortFields: Math.max(1, Math.min(t.maxSortFields ?? 5, 10))
	};
	n.debug("Creating sorting plugin", {
		config: r,
		options: t
	});
	let i = null, o = {}, s = null, f = null, p = null, m = null, h = [], g = null, _ = [], v = "", y = "", b = (e, t) => {
		let n = null;
		return ((...r) => {
			n && clearTimeout(n), n = setTimeout(() => e(...r), t);
		});
	}, x = (e, t) => typeof e[t] == "function", S = (e, t) => {
		let o = SortingUtils.normalizeToMultiSort(t);
		if (n.debug("setSortConfig called", {
			originalConfig: t,
			normalizedConfig: o,
			currentSortConfig: i,
			enableMultiSort: r.enableMultiSort
		}), !r.enableMultiSort && o?.fields && o.fields.length > 1 && (n.warn("Multi-sort disabled, using only first sort field"), o.fields = o.fields.slice(0, 1)), !SortingUtils.areSortConfigsEqual(i, o)) {
			n.info("Sort config changed, updating state and triggering data processing"), i = o, _ = [], v = "", y = "", s && (s.enabled = o !== null);
			try {
				x(e, "updateConfig") && e.updateConfig({ sort: t }), g && hasEventCapabilities(e) && o && (g.emitMultiSortChange(o), n.debug("Emitted multi-sort-change event", { config: o }));
			} catch (e) {
				n.warn("Failed to update API state:", e);
			}
			f && f();
		}
	}, C = () => i || null, w = (e, t, r) => {
		if (!t || typeof t != "string") {
			n.warn("Invalid field provided to sortByColumn");
			return;
		}
		if (!r) {
			let a = i?.fields.find((e) => e.field === t);
			if (!a) r = "asc";
			else if (a.direction === "asc") r = "desc";
			else {
				n.debug("Clearing sort for field", { field: t }), i && i.fields.length === 1 ? S(e, null) : E(e, t);
				return;
			}
		}
		S(e, { fields: [{
			field: t,
			direction: r,
			priority: 0
		}] });
	}, T = (e, t, o) => {
		if (!t || typeof t != "string") {
			n.warn("Invalid field provided to addSortField");
			return;
		}
		let s = [...i?.fields || []], c = r.maxSortFields;
		n.debug("addSortField called", {
			field: t,
			direction: o,
			currentFields: s,
			maxFields: c
		});
		let l = s.findIndex((e) => e.field === t);
		if (l !== -1) {
			let r = s[l].direction;
			if (o) s[l] = {
				...s[l],
				direction: o
			}, n.debug("Updated existing field with explicit direction", {
				index: l,
				direction: o
			});
			else if (r === "asc") s[l] = {
				...s[l],
				direction: "desc"
			}, n.debug("Updated existing field to desc", {
				index: l,
				from: r
			});
			else {
				if (s.splice(l, 1), n.debug("Removed field from multi-sort", {
					field: t,
					remainingFields: s.length
				}), s.length === 0) {
					S(e, null), g && g.emitSortFieldRemoved({
						field: t,
						sortConfig: { fields: [] }
					});
					return;
				}
				let r = { fields: SortingUtils.normalizeSortPriorities(s) };
				S(e, r), g && g.emitSortFieldRemoved({
					field: t,
					sortConfig: r
				});
				return;
			}
		} else if (s.length < c) {
			let e = o || "asc";
			s.push({
				field: t,
				direction: e,
				priority: s.length
			}), n.debug("Added new field", {
				totalFields: s.length,
				direction: e
			});
		} else {
			n.warn(`Maximum sort fields (${c}) reached`);
			return;
		}
		let u = { fields: SortingUtils.normalizeSortPriorities(s) };
		n.debug("addSortField: About to call setSortConfig", { newConfig: u }), S(e, u), g && g.emitSortFieldAdded({
			field: {
				field: t,
				direction: o || "asc",
				priority: 0
			},
			sortConfig: u
		});
	}, E = (e, t) => {
		if (!i || !t) return;
		let n = i.fields.filter((e) => e.field !== t);
		if (n.length === 0) S(e, null);
		else {
			let r = { fields: SortingUtils.normalizeSortPriorities(n) };
			S(e, r), g && g.emitSortFieldRemoved({
				field: t,
				sortConfig: r
			});
		}
	}, D = (e, t, n) => {
		if (!i || !t || typeof n != "number") return;
		let r = [...i.fields], o = r.findIndex((e) => e.field === t);
		if (o === -1) return;
		let s = r.length - 1, c = Math.max(0, Math.min(n, s));
		r[o] = {
			...r[o],
			priority: c
		};
		let l = { fields: SortingUtils.normalizeSortPriorities(r) };
		S(e, l), g && g.emitSortPriorityChanged({
			field: t,
			oldPriority: i.fields[o]?.priority || 0,
			newPriority: c
		});
	};
	return {
		name: "sorting",
		version: "2.1.0",
		dependencies: ["data-pipeline"],
		install(e, t) {
			if (p = t("data-pipeline"), !p) {
				n.warn("data-pipeline capability not available");
				return;
			}
			g = createTypedEventUtils(e), f = b(() => {
				g && g.emit("data-refresh-requested", { source: "sorting" });
			}, 16), s = {
				name: "sorting",
				type: "sort",
				priority: 100,
				enabled: !0,
				transform: (e) => {
					let t = JSON.stringify(e.length > 0 ? [e[0], e.length] : []), r = JSON.stringify(i);
					if (n.debug("Sorting interceptor transform called", {
						dataLength: e.length,
						currentSortConfig: i,
						fieldsCount: i?.fields?.length || 0
					}), !i || !e.length || i.fields.length === 0) return n.debug("No sorting config or empty data, returning original data"), e;
					try {
						let s = i.fields.map((e) => {
							let t = h.find((t) => t.field === e.field), n = getColumnSortOptions(t), r = mergeSortOptions(o, n);
							return {
								field: e.field,
								direction: e.direction,
								priority: e.priority,
								...r,
								...e.naturalSort !== void 0 && { naturalSort: e.naturalSort },
								...e.sensitivity !== void 0 && { sensitivity: e.sensitivity },
								...e.locale !== void 0 && { locale: e.locale },
								...e.nullsFirst !== void 0 && { nullsFirst: e.nullsFirst },
								...e.customComparator !== void 0 && { customComparator: e.customComparator }
							};
						}), c = JSON.stringify(s.map((e) => ({
							field: e.field,
							direction: e.direction,
							priority: e.priority,
							naturalSort: e.naturalSort ?? !1,
							sensitivity: e.sensitivity ?? void 0,
							locale: e.locale ?? void 0,
							nullsFirst: e.nullsFirst ?? void 0
						}))), l = `${r}|${c}`;
						if (t === y && l === v && _.length > 0) return n.debug("Sorting interceptor: Using cached result (no changes detected)"), _;
						let f = SortingUtils.applyMultiSort(e, s, o);
						return _ = f, y = t, v = l, n.debug("Data sorted successfully", {
							originalLength: e.length,
							sortedLength: f.length,
							sortFields: s
						}), f;
					} catch (t) {
						return n.error("Error during sorting:", t), e;
					}
				},
				metadata: {
					description: r.enableMultiSort ? "Multi-field sorting" : "Single-field sorting",
					version: "2.1.0",
					supportedFeatures: ["single-field", ...r.enableMultiSort ? ["multi-field"] : []]
				}
			}, p.registerDataInterceptor("sort", s);
			let l = e;
			if (l.setSortConfig = (t) => S(e, t), l.getSortConfig = () => C(), l.sortByColumn = (t, n) => w(e, t, n), l.clearSort = () => S(e, null), r.enableMultiSort ? (n.debug("Installing multi-sort methods", { config: r }), l.getMultiSortConfig = () => i, l.addSortField = (t, r) => (n.debug("addSortField API called", {
				field: t,
				direction: r
			}), T(e, t, r)), l.removeSortField = (t) => E(e, t), l.changeSortPriority = (t, n) => D(e, t, n)) : n.debug("Multi-sort disabled", { config: r }), l.setSortOptions = (e) => {
				e && typeof e == "object" && (o = {
					...o,
					...e
				}, i && f && f());
			}, l.getSortOptions = () => o, l.exportSortState = () => ({
				sortConfig: i,
				globalOptions: o,
				version: "2.1.0"
			}), l.importSortState = (t) => {
				t?.sortConfig && S(e, t.sortConfig), t?.globalOptions && (o = t.globalOptions);
			}, l._sortingPluginCleanup = () => {
				p && s && p.removeDataInterceptor("sort", "sorting"), m && m(), i = null, o = {}, f = null, s = null;
			}, g && e.on) {
				let t = e.on("columns-changed", (e) => {
					h = e, n.debug("Columns updated", { columnCount: e.length }), _ = [], y = "", v = "", i && f && f();
				}), r = e.on("config-changed", (e) => {
					e.sortOptions && (n.debug("Config changed, updating global sort options", { sortOptions: e.sortOptions }), o = {
						...o,
						...e.sortOptions
					}, _ = [], y = "", v = "", i && f && f());
				});
				m = () => {
					t(), r();
				};
			}
			let x = e.getState();
			x?.columns && (h = x.columns), x?.config?.sortOptions && (n.debug("Initializing global sort options from config", { sortOptions: x.config.sortOptions }), o = { ...x.config.sortOptions });
			let O = s.metadata?.supportedFeatures?.join(", ") || "single-field";
			n.info(`Sorting functionality installed with features: ${O}`);
		},
		cleanup() {
			m &&= (m(), null), i = null, o = {}, f = null, s = null, n.info("Cleaned up");
		}
	};
}
const sortingPlugin = createSortingPlugin();
createSortingPlugin({ enableMultiSort: !1 });
const enhancedSortingPlugin = createSortingPlugin({ enableMultiSort: !0 });
export { enhancedSortingPlugin as n, sortingPlugin as r, createSortingPlugin as t };

//# sourceMappingURL=sorting-plugin-DiKduNRw.js.map