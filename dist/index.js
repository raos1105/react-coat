'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var ReactDOM = _interopDefault(require('react-dom'));
var reactRouterDom = require('react-router-dom');
var reactRouterRedux = require('react-router-redux');
var redux = require('redux');
var effects = require('redux-saga/effects');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var ErrorActionName = "@@framework/ERROR";
var LoadingActionName = "LOADING";
var InitActionName = "INIT";
function errorAction(error) {
    return {
        type: ErrorActionName,
        error: error
    };
}
function loadingAction(namespace, group, status) {
    return {
        type: namespace + "/" + LoadingActionName,
        data: (_a = {}, _a[group] = status, _a)
    };
    var _a;
}
function initModuleAction(namespace) {
    return {
        type: namespace + "/" + InitActionName
    };
}

function emptyObject(obj) {
    var arr = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key);
        }
    }
    arr.forEach(function (key) {
        delete obj[key];
    });
    return obj;
}
function findIndexInArray(arr, fun) {
    for (var i = 0, k = arr.length; i < k; i++) {
        if (fun(arr[i])) {
            return i;
        }
    }
    return -1;
}
var TaskCountEvent = "TaskCountEvent";
var TaskCounterState = {
    Start: "Start",
    Stop: "Stop",
    Depth: "Depth"
};
var PEvent = /** @class */ (function () {
    function PEvent(name, data, bubbling) {
        if (bubbling === void 0) { bubbling = false; }
        this.name = name;
        this.data = data;
        this.bubbling = bubbling;
    }
    PEvent.prototype.setTarget = function (target) {
        this.target = target;
    };
    PEvent.prototype.setCurrentTarget = function (target) {
        this.currentTarget = target;
    };
    return PEvent;
}());
var PDispatcher = /** @class */ (function () {
    function PDispatcher(parent) {
        this.parent = parent;
        this._handlers = {};
    }
    PDispatcher.prototype.addListener = function (ename, handler) {
        var dictionary = this._handlers[ename];
        if (!dictionary) {
            this._handlers[ename] = dictionary = [];
        }
        dictionary.push(handler);
        return this;
    };
    PDispatcher.prototype.removeListener = function (ename, handler) {
        if (!ename) {
            emptyObject(this._handlers);
        }
        else {
            var handlers = this._handlers;
            if (handlers.propertyIsEnumerable(ename)) {
                var dictionary = handlers[ename];
                if (!handler) {
                    delete handlers[ename];
                }
                else {
                    var n = dictionary.indexOf(handler);
                    if (n > -1) {
                        dictionary.splice(n, 1);
                    }
                    if (dictionary.length === 0) {
                        delete handlers[ename];
                    }
                }
            }
        }
        return this;
    };
    PDispatcher.prototype.dispatch = function (evt) {
        if (!evt.target) {
            evt.setTarget(this);
        }
        evt.setCurrentTarget(this);
        var dictionary = this._handlers[evt.name];
        if (dictionary) {
            for (var i = 0, k = dictionary.length; i < k; i++) {
                dictionary[i](evt);
            }
        }
        if (this.parent && evt.bubbling) {
            this.parent.dispatch(evt);
        }
        return this;
    };
    PDispatcher.prototype.setParent = function (parent) {
        this.parent = parent;
        return this;
    };
    return PDispatcher;
}());
var TaskCounter = /** @class */ (function (_super) {
    __extends(TaskCounter, _super);
    function TaskCounter(deferSecond) {
        var _this = _super.call(this) || this;
        _this.deferSecond = deferSecond;
        _this.list = [];
        return _this;
    }
    TaskCounter.prototype.addItem = function (promise, note) {
        var _this = this;
        if (note === void 0) { note = ""; }
        if (!this.list.some(function (item) { return item.promise === promise; })) {
            this.list.push({ promise: promise, note: note });
            promise.then(function (value) { return _this.completeItem(promise); }, function (reason) { return _this.completeItem(promise); });
            if (this.list.length === 1) {
                this.dispatch(new PEvent(TaskCountEvent, TaskCounterState.Start));
                this._timer = window.setTimeout(function () {
                    _this._timer = 0;
                    if (_this.list.length > 0) {
                        _this.dispatch(new PEvent(TaskCountEvent, TaskCounterState.Depth));
                    }
                }, this.deferSecond * 1000);
            }
        }
        return promise;
    };
    TaskCounter.prototype.completeItem = function (promise) {
        var i = findIndexInArray(this.list, function (item) { return item.promise === promise; });
        if (i > -1) {
            this.list.splice(i, 1);
            if (this.list.length === 0) {
                if (this._timer) {
                    clearTimeout(this._timer);
                    this._timer = 0;
                }
                this.dispatch(new PEvent(TaskCountEvent, TaskCounterState.Stop));
            }
        }
        return this;
    };
    return TaskCounter;
}(PDispatcher));

