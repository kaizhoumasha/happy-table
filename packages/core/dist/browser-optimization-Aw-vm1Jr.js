const BrowserFeatures = {
	get hasIntersectionObserver() {
		return "IntersectionObserver" in window;
	},
	get hasResizeObserver() {
		return "ResizeObserver" in window;
	},
	get hasPassiveEvents() {
		let e = !1;
		try {
			let i = Object.defineProperty({}, "passive", { get() {
				return e = !0, !1;
			} });
			window.addEventListener("test", () => {}, i), window.removeEventListener("test", () => {}, i);
		} catch {
			e = !1;
		}
		return e;
	},
	get hasWebWorkers() {
		return "Worker" in window;
	},
	get hasOffscreenCanvas() {
		return "OffscreenCanvas" in window;
	},
	get hasContainment() {
		return CSS.supports("contain", "layout style paint");
	},
	get hasTransforms() {
		return CSS.supports("transform", "translateZ(0)");
	},
	get browser() {
		let e = navigator.userAgent;
		return e.includes("Chrome") && !e.includes("Edge") ? "chrome" : e.includes("Firefox") ? "firefox" : e.includes("Safari") && !e.includes("Chrome") ? "safari" : e.includes("Edge") ? "edge" : "other";
	}
};
var HardwareAcceleration = class {
	acceleratedElements = /* @__PURE__ */ new WeakSet();
	enable(i, a = !1) {
		this.acceleratedElements.has(i) && !a || (i.style.transform = i.style.transform ? `${i.style.transform} translateZ(0)` : "translateZ(0)", i.style.willChange = "transform", i.style.backfaceVisibility = "hidden", BrowserFeatures.browser === "safari" && (i.style.webkitBackfaceVisibility = "hidden", i.style.webkitPerspective = "1000px"), this.acceleratedElements.add(i));
	}
	disable(i) {
		if (!this.acceleratedElements.has(i)) return;
		let a = i.style.transform;
		i.style.transform = a.replace(/translateZ\(0px?\)\s*/g, "").trim(), i.style.willChange = "auto", i.style.backfaceVisibility = "", BrowserFeatures.browser === "safari" && (i.style.webkitBackfaceVisibility = "", i.style.webkitPerspective = ""), this.acceleratedElements.delete(i);
	}
	isEnabled(e) {
		return this.acceleratedElements.has(e);
	}
}, CriticalRenderingOptimizer = class {
	styleSheets = /* @__PURE__ */ new Map();
	criticalCSS = /* @__PURE__ */ new Set();
	inlineCriticalCSS(e, i) {
		if (this.criticalCSS.has(i)) return;
		let a = document.createElement("style");
		a.setAttribute("data-critical", i), a.textContent = e, document.head.insertBefore(a, document.head.firstChild), this.criticalCSS.add(i);
	}
	loadNonCriticalCSS(e, i) {
		return new Promise((a, o) => {
			if (this.styleSheets.has(i)) {
				a();
				return;
			}
			let s = document.createElement("link");
			s.rel = "stylesheet", s.href = e, s.setAttribute("data-non-critical", i), s.onload = () => {
				this.styleSheets.set(i, s.sheet), a();
			}, s.onerror = o, "requestIdleCallback" in window ? requestIdleCallback(() => {
				document.head.appendChild(s);
			}) : setTimeout(() => {
				document.head.appendChild(s);
			}, 0);
		});
	}
	preloadResource(e, i, a) {
		let o = document.createElement("link");
		o.rel = "preload", o.href = e, o.setAttribute("as", i), a && (o.type = a), document.head.appendChild(o);
	}
	optimizeFontLoading(e, i = "swap") {
		let a = document.createElement("style");
		a.textContent = `
      @font-face {
        font-family: '${e}';
        font-display: ${i};
      }
    `, document.head.appendChild(a);
	}
}, OptimizedEventManager = class {
	listeners = /* @__PURE__ */ new Map();
	addEventListener(e, i, a, o) {
		let s = this.getOptimizedOptions(i, o);
		e.addEventListener(i, a, s), this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Map());
		let c = this.listeners.get(e);
		c.has(i) || c.set(i, /* @__PURE__ */ new Set()), c.get(i).add(a);
	}
	removeEventListener(e, i, a, o) {
		e.removeEventListener(i, a, o);
		let s = this.listeners.get(e);
		if (s) {
			let o = s.get(i);
			o && (o.delete(a), o.size === 0 && s.delete(i)), s.size === 0 && this.listeners.delete(e);
		}
	}
	getOptimizedOptions(i, a) {
		let o = [
			"scroll",
			"wheel",
			"touchstart",
			"touchmove",
			"touchend"
		];
		return typeof a == "object" && a ? {
			...a,
			passive: a.passive === void 0 ? o.includes(i) && BrowserFeatures.hasPassiveEvents : a.passive
		} : o.includes(i) && BrowserFeatures.hasPassiveEvents ? { passive: !0 } : a || !1;
	}
	cleanup() {
		for (let [e, i] of this.listeners.entries()) for (let [a, o] of i.entries()) for (let i of o) e.removeEventListener(a, i);
		this.listeners.clear();
	}
}, RAFScheduler = class {
	callbacks = /* @__PURE__ */ new Map();
	currentId = 0;
	isRunning = !1;
	schedule(e) {
		let i = ++this.currentId;
		return this.callbacks.set(i, e), this.isRunning || this.start(), i;
	}
	cancel(e) {
		this.callbacks.delete(e);
	}
	start() {
		this.isRunning = !0;
		let e = () => {
			if (this.callbacks.size === 0) {
				this.isRunning = !1;
				return;
			}
			let i = Array.from(this.callbacks.values());
			this.callbacks.clear(), i.forEach((e) => {
				try {
					e();
				} catch (e) {
					import("./logger-CqE_UGhd.js").then(({ createLogger: i }) => {
						i("BrowserOptimization").error("RAF callback error:", { module: "BrowserOptimization" }, e);
					});
				}
			}), requestAnimationFrame(e);
		};
		requestAnimationFrame(e);
	}
	scheduleWithPriority(e, i = "normal") {
		return i === "high" ? this.schedule(e) : i === "low" && "requestIdleCallback" in window ? requestIdleCallback(e) : this.schedule(e);
	}
}, IntersectionObserverPool = class {
	observers = /* @__PURE__ */ new Map();
	elementCallbacks = /* @__PURE__ */ new WeakMap();
	observe(e, i, a = {}) {
		let o = this.getObserverKey(a);
		this.observers.has(o) || this.observers.set(o, new IntersectionObserver((e, i) => {
			e.forEach((e) => {
				let a = this.elementCallbacks.get(e.target);
				a && a.forEach((a) => a([e], i));
			});
		}, a));
		let s = this.observers.get(o);
		this.elementCallbacks.has(e) || this.elementCallbacks.set(e, /* @__PURE__ */ new Map());
		let c = Math.random().toString(36);
		return this.elementCallbacks.get(e).set(c, i), s.observe(e), () => {
			let i = this.elementCallbacks.get(e);
			i && (i.delete(c), i.size === 0 && (s.unobserve(e), this.elementCallbacks.delete(e)));
		};
	}
	getObserverKey(e) {
		return JSON.stringify({
			root: e.root?.tagName || null,
			rootMargin: e.rootMargin || "0px",
			threshold: e.threshold || 0
		});
	}
	cleanup() {
		this.observers.forEach((e) => e.disconnect()), this.observers.clear();
	}
}, BrowserOptimizations = class {
	hardwareAccel = new HardwareAcceleration();
	renderOptimizer = new CriticalRenderingOptimizer();
	_eventManager = new OptimizedEventManager();
	rafScheduler = new RAFScheduler();
	intersectionPool = new IntersectionObserverPool();
	optimizeForBrowser(i) {
		switch (BrowserFeatures.browser) {
			case "chrome":
				this.optimizeForChrome(i);
				break;
			case "firefox":
				this.optimizeForFirefox(i);
				break;
			case "safari":
				this.optimizeForSafari(i);
				break;
			case "edge":
				this.optimizeForEdge(i);
				break;
		}
	}
	optimizeForChrome(i) {
		this.hardwareAccel.enable(i), BrowserFeatures.hasContainment && (i.style.contain = "layout style paint"), i.style.isolation = "isolate";
	}
	optimizeForFirefox(e) {
		this.hardwareAccel.enable(e), e.style.willChange = "transform, opacity";
	}
	optimizeForSafari(e) {
		this.hardwareAccel.enable(e), e.style.webkitTransform = "translateZ(0)", e.style.webkitBackfaceVisibility = "hidden";
	}
	optimizeForEdge(e) {
		this.hardwareAccel.enable(e), e.style.transform = "translateZ(0)";
	}
	optimizeCriticalPath() {
		this.renderOptimizer.inlineCriticalCSS("\n      .ht-grid-container {\n        contain: layout style paint;\n        transform: translateZ(0);\n        will-change: scroll-position;\n      }\n      .ht-virtual-item {\n        contain: layout style paint;\n        will-change: transform;\n        backface-visibility: hidden;\n      }\n    ", "ht-critical"), this.renderOptimizer.optimizeFontLoading("system-ui", "swap");
	}
	addOptimizedListener(e, i, a, o) {
		this._eventManager.addEventListener(e, i, a, o);
	}
	cleanup() {
		this._eventManager.cleanup(), this.intersectionPool.cleanup();
	}
	get hardwareAcceleration() {
		return this.hardwareAccel;
	}
	get renderingOptimizer() {
		return this.renderOptimizer;
	}
	get eventManager() {
		return this._eventManager;
	}
	get scheduler() {
		return this.rafScheduler;
	}
	get intersectionObserver() {
		return this.intersectionPool;
	}
};
const browserOptimizations = new BrowserOptimizations();
function initializeBrowserOptimizations() {
	browserOptimizations.optimizeCriticalPath(), window.addEventListener("beforeunload", () => {
		browserOptimizations.cleanup();
	});
}
export { IntersectionObserverPool as a, browserOptimizations as c, HardwareAcceleration as i, initializeBrowserOptimizations as l, BrowserOptimizations as n, OptimizedEventManager as o, CriticalRenderingOptimizer as r, RAFScheduler as s, BrowserFeatures as t };

//# sourceMappingURL=browser-optimization-Aw-vm1Jr.js.map