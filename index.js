"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unimplemented = exports.infallible = exports.NULL_UUID = exports.GQLErrorGroup = exports.Maybe = exports.Serr = exports.Result = exports.Ok = exports.Err = exports.gql = exports.result = void 0;
exports.result = require("./result");
exports.gql = require("./gql");
var result_1 = require("./result");
Object.defineProperty(exports, "Err", { enumerable: true, get: function () { return result_1.Err; } });
Object.defineProperty(exports, "Ok", { enumerable: true, get: function () { return result_1.Ok; } });
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return result_1.Result; } });
Object.defineProperty(exports, "Serr", { enumerable: true, get: function () { return result_1.Serr; } });
Object.defineProperty(exports, "Maybe", { enumerable: true, get: function () { return result_1.Maybe; } });
var gql_1 = require("./gql");
Object.defineProperty(exports, "GQLErrorGroup", { enumerable: true, get: function () { return gql_1.GQLErrorGroup; } });
exports.NULL_UUID = '00000000-0000-0000-0000-000000000000';
function infallible(t) {
    throw new Error('Reached infallible but that shouldn\'t be possible.');
}
exports.infallible = infallible;
function unimplemented() {
    throw new Error('This codepath has not been implemented.');
}
exports.unimplemented = unimplemented;
//# sourceMappingURL=index.js.map