var loadings = {};
var store;
function setStore(_store) {
    store = _store;
}
function setLoading(item, namespace, group) {
    if (namespace === void 0) { namespace = "app"; }
    if (group === void 0) { group = "global"; }
    var key = namespace + "/" + group;
    if (!loadings[key]) {
        loadings[key] = new TaskCounter(3);
        loadings[key].addListener(TaskCountEvent, function (e) {
            store && store.dispatch(loadingAction(namespace, group, e.data));
        });
    }
    loadings[key].addItem(item);
    return item;
}

var defaultLoadingComponent = function () { return React.createElement("div", null, "Loading..."); };
function asyncComponent(resolve, componentName, LoadingComponent) {
    if (componentName === void 0) { componentName = "Main"; }
    if (LoadingComponent === void 0) { LoadingComponent = defaultLoadingComponent; }
    var AsyncComponent = /** @class */ (function (_super) {
        __extends(AsyncComponent, _super);
        function AsyncComponent(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.LoadingComponent = LoadingComponent;
            _this.state = {
                Component: null
            };
            return _this;
        }
        AsyncComponent.prototype.componentDidMount = function () {
            var _this = this;
            var promise = resolve();
            promise.then(function (module) {
                var Component = module.components[componentName];
                _this.setState({
                    Component: Component
                });
            });
            setLoading(promise);
        };
        AsyncComponent.prototype.render = function () {
            var Component = this.state.Component;
            var LoadingComponent = this.LoadingComponent;
            return Component ? (React.createElement(Component, __assign({}, this.props))) : (React.createElement(LoadingComponent, __assign({}, this.props)));
        };
        return AsyncComponent;
    }(React.Component));
    return AsyncComponent;
}

var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            message: ""
        };
        return _this;
    }
    Component.prototype.render = function () {
        if (this.state.message) {
            return React__default.createElement("div", null,
                "failed to render, error: ",
                this.state.message);
        }
        return this.props.children;
    };
    Component.prototype.componentDidCatch = function (error) {
        this.setState({ message: error.message });
        this.props.dispatch(errorAction(error));
    };
    return Component;
}(React__default.PureComponent));
var mapDispatchToProps = function (dispatch) {
    return {
        dispatch: dispatch
    };
};
var ErrorBoundary = reactRedux.connect(null, mapDispatchToProps)(Component);

var sagasMap;
var reducersMap;
var sagaNames;
var sagaNameMap = {};
function getInjector (_reducersMap, _sagasMap, _sagaNames) {
    reducersMap = _reducersMap;
    sagasMap = _sagasMap;
    sagaNames = _sagaNames;
    return injectModule;
}
function pushSagaName(actionName) {
    if (!sagaNameMap[actionName]) {
        sagaNameMap[actionName] = true;
        sagaNames.push(actionName);
    }
}
function transformAction(actionName, action, listenerModule, actionsMap) {
    if (!actionsMap[actionName]) {
        actionsMap[actionName] = {};
    }
    actionsMap[actionName][listenerModule] = action;
    if (actionsMap === sagasMap) {
        pushSagaName(actionName);
    }
}
function injectActions(namespace, actions) {
    Object.keys(actions).forEach(function (actionName) {
        if (actionName.substr(0, 1) === "_") {
            transformAction(namespace + "/" + actionName, actions[actionName], namespace, sagasMap);
        }
        else {
            transformAction(namespace + "/" + actionName, actions[actionName], namespace, reducersMap);
        }
    });
}
function injectHandlers(listenerModule, handlers) {
    Object.keys(handlers).forEach(function (handlerName) {
        if (handlerName.substr(0, 1) === "_") {
            transformAction(handlerName.substr(1), handlers[handlerName], listenerModule, sagasMap);
        }
        else {
            transformAction(handlerName, handlers[handlerName], listenerModule, reducersMap);
        }
    });
}
function injectModule(module) {
    injectActions(module.namespace, module.actions);
    injectHandlers(module.namespace, module.handlers);
}

