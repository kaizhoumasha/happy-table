import { n as createLogger } from "./logger-CjSoYuMW.js";
var logger = createLogger("drag-drop-plugin");
function reorderByIds(e, t, n) {
	let r = e.findIndex((e) => e?.id === t), i = e.findIndex((e) => e?.id === n);
	if (r === -1 || i === -1) return e;
	let a = e.slice(), o = a.splice(r, 1)[0];
	if (!o) return e;
	let s = r < i ? i - 1 : i;
	return a.splice(s, 0, o), a;
}
function reorderByIndex(e, t, n) {
	if (t === n) return e;
	let r = t < n ? n - 1 : n;
	if (r === t) return e;
	let i = e.slice(), [a] = i.splice(t, 1);
	return a && i.splice(r, 0, a), i;
}
const dragDropPlugin = {
	name: "drag-drop",
	version: "1.0.0",
	install(e, i) {
		let a = [], o = null, s = () => {
			if (!o) {
				let t = e.getState().columns.find((e) => e.type === "drag");
				o = {
					options: t?.functionalOptions,
					onDragEnd: t?.functionalOptions?.onDragEnd
				};
			}
			return o;
		}, c = e.on?.("columns-changed", () => {
			o = null;
		});
		c && a.push(c);
		let l = e.on?.("row-drag-start", (e) => {
			logger.debug("row-drag-start", e);
		});
		l && a.push(l);
		let u = e.on?.("row-drag-end", (t) => {
			let { result: i, sourceId: a, targetId: o } = t || {};
			if (!i) return;
			let c = e.getData();
			if (!Array.isArray(c) || c.length === 0) return;
			let l;
			if (typeof i.sourceIndex == "number" && typeof i.destinationIndex == "number") l = reorderByIndex(c, i.sourceIndex, i.destinationIndex);
			else if (a != null && o != null) l = reorderByIds(c, a, o);
			else return;
			l !== c && (e.setData(l), s().onDragEnd?.(i));
		});
		u && a.push(u), this.cleanup = async () => {
			o = null, a.forEach((e) => {
				try {
					e();
				} catch (e) {
					logger.warn("Failed to cleanup event listener:", e);
				}
			});
		};
	}
};
export { dragDropPlugin as t };

//# sourceMappingURL=drag-drop-plugin-B91YM0sd.js.map