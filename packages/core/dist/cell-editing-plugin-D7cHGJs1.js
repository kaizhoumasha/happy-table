import { n as createLogger } from "./logger-CjSoYuMW.js";
var logger = createLogger({
	module: "Plugin",
	operation: "CellEditing"
});
const cellEditingPlugin = {
	name: "core-cell-editing",
	version: "1.0.0",
	dependencies: [],
	install(e, n) {
		let r = {
			activeCell: null,
			editMode: !1,
			editValue: null,
			originalValue: null,
			validators: /* @__PURE__ */ new Map(),
			editors: /* @__PURE__ */ new Map(),
			errorState: null
		};
		a();
		let i = e;
		i.registerCellEditor = (e, n) => {
			r.editors.set(e, n), logger.info(`Registered editor: ${e}`);
		}, i.unregisterCellEditor = (e) => {
			r.editors.delete(e), logger.info(`Unregistered editor: ${e}`);
		}, i.getCellEditor = (e) => r.editors.get(e), i.listCellEditors = () => Array.from(r.editors.keys()), i.registerCellValidator = (e, t) => {
			r.validators.set(e, t);
		}, i.unregisterCellValidator = (e) => {
			r.validators.delete(e);
		}, i.startCellEdit = (n, a) => {
			let o = e.getData(), s = e.getState().columns, c = o.find((e) => (e.id || e.index) === n), l = s.find((e) => e.id === a);
			if (!c || !l) return logger.warn(`Invalid cell position: ${n}, ${a}`), !1;
			if (l.editable === !1) return logger.warn(`Column ${a} is not editable`), !1;
			if (r.activeCell?.rowId === n && r.activeCell?.columnId === a && r.editMode) return !0;
			r.editMode && r.activeCell && i.cancelCellEdit?.();
			let u = c[l.field];
			return r.activeCell = {
				rowId: n,
				columnId: a
			}, r.editMode = !0, r.editValue = u, r.originalValue = u, r.errorState = null, e.emit("cell-edit-start", {
				rowId: n,
				columnId: a,
				value: u,
				row: c,
				column: l
			}), !0;
		}, i.commitCellEdit = async () => {
			if (!r.editMode || !r.activeCell) return !1;
			let { rowId: t, columnId: n } = r.activeCell, i = e.getData(), a = e.getState().columns, s = i.find((e) => (e.id || e.index) === t), c = a.find((e) => e.id === n);
			if (!s || !c) return !1;
			let l = await o(r.editValue, s, c);
			if (!l.valid) return r.errorState = {
				message: l.message || "Invalid value",
				columnId: n
			}, e.emit("cell-edit-error", {
				rowId: t,
				columnId: n,
				error: l.message || "Validation failed"
			}), !1;
			let u = r.originalValue, d = r.editValue;
			return s[c.field] = d, e.setData([...i]), r.activeCell = null, r.editMode = !1, r.editValue = null, r.originalValue = null, r.errorState = null, e.emit("cell-edit-complete", {
				rowId: t,
				columnId: n,
				oldValue: u,
				newValue: d
			}), !0;
		}, i.cancelCellEdit = () => {
			if (!r.editMode || !r.activeCell) return;
			let { rowId: t, columnId: n } = r.activeCell;
			e.emit("cell-edit-cancel", {
				rowId: t,
				columnId: n,
				value: r.originalValue
			}), r.activeCell = null, r.editMode = !1, r.editValue = null, r.originalValue = null, r.errorState = null;
		}, i.updateCellEditValue = (e) => {
			r.editMode && (r.editValue = e, r.errorState = null);
		}, i.isEditingCell = (e, t) => !r.editMode || !r.activeCell ? !1 : e !== void 0 && t !== void 0 ? r.activeCell.rowId === e && r.activeCell.columnId === t : !0, i.getEditingCell = () => r.editMode ? r.activeCell : null, i.getEditValue = () => r.editMode ? r.editValue : null, i.getCellEditError = () => r.errorState ? r.errorState.message : null, i.handleCellEditKeydown = (e) => {
			if (!r.editMode) return !1;
			switch (e.key) {
				case "Enter":
					if (!e.shiftKey) return e.preventDefault(), i.commitCellEdit?.(), !0;
					break;
				case "Escape": return e.preventDefault(), i.cancelCellEdit?.(), !0;
				case "Tab":
					if (e.preventDefault(), i.commitCellEdit?.()) {
						let t = e.shiftKey ? "prev" : "next";
						s(t);
					}
					return !0;
			}
			return !1;
		}, i.handleCellDoubleClick = (e, t) => i.startCellEdit?.(e, t) || !1;
		function a() {
			r.editors.set("text", { component: "CellTextEditor" }), r.editors.set("number", { component: "CellNumberEditor" }), r.editors.set("select", { component: "CellSelectEditor" }), r.editors.set("date", { component: "CellDateEditor" }), r.editors.set("boolean", { component: "CellBooleanEditor" });
		}
		async function o(e, t, n) {
			let i = r.validators.get(n.id);
			if (i) {
				let r = i(e, t, n);
				if (!r.valid) return r;
			}
			return n.required && (e === null || e === "") ? {
				valid: !1,
				message: `${n.title} is required`
			} : { valid: !0 };
		}
		function s(t) {
			if (!r.activeCell) return;
			let n = e.getData(), a = e.getState().columns.filter((e) => e.editable !== !1), o = n.findIndex((e) => (e.id || e.index) === r.activeCell.rowId), s = a.findIndex((e) => e.id === r.activeCell.columnId);
			if (o === -1 || s === -1) return;
			let c = o, l = s;
			t === "next" ? (l++, l >= a.length && (l = 0, c++, c >= n.length && (c = 0))) : (l--, l < 0 && (l = a.length - 1, c--, c < 0 && (c = n.length - 1)));
			let u = n[c], d = a[l];
			if (u && d) {
				let e = u.id || c;
				(typeof e == "string" || typeof e == "number") && i.startCellEdit?.(e, d.id);
			}
		}
		i.on && i.on("cell-double-click", (e) => {
			e.position && i.handleCellDoubleClick?.(e.position.rowId, e.position.columnId);
		}), logger.info("Cell editing functionality installed");
	},
	cleanup() {
		logger.info("Cell editing plugin cleaned up");
	}
};
export { cellEditingPlugin as t };

//# sourceMappingURL=cell-editing-plugin-D7cHGJs1.js.map