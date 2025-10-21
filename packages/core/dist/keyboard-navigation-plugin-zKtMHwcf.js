import { n as createLogger } from "./logger-CjSoYuMW.js";
var logger = createLogger({
	module: "Plugin",
	operation: "KeyboardNavigation"
});
const keyboardNavigationPlugin = {
	name: "core-keyboard-navigation",
	version: "1.0.0",
	dependencies: [],
	install(e, n) {
		let r = {
			activeCell: null,
			focusVisible: !1,
			navigationMode: "cell",
			focusStack: [],
			lastDirection: null
		}, i = {
			enableNavigation: !0,
			enableEditing: !0,
			enableSelection: !0,
			enableShortcuts: !0,
			customKeyBindings: /* @__PURE__ */ new Map(),
			navigationBehavior: "wrap",
			pageSize: 10
		}, a = {
			rowCount: 0,
			columnCount: 0,
			visibleRowStart: 0,
			visibleRowEnd: 0,
			visibleColumnStart: 0,
			visibleColumnEnd: 0
		}, o = null, s = null, c = /* @__PURE__ */ new Map();
		u();
		let l = e;
		l.setKeyboardConfig = (t) => {
			Object.assign(i, t), e.emit("keyboard-config-change", i);
		}, l.getKeyboardConfig = () => ({ ...i }), l.registerKeyBinding = (t) => {
			let n = d(t.key, t.modifiers);
			i.customKeyBindings.set(n, t), e.emit("key-binding-registered", {
				key: n,
				binding: t
			});
		}, l.unregisterKeyBinding = (t, n) => {
			let r = d(t, n), a = i.customKeyBindings.delete(r);
			return a && e.emit("key-binding-unregistered", { key: r }), a;
		}, l.getKeyBindings = () => new Map(i.customKeyBindings), l.setActiveCell = (n, i = {}) => {
			let { ensureVisible: a = !0, reason: o = "programmatic", updateDOM: s = !0 } = i;
			return n && !S(n) ? (logger.warn("Invalid cell position:", { module: "KeyboardNavigation" }, n), !1) : (r.activeCell && n && (r.focusStack.push(r.activeCell), r.focusStack.length > 10 && r.focusStack.shift()), r.activeCell = n, r.focusVisible = !0, s && w(n), n && a && E(n), e.__internal?.setFocusedCell && e.__internal.setFocusedCell(n), e.emit("cell-focus-change", {
				rowId: n ? n.rowId : null,
				columnId: n ? n.columnId : null
			}), !0);
		}, l.getActiveCell = () => r.activeCell, l.getFocusState = () => ({ ...r }), l.moveFocus = (e, t = {}) => {
			if (!r.activeCell) {
				let e = x();
				e && l.setActiveCell(e, { reason: "navigation" });
				return;
			}
			let n = y(r.activeCell, e, t);
			n && (r.lastDirection = e, l.setActiveCell(n, { reason: "navigation" }), t.extend && l.isRowSelected && l.selectRange && k(r.activeCell, n));
		}, l.focusPreviousCell = () => {
			if (r.focusStack.length > 0) {
				let e = r.focusStack.pop();
				e && l.setActiveCell(e, { reason: "navigation" });
			}
		}, l.handleKeyboardEvent = (e) => {
			if (!i.enableNavigation || A(e.target) && !j(e.target)) return !1;
			let t = d(e.key, {
				ctrl: e.ctrlKey,
				shift: e.shiftKey,
				alt: e.altKey,
				meta: e.metaKey
			}), n = i.customKeyBindings.get(t);
			return n && f(n) ? p(n, e) : v(e);
		}, l.initializeKeyboardHandling = (e) => {
			o = e, D(e);
			let t = (e) => {
				l.handleKeyboardEvent(e) && (e.preventDefault(), e.stopPropagation());
			};
			e.addEventListener("keydown", t), M("keydown", () => {
				e.removeEventListener("keydown", t);
			}), C();
			let n = x();
			n && l.setActiveCell(n, { reason: "programmatic" });
		}, l.enterEditMode = () => !i.enableEditing || !r.activeCell ? !1 : l.startCellEdit ? l.startCellEdit(r.activeCell.rowId, r.activeCell.columnId) : (e.emit("cell-edit-start", {
			rowId: r.activeCell.rowId,
			columnId: r.activeCell.columnId,
			value: null
		}), !0), l.exitEditMode = (t = !0) => t && l.commitCellEdit ? l.commitCellEdit() : !t && l.cancelCellEdit ? (l.cancelCellEdit(), !0) : (r.activeCell && e.emit("cell-edit-cancel", {
			rowId: r.activeCell.rowId,
			columnId: r.activeCell.columnId,
			value: null
		}), !0), l.toggleCellSelection = () => !i.enableSelection || !r.activeCell ? !1 : l.toggleRowSelection ? (l.toggleRowSelection(r.activeCell.rowId), !0) : (e.emit("row-select", {
			rowId: r.activeCell.rowId,
			selected: !0,
			selectedRows: []
		}), !0);
		function u() {
			[
				{
					key: "ArrowUp",
					action: {
						type: "navigation",
						command: "moveUp"
					}
				},
				{
					key: "ArrowDown",
					action: {
						type: "navigation",
						command: "moveDown"
					}
				},
				{
					key: "ArrowLeft",
					action: {
						type: "navigation",
						command: "moveLeft"
					}
				},
				{
					key: "ArrowRight",
					action: {
						type: "navigation",
						command: "moveRight"
					}
				},
				{
					key: "Home",
					action: {
						type: "navigation",
						command: "moveHome"
					}
				},
				{
					key: "End",
					action: {
						type: "navigation",
						command: "moveEnd"
					}
				},
				{
					key: "PageUp",
					action: {
						type: "navigation",
						command: "pageUp"
					}
				},
				{
					key: "PageDown",
					action: {
						type: "navigation",
						command: "pageDown"
					}
				},
				{
					key: "Home",
					modifiers: { ctrl: !0 },
					action: {
						type: "navigation",
						command: "moveFirstCell"
					}
				},
				{
					key: "End",
					modifiers: { ctrl: !0 },
					action: {
						type: "navigation",
						command: "moveLastCell"
					}
				},
				{
					key: "ArrowUp",
					modifiers: { ctrl: !0 },
					action: {
						type: "navigation",
						command: "moveFirstRow"
					}
				},
				{
					key: "ArrowDown",
					modifiers: { ctrl: !0 },
					action: {
						type: "navigation",
						command: "moveLastRow"
					}
				},
				{
					key: "ArrowUp",
					modifiers: { shift: !0 },
					action: {
						type: "selection",
						command: "extendUp"
					}
				},
				{
					key: "ArrowDown",
					modifiers: { shift: !0 },
					action: {
						type: "selection",
						command: "extendDown"
					}
				},
				{
					key: "ArrowLeft",
					modifiers: { shift: !0 },
					action: {
						type: "selection",
						command: "extendLeft"
					}
				},
				{
					key: "ArrowRight",
					modifiers: { shift: !0 },
					action: {
						type: "selection",
						command: "extendRight"
					}
				},
				{
					key: "Enter",
					action: {
						type: "editing",
						command: "startEdit"
					},
					context: "navigation"
				},
				{
					key: "F2",
					action: {
						type: "editing",
						command: "startEdit"
					},
					context: "navigation"
				},
				{
					key: "Escape",
					action: {
						type: "editing",
						command: "cancelEdit"
					},
					context: "editing"
				},
				{
					key: "Enter",
					action: {
						type: "editing",
						command: "commitEdit"
					},
					context: "editing"
				},
				{
					key: "Tab",
					action: {
						type: "editing",
						command: "commitAndMoveNext"
					},
					context: "editing"
				},
				{
					key: "Tab",
					modifiers: { shift: !0 },
					action: {
						type: "editing",
						command: "commitAndMovePrev"
					},
					context: "editing"
				},
				{
					key: " ",
					action: {
						type: "selection",
						command: "toggle"
					}
				},
				{
					key: "a",
					modifiers: { ctrl: !0 },
					action: {
						type: "selection",
						command: "selectAll"
					}
				},
				{
					key: "Tab",
					action: {
						type: "navigation",
						command: "moveNext"
					},
					context: "navigation"
				},
				{
					key: "Tab",
					modifiers: { shift: !0 },
					action: {
						type: "navigation",
						command: "movePrev"
					},
					context: "navigation"
				}
			].forEach((e) => {
				let t = d(e.key, e.modifiers);
				i.customKeyBindings.set(t, e);
			});
		}
		function d(e, t) {
			let n = [];
			return t?.ctrl && n.push("Ctrl"), t?.shift && n.push("Shift"), t?.alt && n.push("Alt"), t?.meta && n.push("Meta"), n.push(e), n.join("+");
		}
		function f(e) {
			if (!e.context) return !0;
			let t = l.isEditingCell && l.isEditingCell();
			switch (e.context) {
				case "always": return !0;
				case "editing": return t;
				case "navigation": return !t;
				default: return !0;
			}
		}
		function p(e, n) {
			let { action: r } = e;
			try {
				switch (r.type) {
					case "navigation": return m(r.command, r.parameters);
					case "editing": return h(r.command, r.parameters);
					case "selection": return g(r.command, r.parameters);
					case "custom": return _(r.command, r.parameters, n);
					default: return logger.warn("Unknown action type:", {
						module: "KeyboardNavigation",
						action: r.type
					}), !1;
				}
			} catch (e) {
				return logger.error("Error executing key binding:", { module: "KeyboardNavigation" }, e), !1;
			}
		}
		function m(e, n) {
			switch (e) {
				case "moveUp": return l.moveFocus("up", n), !0;
				case "moveDown": return l.moveFocus("down", n), !0;
				case "moveLeft": return l.moveFocus("left", n), !0;
				case "moveRight": return l.moveFocus("right", n), !0;
				case "moveHome": return l.moveFocus("home", n), !0;
				case "moveEnd": return l.moveFocus("end", n), !0;
				case "pageUp": return l.moveFocus("pageUp", n), !0;
				case "pageDown": return l.moveFocus("pageDown", n), !0;
				case "moveFirstCell": return l.moveFocus("firstRow", n), !0;
				case "moveLastCell": return l.moveFocus("lastRow", n), !0;
				case "moveFirstRow": return l.moveFocus("firstRow", n), !0;
				case "moveLastRow": return l.moveFocus("lastRow", n), !0;
				case "moveNext": return O(1);
				case "movePrev": return O(-1);
				default: return logger.warn("Unknown navigation command:", {
					module: "KeyboardNavigation",
					command: e
				}), !1;
			}
		}
		function h(e, n) {
			switch (e) {
				case "startEdit": return l.enterEditMode();
				case "commitEdit": return l.exitEditMode(!0);
				case "cancelEdit": return l.exitEditMode(!1);
				case "commitAndMoveNext": return l.exitEditMode(!0) ? O(1) : !1;
				case "commitAndMovePrev": return l.exitEditMode(!0) ? O(-1) : !1;
				default: return logger.warn("Unknown editing command:", {
					module: "KeyboardNavigation",
					command: e
				}), !1;
			}
		}
		function g(e, n) {
			switch (e) {
				case "toggle": return l.toggleCellSelection();
				case "selectAll": return l.selectAll ? (l.selectAll(), !0) : !1;
				case "extendUp": return l.moveFocus("up", {
					extend: !0,
					...n
				}), !0;
				case "extendDown": return l.moveFocus("down", {
					extend: !0,
					...n
				}), !0;
				case "extendLeft": return l.moveFocus("left", {
					extend: !0,
					...n
				}), !0;
				case "extendRight": return l.moveFocus("right", {
					extend: !0,
					...n
				}), !0;
				default: return logger.warn("Unknown selection command:", {
					module: "KeyboardNavigation",
					command: e
				}), !1;
			}
		}
		function _(t, n, i) {
			return e.emit("keyboard-custom-action", {
				action: t,
				context: {
					parameters: n,
					event: i,
					activeCell: r.activeCell
				}
			}), !0;
		}
		function v(e) {
			return !1;
		}
		function y(e, t, n = {}) {
			let { wrap: r = i.navigationBehavior === "wrap", pageSize: o = i.pageSize } = n;
			C();
			let s = e.rowIndex, c = e.columnIndex;
			switch (t) {
				case "up":
					s = Math.max(0, e.rowIndex - 1), r && s === e.rowIndex && e.rowIndex === 0 && (s = a.rowCount - 1);
					break;
				case "down":
					s = Math.min(a.rowCount - 1, e.rowIndex + 1), r && s === e.rowIndex && e.rowIndex === a.rowCount - 1 && (s = 0);
					break;
				case "left":
					c = Math.max(0, e.columnIndex - 1), r && c === e.columnIndex && e.columnIndex === 0 && (c = a.columnCount - 1);
					break;
				case "right":
					c = Math.min(a.columnCount - 1, e.columnIndex + 1), r && c === e.columnIndex && e.columnIndex === a.columnCount - 1 && (c = 0);
					break;
				case "home":
					c = 0;
					break;
				case "end":
					c = a.columnCount - 1;
					break;
				case "pageUp":
					s = Math.max(0, e.rowIndex - o);
					break;
				case "pageDown":
					s = Math.min(a.rowCount - 1, e.rowIndex + o);
					break;
				case "firstRow":
					s = 0, c = 0;
					break;
				case "lastRow":
					s = a.rowCount - 1, c = a.columnCount - 1;
					break;
				case "firstColumn":
					c = 0;
					break;
				case "lastColumn":
					c = a.columnCount - 1;
					break;
				default: return null;
			}
			return s === e.rowIndex && c === e.columnIndex && !r ? null : b(s, c);
		}
		function b(t, n) {
			let r = e.getData(), i = e.getState().columns;
			if (t < 0 || t >= r.length || n < 0 || n >= i.length) return null;
			let a = r[t], o = i[n];
			return !a || !o ? null : {
				rowIndex: t,
				columnIndex: n,
				rowId: a.id || t,
				columnId: o.id
			};
		}
		function x() {
			return b(0, 0);
		}
		function S(t) {
			let n = e.getData(), r = e.getState().columns;
			return t.rowIndex >= 0 && t.rowIndex < n.length && t.columnIndex >= 0 && t.columnIndex < r.length;
		}
		function C() {
			let t = e.getData(), n = e.getState().columns;
			a = {
				rowCount: t.length,
				columnCount: n.length,
				visibleRowStart: 0,
				visibleRowEnd: t.length - 1,
				visibleColumnStart: 0,
				visibleColumnEnd: n.length - 1
			};
		}
		function w(e) {
			if (s && (s.classList.remove("grid-cell-focused"), s.removeAttribute("tabindex"), s.setAttribute("aria-selected", "false")), !e || !o) {
				s = null;
				return;
			}
			let t = `[data-row-id="${e.rowId}"][data-column-id="${e.columnId}"]`, n = o.querySelector(t);
			n && (n.classList.add("grid-cell-focused"), n.setAttribute("tabindex", "0"), n.setAttribute("aria-selected", "true"), T(n, e), s = n, n.focus({ preventScroll: !0 }));
		}
		function T(e, t) {
			e.setAttribute("role", "gridcell"), e.setAttribute("aria-rowindex", String(t.rowIndex + 1)), e.setAttribute("aria-colindex", String(t.columnIndex + 1)), o && (o.setAttribute("aria-activedescendant", e.id || `cell-${t.rowId}-${t.columnId}`), o.setAttribute("aria-rowcount", String(a.rowCount)), o.setAttribute("aria-colcount", String(a.columnCount)));
		}
		function E(e) {
			if (!o || !l.__internal?.updateScrollPosition) return;
			let t = o.querySelector(`[data-row-id="${e.rowId}"][data-column-id="${e.columnId}"]`);
			t && t.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest"
			});
		}
		function D(e) {
			e.setAttribute("role", "grid"), e.setAttribute("tabindex", "0"), e.setAttribute("aria-label", "Data grid with keyboard navigation"), e.setAttribute("aria-multiselectable", "true"), e.classList.add("keyboard-navigation-enabled");
		}
		function O(t) {
			if (!r.activeCell) return !1;
			let n = e.getState().columns, i = r.activeCell.rowIndex, a = r.activeCell.columnIndex;
			t === 1 ? (a++, a >= n.length && (a = 0, i++)) : (a--, a < 0 && (a = n.length - 1, i--));
			let o = b(i, a);
			return o ? (l.setActiveCell(o, { reason: "navigation" }), !0) : !1;
		}
		function k(e, t) {
			l.selectRange && l.selectRange(e.rowId, t.rowId);
		}
		function A(e) {
			let t = e.tagName.toLowerCase();
			return t === "input" || t === "textarea" || t === "select";
		}
		function j(e) {
			return e.classList.contains("grid-cell-editor") || e.closest(".grid-cell-editor") !== null;
		}
		function M(e, t) {
			c.has(e) || c.set(e, []), c.get(e).push(t);
		}
		l.on && (l.on("cell-click", (e) => {
			e.position && l.setActiveCell(e.position, { reason: "user" });
		}), l.on("cell-focus", (e) => {
			e.position && l.setActiveCell(e.position, { reason: "user" });
		}), l.on("data-changed", () => {
			if (C(), r.activeCell && !S(r.activeCell)) {
				let e = x();
				e && l.setActiveCell(e, { reason: "programmatic" });
			}
		}), l.on("columns-changed", () => {
			C();
		})), logger.info("Comprehensive keyboard navigation installed");
	},
	cleanup() {
		createLogger({
			module: "Plugin",
			operation: "KeyboardNavigation"
		}).info("Cleaned up");
	}
};
export { keyboardNavigationPlugin as t };

//# sourceMappingURL=keyboard-navigation-plugin-zKtMHwcf.js.map