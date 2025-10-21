import { n as createLogger } from "./logger-CjSoYuMW.js";
const selectionPlugin = {
	name: "core-selection",
	version: "1.0.0",
	dependencies: [],
	install(t, n) {
		let r = createLogger({
			module: "Plugin",
			operation: "SelectionPlugin"
		}), i = {
			selectedRows: /* @__PURE__ */ new Set(),
			lastSelectedRow: null,
			selectionMode: "multi",
			persistSelection: !1
		}, a = t;
		a.setSelectionMode = (e) => {
			if (i.selectionMode = e, e === "single" && i.selectedRows.size > 1) {
				let e = Array.from(i.selectedRows)[0];
				i.selectedRows.clear(), e && i.selectedRows.add(e);
			}
			t.emit("selection-mode-change", { mode: e });
		}, a.getSelectionMode = () => i.selectionMode, a.selectRow = (e, n = !1) => {
			let { selectionMode: r } = i;
			(r === "single" || !n) && i.selectedRows.clear(), i.selectedRows.add(e), i.lastSelectedRow = e, t.emit("row-select", {
				rowId: e,
				selected: !0,
				selectedRows: Array.from(i.selectedRows)
			});
		}, a.deselectRow = (e) => {
			let n = i.selectedRows.has(e);
			i.selectedRows.delete(e), i.lastSelectedRow === e && (i.lastSelectedRow = null), n && t.emit("row-select", {
				rowId: e,
				selected: !1,
				selectedRows: Array.from(i.selectedRows)
			});
		}, a.toggleRowSelection = (e, t = !1) => {
			i.selectedRows.has(e) ? a.deselectRow(e) : a.selectRow(e, t);
		}, a.selectRange = (e, n) => {
			if (i.selectionMode === "single") {
				a.selectRow(n);
				return;
			}
			let r = t.getData(), o = r.findIndex((t) => (t.id || t.index) === e), s = r.findIndex((e) => (e.id || e.index) === n);
			if (o === -1 || s === -1) return;
			let [c, l] = [Math.min(o, s), Math.max(o, s)];
			i.selectionMode !== "range" && i.selectedRows.clear();
			for (let e = c; e <= l; e++) {
				let t = r[e];
				if (t) {
					let n = t.id || e;
					i.selectedRows.add(n);
				}
			}
			i.lastSelectedRow = n, t.emit("range-select", {
				start: c,
				end: l
			});
		}, a.selectAll = () => {
			if (i.selectionMode === "single") return;
			let e = t.getFilteredData();
			i.selectedRows.clear(), e.forEach((e) => {
				let t = e.id || e.index;
				t !== void 0 && (typeof t == "string" || typeof t == "number") && i.selectedRows.add(t);
			}), t.emit("select-all", { count: i.selectedRows.size });
		}, a.clearSelection = () => {
			let e = i.selectedRows.size > 0;
			i.selectedRows.clear(), i.lastSelectedRow = null, e && t.emit("selection-clear", { previousCount: i.selectedRows.size });
		}, a.getSelectedRows = () => Array.from(i.selectedRows), a.getSelectedRowData = () => {
			let e = t.getData(), n = Array.from(i.selectedRows);
			return e.filter((e) => {
				let t = e.id || e.index;
				return t !== void 0 && n.includes(t);
			});
		}, a.isRowSelected = (e) => i.selectedRows.has(e), a.getSelectionCount = () => i.selectedRows.size, a.selectByIndex = (e, n = !1) => {
			let r = t.getData();
			if (e >= 0 && e < r.length) {
				let t = r[e];
				if (t) {
					let r = t.id || e;
					a.selectRow(r, n);
				}
			}
		}, a.selectByCondition = (e) => {
			if (i.selectionMode === "single") return;
			let n = t.getFilteredData();
			i.selectedRows.clear(), n.forEach((t) => {
				if (e(t)) {
					let e = t.id || t.index;
					e !== void 0 && (typeof e == "string" || typeof e == "number") && i.selectedRows.add(e);
				}
			}), t.emit("conditional-select", {
				condition: "custom-predicate",
				count: i.selectedRows.size
			});
		}, a.setSelectionPersistence = (e) => {
			i.persistSelection = e;
		}, a.getSelectionPersistence = () => i.persistSelection, a.saveSelectionState = () => ({
			selectedRows: Array.from(i.selectedRows),
			lastSelectedRow: i.lastSelectedRow,
			selectionMode: i.selectionMode
		}), a.restoreSelectionState = (e) => {
			e.selectedRows && (i.selectedRows = new Set(e.selectedRows)), e.lastSelectedRow !== void 0 && (i.lastSelectedRow = e.lastSelectedRow), e.selectionMode && (i.selectionMode = e.selectionMode), t.emit("selection-restore", { count: i.selectedRows.size });
		}, a.handleSelectionInput = (e, t) => {
			let { shiftKey: n, ctrlKey: r, metaKey: o } = t, s = r || o;
			n && i.lastSelectedRow ? a.selectRange(i.lastSelectedRow, e) : s ? a.toggleRowSelection(e, !0) : a.selectRow(e, !1);
		}, t.emit("data-listener-add", "selection-data-change-handler"), r.info("Enhanced selection functionality installed");
	},
	cleanup() {
		createLogger({
			module: "Plugin",
			operation: "SelectionPlugin"
		}).info("Cleaned up");
	}
};
export { selectionPlugin as t };

//# sourceMappingURL=selection-plugin-CoUp6zlZ.js.map