var store$1;
var history;
var sagasMap$1 = {};
var reducersMap$1 = {};
var sagaNames$1 = [];
var injector = getInjector(reducersMap$1, sagasMap$1, sagaNames$1);
function getActionData(action) {
    var arr = Object.keys(action).filter(function (key) { return key !== "type"; });
    if (arr.length === 0) {
        return undefined;
    }
    else if (arr.length === 1) {
        return action[arr[0]];
    }
    else {
        var data = __assign({}, action);
        delete data["type"];
        return data;
    }
}
function reducer(state, action) {
    if (state === void 0) { state = {}; }
    var item = reducersMap$1[action.type];
    if (item) {
        var rootState_1 = store$1.getState();
        var newState_1 = __assign({}, state);
        Object.keys(item).forEach(function (namespace) {
            newState_1[namespace] = item[namespace](getActionData(action), state[namespace], rootState_1);
        });
        return newState_1;
    }
    return state;
}
function setStore$1(_store, _reducers, _history, runSaga) {
    _reducers.project = reducer;
    _store.replaceReducer(redux.combineReducers(_reducers));
    function sagaHandler(action) {
        var item, rootState, arr, _i, arr_1, moduleName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = sagasMap$1[action.type];
                    if (!item) return [3 /*break*/, 7];
                    rootState = store$1.getState();
                    arr = Object.keys(item);
                    _i = 0, arr_1 = arr;
                    _a.label = 1;
                case 1:
                    if (!(_i < arr_1.length)) return [3 /*break*/, 7];
                    moduleName = arr_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 6]);
                    return [5 /*yield**/, __values(item[moduleName](getActionData(action), rootState[moduleName], rootState))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    return [4 /*yield*/, effects.put(errorAction(error_1))];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    }
    function saga() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects.takeEvery(sagaNames$1, sagaHandler)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }
    runSaga(saga);
    store$1 = _store;
    history = _history;
    setStore(store$1);
    return store$1;
}
// export type LocationHandler = (data: any) => string | boolean | { type: string, data: any };
// const locationHandlers: { [namespace: string]: LocationHandler } = {};
// function checkLocation(namespace: string) {
//   const handler = locationHandlers[namespace];
//   if (handler) {
//     const location = store.getState()['router']['location'];
//     const saga = handler(location);
//     if (typeof saga === "object") {
//       store.dispatch({ type: namespace + "/__startup", data: saga });
//     } else if (typeof saga === "string") {
//       store.dispatch({ type: namespace + "/" + saga, data: location });
//     } else if (saga) {
//       store.dispatch({ type: namespace + "/__startup", data: location });
//     }
//   }
// }
// function checkLocationHandelr(namespace?: string) {
//   if (namespace) {// 新加载的模块在本轮来不及监听location，所以会补充一次
//     checkLocation(namespace);
//   } else {
//     Object.keys(locationHandlers).forEach(checkLocation);
//   }
// }
// let locationHasInited = false;
// export function reducerHandler(state: any = {}, action: { type: string, data: any }) {
//   if (action.type === "@@router/LOCATION_CHANGE") {
//     locationHasInited = true;
//     setTimeout(() => checkLocationHandelr(), 0);
//   } else {
//     const fun = reducersMap[action.type];
//     const namespace = action.type.split("/")[0];
//     if (fun) {
//       return { ...state, [namespace]: fun(getActionData(action), state[namespace], store.getState()) };
//     }
//   }
//   return state;
// }
var hasInjected = {};
function injectModule$1(module) {
    var namespace = module.namespace;
    if (!hasInjected[namespace]) {
        injector(module);
        hasInjected[namespace] = true;
        store$1.dispatch(initModuleAction(namespace));
    }
}
function buildActions(namespace) {
    return new Proxy({}, {
        get: function (target, key) {
            return function (data) { return ({ type: namespace + "/" + key, data: data }); };
        }
    });
}
function extendState(initState) {
    return Object.assign({
        loading: {
            global: ""
        }
    }, initState);
}
function extendActions(initState, actions) {
    return Object.assign({
        INIT: function (data, moduleState, rootState) {
            if (moduleState === void 0) { moduleState = initState; }
            return initState;
        },
        LOADING: function (loading, moduleState, rootState) {
            if (moduleState === void 0) { moduleState = initState; }
            return __assign({}, moduleState, { loading: __assign({}, moduleState.loading, loading) });
        }
    }, actions);
}
function extendHandlers(initState, handlers) {
    return Object.assign({}, handlers);
}
window.onerror = function (message, filename, lineno, colno, error) {
    store$1.dispatch(errorAction(message)); // TODO: error can be null, think about how to handle all cases
};
function createApp(store, component, container) {
    var WithRouter = reactRouterDom.withRouter(component);
    ReactDOM.render(React__default.createElement(reactRedux.Provider, { store: store },
        React__default.createElement(ErrorBoundary, null,
            React__default.createElement(reactRouterRedux.ConnectedRouter, { history: history },
                React__default.createElement(WithRouter, null)))), document.getElementById(container));
}

exports.setLoading = setLoading;
exports.LoadingState = TaskCounterState;
exports.setStore = setStore$1;
exports.injectModule = injectModule$1;
exports.asyncComponent = asyncComponent;
exports.buildActions = buildActions;
exports.extendState = extendState;
exports.extendActions = extendActions;
exports.extendHandlers = extendHandlers;
exports.createApp = createApp;